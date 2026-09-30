import type { Tool } from "@/lib/types";

// ─── TOOLS PART 5: t401–t500 ─────────────────────────────────────────────
// Categories: craft (t401–t415), mgmt (t416–t430), inventory (t431–t445),
//             log (t446–t460), cloud (t461–t475), windows (t476–t490),
//             hardware (t491–t500)

export const TOOLS_PART5: Tool[] = [
  // ── Craft / صناعة الحزم ──────────────────────────────────────────────
  {
    id: "t401",
    name: "Scapy",
    url: "https://scapy.net",
    category: "craft",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مكتبة بايثون شهيرة لبناء الحزم وتفكيكها وإرسالها واستقبالها مباشرة على الواجهات. تمنحك تحكمًا كاملًا في كل طبقة من رؤوس الحزم، ما يجعلها المعيار الفعلي لاختبار الجدران النارية ومحاكاة الهجمات وبناء أدوات شبكات مخصصة.",
      en: "A famous Python library for forging, dissecting, sending, and receiving packets directly on interfaces. It gives you full control over every header layer, making it the de-facto standard for firewall testing, attack simulation, and custom network tooling."
    },
    cmd: "sudo scapy",
    cmdDesc: { ar: "فتح وحدة سكابي التفاعلية بصلاحيات الجذر", en: "Open the interactive Scapy console with root privileges" },
    tags: ["scapy", "packets", "python", "crafting"]
  },
  {
    id: "t402",
    name: "Kamene",
    url: "https://pypi.org/project/kamene/",
    category: "craft",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تفرّع من سكابي صدر لاستمرار التطوير حين تباطأت تحديثات الأصل، ويدعم نفس أسلوب صياغة الحزم وإرسالها. خيار خفيف لمن يريد ميزات سكابي في حزمة مستقرة تُثبّت عبر pip.",
      en: "A Scapy fork created to keep development moving when upstream updates stalled, supporting the same packet crafting and injection workflow. A lightweight choice when you need Scapy-style features in a stable pip package."
    },
    cmd: "sudo kamene",
    cmdDesc: { ar: "فتح وحدة Kamene التفاعلية بصلاحيات الجذر", en: "Open the interactive Kamene console with root privileges" },
    tags: ["kamene", "scapy", "python", "packets"]
  },
  {
    id: "t403",
    name: "nping",
    url: "https://nmap.org/nping/",
    category: "craft",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة توليد حزم من عائلة nmap تصنع مجاهز ICMP وTCP وUDP بتحكم دقيق في المعدل والحجم وحقول الرؤوس. تُستخدم لقياس زمن الاستجابة واختبار قواعد الجدار الناري وفحص السلوك تحت ضغط حزم SYN.",
      en: "Nmap's packet generation tool that crafts ICMP, TCP, and UDP probes with fine control over rate, size, and header fields. It is used for response-time measurement, firewall rule testing, and SYN-rate behaviour checks."
    },
    cmd: "sudo nping --tcp -p 443 --syn --rate 10 10.0.0.1",
    cmdDesc: { ar: "إرسال حزم SYN بمعدل 10 حزم في الثانية إلى المنفذ 443", en: "Send 10 SYN packets per second toward port 443" },
    tags: ["nping", "nmap", "probes", "generation"]
  },
  {
    id: "t404",
    name: "WireEdit",
    url: "https://wireedit.com",
    category: "craft",
    platform: ["windows"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "محرر ملفات التقاط بصيغة pcap بواجهة رسومية يتيح تعديل أي حزمة ملتقطة حقلًا حقلًا ثم إعادة تشغيلها بأدوات مثل tcpreplay. يختصر ساعات بناء الحزم اليدوية عند اختبار قواعد الأمان أو التحقق من سلوك الأجهزة.",
      en: "A GUI PCAP editor that lets you modify any captured packet field by field and replay it with tools like tcpreplay. It saves hours of manual packet building when testing security rules or verifying device behaviour."
    },
    cmd: "wireedit capture.pcap",
    cmdDesc: { ar: "فتح ملف الالتقاط في محرر WireEdit", en: "Open a capture file in the WireEdit editor" },
    tags: ["wireedit", "pcap", "editing", "gui"]
  },
  {
    id: "t405",
    name: "010 Editor",
    url: "https://www.sweetscape.com/010editor/",
    category: "craft",
    platform: ["cross"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "محرر ست عشري احترافي يحلل الملفات والبنى الثنائية عبر قوالب ذكية تكشف حقول البروتوكول داخل الحزم الخام. لا غنى عنه عند هندسة بروتوكولات مخصصة أو تحليل ملفات الالتقاط على مستوى البايت.",
      en: "A professional hex editor that parses binaries with smart templates exposing protocol fields inside raw packets. Indispensable when engineering custom protocols or doing byte-level capture analysis."
    },
    cmd: "010editor frame.bin",
    cmdDesc: { ar: "فتح ملف ثنائي في محرر 010", en: "Open a binary file in 010 Editor" },
    tags: ["hex-editor", "binary", "templates", "analysis"]
  },
  {
    id: "t406",
    name: "HxD",
    url: "https://mh-nexus.de/hxd/",
    category: "craft",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "محرر ست عشري مجاني وسريع لويندوز يتعامل مع ملفات ضخمة وأقراص خام وحساب المجاميع. يكفي معظم مهام فحص رؤوس الإطارات وتعديل ملفات الالتقاط دون أي تكلفة.",
      en: "A fast free hex editor for Windows that handles huge files, raw disks, and checksums. It covers most everyday tasks of inspecting frame headers and patching capture files at zero cost."
    },
    cmd: "HxD.exe dump.pcap",
    cmdDesc: { ar: "فتح ملف التقاط في محرر HxD", en: "Open a capture file in HxD" },
    tags: ["hxd", "hex-editor", "windows", "binary"]
  },
  {
    id: "t407",
    name: "hexyl",
    url: "https://github.com/sharkdp/hexyl",
    category: "craft",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة سطر أوامر بلغة Rust تطبع محتوى الملفات الثنائية بتنسيق ست عشري ملوّن سهل القراءة. مثالية للفحص السريع للإطارات على الخوادم البعيدة عبر SSH.",
      en: "A Rust command-line tool that prints binaries in a colourised, human-friendly hex format. Ideal for quick frame inspection on remote servers over SSH."
    },
    cmd: "hexyl -n 64 frame.bin",
    cmdDesc: { ar: "عرض أول 64 بايت من ملف إطار", en: "Show the first 64 bytes of a frame file" },
    tags: ["hexyl", "hex", "cli", "rust"]
  },
  {
    id: "t408",
    name: "tcpreplay",
    url: "https://tcpreplay.appneta.com/",
    category: "craft",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محرك إعادة تشغيل يبث حركة ملتقطة من ملفات pcap على واجهات حقيقية بسرعات وتكرار قابلين للضبط. أساسي في مختبرات اختبار أنظمة كشف التسلل والجدران النارية بحركة واقعية.",
      en: "A replay engine that pushes captured PCAP traffic back onto real interfaces at controllable speed and loop counts. Essential in IDS and firewall labs that need realistic traffic."
    },
    cmd: "sudo tcpreplay -i eth0 -l 10 --topspeed capture.pcap",
    cmdDesc: { ar: "إعادة تشغيل ملف الالتقاط 10 مرات بأقصى سرعة", en: "Replay the capture file 10 times at full speed" },
    tags: ["tcpreplay", "pcap", "replay", "testing"]
  },
  {
    id: "t409",
    name: "Bit-Twist",
    url: "https://bittwist.sourceforge.net/",
    category: "craft",
    platform: ["linux", "mac", "windows"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "مولّد حزم يعتمد على ملفات pcap ويرسل الإطارات المسجلة كما هي أو معدّلة عبر مكتبة libpcap بتحكم بالمعدل. بديل خفيف عن tcpreplay لإعادة تشغيل الحزم في المختبرات.",
      en: "A libpcap-based generator that sends frames from PCAP files, edited or as-is, at a controlled rate. A lightweight alternative to tcpreplay for lab packet replay."
    },
    cmd: "sudo bittwist -i eth0 -s 10 capture.pcap",
    cmdDesc: { ar: "إرسال حزم الملف بفاصل 10 ميكروثانية بين الإطارات", en: "Send the file's packets with a 10 microsecond inter-frame gap" },
    tags: ["bittwist", "pcap", "libpcap", "replay"]
  },
  {
    id: "t410",
    name: "trafgen",
    url: "https://github.com/netsniff-ng/netsniff-ng",
    category: "craft",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مولّد الحزم من مجموعة netsniff-ng يصف الحزم بلغة مخصصة ويبثها بمعدلات ملايين الحزم في الثانية دون دورة نواة لكل حزمة. مصمم لإخضاع بطاقات الشبكة والمبدّلات لاختبارات ضغط قاسية.",
      en: "The netsniff-ng traffic generator that describes packets in a dedicated language and blasts them at millions of packets per second without a kernel round-trip per packet. Built to stress-test NICs and switches at scale."
    },
    cmd: "sudo trafgen --dev eth0 --conf udp_dns.cfg --rate 100kpps",
    cmdDesc: { ar: "بث حزم DNS المعرّفة في الملف بمعدل 100 ألف حزمة في الثانية", en: "Stream the DNS packets defined in the config at 100k packets per second" },
    tags: ["trafgen", "netsniff-ng", "generator", "linux"]
  },
  {
    id: "t411",
    name: "tcpcopy",
    url: "https://github.com/session-replay-tools/tcpcopy",
    category: "craft",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أداة تنسخ حركة الإنتاج الحقيقية وتعيد توجيهها إلى بيئة اختبار مع اعتراض ردود TCP حتى تتصرف النسخة كأنها الأصل. تتيح اختبار التغييرات الخطيرة على نسخة مطابقة للإنتاج دون أي مخاطرة.",
      en: "A tool that mirrors live production traffic into a test environment while intercepting TCP responses so the copy behaves like the original. It lets you trial risky changes against a realistic production clone."
    },
    cmd: "sudo tcpcopy -x 80 -s 10.0.0.2",
    cmdDesc: { ar: "نسخ حركة المنفذ 80 إلى خادم مساعد لبيئة الاختبار", en: "Copy port 80 traffic to an auxiliary test server" },
    tags: ["tcpcopy", "replay", "testing", "mirror"]
  },
  {
    id: "t412",
    name: "Mausezahn (mz)",
    url: "https://github.com/netsniff-ng/netsniff-ng",
    category: "craft",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مولّد حزم تفاعلي متعدد البروتوكولات يستخدم صياغة وصفية قصيرة لبناء حزم STP وCDP وDHCP وغيرها بسرعة. سلاح المختبرات لتغذية الأجهزة بحزم مخصصة أو محاكاة سلوكيات خاطئة في الطبقة الثانية.",
      en: "A multi-protocol interactive generator with a terse description syntax for quickly producing STP, CDP, DHCP, and many other packets. A lab weapon for feeding crafted frames to devices or emulating Layer 2 misbehaviour."
    },
    cmd: "sudo mz eth0 -t tcp \"sp=1024,dp=443,flags=syn\" -c 100",
    cmdDesc: { ar: "إرسال 100 حزمة SYN نحو المنفذ 443", en: "Send 100 SYN packets toward port 443" },
    tags: ["mausezahn", "netsniff-ng", "l2", "crafting"]
  },
  {
    id: "t413",
    name: "hexdump",
    url: "https://man7.org/linux/man-pages/man1/hexdump.1.html",
    category: "craft",
    platform: ["linux"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة يونكس مدمجة تعرض ملفات الإطارات والحزم بتنسيق ست عشري مع النصوص المقابلة لها. الخطوة الأولى في تشريح أي حزمة خام دون أدوات إضافية.",
      en: "A built-in Unix utility that dumps frame and packet files in hex alongside their ASCII rendering. The first step in dissecting any raw packet without extra tooling."
    },
    cmd: "hexdump -C frame.bin",
    cmdDesc: { ar: "طباعة الملف بتنسيق ست عشري مع نص ASCII", en: "Print the file in hex with its ASCII text" },
    tags: ["hexdump", "hex", "unix", "cli"]
  },
  {
    id: "t414",
    name: "netsniff-ng",
    url: "https://github.com/netsniff-ng/netsniff-ng",
    category: "craft",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "ملتقط حزم فائق السرعة يعمل بالنسخ الصفري من حلقة الحزم في النواة ويكتب ملفات pcap بفقد شبه معدوم. الأداة الرئيسية في مجموعة تضم أيضًا trafgen وMausezahn للالتقاط والتوليد عالي الأداء.",
      en: "A zero-copy high-performance capture tool working straight off the kernel packet ring, writing PCAP files with near-zero loss. The flagship of a toolkit that also includes trafgen and Mausezahn for high-rate generation."
    },
    cmd: "sudo netsniff-ng --in eth0 --out capture.pcap --silent",
    cmdDesc: { ar: "التقاط حركة الواجهة إلى ملف pcap دون إخراج تفصيلي", en: "Capture interface traffic into a PCAP file silently" },
    tags: ["netsniff-ng", "capture", "zero-copy", "pcap"]
  },
  {
    id: "t415",
    name: "pktgen (Linux kernel)",
    url: "https://wiki.archlinux.org/title/Pktgen",
    category: "craft",
    platform: ["linux"],
    license: "free",
    difficulty: 4,
    desc: {
      ar: "وحدة مولّد حزم مدمجة في نواة لينكس تُدار عبر ملفات /proc لبث ملايين الحزم في الثانية بأقل حمل على المعالج. المرجع القياسي لاختبار حدود أداء المبدّلات وبطاقات الشبكة.",
      en: "A packet generator module built into the Linux kernel, driven through /proc files, pushing millions of packets per second with minimal CPU cost. The classic benchmark for taking switches and NICs to their limits."
    },
    cmd: "echo \"add eth1\" > /proc/net/pktgen/kpktgend_0",
    cmdDesc: { ar: "إضافة واجهة إلى خيط توليد pktgen", en: "Attach an interface to a pktgen thread" },
    tags: ["pktgen", "kernel", "linux", "benchmark"]
  },

  // ── Mgmt / منصات الإدارة ─────────────────────────────────────────────
  {
    id: "t416",
    name: "Cisco DNA Center",
    url: "https://www.cisco.com/c/en/us/products/cloud-systems-management/dna-center/index.html",
    category: "mgmt",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "منصة إدارة قائمة على النوايا من Cisco لأجهزة Catalyst وIOS XE تشمل أتمتة التصميم والسياسات وضمان الشبكة عبر التحليلات. تمثل العمود الفقري لمعماريات الوصول المعرف بالبرمجيات في الحرم الجامعي.",
      en: "Cisco's intent-based management platform for Catalyst and IOS XE gear covering design, policy automation, and network assurance through analytics. It is the backbone of Software-Defined Access campus architectures."
    },
    cmd: "curl -k -X POST -u admin:password https://dnac.example.com/api/system/v1/auth/token",
    cmdDesc: { ar: "الحصول على رمز وصول من واجهة DNA Center البرمجية", en: "Obtain an API token from the DNA Center API" },
    tags: ["dna-center", "cisco", "sd-access", "automation"]
  },
  {
    id: "t417",
    name: "Meraki Dashboard",
    url: "https://meraki.cisco.com",
    category: "mgmt",
    platform: ["web"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "لوحة سحابية من Cisco لإدارة شبكات Meraki من المبدّلات ونقاط الوصول إلى الجدران النارية من متصفح واحد. تبسّط الشبكات متعددة الفروع إلى أقصى حد مع سياسات مركزية ورؤى استخدام جاهزة.",
      en: "Cisco's cloud dashboard managing the whole Meraki estate—switches, APs, and firewalls—from a single browser. It radically simplifies multi-site networks with central policy and ready usage insights."
    },
    cmd: "curl -L https://api.meraki.com/api/v1/organizations -H \"X-Cisco-Meraki-API-Key: <key>\"",
    cmdDesc: { ar: "سرد المنظمات عبر واجهة Meraki البرمجية", en: "List organizations through the Meraki API" },
    tags: ["meraki", "cisco", "cloud", "dashboard"]
  },
  {
    id: "t418",
    name: "Aruba Central",
    url: "https://www.arubanetworks.com",
    category: "mgmt",
    platform: ["web"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "منصة سحابية من HPE Aruba لإدارة شبكات Wi-Fi والمبدّلات والبوابات مع تحليلات وذكاء تحرّي مدمج. توفر بديلًا مرنًا عن إدارة وحدات التحكم التقليدية المحلية مثل AirWave.",
      en: "HPE Aruba's cloud platform for managing Wi-Fi, switching, and gateways with built-in analytics and AI-driven insight. A flexible successor to traditional on-prem controllers like AirWave."
    },
    cmd: "curl -H \"Authorization: Bearer <token>\" https://api.central.arubanetworks.com/monitoring/v1/devices",
    cmdDesc: { ar: "سرد الأجهزة عبر واجهة Aruba Central البرمجية", en: "List devices through the Aruba Central API" },
    tags: ["aruba", "central", "cloud", "management"]
  },
  {
    id: "t419",
    name: "Juniper Mist",
    url: "https://www.mist.com",
    category: "mgmt",
    platform: ["web"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "منصة سحابية تعتمد الذكاء الاصطناعي (مع المساعد Marvis) لإدارة نقاط الوصول والمبدّلات من Juniper مع تشخيص تلقائي لمشكلات Wi-Fi. طوّرت مفهوم الشبكة ذاتية القيادة والمعالجة.",
      en: "Juniper's AI-driven cloud platform (with the Marvis assistant) managing APs and switches, including automatic Wi-Fi troubleshooting. It pioneered the self-driving network concept."
    },
    cmd: "curl -H \"Authorization: Token <key>\" https://api.mist.com/api/v1/self",
    cmdDesc: { ar: "التحقق من مفتاح الواجهة البرمجية لـ Mist", en: "Verify your Mist API key" },
    tags: ["mist", "juniper", "ai", "wi-fi"]
  },
  {
    id: "t420",
    name: "UniFi Network Application",
    url: "https://www.ui.com",
    category: "mgmt",
    platform: ["cross"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "وحدة تحكم مجانية من Ubiquiti لإدارة أجهزة UniFi من مبدّلات ونقاط وصول وبوابات عبر واجهة ويب أنيقة. تجمع بين خيارَي الاستضافة الذاتية والسحابية لشبكات المؤسسات الصغيرة والمتوسطة.",
      en: "Ubiquiti's free controller managing UniFi switches, APs, and gateways through a polished web UI. It blends self-hosted and cloud options for small and mid-size enterprise networks."
    },
    cmd: "docker run -d -p 8443:8443 jacobalberty/unifi",
    cmdDesc: { ar: "تشغيل وحدة تحكم UniFi داخل حاوية", en: "Run the UniFi controller in a container" },
    tags: ["unifi", "ubiquiti", "controller", "wi-fi"]
  },
  {
    id: "t421",
    name: "SolarWinds Network Configuration Manager",
    url: "https://www.solarwinds.com/network-configuration-manager",
    category: "mgmt",
    platform: ["windows"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "أداة إدارة الإعدادات التي تنسخ إعدادات الأجهزة وتتبع التغييرات وتدفع السياسات عبر مئات الأجهزة من بائعين متعددين. تحمي الشبكة من الكوارث الناتجة عن الأخطاء البشرية وتوفر تدقيقًا مطابقًا للمعايير.",
      en: "A configuration management tool that backs up device configs, tracks changes, and pushes compliance policies across hundreds of multi-vendor devices. It shields networks from human-error disasters and satisfies audit requirements."
    },
    cmd: "swql -s orion \"SELECT NodeName FROM Cirrus.Nodes\"",
    cmdDesc: { ar: "استعلام SWQL عن الأجهزة المدارة في NCM", en: "Run a SWQL query against NCM-managed devices" },
    tags: ["ncm", "solarwinds", "config-management", "compliance"]
  },
  {
    id: "t422",
    name: "Junos Space",
    url: "https://www.juniper.net",
    category: "mgmt",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "منصة إدارة من Juniper تجمع تطبيقات إدارة الأجهزة والسياسات والشبكة في نظام واحد يعمل على جهاز افتراضي. تُستخدم لدى المشغلين ومزودي الخدمة لإدارة آلاف الأجهزة مركزيًا.",
      en: "Juniper's management platform consolidating device, policy, and network management applications on one virtual appliance. Service providers use it to centrally run thousands of devices."
    },
    cmd: "ssh admin@192.168.1.20",
    cmdDesc: { ar: "الدخول إلى واجهة سطر أوامر Junos Space", en: "Log in to the Junos Space CLI" },
    tags: ["junos", "juniper", "management", "service-provider"]
  },
  {
    id: "t423",
    name: "OpenDaylight",
    url: "https://www.opendaylight.org",
    category: "mgmt",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "منصة تحكم SDN مفتوحة المصدر تحوّل مستوى التحكم إلى طبقة قابلة للبرمجة عبر واجهات شمالية وجنوبية مثل OpenFlow وNETCONF. أساس متين لبناء حلول تحكم مخصصة بعيدًا عن الارتباط ببائع واحد.",
      en: "An open-source SDN controller platform turning the control plane into a programmable layer via northbound and southbound APIs like OpenFlow and NETCONF. A solid base for custom control solutions free of vendor lock-in."
    },
    cmd: "curl -u admin:admin http://localhost:8181/restconf/operational/network-topology:network-topology",
    cmdDesc: { ar: "استعلام طبولوجيا الشبكة من وحدة تحكم OpenDaylight", en: "Query the network topology from the OpenDaylight controller" },
    tags: ["opendaylight", "sdn", "openflow", "controller"]
  },
  {
    id: "t424",
    name: "Cumulus NetQ",
    url: "https://docs.nvidia.com/networking-ethernet-software/cumulus-netq/",
    category: "mgmt",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "نظام قياس بعدي شبكي من NVIDIA لأقمشة Cumulus يتحقق من حالة BGP وMLAG وواجهات الترابط لحظيًا. يكشف الانحراف عن الإعداد المرجعي قبل أن يتحول إلى انقطاع خدمة.",
      en: "NVIDIA's network telemetry system for Cumulus fabrics validating BGP, MLAG, and interface state in real time. It flags configuration drift before it becomes an outage."
    },
    cmd: "netq show bgp",
    cmdDesc: { ar: "عرض حالة جلسات BGP عبر NetQ", en: "Show BGP session status through NetQ" },
    tags: ["netq", "cumulus", "nvidia", "telemetry"]
  },
  {
    id: "t425",
    name: "HPE Intelligent Management Center",
    url: "https://www.hpe.com",
    category: "mgmt",
    platform: ["windows"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "منصة إدارة موحدة من HPE تدير الأجهزة والوصول والتحديثات عبر بروتوكولات متعددة في شبكات مؤسسية متنوعة البائعين. تعمل عصبًا لإدارة آلاف نقاط النهاية في الشركات الكبيرة.",
      en: "HPE's unified management platform handling devices, access, and updates across multi-vendor enterprise networks via many protocols. It acts as the nerve centre for thousands of endpoints in large organisations."
    },
    cmd: "http://imc-server:8080/imc",
    cmdDesc: { ar: "فتح وحدة تحكم IMC الويب", en: "Open the IMC web console" },
    tags: ["hpe", "imc", "management", "enterprise"]
  },
  {
    id: "t426",
    name: "ALE OmniVista 2500",
    url: "https://www.al-enterprise.com",
    category: "mgmt",
    platform: ["web"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "منصة إدارة من Alcatel-Lucent Enterprise تدير مبدّلات OmniSwitch ونقاط الوصول من نافذة واحدة مع إدارة VLAN والسياسات. الخيار الطبيعي لبيئات ALE ذات الفروع المتعددة.",
      en: "Alcatel-Lucent Enterprise's management platform running OmniSwitch devices and access points from one console with VLAN and policy control. The natural choice for multi-branch ALE estates."
    },
    cmd: "https://omnivista-server:8443",
    cmdDesc: { ar: "فتح واجهة OmniVista الويب", en: "Open the OmniVista web console" },
    tags: ["omnivista", "ale", "omniswitch", "management"]
  },
  {
    id: "t427",
    name: "Zyxel Nebula",
    url: "https://nebula.zyxel.com",
    category: "mgmt",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "سحابة إدارة من Zyxel توحّد المبدّلات ونقاط الوصول والبوابات مع حزمة مجانية تكفي الشبكات الصغيرة. تضع إدارة الشبكات الموزعة في متناول الفرق التقنية الصغيرة دون خبرة عميقة.",
      en: "Zyxel's cloud unifying switches, APs, and gateways, with a free pack that covers small deployments. It brings distributed-network management within reach of small IT teams."
    },
    cmd: "curl -H \"Authorization: Bearer <token>\" https://nebula.zyxel.com/api/v2/devices",
    cmdDesc: { ar: "سرد الأجهزة عبر واجهة Nebula البرمجية", en: "List devices through the Nebula API" },
    tags: ["nebula", "zyxel", "cloud", "smbs"]
  },
  {
    id: "t428",
    name: "TP-Link Omada",
    url: "https://www.tp-link.com/en/business-networking/omada-sdn-controller/",
    category: "mgmt",
    platform: ["cross"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "برنامج وحدة تحكم مجاني من TP-Link يدير أجهزة Omada التجارية مع التجوال السلس والمصادقة عبر بوابة الويب. الخيار الاقتصادي الأشهر لشبكات Wi-Fi التجارية متعددة نقاط الوصول.",
      en: "TP-Link's free controller software managing Omada business gear with seamless roaming and captive-portal authentication. The go-to budget option for multi-AP business Wi-Fi."
    },
    cmd: "https://127.0.0.1:8043/login",
    cmdDesc: { ar: "تسجيل الدخول إلى واجهة وحدة تحكم Omada", en: "Sign in to the Omada controller UI" },
    tags: ["omada", "tp-link", "controller", "captive-portal"]
  },
  {
    id: "t429",
    name: "FortiManager",
    url: "https://www.fortinet.com/products/management/fortimanager",
    category: "mgmt",
    platform: ["web"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "منصة الإدارة المركزية من Fortinet تدفع السياسات والإعدادات والترقيات إلى مئات أجهزة FortiGate وتجمع الأحداث والتقارير. العمود الفقري لعمليات مراكز الأمان في الشبكات الكبيرة.",
      en: "Fortinet's central management platform pushing policies, configs, and firmware to hundreds of FortiGates while aggregating events and reports. The backbone of large-scale FortiGate operations."
    },
    cmd: "ssh admin@fortimanager",
    cmdDesc: { ar: "الدخول إلى واجهة سطر أوامر FortiManager", en: "Enter the FortiManager CLI" },
    tags: ["fortimanager", "fortinet", "security", "management"]
  },
  {
    id: "t430",
    name: "Cisco Prime Infrastructure",
    url: "https://www.cisco.com/c/en/us/products/cloud-systems-management/prime-infrastructure/index.html",
    category: "mgmt",
    platform: ["web"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "منصة إدارة تقليدية من Cisco للشبكات السلكية واللاسلكية وصلت نهاية عمرها الافتراضي مع الانتقال إلى Catalyst Center. ما تزال تعمل في شبكات كثيرة وتستحق المعرفة لأغراض الترحيل.",
      en: "Cisco's classic wired-and-wireless management platform that reached end-of-life as customers move to Catalyst Center. It still runs in many networks and is worth knowing for migration projects."
    },
    cmd: "ssh admin@prime-server",
    cmdDesc: { ar: "الدخول إلى خادم Prime عبر SSH", en: "Access the Prime server over SSH" },
    tags: ["prime", "cisco", "eol", "management"]
  },

  // ── Inventory / الرسم والجرد ──────────────────────────────────────────
  {
    id: "t431",
    name: "phpIPAM",
    url: "https://phpipam.net",
    category: "inventory",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام إدارة عناوين IP مفتوح المصدر بواجهة PHP يقدم مساحات عناوين وVLAN وVRF مع سجل تاريخي وتنبيهات. يحوّل تتبع عناوين الشبكة من جداول Excel فوضوية إلى سجل مركزي دقيق.",
      en: "An open-source PHP-based IP address management system offering address spaces, VLANs, and VRFs with history and alerts. It replaces spreadsheet chaos with an accurate, central IP record."
    },
    cmd: "docker run -d -p 80:80 phpipam/phpipam-www",
    cmdDesc: { ar: "تشغيل phpIPAM داخل حاوية", en: "Run phpIPAM in a container" },
    tags: ["phpipam", "ipam", "vlan", "inventory"]
  },
  {
    id: "t432",
    name: "NetDisco",
    url: "https://netdisco.org",
    category: "inventory",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة جرد شبكي مفتوحة المصدر تكشف الطوبولوجيا عبر بروتوكولات LLDP/CDP وSNMP وتحتفظ بقاعدة تاريخية لعناوين MAC. تكشف تلقائيًا أين يتصل كل جهاز في أي مبدّل ضمن الشبكة.",
      en: "An open-source inventory tool that maps topology via LLDP/CDP and SNMP and keeps a historical MAC-address database. It automatically reveals where every endpoint connects across your switches."
    },
    cmd: "netdisco-do discover -d 10.0.0.1",
    cmdDesc: { ar: "تشغيل مهمة اكتشاف لجهاز عبر netdisco", en: "Run a discovery job for a device through netdisco" },
    tags: ["netdisco", "lldp", "snmp", "discovery"]
  },
  {
    id: "t433",
    name: "arpwatch",
    url: "https://en.wikipedia.org/wiki/Arpwatch",
    category: "inventory",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "خدمة كلاسيكية تراقب بث ARP وترسل بريدًا إلكترونيًا عند ظهور ارتباط MAC/IP جديد أو مريب. حرس قديم لكنه ما يزال فعالًا ضد انتحال ARP في الشبكات الصغيرة والمتوسطة.",
      en: "A classic daemon that watches ARP broadcasts and emails you whenever a new or suspicious MAC-to-IP binding appears. An old guard that still works against ARP spoofing on smaller networks."
    },
    cmd: "sudo arpwatch -i eth0 -m netadmin@example.com",
    cmdDesc: { ar: "مراقبة ARP على الواجهة مع تنبيهات عبر البريد", en: "Watch ARP on an interface with email alerts" },
    tags: ["arpwatch", "arp", "monitoring", "security"]
  },
  {
    id: "t434",
    name: "Lansweeper",
    url: "https://www.lansweeper.com",
    category: "inventory",
    platform: ["windows"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "منصة جرد تكتشف الأجهزة والبرمجيات تلقائيًا عبر الشبكة والسحابة وتبني صورة شاملة للأصول خلال دقائق. نسختها المجانية تكفي الشركات الصغيرة والفرق التقنية المتواضعة.",
      en: "An asset inventory platform that auto-discovers hardware and software across network and cloud, painting a complete CMDB picture in minutes. Its free tier covers small teams and businesses."
    },
    cmd: "http://<server>:86",
    cmdDesc: { ar: "فتح وحدة تحكم Lansweeper الويب", en: "Open the Lansweeper web console" },
    tags: ["lansweeper", "assets", "discovery", "cmdb"]
  },
  {
    id: "t435",
    name: "Spiceworks Inventory",
    url: "https://www.spiceworks.com",
    category: "inventory",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة جرد مجانية شائعة تدعمها الإعلانات تفحص الشبكة وتوثق الأجهزة وتدير التذاكر في مكان واحد. نقطة بداية ممتازة لفرق تقنية المعلومات الصغيرة ذات الميزانيات المحدودة.",
      en: "A popular ad-supported free inventory tool that scans your network and documents devices and tickets in one place. An excellent starting point for small budget-limited IT teams."
    },
    cmd: "http://localhost:96",
    cmdDesc: { ar: "فتح وحدة تحكم Spiceworks المحلية", en: "Open the local Spiceworks console" },
    tags: ["spiceworks", "inventory", "helpdesk", "free"]
  },
  {
    id: "t436",
    name: "Open-AudIT",
    url: "https://www.open-audit.org",
    category: "inventory",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة اكتشاف وجرد قوية تجمع بين فحوص nmap ووكلاء خفيفين لبناء قاعدة أصول دقيقة مع توثيق التغييرات بتواريخها. تنقل معرفة الشبكة من ذاكرة المهندسين إلى قاعدة بيانات موثوقة.",
      en: "A powerful discovery and inventory platform combining nmap scans with lightweight agents to build an accurate asset base with dated changes. It moves network knowledge from engineers' memory into a trustworthy database."
    },
    cmd: "php /usr/local/open-audit/cli/discover_subnet.php --subnet=10.0.0.0/24",
    cmdDesc: { ar: "تشغيل مهمة اكتشاف لشبكة فرعية", en: "Run a discovery task for a subnet" },
    tags: ["open-audit", "discovery", "cmdb", "nmap"]
  },
  {
    id: "t437",
    name: "GLPI",
    url: "https://glpi-project.org",
    category: "inventory",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة ITSM مفتوحة المصدر تدير الأصول والتذاكر والطلبات مع إدارة عناوين IP والكابلات عبر إضافات. قلب مفتوح المصدر لفرق تقنية المعلومات الباحثة عن بديل عن ServiceNow.",
      en: "An open-source ITSM platform managing assets, tickets, and requests, with IP and cable management via plugins. The open-source heart for IT teams seeking a ServiceNow alternative."
    },
    cmd: "php bin/console glpi:database:install",
    cmdDesc: { ar: "تهيئة قاعدة بيانات GLPI من سطر الأوامر", en: "Initialize the GLPI database from the CLI" },
    tags: ["glpi", "itsm", "assets", "tickets"]
  },
  {
    id: "t438",
    name: "GLPI Agent",
    url: "https://github.com/glpi-project/glpi-agent",
    category: "inventory",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "الوكيل الرسمي لـ GLPI (خليفة FusionInventory) يجمع بيانات الأجهزة والشبكات ويرفعها إلى الخادم فورًا أو وفق جدول. يغذي GLPI بجرد دقيق دون الحاجة إلى فحوص ثقيلة على الشبكة.",
      en: "GLPI's official agent (successor to FusionInventory) gathering hardware and network data and uploading it on demand or on schedule. It feeds GLPI with precise inventory without heavy network scans."
    },
    cmd: "glpi-agent --server http://glpi.example.com/front/inventory.php",
    cmdDesc: { ar: "ربط الوكيل بخادم GLPI وإرسال أول جرد", en: "Attach the agent to a GLPI server and send its first inventory" },
    tags: ["glpi-agent", "fusioninventory", "agent", "discovery"]
  },
  {
    id: "t439",
    name: "OCS Inventory NG",
    url: "https://www.ocsinventory-ng.org",
    category: "inventory",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام جرد مفتوح المصدر يجمع معلومات الأجهزة والبرمجيات عبر وكلاء خفيفين مع صفحات ويب تتكامل بسلاسة مع GLPI. حل ناضج للجرد المؤسسي بلا أي تكلفة ترخيص.",
      en: "An open-source inventory system collecting hardware and software details through lightweight agents, with web pages that integrate tightly with GLPI. A mature, licence-free option for enterprise inventory."
    },
    cmd: "OCSInventory.exe /server=http://ocs.example.com/ocsinventory /force",
    cmdDesc: { ar: "إجبار وكيل OCS على إرسال جرد الجهاز فورًا", en: "Force the OCS agent to submit its inventory now" },
    tags: ["ocs", "inventory", "agent", "glpi"]
  },
  {
    id: "t440",
    name: "Ralph",
    url: "https://github.com/allegro/ralph",
    category: "inventory",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام إدارة مراكز بيانات وأصول مفتوح المصدر من Allegro يوثق الخوادم والرفوف ووحدات الشبكة والملكية والتكاليف. يجيب فورًا عن سؤال «أين يقع هذا الخادم وكم يكلف؟».",
      en: "Allegro's open-source DCIM and asset management system documenting servers, racks, network modules, ownership, and costs. It answers 'where is this server and what does it cost?' instantly."
    },
    cmd: "docker run -d -p 80:80 allegro/ralph",
    cmdDesc: { ar: "تشغيل Ralph داخل حاوية", en: "Run Ralph in a container" },
    tags: ["ralph", "dcim", "assets", "datacenter"]
  },
  {
    id: "t441",
    name: "Device42",
    url: "https://www.device42.com",
    category: "inventory",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة DCIM/CMDB تجمع الجرد الآلي مع تخطيط الارتباطات بين التطبيقات والخوادم والشبكات ومخططات غرف الخوادم. يجعل أثر التأثير واضحًا قبل أي نافذة صيانة.",
      en: "A DCIM/CMDB platform combining automated inventory with app-server-network dependency mapping and datacenter diagrams. Its impact analysis clarifies change risk before maintenance windows."
    },
    cmd: "curl -H \"Authorization: Basic <key>\" https://d42.example.com/api/1.0/devices/",
    cmdDesc: { ar: "سرد الأجهزة عبر واجهة Device42 البرمجية", en: "List devices through the Device42 API" },
    tags: ["device42", "dcim", "cmdb", "mapping"]
  },
  {
    id: "t442",
    name: "SolarWinds IP Address Manager",
    url: "https://www.solarwinds.com/ip-address-manager",
    category: "inventory",
    platform: ["windows"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "مدير عناوين IP من SolarWinds يتتبع الشبكات الفرعية ونسب الاستخدام والتعارضات مع خوادم DHCP وDNS. يجعل الاحتياطي المتاح من العناوين مرئيًا قبل نفادها.",
      en: "SolarWinds' IP address manager tracking subnets, utilisation, and conflicts alongside DHCP and DNS servers. It keeps address headroom visible before you run dry."
    },
    cmd: "http://orion-server/Orion/IPAM/",
    cmdDesc: { ar: "فتح وحدة IPAM داخل وحدة تحكم Orion", en: "Open IPAM inside the Orion console" },
    tags: ["ipam", "solarwinds", "addresses", "dhcp"]
  },
  {
    id: "t443",
    name: "NeighborCacheView",
    url: "https://www.nirsoft.net/utils/neighbor_cache_view.html",
    category: "inventory",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة صغيرة من NirSoft تعرض ذاكرة جيران IPv6 (NDP) في ويندوز مع الأجهزة المكتشفة وحالة الوصول إليها. تختصر تتبع أجهزة IPv6 في الشبكة إلى نظرة واحدة.",
      en: "A tiny NirSoft utility showing Windows' IPv6 neighbor cache (NDP) with resolved devices and their reachability state. It reduces IPv6 endpoint tracking to a single glance."
    },
    cmd: "NeighborCacheView.exe /stext cache.txt",
    cmdDesc: { ar: "تصدير ذاكرة الجيران إلى ملف نصي", en: "Export the neighbor cache to a text file" },
    tags: ["neighborcacheview", "nirsoft", "ipv6", "ndp"]
  },
  {
    id: "t444",
    name: "Snipe-IT",
    url: "https://snipeitapp.com",
    category: "inventory",
    platform: ["web"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "نظام إدارة أصول مفتوح المصدر بواجهة أنيقة يتابع الأجهزة والتراخيص والملحقات مع سجل صيانة كامل. الأشهر في فئته للمؤسسات التي تريد جردًا ذاتي الاستضافة بسيطًا وقويًا.",
      en: "An open-source asset management system with a clean UI tracking hardware, licences, and accessories with full maintenance history. The most popular self-hosted option in its class."
    },
    cmd: "docker run -d -p 8000:80 snipe/snipe-it",
    cmdDesc: { ar: "تشغيل Snipe-IT داخل حاوية", en: "Run Snipe-IT in a container" },
    tags: ["snipe-it", "assets", "inventory", "licences"]
  },
  {
    id: "t445",
    name: "i-doit",
    url: "https://www.i-doit.org",
    category: "inventory",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة CMDB ألمانية مفتوحة الأساس توثق أصول تقنية المعلومات وفق منهجية ITIL مع نسخة مجانية للفرق الصغيرة. توفر تخطيطًا واضحًا للعلاقات بين الخدمات والأجهزة والبرمجيات.",
      en: "A Germany-built open-core CMDB documenting IT assets along ITIL lines, with a free edition for small teams. It brings clear service-to-hardware relationship planning."
    },
    cmd: "php console.php import --profile=network",
    cmdDesc: { ar: "استيراد بيانات الشبكة عبر وحدة سطر أوامر i-doit", en: "Import network data via the i-doit CLI" },
    tags: ["i-doit", "cmdb", "itil", "documentation"]
  },

  // ── Log / السجلات و SIEM ─────────────────────────────────────────────
  {
    id: "t446",
    name: "Graylog",
    url: "https://graylog.org",
    category: "log",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة إدارة سجلات مفتوحة المصدر مبنية فوق Elasticsearch تقدم بحثًا سريعًا ولوحات وتنبيهات على سجلات الشبكات والأجهزة. واجهتها السهلة تجعلها بوابة اقتصادية إلى عالم SIEM للفرق الصغيرة.",
      en: "An open-source log management platform built on Elasticsearch delivering fast search, dashboards, and alerts over network and device logs. Its approachable UI makes it a budget gateway into SIEM."
    },
    cmd: "sudo systemctl start graylog-server",
    cmdDesc: { ar: "تشغيل خدمة خادم Graylog", en: "Start the Graylog server service" },
    tags: ["graylog", "logs", "siem", "alerts"]
  },
  {
    id: "t447",
    name: "Elasticsearch",
    url: "https://www.elastic.co/elasticsearch/",
    category: "log",
    platform: ["cross"],
    license: "freemium",
    difficulty: 4,
    desc: {
      ar: "محرك بحث وتحليل موزّع يخزّن السجلات في فهارس قابلة للتقسيم ويستعلمها بسرعة البرق عبر لغة JSON DSL. الأساس الذي تقوم عليه معظم منظومات السجلات الحديثة.",
      en: "A distributed search and analytics engine storing logs in sharded indices and querying them near-instantly via its JSON DSL. The foundation beneath most modern logging stacks."
    },
    cmd: "curl -X GET \"localhost:9200/_cluster/health?pretty\"",
    cmdDesc: { ar: "فحص صحة عنقود Elasticsearch", en: "Check Elasticsearch cluster health" },
    tags: ["elasticsearch", "search", "index", "logs"]
  },
  {
    id: "t448",
    name: "Logstash",
    url: "https://www.elastic.co/logstash",
    category: "log",
    platform: ["cross"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "خط أنابيب معالجة السجلات من Elastic يستقبل المدخلات من مصادر متنوعة ويحللها بمرشحات قابلة للتوصيل قبل شحنها إلى المخزن. غراء منظومات السجلات الذي يوحّد الصيغ المتباينة.",
      en: "Elastic's log pipeline ingesting inputs from many sources, transforming them with pluggable filters, and shipping them to a store. The glue that unifies heterogeneous log formats."
    },
    cmd: "logstash -f syslog-pipeline.conf --config.test_and_exit",
    cmdDesc: { ar: "اختبار ملف خط أنابيب Logstash قبل التشغيل", en: "Validate a Logstash pipeline file before running it" },
    tags: ["logstash", "pipeline", "logs", "elastic"]
  },
  {
    id: "t449",
    name: "Kibana",
    url: "https://www.elastic.co/kibana",
    category: "log",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "واجهة التصور الرسمية لـ Elasticsearch ترسم لوحات تفاعلية فوق السجلات والقياسات مع أدوات تحليل متقدمة. النافذة التي يرى المستخدم النهائي من منظومة Elastic.",
      en: "Elastic's official visualisation layer drawing interactive dashboards over logs and metrics with advanced analytics. The user-facing window of the Elastic stack."
    },
    cmd: "sudo systemctl start kibana",
    cmdDesc: { ar: "تشغيل خدمة Kibana", en: "Start the Kibana service" },
    tags: ["kibana", "dashboards", "elastic", "observability"]
  },
  {
    id: "t450",
    name: "Splunk Enterprise",
    url: "https://www.splunk.com",
    category: "log",
    platform: ["cross"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "منصة بيانات الآلات الرائدة تجمع السجلات والمقاييس في فهارس بحث فوري بلغة الاستعلام SPL القوية. معيار الصناعة للتحقيق في الحوادث وإنشاء تقارير المتابعة بسرعة.",
      en: "The leading machine-data platform indexing logs and metrics for instant search with its powerful SPL language. The industry yardstick for incident investigation and rapid reporting."
    },
    cmd: "index=network sourcetype=cisco_ios | stats count by host",
    cmdDesc: { ar: "تجميع سجلات أجهزة Cisco حسب المصدر في Splunk", en: "Aggregate Cisco device logs by source in Splunk" },
    tags: ["splunk", "siem", "spl", "search"]
  },
  {
    id: "t451",
    name: "Wazuh",
    url: "https://wazuh.com",
    category: "log",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة أمن مفتوحة المصدر تجمع كشف التسلل ومراقبة سلامة الملفات وتحليل السجلات عبر وكلاء على آلاف الأجهزة. بديل مجاني قوي لمنصات SIEM التجارية باهظة الثمن.",
      en: "An open-source security platform blending intrusion detection, file integrity monitoring, and log analysis via agents on thousands of endpoints. A capable free alternative to costly commercial SIEMs."
    },
    cmd: "sudo systemctl status wazuh-manager",
    cmdDesc: { ar: "فحص حالة مدير Wazuh", en: "Check the Wazuh manager status" },
    tags: ["wazuh", "xdr", "siem", "agents"]
  },
  {
    id: "t452",
    name: "rsyslog",
    url: "https://www.rsyslog.com",
    category: "log",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "خدمة سجلات لينكس السريعة القابلة للتوسع تستقبل رسائل syslog وتصنّفها وتوجهها إلى ملفات أو خوادم بعيدة. النقل القياسي لجمع سجلات أجهزة الشبكات على خادم مركزي.",
      en: "Linux's fast, extensible logging daemon receiving, filtering, and forwarding syslog to files or remote servers. The standard relay for centralising network device logs."
    },
    cmd: "sudo rsyslogd -N1",
    cmdDesc: { ar: "التحقق من صحة إعدادات rsyslog قبل إعادة التشغيل", en: "Validate the rsyslog configuration before restarting" },
    tags: ["rsyslog", "syslog", "logs", "linux"]
  },
  {
    id: "t453",
    name: "syslog-ng",
    url: "https://www.syslog-ng.com",
    category: "log",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "بديل مرن لـ rsyslog يدعم صيغًا حديثة مثل JSON ونقل syslog عبر TLS عبر عدة بروتوكولات. يتفوق في المجمّعات التي تجمع السجلات من آلاف المصادر المتنوعة.",
      en: "A flexible rsyslog alternative supporting modern formats like JSON and TLS-secured syslog across many transports. It shines on aggregators pulling logs from thousands of diverse sources."
    },
    cmd: "sudo syslog-ng-ctl stats",
    cmdDesc: { ar: "عرض إحصاءات المعالجة الحية لـ syslog-ng", en: "Show syslog-ng live processing statistics" },
    tags: ["syslog-ng", "logs", "tls", "aggregator"]
  },
  {
    id: "t454",
    name: "NXLog",
    url: "https://nxlog.co",
    category: "log",
    platform: ["cross"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "جامع سجلات متعدد المنصات يجمع سجلات ويندوز (Event Log) ولينكس مع تحليل وتحويل غنيين قبل الشحن إلى الوجهة. محبوب في البيئات المختلطة التي تغذي أنظمة SIEM.",
      en: "A multi-platform log collector bridging Windows Event Log and Linux sources with rich parsing before shipping to a destination. Popular in hybrid environments feeding SIEM systems."
    },
    cmd: "nxlog -v",
    cmdDesc: { ar: "التحقق من صحة إعدادات NXLog قبل التشغيل", en: "Validate the NXLog configuration" },
    tags: ["nxlog", "logs", "windows", "collector"]
  },
  {
    id: "t455",
    name: "journalctl",
    url: "https://www.freedesktop.org/software/systemd/man/journalctl.html",
    category: "log",
    platform: ["linux"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر استعلام سجلات systemd بكامل قوته: فلترة بالوحدة والوقت والأولوية مع متابعة حية للتدفق. الطريقة الحديثة لقراءة سجلات الخوادم في توزيعات لينكس الحالية.",
      en: "systemd's journal query command at full power: filter by unit, time, and priority while following logs live. The modern way to read server logs on current Linux distributions."
    },
    cmd: "journalctl -u sshd --since \"1 hour ago\" --no-pager",
    cmdDesc: { ar: "عرض سجلات خدمة SSH خلال الساعة الأخيرة", en: "Show SSH service logs from the last hour" },
    tags: ["journalctl", "systemd", "logs", "linux"]
  },
  {
    id: "t456",
    name: "Fluentd",
    url: "https://www.fluentd.org",
    category: "log",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "جامع بيانات مفتوح المصدر يوحّد السجلات من أكثر من 500 مصدر عبر مدخلات ومخرجات قابلة للتوصيل. مشروع متخرج من CNCF وأصبح المرجع في خطوط أنابيب السجلات.",
      en: "An open-source data collector unifying logs from 500+ sources through pluggable inputs and outputs. A CNCF-graduated project that became the reference for log pipelines."
    },
    cmd: "fluentd -c fluent.conf --dry-run",
    cmdDesc: { ar: "اختبار إعدادات Fluentd دون شحن فعلي للبيانات", en: "Test the Fluentd configuration without shipping data" },
    tags: ["fluentd", "cncf", "logs", "pipeline"]
  },
  {
    id: "t457",
    name: "Fluent Bit",
    url: "https://fluentbit.io",
    category: "log",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "قريب Fluentd الخفيف المكتوب بلغة C والمصمم للأنظمة المحدودة والحاويات ببصمة ذاكرة أصغر بكثير. الوكيل الافتراضي لجمع السجلات في مجموعات Kubernetes.",
      en: "Fluentd's lightweight cousin written in C, built for constrained systems and containers with a far smaller memory footprint. The default log agent in Kubernetes clusters."
    },
    cmd: "fluent-bit -i tail -p path=/var/log/syslog -o stdout",
    cmdDesc: { ar: "متابعة ملف syslog وطباعته إلى المخرج القياسي", en: "Tail a syslog file and print it to stdout" },
    tags: ["fluent-bit", "logs", "kubernetes", "lightweight"]
  },
  {
    id: "t458",
    name: "Grafana Loki",
    url: "https://grafana.com/oss/loki/",
    category: "log",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام سجلات قابل للتوسع أفقيًا من فريق Grafana يفهرس الملصقات فقط بدل النص الكامل فيخفض تكلفة التخزين بشكل كبير. يُستعلم بلغة LogQL من نفس لوحات Grafana التي تستخدمها للمقاييس.",
      en: "Grafana's horizontally scalable log system that indexes only labels instead of full text, slashing storage costs. You query it with LogQL from the same dashboards you use for metrics."
    },
    cmd: "logcli query '{job=\"syslog\"} |= \"error\"'",
    cmdDesc: { ar: "البحث عن أخطاء في سجلات syslog عبر لغة LogQL", en: "Search syslog streams for errors with LogQL" },
    tags: ["loki", "logql", "grafana", "logs"]
  },
  {
    id: "t459",
    name: "nfdump",
    url: "https://github.com/phaag/nfdump",
    category: "log",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة معالجة ملفات تدفقات NetFlow الأساسية تجمع وتصفي وتلخص بيانات التدفقات بكفاءة عالية. تعرض أهم المتحدثين والمنافذ والمقاصد بأمر واحد.",
      en: "The NetFlow workhorse that processes flow files—collecting, filtering, and summarising with high efficiency. It surfaces top talkers, ports, and destinations in a single command."
    },
    cmd: "nfdump -r nfcapd.202501011200 -s srcip/bytes -n 10",
    cmdDesc: { ar: "أظهر أعلى 10 عناوين مرسلة حسب البايتات في ملف تدفقات", en: "Show the top 10 source IPs by bytes in a flow file" },
    tags: ["nfdump", "netflow", "flows", "analysis"]
  },
  {
    id: "t460",
    name: "NfSen",
    url: "https://sourceforge.net/projects/nfsen/",
    category: "log",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "واجهة ويب فوق nfdump تعرض تدفقات NetFlow برسوم بيانية زمنية ومقارنات بين محطات الاستشعار. تحوّل ملفات nfcapd الصامتة إلى رؤى بصرية قابلة للمشاركة.",
      en: "A web front end over nfdump charting NetFlow over time and comparing sensors side by side. It turns silent nfcapd files into shareable visual insight."
    },
    cmd: "sudo /opt/nfsen/bin/nfsen start",
    cmdDesc: { ar: "بدء واجهة NfSen ومجمعها", en: "Start the NfSen interface and collector" },
    tags: ["nfsen", "netflow", "nfdump", "graphing"]
  },

  // ── Cloud / شبكات السحابة ────────────────────────────────────────────
  {
    id: "t461",
    name: "AWS Reachability Analyzer",
    url: "https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html",
    category: "cloud",
    platform: ["web"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "خدمة تشخيص داخل VPC تحلل قابلية الوصول بين مواردك منطقيًا (مجموعات الأمان وجداول التوجيه وACLs) وتشرح سبب المنع أو السماح. تتحقق من الاتصال دون إرسال حزمة واحدة فعلًا.",
      en: "A VPC diagnostic that statically analyses reachability between resources—security groups, route tables, and ACLs—and explains exactly what blocks or allows a path. It proves connectivity without sending a single packet."
    },
    cmd: "aws ec2 create-network-insights-path --source eni-0abc123 --destination eni-0def456 --protocol tcp --destination-port 443",
    cmdDesc: { ar: "إنشاء مسار تحليل قابلية وصول بين واجهتي شبكة", en: "Create a reachability analysis path between two interfaces" },
    tags: ["aws", "vpc", "reachability", "troubleshooting"]
  },
  {
    id: "t462",
    name: "Azure Network Watcher",
    url: "https://azure.microsoft.com/en-us/products/network-watcher/",
    category: "cloud",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "حزمة مراقبة وتشخيص من Azure تجمع التقاط الحزم وسجلات التدفقات وأدوات مثل القفزة التالية واستكشاف الاتصال. صندوق أدوات كامل للتحري في شبكات VNet.",
      en: "Azure's monitoring and diagnostics suite combining packet capture, flow logs, and tools like next-hop and connection troubleshoot. A complete toolbox for VNet network sleuthing."
    },
    cmd: "az network watcher test-ip-flow --vm MyVM --direction Inbound --protocol TCP --local 10.0.0.4:443 --remote 203.0.113.7:443",
    cmdDesc: { ar: "التحقق من قرار مجموعة الأمان على تدفق محدد", en: "Check a security group verdict for a specific flow" },
    tags: ["azure", "network-watcher", "vnet", "diagnostics"]
  },
  {
    id: "t463",
    name: "Cloudflare Dashboard",
    url: "https://dash.cloudflare.com",
    category: "cloud",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "وحدة التحكم السحابية لـ Cloudflare تدير DNS والوكالة العكسية وجدار WAF وموازنة الحمل من متصفح واحد مع واجهة برمجية موازية. أشهر مركز تحكم لحافة الإنترنت للمواقع والخدمات.",
      en: "Cloudflare's cloud console managing DNS, reverse proxy, WAF, and load balancing from one browser, with a parallel API. The most popular control centre for the internet edge."
    },
    cmd: "curl -H \"Authorization: Bearer $CF_TOKEN\" https://api.cloudflare.com/client/v4/zones",
    cmdDesc: { ar: "سرد النطاقات عبر واجهة Cloudflare البرمجية", en: "List zones through the Cloudflare API" },
    tags: ["cloudflare", "dns", "waf", "edge"]
  },
  {
    id: "t464",
    name: "Calico",
    url: "https://www.tigera.io/project-calico/",
    category: "cloud",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "شبكة CNI قوية لـ Kubernetes تدعم سياسات شبكية دقيقة وتوجيه BGP أصلي بين العقد دون تراكب إجباري. الخيار المفضل لبيئات الإنتاج التي تتطلب أمانًا وسياسات صارمة.",
      en: "A powerful Kubernetes CNI supporting fine-grained network policy and native BGP routing between nodes without mandatory overlays. The preferred choice for production clusters needing strict policy."
    },
    cmd: "calicoctl node status",
    cmdDesc: { ar: "عرض حالة جلسات BGP لعقد Calico", en: "Show BGP session status for Calico nodes" },
    tags: ["calico", "kubernetes", "cni", "bgp"]
  },
  {
    id: "t465",
    name: "Cilium",
    url: "https://cilium.io",
    category: "cloud",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "شبكة Kubernetes مبنية على تقنية eBPF تنفذ السياسات وموازنة الحمل والتوجيه على مستوى النواة مع رؤية للطبقة السابعة. رائدة الجيل الجديد من شبكات الحاويات عالية الأداء.",
      en: "An eBPF-powered Kubernetes network enforcing policy, load balancing, and routing at kernel level with L7 visibility. It leads the new generation of high-performance container networking."
    },
    cmd: "cilium status",
    cmdDesc: { ar: "فحص حالة وكلاء Cilium والعقد", en: "Check Cilium agents and node status" },
    tags: ["cilium", "ebpf", "kubernetes", "policy"]
  },
  {
    id: "t466",
    name: "Flannel",
    url: "https://github.com/flannel-io/flannel",
    category: "cloud",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "شبكة تراكب بسيطة لـ Kubernetes تبني اتصال pod-to-pod عبر VXLAN بفلسفة «يعمل فورًا». نقطة انطلاق مثالية لفهم مفهوم CNI قبل الانتقال إلى خيارات أعقد.",
      en: "A simple Kubernetes overlay building pod-to-pod networking over VXLAN with a 'just works' philosophy. An ideal starting point for understanding CNI before moving to heavier options."
    },
    cmd: "kubectl -n kube-flannel get pods -o wide",
    cmdDesc: { ar: "فحص قرون Flannel الجاهزة على كل عقدة", en: "Check Flannel's daemonset pods on every node" },
    tags: ["flannel", "vxlan", "kubernetes", "cni"]
  },
  {
    id: "t467",
    name: "Kube-router",
    url: "https://github.com/cloudnativelabs/kube-router",
    category: "cloud",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "حل شبكي شامل لـ Kubernetes يجمع التوجيه وCNI والوكيل القائم على IPVS في ملف ثنائي واحد مبني على BGP. يختار الأداء والبساطة دون مكونات زائدة.",
      en: "An all-in-one Kubernetes networking solution bundling routing, CNI, and an IPVS-based proxy in a single binary grounded in BGP. It picks performance and simplicity with no extra moving parts."
    },
    cmd: "kubectl -n kube-system logs -l k8s-app=kube-router",
    cmdDesc: { ar: "قراءة سجلات قرون kube-router", en: "Read the kube-router pod logs" },
    tags: ["kube-router", "bgp", "ipvs", "kubernetes"]
  },
  {
    id: "t468",
    name: "MetalLB",
    url: "https://github.com/metallb/metallb",
    category: "cloud",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "موازن حمل للخوادم المادية في Kubernetes يمنح خدمات LoadBalancer عناوين IP حقيقية عبر BGP أو ARP. يجسر أشهر فجوة بين المجموعات السحابية والعتاد الموجود في مكانك.",
      en: "A bare-metal load balancer for Kubernetes giving LoadBalancer services real IPs via BGP or ARP. It bridges the most famous gap between cloud clusters and on-prem hardware."
    },
    cmd: "kubectl get ipaddresspool,bgppeer -A",
    cmdDesc: { ar: "فحص مجمعات العناوين وجيران BGP في MetalLB", en: "Inspect MetalLB address pools and BGP peers" },
    tags: ["metallb", "loadbalancer", "bgp", "kubernetes"]
  },
  {
    id: "t469",
    name: "ExternalDNS",
    url: "https://github.com/kubernetes-sigs/external-dns",
    category: "cloud",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "وحدة تحكم لـ Kubernetes تراقب موارد Services وIngress وتحدّث سجلات DNS عند مزودك تلقائيًا. تنهي طقوس تحديث السجلات يدويًا مع كل عملية نشر جديدة.",
      en: "A Kubernetes controller that watches Service and Ingress resources and updates DNS records at your provider automatically. It ends the ritual of hand-editing records on every deployment."
    },
    cmd: "external-dns --source=service --provider=cloudflare --domain-filter=example.com",
    cmdDesc: { ar: "مزامنة DNS من خدمات Kubernetes إلى Cloudflare", en: "Sync Kubernetes services' DNS to Cloudflare" },
    tags: ["external-dns", "dns", "kubernetes", "automation"]
  },
  {
    id: "t470",
    name: "cert-manager",
    url: "https://cert-manager.io",
    category: "cloud",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "وحدة تحكم شهادات لـ Kubernetes تصدر وتجدد شهادات ACME/Let's Encrypt تلقائيًا وتخزنها كأسرار في المجموعة. البوابة القياسية لتشغيل HTTPS داخل الكتلة.",
      en: "A Kubernetes certificate controller issuing and renewing ACME/Let's Encrypt certificates automatically and storing them as secrets. The standard gateway to TLS inside the cluster."
    },
    cmd: "kubectl get certificate,certificaterequest -A",
    cmdDesc: { ar: "عرض حالة الشهارات المُدارة عبر cert-manager", en: "View certificate states managed by cert-manager" },
    tags: ["cert-manager", "tls", "kubernetes", "letsencrypt"]
  },
  {
    id: "t471",
    name: "Envoy",
    url: "https://www.envoyproxy.io",
    category: "cloud",
    platform: ["cross"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "وكيل عالي الأداء لحدود الخدمات من Lyft صار مشروعًا متخرجًا من CNCF بسلسلة مرشحات مرنة تشغل شبكات الخدمات مثل Istio. مستوى البيانات الأساسي لشبكات الخدمات الحديثة.",
      en: "A high-performance edge and service proxy from Lyft, now a CNCF-graduated project, with a flexible filter chain powering service meshes like Istio. The data plane backbone of modern service networking."
    },
    cmd: "envoy --config-path envoy.yaml --log-level warning",
    cmdDesc: { ar: "تشغيل Envoy بإعدادات مخصصة", en: "Run Envoy with a custom configuration" },
    tags: ["envoy", "proxy", "cncf", "service-mesh"]
  },
  {
    id: "t472",
    name: "Traefik",
    url: "https://traefik.io",
    category: "cloud",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "وكيل عكسي سحابي الأصل يكتشف الحاويات والخدمات ويولّد المسارات تلقائيًا مع لوحة تحكم حية. محبوب في Docker وKubernetes لسهولة إعداد HTTPS فيه.",
      en: "A cloud-native reverse proxy that discovers containers and services, generates routing automatically, and ships a live dashboard. Beloved in Docker and Kubernetes for zero-friction HTTPS."
    },
    cmd: "docker run -p 80:80 -p 8080:8080 traefik:v3.3 --providers.docker",
    cmdDesc: { ar: "تشغيل Traefik مع مزود Docker", en: "Run Traefik with the Docker provider" },
    tags: ["traefik", "proxy", "docker", "ingress"]
  },
  {
    id: "t473",
    name: "Istio",
    url: "https://istio.io",
    category: "cloud",
    platform: ["cross"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "أشهر شبكات خدمات تضيف تشفير mTLS وقواعد الحركة والمراقبة عبر وكلاء Envoy جانبية دون تغيير التطبيقات. مكثف الموارد لكنه كامل الميزات لبيئات المؤسسات.",
      en: "The best-known service mesh injecting mTLS, traffic rules, and telemetry through sidecar Envoy proxies without app changes. Resource-heavy but feature-complete for the enterprise."
    },
    cmd: "istioctl install --set profile=demo --skip-confirmation",
    cmdDesc: { ar: "تثبيت Istio بملف الإعداد التجريبي", en: "Install Istio with the demo profile" },
    tags: ["istio", "service-mesh", "envoy", "mtls"]
  },
  {
    id: "t474",
    name: "Linkerd",
    url: "https://linkerd.io",
    category: "cloud",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "شبكة خدمات خفيفة الوزن تركز على البساطة والأداء بوكلاء مدمجة مكتوبة بلغة Rust بدل الجوارب الثقيلة. توفر mTLS من الصندوق وأسهل تجربة تشغيل في فئتها.",
      en: "A lightweight service mesh focused on simplicity and performance with built-in Rust proxies instead of heavy sidecars. It offers mTLS out of the box and the smoothest ops story in its class."
    },
    cmd: "linkerd check --pre",
    cmdDesc: { ar: "التحقق من جهوزية المجموعة قبل تثبيت Linkerd", en: "Verify cluster readiness before installing Linkerd" },
    tags: ["linkerd", "service-mesh", "rust", "mtls"]
  },
  {
    id: "t475",
    name: "CoreDNS",
    url: "https://coredns.io",
    category: "cloud",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "خادم DNS مكتوب بلغة Go أصبح الافتراضي لاكتشاف خدمات Kubernetes مع سلسلة إضافات مرنة تشكل سلوك الاستعلام. الوريث الروحي لـ SkyDNS بمعمارٍ أحدث بكثير.",
      en: "A Go-based DNS server that became Kubernetes' default service discovery engine, with a flexible plugin chain shaping query behaviour. The spiritual successor to SkyDNS on a far more modern architecture."
    },
    cmd: "coredns -conf Corefile",
    cmdDesc: { ar: "تشغيل CoreDNS بإعدادات ملف Corefile", en: "Run CoreDNS with the Corefile configuration" },
    tags: ["coredns", "dns", "kubernetes", "go"]
  },

  // ── Windows / شبكات ويندوز ────────────────────────────────────────────
  {
    id: "t476",
    name: "netsh",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netsh",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "إطار أوامر ويندوز العملاق لإعداد كل ما يتعلق بالشبكة: من عناوين IP وجدار Windows الناري إلى ملفات Wi-Fi وإعدادات NDIS. بوابة البرمجة النصية الكلاسيكية لتهيئة ويندوز مركزيًا.",
      en: "Windows' giant command framework for configuring everything network: IP settings, the firewall, Wi-Fi profiles, and NDIS. The classic scripting entry point for central Windows provisioning."
    },
    cmd: "netsh wlan show profiles",
    cmdDesc: { ar: "عرض ملفات Wi-Fi المحفوظة على الجهاز", en: "List saved Wi-Fi profiles on the machine" },
    tags: ["netsh", "windows", "configuration", "cli"]
  },
  {
    id: "t477",
    name: "tracert",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر ويندوز لتتبع مسار الحزم عبر حتى 30 قفزة ICMP مع قياس زمن الذهاب والإياب لكل قفزة على حدة. أول ما يشغّله مهندس الدعم عند تذكرة تصفح بطيء.",
      en: "Windows' path-tracing command following packets over up to 30 ICMP hops with per-hop round-trip times. The first thing helpdesk runs on a 'the site is slow' ticket."
    },
    cmd: "tracert -d 8.8.8.8",
    cmdDesc: { ar: "تتبع المسار دون حل أسماء القفزات", en: "Trace the path without resolving hop names" },
    tags: ["tracert", "icmp", "routing", "windows"]
  },
  {
    id: "t478",
    name: "pathping",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/pathping",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أمر يجمع بين tracert وping فيختبر كل قفزة مئات المرات ويحسب نسبة فقد الحزم والتأخير لكل موجّه. كاشف اختناقات المسار الذي يتفوق على tracert العادي.",
      en: "A hybrid of tracert and ping that probes each hop a hundred times and computes per-router packet loss and delay. The path bottleneck detector that outclasses plain tracert."
    },
    cmd: "pathping -n 8.8.8.8",
    cmdDesc: { ar: "قياس الفقد والتأخير لكل قفزة نحو الهدف", en: "Measure per-hop loss and delay toward a target" },
    tags: ["pathping", "latency", "loss", "windows"]
  },
  {
    id: "t479",
    name: "nbtstat",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nbtstat",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أمر تشخيص NetBIOS الكلاسيكي يكشف أسماء أجهزة ويندوز وعناوينها المسجلة في الشبكة المحلية. ما يزال مفيدًا في بيئات SMB والأنظمة القديمة المتوارثة.",
      en: "The classic NetBIOS diagnostic revealing Windows machine names and their registered names on the LAN. Still handy in SMB and legacy estates."
    },
    cmd: "nbtstat -A 192.168.1.10",
    cmdDesc: { ar: "الاستعلام عن أسماء NetBIOS لجهاز بعيد", en: "Query a remote host's NetBIOS names" },
    tags: ["nbtstat", "netbios", "smb", "windows"]
  },
  {
    id: "t480",
    name: "netstat (Windows)",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة ويندوز لعرض الاتصالات النشطة والمنافذ المستمعة والعمليات المالكة لكل مقبس مع روابط PID. تفصل تحليل المنافذ عن قيود مدير المهام.",
      en: "Windows' tool listing active connections, listening ports, and the owning process per socket with PID mapping. It detaches port analysis from Task Manager's limits."
    },
    cmd: "netstat -ano | findstr :443",
    cmdDesc: { ar: "عرض اتصالات المنفذ 443 مع معرفات عملياتها", en: "Show port 443 connections with owning PIDs" },
    tags: ["netstat", "ports", "tcp", "windows"]
  },
  {
    id: "t481",
    name: "arp (Windows)",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/arp",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر ويندوز لعرض جدول ARP المحلي وتعديله وهو ما يربط عناوين IP بعناوين MAC في الشبكة المحلية. أساس تشخيص اتصالات الطبقة الثانية واكتشاف حالات الانتحال.",
      en: "Windows' command to view and modify the local ARP table binding IPs to MAC addresses on the LAN. The basis of Layer-2 connectivity checks and spoof detection."
    },
    cmd: "arp -a",
    cmdDesc: { ar: "عرض جدول ARP الحالي لكل الواجهات", en: "Display the current ARP table for all interfaces" },
    tags: ["arp", "mac", "l2", "windows"]
  },
  {
    id: "t482",
    name: "getmac",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/getmac",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر ويندوز يعيد عناوين MAC لكل المحولات الشبكية مع أسماء طبقات النقل المقابلة لها بسرعة ودقة. يجمع حقائق عملية يخفيها ipconfig أحيانًا.",
      en: "A Windows command returning MAC addresses for all adapters along with their transport names, fast and precise. It surfaces practical facts ipconfig sometimes hides."
    },
    cmd: "getmac /v /fo table",
    cmdDesc: { ar: "عرض عناوين MAC بتفصيل وبصيغة جدول", en: "List MAC addresses verbosely in table format" },
    tags: ["getmac", "mac", "adapters", "windows"]
  },
  {
    id: "t483",
    name: "ipconfig",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر ويندوز الأول للشبكات: يعرض التكوين ويجدد عقود DHCP ويصفر ذاكرة DNS المخبأة. أمر واحد يحل نصف تذاكر «لا يوجد اتصال بالإنترنت».",
      en: "Windows' first networking command: it shows the configuration, renews DHCP leases, and flushes the DNS cache. One command that solves half of 'no internet' tickets."
    },
    cmd: "ipconfig /all",
    cmdDesc: { ar: "عرض التكوين الكامل لكل المحولات الشبكية", en: "Show the full configuration of all adapters" },
    tags: ["ipconfig", "dhcp", "dns", "windows"]
  },
  {
    id: "t484",
    name: "route (Windows)",
    url: "https://ss64.com/nt/route.html",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أمر إدارة جدول التوجيه في ويندوز لطباعة المسارات الثابتة وإضافتها وحذفها. أداتك لضبط اختيار المسارات عند الربط مع شبكات متعددة.",
      en: "Windows' routing-table command to print, add, and remove static routes. Your lever for shaping path selection when multi-homing."
    },
    cmd: "route print -4",
    cmdDesc: { ar: "طباعة جدول توجيه IPv4 في ويندوز", en: "Print the Windows IPv4 routing table" },
    tags: ["route", "routing", "static-routes", "windows"]
  },
  {
    id: "t485",
    name: "Test-NetConnection",
    url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر PowerShell يجمع اختبار ping وفحص منفذ TCP وتتبع المسار في أمر واحد قابل للبرمجة النصية. البديل الحديث الودود للأوامر المتفرقة القديمة.",
      en: "A PowerShell cmdlet combining ping, TCP port tests, and route tracing into one scriptable command. The friendly modern replacement for scattered legacy tools."
    },
    cmd: "Test-NetConnection 8.8.8.8 -Port 443",
    cmdDesc: { ar: "اختبار ping وفحص منفذ TCP 443 على الهدف", en: "Ping and TCP-test port 443 on a target" },
    tags: ["powershell", "tcp", "ping", "windows"]
  },
  {
    id: "t486",
    name: "Get-NetAdapter",
    url: "https://learn.microsoft.com/en-us/powershell/module/netadapter/get-netadapter",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر PowerShell يستعرض المحولات الشبكية وحالتها وسرعة الوصلة وMTU في جدول نظيف. أساس سكربتات فحص السلامة التي تتحقق من حالة الوصلات.",
      en: "A cmdlet listing network adapters with status, link speed, and MTU in a clean table. The basis of health-check scripts that validate link state."
    },
    cmd: "Get-NetAdapter | Format-Table Name,Status,LinkSpeed",
    cmdDesc: { ar: "عرض المحولات مع حالتها وسرعة الوصلة", en: "Show adapters with status and link speed" },
    tags: ["powershell", "adapters", "status", "windows"]
  },
  {
    id: "t487",
    name: "Get-NetTCPConnection",
    url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أمر PowerShell يعادل netstat لكن بقوة خط الكائنات والفلترة البرمجية. يفحص اتصالات TCP حسب العملية والحالة بدقة عالية.",
      en: "A cmdlet equivalent to netstat with object-pipeline power and programmatic filtering. It inspects per-process and per-state TCP connections with precision."
    },
    cmd: "Get-NetTCPConnection -State Listen | Format-Table LocalAddress,LocalPort,OwningProcess",
    cmdDesc: { ar: "عرض المنافذ المستمعة مع العمليات المالكة لها", en: "List listening ports with their owning processes" },
    tags: ["powershell", "tcp", "connections", "windows"]
  },
  {
    id: "t488",
    name: "pktmon",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/pktmon",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "مراقب الحزم المدمج في ويندوز الحديث يلتقط الأحداث بصيغة ETL ويحوّلها إلى pcap عبر etl2pcapng. ما كان يتطلب تثبيت برامج تشغيل صار أمرًا واحدًا مدمجًا في النظام.",
      en: "The packet monitor built into modern Windows capturing events to ETL and converting them to PCAP with etl2pcapng. What used to need driver installs is now one built-in command."
    },
    cmd: "pktmon etl2pcapng PktMon.etl -o capture.pcapng",
    cmdDesc: { ar: "تحويل تتبع pktmon إلى ملف pcap يفتح في Wireshark", en: "Convert a pktmon trace to a PCAP openable in Wireshark" },
    tags: ["pktmon", "capture", "etw", "windows"]
  },
  {
    id: "t489",
    name: "TCPView",
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/tcpview",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة Sysinternals رسومية تعرض كل نقطة نهاية واتصال مع العملية المالكة له في زمن حقيقي. خيار «انقر بدل الكتابة» لتحليل المنافذ والاتصالات.",
      en: "A Sysinternals GUI showing every endpoint and connection with its owning process in real time. The click-instead-of-type option for port and connection analysis."
    },
    cmd: "tcpview -accepteula",
    cmdDesc: { ar: "تشغيل TCPView مع قبول اتفاقية الاستخدام", en: "Launch TCPView accepting the EULA" },
    tags: ["tcpview", "sysinternals", "ports", "gui"]
  },
  {
    id: "t490",
    name: "PsPing",
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/psping",
    category: "windows",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة Sysinternals تجمع ping التقليدي واختبار منفذ TCP وping عبر TCP واختبار النطاق الترددي. تقيس زمن الاتصال الحقيقي كما تشعر به تطبيقات العملاء.",
      en: "A Sysinternals tool combining ICMP ping, TCP port checks, TCP-latency ping, and bandwidth tests. It measures the real connect latency client applications actually feel."
    },
    cmd: "psping 8.8.8.8:443",
    cmdDesc: { ar: "قياس زمن الاتصال بمنفذ 443 على الهدف", en: "Measure connect latency to a target on port 443" },
    tags: ["psping", "sysinternals", "latency", "tcp"]
  },

  // ── Hardware / العتاد والفحص ─────────────────────────────────────────
  {
    id: "t491",
    name: "Fluke LinkIQ",
    url: "https://www.fluke.com/en-us/product/network-cable-test/linkiq",
    category: "hardware",
    platform: ["cross"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "جهاز يدوي من Fluke يتحقق من كابلات الشبكة (خريطة الأسلاك) ويؤهل PoE مع قياس الطاقة المسلّمة فعليًا. أول جهاز يفتحه الفني عند تذكرة «المنفذ لا يعمل».",
      en: "Fluke's handheld unit verifying cable wire maps, qualifying PoE, and measuring the power actually delivered. The first device a technician opens on a 'dead port' ticket."
    },
    cmd: "Plug cable → select WIRE MAP → press TEST",
    cmdDesc: { ar: "وصّل الكابل واختر فحص الخريطة ثم اضغط زر الاختبار", en: "Plug the cable in, choose wire map, then press TEST" },
    tags: ["fluke", "linkiq", "poe", "cable-test"]
  },
  {
    id: "t492",
    name: "Fluke DSX CableAnalyzer",
    url: "https://www.fluke.com",
    category: "hardware",
    platform: ["cross"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "جهاز شهادة الكابلات النحاسية الاحترافي يقيس NEXT وفقد الإرجاع وفق حدود TIA/ISO وينتج تقارير عقد معتمدة. المعيار الذي تسلّم به شركات التركيب مشاريعها.",
      en: "Fluke's professional copper certification analyzer measuring NEXT, return loss, and more against TIA/ISO limits, producing contract-grade reports. The yardstick installation companies hand over with projects."
    },
    cmd: "Attach permanent-link adapter → AUTO TEST → save report to LinkWare",
    cmdDesc: { ar: "ثبّت محول القياس وشغّل الاختبار التلقائي واحفظ التقرير", en: "Attach the adapter, run AUTO TEST, and save the report" },
    tags: ["fluke", "dsx", "certification", "cat6a"]
  },
  {
    id: "t493",
    name: "Fluke MicroScanner2",
    url: "https://www.fluke.com",
    category: "hardware",
    platform: ["cross"],
    license: "paid",
    difficulty: 1,
    desc: {
      ar: "جهاز فحص كابلات مضغوط شائع يعرض خريطة الأسلاك وطولها والمسافة حتى العطل ووجود PoE. سلف LinkIQ الذي ما يزال يعمل في حقائب آلاف الفنيين.",
      en: "A compact legacy cable verifier displaying wire map, length, distance-to-fault, and PoE presence. LinkIQ's predecessor still riding in thousands of tool bags."
    },
    cmd: "Plug into port → read wire map & length on screen",
    cmdDesc: { ar: "وصّل الكابل بالمنفذ واقرأ الخريطة والطول من الشاشة", en: "Plug into the port and read map and length off the screen" },
    tags: ["fluke", "microscanner", "wiremap", "poe"]
  },
  {
    id: "t494",
    name: "Fluke Pro3000 Tone Generator & Probe",
    url: "https://www.fluke.com",
    category: "hardware",
    platform: ["cross"],
    license: "paid",
    difficulty: 1,
    desc: {
      ar: "زوج مولّد نغمة ومجس (toner & probe) لتعقب الكابلات داخل الجدران والأسقف دون فصلها. الحل الأسرع لسؤال «أي منفذ في لوحة الباتش هو هذا الكابل؟».",
      en: "A tone-generator and probe pair for tracing cables inside walls and ceilings without disconnecting them. The fastest mechanical answer to 'which patch panel port is this cable?'"
    },
    cmd: "Clip tone sender on pair → sweep patch ports with probe",
    cmdDesc: { ar: "ثبّت المرسل على زوج الأسلاك ثم مرّر المجس على المنافذ حتى تسمع النغمة", en: "Clip the sender on a pair, then sweep ports with the probe until you hear the tone" },
    tags: ["toner", "probe", "tracing", "punch-down"]
  },
  {
    id: "t495",
    name: "TRENDnet TC-NT2",
    url: "https://www.trendnet.com/products/TC-NT2",
    category: "hardware",
    platform: ["cross"],
    license: "paid",
    difficulty: 1,
    desc: {
      ar: "فاحص كابلات شبكية اقتصادي بوحدة رئيسية ووحدة بعيدة يعرض خريطة أسلاك الكابل ويكتشف الأعطال. جهاز الجميع الأول قبل الاستثمار في معدات أغلى.",
      en: "A budget network cable tester with a main and remote unit showing wire maps and detecting faults. Everyone's first tester before investing in pro gear."
    },
    cmd: "Attach main & remote units to cable ends → read LED map",
    cmdDesc: { ar: "وصّل الوحدتين بطرفي الكابل واقرأ مصابيح خريطة الأسلاك", en: "Hook both units to the cable ends and read the LED wire map" },
    tags: ["trendnet", "tester", "wiremap", "budget"]
  },
  {
    id: "t496",
    name: "Fluke SimpliFiber Pro",
    url: "https://www.fluke.com",
    category: "hardware",
    platform: ["cross"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "جهاز قياس القدرة الضوئية في الألياف مع مصدر إشارة معاير ومحدد أعطال مرئي (VFL) مدمج. يتحقق من روابط الألياف في ثوانٍ بدل التخمين.",
      en: "An optical power meter kit with a calibrated light source and a built-in visual fault locator. It verifies fiber links in seconds instead of guesswork."
    },
    cmd: "Connect source + meter → read dBm & computed loss",
    cmdDesc: { ar: "وصّل المصدر وجهاز القياس واقرأ القدرة بالديسيبل والفقد المحسوب", en: "Hook up source and meter, read power in dBm and computed loss" },
    tags: ["fiber", "dbm", "optical-meter", "vfl"]
  },
  {
    id: "t497",
    name: "Fluke OptiFiber Pro OTDR",
    url: "https://www.fluke.com",
    category: "hardware",
    platform: ["cross"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "جهاز عاكس ضوئي احترافي (OTDR) يرسم منحنى الانعكاس على طول الألياف ليحدد مواقع الكسور والوصلات بدقة الأمتار. العين التي ترى داخل شبكات الألياف المدفونة.",
      en: "A professional OTDR drawing the reflection curve along a fiber to locate breaks and splices within metres. The eye that sees inside buried fiber plant."
    },
    cmd: "Set wavelength → connect launch cable → AUTOTEST",
    cmdDesc: { ar: "حدد الطول الموجي ووصّل كابل البدء ثم شغّل الاختبار التلقائي", en: "Pick the wavelength, attach the launch cable, and run AUTOTEST" },
    tags: ["otdr", "fiber", "reflectometer", "fault-location"]
  },
  {
    id: "t498",
    name: "Viavi FiberChek",
    url: "https://www.viavisolutions.com",
    category: "hardware",
    platform: ["cross"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "مجس فحص نهايات الألياف يعرض وجوه الوصلات على شاشته ويقيّمها تلقائيًا وفق معايير IEC. يمنع أشهر أسباب أعطال مراكز البيانات: الوصلات الملوثة.",
      en: "A handheld connector end-face probe that displays and grades fiber cleanliness against IEC standards on its own screen. It prevents the top datacenter outage cause: dirty connectors."
    },
    cmd: "Dock on connector → tap CAPTURE → view pass/fail verdict",
    cmdDesc: { ar: "ثبّت الجهاز على الوصلة واضغط الالتقاط وشاهد الحكم", en: "Dock onto the connector, tap CAPTURE, and view the verdict" },
    tags: ["fiberchek", "inspection", "connectors", "iec-61300"]
  },
  {
    id: "t499",
    name: "NetAlly LinkRunner AT",
    url: "https://www.netally.com",
    category: "hardware",
    platform: ["cross"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "جهاز «متعدد قياسات الشبكة» اليدوي يجري اختبارات DHCP وDNS والبوابة و802.1X وPoE بضغطة زر واحدة. إثبات ميداني سريع لما إذا كانت المشكلة من المأخذ أم من الشبكة.",
      en: "A handheld 'network multimeter' running DHCP, DNS, gateway, 802.1X, and PoE tests at a button press. Fast field proof of whether the problem is the jack or the network."
    },
    cmd: "Plug into wall port → press AUTO TEST → review results",
    cmdDesc: { ar: "وصّل الجهاز بمأخذ الجدار واضغط الاختبار التلقائي ثم راجع النتائج", en: "Plug into the wall port, press AUTO TEST, and review results" },
    tags: ["linkrunner", "netally", "field-test", "poe"]
  },
  {
    id: "t500",
    name: "Cisco USB Console Cable",
    url: "https://www.cisco.com",
    category: "hardware",
    platform: ["cross"],
    license: "paid",
    difficulty: 1,
    desc: {
      ar: "كابل وحدة تحكم USB من Cisco (CAB-CONSOLE-USB) يعمل برقاقة FTDI ليظهر كمنفذ تسلسلي افتراضي يصل مباشرة إلى CLI. ينهي معاناة منافذ DB9 القديمة ومحولاتها في حقيبتك.",
      en: "Cisco's USB console cable (CAB-CONSOLE-USB) built on the FTDI chip, presenting a virtual serial port straight to the device CLI. It retires DB9 dongles from your laptop bag."
    },
    cmd: "Plug into device USB port → screen /dev/ttyUSB0 115200",
    cmdDesc: { ar: "وصّل الكابل بمنفذ USB وافتح جلسة طرفية بسرعة 115200", en: "Plug into the USB port and open a 115200 terminal session" },
    tags: ["console", "ftdi", "usb", "cisco"]
  }
];
