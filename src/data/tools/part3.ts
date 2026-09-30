import type { Tool } from "@/lib/types";

// ─── TOOLS PART 3: t201–t300 ─────────────────────────────────────────────
// Categories: simulate (t201–t220), ipcalc (t221–t240), transfer (t241–t260),
//             remote (t261–t280), traffic (t281–t300)

export const TOOLS_PART3: Tool[] = [
  // ── Simulate / المحاكاة والمختبرات ───────────────────────────────────
  {
    id: "t201",
    name: "GNS3",
    url: "https://gns3.com",
    category: "simulate",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محاكي شبكات مفتوح المصدر يشغّل صور أنظمة تشغيل شبكات حقيقية مثل Cisco IOS وJunos داخل مختبرات افتراضية على جهازك. يُعد الخيار الأول لمُعدّي شهادات CCNA وCCNP لتجربة طوبولوجيات معقدة قبل تطبيقها في بيئة الإنتاج.",
      en: "An open-source network emulator that runs real router and switch OS images such as Cisco IOS and Juniper Junos inside virtual labs on your machine. It is the go-to choice for CCNA/CCNP candidates to build and test complex topologies before touching production."
    },
    cmd: "gns3 --version",
    cmdDesc: { ar: "التحقق من إصدار GNS3 المثبّت", en: "Verify the installed GNS3 version" },
    tags: ["gns3", "emulator", "cisco", "labs"]
  },
  {
    id: "t202",
    name: "Cisco Packet Tracer",
    url: "https://www.netacad.com/courses/packet-tracer",
    category: "simulate",
    platform: ["cross"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "برنامج محاكاة شبكات من Cisco Academies يتيح بناء طوبولوجيات كاملة بالمبدّلات والموجّهات ونقاط الوصول اللاسلكي ومحاكاة الحزم خطوة بخطوة. مثالي للمبتدئين في رحلة NetAcad لفهم التوجيه والتبديل عمليًا دون شراء عتاد.",
      en: "Cisco's simulator for Networking Academy students, letting you build full topologies with switches, routers, and wireless APs and follow packets step by step. Ideal for beginners to understand routing and switching hands-on without buying hardware."
    },
    cmd: "show ip interface brief",
    cmdDesc: { ar: "فحص حالات الواجهات داخل مختبر Packet Tracer", en: "Inspect interface status inside a Packet Tracer lab" },
    tags: ["packet-tracer", "cisco", "ccna", "simulation"]
  },
  {
    id: "t203",
    name: "EVE-NG",
    url: "https://www.eve-ng.com",
    category: "simulate",
    platform: ["web"],
    license: "freemium",
    difficulty: 4,
    desc: {
      ar: "منصة مختبرات افتراضية تُدار عبر المتصفح وتستنسخ صور أجهزة الشبكات والخوادم من بائعين متعددين على خادم واحد. النسخة المجانية تكفي للتدريب الفردي بينما تضيف نسخة Pro ميزات المؤسسات والتعاون الجماعي.",
      en: "A browser-driven virtual lab platform that boots multi-vendor network and server images on a single server. The free Community edition is enough for personal study, while Pro adds enterprise and team features."
    },
    cmd: "ssh root@192.168.1.100",
    cmdDesc: { ar: "تسجيل الدخول إلى خادم EVE-NG لإدارة المختبر", en: "Log in to the EVE-NG lab server to manage topologies" },
    tags: ["eve-ng", "labs", "multi-vendor", "emulator"]
  },
  {
    id: "t204",
    name: "Cisco Modeling Labs (CML)",
    url: "https://www.cisco.com/c/en/us/products/cloud-systems-management/modeling-labs/index.html",
    category: "simulate",
    platform: ["cross"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "منصة المحاكاة الرسمية من Cisco تشغّل نفس صور IOS وIOS-XE وNX-OS المستخدمة في الأجهزة الحقيقية عبر محرك VRFP. توفر واجهة REST API تُمكّن أتمتة المختبرات وربطها بخطوط CI/CD لاختبار الشبكات آليًا.",
      en: "Cisco's official simulation platform running the same IOS, IOS-XE, and NX-OS images used on real devices, powered by the VRFP engine. Its REST API enables lab automation and plugging network tests into CI/CD pipelines."
    },
    cmd: "show ip route",
    cmdDesc: { ar: "عرض جدول التوجيه على عقدة محاكاة في CML", en: "Display the routing table on a simulated CML node" },
    tags: ["cml", "cisco", "labs", "api"]
  },
  {
    id: "t205",
    name: "Boson NetSim",
    url: "https://www.boson.com/netsim",
    category: "simulate",
    platform: ["windows"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "محاكي تدريبي متخصص لشهادات Cisco يقدّم مختبرات موجَّهة بأوامر مطابقة لأهداف الامتحان. يشتهر بمحرّك محاكاة IOS دقيق يستهلك موارد أقل بكثير من المحاكيات الكاملة.",
      en: "A Cisco certification-focused simulator with guided labs that closely match exam objectives. It is known for an accurate IOS simulation engine that needs far fewer resources than full emulators."
    },
    cmd: "show running-config",
    cmdDesc: { ar: "مراجعة الإعدادات الجارية في NetSim", en: "Review the running configuration in NetSim" },
    tags: ["netsim", "boson", "ccna", "ccnp"]
  },
  {
    id: "t206",
    name: "Mininet",
    url: "http://mininet.org",
    category: "simulate",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محاكي شبكات سريع يبني طوبولوجيات كاملة داخل نواة لينكس باستخدام المحاكاة الافتراضية للعمليات وOpen vSwitch. يُعد المعيار الفعلي لأبحاث SDN وتجربة وحدات التحكم مثل ONOS وRyu.",
      en: "A fast network emulator that builds complete topologies inside the Linux kernel using process virtualization and Open vSwitch. It is the de facto standard for SDN research and testing controllers such as ONOS and Ryu."
    },
    cmd: "sudo mn --test pingall",
    cmdDesc: { ar: "إنشاء طوبولوجيا افتراضية واختبار الاتصال بين كل العقد", en: "Create a virtual topology and test connectivity between all hosts" },
    tags: ["mininet", "sdn", "openvswitch", "linux"]
  },
  {
    id: "t207",
    name: "Containerlab",
    url: "https://containerlab.dev",
    category: "simulate",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أداة إطلاق مختبرات الشبكات داخل حاويات Docker من ملف طوبولوجيا YAML واحد، مع دعم صور أنظمة شبكات حقيقية مثل Nokia SR Linux وArista cEOS وCisco XRd. غيّرت طريقة بناء مختبرات الأتمتة لأن شبكة كاملة تنهض في ثوانٍ.",
      en: "A tool that spins up container-based network labs from a single YAML topology file, supporting real NOS images like Nokia SR Linux, Arista cEOS, and Cisco XRd. It transformed automation labs because an entire multi-node network comes up in seconds."
    },
    cmd: "containerlab deploy -t topology.yml",
    cmdDesc: { ar: "نشر مختبر الشبكة من ملف الطوبولوجيا", en: "Deploy the lab network from a topology file" },
    tags: ["containerlab", "docker", "yaml", "labs"]
  },
  {
    id: "t208",
    name: "Vagrant",
    url: "https://www.vagrantup.com",
    category: "simulate",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة إدارة بيئات افتراضية قابلة لإعادة الإنشاء عبر ملف Vagrantfile واحد، تُستخدم لنهوض مختبرات متعددة الأجهزة في دقائق. تحافظ على تطابق بيئة كل عضو في الفريق وهي أساس ممارسة البنية ككود.",
      en: "A tool for reproducible virtual environments driven by a single Vagrantfile, used to stand up multi-machine labs in minutes. It keeps every team member's lab identical and is a foundation of infrastructure-as-code practice."
    },
    cmd: "vagrant up",
    cmdDesc: { ar: "تشغيل جميع الآلات الافتراضية المعرّفة في Vagrantfile", en: "Boot all virtual machines defined in the Vagrantfile" },
    tags: ["vagrant", "virtualization", "devops", "labs"]
  },
  {
    id: "t209",
    name: "VirtualBox",
    url: "https://www.virtualbox.org",
    category: "simulate",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "منصة افتراضية مجانية للحواسيب المكتبية تُستخدم على نطاق واسع لبناء مختبرات أنظمة التشغيل والخدمات الشبكية. تدعم شبكات NAT والجسور والشبكات الداخلية فتتصرّف الآلات الافتراضية كمضيفين حقيقيين في الشبكة المحلية.",
      en: "A free desktop virtualization platform widely used to build labs of operating systems and network services. It supports NAT, bridged, and internal networks so virtual machines behave like real LAN hosts."
    },
    cmd: "VBoxManage list vms",
    cmdDesc: { ar: "سرد الأجهزة الافتراضية المسجّلة", en: "List all registered virtual machines" },
    tags: ["virtualbox", "hypervisor", "virtualization", "labs"]
  },
  {
    id: "t210",
    name: "VMware Workstation Pro",
    url: "https://www.vmware.com/products/workstation-pro.html",
    category: "simulate",
    platform: ["windows", "linux"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة افتراضية احترافية تتميّز بشبكات افتراضية متقدمة وقطاعات LAN معزولة ومحاكاة أعطال الوصلات. أصبحت مجانية للاستخدام الشخصي بعد استحواذ Broadcom بينما تبقى الاستخدامات التجارية مدفوعة.",
      en: "A professional Type-2 hypervisor featuring advanced virtual networks, isolated LAN segments, and link-failure simulation. Broadcom made it free for personal use while commercial deployments remain paid."
    },
    cmd: "vmrun list",
    cmdDesc: { ar: "سرد الأجهزة الافتراضية قيد التشغيل", en: "List all running virtual machines" },
    tags: ["vmware", "hypervisor", "workstation", "labs"]
  },
  {
    id: "t211",
    name: "Proxmox VE",
    url: "https://www.proxmox.com",
    category: "simulate",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة افتراضية مفتوحة المصدر تجمع أجهزة KVM الافتراضية وحاويات LXC في واجهة ويب واحدة، وتُبنى عليها مختبرات المنازل ومزوّدات الخدمات الصغيرة. تقدّم جسور لينكس وVLAN وSDN مع عناقيد عالية الإتاحة.",
      en: "An open-source virtualization platform combining KVM virtual machines and LXC containers under one web UI, popular for home labs and small service providers. It ships Linux bridges, VLANs, and an SDN stack along with HA clustering."
    },
    cmd: "qm list",
    cmdDesc: { ar: "سرد الأجهزة الافتراضية على خادم Proxmox", en: "List virtual machines on a Proxmox host" },
    tags: ["proxmox", "kvm", "virtualization", "cluster"]
  },
  {
    id: "t212",
    name: "Marionnet",
    url: "https://www.marionnet.org",
    category: "simulate",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محاكي شبكات تعليمي بواجهة رسومية يربط أجهزة لينكس افتراضية عبر جسور وموزّعات افتراضية مع إمكانية قطع الوصلات والتقاط الحزم. مناسب لدروس الشبكات الجامعية بديلًا عن المختبرات العتادية.",
      en: "An educational network simulator with a graphical UI linking virtual Linux machines through virtual hubs and bridges, plus link breakage and packet capture. It suits university networking courses as a replacement for hardware labs."
    },
    cmd: "marionnet",
    cmdDesc: { ar: "تشغيل واجهة Marionnet الرسومية", en: "Launch the Marionnet graphical interface" },
    tags: ["marionnet", "education", "simulation", "linux"]
  },
  {
    id: "t213",
    name: "Netkit",
    url: "http://www.netkit.org",
    category: "simulate",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "نظام مختبرات يعتمد على User-Mode Linux لتشغيل عشرات الموجّهات الافتراضية على جهاز واحد بأمر واحد. رغم قِدَمه ما يزال مرجعًا في المقررات الأكاديمية لاختبار الطوبولوجيات المعرفة بالملفات.",
      en: "A lab system built on User-Mode Linux that runs dozens of virtual routers on one host from a single command. Despite its age it remains a reference in academic courses for file-based topology testing."
    },
    cmd: "lstart -d ~/lab",
    cmdDesc: { ar: "تشغيل جميع عناصر مختبر Netkit في مجلد", en: "Start all devices in a Netkit lab directory" },
    tags: ["netkit", "uml", "education", "linux"]
  },
  {
    id: "t214",
    name: "IMUNES",
    url: "https://imunes.net",
    category: "simulate",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "محاكي شبكات من جامعة زغرب يستخدم حاويات Docker وجسور لينكس لبناء طوبولوجيات كبيرة بموارد ضئيلة جدًا. يجمع بين سرعة الحاويات وسلوك الشبكات الحقيقي ببروتوكولات توجيه كاملة.",
      en: "A network emulator from the University of Zagreb using Docker containers and Linux bridges to build large topologies with tiny resource usage. It combines container speed with real network behaviour including full routing protocols."
    },
    cmd: "imunes -b lab.imn",
    cmdDesc: { ar: "تشغيل مختبر IMUNES من ملف الطوبولوجيا", en: "Boot an IMUNES lab from a topology file" },
    tags: ["imunes", "docker", "emulator", "topology"]
  },
  {
    id: "t215",
    name: "ns-3",
    url: "https://www.nsnam.org",
    category: "simulate",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "بيئة محاكاة بالأحداث المنفصلة للشبكات تُستخدم في الأبحاث الأكاديمية لنمذجة Wi-Fi وLTE وTCP بدقة إحصائية. تُكتب التجارب بلغة ++C أو بايثون وتُنتج ملفات تتبّع قابلة للتحليل العميق.",
      en: "A discrete-event network simulator used in academic research to model Wi-Fi, LTE, and TCP behaviour with statistical rigour. Experiments are written in C++ or Python and produce trace files for deep analysis."
    },
    cmd: "./ns3 run scratch-simulator",
    cmdDesc: { ar: "تشغيل تجربة محاكاة أولية في ns-3", en: "Run a starter simulation experiment in ns-3" },
    tags: ["ns-3", "simulation", "research", "wifi"]
  },
  {
    id: "t216",
    name: "OMNeT++",
    url: "https://omnetpp.org",
    category: "simulate",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار محاكاة معياري بواجهة رسومية ممتازة يوصّف الشبكات عبر نماذج NED ويُشغّل أطر عمل مثل INET وSimu5G. يُقدَّر في الأوساط الأكاديمية لتحريك النتائج بصريًا أثناء التشغيل وتحليلها بعدها.",
      en: "A modular simulation framework with an excellent graphical IDE describing networks in NED files and powering frameworks like INET and Simu5G. Researchers value its live animation and result analysis tooling."
    },
    cmd: "omnetpp",
    cmdDesc: { ar: "تشغيل بيئة تطوير OMNeT++", en: "Launch the OMNeT++ IDE" },
    tags: ["omnet", "simulation", "inet", "research"]
  },
  {
    id: "t217",
    name: "Cisco DevNet Sandbox",
    url: "https://developer.cisco.com/docs/sandbox/",
    category: "simulate",
    platform: ["web"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "مختبرات سحابية مجانية من Cisco تشمل أجهزة IOS-XE وNX-OS وMeraki تعمل باستمرار أو تُحجز مسبقًا. تتيح تجربة الأتمتة عبر NETCONF وRESTCONF دون امتلاك أي عتاد.",
      en: "Cisco's free cloud labs covering IOS-XE, NX-OS, and Meraki platforms, available as always-on or reservable sandboxes. They let you practice NETCONF and RESTCONF automation without owning any hardware."
    },
    cmd: "ssh developer@sandbox-iosxe-latest-1.cisco.com",
    cmdDesc: { ar: "الاتصال بمختبر IOS-XE المتاح دائمًا", en: "Connect to the always-on IOS-XE sandbox" },
    tags: ["devnet", "cisco", "sandbox", "api"]
  },
  {
    id: "t218",
    name: "TryHackMe",
    url: "https://tryhackme.com",
    category: "simulate",
    platform: ["web"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "منصة تعليمية تفاعلية لأساسيات الأمن السيبراني والشبكات عبر غرف تدريبية متدرجة بمسارات واضحة. تشرح مبادئ TCP/IP والمسح والالتقاط في بيئة سحابية جاهزة فلا تحتاج أي تنصيب.",
      en: "An interactive learning platform teaching cybersecurity and networking fundamentals through guided rooms with clear paths. It teaches TCP/IP, scanning, and packet analysis in ready cloud rooms, so nothing needs installing."
    },
    cmd: "sudo openvpn username.ovpn",
    cmdDesc: { ar: "الاتصال بشبكة مختبرات TryHackMe عبر OpenVPN", en: "Connect to TryHackMe lab network over OpenVPN" },
    tags: ["tryhackme", "labs", "security", "learning"]
  },
  {
    id: "t219",
    name: "Hack The Box",
    url: "https://www.hackthebox.com",
    category: "simulate",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة تدريب متقدمة على اختبار الاختراق تتضمن مختبرات شبكات وأجهزة نشطة تحاكي بيئات مؤسسية حقيقية. تصل إليها عبر VPN مخصص لتطوير مهارات التعداد واستغلال الثغرات بشكل عملي.",
      en: "An advanced penetration-testing platform whose labs and live machines emulate realistic enterprise environments. You connect through a dedicated VPN, making it a practical path to sharpen enumeration and exploitation skills."
    },
    cmd: "sudo openvpn lab_username.ovpn",
    cmdDesc: { ar: "الاتصال بمعمل Hack The Box عبر VPN", en: "Connect to the Hack The Box lab over VPN" },
    tags: ["hackthebox", "pentest", "labs", "vpn"]
  },
  {
    id: "t220",
    name: "CORE Network Emulator",
    url: "https://coreemu.github.io/core/",
    category: "simulate",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "محاكي شبكات من مختبر أبحاث البحرية الأمريكية يبني عقد لينكس افتراضية خفيفة تشارك نواة حقيقية مع وصلات افتراضية لكل رابط. يضيف نمذجة التنقّل اللاسلكي واضطراب الوصلات لتجارب الطوبولوجيا الديناميكية.",
      en: "A network emulator from the US Naval Research Laboratory building lightweight virtual Linux nodes sharing a real kernel, with per-link virtual links. It adds wireless mobility and link impairment models for dynamic topology experiments."
    },
    cmd: "core-gui",
    cmdDesc: { ar: "تشغيل واجهة CORE الرسومية", en: "Launch the CORE graphical interface" },
    tags: ["core", "emulator", "research", "linux"]
  },

  // ── IP Calc / حاسبات IP والشبكات ─────────────────────────────────────
  {
    id: "t221",
    name: "ipcalc",
    url: "http://jodies.de/ipcalc",
    category: "ipcalc",
    platform: ["linux"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة سطر أوامر كلاسيكية تحلّل عنوان IPv4 وقناعه وتستخرج الشبكة وعنوان البث ونطاق العناوين الصالح. مخرجاتها الفورية تجعلها أول أداة يتعلمها مهندس الشبكات للتحقق من التقسيم.",
      en: "A classic command-line utility that takes an IPv4 address and mask and outputs the network, broadcast, and usable host range. Its instant output makes it the first tool networking students learn for verifying subnetting."
    },
    cmd: "ipcalc 192.168.1.0/26",
    cmdDesc: { ar: "حساب حدود الشبكة 192.168.1.0/26", en: "Calculate the boundaries of network 192.168.1.0/26" },
    tags: ["ipcalc", "subnet", "ipv4", "cli"]
  },
  {
    id: "t222",
    name: "ipcalc-ng",
    url: "https://gitlab.com/ipcalc/ipcalc",
    category: "ipcalc",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "إعادة تطوير حديثة لأداة ipcalc تدعم IPv6 كاملًا وتوليد نطاقات العناوين وفحص تداخل الشبكات. تُصدر مخرجات ملوّنة سهلة القراءة أثناء جلسات استكشاف الأخطاء.",
      en: "A modern rewrite of ipcalc with full IPv6 support, address range listing, and network overlap checks. Its colour-coded output reads instantly during troubleshooting sessions."
    },
    cmd: "ipcalc 2001:db8::/48",
    cmdDesc: { ar: "تحليل شبكة IPv6 بتقسيم /48", en: "Analyse an IPv6 /48 network" },
    tags: ["ipcalc-ng", "ipv6", "subnet", "cli"]
  },
  {
    id: "t223",
    name: "Sipcalc",
    url: "https://github.com/sii/sipcalc",
    category: "ipcalc",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "حاسبة شبكات متقدمة تدعم IPv4 وIPv6 وتعرض معلومات وافية عن VLSM والتقسيمات الفرعية متعددة المستويات. تفيد عند تصميم مخططات عنونة هرمية للمؤسسات الكبيرة.",
      en: "An advanced subnet calculator supporting both IPv4 and IPv6, printing detailed VLSM and multi-level subdivision data. It shines when designing hierarchical addressing plans for enterprise networks."
    },
    cmd: "sipcalc 192.168.10.0 255.255.255.192",
    cmdDesc: { ar: "تفصيل شبكة VLSM بقناع /26", en: "Break down a VLSM network with a /26 mask" },
    tags: ["sipcalc", "vlsm", "ipv6", "cli"]
  },
  {
    id: "t224",
    name: "cidr.xyz",
    url: "https://cidr.xyz",
    category: "ipcalc",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "حاسبة CIDR تفاعلية داخل المتصفح تعرض بتات العنوان ثنائيةً وتتحدّث لحظيًا مع كل تعديل للتقسيم. وسيلة مرئية ممتازة لفهم العلاقة بين البتات والقناع ونطاق العناوين.",
      en: "An in-browser interactive CIDR calculator showing the address bits in binary and updating live as you change the prefix. A superb visual way to grasp the link between bits, masks, and ranges."
    },
    cmd: "192.168.1.0/26",
    cmdDesc: { ar: "قيمة للتجربة التفاعلية على الموقع", en: "A value to try interactively on the site" },
    tags: ["cidr", "calculator", "binary", "web"]
  },
  {
    id: "t225",
    name: "Calculator.net IP Subnet Calculator",
    url: "https://www.calculator.net/ip-subnet-calculator.html",
    category: "ipcalc",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "حاسبة شبكات فرعية شاملة تحوّل بين صيغ CIDR والقناع العشري وتعطي العنوان الأول والأخير وحجم الشبكة بدقة. تعمل من المتصفح مباشرة دون أي تثبيت.",
      en: "A complete subnet calculator converting between CIDR and dotted mask notation and reporting first/last host and network size. It runs entirely in the browser with no install."
    },
    cmd: "192.168.100.14/28",
    cmdDesc: { ar: "مثال إدخال لتحليل شبكة /28", en: "Example input to analyse a /28 network" },
    tags: ["calculator", "subnet", "cidr", "web"]
  },
  {
    id: "t226",
    name: "SolarWinds Advanced Subnet Calculator",
    url: "https://www.solarwinds.com/free-tools/advanced-subnet-calculator",
    category: "ipcalc",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة سطح مكتب مجانية من SolarWinds تُنشئ مخططات عنونة كاملة عبر VLSM وCIDR وتصدّرها بصيغ جاهزة للتوثيق. تتضمن حاسبة تحويل IP/سداسي/ثنائي ووحدة فحص العناوين.",
      en: "SolarWinds' free desktop tool generating full VLSM and CIDR address plans and exporting them for documentation. It bundles an IP/hex/binary converter plus an address checker."
    },
    cmd: "10.1.0.0/16",
    cmdDesc: { ar: "مثال إدخال لتوليد شبكات فرعية VLSM", en: "Sample input for generating VLSM subnets" },
    tags: ["solarwinds", "subnet", "vlsm", "windows"]
  },
  {
    id: "t227",
    name: "ManageEngine IPv4 Subnet Calculator",
    url: "https://www.manageengine.com/free-tools/",
    category: "ipcalc",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "حاسبة IP سحابية ضمن أدوات ManageEngine المجانية تدعم IPv4 وIPv6 وتعرض نطاق العناوين وعنوان البث وعدد المضيفين. مدخل سريع لفرق البنية التحتية أثناء تصميم VLAN جديدة.",
      en: "ManageEngine's online IP calculator among its free tools, showing the host range, broadcast, and host count for IPv4 and IPv6. A quick reference for infrastructure teams designing new VLANs."
    },
    cmd: "172.16.0.0/20",
    cmdDesc: { ar: "مثال لحساب شبكة /20", en: "Example calculation for a /20 network" },
    tags: ["manageengine", "subnet", "ipv6", "web"]
  },
  {
    id: "t228",
    name: "ipv6calc",
    url: "https://www.deepspace6.net/projects/ipv6calc.html",
    category: "ipcalc",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة قوية لتحليل وتحويل عناوين IPv6 تدعم صيغ إخراج متعددة وكشف أنواع العناوين المختلفة. لا غنى عنها عند كتابة سكربتات تتعامل مع عنونة IPv6.",
      en: "A powerful IPv6 address converter and analyser with multiple output formats and address-type detection. It is indispensable when scripting around IPv6 addressing."
    },
    cmd: "ipv6calc --showinfo 2001:db8::1",
    cmdDesc: { ar: "عرض معلومات تحليلية عن عنوان IPv6", en: "Show analysis info for an IPv6 address" },
    tags: ["ipv6calc", "ipv6", "cli", "conversion"]
  },
  {
    id: "t229",
    name: "Python ipaddress",
    url: "https://docs.python.org/3/library/ipaddress.html",
    category: "ipcalc",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "وحدة قياسية في مكتبة بايثون تعالج الشبكات والعناوين برمجيًا عبر كائنات IPv4Network وIPv6Network. أساس أتمتة توليد خطط العنونة وفحص انتماء العناوين للشبكات.",
      en: "Python's standard-library module for programmatic handling of addresses and networks via IPv4Network and IPv6Network objects. It is the backbone for automating addressing plans and membership checks."
    },
    cmd: "python -c \"import ipaddress; print(ipaddress.ip_network('10.0.0.0/24'))\"",
    cmdDesc: { ar: "إنشاء كائن شبكة IP في بايثون", en: "Create a Python IP network object" },
    tags: ["python", "ipaddress", "subnet", "scripting"]
  },
  {
    id: "t230",
    name: "WhatIsMyIPAddress",
    url: "https://whatismyipaddress.com",
    category: "ipcalc",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "خدمة ويب شهيرة تعرض عنوان IP العام وموقعه الجغرافي ومعلومات مزوّد الخدمة فورًا. تُستخدم للتحقق من نجاح VPN أو فحص سمعة العنوان قبل استخدامه.",
      en: "A popular web service that instantly shows your public IP, its geolocation, and ISP details. Handy for verifying VPN success or checking address reputation before use."
    },
    cmd: "nslookup myip.opendns.com resolver1.opendns.com",
    cmdDesc: { ar: "استعلام DNS كلاسيكي لمعرفة IP العام", en: "The classic DNS query trick to reveal your public IP" },
    tags: ["ip", "lookup", "geolocation", "web"]
  },
  {
    id: "t231",
    name: "NetworkCalc",
    url: "https://networkcalc.com",
    category: "ipcalc",
    platform: ["web"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "مجموعة حاسبات شبكية سحابية تغطي تقسيم الشبكات وتحويل عناوين MAC والمنافذ وأدوات فرعية متنوعة. توفر واجهة برمجية مدفوعة تُسهّل دمج الحسابات في أدواتك الخاصة.",
      en: "A suite of online network calculators covering subnets, MAC conversions, ports, and more. A paid API makes it easy to embed the calculations into your own tooling."
    },
    cmd: "10.0.0.0/22",
    cmdDesc: { ar: "مثال إدخال لتحليل شبكة /22", en: "Example input to analyse a /22 network" },
    tags: ["networkcalc", "subnet", "calculator", "web"]
  },
  {
    id: "t232",
    name: "netmask",
    url: "https://github.com/tlby/netmask",
    category: "ipcalc",
    platform: ["linux"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة لينكس صغيرة تُفكّك نطاقات العناوين إلى قوائم شبكات مكوّنة وتقبل أي صيغة إدخال تقريبًا. مفيدة لتنقية بيانات قوائم التحكم قبل تطبيقها على الموجّهات.",
      en: "A tiny Linux utility that explodes address ranges into lists of constituent networks and accepts nearly any input format. Useful for normalising ACL data before pushing it to routers."
    },
    cmd: "netmask 192.168.0.0/24",
    cmdDesc: { ar: "تحويل نطاق عناوين إلى شبكات مكوّنة", en: "Convert an address range into constituent networks" },
    tags: ["netmask", "subnet", "cli", "linux"]
  },
  {
    id: "t233",
    name: "IPAddressGuide CIDR Calculator",
    url: "https://www.ipaddressguide.com/cidr",
    category: "ipcalc",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "حاسبة CIDR عبر الويب تُظهر قناع الشبكة وحجمها ونطاق العناوين القابلة للاستخدام بشكل فوري. تناسب مهندسي الحلول الذين يحتاجون أرقامًا سريعة أثناء جلسات التصميم.",
      en: "A web CIDR calculator instantly showing the mask, network size, and usable host range. Suits solution engineers who need quick numbers during design sessions."
    },
    cmd: "10.10.0.0/21",
    cmdDesc: { ar: "مثال إدخال لحساب شبكة /21", en: "Example input for a /21 calculation" },
    tags: ["cidr", "calculator", "subnet", "web"]
  },
  {
    id: "t234",
    name: "SubnettingPractice.com",
    url: "https://subnettingpractice.com",
    category: "ipcalc",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "موقع تدريب مجاني يقدّم أسئلة تقسيم شبكات لا نهائية مع مؤقّت ومولّد عشوائي يحاكي ضغط الامتحان. أثبت فعاليته في تجهيز المتقدمين لامتحان CCNA.",
      en: "A free drill site offering endless random subnetting questions with a timer that mimics exam pressure. Proven for warming up before the CCNA exam."
    },
    cmd: "172.16.5.77/26",
    cmdDesc: { ar: "نمط سؤال تدريبي من الموقع", en: "The style of drill question the site generates" },
    tags: ["subnetting", "practice", "ccna", "training"]
  },
  {
    id: "t235",
    name: "Site24x7 IPv4 Subnet Calculator",
    url: "https://www.site24x7.com/tools/ipv4-subnetcalculator.html",
    category: "ipcalc",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "حاسبة IPv4 مجانية ضمن مجموعة أدوات Site24x7 تعرض القناع وعنوان البث والنطاق الصالح مع عدد المضيفين. تُساعد فرق المراقبة على تحديد نطاقات أجهزتها بسرعة.",
      en: "A free IPv4 calculator among Site24x7's tools, printing the mask, broadcast, valid range, and host count. It helps monitoring teams quickly scope device ranges."
    },
    cmd: "192.168.88.0/29",
    cmdDesc: { ar: "مثال إدخال لشبكة /29", en: "Example input for a /29 network" },
    tags: ["site24x7", "subnet", "ipv4", "web"]
  },
  {
    id: "t236",
    name: "netaddr",
    url: "https://netaddr.readthedocs.io",
    category: "ipcalc",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "مكتبة بايثون ناضجة للتعامل مع عناوين IP والشبكات والنطاقات مع دعم IPv4 وIPv6 والتحويل بين القواعد. تعتمدها مشاريع أتمتة الشبكات لقوتها في معالجة القوائم الكبيرة واكتشاف التداخل.",
      en: "A mature Python library for IP addresses, networks, and ranges supporting IPv4, IPv6, and base conversions. Network automation projects rely on it for bulk list handling and overlap detection."
    },
    cmd: "python -c \"from netaddr import IPNetwork; print(IPNetwork('10.0.0.0/24').size)\"",
    cmdDesc: { ar: "حساب عدد عناوين شبكة عبر netaddr", en: "Count the addresses in a network using netaddr" },
    tags: ["netaddr", "python", "ipaddress", "library"]
  },
  {
    id: "t237",
    name: "IPinfo",
    url: "https://ipinfo.io",
    category: "ipcalc",
    platform: ["web"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "خدمة معلومات عناوين IP تُظهر الموقع الجغرافي ومنظمة ASN ونوع العنوان بدقة عالية عبر واجهة ويب وAPI. أساسية لفهم مصدر الحركة وتصنيفها في التحليلات الشبكية.",
      en: "An IP intelligence service revealing geolocation, ASN, and address type with high accuracy via web and API. Essential for understanding where traffic originates in network analytics."
    },
    cmd: "curl ipinfo.io/8.8.8.8",
    cmdDesc: { ar: "جلب بيانات العنوان 8.8.8.8 من IPinfo", en: "Fetch data for 8.8.8.8 from IPinfo" },
    tags: ["ipinfo", "geolocation", "asn", "api"]
  },
  {
    id: "t238",
    name: "RIPEstat",
    url: "https://stat.ripe.net",
    category: "ipcalc",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "منصة بيانات من RIPE NCC تجمع معلومات التوجيه وWHOIS وبادئات ASN للعناوين عبر واجهة موحّدة. مرجع موثوق للتحقق من ملكية البادئات وسياسات التوجيه العالمية.",
      en: "A data platform from RIPE NCC aggregating routing, WHOIS, and ASN prefix data behind one interface. A trusted reference for verifying prefix ownership and global routing policy."
    },
    cmd: "curl https://stat.ripe.net/data/whois/data.json?resource=8.8.8.8",
    cmdDesc: { ar: "استعلام بيانات WHOIS عبر واجهة RIPEstat البرمجية", en: "Query WHOIS data via the RIPEstat API" },
    tags: ["ripestat", "whois", "asn", "bgp"]
  },
  {
    id: "t239",
    name: "ifconfig.me",
    url: "https://ifconfig.me",
    category: "ipcalc",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "خدمة بسيطة تعيد عنوانك العام مباشرةً من سطر الأوامر عبر curl دون أي إضافات. تُستخدم في السكربتات لاكتشاف العنوان الخارجي تلقائيًا.",
      en: "A minimal service that echoes your public IP straight from the shell with curl, no setup needed. Scripts use it to auto-detect the external address."
    },
    cmd: "curl ifconfig.me",
    cmdDesc: { ar: "طباعة عنوان IP العام من الطرفية", en: "Print your public IP from the terminal" },
    tags: ["ip", "cli", "curl", "web"]
  },
  {
    id: "t240",
    name: "Team Cymru IP to ASN",
    url: "https://team-cymru.com/community-services/ip-asn-mapping/",
    category: "ipcalc",
    platform: ["cross"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "خدمة تحوّل عنوان IP إلى رقم ASN ومالك البادئة عبر استعلام whois مباشر. تُحلّل أصل الحركة وتحدد المنظمة المسؤولة عن أي بادئة على الإنترنت.",
      en: "A service mapping an IP address to its ASN and prefix owner through a plain whois query. It resolves where traffic comes from and which organisation owns a prefix."
    },
    cmd: "whois -h whois.cymru.com 8.8.8.8",
    cmdDesc: { ar: "معرفة ASN المالك للعنوان 8.8.8.8", en: "Look up the ASN owning 8.8.8.8" },
    tags: ["asn", "whois", "cymru", "lookup"]
  },

  // ── Transfer / نقل الملفات ───────────────────────────────────────────
  {
    id: "t241",
    name: "curl",
    url: "https://curl.se",
    category: "transfer",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عميل نقل بيانات الأكثر انتشارًا في العالم يدعم أكثر من 25 بروتوكولًا مثل HTTP وFTP وSFTP مع قدرات مصادقة وبروكسي واسعة. وجوده على كل نظام تقريبًا يجعله العمود الفقري للسكربتات والأتمتة.",
      en: "The world's most ubiquitous transfer client, speaking 25+ protocols including HTTP, FTP, and SFTP with deep authentication and proxy options. Its presence on nearly every system makes it the backbone of scripts and automation."
    },
    cmd: "curl -O https://example.com/file.iso",
    cmdDesc: { ar: "تنزيل ملف مع الحفاظ على اسمه", en: "Download a file keeping its remote name" },
    tags: ["curl", "http", "transfer", "cli"]
  },
  {
    id: "t242",
    name: "Wget",
    url: "https://www.gnu.org/software/wget/",
    category: "transfer",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة التنزيل غير التفاعلية من GNU تتميّز باستئناف التنزيلات المتوقفة ونسخ مواقع كاملة بشكل تكراري. مثالية لجلب ملفات البرامج الثابتة وصور الأنظمة من سطر الأوامر.",
      en: "GNU's non-interactive downloader famed for resuming interrupted transfers and recursively mirroring whole sites. Ideal for fetching firmware and OS images from the command line."
    },
    cmd: "wget -c https://mirror.example.com/image.iso",
    cmdDesc: { ar: "استئناف تنزيل متوقف", en: "Resume an interrupted download" },
    tags: ["wget", "download", "http", "cli"]
  },
  {
    id: "t243",
    name: "SCP (OpenSSH)",
    url: "https://www.openssh.com",
    category: "transfer",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أمر النقل الآمن فوق SSH لنسخ الملفات بين الأجهزة بتشفير كامل مع التحقق من مفاتيح المضيف. سريع وفعال لنقل ملفات التهيئة وصور النظام إلى الموجّهات والخوادم.",
      en: "The SSH-based secure copy command for moving files between machines with full encryption and host-key checks. Fast and efficient for pushing configs or OS images to routers and servers."
    },
    cmd: "scp running-config.txt admin@192.168.1.10:/backup/",
    cmdDesc: { ar: "نسخ ملف تهيئة إلى خادم بعيد", en: "Copy a config file to a remote server" },
    tags: ["scp", "ssh", "secure", "transfer"]
  },
  {
    id: "t244",
    name: "SFTP (OpenSSH)",
    url: "https://www.openssh.com",
    category: "transfer",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "بروتوكول نقل ملفات عبر SSH يتيح جلسة تفاعلية لاستعراض المجلدات واستئناف النقل. يتفوق على FTP التقليدي بالأمان والقدرة على العمل عبر قناة SSH واحدة.",
      en: "A file transfer protocol over SSH offering an interactive session with directory browsing and resumable transfers. It beats legacy FTP with security and multiplexing over a single SSH channel."
    },
    cmd: "sftp admin@192.168.1.10",
    cmdDesc: { ar: "فتح جلسة SFTP تفاعلية", en: "Open an interactive SFTP session" },
    tags: ["sftp", "ssh", "ftp", "secure"]
  },
  {
    id: "t245",
    name: "rsync",
    url: "https://rsync.samba.org",
    category: "transfer",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة مزامنة ملفات تنقل الفروقات فقط فتنجز النسخ الضخمة بسرعة قياسية عبر SSH. معيار عملي للنسخ الاحتياطي وترحيل بيانات الخوادم ونشر ملفات التهيئة.",
      en: "A synchronisation tool that transfers only the differences, making huge copies blazingly fast over SSH. It is the practical standard for backups, server migrations, and config rollouts."
    },
    cmd: "rsync -avz --progress data/ admin@192.168.1.10:/srv/backup/",
    cmdDesc: { ar: "مزامنة مجلد إلى خادم بعيد بضغط", en: "Sync a folder to a remote server with compression" },
    tags: ["rsync", "sync", "backup", "ssh"]
  },
  {
    id: "t246",
    name: "FileZilla",
    url: "https://filezilla-project.org",
    category: "transfer",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "عميل FTP/SFTP الرسومي الأكثر شهرة بواجهة سحب وإفلات ومدير مواقع يحفظ الاتصالات. يدعم FTPS وSFTP ووصلات متعددة متزامنة لنقل أسرع للملفات الكثيرة.",
      en: "The best-known graphical FTP/SFTP client with drag-and-drop and a site manager for saved connections. It supports FTPS, SFTP, and simultaneous connections for faster bulk moves."
    },
    cmd: "filezilla sftp://admin@192.168.1.20",
    cmdDesc: { ar: "فتح اتصال SFTP مباشر من سطر الأوامر", en: "Open a direct SFTP connection from the command line" },
    tags: ["filezilla", "ftp", "sftp", "gui"]
  },
  {
    id: "t247",
    name: "WinSCP",
    url: "https://winscp.net",
    category: "transfer",
    platform: ["windows"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "عميل SFTP/SCP لويندوز يدمج مستكشف ملفات مزدوج الألواح مع مزامنة مجلدات وبرمجة نصية قوية. الخيار الافتراضي للمهندسين لرفع ملفات التهيئة من أجهزة ويندوز.",
      en: "A Windows SFTP/SCP client combining a dual-pane file explorer with folder sync and powerful scripting. The default pick for engineers uploading configs from Windows workstations."
    },
    cmd: "winscp.exe sftp://admin@192.168.1.10/",
    cmdDesc: { ar: "فتح WinSCP على خادم SFTP مباشرةً", en: "Open WinSCP directly to an SFTP server" },
    tags: ["winscp", "sftp", "windows", "gui"]
  },
  {
    id: "t248",
    name: "Cyberduck",
    url: "https://cyberduck.io",
    category: "transfer",
    platform: ["mac", "windows"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "عميل نقل ملفات أنيق لماك وويندوز يدعم SFTP وWebDAV ومزوّدي السحابة مثل S3 وAzure. يوحّد الوصول إلى كل مخازن الملفات من واجهة واحدة نظيفة.",
      en: "An elegant macOS/Windows transfer client speaking SFTP, WebDAV, and cloud providers like S3 and Azure. It unifies access to all your storage from a single clean interface."
    },
    cmd: "duck --list sftp://admin@192.168.1.10/",
    cmdDesc: { ar: "سرد الملفات عبر أمر duck البرمجي", en: "List remote files via the duck CLI" },
    tags: ["cyberduck", "sftp", "webdav", "cloud"]
  },
  {
    id: "t249",
    name: "SolarWinds TFTP Server",
    url: "https://www.solarwinds.com/free-tools/tftp-server",
    category: "transfer",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "خادم TFTP مجاني موثوق لترقية البرامج الثابتة للمبدّلات والموجّهات ونقل ملفات التهيئة. يقدّم تسجيلًا للعمليات وقوائم مجلدات معتمدة تمنع الكتابة العشوائية.",
      en: "A reliable free TFTP server for upgrading switch and router firmware and moving config files. It adds operation logging and approved directory lists to prevent stray writes."
    },
    cmd: "tftp -i 192.168.1.5 PUT c2960-firmware.bin",
    cmdDesc: { ar: "رفع صورة برمجية إلى جهاز عبر TFTP", en: "Push a firmware image to a device over TFTP" },
    tags: ["tftp", "firmware", "solarwinds", "windows"]
  },
  {
    id: "t250",
    name: "Tftpd64",
    url: "https://tftpd32.jounin.net/tftpd64_download.html",
    category: "transfer",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "خادم وعميل TFTP شامل لويندوز يضم خادم DHCP وSyslog في تطبيق واحد محمول. رفيق الدعم الفني لنسخ ملفات الإعداد والترقية عبر الشبكة في الميدان.",
      en: "An all-in-one Windows TFTP server and client that also packs DHCP and Syslog servers in one portable app. A field engineer's companion for config and upgrade transfers."
    },
    cmd: "tftp 192.168.1.1 get running-config",
    cmdDesc: { ar: "سحب ملف تهيئة جهاز عبر TFTP", en: "Fetch a device config file over TFTP" },
    tags: ["tftpd64", "tftp", "dhcp", "windows"]
  },
  {
    id: "t251",
    name: "Ncat",
    url: "https://nmap.org/ncat/",
    category: "transfer",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عميل وخادم شبكة متعدد الاستخدامات من فريق Nmap يدعم التشفير عبر SSL والوكلاء والربط بين المنافذ. يُستخدم لنقل الملفات السريع واختبار الوصلات في أي بروتوكول نصي.",
      en: "Nmap's versatile network client/server supporting SSL encryption, proxies, and connection brokering. Used for quick file moves and testing any text-based protocol link."
    },
    cmd: "ncat -l 9999 > file.bin",
    cmdDesc: { ar: "استقبال ملف عبر منفذ 9999", en: "Receive a file over port 9999" },
    tags: ["ncat", "netcat", "nmap", "transfer"]
  },
  {
    id: "t252",
    name: "Resilio Sync",
    url: "https://www.resilio.com",
    category: "transfer",
    platform: ["cross"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "أداة مزامنة ملفات لامركزية تعتمد بروتوكول P2P لتوزيع التغييرات بين الأجهزة فور حدوثها. تنقل ملفات ISO الضخمة بين مواقع المختبرات بسرعة تتفوق على النقل المركزي.",
      en: "A decentralised sync tool using peer-to-peer protocols to spread file changes the moment they happen. It moves huge ISO files between lab sites far faster than central HTTP."
    },
    cmd: "rslsync --config sync.conf",
    cmdDesc: { ar: "تشغيل مزامنة Resilio بملف إعدادات", en: "Start Resilio Sync with a config file" },
    tags: ["resilio", "p2p", "sync", "bittorrent"]
  },
  {
    id: "t253",
    name: "AzCopy",
    url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10",
    category: "transfer",
    platform: ["cross"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة مايكروسوفت الرسمية لنقل البيانات من وإلى تخزين Azure عبر Blob وملفات SMB بسرعة متوازية عالية. تدير ترحيل النسخ الاحتياطية للشبكة إلى السحابة بجدولة موثوقة.",
      en: "Microsoft's official tool for high-throughput parallel transfers to Azure Blob and file storage. It manages migrating network backups to the cloud with reliable scheduling."
    },
    cmd: "azcopy copy backup.vhd https://mystorage.blob.core.windows.net/vhds/",
    cmdDesc: { ar: "رفع قرص افتراضي إلى Azure Blob", en: "Upload a virtual disk to Azure Blob storage" },
    tags: ["azcopy", "azure", "blob", "cloud"]
  },
  {
    id: "t254",
    name: "rclone",
    url: "https://rclone.org",
    category: "transfer",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة سطر أوامر تدير أكثر من 70 خدمة تخزين سحابية بأوامر موحّدة شبيهة بـ rsync. تُشغّل نسخًا احتياطيًا مشفّرًا بين مزوّدي السحابة وكأنها مجلدات محلية.",
      en: "A command-line tool managing 70+ cloud storage providers with unified rsync-style commands. It runs encrypted backups between clouds as if they were local folders."
    },
    cmd: "rclone sync /srv/backup remote:offsite",
    cmdDesc: { ar: "مزامنة نسخة احتياطية إلى السحابة", en: "Sync a backup directory to cloud storage" },
    tags: ["rclone", "cloud", "sync", "backup"]
  },
  {
    id: "t255",
    name: "lftp",
    url: "https://lftp.tech",
    category: "transfer",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عميل ملفات متقدم للطرفية يدعم FTP وSFTP وHTTP مع قوائم انتظار ومزامنة مجلدات وجلسات متعددة. يتميّز بأمر mirror القادر على نسخ مواقع FTP كاملة.",
      en: "A sophisticated terminal file client supporting FTP, SFTP, and HTTP with queues, folder sync, and parallel sessions. Its mirror command can clone an entire FTP site."
    },
    cmd: "lftp -u admin sftp://192.168.1.10",
    cmdDesc: { ar: "الاتصال بخادم SFTP عبر lftp", en: "Connect to an SFTP server with lftp" },
    tags: ["lftp", "ftp", "sftp", "mirror"]
  },
  {
    id: "t256",
    name: "vsftpd",
    url: "https://security.appspot.com/vsftpd.html",
    category: "transfer",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم FTP الأكثر تركيزًا على الأمان والسرعة على لينكس وهو الافتراضي في توزيعات كبرى. صُمم بمنهجية أقل الامتيازات مع دعم FTPS وحصص النقل وفصل الصلاحيات.",
      en: "Linux's most security-focused and fastest FTP server, the default in major distros. It follows a least-privilege design with FTPS support, transfer limits, and privilege separation."
    },
    cmd: "sudo systemctl restart vsftpd",
    cmdDesc: { ar: "إعادة تشغيل خدمة FTP بعد تعديل الإعدادات", en: "Restart the FTP service after config changes" },
    tags: ["vsftpd", "ftp", "server", "linux"]
  },
  {
    id: "t257",
    name: "ProFTPD",
    url: "http://www.proftpd.org",
    category: "transfer",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم FTP مرن بإعدادات شبيهة بأباتشي يدعم الاستضافة الافتراضية ووحدات قابلة للتحميل. اختيار شائع عند الحاجة لضبط دقيق لصلاحيات الوصول والنطاقات.",
      en: "A flexible FTP server with Apache-style configuration, virtual hosting, and loadable modules. A common pick when access controls and directory permissions need precise tuning."
    },
    cmd: "proftpd -t",
    cmdDesc: { ar: "فحص صحة ملف إعدادات ProFTPD", en: "Validate the ProFTPD configuration file" },
    tags: ["proftpd", "ftp", "server", "config"]
  },
  {
    id: "t258",
    name: "SFTPGo",
    url: "https://github.com/drakkan/sftpgo",
    category: "transfer",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم SFTP حديث مكتوب بلغة Go يوفر تخزينًا محليًا وسحابيًا مع إدارة مستخدمين ومصادقة متعددة العوامل. يخدم بروتوكولات SFTP وWebDAV وFTP/FTPS من نواة واحدة موحّدة.",
      en: "A modern Go-based SFTP server with local and cloud backends, user management, and two-factor auth. It serves SFTP, WebDAV, and FTP/FTPS from one unified core."
    },
    cmd: "sftpgo serve",
    cmdDesc: { ar: "تشغيل خدمة SFTPGo", en: "Start the SFTPGo service" },
    tags: ["sftpgo", "sftp", "webdav", "server"]
  },
  {
    id: "t259",
    name: "Core FTP",
    url: "https://www.coreftp.com",
    category: "transfer",
    platform: ["windows"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "عميل FTP/FTPS/SFTP خفيف لويندوز بواجهة مزدوجة الألواح وسطر أوامر مكتمل للأتمتة. النسخة المجانية منه تكفي معظم مهام النقل اليومية للمهندسين.",
      en: "A lightweight Windows FTP/FTPS/SFTP client with a dual-pane UI plus a full command line for automation. The free edition covers most daily transfer tasks."
    },
    cmd: "coreftp -s profile -u report.zip /uploads/",
    cmdDesc: { ar: "رفع ملف عبر اتصال محفوظ", en: "Upload a file using a saved profile" },
    tags: ["coreftp", "ftp", "windows", "transfer"]
  },
  {
    id: "t260",
    name: "aria2",
    url: "https://aria2.github.io",
    category: "transfer",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "محمّل تنزيلات متعدد البروتوكولات يقسّم الملفات ويجلبها من عدة مصادر في وقت واحد. يدعم BitTorrent وMetalink ويضاعف سرعة تنزيل صور الأنظمة الضخمة.",
      en: "A multi-protocol downloader that splits files and fetches them from several sources simultaneously. With BitTorrent and Metalink support it multiplies the speed of pulling large OS images."
    },
    cmd: "aria2c -x 8 https://mirror.example.com/ubuntu.iso",
    cmdDesc: { ar: "تنزيل ملف بثمانية اتصالات متوازية", en: "Download a file using eight parallel connections" },
    tags: ["aria2", "download", "torrent", "cli"]
  },

  // ── Remote / الوصول البعيد ───────────────────────────────────────────
  {
    id: "t261",
    name: "OpenSSH",
    url: "https://www.openssh.com",
    category: "remote",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "التنفيذ المرجعي لبروتوكول SSH يتضمن عميلًا وخادمًا وتشفيرًا حديثًا ومصادقة بالمفاتيح. أساس الإدارة البعيدة الآمنة لأجهزة يونكس ولينكس حول العالم.",
      en: "The reference implementation of SSH, providing the client and server with modern ciphers and key-based auth. It underpins secure remote administration of Unix and Linux systems worldwide."
    },
    cmd: "ssh -p 2222 admin@192.168.1.10",
    cmdDesc: { ar: "اتصال SSH بمنفذ غير قياسي", en: "Connect over SSH to a non-standard port" },
    tags: ["ssh", "openssh", "secure", "terminal"]
  },
  {
    id: "t262",
    name: "PuTTY",
    url: "https://www.chiark.greenend.org.uk/~sgtatham/putty/",
    category: "remote",
    platform: ["windows"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "عميل SSH/Telnet الكلاسيكي لويندوز بواجهة بسيطة وحفظ للجلسات وإدارة مفاتيح SSH. ما يزال الأداة الأولى على أجهزة الدعم الفني بعد أكثر من عقدين من صدوره.",
      en: "The classic Windows SSH/Telnet client with simple session and key management. Still the first tool on support desktops after more than two decades."
    },
    cmd: "putty -ssh admin@192.168.1.10",
    cmdDesc: { ar: "فتح جلسة SSH من سطر أوامر ويندوز", en: "Launch an SSH session from the Windows command line" },
    tags: ["putty", "ssh", "windows", "terminal"]
  },
  {
    id: "t263",
    name: "MobaXterm",
    url: "https://mobaxterm.mobatek.net",
    category: "remote",
    platform: ["windows"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "طرفية متقدمة تجمع SSH وإعادة توجيه X11 ومتصفح SFTP مدمجًا وعشرات أدوات الشبكة في تطبيق واحد. اللوح الجانبي يفتح المسارات البعيدة تلقائيًا مع كل جلسة.",
      en: "A power-user terminal bundling SSH, X11 forwarding, a built-in SFTP browser, and dozens of network tools. A side panel auto-opens remote paths for every session."
    },
    cmd: "MobaXterm.exe -bookmark core-switch",
    cmdDesc: { ar: "فتح اتصال محفوظ بأمر واحد", en: "Open a saved connection with a single command" },
    tags: ["mobaxterm", "ssh", "x11", "windows"]
  },
  {
    id: "t264",
    name: "Xshell",
    url: "https://www.netsarang.com/en/xshell/",
    category: "remote",
    platform: ["windows"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "عميل SSH تجاري بواجهة أنيقة يدعم علامات تبويب متعددة وتشفيرًا حديثًا وبرمجة نصية. نسخته المنزلية المجانية جعلته محبوبًا بين مديري الشبكات.",
      en: "A polished commercial SSH client featuring tabs, modern ciphers, and scripting. Its free home edition made it a favourite among network admins."
    },
    cmd: "Xshell.exe -url ssh://admin@192.168.1.10",
    cmdDesc: { ar: "فتح جلسة SSH عبر محدد URL", en: "Open an SSH session using a URL specifier" },
    tags: ["xshell", "ssh", "windows", "tabs"]
  },
  {
    id: "t265",
    name: "Termius",
    url: "https://termius.com",
    category: "remote",
    platform: ["cross"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "عميل SSH عابر للمنصات يزامن المضيفات والمفاتيح عبر جميع أجهزتك من الحاسوب إلى الهاتف. يدعم القصاصات ونقل الملفات لتنفيذ الأوامر المتكررة بسرعة.",
      en: "A cross-platform SSH client that syncs hosts and keys across every device from desktop to phone. Snippets and file transfer speed up repetitive command work."
    },
    cmd: "ssh://admin@192.168.1.10",
    cmdDesc: { ar: "نمط إضافة اتصال جديد داخل Termius", en: "How a new connection is added inside Termius" },
    tags: ["termius", "ssh", "sync", "mobile"]
  },
  {
    id: "t266",
    name: "SecureCRT",
    url: "https://www.vandyke.com/products/securecrt/",
    category: "remote",
    platform: ["cross"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "عميل SSH/Telnet احترافي من VanDyke بإدارة جلسات قوية وسكربتات بلغات متعددة. معيار الصناعة في مراكز العمليات التي تتطلب توثيقًا ولوحات اتصال منضبطة.",
      en: "VanDyke's professional SSH/Telnet client with robust session management and multi-language scripting. An industry standard in NOCs that demand disciplined connection handling."
    },
    cmd: "SecureCRT /SSH2 admin@192.168.1.10",
    cmdDesc: { ar: "بدء جلسة SSH من سطر الأوامر", en: "Start an SSH session from the command line" },
    tags: ["securecrt", "ssh", "enterprise", "scripting"]
  },
  {
    id: "t267",
    name: "KiTTY",
    url: "http://www.9bis.net/kitty/",
    category: "remote",
    platform: ["windows"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "تفرّع من PuTTY يضيف حفظ الجلسات تلقائيًا وتصديرها وتشغيلًا فوريًا وسكربتات جاهزة. يحافظ على بساطة PuTTY مع تحسينات تريح المستخدم اليومي.",
      en: "A PuTTY fork adding automatic session logging, exportable configs, quick launch shortcuts, and scripting. Keeps PuTTY's simplicity with quality-of-life boosts."
    },
    cmd: "kitty.exe -ssh admin@192.168.1.10",
    cmdDesc: { ar: "تشغيل KiTTY باتصال مباشر", en: "Launch KiTTY with a direct connection" },
    tags: ["kitty", "putty", "ssh", "windows"]
  },
  {
    id: "t268",
    name: "Windows Terminal",
    url: "https://aka.ms/terminal",
    category: "remote",
    platform: ["windows"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "الطرفية الحديثة لويندوز بعلامات تبويب متعددة وخطوط وسِمات قابلة للتخصيص تدمج PowerShell وCMD وWSL وSSH. نقطة انطلاق موحّدة لكل جلسات الإدارة الشبكية.",
      en: "Windows' modern terminal with tabs, fonts, and themes, unifying PowerShell, CMD, WSL, and OpenSSH. The single launchpad for all network admin sessions."
    },
    cmd: "wt ssh admin@192.168.1.10",
    cmdDesc: { ar: "فتح لسان طرفية جديد باتصال SSH", en: "Open a new terminal tab with an SSH connection" },
    tags: ["terminal", "windows", "tabs", "ssh"]
  },
  {
    id: "t269",
    name: "mRemoteNG",
    url: "https://mremoteng.org",
    category: "remote",
    platform: ["windows"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "مدير اتصالات مفتوح المصدر يجمع RDP وVNC وSSH وTelnet في واجهة ألسنة واحدة. يدعم ملفات اتصال مشتركة لفرق الدعم عبر مجلدات منظمة.",
      en: "An open-source connection manager uniting RDP, VNC, SSH, and Telnet behind one tabbed interface. Shared connection files support teams via organised folders."
    },
    cmd: "mremoteng.exe",
    cmdDesc: { ar: "تشغيل مدير الاتصالات mRemoteNG", en: "Launch the mRemoteNG connection manager" },
    tags: ["mremoteng", "rdp", "vnc", "manager"]
  },
  {
    id: "t270",
    name: "Royal TS",
    url: "https://royalapps.com/ts",
    category: "remote",
    platform: ["windows", "mac"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "مدير اتصالات احترافي بوثائق مستقلة يجمع SSH وRDP وVNC واتصالات الويب في ملف واحد آمن. تتوفر نسخة Royal TSX لماك مع نفس مستندات الاتصال ومصادر البيانات.",
      en: "A professional connection manager using document files that hold SSH, RDP, VNC, and web connections securely. Royal TSX for macOS shares the same document and data-source model."
    },
    cmd: "RoyalTS.exe",
    cmdDesc: { ar: "فتح مدير اتصالات Royal TS", en: "Open the Royal TS connection manager" },
    tags: ["royalts", "rdp", "ssh", "manager"]
  },
  {
    id: "t271",
    name: "Remmina",
    url: "https://remmina.org",
    category: "remote",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عميل الاتصال البعيد الافتراضي لسطح مكتب لينكس يدعم RDP وVNC وSSH وSPICE. ملفات الاتصال بصيغة remmina. قابلة للمشاركة والنسخ الاحتياطي بسهولة.",
      en: "Linux's default remote desktop client covering RDP, VNC, SSH, and SPICE. Its .remmina connection profiles are easy to back up and share."
    },
    cmd: "remmina -c rdp://admin@192.168.1.50",
    cmdDesc: { ar: "فتح جلسة RDP مباشرةً", en: "Open a direct RDP session" },
    tags: ["remmina", "rdp", "vnc", "linux"]
  },
  {
    id: "t272",
    name: "Chrome Remote Desktop",
    url: "https://remotedesktop.google.com",
    category: "remote",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "حل سطح المكتب البعيد من جوجل يعمل عبر متصفح Chrome دون أي إعداد شبكة معقد. يكفي حساب جوجل للوصول إلى جهازك من أي مكان عبر تقنية WebRTC.",
      en: "Google's remote desktop solution that works through the Chrome browser with zero network gymnastics. A Google account is all it takes to reach your machine anywhere via WebRTC."
    },
    cmd: "https://remotedesktop.google.com/access",
    cmdDesc: { ar: "الرابط المباشر لبدء جلسة وصول بعيد", en: "The direct link to start a remote session" },
    tags: ["chrome", "remote-desktop", "webrtc", "web"]
  },
  {
    id: "t273",
    name: "TeamViewer",
    url: "https://www.teamviewer.com",
    category: "remote",
    platform: ["cross"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "منصة الوصول البعيد الأشهر تجاريًا مع عبور NAT تلقائي واتصالات عبر معرّفات بسيطة. الاستخدام الشخصي مجاني بينما تتطلب الاستخدامات المؤسسية تراخيص.",
      en: "The best-known commercial remote access platform with automatic NAT traversal and simple ID-based connections. Personal use is free, while business deployments need licences."
    },
    cmd: "teamviewer info",
    cmdDesc: { ar: "عرض معرّف الجهاز وحالة الخدمة", en: "Show the device ID and service status" },
    tags: ["teamviewer", "remote-desktop", "support", "nat"]
  },
  {
    id: "t274",
    name: "AnyDesk",
    url: "https://anydesk.com",
    category: "remote",
    platform: ["cross"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "أداة وصول بعيد خفيفة تستخدم مرمّز فيديو خاصًا يحقق سلاسة حتى على الوصلات الضعيفة. تحظى بشعبية في الدعم الفني السريع بفضل صغر حجمها وسرعة اتصالها.",
      en: "A lightweight remote access tool whose proprietary video codec stays smooth even on poor links. Popular for quick support thanks to its small footprint and fast connections."
    },
    cmd: "anydesk 854123982",
    cmdDesc: { ar: "الاتصال بجهاز عبر معرّف AnyDesk", en: "Connect to a device by its AnyDesk ID" },
    tags: ["anydesk", "remote-desktop", "support", "lightweight"]
  },
  {
    id: "t275",
    name: "TightVNC",
    url: "https://www.tightvnc.com",
    category: "remote",
    platform: ["windows", "linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "تنفيذ VNC مجاني يوفر خادمًا وعميلًا مضغوطين بإصدارات لويندوز ولينكس. خيار اقتصادي مفتوح لتشغيل أسطح المكتب البعيدة داخل الشبكة المحلية.",
      en: "A free VNC implementation providing compact server and viewer components for Windows and Linux. An open, economical option for remote desktops on a LAN."
    },
    cmd: "tvnviewer -host 192.168.1.20::5900",
    cmdDesc: { ar: "الاتصال بجلسة VNC على المنفذ 5900", en: "Connect to a VNC session on port 5900" },
    tags: ["vnc", "tightvnc", "remote-desktop", "lan"]
  },
  {
    id: "t276",
    name: "RealVNC",
    url: "https://www.realvnc.com",
    category: "remote",
    platform: ["cross"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "الشركة الأصلية خلف بروتوكول VNC تقدّم عميلًا وخادمًا مع تشفير وربط سحابي مباشر. تصل إلى الأجهزة عبر الإنترنت دون الحاجة لتهيئة المنافذ.",
      en: "The original company behind the VNC protocol, offering a client and server with encryption and direct cloud connectivity. It links devices across the internet without port forwarding."
    },
    cmd: "vncviewer 192.168.1.20",
    cmdDesc: { ar: "فتح نافذة VNC إلى جهاز بعيد", en: "Open a VNC window to a remote machine" },
    tags: ["vnc", "realvnc", "remote-desktop", "cloud"]
  },
  {
    id: "t277",
    name: "TigerVNC",
    url: "https://tigervnc.org",
    category: "remote",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "تفرّع حديث من VNC يركّز على الأداء العالي والالتزام بمعايير بروتوكول RFB. يُستخدم بكثافة مع لينكس لتشغيل أسطح مكتب افتراضية سريعة.",
      en: "A modern high-performance VNC fork focused on speed and RFB protocol compliance. It is heavily used with Linux for snappy virtual desktops."
    },
    cmd: "vncviewer 192.168.1.20:1",
    cmdDesc: { ar: "الاتصال بالشاشة رقم 1 على خادم VNC", en: "Connect to display :1 on a VNC server" },
    tags: ["tigervnc", "vnc", "linux", "performance"]
  },
  {
    id: "t278",
    name: "xrdp",
    url: "http://xrdp.org",
    category: "remote",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم RDP مفتوح المصدر للينكس يتيح لمستخدمي ويندوز الاتصال بسطح مكتب لينكس بأدواتهم المألوفة. خيار ممتاز لإدارة الخوادم عن بُعد دون عملاء إضافية.",
      en: "An open-source RDP server for Linux letting Windows users connect with their built-in client. An excellent way to administer Linux desktops remotely without extra software."
    },
    cmd: "sudo systemctl start xrdp",
    cmdDesc: { ar: "تشغيل خدمة RDP على لينكس", en: "Start the RDP service on Linux" },
    tags: ["xrdp", "rdp", "linux", "remote-desktop"]
  },
  {
    id: "t279",
    name: "Apache Guacamole",
    url: "https://guacamole.apache.org",
    category: "remote",
    platform: ["web"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "بوابة وصول بعيد بلا عميل تدعم VNC وRDP وSSH عبر المتصفح فقط. تُنشر مركزيًا لتمنح الفرق جلسات آمنة قابلة للتسجيل دون تثبيت أي شيء على الأجهزة.",
      en: "A clientless remote access gateway serving VNC, RDP, and SSH purely through the browser. Deploy it centrally to give teams secure, recordable sessions without installing anything."
    },
    cmd: "docker compose up -d",
    cmdDesc: { ar: "تشغيل حاوية Guacamole مع قاعدة بياناتها", en: "Start the Guacamole container stack with its database" },
    tags: ["guacamole", "rdp", "vnc", "gateway"]
  },
  {
    id: "t280",
    name: "Teleport",
    url: "https://goteleport.com",
    category: "remote",
    platform: ["cross"],
    license: "freemium",
    difficulty: 4,
    desc: {
      ar: "منصة وصول موحّدة للبنية التحتية تشمل SSH وقواعد البيانات وKubernetes مع هوية مركزية وتسجيل كامل للجلسات. تُصدر شهادات قصيرة العمر بدلًا من المفاتيح الدائمة لضبط الوصول.",
      en: "A unified access platform for infrastructure covering SSH, databases, and Kubernetes with central identity and full session recording. It issues short-lived certificates instead of permanent keys."
    },
    cmd: "tsh ssh --proxy=tele.corp.com admin@core-sw01",
    cmdDesc: { ar: "الدخول إلى جهاز عبر بوابة Teleport", en: "Log into a host through the Teleport proxy" },
    tags: ["teleport", "ssh", "zero-trust", "recording"]
  },

  // ── Traffic / توليد الحركة والاختبار ──────────────────────────────────
  {
    id: "t281",
    name: "iperf3",
    url: "https://iperf.fr",
    category: "traffic",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "الأداة القياسية لقياس عرض النطاق الترددي بين نقطتين عبر TCP أو UDP مع تقارير فورية للفقد والتوتر. أول ما يشغّله المهندسون لتشخيص أي وصلة بطيئة.",
      en: "The standard tool for measuring TCP or UDP throughput between two points with instant jitter and loss reporting. The first thing engineers run when diagnosing a slow link."
    },
    cmd: "iperf3 -c 192.168.1.10 -t 10",
    cmdDesc: { ar: "قياس عرض النطاق لمدة 10 ثوانٍ", en: "Measure throughput for 10 seconds" },
    tags: ["iperf3", "bandwidth", "throughput", "testing"]
  },
  {
    id: "t282",
    name: "iperf2",
    url: "https://sourceforge.net/projects/iperf2/",
    category: "traffic",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "الإصدار الأصلي من iperf الذي يواصل التطور المستقل بتدفقات UDP متعددة متزامنة. يبقى مفيدًا لاختبارات البث المتعدد والقياسات الزمنية عالية الدقة.",
      en: "The original iperf line, still evolving independently with multiple concurrent UDP streams. It remains useful for multicast testing and high-precision timing experiments."
    },
    cmd: "iperf -c 192.168.1.10 -P 4 -t 20",
    cmdDesc: { ar: "أربعة تدفقات متوازية لمدة 20 ثانية", en: "Four parallel streams for 20 seconds" },
    tags: ["iperf", "udp", "multicast", "throughput"]
  },
  {
    id: "t283",
    name: "netperf",
    url: "https://hewlettpackard.github.io/netperf/",
    category: "traffic",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة قياس أداء تركز على عمليات الشبكة الدقيقة مثل TCP_STREAM وUDP_RR مع قياس زمن الاستجابة. شائعة في مقارنة أنظمة التشغيل ومحركات الشبكة.",
      en: "A benchmarking tool focused on precise network operations like TCP_STREAM and UDP_RR with latency measurements. Common in OS and network-engine comparisons."
    },
    cmd: "netperf -H 192.168.1.10 -t TCP_STREAM",
    cmdDesc: { ar: "اختبار تدفق TCP إلى خادم netperf", en: "Run a TCP_STREAM test against a netperf server" },
    tags: ["netperf", "benchmark", "latency", "tcp"]
  },
  {
    id: "t284",
    name: "nuttcp",
    url: "https://www.nuttcp.net",
    category: "traffic",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة قياس أداء مبنية على nttcp تضيف تقارير إحصائية غنية وتحليل فترات قابل للتقسيم. يفضلها مديرو الشبكات لاختبار وصلات WAN عبر مسافات طويلة بثقة إحصائية.",
      en: "A performance measuring tool built on nttcp that adds rich statistics and interval analysis. WAN managers favour it for long-distance link tests with statistical confidence."
    },
    cmd: "nuttcp -T10 192.168.1.10",
    cmdDesc: { ar: "اختبار إرسال لعشر ثوانٍ", en: "Run a 10-second transmission test" },
    tags: ["nuttcp", "throughput", "wan", "statistics"]
  },
  {
    id: "t285",
    name: "SAP niping",
    url: "https://launchpad.support.sap.com/#/notes/500235",
    category: "traffic",
    platform: ["windows", "linux"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة SAP لاختبار طبقة النقل TCP بقياس دورة الذهاب والإياب بدقة بين خادمين. عريقة في تشخيص مشكلات الشبكة التي تؤثر على أنظمة SAP الإنتاجية.",
      en: "SAP's transport-layer test tool measuring precise round-trip times between hosts. It is the go-to for diagnosing network issues affecting production SAP systems."
    },
    cmd: "niping -c -H sapserver -B 100000",
    cmdDesc: { ar: "قياس دورة الإرسال بحجم مخزن 100000", en: "Measure round-trip time with a 100000 buffer" },
    tags: ["niping", "sap", "rtt", "tcp"]
  },
  {
    id: "t286",
    name: "D-ITG",
    url: "http://www.grid.unina.it/software/ITG/",
    category: "traffic",
    platform: ["linux", "windows"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة توليد حركة قابلة للتخصيص من جامعة نابولي تحاكي مصادر متنوعة بصياغة دقيقة للتأخير والتشتت. تُستخدم في الأبحاث لخلط تدفقات VoIP والفيديو والبيانات معًا.",
      en: "A customisable traffic generator from the University of Naples modelling diverse sources with precise delay and jitter shaping. Researchers use it to blend VoIP, video, and data flows."
    },
    cmd: "ITGSend -a 192.168.1.10 -C 100 512 100",
    cmdDesc: { ar: "توليد 100 حزمة في الثانية بحجم 512 بايت", en: "Generate 100 packets per second at 512 bytes each" },
    tags: ["d-itg", "traffic-generator", "qos", "research"]
  },
  {
    id: "t287",
    name: "Ostinato",
    url: "https://ostinato.org",
    category: "traffic",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مولّد حركة بواجهة رسومية وبنية عميل/خادم يتيح صياغة حقول الحزم والتحكم الدقيق في معدلات الإرسال. ملفات التدفق الخاصة به قابلة للتبادل بين الفرق والمختبرات.",
      en: "A GUI-driven traffic generator with a controller/agent design offering per-field packet crafting and precise rate control. Flow files are portable across teams and labs."
    },
    cmd: "ostinato",
    cmdDesc: { ar: "تشغيل واجهة Ostinato الرسومية", en: "Launch the Ostinato GUI" },
    tags: ["ostinato", "traffic-generator", "packet", "gui"]
  },
  {
    id: "t288",
    name: "TRex",
    url: "https://trex-tgn.cisco.com",
    category: "traffic",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مولّد حركة من Cisco يحوّل بطاقات Intel العادية إلى مصدر حمل بمقياس 200Gb/s عبر تقنية DPDK. تدعم البرمجة ببايثون لمحاكاة سلوك حقيقي للتطبيقات.",
      en: "Cisco's traffic generator turning commodity Intel NICs into a 200Gb/s-scale DPDK-powered load source. Python programmability lets it emulate realistic application behaviour."
    },
    cmd: "sudo ./t-rex-64 -f stl/bench.py -m 100",
    cmdDesc: { ar: "تشغيل TRex بمضاعف حمل 100", en: "Start TRex with a load multiplier of 100" },
    tags: ["trex", "dpdk", "cisco", "load-testing"]
  },
  {
    id: "t289",
    name: "packETH",
    url: "https://sourceforge.net/projects/packeth/",
    category: "traffic",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مولّد حزم بواجهة رسومية للإرسال اللحظي والتدفق المستمر مع تحكم كامل في حقول الإيثرنت وIP. خيار عملي لاختبار قواعد الجدران النارية ومرايا التدفق.",
      en: "A GUI packet generator for burst and continuous streams with full control over Ethernet and IP fields. A practical pick for testing firewall rules and flow mirroring."
    },
    cmd: "packeth",
    cmdDesc: { ar: "تشغيل مولّد الحزم packETH", en: "Launch the packETH generator" },
    tags: ["packeth", "packet", "generator", "ethernet"]
  },
  {
    id: "t290",
    name: "trafficgen",
    url: "https://github.com/atheurer/trafficgen",
    category: "traffic",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مجموعة أدوات مفتوحة المصدر تقارن أداء المبدّلات الافتراضية عبر أوضاع الحزم المفردة والمتدفقة بمقاسات مختلفة. تنتج تقارير دقيقة عن معدل الإطارات المفقودة.",
      en: "An open-source test suite benchmarking virtual switches with single and batched packet modes across frame sizes. It produces precise frames-per-second loss reports."
    },
    cmd: "sudo trafficgen --send --recv --frame-size=64 --num-frames=100000",
    cmdDesc: { ar: "إرسال 100 ألف إطار بحجم 64 بايت", en: "Send 100k frames at 64 bytes each" },
    tags: ["trafficgen", "benchmark", "virtual-switch", "linux"]
  },
  {
    id: "t291",
    name: "hping3",
    url: "http://www.hping.org",
    category: "traffic",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة حقن حزم مرنة تركّب TCP وUDP وICMP بأي أعلام وتُستخدم لاختبار الجدران النارية وقياس الاستجابة. تجمع قدرات ping وtraceroute وحقن الحزم في محرك واحد.",
      en: "A flexible packet injection tool that crafts TCP, UDP, and ICMP with any flags, used to probe firewalls and measure responses. It blends ping, traceroute, and packet crafting in one engine."
    },
    cmd: "sudo hping3 -S -p 443 192.168.1.10",
    cmdDesc: { ar: "إرسال حزم SYN إلى منفذ HTTPS", en: "Send SYN packets to an HTTPS port" },
    tags: ["hping3", "packet-crafting", "firewall-test", "tcp"]
  },
  {
    id: "t292",
    name: "MGEN",
    url: "https://github.com/USNavalResearchLaboratory/mgen",
    category: "traffic",
    platform: ["linux", "windows"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مولّد حركة من مختبر أبحاث البحرية الأمريكية يقود تدفقات UDP عبر ملفات سكربت أحداث زمنية. يعمل خلف NAT وجدران الحماية ويسجّل أوقات الاستلام بدقة ميكروثانية.",
      en: "The US Naval Research Laboratory's generator driving UDP flows from timed script files. It works behind NATs and firewalls and logs receive timestamps to microsecond precision."
    },
    cmd: "mgen input traffic.mgn",
    cmdDesc: { ar: "تشغيل سكربت توليد الحركة MGEN", en: "Run an MGEN traffic script" },
    tags: ["mgen", "udp", "traffic-generator", "research"]
  },
  {
    id: "t293",
    name: "Candela LANforge",
    url: "https://www.candelatech.com",
    category: "traffic",
    platform: ["linux"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "منصة اختبار حركة تجارية من Candela تدعم توليد إجهاد بمقاييس مؤسسية واختبار Wi-Fi متعدد العملاء. تُستخدم في مختبرات اعتماد معدات الشبكات قبل اتخاذ قرارات الشراء.",
      en: "Candela's commercial traffic-test platform supporting enterprise-scale load generation and multi-client Wi-Fi testing. Used in equipment-qualification labs before purchase decisions."
    },
    cmd: "./LANforgeGUI",
    cmdDesc: { ar: "فتح واجهة LANforge الرسومية", en: "Open the LANforge GUI client" },
    tags: ["lanforge", "load-testing", "wifi", "commercial"]
  },
  {
    id: "t294",
    name: "bwping",
    url: "http://bwping.sourceforge.net",
    category: "traffic",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة قياس عرض نطاق تعتمد إغراق ICMP Echo بحزم بحجم مضبوط للحفاظ على معدل الإرسال المستهدف. تختبر جودة الوصلة دون الحاجة لتثبيت أي برمجيات في الطرف الآخر.",
      en: "A bandwidth measurement tool flooding ICMP echo packets sized to hold the target rate. It tests link quality without installing anything on the far side."
    },
    cmd: "sudo bwping -b 10000000 -s 1472 -i 1 192.168.1.10",
    cmdDesc: { ar: "اختبار عرض نطاق 10Mbps بحزم ICMP", en: "Test a 10 Mbps bandwidth using ICMP packets" },
    tags: ["bwping", "icmp", "bandwidth", "testing"]
  },
  {
    id: "t295",
    name: "Locust",
    url: "https://locust.io",
    category: "traffic",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار اختبار حمل بواجهة ويب حية يعرّف سلوك المستخدمين بلغة بايثون بديكوراتورات بسيطة. يوزّع ملايين الطلبات على عدة أجهزة عاملة لمحاكاة مستخدمين حقيقيين.",
      en: "A load-testing framework with a live web UI where user behaviour is defined in plain Python. It scales to millions of requests across worker machines to simulate real users."
    },
    cmd: "locust --headless -u 100 -r 10 -H https://shop.example.com",
    cmdDesc: { ar: "تشغيل 100 مستخدم افتراضي بزيادة 10 في الثانية", en: "Run 100 virtual users ramping at 10 per second" },
    tags: ["locust", "load-testing", "python", "http"]
  },
  {
    id: "t296",
    name: "ApacheBench (ab)",
    url: "https://httpd.apache.org/docs/2.4/programs/ab.html",
    category: "traffic",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة اختبار حمل HTTP مدمجة مع خادم أباتشي تُنفّذ بطلب سطر واحد. رغم بساطتها تبقى وسيلة سريعة لقياس الطلبات في الثانية لأي خدمة ويب.",
      en: "The HTTP load tool bundled with Apache that runs with a single command line. Despite its simplicity it stays a quick way to gauge requests-per-second of any web service."
    },
    cmd: "ab -n 1000 -c 100 https://example.com/",
    cmdDesc: { ar: "1000 طلب بتزامن 100 اتصال", en: "1000 requests at a concurrency of 100" },
    tags: ["ab", "benchmark", "http", "apache"]
  },
  {
    id: "t297",
    name: "wrk",
    url: "https://github.com/wg/wrk",
    category: "traffic",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة اختبار حمل HTTP حديثة تحقق تزامنًا هائلًا بفضل تعدد الخيوط وحلقات أحداث لينكس. تدعم لغة Lua لسكربتة السيناريوهات المعقدة أثناء الضغط.",
      en: "A modern HTTP load tool achieving massive concurrency through multithreading and epoll event loops. Lua scripting enables complex scenarios under load."
    },
    cmd: "wrk -t4 -c200 -d30s https://example.com/",
    cmdDesc: { ar: "اختبار 30 ثانية بأربعة خيوط و200 اتصال", en: "A 30-second test with 4 threads and 200 connections" },
    tags: ["wrk", "load-testing", "http", "performance"]
  },
  {
    id: "t298",
    name: "hey",
    url: "https://github.com/rakyll/hey",
    category: "traffic",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة اختبار حمل HTTP مكتوبة بلغة Go كبديل حديث لـ ab بمخرجات ملخصة واضحة. تُثبَّت بملف تنفيذي واحد وتعمل على كل الأنظمة.",
      en: "A Go-written HTTP load tool positioned as a modern ab replacement with a clear summary output. Ships as a single static binary for every platform."
    },
    cmd: "hey -n 1000 -c 50 https://example.com/",
    cmdDesc: { ar: "ألف طلب عبر 50 اتصالًا متزامنًا", en: "1000 requests across 50 concurrent connections" },
    tags: ["hey", "load-testing", "http", "golang"]
  },
  {
    id: "t299",
    name: "vegeta",
    url: "https://github.com/tsenart/vegeta",
    category: "traffic",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة اختبار حمل HTTP ثابتة المعدل تتحكم بعدد الطلبات في الثانية بدقة عالية. تنتج تقارير نصية وHTML ومخططات زمنية لزمن الاستجابة.",
      en: "A constant-rate HTTP load tool controlling requests-per-second with high precision. It outputs text, HTML reports, and latency timeline plots."
    },
    cmd: "vegeta attack -rate=100/s -targets=targets.txt -duration=30s",
    cmdDesc: { ar: "هجوم بمعدل ثابت 100 طلب في الثانية لمدة 30 ثانية", en: "Attack at a constant rate of 100 rps for 30 seconds" },
    tags: ["vegeta", "load-testing", "rate", "http"]
  },
  {
    id: "t300",
    name: "Apache JMeter",
    url: "https://jmeter.apache.org",
    category: "traffic",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة اختبار حمل شاملة بلغة جافا تختبر تطبيقات الويب وقواعد البيانات وبروتوكولات متعددة عبر خطط مرئية. واجهتها الرسومية والتقارير الغنية جعلتها معيارًا في الصناعة.",
      en: "A comprehensive Java load-testing platform covering web apps, databases, and many protocols through visual test plans. Its GUI and rich reports make it an industry standard."
    },
    cmd: "jmeter -n -t test-plan.jmx -l results.jtl",
    cmdDesc: { ar: "تنفيذ خطة اختبار بدون واجهة رسومية", en: "Run a test plan in non-GUI mode" },
    tags: ["jmeter", "load-testing", "java", "performance"]
  }
];
