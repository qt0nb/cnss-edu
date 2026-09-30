import type { Tool } from "@/lib/types";

// ═══════════════════════════════════════════════════════════════════
// TOOLS PART 6 — t501 → t600
// الأقسام: SDN (شبكات محددة البرمجيات) · VoIP (الاتصالات الصوتية عبر IP) ·
// Container (شبكات الحاويات) · Mesh (الشبكات المتشابكة والطبقات العليا)
// Sections: sdn t501–t525 · voip t526–t550 · container t551–t575 · mesh t576–t600
// ═══════════════════════════════════════════════════════════════════

// ─── SDN / وحدات التحكم بالشبكات المُعرَّفة برمجيًا (t501–t525) ───
export const TOOLS_PART6: Tool[] = [
  {
    id: "t501",
    name: "Faucet",
    url: "https://github.com/faucetsdn/faucet",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "وحدة تحكم OpenFlow مفتوحة المصدر مكتوبة بلغة بايثون، تُحوِّل مفاتيح الشبكات التجارية إلى أجهزة يُديرها البرمجيات بمنطق Ryu السابق. تعتمد على إصدارات OpenFlow 1.3 وتستخدم في شبكات الجامعات ومراكز البيانات لبناء شبكة برمجية قابلة للأتمتة والاختبار.",
      en: "An open-source OpenFlow 1.3 controller written in Python that turns commodity switches into programmable network devices. It ships as a Docker container or Debian package and is used in campus and data-center networks for automatable, test-driven network configuration."
    },
    cmd: "sudo systemctl start faucet",
    cmdDesc: {
      ar: "تشغيل خدمة وحدة تحكم Faucet على نظام لينكس.",
      en: "Starts the Faucet controller service on Linux."
    },
    tags: ["faucet", "sdn", "openflow", "controller"]
  },
  {
    id: "t502",
    name: "Open vSwitch",
    url: "https://www.openvswitch.org",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مفتاح افتراضي متعدد الطبقات مفتوح المصدر، يُعد حجر الأساس في بيئات المحاكاة الافتراضية والسحب حيث يربط الأجهزة الافتراضية بالشبكة. يدعم OpenFlow وOVSDB وتقنيات التغليف مثل VXLAN وGRE، ويُدار عبر الأدوات ovs-vsctl وovs-ofctl.",
      en: "A production-quality open-source multilayer virtual switch that is the de-facto dataplane of hypervisors, containers and SDN labs. It supports OpenFlow, OVSDB, VXLAN/GRE tunneling and fine-grained flow-level control for engineers automating virtual networks."
    },
    cmd: "sudo ovs-vsctl show",
    cmdDesc: {
      ar: "عرض جسور وقواعد OVS المُهيَّأة على هذا المضيف.",
      en: "Shows the configured OVS bridges and ports on this host."
    },
    tags: ["ovs", "openvswitch", "sdn", "virtual-switch"]
  },
  {
    id: "t503",
    name: "OVN",
    url: "https://github.com/ovn-org/ovn",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "طبقة تحكم افتراضية مبنية فوق Open vSwitch تضيف خدمات شبكة متقدمة مثل الشبكات المنطقية (L2/L3) والجدران النارية الموزعة وموازنة التحميل. تُستخدم OVN في حلول المحاكاة الافتراضية ومنصات الحاويات وسحب OpenStack لاستبدال عشرات مكونات الشبكة التقليدية بواجهة منطقية واحدة.",
      en: "Open Virtual Network is the distributed control plane built on top of Open vSwitch that adds logical L2/L3 networks, distributed firewalls and load balancing. It powers OpenStack, oVirt and Kubernetes networking, replacing sprawling per-host network state with one logical model."
    },
    cmd: "sudo ovn-nbctl show",
    cmdDesc: {
      ar: "عرض المفاتيح والموجهات المنطقية المسجلة في قاعدة OVN الشمالية.",
      en: "Lists logical switches and routers registered in the OVN northbound database."
    },
    tags: ["ovn", "ovs", "sdn", "network-virtualization"]
  },
  {
    id: "t504",
    name: "Snabb",
    url: "https://github.com/snabbco/snabb",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "طقم أدوات شبكية مفتوح المصدر مكتوب بلغة LuaJIT يعالج الحزم في فضاء المستخدم بسرعة عالية على بطاقات Intel 82599. يُستخدم لتطوير وظائف شبكية سريعة مثل packetblaster لتوليد المرور، ويمثل منهجًا مختلفًا عن C التقليدية في برمجة خطوط نقل الحزم.",
      en: "Snabb is an open-source userspace networking toolkit written in LuaJIT, delivering high-speed packet processing on commodity Intel NICs. Its packetblaster traffic generator and composable apps offer a distinctive alternative approach to building fast dataplanes."
    },
    cmd: "sudo snabb",
    cmdDesc: {
      ar: "عرض أوامر Snabb الفرعية المتاحة مثل packetblaster وlwAFTR.",
      en: "Lists available Snabb subcommands such as packetblaster and lwAFTR."
    },
    tags: ["snabb", "luajit", "userspace", "software-switch"]
  },
  {
    id: "t505",
    name: "FD.io VPP",
    url: "https://fd.io",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "مُوجِّه حزم متجهي (Vector Packet Processing) يعمل في فضاء المستخدم ويستفيد من DPDK لتحقيق إرسال بملايين الحزم في الثانية على عتاد تجاري. يدعم بروتوكولات تخاطب غنية (IP/MPLS/VXLAN) وواجهات برمجية مريحة عبر gRPC وCLI، ما يجعله محبًا لدى مهندسي منصات SDN/NFV.",
      en: "FD.io VPP is an open-source vector packet processor running in userspace on DPDK, delivering millions of packets per second on commodity x86 servers. With its rich protocol stack (IP, MPLS, VXLAN) and management APIs it is a favorite dataplane for SDN and NFV platforms."
    },
    cmd: "sudo vppctl show interface",
    cmdDesc: {
      ar: "عرض واجهات VPP وحالتها عبر أداة vppctl.",
      en: "Lists VPP interfaces and their state via vppctl."
    },
    tags: ["vpp", "fdio", "sdn", "dataplane"]
  },
  {
    id: "t506",
    name: "P4 Behavioral Model (bmv2)",
    url: "https://github.com/p4lang/behavioral-model",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "تنفيذ برمجي مرجعي لمفاتيح P4 يُسمى bmv2، يتيح تنفيذ برامج P4 وتجربة سلوك المفتاح قبل نشره على عتاد حقيقي. أداة أساسية لمن يتعلم البرمجة بلغة P4 لتخصيص مسار معالجة الحزم في شبكات محددة البرمجيات.",
      en: "The open-source reference software switch (bmv2) that executes P4 programs so engineers can prototype dataplane behavior before targeting real ASICs. It is the standard tool for learning and testing P4-programmable pipelines in SDN research and product development."
    },
    cmd: "simple_switch --help",
    cmdDesc: {
      ar: "استعراض خيارات مشغل مفاتيح simple_switch المرجعي.",
      en: "Shows options of the simple_switch reference target."
    },
    tags: ["p4", "bmv2", "sdn", "programmable-dataplane"]
  },
  {
    id: "t507",
    name: "P4 Compiler (p4c)",
    url: "https://github.com/p4lang/p4c",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "المُصرِّف الرسمي للغة P4 يترجم برامج الشبكة القابلة للبرمجة إلى أهداف متعددة مثل bmv2 وTofino وP4Runtime. يمنح مهندس الشبكات القدرة على التحقق من منطق معالجة الحزم والتقاط الأخطاء قبل وصولها إلى المفتاح.",
      en: "p4c is the reference compiler for the P4 language, translating P4 programs to targets such as bmv2, P4Runtime and hardware ASICs. It lets network engineers validate dataplane logic and catch errors long before deploying to production switches."
    },
    cmd: "p4c --target bmv2 --arch v1model basic.p4",
    cmdDesc: {
      ar: "تصريف برنامج P4 إلى ملف JSON لمحاكي bmv2.",
      en: "Compiles a P4 program into bmv2 JSON for the software switch."
    },
    tags: ["p4", "p4c", "compiler", "sdn"]
  },
  {
    id: "t508",
    name: "FRRouting",
    url: "https://frrouting.org",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "طقم توجيه مفتوح المصدر يوفر تنفيذات OSPF وIS-IS وBGP وRIP وBFD ضمن عملية واحدة موحدة. امتداد شائع لخوادم لينكس ومفاتيح الصناديق البيضاء (Whitebox) لبناء موجهات برمجية مرنة بدل الموجهات الاحتكارية المكلفة.",
      en: "FRRouting (FRR) is a free routing protocol suite implementing OSPF, IS-IS, BGP, RIP and BFD in a unified daemon. It turns Linux servers and whitebox switches into full routers, making it a cornerstone of disaggregated and SDN-adjacent network designs."
    },
    cmd: "sudo vtysh -c 'show ip route'",
    cmdDesc: {
      ar: "عرض جدول التوجيه IP عبر واجهة إدارة FRR.",
      en: "Displays the IP routing table via the FRR management shell."
    },
    tags: ["frr", "frrouting", "bgp", "routing"]
  },
  {
    id: "t509",
    name: "Switch Abstraction Interface (SAI)",
    url: "https://github.com/opencomputeproject/SAI",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "واجهة قياسية من مشروع OCP تُوحِّد برمجة رقائق مفاتيح الشبكة من مختلف المصنعين (Broadcom وMellanox وغيرهما). تسمح SAI لنظام تشغيل الشبكة نفسه مثل SONiC بالعمل على أي عتاد يدعمها، وهو جوهر فكرة فصل العتاد عن البرمجيات في مركز البيانات.",
      en: "OCP's Switch Abstraction Interface is an open API that standardizes how NOS software programs switching silicon from Broadcom, Marvell, Mellanox and others. It lets the same network OS (e.g. SONiC) run on any compliant switch, the core of datacenter disaggregation."
    },
    tags: ["sai", "ocp", "sonic", "sdn", "whitebox"]
  },
  {
    id: "t510",
    name: "Cumulus Linux",
    url: "https://www.cumulusnetworks.com",
    category: "sdn",
    platform: ["linux"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "نظام تشغيل شبكي مبني على دبيان لمفاتيح الصناديق البيضاء، يمنح مهندس الشبكات أدوات لينكس المألوفة (أوامر ip وFRR وOVS) داخل مفتاح فعلي. دمج أدوات SDN مفتوحة المصدر مع عتاد تجاري رخيص وتحويل مركز البيانات إلى شبكة تعمل كمجموعة خوادم.",
      en: "Cumulus Linux is a Debian-based network operating system for whitebox switches that brings familiar Linux tooling (ip, FRR, OVS) onto real hardware. It merges open SDN components with affordable merchant silicon, letting datacenters treat switches like servers."
    },
    cmd: "net show all",
    cmdDesc: {
      ar: "عرض حالة الواجهات والجسور والتوجيه في Cumulus بلمحة واحدة.",
      en: "Summarizes interfaces, bridges and routing status on Cumulus in one view."
    },
    tags: ["cumulus", "linux", "nos", "whitebox"]
  },
  {
    id: "t511",
    name: "Pica8 PicOS",
    url: "https://www.pica8.com",
    category: "sdn",
    platform: ["linux"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "نظام تشغيل شبكي تجاري لمفاتيح الصناديق البيضاء يجمع بين وضع SDN عبر OpenFlow ووضع التوجيه التقليدي L2/L3 في صورة واحدة. يمنح المرونة في اختيار العتاد مع دعم التحكم المركزي أو الموزع حسب تصميم الشبكة.",
      en: "PicOS is a commercial network OS for whitebox switches offering both traditional L2/L3 switching and OpenFlow-based SDN mode in one image. It gives engineers hardware freedom with a choice between centralized controller or autonomous operation."
    },
    cmd: "cli",
    cmdDesc: {
      ar: "الدخول إلى واجهة PicOS الإدارية على المفتاح.",
      en: "Enters the PicOS management CLI on the switch."
    },
    tags: ["pica8", "picos", "nos", "openflow"]
  },
  {
    id: "t512",
    name: "NoviWare",
    url: "https://www.noviflow.com",
    category: "sdn",
    platform: ["linux"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "نظام تشغيل شبكي متقدم من NoviFlow لمفاتيح NoviSwitch عالية الأداء، يركّز على OpenFlow 1.3/1.4 مع برمجة تدفقات بملايين الإدخالات. شائع في مراكز تبادل المرور والشبكات التي تحتاج تفريعًا وتفتيشًا مرنًا للحزم بسرعات 100G وأعلى.",
      en: "NoviWare is NoviFlow's network OS for high-performance NoviSwitch hardware, focused on OpenFlow 1.3/1.4 with millions of flow entries. It is popular at IXPs and in networks needing flexible packet steering and inspection at 100G+ speeds."
    },
    cmd: "novi-cli",
    cmdDesc: {
      ar: "فتح واجهة سطر الأوامر NoviCLI لإدارة مفتاح NoviSwitch.",
      en: "Opens the NoviCLI command shell to manage a NoviSwitch."
    },
    tags: ["noviflow", "noviware", "openflow", "sdn"]
  },
  {
    id: "t513",
    name: "Juniper Apstra",
    url: "https://www.juniper.net/us/en/products/network-automation/apstra.html",
    category: "sdn",
    platform: ["web"],
    license: "freemium",
    difficulty: 4,
    desc: {
      ar: "منصة أتمتة قائمة على النية (Intent-Based) لمشغّلات مراكز البيانات، تُصمِّم الشبكة من متطلبات مرتفع المستوى ثم تتحقق باستمرار من مطابقة الحالة الفعلية للنوايا. تسجّل كل تغيير وتلتقط الاختلافات (Drift) لتوفير شبكة ذاتية التدقيق وتقليل أخطاء التهيئة اليدوية.",
      en: "Juniper Apstra is intent-based automation software that models datacenter fabrics from high-level requirements and continuously verifies the live state against that intent. It records every change, catches drift and dramatically reduces human configuration errors in EVPN/VXLAN fabrics."
    },
    tags: ["apstra", "juniper", "intent-based", "automation", "ibn"]
  },
  {
    id: "t514",
    name: "Cisco ACI",
    url: "https://www.cisco.com/go/aci",
    category: "sdn",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "بنية Cisco المتمركزة حول التطبيقات (ACI) التي تُدير نسيج VXLAN في مراكز البيانات عبر وحدة تحكم APIC مركزية. تُعرِّف الشبكة بسياسات (Contracts) تربط نقاط النهاية بدل إدارة منفذ منفذ، مع تكامل مع الحوسبة والسحابة والتنسيق الآلي.",
      en: "Cisco Application Centric Infrastructure is a policy-based SDN fabric for datacenters, centrally managed by the APIC controller. It defines connectivity through application contracts rather than per-port config, integrating with hypervisors, clouds and orchestration."
    },
    cmd: "ssh admin@apic1",
    cmdDesc: {
      ar: "الدخول عبر SSH إلى وحدة تحكم APIC لإدارة النسيج من سطر الأوامر.",
      en: "Logs in to the APIC controller CLI to manage the fabric."
    },
    tags: ["cisco", "aci", "apic", "vxlan", "sdn"]
  },
  {
    id: "t515",
    name: "VMware NSX",
    url: "https://www.vmware.com/products/nsx.html",
    category: "sdn",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "منصة افتراضية للشبكة والأمان من VMware تنشئ شبكات L2/L3 كاملة بالبرمجيات فوق أي عتاد IP. توفر مفاتيح موزعة وجدرانًا نارية ومعايير دقيقة للخدمة وتشاتن البيانات، وتُعد الرائدة تجاريًا في شبكات مراكز البيانات الافتراضية.",
      en: "VMware NSX virtualizes the entire network stack, delivering software-based L2/L3, distributed firewalls and micro-segmentation on top of any IP transport. It is the commercial leader in network virtualization for SDDC and multi-cloud datacenters."
    },
    tags: ["vmware", "nsx", "network-virtualization", "microsegmentation"]
  },
  {
    id: "t516",
    name: "ONIE",
    url: "https://opencomputeproject.github.io/onie/",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "بيئة تثبيت مفتوحة للشبكات (Open Network Install Environment) تعمل على مفاتيح الصناديق البيضاء قبل تحميل أي نظام تشغيل. تتيح للمهندس تثبيت نظام NOS من اختياره (SONiC أو Cumulus أو غيرهما) عبر الشبكة أو USB، وهي التي جعلت حرية اختيار برمجيات المفاتيح ممكنة.",
      en: "ONIE is the open install environment pre-loaded on whitebox switches that lets you install any network OS over the network or USB. It is the bootstrapping layer that makes NOS freedom — SONiC, Cumulus, OpX — actually practical."
    },
    cmd: "onie-nos-install",
    cmdDesc: {
      ar: "أمر ONI داخل بيئة ONE لتثبيت صورة نظام تشغيل الشبكة.",
      en: "ONIE command that installs a network OS image onto the switch."
    },
    tags: ["onie", "ocp", "whitebox", "installer", "sdn"]
  },
  {
    id: "t517",
    name: "Indigo",
    url: "https://github.com/floodlight/indigo",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار مفتوح المصدر لبناء وكلاء المفاتيح (Switch Agents) المتوافقة مع OpenFlow على عتاد متنوع، طوّرته Big Switch Networks. يُترجم أوامر OpenFlow القادمة من وحدة التحكم إلى عمليات على الجداول والأجهزة الفعلية، ويُعد مرجعًا كلاسيكيًا في تنفيذ مفاتيح SDN.",
      en: "Indigo is Big Switch's open-source framework for building OpenFlow switch agents on merchant hardware. It translates controller flow commands into silicon-level table operations and remains a classic reference implementation in SDN switch software."
    },
    cmd: "make",
    cmdDesc: {
      ar: "تصريف وكلاء Indigo من المصدر على لينكس.",
      en: "Builds the Indigo switch agent libraries from source."
    },
    tags: ["indigo", "bigswitch", "openflow", "sdn"]
  },
  {
    id: "t518",
    name: "FlowVisor",
    url: "https://github.com/OPENNETWORKINGLAB/flowvisor",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مُشغِّل افتراضي (Hypervisor) للشبكات من ستانفورد يقطّع المفتاح الواحد إلى شرائح معزولة، كل شريحة لها وحدة تحكم OpenFlow خاصة وصلاحيات محددة. ساهم مبكرًا في مفهوم الشبكات كخدمة (NaaS) وقابلية تقسيم البنية التحتية بين عدة مستخدمين.",
      en: "FlowVisor is Stanford's network hypervisor that slices one physical switch into isolated partitions, each with its own OpenFlow controller. It pioneered network-as-a-service slicing, letting multiple experiments or tenants share the same infrastructure safely."
    },
    cmd: "fvctl listSlices",
    cmdDesc: {
      ar: "عرض شرائح الشبكة المعرَّفة في FlowVisor.",
      en: "Lists the network slices defined in FlowVisor."
    },
    tags: ["flowvisor", "openflow", "slicing", "sdn"]
  },
  {
    id: "t519",
    name: "LoxiGen",
    url: "https://github.com/floodlight/LoxiGen",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مُولِّد روابط (Bindings) لبروتوكول OpenFlow ينتج مكتبات تحليل وبناء رسائل OpenFlow بلغات C وPython وJava من ملفات تعريف موحدة. أداة عملية لمن يكتب وحدات تحكم أو مفاتيح OpenFlow ويحتاج تعاملًا دقيقًا ومُحدَّثًا مع بروتوكول الرسائل.",
      en: "LoxiGen generates OpenFlow protocol libraries for C, Python and Java from a single specification, keeping message encoding and parsing consistent. It is a practical asset for developers building OpenFlow controllers or switches that need exact protocol handling."
    },
    cmd: "./loxigen.py --lang=python",
    cmdDesc: {
      ar: "توليد روابط OpenFlow بلغة بايثون عبر LoxiGen.",
      en: "Generates the Python OpenFlow bindings with LoxiGen."
    },
    tags: ["loxigen", "openflow", "code-generation", "sdn"]
  },
  {
    id: "t520",
    name: "Lagopus",
    url: "https://github.com/lagopus/lagopus",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مفتاح برمجي وموجِّه عالي الأداء مفتوح المصدر من اليابان، يدعم OpenFlow وOVSDB وDPDK لمعالجة الحزم بسرعات عالية على عتاد x86. مصدر ممتاز لدراسة بنية المفاتيح البرمجية الحديثة وتجربة نواة نقل بديلة عن OVS.",
      en: "Lagopus is an open-source high-quality software switch/router from Japan supporting OpenFlow, OVSDB and DPDK on commodity x86 hardware. It is a strong alternative dataplane to OVS for SDN experiments and studying modern switch architecture."
    },
    cmd: "lagopus --help",
    cmdDesc: {
      ar: "استعراض خيارات تشغيل مفتاح Lagopus.",
      en: "Shows the Lagopus software switch startup options."
    },
    tags: ["lagopus", "software-switch", "openflow", "dpdk"]
  },
  {
    id: "t521",
    name: "Atrium",
    url: "https://github.com/onfsdn/atrium",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إصدار متكامل من مشروع ONF يجمع وحدة تحكم (ONOS أو Faucet) ومفاتيح أطراف جاهزة (Indigo) لتشغيل نسيج OpenFlow مفتوح المصدر من البداية للنهاية. يوفر مرجعًا عمليًا كاملًا لبناء شبكة SDN حقيقية بمكونات مفتوحة فقط.",
      en: "Atrium is ONF's integrated open SDN software release combining a controller (ONOS or Faucet) with ready edge-switch agents to run an end-to-end OpenFlow fabric. It serves as a complete, working reference for building production SDN from open parts only."
    },
    cmd: "sudo mn --controller=remote --switch=ovsk,protocols=OpenFlow13",
    cmdDesc: {
      ar: "اختبار نسيج Atrium عبر Mininet مع وحدة تحكم OpenFlow 1.3.",
      en: "Tests the Atrium fabric in Mininet against an OpenFlow 1.3 controller."
    },
    tags: ["atrium", "onf", "openflow", "fabric"]
  },
  {
    id: "t522",
    name: "BESS",
    url: "https://github.com/NetSys/bess",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "المفتاح البرمجي القابل للتوسيع من جامعة بيركلي، يُبنى مسار معالجة الحزم من وحدات (Modules) صغيرة تُركَّب ديناميكيًا عبر bessctl دون إعادة تشغيل. مثالي لمن يُجري أبحاث وظائف شبكية مخصصة بسرعة عالية قبل تنفيذها على عتاد.",
      en: "The Berkeley Extensible Software Switch lets you compose packet pipelines from pluggable modules, reconfiguring them live through bessctl without restart. Ideal for prototyping custom network functions at high speed before committing to hardware."
    },
    cmd: "sudo bessctl run pipeline",
    cmdDesc: {
      ar: "تحميل مسار معالجة حزم إلى BESS عبر bessctl.",
      en: "Loads a packet-processing pipeline into BESS via bessctl."
    },
    tags: ["bess", "berkeley", "software-switch", "ebpf", "sdn"]
  },
  {
    id: "t523",
    name: "sFlow-RT",
    url: "https://sflow-rt.com",
    category: "sdn",
    platform: ["cross"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "محرك تحليل فوري لبيانات sFlow يحوّل تدفق القياسات إلى مؤشرات وشبكات SDN تتفاعل معها، عبر REST API وقواعد تعريف بجافاسكربت. يُستخدم لرصد كشف DDOS مبكرًا وموازنة التحميل التكيفي وضبط التوجيه لحظيًا.",
      en: "sFlow-RT is a real-time analytics engine that turns streaming sFlow telemetry into actionable metrics, defining thresholds and driving SDN control via REST. It powers DDoS mitigation, adaptive load balancing and sub-second traffic steering."
    },
    cmd: "java -jar sflow-rt.jar",
    cmdDesc: {
      ar: "تشغيل خادم تحليل sFlow-RT الذي يستمع لبيانات sFlow.",
      en: "Starts the sFlow-RT analytics server listening for sFlow datagrams."
    },
    tags: ["sflow", "analytics", "real-time", "sdn"]
  },
  {
    id: "t524",
    name: "Frenetic",
    url: "https://github.com/frenetic-lang/frenetic",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "لغة برمجية عالية المستوى لوصف سياسات حزم الشبكة، ترتقي فوق قواعد OpenFlow اليدوية وتتولى توليدها وترتيبها تلقائيًا. من مشاريع جامعة برنستون الرائدة في تسهيل برمجة وحدات تحكم SDN بمنطق تصريحي أقل عرضة للخطأ.",
      en: "Frenetic is a high-level language for describing packet-processing policies that compiles down to OpenFlow rules, handling rule ordering and conflicts automatically. From Princeton, it made SDN controller programming declarative and far less error-prone."
    },
    cmd: "frenetic --help",
    cmdDesc: {
      ar: "استعراض خيارات مصرف ووحدة تحكم Frenetic.",
      en: "Shows options of the Frenetic language toolchain."
    },
    tags: ["frenetic", "policy", "openflow", "sdn", "dsl"]
  },
  {
    id: "t525",
    name: "VOLTHA",
    url: "https://docs.voltha.org",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "مشروع ONF الافتراضي المفتوح لأجهزة PON (OLT) يوحّد التحكم في شبكات الألياف البصرية السلبية عبر واجهات OpenFlow وgNMI القياسية. يدير عدة أنواع من OLT بنفس النموذج ويعمل في حاويات Kubernetes مع أدوات ONOS و voltctl.",
      en: "VOLTHA is the Open Networking Foundation's virtual OLT project, abstracting PON access networks behind standard OpenFlow and gNMI northbound interfaces. It unifies heterogeneous OLT hardware under one controller stack running on Kubernetes with ONOS and voltctl."
    },
    cmd: "voltctl devices list",
    cmdDesc: {
      ar: "عرض أجهزة OLT المسجلة في VOLTHA عبر voltctl.",
      en: "Lists OLT devices registered with VOLTHA using voltctl."
    },
    tags: ["voltha", "pon", "olt", "onf", "access-network"]
  },

  // ─── VoIP / الاتصالات الهاتفية عبر IP (t526–t550) ───
  {
    id: "t526",
    name: "Asterisk",
    url: "https://www.asterisk.org",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أشهر بدالة برمجية PBX مفتوحة المصدر في العالم، تحوّل أي خادم لينكس إلى بدالة هاتفية كاملة بخطوط SIP وقوائم انتظار وبريد صوتي. تدعم ترميزات صوتية وقنوات PRI وGSM وتُشغِّل آلاف مراكز الاتصال حول العالم.",
      en: "Asterisk is the world's most widely deployed open-source PBX, turning any Linux server into a full telephone system with SIP trunks, IVR, voicemail and call queues. It supports PRI, GSM and virtually every voice codec, powering countless contact centers worldwide."
    },
    cmd: "sudo asterisk -rvv",
    cmdDesc: {
      ar: "الدخول إلى وحدة تحكم Asterisk التفاعلية مع رسائل مطوّلة.",
      en: "Connects to the Asterisk CLI in verbose mode."
    },
    tags: ["asterisk", "pbx", "sip", "voip"]
  },
  {
    id: "t527",
    name: "FreeSWITCH",
    url: "https://www.freeswitch.org",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "منصة اتصالات مفتوحة المصدر قابلة للتوسع تعمل كبدالة ونواة وسائط متعددة (Softswitch) للصوت والفيديو والرسائل. تتغلب على Asterisk في تشغيل آلاف المكالمات المتزامنة، وتشمل دعم WebRTC وSIP وSkype قديمًا عبر مكونات نمطية.",
      en: "FreeSWITCH is a scalable open-source softswitch and telephony platform for voice, video and messaging. It handles thousands of concurrent calls per instance and supports WebRTC, SIP and modular endpoints, serving as the engine for many commercial UC products."
    },
    cmd: "fs_cli",
    cmdDesc: {
      ar: "فتح وحدة تحكم FreeSWITCH التفاعلية لمتابعة القنوات والتصحيح.",
      en: "Opens the FreeSWITCH live console for channel status and debugging."
    },
    tags: ["freeswitch", "softswitch", "voip", "webrtc"]
  },
  {
    id: "t528",
    name: "Kamailio",
    url: "https://www.kamailio.org",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "خادم SIP مفتوح المصدر عالي الأداء يعالج مئات المكالمات في الثانية، يُستخدم كخادم تسجيل وتوجيه وكبوابة حدود SBC. يدعم WebSocket لـ WebRTC وموازنة التحميل والتكامل مع Asterisk وFreeSWITCH وتوابع IMS لشبكات المحمول.",
      en: "Kamailio is a high-performance open-source SIP server routing hundreds of calls per second, used as registrar, proxy and session border controller. It supports WebRTC over WebSockets, load balancing, IMS extensions and integration with Asterisk/FreeSWITCH."
    },
    cmd: "kamcmd core.uptime",
    cmdDesc: {
      ar: "مدة تشغيل خادم Kamailio عبر واجهة kamcmd الإدارية.",
      en: "Queries Kamailio uptime via the kamcmd management interface."
    },
    tags: ["kamailio", "sip", "proxy", "sbc"]
  },
  {
    id: "t529",
    name: "OpenSIPS",
    url: "https://github.com/OpenSIPS/opensips",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خادم SIP متعدد الأغراض انشق عن SER القديم، يوفر توجيهًا مرنًا بلغة تكوين نصية ونحو 120 وحدة وظيفية للتعبئة والتوجيه والتعقب. خيار شائع كبوابة شركات ومدير اعتماد HSS في بنى IMS وVoLTE التجريبية.",
      en: "OpenSIPS is a versatile open-source SIP server forked from SER, offering script-driven routing plus 120+ modules for accounting, dispatching and fraud prevention. It is a common choice for enterprise SIP trunks and IMS/VoLTE lab deployments."
    },
    cmd: "opensips-cli",
    cmdDesc: {
      ar: "تشغيل أداة الإدارة التفاعلية لخادم OpenSIPS.",
      en: "Launches the OpenSIPS interactive management CLI."
    },
    tags: ["opensips", "sip", "proxy", "voip"]
  },
  {
    id: "t530",
    name: "SIPp",
    url: "https://github.com/SIPp/sipp",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة اختبار أداء وضغط لبروتوكول SIP تنشئ مكالمات اصطناعية بمعدلات ومراحل مبرمجة ملفات XML. المعيار الفعلي لاختبار سعة البدالات وخوادم SIP قبل إطلاقها في الإنتاج، وتعمل على لينكس وويندوز.",
      en: "SIPp is the de-facto open-source SIP traffic generator for stress-testing registrars, proxies and PBXes with XML-scenario-driven calls. It generates thousands of concurrent calls with RTP statistics, running on Linux, Windows and macOS."
    },
    cmd: "sipp -sn uac 192.168.1.10:5060",
    cmdDesc: {
      ar: "تشغيل سيناريو المتصل uac الافتراضي نحو هدف SIP عبر SIPp.",
      en: "Runs the default UAC scenario against a SIP target with SIPp."
    },
    tags: ["sipp", "sip", "testing", "load-test"]
  },
  {
    id: "t531",
    name: "PJSIP",
    url: "https://github.com/pjsip/pjproject",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة اتصالات مفتوحة المصدر بلغة C تُنفِّذ SIP وRTP وICE وSRTP وWebRTC في حزمة واحدة صغيرة الحجم. تُضمَّن في مئات المنتجات من تطبيقات الهاتف الناعم إلى البدالات الصلبة، وتجمعها واجهة علوية سهلة اسمها PJSUA2.",
      en: "PJSIP is the compact open-source C stack combining SIP, RTP, ICE, SRTP and WebRTC in one embeddable library. It ships inside hundreds of softphones, gateways and PBXes, with the PJSUA2 API layering a friendly interface over the stack."
    },
    cmd: "pjsua --help",
    cmdDesc: {
      ar: "استعراض خيارات تطبيق pjsua النموذجي المبني على مكتبة PJSIP.",
      en: "Shows options of pjsua, the reference softphone built on PJSIP."
    },
    tags: ["pjsip", "sip", "stack", "webrtc"]
  },
  {
    id: "t532",
    name: "reSIProcate",
    url: "https://www.resiprocate.org",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "طقم SIP مفتوح المصدر مكتوب بـ C++ يقدم مكدسًا برمجيًا قويًا وخادم وكيل repro يفهم أسرار معايير RFC المعقدة. يُنتقد صعوبة تعلمه لكنه يتمتع بسمعة امتثال صارم للمعايير مع بنية مرنة للبناء عليها.",
      en: "reSIProcate is a mature C++ SIP stack and proxy (repro) known for strict RFC compliance and a clean architecture. Its reputation for standards conformance makes it a trusted building block for carriers and interoperability testing."
    },
    cmd: "repro",
    cmdDesc: {
      ar: "تشغيل خادم وكيل SIP reSIProcate repro بعد تهيئته.",
      en: "Starts the reSIProcate repro SIP proxy after configuration."
    },
    tags: ["resiprocate", "sip", "proxy", "stack"]
  },
  {
    id: "t533",
    name: "Sofia-SIP",
    url: "https://github.com/freeswitch/sofia-sip",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكدس SIP بلغة C طورته Nokia ثم تبنّاه مشروع FreeSWIFT ليصبح نواة SIP في FreeSWITCH. مثال تعليمي ممتاز لدراسة NUA وقواعد SDP الرقمية وكيف تُبنى كومة SIP قابلة للتضمين في منتجات صوتية متعددة.",
      en: "Sofia-SIP is the compact C SIP stack originally developed by Nokia and adopted as FreeSWITCH's SIP engine. It is a solid reference for studying SIP user agents, SDP handling and embedding telephony stacks into products."
    },
    cmd: "./autogen.sh && ./configure",
    cmdDesc: {
      ar: "توليد ملفات البناء وتهيئة تصريف مكتبة Sofia-SIP.",
      en: "Bootstraps the build system and configures the Sofia-SIP library."
    },
    tags: ["sofia-sip", "sip", "stack", "freeswitch"]
  },
  {
    id: "t534",
    name: "RTPengine",
    url: "https://github.com/sipwise/rtpengine",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "معالج وسائط من Sipwise يُدير تدفقات RTP ويقوم بتحويل الترميز (Transcoding) ومزج الوسائط وتشفير SRTP وDTLS لبروتوكول WebRTC. يعمل مع Kamailio وOpenSIPS عبر بروتوكول ng، ويُشغَّل في بيئات MVNO وشبكات WebRTC واسعة النطاق.",
      en: "RTPengine from Sipwise is a high-performance media relay handling RTP, transcoding, recording, SRTP and WebRTC's DTLS. It pairs with Kamailio/OpenSIPS over the ng control protocol and scales to large WebRTC and carrier deployments."
    },
    cmd: "rtpengine --interface=eth0 --listen-ng=127.0.0.1:2223",
    cmdDesc: {
      ar: "تشغيل RTPengine بواجهة وسائط وقناة تحكم ng عبر UDP.",
      en: "Starts RTPengine with a media interface and the ng control channel."
    },
    tags: ["rtpengine", "rtp", "webrtc", "media-relay"]
  },
  {
    id: "t535",
    name: "HOMER SIPcapture",
    url: "https://www.sipcapture.org",
    category: "voip",
    platform: ["web", "linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة التقاط وتحليل رسائل SIP وHep مفتوحة المصدر تجمع بيانات المكالمات من عوامل heplify في قاعدة بيانات ضخمة. تُصوِّر تدفق الرسائل على مخططات تفاعلية وتُصنِّف مكالمات VoIP المعطلة بسرعة، وهي معيار في مراكز NOC الكبرى.",
      en: "HOMER is the open-source capture and analysis platform that ingests SIP/Hep vantage points into big storage and renders interactive call flows. It is the go-to troubleshooting platform for VoIP/RTC operations teams debugging failed and degraded calls."
    },
    cmd: "heplify -i eth0",
    cmdDesc: {
      ar: "تشغيل عامل التقاط heplify على واجهة شبكة لالتقاط رسائل SIP.",
      en: "Runs the heplify capture agent on an interface to ship SIP to HOMER."
    },
    tags: ["homer", "sipcapture", "hep", "voip-troubleshooting"]
  },
  {
    id: "t536",
    name: "SIPVicious",
    url: "https://github.com/enablesecurity/sipvicious",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "طقم أدوات أمنية لفحص بنية SIP من EnableSecurity، يكتشف ملقمات SIP ويفحص الملحقات وينفذ هجمات القوة الغاشمة ضد امتدادات VoIP. يُستخدم اختباريًا لتقييم أمان البدالات قبل تشغيلها.",
      en: "SIPVicious is EnableSecurity's toolkit for auditing SIP devices: scanning extensions, fingerprinting servers and brute-forcing VoIP accounts. It is the standard tool for authorized penetration tests of PBX and UC infrastructure."
    },
    cmd: "svmap 192.168.1.0/24",
    cmdDesc: {
      ar: "مسح شبكة فرعية للكشف عن خوادم SIP عبر svmap.",
      en: "Scans a subnet to discover SIP services with svmap."
    },
    tags: ["sipvicious", "sip", "security", "audit"]
  },
  {
    id: "t537",
    name: "FreePBX",
    url: "https://www.freepbx.org",
    category: "voip",
    platform: ["linux", "web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "واجهة إدارة رسومية مجانية فوق Asterisk تُحوِّل ملفات التهيئة النصية إلى نماذج ويب سهلة. تتيح إنشاء امتدادات وقوائم IVR ومجموعات الاتصال والرسائل الصوتية بدقائق، وهي الأساس لأكثر من مليون بدالة حول العالم.",
      en: "FreePBX is the free web GUI layered over Asterisk that turns dialplan files into friendly forms. It lets you build extensions, IVR, ring groups and voicemail in minutes and powers over a million installs worldwide."
    },
    cmd: "fwconsole status",
    cmdDesc: {
      ar: "عرض حالة خدمات FreePBX وAsterisk من سطر الأوامر.",
      en: "Reports FreePBX and Asterisk service status from the shell."
    },
    tags: ["freepbx", "asterisk", "pbx", "gui"]
  },
  {
    id: "t538",
    name: "Kazoo",
    url: "https://github.com/2600hz/kazoo",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "منصة UCaaS مفتوحة المصدر من 2600Hz مبنية بنمط موزّع عبر قاعدة بيانات CouchDB وRabbitMQ وخوادم FreeSWITCH. تُدير مستأجرين متعددين مع واجهات API وSDK غنية، خيار قوي لمن يبني خدمة سحابية هاتفية كاملة.",
      en: "Kazoo is 2600Hz's open-source, multi-tenant UCaaS platform built on Erlang with RabbitMQ, CouchDB and FreeSWITCH media servers. Its rich APIs and SDKs make it a serious foundation for launching your own carrier-grade cloud telephony service."
    },
    cmd: "sup status",
    cmdDesc: {
      ar: "الاستعلام عن حالة عمليات Kazoo عبر أمر sup.",
      en: "Checks Kazoo application status via the sup command."
    },
    tags: ["kazoo", "2600hz", "ucaas", "freeswitch"]
  },
  {
    id: "t539",
    name: "Wazo Platform",
    url: "https://wazo-platform.org",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة اتصالات موحدة مفتوحة المصدر تُبنى من خدمات مستقلة (wazo-auth وwazo-routerd وغيرها) تُنسَّق عبر REST APIs. تدمج Asterisk للوسائط وتوفر بنية مرنة للتطوير والكتابة فوقها بالتقنيات الحديثة.",
      en: "Wazo Platform is an open-source unified communications stack composed of independent microservices coordinated through REST APIs. Built on Asterisk for media, it offers a modern, developer-friendly architecture for custom UC solutions."
    },
    cmd: "systemctl status wazo-auth",
    cmdDesc: {
      ar: "فحص حالة خدمة المصادقة wazo-auth في منصة Wazo.",
      en: "Checks the wazo-auth authentication service status."
    },
    tags: ["wazo", "uc", "asterisk", "api"]
  },
  {
    id: "t540",
    name: "Issabel",
    url: "https://www.issabel.org",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "توزيعة اتصالات مفتوحة المصدر وريثة Elastix الناجحة، تُثبِّت Asterisk وFreePBX مع أدوات مراقبة وبلينغ وتقارير جاهزة. تُقلِّص وقت إنشاء بدالة مؤسسية كاملة إلى أقل من ساعة عبر واجهة ويب عربية وداعمة لعدة لغات.",
      en: "Issabel is the open-source UC distribution carrying the Elastix legacy, installing Asterisk, FreePBX, billing and reporting in one ISO. It cuts a full business telephony deployment to under an hour with a polished multilingual web interface."
    },
    tags: ["issabel", "elastix", "pbx", "asterisk"]
  },
  {
    id: "t541",
    name: "VICIdial",
    url: "https://github.com/VICIdial/VICIdial",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "نظام مراكز اتصال مفتوح المصدر مبني على Asterisk يدير الحملات الصادرة ولوحات الوكلاء والاتصال التنبؤي. يعمل على عتاد عادي ويخدم مئات الوكلاء المتزامنين، وهو خيار قائم منذ زمن طويل لمراكز الاتصال الاقتصادية.",
      en: "VICIdial is the open-source call-center suite built on Asterisk, handling outbound campaigns, agent screens and predictive dialing. Running on commodity hardware, it serves hundreds of simultaneous agents and has powered budget contact centers for years."
    },
    tags: ["vicidial", "callcenter", "asterisk", "dialer"]
  },
  {
    id: "t542",
    name: "Jambonz",
    url: "https://www.jambonz.org",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة CPaaS مفتوحة المصدر بديلة عن Twilio، تُبرمج تطبيقات الصوت والـ WebRTC عبر Webhooks وأدوات بديلة مبنية على Drachtio وRTPengine. تُنشر ذاتيًا أو في Kubernetes وتدعم أي مزود LLM أو STT حديث.",
      en: "Jambonz is an open-source CPaaS that lets you build voice and WebRTC applications via webhooks, powered by Drachtio and RTPengine. Self-hosted or on Kubernetes, it plugs into modern LLMs and speech engines for conversational AI telephony."
    },
    tags: ["jambonz", "cpaas", "voiceai", "drachtio"]
  },
  {
    id: "t543",
    name: "RouTR",
    url: "https://github.com/fonoster/routr",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم SIP برمجي مكتوب بـ Node.js يوفر تسجيلًا وتوجيهًا وواجهة إدارة عبر REST وgRPC. تُهيَّأ الشبكات بملفات YAML بسيطة بدل النصوص المعقدة، ما يجعله سهل الدمج في خطوط CI/CD والبيئات الحاوية.",
      en: "RouTR is a modern SIP server written in Node.js offering registration, routing and management via REST and gRPC. Its YAML-first configuration makes it easy to git-control and deploy SIP infrastructure in containers and CI pipelines."
    },
    cmd: "docker run --rm -it fonoster/routr:latest",
    cmdDesc: {
      ar: "تشغيل خادم RouTR في حاوية Docker للتجربة السريعة.",
      en: "Runs RouTR in a Docker container for a quick trial."
    },
    tags: ["routr", "sip", "nodejs", "docker"]
  },
  {
    id: "t544",
    name: "Zoiper",
    url: "https://www.zoiper.com",
    category: "voip",
    platform: ["cross"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "هاتف ناعم SIP وIAX متعدد المنصات بواجهة أنيقة يدعم مكالمات الفيديو وTLS/SRTP للتشفير. نسخته المجانية تكفي للاستخدام الشخصي بينما تضيف المدفوعة ميزات مؤسسية مثل الاتصال الجماعي والاندماج مع Outlook.",
      en: "Zoiper is a polished cross-platform SIP and IAX softphone with video calling and TLS/SRTP encryption. The free tier covers personal use while the paid version adds enterprise features like presence and Outlook integration."
    },
    tags: ["zoiper", "softphone", "sip", "iax"]
  },
  {
    id: "t545",
    name: "Linphone",
    url: "https://www.linphone.org",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "حزمة VoIP كاملة مفتوحة المصدر من Belledonne تشمل عميل هاتف على كل المنصات وخادم Linphone-server قابل للنشر الذاتي. تدعم SIP وتشفير TLS وبروتوكول الوسائط الآمن، مع عميل سطر أوامر linphonec للسيرفرات.",
      en: "Linphone is Belledonne's complete open-source VoIP suite: softphone apps for every platform plus a self-hostable SIP server. It supports end-to-end secured media and includes the linphonec command-line client for servers and automation."
    },
    cmd: "linphonec",
    cmdDesc: {
      ar: "تشغيل عميل Linphone النصي لإجراء مكالمات SIP من الطرفية.",
      en: "Launches the text-mode Linphone client for SIP calls from a terminal."
    },
    tags: ["linphone", "sip", "softphone", "opensource"]
  },
  {
    id: "t546",
    name: "Jami",
    url: "https://www.jami.net",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "منصة اتصالات لا مركزية من GNU/Savoir-faire Linux لا تحتاج خادمًا وسيطًا، تبني شبكة ند-لند (DHT) بين الأجهزة. تدعم المكالمات والرسائل المشفرة ومشاركة الملفات دون حساب مركزي، مثالية للمهتمين بالخصوصية.",
      en: "Jami (GNU Ring) is a decentralized communication platform that forms a distributed hash table between devices with no central server. It offers encrypted calls, messaging and file sharing account-free, appealing strongly to privacy-focused engineers."
    },
    cmd: "jamid",
    cmdDesc: {
      ar: "تشغيل عفريت Jami الخلفي jamid الذي يخدم الواجهات والـ DBus.",
      en: "Starts the jamid daemon behind Jami's UIs and DBus interface."
    },
    tags: ["jami", "ring", "p2p", "decentralized"]
  },
  {
    id: "t547",
    name: "Mumble",
    url: "https://www.mumble.info",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "نظام محادثة صوتية منخفض الكمون (VoIP) مفتوح المصدر موجه للألعاب والفرق، بخادم murmur وقنوات هرمية. يتميز بزمن وصول منخفض جدًا وتشفير OTR-نمط وجودة صوت ممتازة عبر Opus، مع واجهات العملاء على كل المنصات.",
      en: "Mumble is open-source low-latency voice chat with the murmur server, hierarchical channels and Opus audio. Renowned for sub-second latency and strong encryption, it remains a favorite for gaming crews and operations teams."
    },
    cmd: "murmurd",
    cmdDesc: {
      ar: "تشغيل خادم Mumble (murmur) لتقديم قنوات صوتية.",
      en: "Starts the murmur server to host Mumble voice channels."
    },
    tags: ["mumble", "murmur", "voip", "low-latency"]
  },
  {
    id: "t548",
    name: "TeamSpeak",
    url: "https://www.teamspeak.com",
    category: "voip",
    platform: ["cross"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "برنامج محادثة صوتية جماعية قديم وراسخ، يشتهر بزمن وصول منخفض وقنوات دقيقة الصلاحيات عبر خادم ts3server. مجاني للاستخدام غير التجاري مع رخصة تجارية للمؤسسات، ولا يزال الخيار الأول لدى كثير من مجتمعات الألعاب والرياضات الإلكترونية.",
      en: "TeamSpeak is the veteran group voice-chat platform known for minimal latency and fine-grained permissions on the ts3server backend. Free for non-commercial use, it remains a staple of gaming and esports communities worldwide."
    },
    cmd: "ts3server",
    cmdDesc: {
      ar: "تشغيل خادم TeamSpeak 3 لإنشاء قنوات صوتية جماعية.",
      en: "Starts a TeamSpeak 3 server to host voice channels."
    },
    tags: ["teamspeak", "voice-chat", "gaming", "voip"]
  },
  {
    id: "t549",
    name: "Ekiga",
    url: "https://www.ekiga.org",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "هاتف ناعم ومؤتمر فيديو مفتوح المصدر للينكس من مشروع جنوم، سبق أغلب الحلول في دعم SIP وH.323 معًا. واجهته الرسومية سهلة والكاميرا الصوت والفيديو مدمجة، خيار تاريخي وخفيف للاتصالات المكتبية.",
      en: "Ekiga is the classic GNOME softphone for Linux offering SIP and H.323 video calling in one free app. Lightweight and straightforward, it remains a useful tool for desktop VoIP and video conferencing on Linux."
    },
    tags: ["ekiga", "sip", "h323", "softphone", "linux"]
  },
  {
    id: "t550",
    name: "3CX",
    url: "https://www.3cx.com",
    category: "voip",
    platform: ["web", "windows", "linux"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "نظام هاتف مؤسسي مبني على SIP ويُدار بالكامل من واجهة ويب، يركض على ويندوز أو لينكس أو في السحب. النسخة المجانية تدعم عددًا غير محدود من المكالمات مع ميزات مدفوعة للدعم الفني والانتشار الأوسع.",
      en: "3CX is a web-managed, software-based PBX running on Windows, Linux or the cloud with standard SIP trunks and endpoints. Its free tier offers unlimited calls for small teams, with paid tiers adding contact-center features and scale."
    },
    tags: ["3cx", "pbx", "sip", "windows", "linux"]
  },

  // ─── Container / شبكات الحاويات (t551–t575) ───
  {
    id: "t551",
    name: "Docker Engine",
    url: "https://www.docker.com",
    category: "container",
    platform: ["linux", "windows"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محرك الحاويات الأشهر الذي يبني شبكات افتراضية جسرية (Bridge) وتراكب (Overlay) لأوعيته عبر أوامر docker network الفرعية. يدعم MACVLAN وIPVLAN وربط الحاويات بشبكة المضيف، وهو نقطة البداية العملية لفهم CNI وKubernetes لاحقًا.",
      en: "Docker Engine is the dominant container runtime whose docker network subcommands build bridge, overlay and macvlan/ipvlan topologies. Understanding its networking model (bridges, veth pairs, iptables masquerading) is the stepping stone to Kubernetes CNI."
    },
    cmd: "docker network create -d overlay mynet",
    cmdDesc: {
      ar: "إنشاء شبكة تراكب overlay عبر Swarm للحاويات الموزعة.",
      en: "Creates a Swarm overlay network for distributed containers."
    },
    tags: ["docker", "container", "overlay", "bridge"]
  },
  {
    id: "t552",
    name: "Docker Compose",
    url: "https://docs.docker.com/compose/",
    category: "container",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة تنسيق متعدد الحاويات بملف YAML واحد تُعرِّف خدمات وشبكات خاصة معزولة بينها. تُستخدم للنماذج المعملية السريعة: قاعدة بيانات وخادم ويب وموازن على شبكة داخلية، فتُشبه شبكة مركز بيانات مصغرة قابلة للحذف وإعادة الإنشاء.",
      en: "Docker Compose defines multi-container stacks in one YAML file with private user-defined networks between services. It is perfect for lab topologies — DB, web and load-balancer on an isolated network — that you can tear down and rebuild in seconds."
    },
    cmd: "docker compose up -d",
    cmdDesc: {
      ar: "تشغيل كل خدمات الملف docker-compose.yml في الخلفية.",
      en: "Starts all services from docker-compose.yml in the background."
    },
    tags: ["compose", "docker", "yaml", "networks"]
  },
  {
    id: "t553",
    name: "Podman",
    url: "https://podman.io",
    category: "container",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محرك حاويات بدون عفريت (Daemonless) متوافق مع أوامر Docker لكنه يعمل بجذور أقل صلاحية، وتديره أداة netavark للشبكات. يدعم نفس مفاهيم الجسور وMACVLAN ويحترم netfilter، خيار مؤسسي مفتوح المصدر بديل عن Docker.",
      en: "Podman is Red Hat's daemonless, rootless-compatible container engine managed with docker-like commands, including podman network. Its Netavark network stack implements bridges, macvlan and firewall rules, making it a secure open-source Docker alternative."
    },
    cmd: "podman network create labnet",
    cmdDesc: {
      ar: "إنشاء شبكة جسرية خاصة بالحاويات في Podman.",
      en: "Creates a container bridge network in Podman."
    },
    tags: ["podman", "container", "rootless", "netavark"]
  },
  {
    id: "t554",
    name: "containerd",
    url: "https://containerd.io",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "زمن تشغيل حاويات معياري من CNCF يخدم كنواة شبكة تحت Docker وKubernetes عبر CRI. يستدعي إضافات CNI لإعداد واجهة كل حاوية وIP وثياب التوجيه، وفهمه يشرح كيف تظهر IPs في الحاويات فعلًا.",
      en: "containerd is the CNCF graduated container runtime underneath Docker and Kubernetes via the CRI. It invokes CNI plugins to plumb every container's interface, IP and routes — understanding it explains where pod IPs actually come from."
    },
    cmd: "ctr plugins list",
    cmdDesc: {
      ar: "عرض إضافات containerd المحمّة بما فيها شبكة CNI.",
      en: "Lists loaded containerd plugins including CNI networking."
    },
    tags: ["containerd", "runtime", "cri", "cni"]
  },
  {
    id: "t555",
    name: "CRI-O",
    url: "https://cri-o.io",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "زمن تشغيل حاويات خفيف مصمم خصيصًا لـ Kubernetes يطبق CRI مباشرة دون طبقة Docker الوسيطة. يستهلك OCI containers مع واجهة شبكة CNI، وهو المختار افتراضيًا في توزيعات Red Hat OpenShift.",
      en: "CRI-O is a lightweight container runtime built specifically for Kubernetes, implementing the CRI directly without Docker layers. It consumes OCI images with CNI networking and is the default runtime in Red Hat OpenShift."
    },
    cmd: "sudo systemctl start crio",
    cmdDesc: {
      ar: "تشغيل خدمة CRI-O على عقدة Kubernetes عاملة.",
      en: "Starts the CRI-O service on a Kubernetes worker node."
    },
    tags: ["cri-o", "kubernetes", "runtime", "oci"]
  },
  {
    id: "t556",
    name: "nerdctl",
    url: "https://github.com/containerd/nerdctl",
    category: "container",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة سطر أوامر متوافقة مع Docker لكنها تخاطب containerd مباشرة، وتوفر nerdctl network لإدارة شبكات CNI من الطرفية. تضمّن شبكات.rootless وCompose أيضًا، خيار ممتاز لبيئات Kubernetes خفيفة الحمل.",
      en: "nerdctl is a Docker-compatible CLI that talks directly to containerd, with nerdctl network managing CNI networks from the terminal. It supports rootless networking and compose, making containerd practical without the full Docker stack."
    },
    cmd: "nerdctl network create demo",
    cmdDesc: {
      ar: "إنشاء شبكة حاويات عبر nerdctl وأدوات CNI.",
      en: "Creates a container network via nerdctl with CNI plugins."
    },
    tags: ["nerdctl", "containerd", "cni", "docker-compatible"]
  },
  {
    id: "t557",
    name: "CNI",
    url: "https://github.com/containernetworking/cni",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "المواصفة المرجعية لإضافات شبكة الحاويات من CNCF، وتشمل مكتبة spec ومكتبة libcni وأداة cnitool للفحص. كل شبكة حاويات تقريبًا (Kubernetes وPodman وcontainerd) تستدعي هذه الإضافات لتوصيل الأوعية بالشبكة.",
      en: "The CNI project defines the spec and reference library for container network plugins, plus the cnitool test harness. Virtually every container ecosystem — Kubernetes, Podman, containerd — calls these plugins to attach containers to networks."
    },
    cmd: "cnitool add mynet demo",
    cmdDesc: {
      ar: "استخدام cnitool لاختبار إضافة شبكة CNI إلى مساحة أسماء.",
      en: "Uses cnitool to attach a CNI network to a test namespace."
    },
    tags: ["cni", "spec", "cnitool", "kubernetes"]
  },
  {
    id: "t558",
    name: "CNI Plugins",
    url: "https://github.com/containernetworking/plugins",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مجموعة الإضافات المرجعية لمشروع CNI: bridge وipvlan وmacvlan وptp وhost-device وdhcp. تُثبَّت في /opt/cni/bin وتستدعيها بيئات التشغيل لإنشاء الوصلات الافتراضية، وتُعد نقطة البدء لفهم كل شبكات Kubernetes اللاحقة.",
      en: "The reference CNI plugin collection — bridge, ptp, macvlan, ipvlan, host-device, dhcp — installed to /opt/cni/bin and invoked by runtimes. They are the foundation layer every more complex CNI (Calico, Cilium) builds upon."
    },
    cmd: "ls /opt/cni/bin",
    cmdDesc: {
      ar: "عرض إضافات CNI المثبتة على العقدة.",
      en: "Lists the CNI binaries installed on the node."
    },
    tags: ["cni", "plugins", "bridge", "macvlan"]
  },
  {
    id: "t559",
    name: "CNI-Genie",
    url: "https://github.com/Huawei-PaaS/CNI-Genie",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إضافة CNI من هواوي تسمح لكل Pod بتحديد شبكته المفضلة (Calico أو Flannel أو Weave) عبر تسمية (Annotation) بسيطة. تُشغِّل عدة شبكات في نفس العنقود وتدعم أيضًا إلحاق واجهات متعددة بالجراب الواحد.",
      en: "CNI-Genie from Huawei lets each Pod pick its network (Calico, Flannel, Weave) through a simple annotation. It enables multiple CNIs in one cluster and multi-homed pods with several interfaces."
    },
    cmd: "kubectl apply -f genie-plugin.yml",
    cmdDesc: {
      ar: "نشر إضافة CNI-Genie على عنقود Kubernetes.",
      en: "Deploys the CNI-Genie plugin to a Kubernetes cluster."
    },
    tags: ["cni-genie", "huawei", "multi-cni", "kubernetes"]
  },
  {
    id: "t560",
    name: "Kuryr",
    url: "https://github.com/openstack/kuryr-kubernetes",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "جسر بين Kubernetes وOpenStack Neutron يجعل قرون Kubernetes مستهلكًا مباشرًا لشبكات Neutron وSecurity Groups وOctavia. يمنح الحاويات قدرات SDN كاملة للسحابة مثل عناوين Floating IPs والتكامل الأمني الدقيق.",
      en: "Kuryr bridges Kubernetes pods into OpenStack Neutron networks, security groups and Octavia load balancers. It gives containers full SDN capabilities — floating IPs, tenant isolation — of the underlying OpenStack cloud."
    },
    cmd: "kubectl get pods -n kuryr",
    cmdDesc: {
      ar: "التحقق من تشغيل وكلاء Kuryr في Kubernetes.",
      en: "Verifies the Kuryr controller and CNI pods are running."
    },
    tags: ["kuryr", "openstack", "neutron", "kubernetes"]
  },
  {
    id: "t561",
    name: "OVN-Kubernetes",
    url: "https://github.com/ovn-org/ovn-kubernetes",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "شبكة CNI مبنية على OVN لـ Kubernetes تُقدِّم تراكب IPsec بين العقد وسياسات شبكية معيارية وACL عبر OVN. تُنشئ جسرًا موحدًا منطقيًا يربط القرون عبر المسافات وتُعد خيارًا مؤسسيًا مدعومًا في OpenShift قديمًا وRed Hat.",
      en: "OVN-Kubernetes is the CNI that wires Kubernetes pods into OVN's logical networks, with IPsec overlay between nodes and policy enforcement via ACLs. It is the battle-tested enterprise networking used by OpenShift and Red Hat."
    },
    cmd: "kubectl get pods -n ovn-kubernetes",
    cmdDesc: {
      ar: "عرض قرون OVN-Kubernetes الرئيسية والعقدية.",
      en: "Lists the ovnkube-master and ovnkube-node pods."
    },
    tags: ["ovn", "kubernetes", "cni", "ipsec"]
  },
  {
    id: "t562",
    name: "Terway",
    url: "https://github.com/AliyunContainerService/terway",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إضافة CNI من Alibaba Cloud لـ ACK تُلحق كل Pod بـ VPC عبر ENI ثانوي فيعطى IP مباشرًا من الشبكة السحابية. يتجاوز تراكب VXLAN بسرعات أعلى وتكامل Security Groups، ويُعد نظير VPC CNI من AWS.",
      en: "Terway is Alibaba Cloud's CNI that attaches pods directly to the VPC via secondary ENIs, giving each pod a real VPC IP. This flat networking skips overlay overhead and integrates with cloud security groups, mirroring AWS's VPC CNI."
    },
    cmd: "kubectl get ds terway -n kube-system",
    cmdDesc: {
      ar: "التحقق من انتشار DaemonSet لـ Terway على كل عقدة.",
      en: "Checks the Terway DaemonSet is running on every node."
    },
    tags: ["terway", "alibaba", "eni", "vpc"]
  },
  {
    id: "t563",
    name: "Amazon VPC CNI",
    url: "https://github.com/aws/amazon-vpc-cni-k8s",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "شبكة EKS الرسمية من AWS تُخصِّص لكل Pod عنوان IP خاصًا من VPC عبر بطاقات ENI المرنة. هذا الدمج المباشر يسمح للقرون باستخدام Security Groups وخطوط الوصول الأصلية دون NAT إضافي بين العقد.",
      en: "The Amazon VPC CNI gives every EKS pod a VPC-internal IP allocated through elastic network interfaces. This native integration lets pods use security groups and VPC routing without any overlay tunneling between nodes."
    },
    cmd: "kubectl get ds aws-node -n kube-system",
    cmdDesc: {
      ar: "التحقق من عمل DaemonSet الخاص بشبكة VPC CNI.",
      en: "Verifies the aws-node VPC CNI DaemonSet is healthy."
    },
    tags: ["aws", "vpc-cni", "eks", "eni"]
  },
  {
    id: "t564",
    name: "Azure CNI",
    url: "https://github.com/Azure/azure-container-networking",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "شبكة AKS من Microsoft تُلحق القرون بـ VNet الأزوري عبر شبكة الجسر أو التراكب المدمج. يدعم سياسات شبكية Azure وتوزيع IP أساسي أو متقدم حسب حجم العنقود وعدد العقد.",
      en: "Azure CNI is Microsoft's networking stack for AKS, attaching pods to Azure VNet either through bridged or built-in overlay mode. It enforces Azure network policies and offers basic or advanced IP allocation for large clusters."
    },
    cmd: "kubectl get ds -n kube-system | grep azure",
    cmdDesc: {
      ar: "عرض مكونات Azure CNI العاملة في نظام kube-system.",
      en: "Lists the Azure CNI components running in kube-system."
    },
    tags: ["azure", "cni", "aks", "vnet"]
  },
  {
    id: "t565",
    name: "SR-IOV CNI",
    url: "https://github.com/k8snetworkplumbingwg/sriov-cni",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إضافة CNI تُخصِّص وظائف افتراضية SR-IOV (VFs) لبطاقة شبكة مباشرة إلى الحاوية أو القرون. تمنح اتصالًا شبه مباشر بالعتاد بزمن كمون منخفض جدًا وسرعة عالية، شائعة في حِمل NFV وTelco على Kubernetes.",
      en: "The SR-IOV CNI plugs SR-IOV virtual functions from an NIC directly into a pod. This near-hardware path delivers very low latency and high throughput, common in NFV and telecom workloads on Kubernetes."
    },
    cmd: "kubectl get sriovnetwork -A",
    cmdDesc: {
      ar: "عروض الشبكات SR-IOV المعرفة في العنقود.",
      en: "Lists the SR-IOV networks defined across the cluster."
    },
    tags: ["sriov", "cni", "kubernetes", "nfv"]
  },
  {
    id: "t566",
    name: "ovs-cni",
    url: "https://github.com/k8snetworkplumbingwg/ovs-cni",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إضافة CNI تُوصِّل الحاويات بجسور Open vSwitch الحقيقية وتستفيد من VLAN و VXLAN المضمّن. تُستخدم مع Multus لربط القرون بمفاتيح SDN قائمة، خيار مفيد في مختبرات NFV والبيئات التي تديرها OpenStack.",
      en: "ovs-cni attaches pods to real Open vSwitch bridges, inheriting VLANs, VXLAN and OpenFlow control. Combined with NetworkAttachmentDefinitions it connects containers into existing SDN fabrics, common in NFV and OpenStack environments."
    },
    cmd: "kubectl get network-attachment-definition -A",
    cmdDesc: {
      ar: "عرض تعريفات الملاحقة الشبكية المتاحة للقرون.",
      en: "Lists network attachment definitions available to pods."
    },
    tags: ["ovs-cni", "openvswitch", "vlan", "cni"]
  },
  {
    id: "t567",
    name: "Meshnet CNI",
    url: "https://github.com/networkop/meshnet-cni",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إضافة CNI فريدة تنشئ طبولوجيا Layer-3 مخصصة بين القرون عبر VXLAN، بحيث يشكل كل Pod عقدة موجهات في شبكة تحاكي جهازًا حقيقيًا. تُستخدم لمحاكاة أجهزة الشبكات (مثل Cisco XRd وFRR) داخل Kubernetes كأنها مختبر GNS3 سحابي.",
      en: "Meshnet CNI creates a custom point-to-point L3 topology between pods over VXLAN, turning each pod into a router node. It is the trick behind running network OS containers (XRd, FRR) on Kubernetes as a cloud GNS3-style lab."
    },
    cmd: "kubectl get meshnet -A",
    cmdDesc: {
      ar: "عرض موارد Meshnet التي تحدد طبولوجيا القرون.",
      en: "Shows Meshnet resources defining the pod topology."
    },
    tags: ["meshnet", "cni", "topology", "lab"]
  },
  {
    id: "t568",
    name: "Weave Net",
    url: "https://github.com/weaveworks/weave",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "شبكة CNI تاريخية تبني تراكب VXLAN مشفرًا بين عقد Kubernetes وتوزع عناوين عبر خوارزمية Paxos. تشمل جدارًا ناريًا لكل Pod ونمط جهاز اتصال مع IP фикد، وكانت من أولى شبكات Kubernetes السهلة التركيب قبل إغلاق Weaveworks.",
      en: "Weave Net built an encrypted VXLAN mesh between Kubernetes nodes with Paxos-based IP allocation and a per-pod firewall. One of the earliest one-command CNIs, its code remains a classic reference in overlay design."
    },
    cmd: "kubectl get ds weave-net -n kube-system",
    cmdDesc: {
      ar: "التحقق من عمل وكيل Weave على كل عقدة Kubernetes.",
      en: "Verifies the weave-net DaemonSet across cluster nodes."
    },
    tags: ["weave", "overlay", "vxlan", "kubernetes"]
  },
  {
    id: "t569",
    name: "Weave Scope",
    url: "https://github.com/weaveworks/scope",
    category: "container",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة تصوّر تفاعلي لمخطط الحاويات والعلاقات بينها على مستوى العملية والمضيف والشبكة. تنشئ خريطة حية تُظهر من يتصل بمن عبر أي منفذ، وتعمل عبر أمر scope launch واحد أو كوكلاء في Kubernetes.",
      en: "Weave Scope renders a live, interactive map of your containers, processes and hosts — including which container talks to which over what port. One `scope launch` command starts it, or run it as agents across a Kubernetes cluster."
    },
    cmd: "scope launch",
    cmdDesc: {
      ar: "تشغيل Weave Scope محليًا وفتح خريطة الشبكة في المتصفح.",
      en: "Starts Weave Scope and opens the live map in your browser."
    },
    tags: ["scope", "visualization", "containers", "monitoring"]
  },
  {
    id: "t570",
    name: "Hubble",
    url: "https://github.com/cilium/hubble",
    category: "container",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة مراقبة تدفق لشبكات Cilium تعرض تدفق الحزم في Kubernetes على مستوى DNS وHTTP وKafka مع أسباب رفض السياسة. تُشغَّل عبر حاوية جانبية وتقدم واجهة سطر أوامر Hubble وواجهة UI، فتُحوِّل debug السياسات الشبكية من عبء إلى سهولة.",
      en: "Hubble is Cilium's flow-observability layer showing L7 DNS/HTTP/Kafka traffic and the exact policy verdict for every flow. Its CLI and UI turn debugging Kubernetes network policies from guesswork into a queryable event stream."
    },
    cmd: "hubble observe --namespace default",
    cmdDesc: {
      ar: "مراقبة تدفقات الشبكة الحية في مساحة الأسماء الافتراضية.",
      en: "Observes live network flows in the default namespace."
    },
    tags: ["hubble", "cilium", "ebpf", "observability"]
  },
  {
    id: "t571",
    name: "Cilium CLI",
    url: "https://github.com/cilium/cilium-cli",
    category: "container",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة سطر أوامر رسمية لتثبيت Cilium في Kubernetes وفحص حالته وتبعيته، أداة أساسية لتشغيل اختبارات الاتصال بين القرون. تنفّذ cilium connectivity test لتحقق تلقائي شامل من جاهزية الشبكة والسياسات.",
      en: "The official Cilium CLI installs, upgrades and inspects Cilium in any Kubernetes cluster. Its `cilium connectivity test` runs a full automated suite proving your networking, DNS and policies actually work."
    },
    cmd: "cilium status",
    cmdDesc: {
      ar: "عرض حالة مكونات Cilium وجاهزيتها في العنقود.",
      en: "Reports Cilium component status and cluster readiness."
    },
    tags: ["cilium", "cli", "kubernetes", "connectivity"]
  },
  {
    id: "t572",
    name: "K3s",
    url: "https://k3s.io",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "توزيعة Kubernetes خفيفة من Rancher بشيء واحد ينفَّذ في أقل من دقيقة، وتضم شبكة Flannel افتراضيًا مع Traefik. تتيح للمهندس تجربة CNI وcluster networking على حاسوب أو Raspberry Pi دون عنقود كامل، مع التوافق الكامل مع Kubernetes.",
      en: "K3s is Rancher's single-binary Kubernetes distribution that boots in under a minute with Flannel networking and Traefik bundled. Perfect for experimenting with CNI choices and cluster networking on a laptop or Raspberry Pi, fully conformant with upstream Kubernetes."
    },
    cmd: "sudo k3s server --flannel-backend=vxlan",
    cmdDesc: {
      ar: "تشغيل خادم K3s مع خلفية Flannel لتراكب VXLAN.",
      en: "Starts the K3s server with Flannel's VXLAN backend."
    },
    tags: ["k3s", "kubernetes", "flannel", "lightweight"]
  },
  {
    id: "t573",
    name: "Kind",
    url: "https://kind.sigs.k8s.io",
    category: "container",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة تشغيل Kubernetes داخل حاويات Docker لاختبارات CI وتطوير شبكات CNI محليًا. كل عقدة Kind هي حاوية Docker بشبكتها الخاصة، ما يجعلها مثالية لاختبار manifest شبكي أو محاكاة عقد متعددة على جهاز واحد.",
      en: "Kind (Kubernetes-in-Docker) runs conformant clusters where each node is itself a Docker container with its own network bridge. It is the CI-friendly way to test CNI plugins, NetworkPolicies and multi-node topologies on a single machine."
    },
    cmd: "kind create cluster",
    cmdDesc: {
      ar: "إنشاء عنقود Kubernetes محلي داخل Docker عبر Kind.",
      en: "Creates a local Kubernetes cluster in Docker with Kind."
    },
    tags: ["kind", "kubernetes", "docker", "ci"]
  },
  {
    id: "t574",
    name: "Portainer",
    url: "https://www.portainer.io",
    category: "container",
    platform: ["cross"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "واجهة إدارة رسومية للحاويات عبر Docker وKubernetes، تتيح إنشاء الشبكات وإدارتها من المتصفح بدل CLI. تُظهر قوائم الشبكات الافتراضية والمخصصة ونقاط الوصل والقرون، خيار عملي للمبتدئين ولفرق التشغيل المتعددة المنصات.",
      en: "Portainer is the popular web UI for Docker and Kubernetes that lets you create and inspect container networks without the CLI. It visualizes networks, containers and pods across endpoints, ideal for teams easing into container networking."
    },
    cmd: "docker run -d -p 9443:9443 --name portainer portainer/portainer-ce",
    cmdDesc: {
      ar: "تشغيل حاوية Portainer CE على منفذ 9443 لإدارة Docker.",
      en: "Runs Portainer CE on port 9443 to manage Docker graphically."
    },
    tags: ["portainer", "gui", "docker", "kubernetes"]
  },
  {
    id: "t575",
    name: "Skydive",
    url: "https://github.com/skydive-project/skydive",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "محلل شبكات مفتوح المصدر يبني طوبولوجيا حية للمضيفات والحاويات والأجهزة الافتراضية من تكنولوجيا OpenFlow وnetlink. يتتبع التغيرات عبر الزمن ويتعمق حتى مستوى الواجهة والتدفق، أداة قوية لتشخيص بيئات الحاويات والسحب المختلطة.",
      en: "Skydive is an open-source real-time topology and flow analyzer that models hosts, containers and VMs down to the interface level. It records topology changes over time and probes deep into container and overlay networks for troubleshooting."
    },
    cmd: "skydive analyzer",
    cmdDesc: {
      ar: "تشغيل محلل Skydive الذي يستقبل البيانات من الوكلاء.",
      en: "Starts the Skydive analyzer that ingests agent telemetry."
    },
    tags: ["skydive", "topology", "troubleshooting", "containers"]
  },

  // ─── Mesh / الشبكات المتشابكة والطبقات العليا (t576–t600) ───
  {
    id: "t576",
    name: "Nebula",
    url: "https://github.com/slackhq/nebula",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "شبكة تراكب متشابكة من Slack مبنية على UDP وشهادات، تربط آلاف الأجهزة في mesh منطقي مع توجيه مباشر بين النقاط. تعتمد مفهوم المجموعات (Groups) لتحديد من يتصل بمن ضمن قواعد جدار ناري موقعة تشفيريًا.",
      en: "Nebula is Slack's open-source scalable overlay mesh that connects tens of thousands of hosts with certificate-based identity. Firewall-style groups define exactly who may talk to whom, enforced cryptographically across the whole mesh."
    },
    cmd: "nebula -config nebula.yml",
    cmdDesc: {
      ar: "تشغيل عقدة Nebula بملف تهيئة يحدد الشهادات والمجموعات.",
      en: "Runs a Nebula node with its certs and groups config."
    },
    tags: ["nebula", "mesh", "vpn", "overlay"]
  },
  {
    id: "t577",
    name: "n2n",
    url: "https://github.com/ntop/n2n",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "شبكة ند-لند P2P من ntop تنشئ شبكة Ethernet افتراضية مشفرة بين أجهزة خلف NAT. تتكون من عقدة تجميع supernode وعقد حواف edge، وتدعم التوجيه المباشر P2P بين الأطراف عند إمكانه لتفادي عنق الزجاجة.",
      en: "n2n from ntop builds encrypted peer-to-peer virtual Ethernet LANs across NAT-bound devices. A supernode rendezvous server helps edges find each other, after which traffic flows directly peer-to-peer where possible."
    },
    cmd: "sudo supernode -l 5000",
    cmdDesc: {
      ar: "تشغيل عقدة التجميع supernode على منفذ UDP 5000.",
      en: "Runs the n2n supernode rendezvous server on UDP 5000."
    },
    tags: ["n2n", "p2p", "lan", "nat-traversal"]
  },
  {
    id: "t578",
    name: "Freelan",
    url: "https://github.com/freelan-developers/freelan",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "برنامج VPN مفتوح المصدر متعدد المنصات يُنشئ شبكة نقطة-لنقطة أو متشابكة أو هجينة، مكتوب بلغة C++. يدعم تشفير قويًا واختيار طبولوجيا مرن: نجمة أو mesh كامل، خيار مجاني لبناء شبكات مكتبية مترابطة عبر الإنترنت.",
      en: "Freelan is a versatile open-source C++ VPN that builds point-to-point, star or full-mesh topologies over the internet. Its flexible topology model and strong encryption make it a solid free choice for inter-office mesh networks."
    },
    cmd: "sudo freelan",
    cmdDesc: {
      ar: "تشغيل عقدة Freelan بالتهيئة الافتراضية المشفرة.",
      en: "Starts a Freelan node with the default encrypted config."
    },
    tags: ["freelan", "vpn", "mesh", "p2p"]
  },
  {
    id: "t579",
    name: "Firezone",
    url: "https://www.firezone.dev",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة وصول Zero-Trust مبنية على WireGuard تُدير أجهزة موظفيك من لوحة ويب مع تعريفات Group وPolicy دقيقة. تُنشر ذاتيًا أو كسحابة وتوفر عميلًا لكل المنصات، بديل مفتوح المصدر لـ Tailscale مع فصل هوية مرونة.",
      en: "Firezone is an open-source WireGuard-based zero-trust access platform with a management UI, groups and resource-level policies. Self-hostable or cloud-managed, it is the popular open-source alternative to Tailscale for team access."
    },
    cmd: "sudo firezone-ctl start",
    cmdDesc: {
      ar: "بدء خدمة خادم Firezone عبر أداة firezone-ctl.",
      en: "Starts the Firezone server service via firezone-ctl."
    },
    tags: ["firezone", "wireguard", "zero-trust", "vpn"]
  },
  {
    id: "t580",
    name: "OpenZiti",
    url: "https://openziti.io",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "شبكة Zero-Trust مفتوحة المصدر تدمج الهوية والسياسات في نسيج شبكي مُعرَّف بالبرمجيات، فتُخفي الخدمات عن الإنترنت تمامًا. تُوفِّر SDKs لدمج zero-trust داخل تطبيقاتك بدل VPN تقليدي على طبقة IP.",
      en: "OpenZiti is an open-source zero-trust mesh that pushes identity and authorization into the network fabric, making services dark to the internet. Its SDKs even embed zero-trust inside your applications instead of layering a VPN on top."
    },
    cmd: "ziti edge login",
    cmdDesc: {
      ar: "تسجيل الدخول إلى وحدة إدارة Ziti Edge لتهيئة النسيج.",
      en: "Logs in to the Ziti Edge management API to configure the fabric."
    },
    tags: ["openziti", "zero-trust", "mesh", "overlay"]
  },
  {
    id: "t581",
    name: "VpnCloud",
    url: "https://github.com/dswd/vpncloud",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "شبكة افتراضية ند-لند مكتوبة بلغة Rust تعمل مثل شبكة سلكية افتراضية (VLAN) بين العقد المشفرة. تدعم طرق التشفير ChaCha20 وAES256 وتوجيهًا فوريًا بين العقد دون خادم مركزي.",
      en: "VpnCloud is a Rust-based peer-to-peer mesh VPN that behaves like a virtual switched network between encrypted nodes. It supports modern ciphers and direct peer-to-peer data paths without a central server."
    },
    cmd: "vpncloud -l 3456 --peers peer.example:3456",
    cmdDesc: {
      ar: "تشغيل عقدة VpnCloud مع منفذ استماع ونظراء أوليين.",
      en: "Runs VpnCloud with a listen port and initial peers."
    },
    tags: ["vpncloud", "p2p", "mesh", "rust"]
  },
  {
    id: "t582",
    name: "VTun",
    url: "https://sourceforge.net/projects/vtun",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة إنشاء أنفاق افتراضية قديمة وثبتت نفسها عبر السنين، تنشئ أنفاق IP أو Ethernet أو غيرها عبر TCP/UDP المشفر. صغيرة وخفيفة وشائعة على أجهزة OpenWrt لربط فروع عبر الإنترنت.",
      en: "VTun is the long-standing open-source tunneling tool creating IP, Ethernet and other tunnels over encrypted TCP/UDP. Tiny and dependable, it remains popular on OpenWrt routers for linking branch offices over the internet."
    },
    cmd: "sudo vtund -f /etc/vtund.conf",
    cmdDesc: {
      ar: "تشغيل خادم/عميل VTun بملف تهيئة الأنفاق.",
      en: "Starts the VTun daemon with its tunnel configuration."
    },
    tags: ["vtun", "tunnel", "vpn", "openwrt"]
  },
  {
    id: "t583",
    name: "MeshCentral",
    url: "https://meshcentral.com",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة إدارة أجهزة عن بعد مفتوحة المصدر من Intel/Ylianst تُنشئ شبكة mesh ذكية بين الأجهزة والخادم. تتيح الوصول الطرفي وسطح المكتب البعيد ونقل الملفات عبر متصفح واحد مع تشفير TLS، ونسبة الوكلاء تتصل مباشرة داخل الشبكة المحلية.",
      en: "MeshCentral is open-source remote management where agents form a self-organizing mesh back to your server. Terminal, desktop and file transfers all flow through the browser over TLS, with agents relay-linking to reach NATed peers."
    },
    cmd: "npx meshcentral",
    cmdDesc: {
      ar: "تشغيل خادم MeshCentral مؤقتًا عبر npx للتجربة.",
      en: "Spins up a temporary MeshCentral server via npx."
    },
    tags: ["meshcentral", "remote-management", "mesh", "rdp"]
  },
  {
    id: "t584",
    name: "LogMeIn Hamachi",
    url: "https://www.vpn.net",
    category: "mesh",
    platform: ["windows", "linux"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "شبكة VPN متشابكة سهلة الاستخدام تنشئ شبكة LAN افتراضية بين أجهزة أصدقائك أو زملائك عبر الإنترنت. تُثبِّت العميل وتدخل اسم الشبكة وكلمة السر فقط، مجانية حتى 5 مستخدمين مع رخصة مدفوعة لشبكات أكبر.",
      en: "Hamachi is the classic consumer mesh VPN that creates a virtual LAN between machines anywhere on the internet. Install, join a network name and you're done — free up to five users, paid beyond that."
    },
    cmd: "hamachi login",
    cmdDesc: {
      ar: "تسجيل عميل Hamachi على لينكس إلى حسابك.",
      en: "Logs the Linux Hamachi client into your account."
    },
    tags: ["hamachi", "vpn", "lan", "logmein"]
  },
  {
    id: "t585",
    name: "Radmin VPN",
    url: "https://www.radmin.com",
    category: "mesh",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "شبكة LAN افتراضية مجانية من Famatec لأجهزة ويندوز، تربط مجموعات الألعاب أو المكاتب الصغيرة بشبكة محلية عبر الإنترنت. بلا حدود عملية على عدد الأجهزة وتعمل خلف NAT مباشرة مع أداء ممتاز للألعاب والعمل الجماعي.",
      en: "Radmin VPN is Famatec's free Windows-only virtual LAN that glues gaming groups or small offices into one flat network over the internet. It handles NAT automatically and supports large groups with game-friendly performance."
    },
    tags: ["radmin", "vpn", "virtual-lan", "windows"]
  },
  {
    id: "t586",
    name: "VDE",
    url: "https://sourceforge.net/projects/vde",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إيثرنت افتراضي موزَّع (Virtual Distributed Ethernet) يربط عدة مضيفات ومعدات QEMU بمفتاح برمجي واحد أو موزَّع. يُوسِّع مفهوم veth إلى شبكة كاملة قابلة للتوصيل البيني عبر الشبكة الفعلية، حجر أساس في مختبرات المحاكاة.",
      en: "VDE (Virtual Distributed Ethernet) provides switched virtual Ethernet segments spanning multiple hosts and QEMU VMs. It extends veth pairs into a composable, routable virtual LAN, a classic building block of network labs."
    },
    cmd: "vde_switch -s /tmp/switch.ctl",
    cmdDesc: {
      ar: "تشغيل مفتاح VDE مع مقبس تحكم محلي.",
      en: "Starts a VDE switch with a local control socket."
    },
    tags: ["vde", "virtual-ethernet", "qemu", "lab"]
  },
  {
    id: "t587",
    name: "PeerVPN",
    url: "https://peervpn.net",
    category: "mesh",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "برنامج VPN ند-لند يُنشئ شبكة mesh مشفرة بين العقد دون خادم مركزي، ويقدم إيثرنت افتراضية كاملة. يُستخدم في بناء شبكات RDMA صغيرة وربط خوادم عبر NAT مع تكوين بسيط لملف واحد لكل عقدة.",
      en: "PeerVPN builds an encrypted, fully decentralized mesh with no central server, exposing a virtual Ethernet between peers. Simple one-file config per node makes it an easy way to link NATed servers into one LAN."
    },
    cmd: "peervpn peervpn.conf",
    cmdDesc: {
      ar: "تشغيل عقدة PeerVPN بملف التهيئة المحدد.",
      en: "Runs PeerVPN with the given config file."
    },
    tags: ["peervpn", "p2p", "mesh", "ethereum-vlan"]
  },
  {
    id: "t588",
    name: "miredo",
    url: "https://www.remlab.net/miredo/",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تنفيذ مفتوح المصدر لبروتوكول Teredo الذي يوصل عناوين IPv6 داخل حزم UDP عبر شبكات IPv4-only. يمنح IPv6 للاتصالات خلف NAT دون دعم موفر الخدمة، ويشمل عميلًا وخادم ترحيل لأغراض مختلفة.",
      en: "miredo is the open-source Teredo implementation that tunnels IPv6 packets inside UDP across IPv4-only networks. It grants IPv6 connectivity behind NAT without ISP support, and can run as client, relay or server."
    },
    cmd: "sudo systemctl start miredo",
    cmdDesc: {
      ar: "تشغيل خدمة Teredo miredo للحصول على IPv6.",
      en: "Starts the miredo Teredo service to gain IPv6 connectivity."
    },
    tags: ["miredo", "teredo", "ipv6", "tunnel"]
  },
  {
    id: "t589",
    name: "I2P",
    url: "https://geti2p.net",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "شبكة مبهَمة (Anonymity Network) ذات طبقات تشفير و ونع-لند كاملة، توجّه المرور عبر مسارات متعددة غير موثوقة. تُشغِّل مواقع eepsites داخلية وخدمات مخفية، وهو مشروع شقيق لـ Tor بفلسفة ند-لند أكثر راديكالية.",
      en: "I2P (Invisible Internet Project) is an anonymizing overlay network with garlic routing over a fully peer-to-peer fabric. It hosts internal eepsites and hidden services, a Tor sibling with an even more decentralized philosophy."
    },
    cmd: "i2prouter start",
    cmdDesc: {
      ar: "تشغيل موجّه I2P وبثّ العقدة في الشبكة.",
      en: "Starts the I2P router and joins the overlay network."
    },
    tags: ["i2p", "anonymity", "darknet", "p2p"]
  },
  {
    id: "t590",
    name: "Freenet",
    url: "https://freenetproject.org",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "شبكة تخزين ونشر لامركزية مقاومة للرقابة، تخزّن المحتوى مشفرًا موزعًا على العقد المتطوعة. كل عقدة تساهم بجزء من مساحة القرص لتكوين شبكة محتوى مرنة بلا خادم مركزي، من أقدم مشاريع الشبكات المتشابكة.",
      en: "Freenet is a censorship-resistant decentralized overlay that stores encrypted data across volunteer nodes. Every node donates disk space, forming a serverless content mesh — one of the oldest surviving peer-to-peer overlay projects."
    },
    cmd: "sh run.sh start",
    cmdDesc: {
      ar: "تشغيل عقدة Freenet عبر سكربت run.sh.",
      en: "Starts the Freenet node via its run.sh script."
    },
    tags: ["freenet", "decentralized", "censorship", "p2p"]
  },
  {
    id: "t591",
    name: "Tor",
    url: "https://www.torproject.org",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "شبكة بصلية (Onion Routing) تشفّر المرور عبر ثلاث نقاط متتابعة لإخفاء الهوية والمصدر معًا. أساس متصفح Tor وخدمات onion، ويهتم مهندس الشبكات بفهم بروتوكولها لأنها تمثل تراكبًا ضخمًا بحوالي 7000 نقطة تمرير.",
      en: "Tor is the onion-routing overlay that bounces traffic through three volunteer relays to hide source and destination. Powering the Tor Browser and onion services, it is a massive real-world overlay every network engineer should understand."
    },
    cmd: "tor --SocksPort 9050",
    cmdDesc: {
      ar: "تشغيل بروكسي Tor المحلي على منفذ SOCKS 9050.",
      en: "Runs a local Tor SOCKS proxy on port 9050."
    },
    tags: ["tor", "onion", "privacy", "proxy"]
  },
  {
    id: "t592",
    name: "Lokinet",
    url: "https://github.com/oxen-io/lokinet",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "شبكة تراكب مشفرة من Oxen توجّه كل حزمة عبر مسارات بصلية متعددة قبل وصولها للوجهة. تضم عناوين وخدمات sn-app داخلية، وتفيد لدراسة تصميم الشبكات بدون عنوان IP مكشوف.",
      en: "Lokinet is Oxen's onion-routed overlay that forwards packets through layered encrypted paths between exit nodes. With its built-in SN apps, it is an interesting study in mixnet-style routing without exposing IP addresses."
    },
    cmd: "lokinet-vpn --up",
    cmdDesc: {
      ar: "تشغيل عقدة Lokinet وربطها بالشبكة.",
      en: "Brings the Lokinet interface up and joins the network."
    },
    tags: ["lokinet", "onion", "oxen", "privacy"]
  },
  {
    id: "t593",
    name: "GNUnet",
    url: "https://www.gnunet.org",
    category: "mesh",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار من مشروع GNU لبناء شبكات لامركزية آمنة بلا خوادم، يشمل بروتوكولات للتخزين والتسمية والتوجيه بين الأنداد. أداة أكاديمية-تطبيقية لدراسة بناء طبقات شبكية بديلة عن TCP/IP التقليدي.",
      en: "GNUnet is GNU's framework for secure decentralized networking, with transport, naming (GNS) and distributed storage built in. It is a research-grade platform for experimenting with alternatives to the traditional TCP/IP stack."
    },
    cmd: "gnunet-arm -s",
    cmdDesc: {
      ar: "بدء خدمات GNUnet عبر مدير التشغيل التلقائي arm.",
      en: "Starts GNUnet services via the automatic-resolve manager."
    },
    tags: ["gnunet", "gnu", "decentralized", "p2p"]
  },
  {
    id: "t594",
    name: "qTox",
    url: "https://qtox.github.io",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عميل Tox رسومي لتواصل مشفر ند-لند بدون خوادم مركزية، يدعم الرسائل والمكالمات ومشاركة الملفات. توك بروتوكول ينشئ شبكة DHT بين المستخدمين، خيار عملي لتجربة P2P المشفر.",
      en: "qTox is the friendly Qt client for the Tox protocol: encrypted messaging, calls and file sharing with no central servers. Tox forms a DHT mesh between users, a practical way to experience end-to-end P2P communication."
    },
    tags: ["qtox", "tox", "p2p", "messaging"]
  },
  {
    id: "t595",
    name: "Bitmessage",
    url: "https://bitmessage.org",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "بروتوكول مراسلة لامركزي يبثّ الرسائل المشفرة لكل العقد فتستلمها رسالتك دون كشف المستقبل. يحمي تحليل البيانات الوصفية عبر إخفاء المتلقي داخل الشبكة، مثال تعليمي على تصميم شبكات التمويه.",
      en: "Bitmessage is a decentralized messaging protocol that broadcasts encrypted messages to all nodes so observers can't tell who the recipient is. A neat study in metadata protection through anonymity-set diffusion."
    },
    cmd: "pybitmessage",
    cmdDesc: {
      ar: "تشغيل عميل PyBitmessage الرسومي والانضمام للشبكة.",
      en: "Launches the PyBitmessage client and joins the network."
    },
    tags: ["bitmessage", "messaging", "privacy", "p2p"]
  },
  {
    id: "t596",
    name: "RetroShare",
    url: "https://retroshare.cc",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة تواصل اجتماعي لامركزية تربط أصدقاءك مباشرة عبر شبكة GPG موثقة، باتصال مباشر أو عبر أنداد. تضم منتديات وقنوات دردشة ومشاركة ملفات مشفرة، فتحقق بنية FOSS مغلقة بين الأصدقاء فقط.",
      en: "RetroShare is a decentralized social platform that connects trusted friends directly over GPG-authenticated links. Forums, chat and encrypted file sharing ride a friend-to-friend mesh, giving a private, serverless social network."
    },
    cmd: "retroshare-service",
    cmdDesc: {
      ar: "تشغيل خدمة RetroShare بلا واجهة للعمل كعقدة دائمة.",
      en: "Runs headless RetroShare as an always-on mesh node."
    },
    tags: ["retroshare", "f2f", "gpg", "social"]
  },
  {
    id: "t597",
    name: "libp2p",
    url: "https://libp2p.io",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "طقم مكتبات نمطي من Protocol Labs لبناء تطبيقات ند-لند، يشمل اكتشاف الأنداد وNAT traversal والنقل متعدد المسارات. هو طبقة الشبكات خلف IPFS وEthereum 2.0، مرجع قياسي لتصميم بروتوكولات P2P حديثة.",
      en: "libp2p is Protocol Labs' modular peer-to-peer networking library handling transport, peer discovery and NAT traversal. It powers IPFS and Ethereum 2.0 and is the reference stack for modern P2P protocol design."
    },
    tags: ["libp2p", "p2p", "ipfs", "protocol"]
  },
  {
    id: "t598",
    name: "OpenDHT",
    url: "https://github.com/savoirfairelinux/opendht",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مكتبة جدول تجزئة موزع (DHT) بلغة C++ من Savoir-faire تُخزّن أزواج مفتاح/قيمة عبر شبكة ند-لند. قلب بنية Jami للاتصال اللامركزي، وتُستخدم كطبقة إدارة بيانات موزعة في تطبيقات P2P.",
      en: "OpenDHT is Savoir-faire Linux' C++ distributed hash table storing key/value pairs across a peer-to-peer overlay. It is the backbone of Jami's serverless calling and a reusable layer for distributed metadata in P2P apps."
    },
    cmd: "dhtnode",
    cmdDesc: {
      ar: "تشغيل أداة dhtnode لتشغيل عقدة DHT تفاعلية.",
      en: "Runs dhtnode, an interactive OpenDHT node tool."
    },
    tags: ["opendht", "dht", "jami", "p2p"]
  },
  {
    id: "t599",
    name: "IPFS",
    url: "https://ipfs.tech",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام ملفات بين-كوكبي يُخزِّن المحتوى عبر شبكة ند-لند يعالج بالعناوين (Content Addressing). كل عقدة DHT تعمل كطبقة تراكب فوق IP، وقد شهد دمجًا واسعًا في Web3، مهم لمهندس الشبكات كنموذج شبكة محتوى.",
      en: "IPFS (InterPlanetary File System) is a content-addressed overlay where nodes form a DHT and serve files by hash. It is a large-scale real-world overlay worth studying for how content routing differs from IP routing."
    },
    cmd: "ipfs daemon",
    cmdDesc: {
      ar: "تشغيل عفريت IPFS للانضمام إلى شبكة التوزيع.",
      en: "Starts the IPFS daemon and joins the swarm network."
    },
    tags: ["ipfs", "content-addressing", "p2p", "web3"]
  },
  {
    id: "t600",
    name: "Syncthing",
    url: "https://syncthing.net",
    category: "mesh",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة مزامنة ملفات متواصلة بين الأجهزة دون خادم سحابي، تنشئ شبكة mesh مشفرة TLS بين الأنداد الموثوقين. تتخطى NAT عبر الاكتشاف العالمي والترحيل، وتمثل مثالًا ناجحًا لشبكات P2P في الاستخدام اليومي.",
      en: "Syncthing continuously syncs folders between your devices in an end-to-end encrypted mesh with no cloud server. Its global discovery and relaying solve NAT traversal elegantly, a beloved everyday P2P network."
    },
    cmd: "syncthing --gui-address=0.0.0.0:8384",
    cmdDesc: {
      ar: "تشغيل Syncthing مع واجهة ويب على المنفذ 8384.",
      en: "Runs Syncthing with its web GUI on port 8384."
    },
    tags: ["syncthing", "sync", "p2p", "file-sharing"]
  }
];
