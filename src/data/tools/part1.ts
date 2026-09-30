import type { Tool } from "@/lib/types";

// ─── TOOLS PART 1: t001–t100 ─────────────────────────────────────────────
// Categories: scan (t001–t025), sniff (t026–t050),
//             monitor (t051–t075), wireless (t076–t100)

export const TOOLS_PART1: Tool[] = [
  // ── Scan / المسح والاستكشاف ──────────────────────────────────────────
  {
    id: "t001",
    name: "Nmap",
    url: "https://nmap.org",
    category: "scan",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أشهر ماسح منافذ وشبكات في العالم، يكتشف الأجهزة الحية والمنافذ المفتوحة والخدمات العاملة وأنظمة التشغيل عبر عشرات تقنيات الفحص المتقدمة. هو المعيار الفعلي في استكشاف الشبكات وأول أداة يتعلمها كل مهندس شبكات وكل مختبِر اختراق.",
      en: "The world's most famous network and port scanner, discovering live hosts, open ports, running services, and operating systems through dozens of advanced scan techniques. It is the de facto standard for network discovery and the first tool every network engineer and pentester learns."
    },
    cmd: "nmap -sV -O 192.168.1.0/24",
    cmdDesc: { ar: "فحص الشبكة مع كشف الخدمات ونظام التشغيل", en: "Scan the network with service & OS detection" },
    tags: ["nmap", "port-scanning", "enumeration", "nse"]
  },
  {
    id: "t002",
    name: "Zenmap",
    url: "https://nmap.org/zenmap/",
    category: "scan",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "الواجهة الرسومية الرسمية لـ Nmap تعرض نتائج الفحص في مخطط طوبولوجي وتقدم قوالب أوامر جاهزة تُشغَّل بضغطة زر. مثالية للمبتدئين الذين لم يتقنوا بعد كتابة أوامر Nmap يدويًا.",
      en: "The official graphical front-end for Nmap, presenting scan results in a topology map and offering ready-made command profiles that run with one click. Ideal for beginners who have not yet mastered writing Nmap commands by hand."
    },
    cmd: "nmap -T4 -A -v 192.168.1.1",
    cmdDesc: { ar: "فحص مكثف عبر قالب Zenmap الافتراضي", en: "Intense scan using Zenmap's default profile" },
    tags: ["zenmap", "gui", "nmap", "topology"]
  },
  {
    id: "t003",
    name: "Masscan",
    url: "https://github.com/robertdavidgraham/masscan",
    category: "scan",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "ماسح منافذ غير متزامن قادر على مسح الإنترنت بأكمله في أقل من ست دقائق بمعدل ملايين الحزم في الثانية. يُستخدم في المشاريع واسعة النطاق وأبحاث الأمن التي يتعذر فيها استخدام Nmap لبطئه.",
      en: "An asynchronous TCP port scanner capable of scanning the entire Internet in under six minutes at millions of packets per second. It is used for large-scale projects and security research where Nmap would simply be too slow."
    },
    cmd: "masscan 10.0.0.0/8 -p 80,443 --rate 10000",
    cmdDesc: { ar: "مسح نطاق كبير بحثًا عن منافذ الويب بمعدل 10 آلاف حزمة/ثانية", en: "Scan a large range for web ports at 10k packets/sec" },
    tags: ["masscan", "async", "internet-scale", "port-scanning"]
  },
  {
    id: "t004",
    name: "RustScan",
    url: "https://github.com/RustScan/RustScan",
    category: "scan",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "ماسح منافذ مكتوب بلغة Rust يمسح كل المنافذ الـ65535 في ثوانٍ ثم يمرر النتائج تلقائيًا إلى Nmap لكشف الخدمات. يجمع بين سرعة Rust وقوة Nmap في أداة واحدة سريعة التثبيت.",
      en: "A Rust-written port scanner that sweeps all 65,535 ports in seconds and pipes open ports straight into Nmap for service detection. It combines Rust speed with Nmap power in one easy-to-install tool."
    },
    cmd: "rustscan -a 192.168.1.0/24 --ulimit 5000",
    cmdDesc: { ar: "فحص سريع للشبكة وإحالة المنافذ المفتوحة إلى Nmap", en: "Fast network scan that pipes open ports to Nmap" },
    tags: ["rustscan", "rust", "fast", "nmap-bridge"]
  },
  {
    id: "t005",
    name: "Unicornscan",
    url: "https://www.kali.org/tools/unicornscan/",
    category: "scan",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "ماسح شبكات غير متزامن يركّز على استكشاف المعلومات وإرسال المحفزات، ويقيس استجابات TCP وUDP لبصمة أنظمة التشغيل. أداة كلاسيكية في توزيعة Kali لمسح نطاقات واسعة بسرعة عالية.",
      en: "An asynchronous network scanner focused on information gathering and stimulus-response measurement across TCP and UDP for OS fingerprinting. A Kali classic for sweeping wide ranges at high speed."
    },
    cmd: "unicornscan -mT -r 500 192.168.1.0/24:1-65535",
    cmdDesc: { ar: "مسح TCP لكل المنافذ بمعدل 500 حزمة في الثانية", en: "TCP scan of all ports at 500 packets per second" },
    tags: ["unicornscan", "async", "udp", "os-fingerprint"]
  },
  {
    id: "t006",
    name: "hping3",
    url: "https://www.kali.org/tools/hping/",
    category: "scan",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منشئ حزم TCP/IP على سطر الأوامر يرسل حزمًا مصنوعة يدويًا لاختبار جدران الحماية وقواعد المنافذ وسلوك المكدّسات. أداة مرجعية لفهم كيف تستجيب الأجهزة لأنواع الحزم المختلفة.",
      en: "A command-line TCP/IP packet crafter that sends hand-built packets to test firewalls, port rules, and stack behavior. A reference tool for understanding how hosts respond to different packet types."
    },
    cmd: "hping3 -S 192.168.1.1 -p 80",
    cmdDesc: { ar: "إرسال حزم SYN إلى منفذ 80 لاختبار استجابته", en: "Send SYN packets to port 80 to test its response" },
    tags: ["hping", "packet-crafting", "firewall-testing", "syn-scan"]
  },
  {
    id: "t007",
    name: "Nping",
    url: "https://nmap.org/nping/",
    category: "scan",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة من عائلة Nmap لتوليد حزم الشبكة وقياس زمن الاستجابة عبر ICMP وTCP وUDP وARP. تفيد في اختبار قواعد الجدار الناري وقياس جودة الاتصال وقابلية الوصول للمنافذ.",
      en: "A tool from the Nmap family for generating network packets and measuring latency across ICMP, TCP, UDP, and ARP. Useful for testing firewall rules, measuring link quality, and checking port reachability."
    },
    cmd: "nping --tcp -p 443 --syn 192.168.1.1",
    cmdDesc: { ar: "إرسال حزم SYN لاختبار وصول منفذ 443", en: "Send SYN packets to test reachability of port 443" },
    tags: ["nping", "nmap", "packet-crafting", "latency"]
  },
  {
    id: "t008",
    name: "Fping",
    url: "https://fping.org",
    category: "scan",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "بديل متطور لأمر ping يرسل طلبات ICMP إلى مئات الأهداف بالتوازي من قائمة أو نطاق شبكي كامل. أسرع طريقة لتحديد الأجهزة الحية في شبكة كبيرة قبل الفحص التفصيلي.",
      en: "An advanced ping alternative that sends ICMP requests to hundreds of targets in parallel from a list or an entire network range. The fastest way to find live hosts in a large network before detailed scanning."
    },
    cmd: "fping -g 192.168.1.0/24 -a",
    cmdDesc: { ar: "استكشاف الأجهزة الحية في نطاق الشبكة كاملًا", en: "Discover live hosts across the whole subnet" },
    tags: ["fping", "icmp", "ping-sweep", "parallel"]
  },
  {
    id: "t009",
    name: "Netdiscover",
    url: "https://github.com/netdiscover-scanner/netdiscover",
    category: "scan",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة استكشاف شبكة تعتمد على طلبات ARP لرصد الأجهزة النشطة في الشبكات المحلية سلكية ولاسلكية دون توليد حركة DNS أو ICMP. ممتازة في الشبكات التي لا يكفي فيها جدول ARP وحده.",
      en: "A network discovery tool that uses ARP requests to reveal active hosts on local wired and wireless networks without generating DNS or ICMP noise. Excellent on networks where the ARP table alone is not enough."
    },
    cmd: "netdiscover -r 192.168.1.0/24",
    cmdDesc: { ar: "رصد الأجهزة النشطة عبر استجواب ARP للنطاق", en: "Detect active hosts by ARP-probing the range" },
    tags: ["netdiscover", "arp", "layer2", "discovery"]
  },
  {
    id: "t010",
    name: "arp-scan",
    url: "https://github.com/royhills/arp-scan",
    category: "scan",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة سطر أوامر ترسل طلبات ARP لكل عنوان في الشبكة المحلية وتعرض العناوين وأجهزة MAC ومصنّعيها من قاعدة OUI. أدق طريقة لإحصاء كل جهاز على طبقة الرابط لأن ARP نادرًا ما يُحجب.",
      en: "A command-line tool that sends ARP requests to every address on the LAN and lists IPs, MAC addresses, and vendors from its OUI database. The most reliable way to enumerate every Layer-2 device, since ARP is rarely blocked."
    },
    cmd: "arp-scan --localnet",
    cmdDesc: { ar: "مسح الشبكة المحلية وعرض مصنّعي بطاقات الشبكة", en: "Scan the local network and show NIC vendors" },
    tags: ["arp-scan", "arp", "oui", "lan"]
  },
  {
    id: "t011",
    name: "Angry IP Scanner",
    url: "https://angryip.org",
    category: "scan",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "ماسح عناوين IP متعدد المنصات بواجهة رسومية خفيفة يتحقق من كل جهاز عبر ping ويفحص المنافذ المحددة. يصدّر النتائج بصيغ CSV وXML وTXT مما يجعله عمليًا للجرد السريع.",
      en: "A lightweight cross-platform GUI IP scanner that checks each host with ping and probes selected ports. It exports results to CSV, XML, and TXT, making it practical for quick inventories."
    },
    cmd: "ipscan 192.168.1.0/24",
    cmdDesc: { ar: "مسح الشبكة المحلية بأكملها عبر الواجهة الرسومية", en: "Scan the entire local network through the GUI" },
    tags: ["angry-ip", "gui", "java", "host-discovery"]
  },
  {
    id: "t012",
    name: "Advanced IP Scanner",
    url: "https://www.advanced-ip-scanner.com",
    category: "scan",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "ماسح شبكات مجاني لويندوز يكتشف الأجهزة والمجلدات المشتركة ويعرض حالة كل عنوان في ثوانٍ. يوفر وصولًا بعيدًا بنقرة واحدة إلى الأجهزة عبر RDP وRadmin لإدارة الشبكات الصغيرة بسهولة.",
      en: "A free Windows network scanner that discovers devices and shared folders and shows the status of every address within seconds. One-click remote access via RDP and Radmin makes small-network management easy."
    },
    cmd: "AdvancedIPScanner.exe 192.168.1.1-254",
    cmdDesc: { ar: "فحص نطاق العناوين وعرض الأجهزة والمشاركات", en: "Scan the address range and list devices and shares" },
    tags: ["advanced-ip-scanner", "windows", "gui", "shares"]
  },
  {
    id: "t013",
    name: "Advanced Port Scanner",
    url: "https://www.advanced-port-scanner.com",
    category: "scan",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "ماسح منافذ مجاني من Famatech يفحص المنافذ المفتوحة ويصنّف الخدمات الشائعة على أجهزة ويندوز بسرعة. متكامل مع RDP وبرنامج Radmin للتحكم البعيد بنقرة واحدة.",
      en: "A free port scanner from Famatech that checks open ports and identifies common services on Windows machines quickly. Integrates with RDP and Radmin for one-click remote control."
    },
    cmd: "PortScanner.exe 192.168.1.1-254 1-1024",
    cmdDesc: { ar: "فحص المنافذ الشائعة على نطاق الشبكة", en: "Scan common ports across the network range" },
    tags: ["port-scanner", "famatech", "windows", "rdp"]
  },
  {
    id: "t014",
    name: "SoftPerfect Network Scanner",
    url: "https://www.softperfect.com/products/networkscanner/",
    category: "scan",
    platform: ["windows"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "ماسح شبكة متعدد الخيوط لويندوز يفحص العناوين والمنافذ ومشاركات SMB/FTP وقيم SNMP. يعرض تفاصيل دقيقة عن كل جهاز ويدعم البرمجة النصية عبر Lua لأتمتة عمليات التدقيق.",
      en: "A multithreaded Windows network scanner that probes addresses, ports, SMB/FTP shares, and SNMP values. It shows granular per-device detail and supports Lua scripting to automate audits."
    },
    cmd: "netscan.exe 192.168.1.0/24",
    cmdDesc: { ar: "مسح الشبكة واستخراج المشاركات ومعلومات SNMP", en: "Scan the network and extract shares and SNMP info" },
    tags: ["softperfect", "netscan", "smb", "snmp"]
  },
  {
    id: "t015",
    name: "Fing",
    url: "https://www.fing.com",
    category: "scan",
    platform: ["android", "ios", "windows", "mac"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "تطبيق شائع لاستكشاف الشبكات المنزلية والمكتبية يعمل على الهواتف وأجهزة الكمبيوتر، ويكشف كل جهاز متصل واسمه ومصنّعه والخدمات التي يقدمها. يتضمن فحص المنافذ وتنبيهات دخول أجهزة جديدة عبر خدمة Fing Cloud.",
      en: "A popular network discovery app for phones and desktops that identifies every connected device, its name, vendor, and services. Includes port scanning and new-device alerts via Fing Cloud."
    },
    cmd: "fing -n 192.168.1.0/24",
    cmdDesc: { ar: "استكشاف جميع أجهزة الشبكة وخدماتها", en: "Discover all devices and services on the network" },
    tags: ["fing", "device-discovery", "mobile", "lan"]
  },
  {
    id: "t016",
    name: "PortQry",
    url: "https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/portqry-command-line-port-scanner",
    category: "scan",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة تشخيص منافذ رسمية من مايكروسوفت تختبر اتصال TCP وUDP وتفسّر حالة المنفذ الثلاثية: مستمع أو غير مستمع أو مُصفّى. تحاكي استعلامات LDAP وRPC للمساعدة في تشخيص خدمات Active Directory.",
      en: "Microsoft's official port diagnostic utility that tests TCP and UDP connectivity and interprets the tri-state port status: listening, not listening, or filtered. Emulates LDAP and RPC queries to help troubleshoot Active Directory services."
    },
    cmd: "portqry -n 192.168.1.1 -p tcp -e 443",
    cmdDesc: { ar: "اختبار حالة منفذ 443 على خادم عبر TCP", en: "Test the status of TCP port 443 on a server" },
    tags: ["portqry", "microsoft", "port-testing", "active-directory"]
  },
  {
    id: "t017",
    name: "PsPing",
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/psping",
    category: "scan",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة Sysinternals تقيس زمن الاستجابة والنطاق الترددي عبر ping العادي أو اتصال TCP بمنفذ محدد أو تنفيذ ping على مسار HTTP. أداة سريعة لتشخيص أداء الاتصال بالخوادم قبل اتهام الشبكة.",
      en: "A Sysinternals tool that measures latency and bandwidth using ICMP ping, TCP connections to a specific port, or HTTP request pinging. A quick way to prove server connectivity performance before blaming the network."
    },
    cmd: "psping 192.168.1.1:443",
    cmdDesc: { ar: "قياس زمن الاتصال TCP بمنفذ 443", en: "Measure TCP connection latency to port 443" },
    tags: ["psping", "sysinternals", "latency", "tcping"]
  },
  {
    id: "t018",
    name: "tcping",
    url: "https://www.elifulkerson.com/projects/tcping.php",
    category: "scan",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة ويندوز صغيرة تنفّذ ping عبر TCP بدل ICMP لتجاوز الجدران النارية التي تحجب طلبات الصدى. تعرض أزمنة الاتصال ومعدل النجاح لمتابعة استقرار الخدمة على منفذ معين.",
      en: "A tiny Windows utility that pings over TCP instead of ICMP to bypass firewalls that block echo requests. Shows connection times and success rates to track a service's stability on a given port."
    },
    cmd: "tcping 192.168.1.1 443",
    cmdDesc: { ar: "اختبار الاستجابة المستمرة لمنفذ 443", en: "Continuously test responsiveness of port 443" },
    tags: ["tcping", "windows", "port-check", "icmp-bypass"]
  },
  {
    id: "t019",
    name: "Ncat",
    url: "https://nmap.org/ncat/",
    category: "scan",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نسخة Nmap المطوّرة من netcat تدعم SSL وIPv6 والوضع الوسيط والتحكم في الوصول. تُستخدم لالتقاط اللافتات وفتح قنوات shell ونقل الملفات بين الأجهزة بأمان مشفّر.",
      en: "Nmap's modern netcat rewrite with SSL, IPv6, connection brokering, and access control. Used for banner grabbing, shell channels, and secure file transfers between hosts."
    },
    cmd: "ncat -v --ssl 192.168.1.1 443",
    cmdDesc: { ar: "اتصال مشفّر SSL لالتقاط لافتة الخدمة", en: "Open an SSL-encrypted connection to grab the banner" },
    tags: ["ncat", "nmap", "netcat", "ssl"]
  },
  {
    id: "t020",
    name: "netcat (OpenBSD)",
    url: "https://man.openbsd.org/nc",
    category: "scan",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "السكين السويسري الأصلي للشبكات يقرأ ويكتب عبر اتصالات TCP وUDP في وضع الخادم أو العميل. أساس لا غنى عنه لفهم آلاف السكربتات والأدوات المبنية فوقه.",
      en: "The original Swiss Army knife of networking, reading and writing over TCP and UDP as either client or server. The foundation every engineer must know to understand the thousands of tools built on top of it."
    },
    cmd: "nc -vz 192.168.1.1 20-443",
    cmdDesc: { ar: "فحص مجموعة منافذ TCP دون إرسال بيانات", en: "Check a range of TCP ports without sending data" },
    tags: ["netcat", "nc", "tcp", "banner-grabbing"]
  },
  {
    id: "t021",
    name: "naabu",
    url: "https://github.com/projectdiscovery/naabu",
    category: "scan",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "ماسح منافذ سريع من ProjectDiscovery مكتوب بلغة Go مع دعم SYN والتزامن العالي وإحالة النتائج عبر الأنابيب إلى Nmap. يتكامل بسلاسة مع سير عمل أدوات مثل subfinder وhttpx.",
      en: "A fast, Go-based port scanner from ProjectDiscovery with SYN scan support, high concurrency, and piping into Nmap. Integrates smoothly into recon workflows with subfinder and httpx."
    },
    cmd: "naabu -host 192.168.1.0/24 -top-ports 100",
    cmdDesc: { ar: "فحص أشهر 100 منفذ على الشبكة", en: "Scan the top 100 ports across the network" },
    tags: ["naabu", "projectdiscovery", "go", "syn-scan"]
  },
  {
    id: "t022",
    name: "txportmap",
    url: "https://github.com/4doge/txportmap",
    category: "scan",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "ماسح منافذ عالي الأداء يكتشف المنافذ المفتوحة ويلتقط اللافتات الأساسية للخدمات في تمريرة واحدة. تتميز مخرجاته المنظمة بأنها تسهّل معالجة النتائج آليًا.",
      en: "A high-performance port mapper that discovers open ports and grabs basic service banners in a single pass. Its structured output makes automated result processing easy."
    },
    cmd: "txportmap -a 192.168.1.0/24 -p 1-65535",
    cmdDesc: { ar: "مسح كل المنافذ مع التقاط اللافتات", en: "Scan all ports while capturing banners" },
    tags: ["txportmap", "port-scanning", "banner-grabbing", "fast"]
  },
  {
    id: "t023",
    name: "GoScan",
    url: "https://github.com/marco-lancini/goscan",
    category: "scan",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار استكشاف شبكي تفاعلي يجمع نتائج nmap والاستكشافات الفرعية في جلسة مسح واحدة منظمة. صُمم لبيئات الاختبارات الكبيرة حيث يصعب متابعة مخرجات الأدوات المتفرقة.",
      en: "An interactive network reconnaissance framework that consolidates nmap results and sub-discovery into one managed scan session. Built for large engagements where tracking scattered tool output is hard."
    },
    cmd: "goscan",
    cmdDesc: { ar: "بدء الصدفة التفاعلية لإدارة جلسة الاستكشاف", en: "Launch the interactive shell to manage a scan session" },
    tags: ["goscan", "recon", "nmap-wrapper", "enumeration"]
  },
  {
    id: "t024",
    name: "arping",
    url: "https://github.com/ThomasHabets/arping",
    category: "scan",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة ping على مستوى ARP تتحقق من وجود جهاز داخل الشبكة المحلية حتى لو حجبت ICMP. تكشف أيضًا تعارض عناوين IP بعرض أكثر من عنوان MAC للعنوان نفسه.",
      en: "An ARP-level ping that verifies a host exists on the local network even when ICMP is blocked. It also exposes IP conflicts by showing multiple MACs claiming the same address."
    },
    cmd: "arping -c 3 192.168.1.1",
    cmdDesc: { ar: "التحقق من وجود البوابة على طبقة ARP", en: "Verify the gateway's presence at the ARP layer" },
    tags: ["arping", "arp", "l2", "ip-conflicts"]
  },
  {
    id: "t025",
    name: "NetBScanner",
    url: "https://www.nirsoft.net/utils/net_b_scanner.html",
    category: "scan",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة صغيرة من NirSoft تفحص نطاق شبكة وتعرض أجهزة NetBIOS وأسماءها والمستخدمين المسجلين. مفيدة لفهم تراث خدمات NetBIOS في شبكات ويندوز القديمة وأثرها الأمني.",
      en: "A small NirSoft utility that scans a network range and lists NetBIOS-enabled machines, their names, and logged-in users. Useful for understanding legacy NetBIOS services in older Windows networks and their security impact."
    },
    cmd: "NetBScanner.exe /stext netbios-report.txt",
    cmdDesc: { ar: "تصدير نتائج فحص NetBIOS إلى تقرير نصي", en: "Export NetBIOS scan results to a text report" },
    tags: ["netbscanner", "nirsoft", "netbios", "windows"]
  },

  // ── Sniff / الالتقاط والتحليل ────────────────────────────────────────
  {
    id: "t026",
    name: "Wireshark",
    url: "https://www.wireshark.org",
    category: "sniff",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محلّل بروتوكولات مرجعي مفتوح المصدر يلتقط حركة الشبكة ويفكّكها إلى تفاصيل كل طبقة مع مرشحات عرض قوية. مهارة إلزامية لأي مهندس شبكات لتشخيص المشكلات من الحزمة نفسها.",
      en: "The reference open-source protocol analyzer that captures network traffic and dissects every layer's details with powerful display filters. A mandatory skill for any engineer who diagnoses problems from the packet itself."
    },
    cmd: "wireshark -k -i eth0",
    cmdDesc: { ar: "بدء الالتقاط مباشرة على الواجهة eth0", en: "Start capturing immediately on interface eth0" },
    tags: ["wireshark", "capture", "pcap", "analysis"]
  },
  {
    id: "t027",
    name: "tcpdump",
    url: "https://www.tcpdump.org",
    category: "sniff",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة التقاط الحزم على سطر الأوامر موجودة افتراضيًا في معظم أنظمة يونكس، وتلتقط وتعرض الحزم بمرشحات BPF المشهورة. الحل الأمثل للالتقاط على الخوادم البعيدة التي لا واجهة رسومية فيها.",
      en: "The command-line packet capture utility preinstalled on most Unix systems, filtering traffic with the famous BPF syntax. The right choice for capturing on remote servers that have no GUI."
    },
    cmd: "tcpdump -i eth0 -w capture.pcap",
    cmdDesc: { ar: "التقاط حركة الواجهة وحفظها في ملف pcap", en: "Capture interface traffic and save it to a pcap file" },
    tags: ["tcpdump", "cli", "bpf", "capture"]
  },
  {
    id: "t028",
    name: "TShark",
    url: "https://www.wireshark.org/docs/man-pages/tshark.html",
    category: "sniff",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "محرك Wireshark النصي يقدم تحليلًا عميقًا للحزم في الطرفية مع استخراج حقول محددة بصيغ JSON وCSV. أساس خطوط المعالجة الآلية لملفات الالتقاط الضخمة.",
      en: "Wireshark's text engine, offering deep packet analysis in the terminal with field extraction into JSON and CSV. The backbone of automated pipelines over huge capture files."
    },
    cmd: "tshark -i eth0 -Y 'http.request' -T fields -e http.host",
    cmdDesc: { ar: "عرض النطاقات المطلوبة عبر HTTP في الزمن الحقيقي", en: "Show requested HTTP hosts in real time" },
    tags: ["tshark", "cli", "wireshark", "field-extraction"]
  },
  {
    id: "t029",
    name: "dumpcap",
    url: "https://www.wireshark.org/docs/man-pages/dumpcap.html",
    category: "sniff",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة الالتقاط الخلفية لـ Wireshark تعمل بصلاحيات محدودة وآمنة وتدعم الملفات الدوّارة بالحجم والزمن. الطريقة القياسية لتشغيل الالتقاط المستمر على أنظمة الإنتاج.",
      en: "Wireshark's back-end capture utility that runs with restricted, safe privileges and supports size- and time-based rotating files. The standard way to run continuous capture on production systems."
    },
    cmd: "dumpcap -i eth0 -w capture.pcap -b filesize:16384",
    cmdDesc: { ar: "التقاط مستمر مع تدوير الملفات كل 16 ميغابايت", en: "Continuous capture rotating files every 16 MB" },
    tags: ["dumpcap", "capture", "ring-buffer", "production"]
  },
  {
    id: "t030",
    name: "termshark",
    url: "https://termshark.io",
    category: "sniff",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "واجهة طرفية تفاعلية لـ tshark تحاكي تجربة Wireshark داخل الطرفية بواجهة ثلاثية الأجزاء وتفصيل الحزم. تتيح تحليل الالتقاطات عبر SSH دون نسخها إلى جهازك.",
      en: "An interactive terminal UI for tshark that mirrors the Wireshark experience in a three-pane view with packet drill-down. Lets you analyze captures over SSH without copying them to your machine."
    },
    cmd: "termshark -i eth0",
    cmdDesc: { ar: "تحليل الحزم في الطرفية بواجهة تفاعلية", en: "Analyze packets in the terminal with an interactive UI" },
    tags: ["termshark", "tui", "tshark", "ssh"]
  },
  {
    id: "t031",
    name: "Sniffnet",
    url: "https://www.sniffnet.net",
    category: "sniff",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة مراقبة حركة الشبكة بواجهة رسومية أنيقة مكتوبة بلغة Rust تعرض الإحصاءات والمخططات والخرائط الجغرافية للاتصالات. تجعل مراقبة حركة الشبكة اليومية في متناول غير الخبراء.",
      en: "A Rust-based network monitoring app with a polished GUI showing traffic statistics, charts, and geographic maps of connections. It makes everyday traffic monitoring approachable for non-experts."
    },
    cmd: "sniffnet",
    cmdDesc: { ar: "بدء واجهة المراقبة الرسومية للحركة", en: "Launch the graphical traffic monitoring interface" },
    tags: ["sniffnet", "rust", "gui", "statistics"]
  },
  {
    id: "t032",
    name: "tcpflow",
    url: "https://github.com/simsong/tcpflow",
    category: "sniff",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة تفكّك جلسات TCP من ملفات الالتقاط أو الواجهات الحية وتعيد بناء تدفق البيانات في كل اتجاه كملفات منفصلة. مثالية لقراءة محتوى الجلسات الفعلية مثل رسائل البروتوكولات النصية.",
      en: "A tool that dissects TCP sessions from capture files or live interfaces and reassembles each direction's byte stream into separate files. Perfect for reading actual session content like plain-text protocol messages."
    },
    cmd: "tcpflow -r capture.pcap",
    cmdDesc: { ar: "استخراج تدفقات TCP من ملف التقاط محفوظ", en: "Extract TCP streams from a saved capture file" },
    tags: ["tcpflow", "reassembly", "content-analysis", "pcap"]
  },
  {
    id: "t033",
    name: "ngrep",
    url: "https://github.com/jpr5/ngrep",
    category: "sniff",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "نسخة grep من عالم الشبكات تبحث في حمولات الحزم عبر تعابير نمطية على الواجهات الحية أو ملفات الالتقاط. تلتقط بسرعة أي سلسلة نصية عابرة على الشبكة من أسماء مستخدمين إلى أوامر بروتوكولات.",
      en: "grep for the network world, matching regex patterns against packet payloads on live interfaces or capture files. Quickly catches any string crossing the wire, from usernames to protocol commands."
    },
    cmd: "ngrep -d eth0 -q 'GET' port 80",
    cmdDesc: { ar: "مراقبة طلبات HTTP GET في الزمن الحقيقي", en: "Watch HTTP GET requests in real time" },
    tags: ["ngrep", "regex", "payload", "cli"]
  },
  {
    id: "t034",
    name: "sngrep",
    url: "https://github.com/irontec/sngrep",
    category: "sniff",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة عرض جلسات SIP بواجهة طرفية تحتوي قوائم المكالمات وتفاصيل الرسائل وتدفقات SDP. أداة تشخيص VoIP الأولى عند المشغلين ومراكز الاتصال.",
      en: "A terminal-UI SIP session viewer with call lists, message details, and SDP flows. The go-to VoIP troubleshooting tool at carriers and contact centers."
    },
    cmd: "sngrep -d eth0 port 5060",
    cmdDesc: { ar: "التقاط جلسات SIP على المنفذ 5060 وعرضها تفاعليًا", en: "Capture and interactively display SIP on port 5060" },
    tags: ["sngrep", "sip", "voip", "tui"]
  },
  {
    id: "t035",
    name: "EtherApe",
    url: "https://sourceforge.net/projects/etherape/",
    category: "sniff",
    platform: ["linux"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "عارض حركة شبكة رسومي يرسم عقد الشبكة كدوائر يتناسب حجمها ولونها مع حجم حركتها في الزمن الحقيقي. يمنح نظرة بصرية فورية على من يتحدث مع من داخل شبكتك.",
      en: "A graphical network traffic viewer that draws hosts as circles whose size and color track live traffic volume. Gives an instant visual answer to who is talking to whom on your network."
    },
    cmd: "etherape",
    cmdDesc: { ar: "عرض خريطة حركة الشبكة الحية", en: "Display a live map of network traffic" },
    tags: ["etherape", "gui", "topology", "visualization"]
  },
  {
    id: "t036",
    name: "pktstat",
    url: "https://www.kali.org/tools/pktstat/",
    category: "sniff",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة طرفية تعرض جدولًا حيًا للاتصالات وحجم حركتها مرتبًا بحسب النطاق الترددي المستهلك. طريقة سريعة لمعرفة ما يستهلك عرض الشبكة في هذه اللحظة.",
      en: "A terminal tool showing a live table of connections and their bandwidth usage sorted by consumption. A quick way to see what is eating your network capacity right now."
    },
    cmd: "pktstat -i eth0 -nt",
    cmdDesc: { ar: "عرض حركة الواجهة دون تحليل DNS", en: "Show interface traffic without DNS resolution" },
    tags: ["pktstat", "bandwidth", "per-connection", "cli"]
  },
  {
    id: "t037",
    name: "netsniff-ng",
    url: "https://github.com/netsniff-ng/netsniff-ng",
    category: "sniff",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار أدوات شبكة عالي الأداء يلتقط الحزم بنسخ صفرية من نواة النظام إلى فضاء المستخدم ويعيد إرسال ملفات pcap بمعدلات خطية. أسرع مسار التقاط على لينكس بواجهة نظيفة.",
      en: "A high-performance toolkit that captures packets via zero-copy from kernel to userspace and replays pcap files at line rate. The fastest capture path on Linux with a clean CLI."
    },
    cmd: "netsniff-ng -i eth0 -o capture.pcap -s",
    cmdDesc: { ar: "التقاط صامت عالي السرعة إلى ملف pcap", en: "High-speed silent capture into a pcap file" },
    tags: ["netsniff-ng", "zero-copy", "kernel", "high-performance"]
  },
  {
    id: "t038",
    name: "Zeek",
    url: "https://zeek.org",
    category: "sniff",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "محلّل حركة شبكة يحوّل الحزم إلى سجلات بيانات منظمة تصف الاتصالات والبروتوكولات والملفات والشهادات. منصة مراقبة أمنية تُنشر في أكبر شبكات العالم بدلًا من الاكتفاء بملفات pcap الخام.",
      en: "A network traffic analyzer that transforms packets into structured logs describing connections, protocols, files, and certificates. A security monitoring platform deployed in the world's largest networks instead of raw pcap files."
    },
    cmd: "zeek -r capture.pcap local",
    cmdDesc: { ar: "تحليل ملف التقاط وإنتاج سجلات Zeek", en: "Analyze a capture file and produce Zeek logs" },
    tags: ["zeek", "nsm", "framework", "metadata"]
  },
  {
    id: "t039",
    name: "NetworkMiner",
    url: "https://www.netresec.com/NetworkMiner",
    category: "sniff",
    platform: ["windows", "linux"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "محلّل جنائي للشبكات يعيد بناء الملفات والصور وبيانات الاعتماد والجلسات من ملفات pcap دون توليد أي حركة جديدة. يستخرج الأدلة الرقمية من الالتقاطات بسرعة تنفيذية مذهلة.",
      en: "A network forensics analyzer that reconstructs files, images, credentials, and sessions from pcap files without generating new traffic. Extracts digital evidence from captures at impressive speed."
    },
    cmd: "NetworkMiner.exe capture.pcap",
    cmdDesc: { ar: "فتح ملف التقاط واستخراج الأدلة والملفات", en: "Open a capture file and extract evidence and files" },
    tags: ["networkminer", "forensics", "artifacts", "pcap"]
  },
  {
    id: "t040",
    name: "Xplico",
    url: "https://www.xplico.org",
    category: "sniff",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة تحليل جنائي مفتوحة المصدر تفكّك حركة الشبكة إلى مكالمات ورسائل وجلسات ويب وملفات عبر واجهة ويب. صُممت لتحويل الالتقاطات الضخمة إلى تقارير قابلة للعرض أمام جهات التحقيق.",
      en: "An open-source forensic platform that breaks network traffic into calls, messages, web sessions, and files through a web interface. Designed to turn huge captures into presentable investigative reports."
    },
    cmd: "sudo systemctl start xplico",
    cmdDesc: { ar: "تشغيل خدمة Xplico للوصول إلى واجهتها الويب", en: "Start the Xplico service to reach its web interface" },
    tags: ["xplico", "forensics", "voip", "reconstruction"]
  },
  {
    id: "t041",
    name: "CloudShark",
    url: "https://www.cloudshark.org",
    category: "sniff",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "خدمة سحابية لاستضافة ملفات pcap ومشاركتها وتحليلها بمحرك Wireshark داخل المتصفح مع تعليقات وتنبيهات تعاونية. تحوّل الالتقاطات إلى روابط قابلة للنقاش مع الفريق والعملاء.",
      en: "A cloud service for hosting, sharing, and analyzing pcap files with a browser-based Wireshark engine plus collaborative comments and alerts. Turns captures into shareable links for team and customer discussions."
    },
    cmd: "curl -F file=@capture.pcap https://www.cloudshark.org/api/v1/upload",
    cmdDesc: { ar: "رفع ملف التقاط إلى مساحة CloudShark", en: "Upload a capture file to your CloudShark workspace" },
    tags: ["cloudshark", "pcap", "collaboration", "cloud"]
  },
  {
    id: "t042",
    name: "dsniff",
    url: "https://www.kali.org/tools/dsniff/",
    category: "sniff",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مجموعة أدوات استنشاق كلاسيكية تلتقط كلمات المرور والجلسات من عشرات البروتوكولات مثل HTTP وFTP وTelnet وSMTP. الدرس البليغ الذي يعلّم خطورة استخدام البروتوكولات غير المشفرة داخل الشبكات المحلية.",
      en: "A classic sniffing suite that harvests passwords and sessions from dozens of protocols such as HTTP, FTP, Telnet, and SMTP. The canonical demonstration of why cleartext protocols are dangerous on LANs."
    },
    cmd: "dsniff -i eth0",
    cmdDesc: { ar: "استنشاق بيانات الاعتماد على الواجهة eth0", en: "Sniff credentials on interface eth0" },
    tags: ["dsniff", "passwords", "protocols", "suite"]
  },
  {
    id: "t043",
    name: "Ettercap",
    url: "https://www.ettercap-project.org",
    category: "sniff",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار شامل لهجمات الوسيط على الشبكة المحلية يخدع ARP أو ICMP ليعترض الحركة بين طرفين. يتضمن عشرات الإضافات لتفكيك الجلسات المشفرة القديمة وتصفية المحتوى في الزمن الحقيقي.",
      en: "A comprehensive man-in-the-middle framework that spoofs ARP or ICMP to intercept traffic between two parties. Ships with dozens of plugins for dissecting legacy encrypted sessions and filtering content live."
    },
    cmd: "ettercap -T -M arp:remote /192.168.1.1/ /192.168.1.50/",
    cmdDesc: { ar: "اعتراض حركة جهازين عبر خداع ARP", en: "Intercept traffic between two hosts via ARP spoofing" },
    tags: ["ettercap", "mitm", "arp-spoofing", "plugins"]
  },
  {
    id: "t044",
    name: "driftnet",
    url: "https://github.com/deiv/driftnet",
    category: "sniff",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة تستمع لحركة HTTP وتعرض الصور العابرة على الشبكة في نافذة حية أثناء تنقلها. عرض مذهل ومقلق يُستخدم في تدريب الوعي الأمني حول خطورة الاتصال غير المشفر.",
      en: "A tool that listens to HTTP traffic and displays images flowing across the network in a live window as they travel. A striking, unsettling demo for security-awareness training on unencrypted connections."
    },
    cmd: "driftnet -i eth0",
    cmdDesc: { ar: "عرض الصور المارة عبر الشبكة حيًّا", en: "Display images crossing the network live" },
    tags: ["driftnet", "http", "images", "awareness"]
  },
  {
    id: "t045",
    name: "pktmon",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/pktmon",
    category: "sniff",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "مراقب حزم مدمج في ويندوز 10 وما بعده يسجّل الأحداث عبر ETW ويحوّل السجلات إلى ملفات pcapng قابلة للفتح في Wireshark. بديل مايكروسوفت الحديث لأدوات التقاط الطرف الثالث.",
      en: "A packet monitor built into Windows 10 and later that logs events via ETW and converts them to pcapng files Wireshark can open. Microsoft's modern replacement for third-party capture tools."
    },
    cmd: "pktmon start --capture",
    cmdDesc: { ar: "بدء التقاط حزم pktmon على جميع مكونات الشبكة", en: "Start pktmon capture across all network components" },
    tags: ["pktmon", "windows", "etw", "pcapng"]
  },
  {
    id: "t046",
    name: "Microsoft Network Monitor 3.4",
    url: "https://www.microsoft.com/en-us/download/details.aspx?id=4865",
    category: "sniff",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "محلّل حركة مايكروسوفت السابق الذي استُبدل بـ Message Analyzer ثم pktmon، وما زال متاحًا للتنزيل. محللات بروتوكولات مايكروسوفت القديمة فيه مثل SMB التقليدي ما زالت مفيدة في البيئات العتيقة.",
      en: "Microsoft's retired traffic analyzer, succeeded by Message Analyzer and then pktmon, but still available for download. Its legacy Microsoft protocol parsers such as classic SMB remain useful in older environments."
    },
    cmd: "NMCap /network * /capture /filename trace.chn",
    cmdDesc: { ar: "التقاط عبر أداة NMCap النصية إلى ملف متسلسل", en: "Capture with the NMCap CLI into a chained file" },
    tags: ["netmon", "microsoft", "retired", "parsers"]
  },
  {
    id: "t047",
    name: "CommView",
    url: "https://www.tamosoft.com/commview/",
    category: "sniff",
    platform: ["windows"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "أداة التقاط ومراقبة تجارية لويندوز من TamoSoft تعرض الحزم والإحصاءات وخرائط المحادثات وتفكّ VoIP وتؤرشف الجلسات. شائعة في بيئات Wi-Fi لمراقبتها عدة بطاقات لاسلكية معًا.",
      en: "TamoSoft's commercial Windows capture tool showing packets, statistics, conversation maps, VoIP decoding, and session archiving. Popular in Wi-Fi environments thanks to monitoring multiple wireless adapters."
    },
    cmd: "CommView.exe",
    cmdDesc: { ar: "فتح واجهة الالتقاط واختيار المحوّل", en: "Open the capture UI and select the adapter" },
    tags: ["commview", "tamosoft", "wifi-monitoring", "voip"]
  },
  {
    id: "t048",
    name: "Colasoft Capsa",
    url: "https://www.colasoft.com/capsa/",
    category: "sniff",
    platform: ["windows"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "محلّل شبكة رسومي من Colasoft بفحوصات تشخيص آلية وتقارير جاهزة وتحليل رسائل البروتوكولات فوق خريطة الشبكة. نسخته المجانية للشبكات الصغيرة تجعله نقطة انطلاق مريحة للمبتدئين.",
      en: "Colasoft's graphical network analyzer with automatic diagnostics, ready-made reports, and per-protocol message analysis over a network map. Its free edition for small networks makes it a comfortable starting point."
    },
    cmd: "Capsa.exe",
    cmdDesc: { ar: "تشغيل التحليل مع محرك التشخيص الآلي", en: "Run analysis with the automatic diagnostic engine" },
    tags: ["capsa", "colasoft", "diagnostics", "reports"]
  },
  {
    id: "t049",
    name: "Omnipeek",
    url: "https://www.liveaction.com/products/omnipeek/",
    category: "sniff",
    platform: ["windows"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "محلّل حركة من Savvius وNetScout يقدم من أعمق قدرات التحليل في السوق مع تشخيصات الخبراء وإعادة تجميع الجلسات والالتقاط الموزع. أداة فرق المؤسسات التي تحتاج رؤية شاملة عبر فروعها.",
      en: "The Savvius/NetScout traffic analyzer offering some of the deepest analysis in the market, with expert diagnostics, session reconstruction, and distributed capture. Built for enterprise teams needing visibility across sites."
    },
    cmd: "Omnipeek.exe",
    cmdDesc: { ar: "بدء الالتقاط في نافذة التحليل الرئيسية", en: "Start capturing from the main analysis window" },
    tags: ["omnipeek", "enterprise", "expert-analysis", "capture"]
  },
  {
    id: "t050",
    name: "nGenius Packet Analyzer",
    url: "https://www.netscout.com/product/packet-analyzer",
    category: "sniff",
    platform: ["windows"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "محلّل حزم NetScout المؤسسي يقرأ بيانات Smart Data الملتقطة من مستشعرات الشبكة ويقدم تحليلات عميقة بعد الالتقاط. يربط حزم الشبكة بمؤشرات الأداء في لوحات متكاملة.",
      en: "NetScout's enterprise packet analyzer that reads Smart Data captured by network sensors and provides deep post-capture analysis. Links raw packets to performance KPIs in integrated dashboards."
    },
    cmd: "nGeniusPA.exe",
    cmdDesc: { ar: "فتح مساحة عمل تحليل الحزم المؤسسية", en: "Open the enterprise packet analysis workspace" },
    tags: ["netscout", "packet-analyzer", "enterprise", "performance"]
  },

  // ── Monitor / المراقبة والرصد ─────────────────────────────────────────
  {
    id: "t051",
    name: "PRTG Network Monitor",
    url: "https://www.paessler.com/prtg",
    category: "monitor",
    platform: ["windows"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "منصة مراقبة شاملة من Paessler تراقب الأجهزة والمنافذ والحزم والتطبيقات عبر SNMP وWMI والاستشعارات النشطة والسلبية. نسختها المجانية بمئة مستشعر تجعلها بوابة مثالية لدخول عالم المراقبة الاحترافية.",
      en: "Paessler's all-in-one monitoring platform watching devices, ports, packets, and applications via SNMP, WMI, and active/passive sensors. Its free 100-sensor tier makes it the ideal entry into professional monitoring."
    },
    cmd: "curl 'https://prtg.example.com/api/table.json?content=sensors&count=10&apitoken=TOKEN'",
    cmdDesc: { ar: "سحب قائمة المستشعرات عبر واجهة PRTG البرمجية", en: "Pull the sensor list via the PRTG HTTP API" },
    tags: ["prtg", "paessler", "sensors", "all-in-one"]
  },
  {
    id: "t052",
    name: "Nagios Core",
    url: "https://www.nagios.org/projects/nagios-core/",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "نظام المراقبة مفتوح المصدر الأقدم والأشهر الذي بنى عليه جيل كامل من الأدوات، يراقب المضيفين والخدمات عبر إضافات ويصعّد التنبيهات بمرونة كاملة. إتقانه ما زال مطلبًا في إعلانات وظائف NOC.",
      en: "The oldest and most famous open-source monitoring system that inspired a whole generation of tools, checking hosts and services via plugins with fully flexible alerting. Mastery of it is still listed in NOC job posts."
    },
    cmd: "nagios -v /etc/nagios/nagios.cfg",
    cmdDesc: { ar: "التحقق من صحة إعدادات Nagios قبل إعادة التشغيل", en: "Validate the Nagios configuration before restart" },
    tags: ["nagios", "monitoring", "plugins", "alerts"]
  },
  {
    id: "t053",
    name: "Nagios XI",
    url: "https://www.nagios.com/products/nagios-xi/",
    category: "monitor",
    platform: ["linux"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "النسخة التجارية من Nagios بواجهة ويب حديثة ومعالجات تكوين ولوحات جاهزة وخطط ترقية تلقائية. تختصر زمن النشر من أسابيع إلى ساعات مقارنة بالإعداد اليدوي للنسخة المجانية.",
      en: "The commercial Nagios edition with a modern web UI, configuration wizards, ready dashboards, and automatic upgrade plans. Cuts deployment from weeks to hours compared to hand-rolling Core."
    },
    cmd: "curl 'https://nagiosxi.example.com/nagiosxi/api/v1/system/status?api_key=KEY'",
    cmdDesc: { ar: "استعلام حالة النظام عبر واجهة XI البرمجية", en: "Query system status via the XI REST API" },
    tags: ["nagios-xi", "enterprise", "dashboards", "wizards"]
  },
  {
    id: "t054",
    name: "Zabbix",
    url: "https://www.zabbix.com",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة مراقبة مؤسسية شاملة تجمع بين المراقبة عبر SNMP وIPMI والوكلاء ومراقبة التطبيقات مع مكتبة قوالب ضخمة. مجتمعها العالمي وقابليتها للتوسع لملايين المقاييس تجعلها خيار المؤسسات الطموحة.",
      en: "A comprehensive enterprise monitoring platform combining SNMP, IPMI, agent-based checks, application monitoring, and a massive template library. Its global community and scalability to millions of metrics make it an ambitious-enterprise choice."
    },
    cmd: "zabbix_get -s 192.168.1.10 -k agent.ping",
    cmdDesc: { ar: "اختبار اتصال وكيل Zabbix على جهاز", en: "Test the Zabbix agent connectivity on a host" },
    tags: ["zabbix", "enterprise", "templates", "snmp"]
  },
  {
    id: "t055",
    name: "Icinga 2",
    url: "https://icinga.com",
    category: "monitor",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "سليلة Nagios المعاد كتابتها بلغة ++C ببنية موزعة عبر المناطق ومراقبة متزامنة عالية الأداء. خيار الفرق الحديثة التي تريد توافقية ميراث Nagios مع معمارية عصر السحابة.",
      en: "The Nagios lineage rewritten in C++ with a zone-based distributed architecture and highly parallel monitoring. The choice of modern teams wanting Nagios heritage compatibility with cloud-era design."
    },
    cmd: "icinga2 daemon -C",
    cmdDesc: { ar: "التحقق من صحة إعدادات Icinga 2", en: "Validate the Icinga 2 configuration" },
    tags: ["icinga", "distributed", "modern", "monitoring"]
  },
  {
    id: "t056",
    name: "Checkmk",
    url: "https://checkmk.com",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة مراقبة ذكية تكتشف تلقائيًا خدمات كل نظام وتبني القواعد بنهج وكيل واحد لكل مضيف. نسختها Raw المفتوحة المصدر تمنح قدرات على مستوى المؤسسات بلا مقابل تقريبًا.",
      en: "A smart monitoring platform that auto-discovers services on every host and builds rules through a single agent-per-host paradigm. Its open-source Raw Edition delivers enterprise-grade capability almost for free."
    },
    cmd: "omd status",
    cmdDesc: { ar: "عرض حالة موقع المراقبة Checkmk", en: "Show the status of the Checkmk monitoring site" },
    tags: ["checkmk", "auto-discovery", "omd", "raw"]
  },
  {
    id: "t057",
    name: "OpenNMS Horizon",
    url: "https://www.opennms.com",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أول منصة مراقبة مفتوحة المصدر بمستوى مؤسسي كامل، تتميز بمحرك أحداث قابل للتوسع ومراقبة تدفقات NetFlow وJMX على نطاق ضخم. تُدار مجتمعيًا منذ عشرين عامًا بمسار إصدارات منتظم.",
      en: "The first fully enterprise-grade open-source monitoring platform, featuring a scalable event engine plus NetFlow and JMX monitoring at massive scale. Community-driven for twenty years with a steady release train."
    },
    cmd: "/opt/opennms/bin/opennms -v",
    cmdDesc: { ar: "عرض إصدار OpenNMS المثبّت", en: "Show the installed OpenNMS version" },
    tags: ["opennms", "events", "netflow", "enterprise"]
  },
  {
    id: "t058",
    name: "LibreNMS",
    url: "https://www.librenms.org",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تطوير مجتمعي نشط يدعم الاكتشاف التلقائي عبر ARP وCDP وFDP وLLDP مع نظام تنبيهات مرن وواجهة برمجية كاملة. المفضل لدى مزودي الخدمات لمراقبة أجهزة من عشرات البائعين.",
      en: "An active community fork supporting auto-discovery via ARP, CDP, FDP, and LLDP plus a flexible alerting engine and a full API. A favorite of service providers monitoring multi-vendor estates."
    },
    cmd: "php /opt/librenms/poller.php -h all",
    cmdDesc: { ar: "تشغيل دورة استعلام لكل الأجهزة", en: "Run a polling cycle for all devices" },
    tags: ["librenms", "lldp", "auto-discovery", "api"]
  },
  {
    id: "t059",
    name: "Observium",
    url: "https://www.observium.org",
    category: "monitor",
    platform: ["linux"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة مراقبة ذات واجهة أنيقة تركّز على الرسوم الزمنية طويلة المدى لأجهزة الشبكات عبر SNMP. نسختها المجانية بتحديثات سنوية تكفي للتدريب، بينما الاحترافية تخدم التشغيل اليومي.",
      en: "A polished monitoring platform focused on long-horizon time-series graphs of network gear via SNMP. Its free community edition with annual updates suits training, while Professional serves daily operations."
    },
    cmd: "php /opt/observium/poller.php -h all",
    cmdDesc: { ar: "استعلام جميع الأجهزة وتحديث الرسوم", en: "Poll all devices and refresh graphs" },
    tags: ["observium", "snmp", "graphs", "time-series"]
  },
  {
    id: "t060",
    name: "Cacti",
    url: "https://www.cacti.net",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة رسم بياني كلاسيكية مبنية على RRDtool تتغذى من استطلاعات SNMP وقوالب قابلة للتشارك. ما زالت جذر عدد هائل من مخططات النطاق الترددي في الشبكات التقليدية.",
      en: "The classic RRDtool-based graphing platform fed by SNMP polling with shareable templates. Still the root of a huge number of bandwidth charts in traditional networks."
    },
    cmd: "php /var/www/html/cacti/poller.php --force",
    cmdDesc: { ar: "فرض دورة استطلاع فورية للمخططات", en: "Force an immediate polling cycle for graphs" },
    tags: ["cacti", "rrdtool", "snmp", "graphing"]
  },
  {
    id: "t061",
    name: "ntopng",
    url: "https://www.ntop.org/products/traffic-analysis/ntop/",
    category: "monitor",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تطبيق ويب لتحليل حركة الشبكة في الزمن الحقيقي يعرض التدفقات والمضيفين والبروتوكولات وخرائط الاتصال من بيانات pcap أو NetFlow. رؤية فورية لسلوك الشبكة دون بنية مراقبة كاملة.",
      en: "A real-time web traffic analyzer showing flows, hosts, protocols, and peering maps from pcap or NetFlow data. Instant visibility into network behavior without building a full monitoring stack."
    },
    cmd: "ntopng -i eth0 -w 3000",
    cmdDesc: { ar: "تشغيل ntopng على الواجهة والاستماع في المنفذ 3000", en: "Run ntopng on the interface listening on port 3000" },
    tags: ["ntopng", "flows", "real-time", "web"]
  },
  {
    id: "t062",
    name: "Smokeping",
    url: "https://oss.oetiker.ch/smokeping/",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة قياس التأخير على المدى الطويل ترسم توزيع أزمنة ping إلى أهداف متعددة وتكشف الازدحام الدوري والاهتزاز. مقياس الموثوقية الذي يثبت أن مشكلة الاتصال المتقطعة ليست وهمًا.",
      en: "A long-horizon latency measurement tool charting the distribution of ping times to many targets, exposing cyclic congestion and jitter. The reliability yardstick that proves an intermittent issue is not imaginary."
    },
    cmd: "smokeping --config /etc/smokeping/config --debug",
    cmdDesc: { ar: "تشغيل Smokeping في وضع التشخيص", en: "Run Smokeping in debug mode" },
    tags: ["smokeping", "latency", "jitter", "rrdtool"]
  },
  {
    id: "t063",
    name: "PingPlotter",
    url: "https://www.pingplotter.com",
    category: "monitor",
    platform: ["windows", "mac"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "أداة تتبع مسار مرئية تجمع بين traceroute المستمر ورسم زمني لكل قفزة على طول الطريق. تشرح لعملائك بالرسم أين يقع التأخير بالضبط بدل جدول قفزات غامض.",
      en: "A visual route-tracking tool combining continuous traceroute with per-hop graphs along the path. Shows clients exactly where latency occurs instead of a cryptic hop table."
    },
    cmd: "PingPlotter.exe 8.8.8.8",
    cmdDesc: { ar: "بدء تتبع مستمر للهدف ورسم كل قفزة", en: "Start continuous tracing to the target and graph every hop" },
    tags: ["pingplotter", "traceroute", "visualization", "per-hop"]
  },
  {
    id: "t064",
    name: "MultiPing",
    url: "https://www.multiping.com",
    category: "monitor",
    platform: ["windows"],
    license: "paid",
    difficulty: 1,
    desc: {
      ar: "أداة ping متعددة الأهداف من مبتكري PingPlotter تراقب عشرات العناوين وتنبهك عند تجاوز عتبات التأخير أو الفقد. مراقبة خفيفة للأجهزة الحرجة التي تحتاج عينًا دائمة.",
      en: "A multi-target ping tool from the PingPlotter makers watching dozens of addresses and alerting when latency or loss crosses thresholds. Lightweight monitoring for critical devices that need a constant eye."
    },
    cmd: "MultiPing.exe 192.168.1.1 8.8.8.8",
    cmdDesc: { ar: "مراقبة عدة أهداف في آن واحد مع التنبيهات", en: "Monitor several targets at once with alerts" },
    tags: ["multiping", "ping", "thresholds", "alerts"]
  },
  {
    id: "t065",
    name: "SolarWinds Network Performance Monitor",
    url: "https://www.solarwinds.com/network-performance-monitor",
    category: "monitor",
    platform: ["windows"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "منصة مراقبة أداء الشبكات الرائدة تجاريًا مع خرائط طوبولوجيا حية واكتشاف تلقائي وتنبيهات ذكية مبنية على الأسباب الجذرية. معيار الشركات الكبرى التي تشتري الحلول بدل بنائها.",
      en: "The commercial market-leading network performance monitor with live topology maps, auto-discovery, and root-cause-aware alerting. The standard of large enterprises that buy rather than build."
    },
    cmd: "Connect-Swis -Hostname orion.core.local",
    cmdDesc: { ar: "الاتصال بواجهة Orion البرمجية للاستعلام", en: "Connect to the Orion API for querying" },
    tags: ["solarwinds", "npm", "orion", "topology"]
  },
  {
    id: "t066",
    name: "WhatsUp Gold",
    url: "https://www.whatsupgold.com",
    category: "monitor",
    platform: ["windows"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "منصة مراقبة من Progress تجمع مراقبة الأجهزة والتطبيقات وحركة الشبكة في نسخ مرخصة بالميزات. واجهتها التفاعلية لا تحتاج خبرة برمجية مما يجعلها محبوبة في فرق التشغيل الصغيرة.",
      en: "Progress's monitoring platform bundling device, application, and traffic monitoring in feature-licensed editions. Its point-and-click UI requires no coding skill, endearing it to small ops teams."
    },
    cmd: "sc query WhatsUp",
    cmdDesc: { ar: "فحص حالة خدمة المراقبة WhatsUp", en: "Check the status of the WhatsUp monitoring service" },
    tags: ["whatsup-gold", "progress", "monitoring", "licensing"]
  },
  {
    id: "t067",
    name: "Auvik",
    url: "https://www.auvik.com",
    category: "monitor",
    platform: ["web"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "منصة إدارة ومراقبة شبكات سحابية تبني مخططات طوبولوجيا حية تلقائيًا عبر مجمعات موزعة وتدير الإعدادات أيضًا. تُباع بالنموذج التشغيلي للشركاء الذين يديرون شبكات عملاء متعددين.",
      en: "A cloud network management and monitoring platform that auto-builds live topology maps through distributed collectors and manages configs too. Sold operationally to partners managing multiple customer networks."
    },
    cmd: "curl -H 'Authorization: Bearer TOKEN' 'https://api.us1.auvik.com/v1/devices'",
    cmdDesc: { ar: "استعلام قائمة الأجهزة عبر واجهة Auvik", en: "Query the device list via the Auvik API" },
    tags: ["auvik", "cloud", "msp", "topology"]
  },
  {
    id: "t068",
    name: "Datadog Network Monitoring",
    url: "https://www.datadoghq.com/product/network-monitoring/",
    category: "monitor",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "مراقبة الشبكة ضمن منصة Datadog السحابية توحّد مقاييس التدفقات ولقطات الأجهزة الحية مع السجلات والتتبع في مكان واحد. خيار فرق DevOps التي تريد لغة واحدة للبنية كلها.",
      en: "Network monitoring inside Datadog's cloud platform, unifying flow metrics, live device snapshots, logs, and traces in one place. The pick for DevOps teams wanting a single language for all infrastructure."
    },
    cmd: "datadog-agent status",
    cmdDesc: { ar: "عرض حالة وكيل Datadog على المضيف", en: "Show the Datadog agent status on the host" },
    tags: ["datadog", "saas", "flows", "devops"]
  },
  {
    id: "t069",
    name: "Prometheus",
    url: "https://prometheus.io",
    category: "monitor",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "نظام قياس مفتوح المصدر من CNCF يخزّن السلاسل الزمنية ويستعلمها بلغة PromQL مع نموذج سحب ومدير تنبيهات Alertmanager. حجر أساس بنية المراقبة السحابية الحديثة.",
      en: "The CNCF open-source metrics system storing time series and querying them with PromQL, built on a pull model with the Alertmanager. The cornerstone metric store of the modern cloud monitoring stack."
    },
    cmd: "prometheus --config.file=prometheus.yml",
    cmdDesc: { ar: "بدء خادم Prometheus بملف الإعداد", en: "Start the Prometheus server with its config file" },
    tags: ["prometheus", "promql", "time-series", "cncf"]
  },
  {
    id: "t070",
    name: "Grafana",
    url: "https://grafana.com",
    category: "monitor",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة التصوير التحليلي الأشهر التي تحوّل مصادر البيانات مثل Prometheus وInfluxDB إلى لوحات قابلة للتخصيص والمشاركة. واجهة العرض القياسية التي يلجأ إليها كل فريق مراقبة حديث.",
      en: "The leading analytics-visualization platform turning data sources like Prometheus and InfluxDB into customizable, shareable dashboards. The standard presentation layer adopted by every modern monitoring team."
    },
    cmd: "systemctl status grafana-server",
    cmdDesc: { ar: "التحقق من خدمة خادم Grafana", en: "Check the Grafana server service" },
    tags: ["grafana", "dashboards", "visualization", "alerting"]
  },
  {
    id: "t071",
    name: "Netdata",
    url: "https://www.netdata.cloud",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "وكيل مراقبة في الزمن الحقيقي يثبَّت بأمر واحد ويرصد آلاف المقاييس في الثانية دون أي إعداد. لوحاته الجاهزة تكشف فورًا ما يبطئ الخادم من المعالج إلى مقابس الشبكة.",
      en: "A real-time monitoring agent installed with one command, sampling thousands of metrics per second with zero configuration. Its ready dashboards instantly reveal what is slowing a server, from CPU to network sockets."
    },
    cmd: "netdata -v",
    cmdDesc: { ar: "عرض إصدار Netdata المثبّت", en: "Show the installed Netdata version" },
    tags: ["netdata", "real-time", "agent", "zero-config"]
  },
  {
    id: "t072",
    name: "collectd",
    url: "https://collectd.org",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "عفريت جمع مقاييس خفيف يقرأ إحصاءات النظام والشبكة من مئات الإضافات ويرسلها إلى مخازن السلاسل الزمنية. قطعة معمارية صغيرة تربط مصادر القياس بمحركات التخزين والعرض.",
      en: "A lightweight metrics-collection daemon reading system and network statistics from hundreds of plugins and shipping them to time-series stores. A small architectural brick connecting metric sources to storage and visualization."
    },
    cmd: "collectd -t",
    cmdDesc: { ar: "اختبار ملف إعداد collectd", en: "Test the collectd configuration file" },
    tags: ["collectd", "daemon", "plugins", "metrics"]
  },
  {
    id: "t073",
    name: "nmon",
    url: "https://sourceforge.net/projects/nmon/",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "مراقب أداء أنظمة AIX ولينكس الشهير من IBM يعرض المعالج والذاكرة والقرص ومقابس الشبكة في طرفة عين أو يسجلها لتحليل لاحق. مفتاح موثوق لقراءة حالة الخادم دون أدوات ثقيلة.",
      en: "IBM's famed AIX and Linux performance monitor showing CPU, memory, disk, and network sockets at a glance, or logging them for later analysis. A trusted key for reading server health without heavy tooling."
    },
    cmd: "nmon -f -s 60 -c 1440",
    cmdDesc: { ar: "تسجيل بيانات الأداء كل دقيقة ليوم كامل", en: "Log performance data every minute for a full day" },
    tags: ["nmon", "ibm", "performance", "aix"]
  },
  {
    id: "t074",
    name: "atop",
    url: "https://www.atoptool.nl",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "مراقب موارد تفاعلي يُظهر لكل عملية استهلاكها من المعالج والذاكرة والقرص والشبكة بما فيها عرض النطاق لكل بطاقة. يجيب فورًا: من يستهلك موارد هذا الخادم الآن؟",
      en: "An interactive resource monitor attributing per-process CPU, memory, disk, and network usage including per-NIC bandwidth. Instantly answers: which process is eating this server right now?"
    },
    cmd: "atop -w /var/log/atop.log 60",
    cmdDesc: { ar: "تسجيل لقطات الأداء كل 60 ثانية", en: "Log performance snapshots every 60 seconds" },
    tags: ["atop", "per-process", "resources", "accounting"]
  },
  {
    id: "t075",
    name: "Munin",
    url: "https://munin-monitoring.org",
    category: "monitor",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "إطار مراقبة سيد-عبد يرسم مخططات تمتد سنوات لمقاييس العقد عبر إضافاته الجاهزة دون تعقيد. أبسط طريق إلى أرشيف رسوم زمنية تاريخي كامل لخوادمك.",
      en: "A master-node monitoring framework drawing years of per-host metric graphs through ready-made plugins without complexity. The simplest path to a full historical time-series archive of your servers."
    },
    cmd: "munin-cron",
    cmdDesc: { ar: "تشغيل دورة التحديث الدورية للرسوم", en: "Run the periodic graph update cycle" },
    tags: ["munin", "rrdtool", "master-node", "plugins"]
  },

  // ── Wireless / أدوات لاسلكية ─────────────────────────────────────────
  {
    id: "t076",
    name: "inSSIDer",
    url: "https://www.metageek.com/products/inssider/",
    category: "wireless",
    platform: ["windows"],
    license: "paid",
    difficulty: 1,
    desc: {
      ar: "محلّل Wi-Fi الشهير لويندوز يعرض كل شبكة مجاورة مع قوتها وقناتها وأمانها في لوحة مرتبة. أول أداة يفتحها كل مهندس لاسلكي لتشخيص ازدحام القنوات واختيار الأنظف.",
      en: "The famous Windows Wi-Fi analyzer listing every nearby network with its signal, channel, and security in a tidy view. The first tool any wireless engineer opens to diagnose channel congestion and pick the cleanest channel."
    },
    cmd: "inSSIDer.exe",
    cmdDesc: { ar: "فتح محلّل الشبكات اللاسلكية المجاورة", en: "Open the analyzer for nearby wireless networks" },
    tags: ["inssider", "metageek", "channel-analysis", "site-survey"]
  },
  {
    id: "t077",
    name: "NetSpot",
    url: "https://www.netspotapp.com",
    category: "wireless",
    platform: ["windows", "mac"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "تطبيق مسح مواقع Wi-Fi لويندوز وماك يجمع قياسات التغطية على مخطط المبنى ويرسم خرائط حرارية للإشارة. يخطط مواضع نقاط الوصول بالأرقام بدل التخمين.",
      en: "A Wi-Fi site-survey app for Windows and Mac that collects coverage measurements over a floor plan and renders heatmaps of signal strength. Plans AP placement by numbers instead of guesswork."
    },
    cmd: "NetSpot.exe",
    cmdDesc: { ar: "بدء مسح جديد لموقع لاسلكي", en: "Start a new wireless site survey" },
    tags: ["netspot", "heatmap", "survey", "planning"]
  },
  {
    id: "t078",
    name: "WiFiAnalyzer (Android)",
    url: "https://github.com/VREMSoftwareDevelopment/WiFiAnalyzer",
    category: "wireless",
    platform: ["android"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "تطبيق أندرويد مفتوح المصدر يعرض الشبكات المجاورة على رسم بياني واضح للقنوات مع مرشحات وقوة إشارة حية. أسرع أداة لقراءة ازدحام الطيف 2.4 و5 جيجاهرتز من جيبك.",
      en: "An open-source Android app showing nearby networks on a clear channel graph with filters and live signal strength. The fastest way to read 2.4/5 GHz congestion straight from your pocket."
    },
    cmd: "adb shell am start -n com.vrem.wifianalyzer/.MainActivity",
    cmdDesc: { ar: "إطلاق التطبيق عبر adb للتفتيش السريع", en: "Launch the app over adb for a quick check" },
    tags: ["wifi-analyzer", "android", "channel-graph", "oss"]
  },
  {
    id: "t079",
    name: "Acrylic WiFi",
    url: "https://www.acrylicwifi.com",
    category: "wireless",
    platform: ["windows"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "محلّل Wi-Fi لويندوز من Tarlogic يعرض قنوات الشبكات ومستويات الإشارة وحالة الأمان ويحلل أداء الأجهزة المتصلة. نسخته المنزلية المجانية تكفي لمعظم التشخيصات السريعة.",
      en: "Tarlogic's Windows Wi-Fi analyzer showing channel usage, signal levels, security status, and connected-device performance. Its free Home edition covers most quick diagnostics."
    },
    cmd: "AcrylicWiFi.exe",
    cmdDesc: { ar: "بدء تحليل قنوات الشبكات اللاسلكية", en: "Start analyzing wireless network channels" },
    tags: ["acrylic-wifi", "tarlogic", "windows", "channels"]
  },
  {
    id: "t080",
    name: "Ekahau AI Pro",
    url: "https://www.ekahau.com",
    category: "wireless",
    platform: ["windows"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "المنصة التجارية المرجعية لتصميم شبكات Wi-Fi، تنشئ تصميمات قائمة على المحاكاة مع خوارزميات تخطيط مواضع النقاط وتعلم آلي. معيار مستشاري الشبكات اللاسلكية حول العالم.",
      en: "The reference commercial platform for designing Wi-Fi networks, producing simulation-based designs with AP-placement algorithms and machine learning. The global standard among wireless consultants."
    },
    cmd: "EkahauAIPro.exe",
    cmdDesc: { ar: "فتح مشروع تصميم شبكة لاسلكية", en: "Open a wireless network design project" },
    tags: ["ekahau", "ai-pro", "design", "simulation"]
  },
  {
    id: "t081",
    name: "Vistumbler",
    url: "https://sourceforge.net/projects/vistumbler/",
    category: "wireless",
    platform: ["windows"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "ماسح شبكات لاسلكية مفتوح المصدر لويندوز يدعم مسح السيارة عبر GPS ويصدّر نقاط الوصول إلى صيغ متعددة. بديل مجاني لجمع بيانات الـ wardriving وتحليلها.",
      en: "An open-source Windows wireless scanner supporting GPS-driven wardriving and exporting access points to multiple formats. A free alternative for collecting and analyzing wardriving data."
    },
    cmd: "Vistumbler.exe",
    cmdDesc: { ar: "بدء مسح الشبكات اللاسلكية المجاورة", en: "Start scanning nearby wireless networks" },
    tags: ["vistumbler", "wardriving", "gps", "windows"]
  },
  {
    id: "t082",
    name: "WiFi Explorer",
    url: "https://www.adriangranados.com",
    category: "wireless",
    platform: ["mac"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "محلّل Wi-Fi أنيق لماك يعرض تفاصيل كل شبكة من القناة إلى معيار 802.11 والأمان مع دعم أجهزة قياس خارجية. أداة تشخيص أساسية في حقيبة مهندسي ماك.",
      en: "An elegant macOS Wi-Fi analyzer detailing every network from channel to 802.11 standard and security, with support for external measurement adapters. A diagnostic staple in any Mac engineer's bag."
    },
    cmd: "open -a 'WiFi Explorer'",
    cmdDesc: { ar: "تشغيل محلّل الشبكات اللاسلكية", en: "Launch the wireless network analyzer" },
    tags: ["wifi-explorer", "macos", "analyzer", "802.11"]
  },
  {
    id: "t083",
    name: "MetaGeek Chanalyzer",
    url: "https://www.metageek.com/products/chanalyzer/",
    category: "wireless",
    platform: ["windows"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "برنامج MetaGeek لتحليل الطيف الترددي يعمل مع جهاز Wi-Spy لرسم مشهد التداخل اللاسلكي في نطاقي 2.4 و5 جيجاهرتز. يكشف مصادر التشويش غير اللاسلكية مثل أفران الميكروويف.",
      en: "MetaGeek's spectrum-analysis software paired with the Wi-Spy USB device, drawing the RF interference landscape in the 2.4 and 5 GHz bands. Detects non-Wi-Fi noise sources like microwave ovens."
    },
    cmd: "Chanalyzer.exe",
    cmdDesc: { ar: "عرض الطيف الترددي مع جهاز Wi-Spy", en: "Display the RF spectrum with a Wi-Spy device" },
    tags: ["chanalyzer", "metageek", "wi-spy", "spectrum"]
  },
  {
    id: "t084",
    name: "KisMAC",
    url: "https://kismac-ng.org",
    category: "wireless",
    platform: ["mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "ماسح شبكات لاسلكية مفتوح المصدر لماك يدعم أجهزة متعددة ووضع المراقبة وحقن الحزم. عميد أدوات اللاسلكي على ماك منذ سنوات طويلة قبل البدائل الحديثة.",
      en: "An open-source macOS wireless scanner supporting multiple adapters, monitor mode, and packet injection. The veteran of Mac wireless tooling, around long before the modern alternatives."
    },
    cmd: "open -a KisMAC",
    cmdDesc: { ar: "بدء ماسح الشبكات اللاسلكية", en: "Start the wireless network scanner" },
    tags: ["kismac", "macos", "monitor-mode", "injection"]
  },
  {
    id: "t085",
    name: "Wavemon",
    url: "https://github.com/uoaerg/wavemon",
    category: "wireless",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عارض حالة الشبكة اللاسلكية في الطرفية يعرض قوة الإشارة وجودة الوصلة والنقاط المجاورة ومستويات الطاقة. أداة لا غنى عنها عند ضبط وصلات لاسلكية خارجية بعيدة على لينكس.",
      en: "A terminal wireless status viewer showing signal strength, link quality, nearby APs, and power levels. Indispensable when tuning long-distance outdoor wireless links on Linux."
    },
    cmd: "wavemon",
    cmdDesc: { ar: "عرض حالة الواجهة اللاسلكية الحية", en: "Display live wireless interface status" },
    tags: ["wavemon", "ncurses", "link-quality", "cli"]
  },
  {
    id: "t086",
    name: "LinSSID",
    url: "https://sourceforge.net/projects/linssid/",
    category: "wireless",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "محلّل Wi-Fi رسومي لسطح مكتب لينكس مبني بـ Qt كنظير لأداة inSSIDer. يعرض الشبكات المجاورة ويرسم قوة إشارتها عبر الزمن في واجهة خفيفة.",
      en: "A graphical Linux desktop Wi-Fi analyzer built with Qt as an inSSIDer lookalike. Lists nearby networks and graphs their signal strength over time in a lightweight UI."
    },
    cmd: "linssid",
    cmdDesc: { ar: "بدء المحلل الرسومي للشبكات المجاورة", en: "Start the graphical nearby-network analyzer" },
    tags: ["linssid", "qt", "linux-desktop", "signal-graph"]
  },
  {
    id: "t087",
    name: "Kismet",
    url: "https://www.kismetwireless.net",
    category: "wireless",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "كاشف الشبكات اللاسلكية ونظام إنذار يلتقط الحركة في وضع المراقبة من عدة بطاقات معًا ويكشف الشبكات المخفية والأجهزة. عين المهندس على الطيف اللاسلكي منذ أكثر من عقدين.",
      en: "A wireless network detector, sniffer, and intrusion system capturing traffic in monitor mode from multiple cards simultaneously and uncovering hidden networks and devices. The engineer's eye on the RF spectrum for over two decades."
    },
    cmd: "kismet -c wlan0",
    cmdDesc: { ar: "بدء Kismet على بطاقة الالتقاط wlan0", en: "Start Kismet on capture interface wlan0" },
    tags: ["kismet", "monitor-mode", "ids", "rf"]
  },
  {
    id: "t088",
    name: "iw",
    url: "https://wireless.wiki.kernel.org/en/users/documentation/iw",
    category: "wireless",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة لينكس الحديثة لإعداد الأجهزة اللاسلكية المتوافقة مع nl80211 كبديلة لأوامر iwconfig القديمة. تعرض الشبكات وقدرات الواجهة وتضبط قنوات الالتقاط.",
      en: "The modern Linux tool for configuring nl80211-based wireless devices, replacing the legacy iwconfig suite. Lists networks, interface capabilities, and tunes capture channels."
    },
    cmd: "iw dev wlan0 scan",
    cmdDesc: { ar: "فحص الشبكات اللاسلكية المجاورة", en: "Scan for nearby wireless networks" },
    tags: ["iw", "nl80211", "linux", "wireless-config"]
  },
  {
    id: "t089",
    name: "iwd",
    url: "https://git.kernel.org/pub/scm/network/wireless/iwd.git",
    category: "wireless",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "عفريت الاتصال اللاسلكي من Intel يهدف إلى استبدال wpa_supplicant ببصمة ذاكرة أصغر وإدارة أسهل عبر iwctl. الجيل القادم من إدارة Wi-Fi في توزيعات لينكس الحديثة.",
      en: "Intel's wireless daemon aiming to replace wpa_supplicant with a smaller footprint and simpler iwctl management. The next generation of Wi-Fi management on modern Linux distros."
    },
    cmd: "iwctl station wlan0 connect MyWiFi",
    cmdDesc: { ar: "الاتصال بشبكة عبر iwctl", en: "Connect to a network via iwctl" },
    tags: ["iwd", "iwctl", "intel", "daemon"]
  },
  {
    id: "t090",
    name: "wpa_cli",
    url: "https://w1.fi",
    category: "wireless",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "سطر أوامر wpa_supplicant للتحكم في الاتصالات اللاسلكية بفحص الشبكات وإدخال بيانات الاعتماد وإدارة حالات الاتصال. أداة الإعداد القياسية على الخوادم والأنظمة المدمجة بلا واجهة.",
      en: "The wpa_supplicant command-line controller for scanning networks, entering credentials, and managing connection states. The standard configuration tool on headless servers and embedded systems."
    },
    cmd: "wpa_cli scan_results",
    cmdDesc: { ar: "عرض نتائج فحص الشبكات الأخيرة", en: "Show the latest network scan results" },
    tags: ["wpa_cli", "wpa_supplicant", "headless", "cli"]
  },
  {
    id: "t091",
    name: "nmcli",
    url: "https://networkmanager.dev",
    category: "wireless",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة NetworkManager النصية لإدارة كل اتصالات النظام من إيثرنت إلى Wi-Fi وVPN عبر أوامر موحدة. تجعل سكربتات الأتمتة على لينكس ممكنة دون لمس الواجهة الرسومية.",
      en: "NetworkManager's text tool managing every system connection from Ethernet to Wi-Fi and VPN through unified commands. Makes Linux automation scripts possible without touching the GUI."
    },
    cmd: "nmcli dev wifi list",
    cmdDesc: { ar: "عرض الشبكات اللاسلكية المتاحة", en: "List available wireless networks" },
    tags: ["nmcli", "networkmanager", "automation", "cli"]
  },
  {
    id: "t092",
    name: "netsh wlan",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netsh-wlan",
    category: "wireless",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "سياق wlan في أمر netsh المدمج في ويندوز يعرض الشبكات والملفات الشخصية وحالة الواجهات وتقارير الاتصال. لا يحتاج تثبيت أي شيء فهو جزء من النظام نفسه.",
      en: "The wlan context of Windows' built-in netsh command exposing networks, profiles, interface states, and connection reports. Requires no install since it is part of the OS itself."
    },
    cmd: "netsh wlan show networks mode=bssid",
    cmdDesc: { ar: "عرض الشبكات المجاورة مع قوة إشارتها", en: "List nearby networks with their signal strength" },
    tags: ["netsh", "windows", "built-in", "wlan"]
  },
  {
    id: "t093",
    name: "Scapy",
    url: "https://scapy.net",
    category: "wireless",
    platform: ["cross"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "مكتبة بايثون لصناعة الحزم وإرسالها والاستماع إليها تتعامل مع كل طبقات البروتوكول كسجلات قابلة للبناء. ورشة الحزم الأولى التي تحوّل بها أي فكرة نظرية إلى تجربة عملية على الشبكة.",
      en: "A Python library for crafting, sending, and sniffing packets, treating every protocol layer as buildable records. The first packet workshop for turning any protocol theory into a live experiment."
    },
    cmd: "scapy",
    cmdDesc: { ar: "بدء الصدفة التفاعلية لصناعة الحزم", en: "Start the interactive packet-crafting shell" },
    tags: ["scapy", "python", "packet-crafting", "protocols"]
  },
  {
    id: "t094",
    name: "Aircrack-ng",
    url: "https://www.aircrack-ng.org",
    category: "wireless",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مجموعة أدوات تقييم أمن Wi-Fi الأشهر: airodump لالتقاط مصافحات WPA وaircrack لاستعادة المفاتيح وaireplay لحقن الحزم. المنهج العملي المعياري لفهم أمن البروتوكولات اللاسلكية.",
      en: "The most famous Wi-Fi security assessment suite: airodump for capturing WPA handshakes, aircrack for key recovery, and aireplay for injection. The canonical hands-on methodology for understanding wireless protocol security."
    },
    cmd: "aircrack-ng capture.cap -w wordlist.txt",
    cmdDesc: { ar: "استعادة مفاتاح WPA من مصافحة ملتقطة", en: "Recover a WPA key from a captured handshake" },
    tags: ["aircrack-ng", "wpa", "handshake", "audit"]
  },
  {
    id: "t095",
    name: "Wifite",
    url: "https://github.com/derv82/wifite2",
    category: "wireless",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أتمتة كاملة لهجمات Wi-Fi تختار الأهداف وتلتقط المصافحات وتستعيد المفاتيح عبر حلقات aircrack وreaver. يختصر عشرات الأوامر اليدوية في خطوة هجومية واحدة.",
      en: "Full automation of Wi-Fi attacks, selecting targets, capturing handshakes, and running key recovery through aircrack and reaver loops. Compresses dozens of manual commands into a single offensive step."
    },
    cmd: "sudo wifite",
    cmdDesc: { ar: "بدء الهجوم الآلي على الشبكات المجاورة", en: "Launch the automated attack on nearby networks" },
    tags: ["wifite", "automation", "wpa", "handshake"]
  },
  {
    id: "t096",
    name: "airgeddon",
    url: "https://github.com/v1s1t0r1sh3r3/airgeddon",
    category: "wireless",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "سكربت Bash متعدد القوائم يوحّد أدوات اللاسلكي في هجمات البوابة المُكرهة وDoS والتقاط المصافحات والشبكة التوأم الشريرة. مختبر متكامل في الطرفية لتعلم كل سيناريوهات أمن Wi-Fi.",
      en: "A bash menu-driven script unifying wireless tools for captive-portal attacks, DoS, handshake capture, and evil-twin setups. A complete terminal lab for learning every Wi-Fi security scenario."
    },
    cmd: "sudo airgeddon",
    cmdDesc: { ar: "فتح قوائم airgeddon التفاعلية", en: "Open airgeddon's interactive menus" },
    tags: ["airgeddon", "bash", "evil-twin", "wifi-security"]
  },
  {
    id: "t097",
    name: "cowpatty",
    url: "https://www.kali.org/tools/cowpatty/",
    category: "wireless",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أداة استعادة مفاتيح WPA-PSK تستخدم هجمات القاموس مع جداول PMK محسوبة مسبقًا لتسريع المحاولات ملايين المرات. فكرة الجداول المسبقة فيها قادت إلى ولادة أدوات أسرع لاحقًا.",
      en: "A WPA-PSK key recovery tool using dictionary attacks with precomputed PMK tables to speed attempts by millions of times. Its precomputed-table idea seeded later, faster tools."
    },
    cmd: "cowpatty -r capture.cap -f dict.txt -s MyWiFi",
    cmdDesc: { ar: "استعادة مفاتاح شبكة WPA بقاموس كلمات", en: "Recover a WPA key with a word dictionary" },
    tags: ["cowpatty", "wpa-psk", "pmk", "dictionary"]
  },
  {
    id: "t098",
    name: "hashcat",
    url: "https://hashcat.net/hashcat/",
    category: "wireless",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أسرع مستعيد كلمات مرور في العالم يستغل بطاقات الرسوميات ويدعم صيغة 22000 لمصافحات WPA وPMKID. أداة تقييم أمن Wi-Fi النهائية عندما تتوفر كروت رسوميات قوية.",
      en: "The world's fastest password recovery tool, harnessing GPUs and supporting format 22000 for WPA handshakes and PMKID. The ultimate Wi-Fi security assessment tool when strong GPUs are available."
    },
    cmd: "hashcat -m 22000 capture.22000 wordlist.txt",
    cmdDesc: { ar: "استعادة مصافحة WPA عبر تسريع GPU", en: "Recover a WPA handshake using GPU acceleration" },
    tags: ["hashcat", "gpu", "cracking", "22000"]
  },
  {
    id: "t099",
    name: "Fern WiFi Cracker",
    url: "https://github.com/savio-code/fern-wifi-cracker",
    category: "wireless",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "واجهة رسومية لهجمات شبكات Wi-Fi تحزم أدوات aircrack في تجربة نقر واحدة مع خريطة للشبكات على الواجهة. أداة تعليمية شائعة في مختبرات الأمن السيبراني الجامعية.",
      en: "A GUI wrapper for Wi-Fi attacks that packages aircrack tooling into a one-click experience with a network map view. A popular teaching aid in university security labs."
    },
    cmd: "fern-wifi-cracker",
    cmdDesc: { ar: "فتح الواجهة الرسومية لهجمات Wi-Fi", en: "Open the GUI for Wi-Fi attacks" },
    tags: ["fern", "wifi-cracking", "gui", "python"]
  },
  {
    id: "t100",
    name: "WiGLE",
    url: "https://wigle.net",
    category: "wireless",
    platform: ["web", "android"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "قاعدة البيانات الجغرافية العالمية للشبكات اللاسلكية يجمعها المتطوعون عبر تطبيق الأندرويد وترسم على خرائط تفاعلية. أرشيف لاسلكي تاريخي هائل لبحث تطور انتشار الشبكات عبر السنين.",
      en: "The global geodatabase of wireless networks crowdsourced via its Android app and plotted on interactive maps. A massive historical wireless archive for researching how network coverage evolved over the years."
    },
    cmd: "curl -u 'APIUSER:TOKEN' 'https://api.wigle.net/api/v2/network/search?ssid=MyWiFi'",
    cmdDesc: { ar: "البحث عن شبكة في أرشيف WiGLE العالمي", en: "Search for a network in WiGLE's global archive" },
    tags: ["wigle", "wardriving", "database", "geolocation"]
  }
];
