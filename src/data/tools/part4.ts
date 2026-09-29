import type { Tool } from "@/lib/types";

// ─── TOOLS PART 4: t301–t400 ─────────────────────────────────────────────
// Categories: firewall (t301–t320), vpn (t321–t340), dns (t341–t360),
//             automation (t361–t380), crypto (t381–t400)

export const TOOLS_PART4: Tool[] = [
  // ── Firewall / الجدران النارية ───────────────────────────────────────
  {
    id: "t301",
    name: "iptables",
    url: "https://www.netfilter.org/projects/iptables/index.html",
    category: "firewall",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "الإطار التاريخي لجدار الحماية في لينكس يبني قواعد على مستوى الحزم عبر سلاسل وانتقالات Netfilter. رغم الانتقال إلى nftables يبقى حاضرًا في كل خادم تقريبًا وسكربتات لا تُحصى.",
      en: "Linux's historical packet-filtering firewall, building rules over chains and Netfilter hooks. Even with the nftables transition it lives on in nearly every server and countless legacy scripts."
    },
    cmd: "iptables -A INPUT -p tcp --dport 443 -j ACCEPT",
    cmdDesc: { ar: "السماح بحركة HTTPS الواردة", en: "Allow inbound HTTPS traffic" },
    tags: ["iptables", "netfilter", "firewall", "linux"]
  },
  {
    id: "t302",
    name: "nftables",
    url: "https://www.netfilter.org/projects/nftables/",
    category: "firewall",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خليفة iptables في النواة الحديثة بلغة قواعد موحّدة تتعامل مع IPv4 وIPv6 وARP في مجموعة واحدة. تبسّط الإدارة وتحسّن الأداء وتترجم القواعد القديمة تلقائيًا.",
      en: "iptables' successor in modern kernels, with a unified ruleset language handling IPv4, IPv6, and ARP in one ruleset. It simplifies management, boosts performance, and translates legacy rules."
    },
    cmd: "nft list ruleset",
    cmdDesc: { ar: "عرض كامل قواعد الترشيح النشطة", en: "Display the complete active ruleset" },
    tags: ["nftables", "firewall", "linux", "kernel"]
  },
  {
    id: "t303",
    name: "firewalld",
    url: "https://firewalld.org",
    category: "firewall",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "طبقة إدارة دينامية لجدار الحماية قائمة على مفهوم المناطق والخدمات بدل القواعد الخام. تطبّق التغييرات فورًا دون قطع الاتصالات الجارية عبر واجهة D-Bus.",
      en: "A dynamic firewall management layer built around zones and services instead of raw rules. It applies changes instantly without dropping live connections, driven over D-Bus."
    },
    cmd: "firewall-cmd --permanent --add-service=https",
    cmdDesc: { ar: "فتح خدمة HTTPS بشكل دائم في المنطقة الحالية", en: "Permanently open the HTTPS service in the current zone" },
    tags: ["firewalld", "zones", "rhel", "firewall"]
  },
  {
    id: "t304",
    name: "UFW",
    url: "https://launchpad.net/ufw",
    category: "firewall",
    platform: ["linux"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "الواجهة الأمامية البسيطة لـ iptables صُممت لتكون سهلة مثل تطبيقات الهاتف. جملة واحدة تفتح منفذًا أو تحظر عنوانًا بفضل نموذج القواعد البديهي.",
      en: "The friendly front-end for iptables designed to be as easy as a phone app. A single sentence opens a port or blocks an address thanks to its intuitive rule model."
    },
    cmd: "sudo ufw allow 443/tcp",
    cmdDesc: { ar: "السماح بحركة HTTPS الواردة", en: "Allow inbound HTTPS traffic" },
    tags: ["ufw", "ubuntu", "firewall", "iptables"]
  },
  {
    id: "t305",
    name: "pf (OpenBSD Packet Filter)",
    url: "https://www.openbsd.org/faq/pf/",
    category: "firewall",
    platform: ["mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "جدار حماية OpenBSD الأصيل الذي يشغّل جدار macOS الافتراضي بقواعد تعريفية شهيرة بوضوحها. غني بميزات مثل الجداول وتوازن الأحمال وتطبيع الحزم.",
      en: "OpenBSD's packet filter, also powering macOS's built-in firewall, with famously readable declarative rules. It packs tables, load balancing, and packet normalisation."
    },
    cmd: "sudo pfctl -sr",
    cmdDesc: { ar: "عرض قواعد pf المحمّلة حاليًا", en: "Show the currently loaded pf rules" },
    tags: ["pf", "bsd", "macos", "firewall"]
  },
  {
    id: "t306",
    name: "pfSense",
    url: "https://www.pfsense.org",
    category: "firewall",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "توزيعة جدار حماية وموجّه مبنية على FreeBSD تُدار من واجهة ويب أنيقة. تحوّل أي جهاز إلى جدار من الجيل الجديد مجانًا مع دعم VPN وIDS وقواعد متقدمة.",
      en: "A FreeBSD-based firewall/router distribution managed from a polished web UI. It turns any PC into a free next-gen firewall with VPN, IDS, and advanced rule support."
    },
    cmd: "pfctl -s rules",
    cmdDesc: { ar: "عرض القواعد من طرفية pfSense", en: "List rules from the pfSense shell" },
    tags: ["pfsense", "firewall", "freebsd", "router"]
  },
  {
    id: "t307",
    name: "OPNsense",
    url: "https://opnsense.org",
    category: "firewall",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تفرّع من pfSense بإصدارات أسبوعية وواجهة محسّنة وحوكمة مفتوحة بلا قيود تجارية. يقدّم كشف التسلل والتقارير المرئية وVPN متعدد البروتوكولات.",
      en: "A pfSense fork with weekly releases, a refined UI, and truly open governance. It ships intrusion detection, visual reporting, and multi-protocol VPN."
    },
    cmd: "configctl filter reload",
    cmdDesc: { ar: "إعادة تحميل قواعد الترشيح دون قطع الاتصال", en: "Reload filter rules without dropping sessions" },
    tags: ["opnsense", "firewall", "freebsd", "ids"]
  },
  {
    id: "t308",
    name: "Windows Defender Firewall",
    url: "https://learn.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/windows-firewall-with-advanced-security",
    category: "firewall",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "جدار الحماية المدمج في ويندوز يُدار عبر wf.msc بقواعد للاتصالات الصادرة والواردة مع تسجيل الأحداث. سياسات المجموعة تنشر ملفاته التعريفية على مئات الأجهزة مركزيًا.",
      en: "Windows' built-in firewall administered through wf.msc with inbound/outbound rules and logging. Group Policy deploys its profiles across hundreds of machines centrally."
    },
    cmd: "wf.msc",
    cmdDesc: { ar: "فتح لوحة إدارة الجدار الناري المتقدمة", en: "Open the advanced firewall management console" },
    tags: ["windows", "firewall", "gpo", "wfmsc"]
  },
  {
    id: "t309",
    name: "Cisco Secure Firewall (FTD)",
    url: "https://www.cisco.com/site/us/en/products/security/firewalls/index.html",
    category: "firewall",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "منصة Cisco من الجيل الجديد تدير أجهزة FTD مع محرك Snort للفحص العميق وتصنيف التطبيقات. يديرها مدير FMC الذي يجمع السياسات لمئات الأجهزة في مكان واحد.",
      en: "Cisco's next-gen platform running FTD devices with the Snort engine for deep inspection and app awareness. The FMC manager consolidates policy across hundreds of sensors."
    },
    cmd: "show access-list",
    cmdDesc: { ar: "عرض قوائم التحكم النشطة على المحرك", en: "Display the active access control lists" },
    tags: ["cisco", "ftd", "ngfw", "snort"]
  },
  {
    id: "t310",
    name: "Fortinet FortiGate",
    url: "https://www.fortinet.com/products/next-generation-firewall",
    category: "firewall",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "جدار حماية من الجيل الجديد من Fortinet يشغّل معالجات ASIC مخصصة لفحص الحركة بسرعات عالية. يجمع فحص SSL وتصنيف التطبيقات وIPS في نظام واحد متكامل.",
      en: "Fortinet's NGFW family running custom ASICs to inspect traffic at high speed. It blends SSL inspection, application control, and IPS in one integrated OS."
    },
    cmd: "show firewall policy",
    cmdDesc: { ar: "مراجعة سياسات الجدار الناري", en: "Review the firewall policy set" },
    tags: ["fortigate", "fortinet", "ngfw", "asic"]
  },
  {
    id: "t311",
    name: "Palo Alto NGFW",
    url: "https://www.paloaltonetworks.com/network-security",
    category: "firewall",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "رائد الجدران من الجيل الجديد يعرّف التطبيقات عبر App-ID والمستخدمين عبر User-ID فيعيد صياغة كتابة القواعد الأمنية. معماريته أحادية المرور تفحص كل جلسة مرة واحدة فترفع الأداء.",
      en: "The NGFW pioneer identifying applications via App-ID and users via User-ID, redefining how security rules are written. Its single-pass architecture inspects each session once for speed without compromise."
    },
    cmd: "show running security-policy",
    cmdDesc: { ar: "عرض سياسات الأمن الجارية على الجهاز", en: "Display the running security policies on the device" },
    tags: ["paloalto", "pan-os", "ngfw", "appid"]
  },
  {
    id: "t312",
    name: "Check Point Quantum",
    url: "https://www.checkpoint.com/quantum/",
    category: "firewall",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "منصة حماية مؤسسية عريقة من Check Point بإدارة SmartConsole ودعم دومينات متعددة. تتقدم في تبنّي الثقة الصفرية وجدار الحماية كخدمة لدى المنظمات الكبيرة.",
      en: "Check Point's long-established enterprise security platform with SmartConsole management and multi-domain support. It leads in zero-trust and firewall-as-a-service adoption among large organisations."
    },
    cmd: "fw stat",
    cmdDesc: { ar: "حالة سياسة الحماية المحمّلة على البوابة", en: "Show the loaded security policy status on a gateway" },
    tags: ["checkpoint", "quantum", "ngfw", "gaia"]
  },
  {
    id: "t313",
    name: "Sophos Firewall",
    url: "https://www.sophos.com/products/next-gen-firewall",
    category: "firewall",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "جدار Sophos بواجهة حديثة يربط حماية نقاط النهاية بالشبكة عبر نبضة الأمان Security Heartbeat. يقدّم نسخة منزلية مجانية كاملة الميزات للمستخدم الفردي.",
      en: "Sophos' firewall with a modern UI linking endpoint and network protection via Security Heartbeat. A fully-featured free home edition exists for single users."
    },
    cmd: "show firewall rules",
    cmdDesc: { ar: "عرض قواعد الجدار على سطر أوامر SFOS", en: "List firewall rules from the SFOS CLI" },
    tags: ["sophos", "xg", "ngfw", "home"]
  },
  {
    id: "t314",
    name: "IPFire",
    url: "https://www.ipfire.org",
    category: "firewall",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "توزيعة جدار حماية مفتوحة المصدر تفرّق الشبكات بالألوان من الحمراء للإنترنت إلى الخضراء للشبكة الداخلية. مبنية على Linux From Scratch فتستهلك موارد ضئيلة على عتاد قديم.",
      en: "An open-source firewall distribution colour-coding zones from red for the internet to green for the LAN. Built from Linux From Scratch, it runs light on old hardware."
    },
    cmd: "iptables -L -n -v",
    cmdDesc: { ar: "استعراض قواعد الشبكة من طرفية IPFire", en: "Inspect firewall rules from the IPFire shell" },
    tags: ["ipfire", "firewall", "linux", "utm"]
  },
  {
    id: "t315",
    name: "Shorewall",
    url: "https://shorewall.org",
    category: "firewall",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة تهيئة جدار عالية المستوى تحوّل ملفات سياسة بسيطة إلى آلاف قواعد iptables. فصل السياسة عن القواعد جعلها معيارًا للبوابات المعقدة قبل عصر nftables.",
      en: "A high-level firewall configuration tool compiling plain policy files into thousands of iptables rules. Its policy/rules separation made it a standard for complex gateways pre-nftables."
    },
    cmd: "shorewall restart",
    cmdDesc: { ar: "تطبيق السياسات بعد تعديلها", en: "Apply policies after editing them" },
    tags: ["shorewall", "iptables", "gateway", "linux"]
  },
  {
    id: "t316",
    name: "fail2ban",
    url: "https://www.fail2ban.org",
    category: "firewall",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "نظام يراقب سجلات الخدمات ويحظر تلقائيًا العناوين التي تكرر محاولات الفشل. يحمي SSH وخدمات الويب من هجمات القوة الغاشمة بقواعد سهلة التعديل.",
      en: "A daemon watching service logs and auto-banning addresses that repeatedly fail. It shields SSH and web services from brute-force attacks with easily tunable jails."
    },
    cmd: "fail2ban-client status sshd",
    cmdDesc: { ar: "عرض إحصاءات الحظر لخدمة SSH", en: "Show ban statistics for the SSH jail" },
    tags: ["fail2ban", "brute-force", "security", "logs"]
  },
  {
    id: "t317",
    name: "ConfigServer Security & Firewall",
    url: "https://configserver.com",
    category: "firewall",
    platform: ["linux"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "جدار حماية شامل مع وحدة كشف تسلل شائعة على خوادم الاستضافة cPanel. يراقب سجلات الخدمات ويحظر المهاجمين مع لوحة إعداد مباشرة داخل WHM.",
      en: "ConfigServer's firewall and intrusion-detection suite popular on cPanel hosting servers. It watches service logs, blocks attackers, and integrates into WHM."
    },
    cmd: "csf -r",
    cmdDesc: { ar: "إعادة تحميل قواعد CSF بعد التعديل", en: "Reload CSF rules after changes" },
    tags: ["csf", "cpanel", "firewall", "security"]
  },
  {
    id: "t318",
    name: "TinyWall",
    url: "https://tinywall.pados.hu",
    category: "firewall",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "طبقة ذكية فوق جدار ويندوز تضيف حماية الاتصالات الصادرة وقوائم بيضاء بلمسة واحدة. تحل مشكلة النوافذ المنبثقة المزعجة دون تعطيل الجدار الأصلي.",
      en: "A smart layer over the Windows firewall adding outbound protection and one-click whitelisting. It fixes the annoying-prompt problem without disabling the native firewall."
    },
    cmd: "TinyWall.exe",
    cmdDesc: { ar: "تشغيل أداة إدارة TinyWall", en: "Launch the TinyWall utility" },
    tags: ["tinywall", "windows", "outbound", "firewall"]
  },
  {
    id: "t319",
    name: "Portmaster",
    url: "https://safing.io",
    category: "firewall",
    platform: ["windows", "linux"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "جدار حماية للتطبيقات من Safing يعرض كل اتصال صادر ويسمح بحظره دائمًا أو مؤقتًا لكل تطبيق. يعمل على مستوى العملية نفسها فيدعم قواعد عميقة التخصيص.",
      en: "Safing's application firewall that visualises every outbound connection and allows per-app blocks. Operating at the process level, it enables deeply custom rules."
    },
    cmd: "portmaster start",
    cmdDesc: { ar: "تشغيل خدمة Portmaster", en: "Start the Portmaster service" },
    tags: ["portmaster", "safing", "privacy", "application-firewall"]
  },
  {
    id: "t320",
    name: "FireHOL",
    url: "https://firehol.org",
    category: "firewall",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "مولّد قواعد iptables بلغة بسيطة تشبه كتابة السكربتات مع تطبيق فوري وأوامر تجربة آمنة. استُخدم كثيرًا للبوابات المنزلية بملفات قابلة للقراءة البشرية.",
      en: "An iptables rules generator with a clean script-like language and instant apply. Safe testing commands and readable configs made it a home-lab favourite."
    },
    cmd: "firehol try",
    cmdDesc: { ar: "تطبيق القواعد مع تراجع تلقائي عند انقطاع الاتصال", en: "Apply rules with automatic rollback if you break the connection" },
    tags: ["firehol", "iptables", "firewall", "linux"]
  },

  // ── VPN / VPN والأنفاق ────────────────────────────────────────────────
  {
    id: "t321",
    name: "OpenVPN",
    url: "https://openvpn.net",
    category: "vpn",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أشهر تطبيق VPN SSL مفتوح المصدر يشغّل بروتوكولًا قويًا فوق OpenSSL. يدعم أوضاع التوجيه والجسر ومصادقة الشهادات والاندماج مع LDAP.",
      en: "The most widely deployed open-source SSL VPN, running a proven protocol over OpenSSL. It supports routed and bridged modes, certificate auth, and LDAP integration."
    },
    cmd: "sudo openvpn --config client.ovpn",
    cmdDesc: { ar: "الاتصال بخادم OpenVPN بملف العميل", en: "Connect to an OpenVPN server with a client profile" },
    tags: ["openvpn", "ssl", "vpn", "tls"]
  },
  {
    id: "t322",
    name: "WireGuard",
    url: "https://www.wireguard.com",
    category: "vpn",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "بروتوكول VPN حديث بأربعة آلاف سطر فقط يتفوق في السرعة والبساطة وقابلية المراجعة الأمنية. أُدمج في نواة لينكس ويهيّئ الأنفاق النظيفة في ثوانٍ.",
      en: "A modern VPN protocol in roughly four thousand lines of code, excelling in speed, simplicity, and auditability. Merged into the Linux kernel, it sets up clean tunnels in seconds."
    },
    cmd: "sudo wg-quick up wg0",
    cmdDesc: { ar: "تشغيل نفق WireGuard المعرّف بـ wg0", en: "Bring up the WireGuard tunnel named wg0" },
    tags: ["wireguard", "vpn", "kernel", "crypto"]
  },
  {
    id: "t323",
    name: "strongSwan",
    url: "https://www.strongswan.org",
    category: "vpn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أشهر تنفيذ IPsec/IKEv2 مفتوح المصدر مع دعم كامل لشهادات X.509 وEAP. يربط مواقع المؤسسات والهواتف وفق معايير IETF الصارمة.",
      en: "The leading open-source IPsec/IKEv2 implementation with full X.509 and EAP support. It interconnects corporate sites and phones following strict IETF standards."
    },
    cmd: "swanctl --initiate --child office",
    cmdDesc: { ar: "بدء نفق IPsec معرّف باسم office", en: "Initiate the IPsec tunnel named office" },
    tags: ["strongswan", "ipsec", "ikev2", "vpn"]
  },
  {
    id: "t324",
    name: "SoftEther VPN",
    url: "https://www.softether.org",
    category: "vpn",
    platform: ["windows", "linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم VPN متعدد البروتوكولات من جامعة تسوكوبا يدعم SSL-VPN وL2TP وOpenVPN وSSTP في آن واحد. أداة إدارته الرسومية تُصدر الشهادات وإعدادات العملاء تلقائيًا.",
      en: "Tsukuba University's multi-protocol VPN server supporting SSL-VPN, L2TP, OpenVPN, and SSTP simultaneously. Its Windows-based manager issues certificates and client configs automatically."
    },
    cmd: "vpncmd /SERVER localhost /CMD ServerStatusGet",
    cmdDesc: { ar: "فحص حالة خادم SoftEther عبر vpncmd", en: "Check SoftEther server status via vpncmd" },
    tags: ["softether", "vpn", "multi-protocol", "server"]
  },
  {
    id: "t325",
    name: "Tailscale",
    url: "https://tailscale.com",
    category: "vpn",
    platform: ["cross"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "شبكة VPN تنسجية مبنية على WireGuard تربط أجهزتك بهويات المستخدمين لا بعناوين IP. تعبر NAT دون أي إعداد وتتيح استضافة خادم التنسيق ذاتيًا عبر Headscale.",
      en: "A WireGuard-based mesh VPN joining your devices by identity, not IP. It traverses NATs with zero configuration and supports self-hosting the control plane via Headscale."
    },
    cmd: "tailscale status",
    cmdDesc: { ar: "عرض أجهزة شبكة Tailscale وحالتها", en: "List Tailscale devices and their status" },
    tags: ["tailscale", "wireguard", "mesh", "zero-config"]
  },
  {
    id: "t326",
    name: "ZeroTier",
    url: "https://www.zerotier.com",
    category: "vpn",
    platform: ["cross"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "شبكة افتراضية لامركزية تجمع الأجهزة في شبكة من الطبقة الثانية كأنها في غرفة واحدة. تدعم قواعد التدفق والتوجيه بين الشبكات مع وحدات تحكم مستضافة أو خاصة.",
      en: "A decentralised virtual network placing devices into one L2 segment as if they shared a room. Flow rules and routed networks work with hosted or self-managed controllers."
    },
    cmd: "zerotier-cli listnetworks",
    cmdDesc: { ar: "عرض الشبكات المنضمة وحالة انضمامها", en: "Show joined networks and their approval state" },
    tags: ["zerotier", "sd-wan", "overlay", "mesh"]
  },
  {
    id: "t327",
    name: "Netbird",
    url: "https://netbird.io",
    category: "vpn",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "بديل مفتوح المصدر لـ Tailscale يدير تنسيق WireGuard عبر خادم ذاتي الإدارة بسهولة. يوفر قوائم التحكم بالوصول والمراقبة وخوادم الترحيل التي تحتاجها الفرق.",
      en: "An open-source Tailscale alternative managing WireGuard coordination from an easy self-hosted server. It ships the ACLs, monitoring, and relays small teams need."
    },
    cmd: "netbird status",
    cmdDesc: { ar: "عرض حالة اتصالات Netbird", en: "Show Netbird peer and connection status" },
    tags: ["netbird", "wireguard", "p2p", "opensource"]
  },
  {
    id: "t328",
    name: "Cloudflare WARP",
    url: "https://one.one.one.one",
    category: "vpn",
    platform: ["cross"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "عميل Cloudflare الذي يشفّر حركتك إلى أقرب نقطة حضور في شبكتها الحدودية العملاقة. يُستخدم فرديًا أو ضمن حلول الثقة الصفرية لتأمين وصول الموظفين للتطبيقات.",
      en: "Cloudflare's client encrypting your traffic to the nearest PoP of its vast edge network. It serves individuals directly or inside corporate Zero Trust access flows."
    },
    cmd: "warp-cli connect",
    cmdDesc: { ar: "تفعيل نفق WARP على الجهاز", en: "Activate the WARP tunnel on this device" },
    tags: ["warp", "cloudflare", "zero-trust", "edge"]
  },
  {
    id: "t329",
    name: "Outline VPN",
    url: "https://getoutline.org",
    category: "vpn",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "خادم بروكسي من Jigsaw يعتمد Shadowsocks ويُنشر عبر برنامج إدارة يصدر مفاتيح الوصول. صُمم لإبقاء الإنترنت مفتوحًا بواجهة بسيطة وقياسات أداء مدمجة.",
      en: "Jigsaw's Shadowsocks-based proxy server deployed through a manager app that issues access keys. Designed to keep the internet open with a simple UI and built-in metrics."
    },
    cmd: "ss-local -c outline-config.json",
    cmdDesc: { ar: "تشغيل عميل Outline عبر Shadowsocks", en: "Run the Outline client via Shadowsocks" },
    tags: ["outline", "shadowsocks", "proxy", "jigsaw"]
  },
  {
    id: "t330",
    name: "Algo VPN",
    url: "https://github.com/trailofbits/algo",
    category: "vpn",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "سكربت Ansible من Trail of Bits ينشر خادم VPN شخصيًا على مزوّدي السحابة بأسئلة معدودة. يفعّل WireGuard افتراضيًا مع أفضل ممارسات التشفير والأمان.",
      en: "Trail of Bits' Ansible playbook deploying a personal VPN on cloud providers in a few prompts. It enables WireGuard by default with strong crypto defaults."
    },
    cmd: "./algo",
    cmdDesc: { ar: "بدء معالج نشر خادم Algo", en: "Start the Algo deployment wizard" },
    tags: ["algo", "wireguard", "ansible", "trailofbits"]
  },
  {
    id: "t331",
    name: "Streisand",
    url: "https://github.com/StreisandEffect/streisand",
    category: "vpn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مشروع كلاسيكي يرفع خادمًا متعدد البروتوكولات يقدّم OpenVPN وWireGuard وShadowsocks مع صفحات إرشادية لكل خدمة. أُرشف الآن لكنه احتفظ بقيمته التعليمية.",
      en: "A classic project standing up a multi-protocol server serving OpenVPN, WireGuard, and Shadowsocks with per-client tutorials. Archived now, but it retains educational value."
    },
    cmd: "./streisand",
    cmdDesc: { ar: "تشغيل سكربت نشر Streisand", en: "Run the Streisand deployment script" },
    tags: ["streisand", "vpn", "ansible", "archived"]
  },
  {
    id: "t332",
    name: "Pritunl",
    url: "https://pritunl.com",
    category: "vpn",
    platform: ["linux"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "خادم VPN بواجهة ويب أنيقة يبني شبكات OpenVPN وWireGuard متعددة المستخدمين. يدير المستخدمين والفرق مع مصادقة RADIUS ومراقبة حية.",
      en: "A VPN server with an elegant web UI building multi-user OpenVPN and WireGuard networks. It manages users and teams with RADIUS auth and live monitoring."
    },
    cmd: "pritunl start",
    cmdDesc: { ar: "تشغيل خادم Pritunl", en: "Start the Pritunl server" },
    tags: ["pritunl", "openvpn", "web-ui", "server"]
  },
  {
    id: "t333",
    name: "OpenVPN Access Server",
    url: "https://openvpn.net/access-server/",
    category: "vpn",
    platform: ["linux"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "النسخة التجارية الجاهزة من OpenVPN بواجهة إدارة ويب وتهيئة تلقائية للعملاء. تتضمن اتصالين متزامنين مجانًا قبل الانتقال للتراخيص المدفوعة.",
      en: "The turnkey commercial edition of OpenVPN with a web admin UI and automated client provisioning. It includes two free concurrent connections before paid tiers."
    },
    cmd: "ovpn-init",
    cmdDesc: { ar: "تشغيل معالج تهيئة Access Server", en: "Run the Access Server initialisation wizard" },
    tags: ["openvpn-as", "vpn", "server", "web-ui"]
  },
  {
    id: "t334",
    name: "Cisco Secure Client",
    url: "https://www.cisco.com/site/us/en/products/security/secure-client/index.html",
    category: "vpn",
    platform: ["cross"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "عميل Cisco الموحد لاتصالات AnyConnect عبر SSL وIKEv2 ووصول الثقة الصفرية مع Duo. معيار الشركات لفرض التحكم الأمني على الأجهزة بعد الاتصال.",
      en: "Cisco's unified client for AnyConnect SSL/IKEv2 VPNs plus Zero Trust posture with Duo. The corporate standard enforcing endpoint compliance after connection."
    },
    cmd: "vpn connect vpn.corp.com",
    cmdDesc: { ar: "بدء اتصال VPN من سطر أوامر Secure Client", en: "Start a VPN connection from the Secure Client CLI" },
    tags: ["anyconnect", "cisco", "ssl-vpn", "enterprise"]
  },
  {
    id: "t335",
    name: "FortiClient VPN",
    url: "https://www.fortinet.com/products/endpoint-security/forticlient",
    category: "vpn",
    platform: ["cross"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "عميل Fortinet للاتصال بخوادم IPsec وSSL مع تفعيل VPN مجاني للاستخدام الشخصي. النسخة الكاملة تضيف حماية نقطة النهاية وفحوص الامتثال.",
      en: "Fortinet's client connecting to IPsec and SSL VPN concentrators, with a free VPN-only build. The full edition adds endpoint protection and compliance checks."
    },
    cmd: "forticlient vpn connect",
    cmdDesc: { ar: "الاتصال بنفق FortiClient", en: "Connect through a FortiClient tunnel" },
    tags: ["forticlient", "ipsec", "fortinet", "vpn"]
  },
  {
    id: "t336",
    name: "sing-box",
    url: "https://sing-box.sagernet.org",
    category: "vpn",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة وكالة عالمية موحّدة تدعم بروتوكولات متعددة مثل Shadowsocks وVMess وHysteria2. ملف JSON واحد يعرّف الوارد والصادر وقواعد التوجيه الدقيقة.",
      en: "A universal proxy platform supporting many protocols such as Shadowsocks, VMess, and Hysteria2. A single JSON file defines inbounds, outbounds, and fine-grained routing rules."
    },
    cmd: "sing-box run -c config.json",
    cmdDesc: { ar: "تشغيل sing-box بملف إعدادات", en: "Run sing-box with a configuration file" },
    tags: ["singbox", "proxy", "hysteria", "routing"]
  },
  {
    id: "t337",
    name: "Xray-core",
    url: "https://github.com/XTLS/Xray-core",
    category: "vpn",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تفرّع متطور من V2Ray يدعم بروتوكولي VLESS وREALITY لتجاوز الرقابة المتقدمة. يُدار بملف JSON واحد وتصل إليه ميزات البروتوكولات الجديدة بسرعة.",
      en: "An advanced V2Ray fork supporting VLESS and REALITY to defeat sophisticated censorship. One JSON config drives a node, and new protocol features land quickly."
    },
    cmd: "xray run -c config.json",
    cmdDesc: { ar: "تشغيل Xray بملف تهيئة", en: "Run Xray with a config file" },
    tags: ["xray", "vless", "reality", "proxy"]
  },
  {
    id: "t338",
    name: "OpenConnect",
    url: "https://www.infradead.org/openconnect/",
    category: "vpn",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عميل مفتوح المصدر يتعامل مع بروتوكولات Cisco AnyConnect وPulse وGlobalProtect. يمنح مستخدمي لينكس عميلًا واحدًا يغطي معايير VPN المؤسسية دون تراخيص.",
      en: "An open-source client understanding Cisco AnyConnect, Pulse, and GlobalProtect protocols. It gives Linux users one client covering corporate VPN standards without licences."
    },
    cmd: "openconnect vpn.corp.com",
    cmdDesc: { ar: "الاتصال ببوابة AnyConnect عبر OpenConnect", en: "Connect to an AnyConnect gateway with OpenConnect" },
    tags: ["openconnect", "anyconnect", "vpn", "linux"]
  },
  {
    id: "t339",
    name: "Headscale",
    url: "https://github.com/juanfont/headscale",
    category: "vpn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم تحكم ذاتي الإدارة بديل عن Tailscale يدير شبكة WireGuard تنسجية خاصة بك. يحافظ على تجربة العميل الرسمي مع سيادة كاملة على بيانات التنسيق.",
      en: "A self-hosted control server replacing Tailscale's, managing your own WireGuard mesh. It keeps the official client experience while you own all coordination data."
    },
    cmd: "headscale user list",
    cmdDesc: { ar: "سرد مستخدمي شبكة Headscale", en: "List users on a Headscale network" },
    tags: ["headscale", "tailscale", "wireguard", "selfhosted"]
  },
  {
    id: "t340",
    name: "Netmaker",
    url: "https://www.netmaker.io",
    category: "vpn",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة تربط المواقع والأجهزة بشبكة WireGuard تنسجية مع بوابات خروج وتوجيه بين الشبكات. تُستخدم كبديل SD-WAN مفتوح المصدر للمكاتب الموزعة.",
      en: "A platform linking sites and devices into a WireGuard mesh with egress gateways and subnet routing. Used as an open-source SD-WAN alternative for distributed offices."
    },
    cmd: "netclient join -t <token>",
    cmdDesc: { ar: "إلحاق جهاز بشبكة Netmaker عبر رمز الانضمام", en: "Join a machine to a Netmaker network using a token" },
    tags: ["netmaker", "wireguard", "mesh", "sd-wan"]
  },

  // ── DNS / أدوات DNS ───────────────────────────────────────────────────
  {
    id: "t341",
    name: "dig",
    url: "https://www.isc.org/bind/",
    category: "dns",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة استعلام DNS الأكثر ثقة من ISC تشرح كل جزء من الترويسة والإجابة بعمق كامل. صيغة مخرجاتها أصبحت المرجع الذي نسختها أدوات الويب المشابهة.",
      en: "ISC's trusted DNS lookup tool that dissects header and answer sections in full detail. Its output format became the reference copied by web-based lookups."
    },
    cmd: "dig +short example.com A",
    cmdDesc: { ar: "استعلام موجز عن سجل A", en: "A concise A-record query" },
    tags: ["dig", "dns", "bind", "cli"]
  },
  {
    id: "t342",
    name: "nslookup",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup",
    category: "dns",
    platform: ["cross"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة الاستعلام المدمجة في ويندوز ولينكس وماك منذ عقود لحل الأسماء يدويًا. تسمح بتحديد خادم الاستعلام مباشرةً وفحص أنواع السجلات كافة.",
      en: "The DNS query utility built into Windows, Linux, and macOS for decades. It lets you point at a specific server and probe any record type."
    },
    cmd: "nslookup -type=MX example.com 8.8.8.8",
    cmdDesc: { ar: "الاستعلام عن سجلات البريد عبر 8.8.8.8", en: "Query mail records against 8.8.8.8" },
    tags: ["nslookup", "dns", "windows", "query"]
  },
  {
    id: "t343",
    name: "host",
    url: "https://www.isc.org/bind/",
    category: "dns",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة استعلام خفيفة من حزمة BIND تخرج الإجابات بأسطر مختصرة مفيدة للسكربتات. وضعها التفاعلي يسهّل التنقل بين الخوادم وأنواع السجلات.",
      en: "BIND's lightweight lookup utility printing terse, script-friendly answers. Its interactive mode eases hopping between servers and record types."
    },
    cmd: "host -t CNAME www.example.com",
    cmdDesc: { ar: "فحص الاسم المستعار CNAME", en: "Check the CNAME alias" },
    tags: ["host", "dns", "bind", "lookup"]
  },
  {
    id: "t344",
    name: "BIND 9",
    url: "https://www.isc.org/bind/",
    category: "dns",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خادم DNS الأكثر نشرًا عالميًا من ISC ويشغّل جزءًا كبيرًا من بنية جذور الإنترنت. أدواته المرفقة مثل named-checkzone تجعل فحص المناطق خطوة روتينية قبل التحميل.",
      en: "ISC's DNS server powering a large share of the internet's root infrastructure. Bundled validators like named-checkzone make zone checking routine before loading."
    },
    cmd: "named-checkzone example.com db.example.com",
    cmdDesc: { ar: "التحقق من سلامة ملف منطقة قبل التحميل", en: "Validate a zone file before loading it" },
    tags: ["bind", "dns", "server", "zones"]
  },
  {
    id: "t345",
    name: "PowerDNS",
    url: "https://www.powerdns.com",
    category: "dns",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مجموعة خوادم DNS مبتكرة مع مصادر خلفية لقواعد البيانات وواجهة API REST كاملة. تُقدّم dnsdist لتوزيع الأحمال وتتكامل مع IPv6 والإتاحة العالية.",
      en: "An innovative DNS server suite with database backends and a full REST API. The bundled dnsdist handles load balancing and it integrates IPv6 with high availability."
    },
    cmd: "pdnsutil check-zone example.com",
    cmdDesc: { ar: "فحص صحة منطقة في PowerDNS", en: "Check a zone's integrity in PowerDNS" },
    tags: ["powerdns", "dns", "api", "database"]
  },
  {
    id: "t346",
    name: "Unbound",
    url: "https://www.nlnetlabs.nl/projects/unbound/about/",
    category: "dns",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محلّل DNS استرجاعي صارم التحقق يفرض DNSSEC من الجذر ويدعم التخزين المؤقت الذكي. يشغّل طبقة الحل المحلية على ملايين الأجهزة والموجّهات المنزلية.",
      en: "A validating, recursive DNS resolver enforcing DNSSEC from the root with smart caching. It serves as the local resolving layer on millions of devices."
    },
    cmd: "unbound-control status",
    cmdDesc: { ar: "عرض حالة المحلّل والإحصاءات", en: "Show resolver status and statistics" },
    tags: ["unbound", "dnssec", "resolver", "cache"]
  },
  {
    id: "t347",
    name: "dnsmasq",
    url: "https://thekelleys.org.uk/dnsmasq/doc.html",
    category: "dns",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "خادم DNS وDHCP مصغّر يجمع الخدمتين في عملية واحدة بموارد ضئيلة. الخيار الافتراضي في الموجّهات المنزلية والأساس الذي بُني عليه Pi-hole.",
      en: "A tiny combined DNS and DHCP server running both services in one lightweight process. It is the default on home routers and the base of Pi-hole."
    },
    cmd: "dnsmasq --test",
    cmdDesc: { ar: "التحقق من صحة ملف الإعدادات", en: "Validate the configuration file" },
    tags: ["dnsmasq", "dhcp", "dns", "router"]
  },
  {
    id: "t348",
    name: "Knot DNS",
    url: "https://www.knot-dns.cz",
    category: "dns",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خادم DNS استبدادي عالي الأداء من CZ.NIC يخدم ملايين الاستعلامات في الثانية. أدواته مثل knotc تدير المناطق حيًّا دون إعادة تشغيل الخادم.",
      en: "CZ.NIC's high-performance authoritative DNS server serving millions of queries per second. Tools like knotc manage zones live without restarts."
    },
    cmd: "knotc zone-status example.com",
    cmdDesc: { ar: "عرض حالة منطقة على خادم Knot", en: "Show a zone's status on a Knot server" },
    tags: ["knot", "authoritative", "dns", "performance"]
  },
  {
    id: "t349",
    name: "dnsdist",
    url: "https://www.dnsdist.org",
    category: "dns",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "موزّع أحمال DNS ذكي يوجّه الاستعلامات إلى أفضل خادم خلفي بحسب صحته. يقدّم حماية من فيضان الاستعلامات مع مقاييس لحظية دقيقة.",
      en: "A smart DNS load balancer steering queries to the healthiest backend. It adds query-flood protection with live, granular metrics."
    },
    cmd: "dnsdist --check-config",
    cmdDesc: { ar: "التحقق من إعدادات التوزيع", en: "Validate the dnsdist configuration" },
    tags: ["dnsdist", "load-balancer", "dns", "protection"]
  },
  {
    id: "t350",
    name: "dnstop",
    url: "http://dnstop.measurement-factory.com/",
    category: "dns",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة طرفية تعرض استعلامات DNS الحية على واجهة الشبكة مفصّلة حسب النوع والمصدر. تكشف فورًا من يستعلم وماذا يستعلم على شبكتك.",
      en: "A terminal tool showing live DNS queries on an interface, broken down by type and source. It instantly reveals who queries what on your network."
    },
    cmd: "sudo dnstop -l 3 eth0",
    cmdDesc: { ar: "مراقبة استعلامات DNS الحية على eth0", en: "Watch live DNS queries on eth0" },
    tags: ["dnstop", "monitoring", "dns", "pcap"]
  },
  {
    id: "t351",
    name: "dnsenum",
    url: "https://github.com/fwaeytens/dnsenum",
    category: "dns",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة استطلاع DNS تجمع السجلات وتجرب نقل المناطق والتخمين العكسي لجرد المضيفين. تُستخدم في مرحلة الاستطلاع من اختبارات الاختراق.",
      en: "A DNS enumeration tool gathering records, trying zone transfers, and reverse-lookups to inventory hosts. Used during the recon phase of penetration tests."
    },
    cmd: "dnsenum example.com",
    cmdDesc: { ar: "جمع معلومات DNS الكاملة لمجال", en: "Collect full DNS information for a domain" },
    tags: ["dnsenum", "enumeration", "recon", "pentest"]
  },
  {
    id: "t352",
    name: "dnsrecon",
    url: "https://github.com/darkoperator/dnsrecon",
    category: "dns",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار استطلاع DNS بلغة بايثون يدعم فحص SRV والمناطق العكسية والتخمين بالقواميس. مخرجاته قابلة للتصدير إلى ملفات CSV مباشرة.",
      en: "A Python DNS recon framework covering SRV scans, reverse zones, and dictionary-based subdomain guessing. Results export straight to CSV."
    },
    cmd: "dnsrecon -d example.com -t std",
    cmdDesc: { ar: "مسح قياسي لجميع أنواع السجلات", en: "Run a standard sweep of all record types" },
    tags: ["dnsrecon", "enumeration", "python", "recon"]
  },
  {
    id: "t353",
    name: "fierce",
    url: "https://github.com/mschwager/fierce",
    category: "dns",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة استطلاع DNS شبه قاموسية تكتشف المضيفات عبر نقل المناطق وتخمين الأسماء المتقاربة. تحدد ما إذا كانت خوادم الأسماء تسمح بنقل المنطقة AXFR.",
      en: "A semi-dictionary DNS recon tool locating hosts via zone transfers and near-name guessing. It determines whether nameservers permit AXFR transfers."
    },
    cmd: "fierce --domain example.com",
    cmdDesc: { ar: "استطلاع نطاق بحثًا عن مضيفات وسوء تهيئة", en: "Recon a domain for hosts and misconfigurations" },
    tags: ["fierce", "dns", "recon", "axfr"]
  },
  {
    id: "t354",
    name: "dnscheck.tools",
    url: "https://dnscheck.tools",
    category: "dns",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "موقع يفحص حل اسمك من عدة محلّلات موزعة حول العالم ويقارن النتائج. يكشف فورًا مشكلات الانتشار وتحديث السجلات بعد التغييرات.",
      en: "A site resolving your name from multiple resolvers worldwide and comparing answers. It instantly exposes propagation and record-update issues after changes."
    },
    cmd: "example.com",
    cmdDesc: { ar: "نمط إدخال اسم للفحص عبر محلّلات متعددة", en: "A domain to check across multiple resolvers" },
    tags: ["dnscheck", "propagation", "resolver", "web"]
  },
  {
    id: "t355",
    name: "intoDNS",
    url: "https://intodns.com",
    category: "dns",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "خدمة تشخّص إعدادات DNS للنطاق من خوادم الأسماء حتى سجلات البريد. تُبرز مشكلات TTL وSOA وخلل خوادم المنطقة الثانوية.",
      en: "A service auditing a domain's DNS health from nameservers to mail records. It flags TTL, SOA, and failed secondary issues."
    },
    cmd: "example.com",
    cmdDesc: { ar: "اسم النطاق للتحقق الشامل", en: "The domain to audit" },
    tags: ["intodns", "audit", "health", "web"]
  },
  {
    id: "t356",
    name: "DNSViz",
    url: "https://dnsviz.net",
    category: "dns",
    platform: ["web", "linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة تحلّل سلسلة DNSSEC كاملة وتعرض سلسلة الثقة في رسم تفاعلي. تُبرز فورًا أي توقيع مكسور أو خلل في التفويض.",
      en: "A tool analysing the full DNSSEC chain and rendering the trust chain as an interactive graph. Broken signatures or delegation failures stand out instantly."
    },
    cmd: "dnsviz probe example.com",
    cmdDesc: { ar: "فحص سلسلة DNSSEC للنطاق", en: "Probe the DNSSEC chain of a domain" },
    tags: ["dnsviz", "dnssec", "analysis", "visualization"]
  },
  {
    id: "t357",
    name: "MXToolbox",
    url: "https://mxtoolbox.com",
    category: "dns",
    platform: ["web"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "حزمة أدوات DNS وصحة البريد الشهيرة تتفقد القوائم السوداء وSPF وDKIM وDMARC. صيغ استعلامها مثل mx: تُسرّع الفحوص اليومية.",
      en: "The popular DNS and email-health toolkit checking blacklists, SPF, DKIM, and DMARC. Its lookup syntax like mx: speeds daily checks."
    },
    cmd: "mx:example.com",
    cmdDesc: { ar: "فحص سجلات MX عبر MXToolbox", en: "Check MX records through MXToolbox" },
    tags: ["mxtoolbox", "blacklist", "spf", "email"]
  },
  {
    id: "t358",
    name: "dog",
    url: "https://github.com/ogham/dog",
    category: "dns",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "بديل حديث لـ dig بلغة Rust بألوان جميلة ومخرجات مقروءة افتراضيًا. يحافظ على خبرتك السابقة بأعلام متوافقة مع dig.",
      en: "A modern Rust rewrite of dig with pretty colours and readable output by default. It preserves your muscle memory with dig-compatible flags."
    },
    cmd: "dog example.com MX",
    cmdDesc: { ar: "استعلام عن سجلات البريد بأداة dog", en: "Query mail records with dog" },
    tags: ["dog", "dns", "rust", "cli"]
  },
  {
    id: "t359",
    name: "q",
    url: "https://github.com/natesales/q",
    category: "dns",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة استعلام DNS مبسطة بلغة Go تكتب الأمر كما تتكلم بلا أعلام معقدة. تدعم مخرجات JSON وملفات تهيئة لتسهيل الأتمتة.",
      en: "A simplified Go-based DNS tool where you type the query as you speak it, minus cryptic flags. JSON output and config files ease automation."
    },
    cmd: "q example.com A @1.1.1.1",
    cmdDesc: { ar: "استعلام سريع عن سجل A عبر 1.1.1.1", en: "A quick A-record query via 1.1.1.1" },
    tags: ["q", "dns", "golang", "json"]
  },
  {
    id: "t360",
    name: "dsc (DNS Statistics Collector)",
    url: "https://github.com/DNS-OARC/dsc",
    category: "dns",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة من DNS-OARC تجمع إحصاءات استعلامات DNS وترميزاتها وتدفعها للتحليل. تُستخدم في عمليات تشغيل خوادم الجذور الكبرى لرصد التشوهات.",
      en: "DNS-OARC's statistics collector classifying DNS queries and responses and shipping them for analysis. It runs at major root-server operations to spot anomalies."
    },
    cmd: "dsc -c /etc/dsc/dsc.conf",
    cmdDesc: { ar: "تشغيل جامع الإحصاءات بملف الإعدادات", en: "Start the collector with its config file" },
    tags: ["dsc", "statistics", "dns-oarc", "monitoring"]
  },

  // ── Automation / الأتمتة والبنية ككود ─────────────────────────────────
  {
    id: "t361",
    name: "Ansible",
    url: "https://www.ansible.com",
    category: "automation",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محرك الأتمتة الأشهر بلا وكلاء يعمل عبر SSH ويُعرّف المهام بملفات YAML. مئات الوحدات الجاهزة تغطي موجّهات Cisco وJuniper وجدران الحماية دون كود معقد.",
      en: "The most popular agentless automation engine, working over SSH with tasks defined in YAML. Hundreds of modules cover Cisco, Juniper, and firewalls without complex code."
    },
    cmd: "ansible-playbook site.yml --check",
    cmdDesc: { ar: "تنفيذ تجريبي دون تطبيق تغييرات", en: "Run a dry-run without applying changes" },
    tags: ["ansible", "yaml", "ssh", "agentless"]
  },
  {
    id: "t362",
    name: "Netmiko",
    url: "https://github.com/ktbyers/netmiko",
    category: "automation",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "مكتبة بايثون من Kirk Byers توحّد الاتصال CLI مع أكثر من 40 نظام تشغيل شبكات. تبسّط إرسال الأوامر وجمع المخرجات في أتمتة الشبكات اليومية.",
      en: "Kirk Byers' Python library unifying CLI access to 40+ network operating systems. It simplifies sending commands and collecting output in daily automation."
    },
    cmd: "pip install netmiko",
    cmdDesc: { ar: "تثبيت مكتبة Netmiko", en: "Install the Netmiko library" },
    tags: ["netmiko", "python", "ssh", "cisco"]
  },
  {
    id: "t363",
    name: "NAPALM",
    url: "https://napalm.readthedocs.io",
    category: "automation",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة تجريدية توحّد قراءة وضبط التهيئة عبر واجهات CLI متعددة البائعين. دوال مثل get_facts ودمج التهيئة تجعل مقارنة الحالات بين الأنظمة سهلة.",
      en: "An abstraction library unifying config get/merge across vendor CLIs. Its get_facts and merge candidates make cross-vendor state comparison trivial."
    },
    cmd: "napalm -v cisco_ios -u admin 192.168.1.10 call get_facts",
    cmdDesc: { ar: "جمع بيانات الجهاز عبر NAPALM", en: "Collect device facts via NAPALM" },
    tags: ["napalm", "automation", "multivendor", "python"]
  },
  {
    id: "t364",
    name: "Nornir",
    url: "https://nornir.readthedocs.io",
    category: "automation",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار أتمتة بايثون يعتمد المخزون البسيط والمهام المكتوبة يدويًا بدل YAML وحده. يُحترم لمرونته لأن الكود هو مصدر الحقيقة في تصميمه.",
      en: "A Python-first automation framework built on plain inventory and hand-written tasks rather than YAML alone. Respected for its flexibility where code is the source of truth."
    },
    cmd: "pip install nornir",
    cmdDesc: { ar: "تثبيت إطار Nornir", en: "Install the Nornir framework" },
    tags: ["nornir", "python", "automation", "inventory"]
  },
  {
    id: "t365",
    name: "Paramiko",
    url: "https://www.paramiko.org",
    category: "automation",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "مكتبة SSH الأصلية لبايثون التي بُنيت فوقها Netmiko وFabric. تمنحك تحكمًا مباشرًا في القنوات وجلسات التنفيذ وأنفاق SFTP.",
      en: "The native Python SSH library beneath Netmiko and Fabric. It gives direct control over channels, exec sessions, and SFTP tunnels."
    },
    cmd: "pip install paramiko",
    cmdDesc: { ar: "تثبيت مكتبة Paramiko", en: "Install the Paramiko library" },
    tags: ["paramiko", "ssh", "python", "sftp"]
  },
  {
    id: "t366",
    name: "Fabric",
    url: "https://www.fabfile.org",
    category: "automation",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "مكتبة لتنفيذ الأوامر البعيدة عبر SSH مع مشغّل مهام من سطر الأوامر. تبني نشر التطبيقات وترحيل إعدادات الشبكة من سكربتات قصيرة.",
      en: "A library for running remote commands over SSH with a task-runner CLI. It builds app deployments and network migrations out of short scripts."
    },
    cmd: "fab deploy",
    cmdDesc: { ar: "تنفيذ مهمة النشر المعرفة في fabfile", en: "Run the deploy task defined in the fabfile" },
    tags: ["fabric", "ssh", "python", "deployment"]
  },
  {
    id: "t367",
    name: "Cisco pyATS",
    url: "https://developer.cisco.com/pyats/",
    category: "automation",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار اختبار Cisco مفتوح المصدر يُستخدم داخليًا لتأهيل منتجاتها الشبكية. يجمع بين نمذجة التهيئة والتحقق الحي من الحالة بعد كل تغيير.",
      en: "Cisco's open-source testing framework used internally to qualify their own products. It blends config modelling with post-change live verification."
    },
    cmd: "pyats run job network_test.py",
    cmdDesc: { ar: "تشغيل مهمة اختبار آلية", en: "Run an automated test job" },
    tags: ["pyats", "testing", "cisco", "validation"]
  },
  {
    id: "t368",
    name: "Salt",
    url: "https://saltproject.io",
    category: "automation",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة تنفيذ بعيد فائقة السرعة بنظام النشر والاشتراك تُدير آلاف الأجهزة لحظة واحدة. نظام وحداتها النظيف يناسب تشغيل الشبكات كما يناسب الخوادم.",
      en: "A blazing-fast remote execution platform built on pub/sub, commanding thousands of minions at once. Its clean module system suits network ops as well as servers."
    },
    cmd: "salt '*' test.ping",
    cmdDesc: { ar: "اختبار الاتصال بجميع العقد المُدارة", en: "Ping every managed minion at once" },
    tags: ["salt", "automation", "pubsub", "configuration"]
  },
  {
    id: "t369",
    name: "Puppet",
    url: "https://www.puppet.com",
    category: "automation",
    platform: ["cross"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "أداة إدارة تهيئة تعريفية بلغة مخصوصة تصف حالة النظام المطلوبة وتصحح الفروق تلقائيًا. قاعدة بيانات مواردها تصلح كتقرير حي للبنية التحتية.",
      en: "A declarative configuration management tool whose DSL describes desired state and auto-corrects drift. Its resource database doubles as a live infrastructure report."
    },
    cmd: "puppet agent --test",
    cmdDesc: { ar: "تطبيق الكتالوج على العقدة وفحص الفروق", en: "Apply the catalog to a node and report drift" },
    tags: ["puppet", "configuration", "dsl", "agent"]
  },
  {
    id: "t370",
    name: "Chef",
    url: "https://www.chef.io",
    category: "automation",
    platform: ["cross"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة إدارة تهيئة مبنية على Ruby تُعرّف البنية كوصفات تركيب متسلسلة. أدوات knife وخادم Chef Infra يديران آلاف العقد بمعايير مؤسسية.",
      en: "A Ruby-driven configuration platform defining infrastructure as ordered recipes. Knife and the Infra Server manage thousands of nodes to enterprise standards."
    },
    cmd: "knife node list",
    cmdDesc: { ar: "سرد العقد المسجلة في خادم Chef", en: "List nodes registered with the Chef server" },
    tags: ["chef", "ruby", "recipes", "infrastructure"]
  },
  {
    id: "t371",
    name: "Terraform",
    url: "https://www.terraform.io",
    category: "automation",
    platform: ["cross"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "أداة HashiCorp للبنية ككود تصف الموارد بلغة HCL وتدير دورة حياتها بالكامل. تنشئ VPC وقواعد الجدار الناري وجداول التوجيه من ملف واحد قابل للإصدار.",
      en: "HashiCorp's infrastructure-as-code tool describing resources in HCL and managing their lifecycle. It builds VPCs, firewall rules, and route tables from one versioned file."
    },
    cmd: "terraform plan",
    cmdDesc: { ar: "معاينة التغييرات قبل تطبيقها", en: "Preview changes before applying them" },
    tags: ["terraform", "iac", "hcl", "cloud"]
  },
  {
    id: "t372",
    name: "Pulumi",
    url: "https://www.pulumi.com",
    category: "automation",
    platform: ["cross"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "إطار بنية ككود بلغات برمجة عامة مثل TypeScript وPython وGo. يوفر حلقات ومنطقًا حقيقيًا داخل تعريف بنيتك السحابية.",
      en: "An IaC framework using general-purpose languages like TypeScript, Python, and Go. Real loops and logic live inside your cloud infrastructure definitions."
    },
    cmd: "pulumi up",
    cmdDesc: { ar: "نشر أو تحديث المكدس السحابي", en: "Deploy or update the cloud stack" },
    tags: ["pulumi", "iac", "typescript", "cloud"]
  },
  {
    id: "t373",
    name: "OpenTofu",
    url: "https://opentofu.org",
    category: "automation",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خليفة Terraform المجتمعي بعد تغيير ترخيص HashiCorp برعاية مؤسسة Linux. متوافق مع الوحدات والإعدادات الحالية ويجدد مسار التطوير المفتوح.",
      en: "The community-driven Terraform successor under the Linux Foundation after HashiCorp's licence change. It stays compatible with existing modules while renewing open development."
    },
    cmd: "tofu plan",
    cmdDesc: { ar: "معاينة التغييرات بمحرك OpenTofu", en: "Preview changes with the OpenTofu engine" },
    tags: ["opentofu", "iac", "terraform", "opensource"]
  },
  {
    id: "t374",
    name: "NetBox",
    url: "https://netbox.dev",
    category: "automation",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام مصدر الحقيقة الأشهر للبنية التحتية يوثّق العناوين والوصلات والأجهزة والكابلات. واجهته البرمجية القوية تجعله مركز كل مشاريع أتمتة الشبكات.",
      en: "The beloved source-of-truth IPAM/DCIM system documenting addresses, racks, cables, and devices. Its strong API makes it the anchor of every network automation project."
    },
    cmd: "python3 manage.py check",
    cmdDesc: { ar: "التحقق من صحة تهيئة NetBox قبل التشغيل", en: "Validate the NetBox setup before serving" },
    tags: ["netbox", "ipam", "dcim", "source-of-truth"]
  },
  {
    id: "t375",
    name: "Nautobot",
    url: "https://www.nautobot.com",
    category: "automation",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تفرّع من NetBox بواجهة GraphQL مدمجة ومنظومة إضافات رسمية واسعة. يركّز على دوره كمصدر حقيقة للأتمتة أكثر من كونه مجرد نظام جرد.",
      en: "A NetBox descendant with built-in GraphQL and a rich plugin ecosystem. It emphasises the automation source-of-truth role beyond plain inventory."
    },
    cmd: "nautobot-server post_upgrade",
    cmdDesc: { ar: "تنفيذ مهام ما بعد الترقية من الترحيل إلى التخزين المؤقت", en: "Run post-upgrade tasks from migrations to caching" },
    tags: ["nautobot", "ipam", "graphql", "plugins"]
  },
  {
    id: "t376",
    name: "Oxidized",
    url: "https://github.com/ytti/oxidized",
    category: "automation",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة نسخ احتياطي لتهيئات أكثر من 100 بائع مع تتبّع الفروق عبر Git. تلتقط كل تعديل وفق جدول زمني وتُظهر التغييرات لحظة حدوثها.",
      en: "A config backup daemon covering 100+ vendors with Git-backed change tracking. It captures every revision on schedule and diffs changes as they happen."
    },
    cmd: "oxidized",
    cmdDesc: { ar: "تشغيل خدمة نسخ التهيئات الاحتياطي", en: "Start the config backup service" },
    tags: ["oxidized", "backup", "git", "config"]
  },
  {
    id: "t377",
    name: "rConfig",
    url: "https://www.rconfig.com",
    category: "automation",
    platform: ["linux"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة إدارة تهيئات ونسخ احتياطي للشبكات بواجهة حديثة ومراقبة للتغييرات. النسخة السادسة أُعيدت هيكلتها على Laravel مع جدولة مهام محسّنة.",
      en: "A network config management and backup platform with a modern UI and change monitoring. Version 6 was rearchitected on Laravel with improved task scheduling."
    },
    cmd: "php artisan rconfig:backup",
    cmdDesc: { ar: "تشغيل نسخة احتياطية يدوية للتهيئات", en: "Trigger a manual config backup run" },
    tags: ["rconfig", "backup", "configuration", "php"]
  },
  {
    id: "t378",
    name: "Cisco NSO",
    url: "https://developer.cisco.com/docs/nso/",
    category: "automation",
    platform: ["linux"],
    license: "paid",
    difficulty: 5,
    desc: {
      ar: "منصة تنسيق الخدمات من Cisco مبنية على نماذج YANG وحزم خدمات قابلة لإعادة الاستخدام. قلب مشاريع الأتمتة المؤسسية التي تدير ملايين الأجهزة.",
      en: "Cisco's service orchestration platform built on YANG models and reusable service packages. The heart of enterprise automation programs managing millions of devices."
    },
    cmd: "ncs_cli -u admin -C",
    cmdDesc: { ar: "الدخول إلى واجهة NSO التفاعلية", en: "Enter the NSO interactive CLI" },
    tags: ["nso", "yang", "orchestrator", "cisco"]
  },
  {
    id: "t379",
    name: "Juniper PyEZ",
    url: "https://github.com/Juniper/py-junos-eznc",
    category: "automation",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة Juniper الرسمية لبايثون تتعامل مع Junos عبر NETCONF وواجهة الجداول. تبسّط جمع الوقائع وتحميل التهيئة المدمجة أو الاستبدالية.",
      en: "Juniper's official Python library driving Junos through NETCONF and table views. It simplifies fact gathering plus merge/replace config loading."
    },
    cmd: "pip install junos-eznc",
    cmdDesc: { ar: "تثبيت مكتبة PyEZ", en: "Install the PyEZ library" },
    tags: ["pyez", "juniper", "netconf", "python"]
  },
  {
    id: "t380",
    name: "gNMIc",
    url: "https://gnmic.openconfig.net",
    category: "automation",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "عميل gNMI من OpenConfig يشترك في تدفقات القياس الحية من الأجهزة الداعمة لـ gNMI. أوامر capabilities وget وsubscribe تغطي أتمتة معيارية حديثة كاملة.",
      en: "OpenConfig's gNMI client subscribing to live telemetry from gNMI-capable devices. Capabilities, get, and subscribe commands cover modern standards-based automation."
    },
    cmd: "gnmic capabilities -a 192.168.1.10:57400 --insecure",
    cmdDesc: { ar: "استكشاف قدرات gNMI على الجهاز", en: "Discover the device's gNMI capabilities" },
    tags: ["gnmi", "gnmic", "telemetry", "openconfig"]
  },

  // ── Crypto / الشهادات والتشفير ────────────────────────────────────────
  {
    id: "t381",
    name: "OpenSSL",
    url: "https://www.openssl.org",
    category: "crypto",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة التشفير الأشهر عالميًا التي تؤمّن معظم خوادم الويب مع أدوات سطر أوامر openssl. توليد المفاتيح وطلبات الشهادات وفحصها كلها من أداة واحدة.",
      en: "The world's dominant crypto library securing most web servers, fronted by the openssl CLI. Key generation, CSRs, and certificate inspection all live in one toolkit."
    },
    cmd: "openssl x509 -in cert.pem -text -noout",
    cmdDesc: { ar: "عرض تفاصيل شهادة كاملة في نص مقروء", en: "Full certificate details in readable text" },
    tags: ["openssl", "tls", "certificates", "cli"]
  },
  {
    id: "t382",
    name: "GnuTLS",
    url: "https://www.gnutls.org",
    category: "crypto",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "بديل مفتوح المصدر لـ OpenSSL بترخيص LGPL مرن للمشاريع التجارية. أداة gnutls-cli تختبر مصافحة TLS مع أي خادم بسهولة من الطرفية.",
      en: "An open-source TLS stack licensed under LGPL for flexible commercial use. Its gnutls-cli tool easily tests TLS handshakes against any server."
    },
    cmd: "gnutls-cli example.com -p 443",
    cmdDesc: { ar: "فتح اتصال TLS يدوي إلى خادم", en: "Open a manual TLS connection to a server" },
    tags: ["gnutls", "tls", "handshake", "cli"]
  },
  {
    id: "t383",
    name: "GnuPG",
    url: "https://gnupg.org",
    category: "crypto",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "تطبيق OpenPGP القياسي لتشفير الملفات والبريد وتبادل المفاتيح عبر خوادم المفاتيح. شبكة الثقة اللامركزية تجعله أداة التحقق من الهوية في المصادر المفتوحة.",
      en: "The canonical OpenPGP implementation for encrypting files and mail and exchanging keys via key servers. Its web-of-trust model anchors identity verification in open source."
    },
    cmd: "gpg --encrypt -r alice@corp.com report.txt",
    cmdDesc: { ar: "تشفير ملف لمستفيد محدد", en: "Encrypt a file for a specific recipient" },
    tags: ["gnupg", "pgp", "encryption", "keys"]
  },
  {
    id: "t384",
    name: "keytool",
    url: "https://docs.oracle.com/en/java/javase/21/tools/keytool.html",
    category: "crypto",
    platform: ["cross"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة إدارة مخازن مفاتيح Java المدمجة في JDK لإنشاء طلبات CSR واستيراد الشهادات. أساسية لتشغيل خدمات TLS على خوادم Tomcat وKafka.",
      en: "The JDK-bundled key manager for Java keystores, generating CSRs and importing certificates. Essential for running TLS on Tomcat, Kafka, and Java services."
    },
    cmd: "keytool -list -v -keystore keystore.jks",
    cmdDesc: { ar: "عرض تفاصيل مخزن المفاتيح", en: "Display the keystore's full contents" },
    tags: ["keytool", "java", "keystore", "jks"]
  },
  {
    id: "t385",
    name: "Certbot",
    url: "https://certbot.eff.org",
    category: "crypto",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عميل ACME من EFF يجلب شهادات Let's Encrypt مجانًا ويجددها تلقائيًا. فتح باب HTTPS للجميع بأمر واحد مهما كان خادم الويب لديك.",
      en: "EFF's ACME client fetching free Let's Encrypt certificates and renewing them automatically. It opened HTTPS to everyone with single-command setups on any web server."
    },
    cmd: "sudo certbot --nginx -d example.com",
    cmdDesc: { ar: "إصدار شهادة وتهيئة HTTPS لخادم nginx", en: "Issue a certificate and configure HTTPS on nginx" },
    tags: ["certbot", "acme", "letsencrypt", "https"]
  },
  {
    id: "t386",
    name: "mkcert",
    url: "https://github.com/FiloSottile/mkcert",
    category: "crypto",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة توليد شهادات موثوقة محليًا للتطوير تثبّت مرجع تصديق خاصًا في نظامك فتختفي تحذيرات المتصفح. تنهي معاناة الشهادات ذاتية التوقيع في بيئات الاختبار.",
      en: "A local-trusted certificate generator that installs its own CA on your system, silencing browser warnings. It ends self-signed certificate pain in dev environments."
    },
    cmd: "mkcert example.com localhost 127.0.0.1",
    cmdDesc: { ar: "إصدار شهادة تطوير موثوقة محليًا", en: "Issue a certificate trusted locally" },
    tags: ["mkcert", "development", "https", "ca"]
  },
  {
    id: "t387",
    name: "cfssl",
    url: "https://github.com/cloudflare/cfssl",
    category: "crypto",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مجموعة أدوات PKI من Cloudflare تبني مراجع تصديق وتصدر شهادات مدفوعة بملفات JSON. المشروع الذي يشغّل بنية TLS لدى Cloudflare على مستوى ضخم.",
      en: "Cloudflare's PKI toolkit for building certificate authorities and issuing JSON-driven certs. It powers Cloudflare's own TLS infrastructure at massive scale."
    },
    cmd: "cfssl gencert -initca ca-csr.json | cfssljson -bare ca",
    cmdDesc: { ar: "إنشاء مرجع تصديق جديد", en: "Bootstrap a new certificate authority" },
    tags: ["cfssl", "pki", "cloudflare", "json"]
  },
  {
    id: "t388",
    name: "sslscan",
    url: "https://github.com/rbsec/sslscan",
    category: "crypto",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "ماسح سريع لخدمة TLS يرصد البروتوكولات والشفرات المدعومة ونقاط الضعف المعروفة. مخرجاته الملوّنة تُبرز الإعدادات الضعيفة فورًا.",
      en: "A fast TLS service scanner enumerating supported protocols, ciphers, and known weaknesses. Its colour-coded output highlights weak configurations instantly."
    },
    cmd: "sslscan example.com:443",
    cmdDesc: { ar: "فحص إعدادات TLS لخادم", en: "Scan a server's TLS configuration" },
    tags: ["sslscan", "tls", "audit", "scanner"]
  },
  {
    id: "t389",
    name: "testssl.sh",
    url: "https://testssl.sh",
    category: "crypto",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "سكربت فحص شامل لصحة TLS يغطي الشفرات والبروتوكولات والثغرات والامتثال دون أي تبعيات. مخرجاته التفصيلية تصلح كتقرير مراجعة رسمي.",
      en: "A comprehensive TLS health-check script covering ciphers, protocols, vulnerabilities, and compliance with zero dependencies. Its detailed output passes as an audit report."
    },
    cmd: "testssl.sh example.com",
    cmdDesc: { ar: "فحص شامل لإعدادات TLS", en: "Run a full TLS configuration check" },
    tags: ["testssl", "tls", "audit", "bash"]
  },
  {
    id: "t390",
    name: "SSLyze",
    url: "https://github.com/nabla-c0d3/sslyze",
    category: "crypto",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة فحص SSL/TLS بلغة Python تُخرج نتائج منظمة بصيغة XML أو JSON للتقارير. تفحص عدة خوادم بالتوازي وتواكب أحدث فحوص الامتثال.",
      en: "A Python SSL/TLS scanner emitting structured XML or JSON for reporting. It scans multiple servers in parallel and keeps pace with modern compliance checks."
    },
    cmd: "sslyze --regular example.com",
    cmdDesc: { ar: "فحص قياسي لكامل سطح TLS", en: "A regular full-surface TLS scan" },
    tags: ["sslyze", "tls", "python", "compliance"]
  },
  {
    id: "t391",
    name: "SSL Labs Test",
    url: "https://www.ssllabs.com/ssltest/",
    category: "crypto",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "خدمة Qualys الشهيرة بتقييم HTTPS من A+ إلى F مع تفصيل سلسلة الشهادات والشفرات. درجتها أصبحت المقياس السائد لجودة إعدادات TLS في مواقع الإنترنت.",
      en: "Qualys' famous HTTPS grader awarding A+ to F with chain and cipher detail. Its grade became the de facto quality bar for website TLS setups."
    },
    cmd: "https://www.ssllabs.com/ssltest/analyze?d=example.com",
    cmdDesc: { ar: "رابط فحص مباشر لنطاق", en: "A direct scan link for a domain" },
    tags: ["ssllabs", "qualys", "grading", "tls"]
  },
  {
    id: "t392",
    name: "SSLShopper SSL Checker",
    url: "https://www.sslshopper.com/ssl-checker.html",
    category: "crypto",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "موقع أدوات شهادات يتحقق من التركيب والثقة وسلسلة الشهادات الوسيطة لنطاقك. يكشف تواريخ الانتهاء والجهات المصدرة بلمسة واحدة.",
      en: "A certificate tooling site verifying installation, trust, and the intermediate chain for your domain. It surfaces expiry dates and issuers in one click."
    },
    cmd: "example.com:443",
    cmdDesc: { ar: "نمط إدخال النطاق والمنفذ للفحص", en: "The domain:port input format for a check" },
    tags: ["sslshopper", "certificates", "chain", "web"]
  },
  {
    id: "t393",
    name: "CrypTool",
    url: "https://www.cryptool.org",
    category: "crypto",
    platform: ["windows"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "منصة تعليمية ألمانية تفاعلية تشرح التشفير من شيفرة Caesar إلى المنحنيات الإهليلجية عمليًا. مخططاتها الحية تجعل الخوارزميات المجردة ملموسة.",
      en: "A German educational platform making cryptography tangible, from Caesar ciphers to elliptic curves. Its live visualisations turn abstract algorithms into something you can watch."
    },
    cmd: "CrypTool 2.exe",
    cmdDesc: { ar: "تشغيل بيئة التشفير التعليمية", en: "Launch the educational crypto workbench" },
    tags: ["cryptool", "education", "cryptography", "visualization"]
  },
  {
    id: "t394",
    name: "age",
    url: "https://github.com/FiloSottile/age",
    category: "crypto",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة تشفير ملفات حديثة بواجهة بسيطة ومفاتيح قصيرة سهلة النسخ. صُممت لتنهي تعقيد GPG في المهام اليومية للمهندسين.",
      en: "A modern file encryption tool with a simple interface and short, copy-friendly keys. Designed to end GPG complexity for everyday tasks."
    },
    cmd: "age -p secret.txt > secret.txt.age",
    cmdDesc: { ar: "تشفير ملف بعبارة مرور", en: "Encrypt a file with a passphrase" },
    tags: ["age", "encryption", "files", "modern"]
  },
  {
    id: "t395",
    name: "step CLI",
    url: "https://smallstep.com/cli/",
    category: "crypto",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أدوات Smallstep لبناء PKI داخلي وإدارة الشهادات عبر سطر أوامر صديق للأتمتة. تتكامل مع step-ca لإصدار شهادات قصيرة العمر داخليًا.",
      en: "Smallstep's all-in-one CLI for internal PKI, certificate management, and OAuth flows. It pairs with step-ca to issue short-lived certificates on your own."
    },
    cmd: "step certificate inspect cert.pem",
    cmdDesc: { ar: "فحص تفاصيل شهادة وسلسلتها", en: "Inspect a certificate's details and chain" },
    tags: ["step", "smallstep", "pki", "zero-trust"]
  },
  {
    id: "t396",
    name: "HashiCorp Vault",
    url: "https://www.vaultproject.io",
    category: "crypto",
    platform: ["cross"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة HashiCorp لإدارة الأسرار بتخزين مشفر وبيانات اعتماد ديناميكية وسجلات تدقيق كاملة. تُصدر مستخدمي قواعد بيانات ومفاتيح SSH مؤقتة تلقائيًا.",
      en: "HashiCorp's secrets platform with encrypted storage, dynamic credentials, and full audit trails. It auto-issues short-lived database users and SSH keys."
    },
    cmd: "vault kv get secret/db",
    cmdDesc: { ar: "قراءة سر من مخزن KV", en: "Read a secret from the KV store" },
    tags: ["vault", "secrets", "hashicorp", "pki"]
  },
  {
    id: "t397",
    name: "KeyStore Explorer",
    url: "https://keystore-explorer.org",
    category: "crypto",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "بديل رسومي لـ keytool يستعرض مخازن JKS وPKCS12 ويحرّر الشهادات والمفاتيح. واجهة السحب والإفلات تتكفل بأعمال PKI المتكررة.",
      en: "A GUI replacement for keytool browsing JKS/PKCS12 stores and editing keys and certificates. Drag-and-drop covers the repetitive PKI chores."
    },
    cmd: "keystore-explorer",
    cmdDesc: { ar: "تشغيل مستكشف مخازن المفاتيح", en: "Launch the keystore explorer GUI" },
    tags: ["keystore-explorer", "jks", "java", "gui"]
  },
  {
    id: "t398",
    name: "GPG4win",
    url: "https://gpg4win.org",
    category: "crypto",
    platform: ["windows"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "حزمة GnuPG الرسمية لويندوز مع واجهة Kleopatra وإضافة Outlook. تتيح تشفير البريد والملفات بواجهات رسومية مريحة للمستخدمين.",
      en: "The official GnuPG suite for Windows bundling the Kleopatra GUI and an Outlook plugin. It brings mail and file encryption to Windows desktops comfortably."
    },
    cmd: "kleopatra",
    cmdDesc: { ar: "فتح مدير الشهادات Kleopatra", en: "Open the Kleopatra certificate manager" },
    tags: ["gpg4win", "kleopatra", "windows", "encryption"]
  },
  {
    id: "t399",
    name: "Let's Encrypt",
    url: "https://letsencrypt.org",
    category: "crypto",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "مرجع تصديق مجاني عالمي أشاع HTTPS عبر بروتوكول ACME المفتوح. عملاؤه يتحققون من ملكية النطاق ويجدّدون شهادات صالحة 90 يومًا تلقائيًا.",
      en: "The free global certificate authority that popularised HTTPS via the open ACME protocol. Its clients validate domain ownership and renew 90-day certificates automatically."
    },
    cmd: "curl https://acme-v02.api.letsencrypt.org/directory",
    cmdDesc: { ar: "استعراض دليل خدمة ACME البرمجي", en: "Browse the ACME API directory endpoint" },
    tags: ["letsencrypt", "acme", "ca", "https"]
  },
  {
    id: "t400",
    name: "sops",
    url: "https://github.com/getsops/sops",
    category: "crypto",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة إدارة أسرار مشفرة داخل ملفات YAML وJSON وdotenv نشأت في Mozilla. تشفّر القيم فقط فتبقى الملفات قابلة للمراجعة ومقارنة الفروق عبر Git.",
      en: "A community-maintained encrypted-secrets editor for YAML, JSON, and dotenv files, born at Mozilla. It encrypts only the values so files stay reviewable and diffable in Git."
    },
    cmd: "sops -d secrets.enc.yaml",
    cmdDesc: { ar: "فك تشفير ملف أسرار للقراءة", en: "Decrypt a secrets file for reading" },
    tags: ["sops", "secrets", "git", "encryption"]
  }
];
