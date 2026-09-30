import type { Tool } from "@/lib/types";

// ─── TOOLS PART 11: t1001–t1060 (catalog extras) ─────────────────────────
// Categories: sdn (t1001–t1010), container (t1011–t1020), mesh (t1021–t1030),
//             voip (t1031–t1040), iot (t1041–t1050), incident (t1051–t1060)
// All tools verified real (official sites / GitHub) and not present in parts 1–10.

export const TOOLS_PART11: Tool[] = [
  // ── SDN extras / أدوات SDN إضافية ──────────────────────────────────────
  {
    id: "t1001",
    name: "Tungsten Fabric",
    url: "https://tungsten.io/",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "منصة SDN مفتوحة المصدر لافتراضية الشبكات كانت تُعرف سابقًا باسم OpenContrail، وتوفّر شبكات تراكب معزولة للآلات الافتراضية والحاويات في بيئات OpenStack وKubernetes. تعتمد مستوى تحكم موزّعًا قائمًا على BGP وEVPN لتوزيع مسارات عالية الكفاءة بين عقد الحوسبة، مع جدار حماية افتراضي موزّع على مستوى vRouter في كل مضيف. تهمّ مهندس الشبكات بوصفها بديلًا برمجيًا كاملًا لأجهزة التوزيع التقليدية في مراكز البيانات.",
      en: "An open-source SDN and network-virtualization platform formerly known as OpenContrail, delivering isolated overlay networks for VMs and containers in OpenStack and Kubernetes environments. It runs a distributed BGP/EVPN control plane that programs efficient routes between compute nodes, plus a distributed virtual firewall implemented in the vRouter on every host. It matters to network engineers as a full software alternative to traditional distribution switches in the datacenter."
    },
    cmd: "contrail-status",
    cmdDesc: { ar: "يفحص حالة خدمات Tungsten Fabric قيد التشغيل على العقدة الحالية", en: "Checks the status of running Tungsten Fabric services on the current node" },
    tags: ["tungsten-fabric", "opencontrail", "sdn", "overlay", "bgp"]
  },
  {
    id: "t1002",
    name: "Stratum",
    url: "https://github.com/stratum/stratum",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "نظام تشغيل شبكي «نحيف» مفتوح المصدر من مؤسسة ONF للمفاتيح الصندوق الأبيض، مستقل عن رقاقة التحويل ويدعم Barefoot Tofino وBroadcom Tomahawk ومحاكي bmv2. يكشف واجهات SDN من الجيل التالي مثل P4Runtime وgNMI/OpenConfig أمام المتحكم الخارجي، فتفصل بين «الدماغ» في المتحكم وعملية التحويل في العتاد. أداة محورية لمن يريد بناء مختبرات P4 قريبة من العتاد الحقيقي أو تجربة مفاتيح قابلة للبرمجة.",
      en: "An open-source, silicon-independent thin switch operating system from the ONF for white-box switches, supporting Barefoot Tofino, Broadcom Tomahawk and the bmv2 software switch. It exposes next-generation SDN interfaces such as P4Runtime, gNMI and OpenConfig to an external controller, cleanly separating the control 'brain' from the hardware forwarding plane. It is a key tool for anyone building P4 labs close to real hardware or experimenting with programmable switches."
    },
    cmd: "bazel run //stratum/tools/gnmi:gnmi_cli -- get /interfaces/interface[name=1/1]/state/ifindex",
    cmdDesc: { ar: "يقرأ فهرس المنفذ عبر واجهة gNMI من Stratum باستخدام أداة gnmi_cli المرفقة", en: "Reads a port's ifindex over gNMI from Stratum using the bundled gnmi_cli tool" },
    tags: ["stratum", "p4runtime", "gnmi", "whitebox", "onf"]
  },
  {
    id: "t1003",
    name: "ofsoftswitch13",
    url: "https://github.com/CPqD/ofsoftswitch13",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مفتاح برمجي مفتوح المصدر من مركز CPqD البرازيلي ينفّذ OpenFlow 1.3 مع ملحقات ONF، ويُبنى فوق نواة Linux بواجهات شبكية حقيقية. يتألف من عنصرين: ofdatapath الذي ينفّذ مستوى التحويل، وofprotocol الذي يربط المفتاح بالمتحكم عبر قناة آمنة، فيتكامل مباشرة مع متحكمات مثل Ryu وONOS لاختبار مزايا الجداول المتعددة وMeter. أداة عملية لبناء مختبرات OpenFlow واقعية دون شراء أي عتاد.",
      en: "An open-source software switch from Brazil's CPqD implementing OpenFlow 1.3 with ONF extensions, built on the Linux kernel over real network interfaces. It ships as two pieces: ofdatapath implementing the forwarding plane and ofprotocol connecting the switch to a controller through a secure channel, integrating directly with controllers like Ryu and ONOS to exercise multi-table and metering features. A practical tool for realistic OpenFlow labs without buying hardware."
    },
    cmd: "sudo udatapath/ofdatapath --datapath-id=1 --interfaces=eth1 ptcp:6633",
    cmdDesc: { ar: "يبدأ مستوى البيانات للمفتاح بمعرّف 1 على الواجهة eth1 مع نقطة ربط محلية ptcp", en: "Starts the switch datapath with dpid 1 on eth1 and a local ptcp attachment point" },
    tags: ["ofsoftswitch13", "openflow", "soft-switch", "cpqd", "sdn"]
  },
  {
    id: "t1004",
    name: "NOX",
    url: "https://github.com/noxrepo/nox",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أول متحكم OpenFlow مفتوح المصدر على الإطلاق، طوّرته Nicira وجامعة ستانفورد عام 2008 بلغة ++C، ويُعد السلف التاريخي لكل متحكمات SDN الحديثة. يوفّر أداءً عاليًا وواجهة مجرّدة للتعامل مع أحداث OpenFlow، ويلائم كتابة تطبيقات تحكم متقدمة ذات زمن استجابة منخفض. دراسته تعطي مهندس الشبكات فهماً جذريًا لجذور الثورة البرمجية في الشبكات.",
      en: "The first open-source OpenFlow controller ever, developed by Nicira and Stanford in 2008 in C++, and the historical ancestor of every modern SDN controller. It delivers high performance and an abstracted interface for handling OpenFlow events, which suits low-latency, advanced control applications. Studying it gives a network engineer a root-level understanding of where the software-defined networking revolution began."
    },
    cmd: "./nox_core -i ptcp: switch",
    cmdDesc: { ar: "يشغّل نواة NOX مع وحدة switch على منفذ تحكم TCP بدل 6633", en: "Runs the NOX core with the switch module listening on TCP control port 6633" },
    tags: ["nox", "openflow", "controller", "c++", "stanford"]
  },
  {
    id: "t1005",
    name: "MidoNet",
    url: "https://github.com/midonet/midonet",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة افتراضية شبكية موزّعة من Midokura تعمل فوق OpenStack لتقديم خدمات L2/L3 كاملة دون أجهزة مادية مخصصة. يتوزّع منطق التوجيه والجدران النارية وحالة الاتصالات على مستوى أجهزة الوكيل في كل مضيف، فتُعالَج الحركة شرقًا/غربًا محليًا دون المرور بعقدة مركزية. خيار عملي لدراسة بنى التراكب الموزّعة ومفهوم التوجيه الافتراضي الموزّع.",
      en: "A distributed network-virtualization platform from Midokura that runs on top of OpenStack to deliver full L2/L3 services without dedicated hardware. Routing, firewall logic and connection state are distributed across agent software on each hypervisor, so east-west traffic is handled locally without a central chokepoint. A practical choice for studying distributed overlay architectures and the distributed virtual router concept."
    },
    cmd: "midonet-cli",
    cmdDesc: { ar: "يفتح صدفة تفاعلية لإدارة طوبولوجيا MidoNet من جسور وموجهات ومنافذ", en: "Opens an interactive shell for managing the MidoNet topology of bridges, routers and ports" },
    tags: ["midonet", "midokura", "openstack", "sdn", "overlay"]
  },
  {
    id: "t1006",
    name: "Dragonflow",
    url: "https://github.com/openstack/dragonflow",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مشروع OpenStack يُنفّذ خدمة شبكات Neutron عبر متحكم SDN خفيف مضمّن في كل عقدة حساب بدل المكون المركزي التقليدي. يحتفظ كل عقدة بنسخة من قاعدة بيانات الشبكة النهائية عبر ناقل نشر مثل Etcd أو Redis، فيتخذ قرارات التحويل محليًا ويتجنب الاختناق المركزي في السحابات الكبيرة. مثال تعليمي ممتاز لنمط «المتحكم الموزّع» في السحابة.",
      en: "An OpenStack project that implements Neutron networking through a lightweight SDN controller embedded on every compute node instead of the usual central agent. Each node keeps a copy of the final network state via a publication bus such as Etcd or Redis, so forwarding decisions happen locally and the central bottleneck disappears at cloud scale. An excellent teaching example of the distributed-controller pattern in cloud networking."
    },
    cmd: "openstack network agent list",
    cmdDesc: { ar: "يعرض حالة عقد متحكم Dragonflow وعناصر Neutron المرتبطة بها", en: "Lists the state of Dragonflow controller agents and their Neutron components" },
    tags: ["dragonflow", "openstack", "neutron", "distributed", "sdn"]
  },
  {
    id: "t1007",
    name: "Trema",
    url: "https://github.com/trema/trema",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار عمل لتطوير متحكمات OpenFlow بلغة Ruby (مع دعم C) طوّرته NEC ومعهد NICT الياباني، اشتهر ببساطة واجهته البرمجية وقربه من لغة البشر. يتولى إنشاء طوبولوجيا المختبر والتعامل مع أحداث المفاتيح نيابةً عنك، فتكتب منطق التحكم فقط في ملف روبي واحد صغير. اختيار موفق لمتعلّمي SDN القادمين من خلفية برمجية.",
      en: "A Ruby (with C support) framework for developing OpenFlow controllers, created by NEC and Japan's NICT, and known for its clean, human-friendly API. It handles lab topology creation and switch event plumbing for you, so you write only the control logic in one small Ruby file. A great fit for SDN learners coming from a programming background."
    },
    cmd: "trema run hello_trema.rb",
    cmdDesc: { ar: "يشغّل تطبيق متحكم روبي فوق طوبولوجيا Trema المعرّفة في ملف الإعدادات", en: "Runs a Ruby controller application over the topology defined in the Trema config" },
    tags: ["trema", "openflow", "ruby", "controller", "nec"]
  },
  {
    id: "t1008",
    name: "SONiC",
    url: "https://github.com/sonic-net/SONiC",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "نظام تشغيل شبكي مفتوح المصدر بدأته مايكروسوفت لمفاتيح مراكز البيانات الصندوق الأبيض، ويعتمد معمارية تفكيكية: نواة Debian قياسية مع خدمة شبكية داخل حاوية Docker لكل وظيفة، وطبقة تجريد للمفاتيح SAI تصل بين البرمجيات ورقاقات التحويل المختلفة. يديره كبرى المشغلين السحابيين عالميًا، ويمكن تجربته على محاكي بسيط قبل شراء أي عتاد. بوابتك العملية لفهم ثورة فصل نظام التشغيل الشبكي عن العتاد.",
      en: "An open-source network operating system pioneered by Microsoft for datacenter white-box switches, built on a disaggregated architecture: a standard Debian base, one Docker container per network service, and the Switch Abstraction Interface (SAI) decoupling software from switching silicon. It runs at major cloud operators worldwide and can be trialed on a simulator before buying any hardware. It is the practical gateway to understanding NOS/hardware disaggregation."
    },
    cmd: "show version",
    cmdDesc: { ar: "يعرض إصدار SONiC وبيانات النظام من واجهة الأمر النصية للمفتاح", en: "Prints the SONiC OS version and system details from the switch CLI" },
    tags: ["sonic", "nos", "ocp", "whitebox", "datacenter"]
  },
  {
    id: "t1009",
    name: "Open Network Linux",
    url: "https://github.com/opencomputeproject/OpenNetworkLinux",
    category: "sdn",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "توزيعة Linux لمفاتيح المعدن المكشوف من مشروع OCP، تبني صورة Debian كاملة مع مشغّلات العتاد ومثبّتًا متوافقًا مع ONIE فوق رقاقات Marvell وBroadcom وغيرها. خدمت أساسًا لبناء أنظمة تشغيل شبكية أعلى منها قبل نضوج بدائل أكثر حداثة، وما تزال مرجعًا قيّمًا لفهم أساليب تشغيل Linux فوق عتاد التحويل الفعلي. مفيدة لمن يدرس بنية أسفل أي NOS تجاري.",
      en: "An OCP Linux distribution for bare-metal switches that builds a full Debian image with hardware drivers and an ONIE-compatible installer for Marvell, Broadcom and other silicon. It served as the foundation many network operating systems were built on and remains a valuable reference for running Linux on real switching hardware. Useful for studying what sits underneath any commercial NOS."
    },
    cmd: "make docker",
    cmdDesc: { ar: "يبني صورة Open Network Linux كاملة داخل حاوية بناء جاهزة عبر Docker", en: "Builds a complete Open Network Linux image inside the provided Docker build workspace" },
    tags: ["onl", "ocp", "onie", "whitebox", "debian"]
  },
  {
    id: "t1010",
    name: "gnoic",
    url: "https://github.com/karimra/gnoic",
    category: "sdn",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "عميل سطر أوامر للخدمات الصادرة من OpenConfig باسم gNOI، مثل إعادة التشغيل وإدارة الشهادات وping وخزائن المفاتيح، ويتصل بالأجهزة عبر gRPC. يكتبه مطوّر أداة gNMIc نفسها، فيجدّ مهندس الشبكات واجهة موحدة لتشغيل عمليات التشغيل والصيانة على مفاتيح قديمة وحديثة تدعم gNOI. رفيق مثالي لأدوات gNMI في بناء مصادر مصداقية موحدة للأجهزة.",
      en: "A command-line client for the OpenConfig gNOI services such as reboot, certificate management, ping and key stores, talking to devices over gRPC. It comes from the same author as gNMIc, giving network engineers one consistent interface for operational tasks across any gNOI-capable device. A perfect companion to gNMI tooling when building a single source of truth for the fleet."
    },
    cmd: "gnoic tree",
    cmdDesc: { ar: "يعرض شجرة خدمات gNOI المدعومة وكل الأوامر الفرعية المتاحة", en: "Prints the tree of supported gNOI services and all available subcommands" },
    tags: ["gnoi", "openconfig", "grpc", "gnmi", "automation"]
  },

  // ── Container extras / أدوات شبكات الحاويات الإضافية ──────────────────
  {
    id: "t1011",
    name: "Multus CNI",
    url: "https://github.com/k8snetworkplumbingwg/multus-cni",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إضافة CNI «فوق-meta» لـ Kubernetes تسمح لكل Pod بأن يمتلك عدة واجهات شبكية بدل الواجهة الوحيدة الافتراضية، عبر كائنات NetworkAttachmentDefinition. تُشغّل الشبكة الرئيسية بأداة مثل Calico ثم تضيف واجهات macvlan أو VLAN أو DPDK من إضافات أخرى للـ Pod نفسه. ضرورية في سيناريوهات NFV والوسائط حيث تحتاج حاوية واحدة واجهة إدارة وواجهة بيانات منفصلتين.",
      en: "A Kubernetes CNI meta-plugin that lets every Pod own multiple network interfaces instead of the single default one, driven by NetworkAttachmentDefinition objects. It keeps the primary network on a plugin like Calico and adds extra macvlan, VLAN or DPDK interfaces from other CNIs to the same Pod. It is essential in NFV and media scenarios where one container needs separate management and data interfaces."
    },
    cmd: "kubectl get network-attachment-definitions -A",
    cmdDesc: { ar: "يعرض تعريفات الشبكات الإضافية المرفقة عبر Multus في كل namespaces", en: "Lists the extra network attachment definitions wired through Multus across all namespaces" },
    tags: ["multus", "cni", "kubernetes", "multi-network", "nfv"]
  },
  {
    id: "t1012",
    name: "Antrea",
    url: "https://github.com/antrea-io/antrea",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إضافة شبكية لمجموعات Kubernetes من VMware تُعيد استخدام نضج Open vSwitch في مستوى بيانات الحاويات بدل الاعتماد على iptables. تفرض سياسات Kubernetes وAntrea NetworkPolicies بكفاءة OVS، وتجمع رؤية التدفقات وتصدّرها عبر Flow Aggregator وIPFIX للتحليل. تمنح مهندس الشبكات أدوات تشخيص مألوفة من عالم OVS داخل بيئة الحاويات.",
      en: "A VMware Kubernetes CNI that reuses the maturity of Open vSwitch as the container datapath instead of relying on iptables. It enforces Kubernetes and Antrea NetworkPolicies with OVS efficiency and exports flow visibility through a Flow Aggregator using IPFIX. It hands network engineers familiar OVS-style diagnostics inside a container environment."
    },
    cmd: "antctl get networkpolicy",
    cmdDesc: { ar: "يسرد سياسات الشبكة المفعّلة في العقدة عبر أداة antctl المدمجة", en: "Lists the network policies enforced on the node via the bundled antctl tool" },
    tags: ["antrea", "cni", "ovs", "kubernetes", "vmware"]
  },
  {
    id: "t1013",
    name: "Kube-OVN",
    url: "https://github.com/kubeovn/kube-ovn",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إضافة شبكية لمجموعات Kubernetes مبنية بالكامل على OVN، تمنح كل namespace شبكة فرعية IP خاصة ومفاهيم VPC افتراضية معزولة داخل الكتلة. تدعم تراكب VxLAN/Geneve أو تحتية مباشرة، وبوابات موزّعة، وسياسات شبكية من مستوى ACL الأصلي في OVN، وربط الشبكات الفعلية عبر provider networks. أداة ممتازة لمن يريد منطق سحابة عمومية داخليًا في K8s.",
      en: "A Kubernetes CNI built entirely on OVN that gives every namespace its own IP subnet and supports isolated virtual VPCs inside the cluster. It offers VxLAN/Geneve overlays or direct underlays, distributed gateways, network policies powered by native OVN ACLs, and connectivity to physical networks via provider networks. A strong pick when you need public-cloud-like network logic inside Kubernetes."
    },
    cmd: "kubectl ko nbctl show",
    cmdDesc: { ar: "يعرض قاعدة بيانات OVN الشمالية لمجموعة Kube-OVN عبر أداة kubectl ko", en: "Dumps the OVN northbound database view of the Kube-OVN cluster via kubectl ko" },
    tags: ["kube-ovn", "ovn", "cni", "vpc", "kubernetes"]
  },
  {
    id: "t1014",
    name: "Whereabouts",
    url: "https://github.com/k8snetworkplumbingwg/whereabouts",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "ملحق IPAM لتوزيع عناوين IP على واجهات الشبكات الإضافية المرفقة عبر Multus، كبديل عن محدودية plugin host-local. يخزّن التعيينات في كائنات IPPool مخصصة داخل Kubernetes، ويضمّن Reconciler يعيد تدوير العناوين من Pods المحذوفة تلقائيًا فلا تنفد عناوين الشبكة الثانوية. يحل مشكلة واقعية يعانيها كل من يدير شبكات CNI متعددة في كتلة إنتاج.",
      en: "An IPAM plugin that hands out IP addresses for Multus-attached secondary interfaces, replacing the limitations of host-local. Allocations live in dedicated IPPool objects inside Kubernetes, and a bundled Reconciler automatically reclaims addresses from deleted Pods so secondary subnets never run dry. It solves a real pain for anyone operating multiple CNI networks in a production cluster."
    },
    cmd: "kubectl get ippools.whereabouts.cni.cncf.io -A",
    cmdDesc: { ar: "يعرض مجمعات عناوين IP ومقاديرها المستهلكة في كل الشبكات الثانوية", en: "Lists the IP address pools and their consumed capacity across secondary networks" },
    tags: ["whereabouts", "ipam", "multus", "kubernetes", "networking"]
  },
  {
    id: "t1015",
    name: "netshoot",
    url: "https://github.com/nicolaka/netshoot",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "حاوية Docker واحدة تضم أكثر من مئة أداة شبكية مثل tcpdump وnetstat وcurl وmtr وdig، مصممة خصيصًا لتشخيص شبكات الحاويات. تشغّلها داخل فضاء أسماء الشبكة لحاوية أو Pod معطل فتحصل على عدة أدوات جاهزة دون تثبيت أي شيء في صورة الإنتاج نفسها. أول أداة يمتدحها كل مهندس SRE عند فشل الاتصال بين خدمتين في Kubernetes.",
      en: "A single Docker image packing more than a hundred network tools such as tcpdump, netstat, curl, mtr and dig, purpose-built for debugging container networking. Launch it inside the network namespace of a broken container or Pod and you instantly get a full toolkit without polluting the production image itself. It is the first tool every SRE reaches for when two Kubernetes services refuse to talk."
    },
    cmd: "docker run -it --net container:nginx nicolaka/netshoot",
    cmdDesc: { ar: "يفتح صدفة netshoot داخل فضاء أسماء شبكة حاوية nginx نفسه للتشخيص", en: "Opens a netshoot shell inside the network namespace of the nginx container for live debugging" },
    tags: ["netshoot", "troubleshooting", "docker", "netns", "debugging"]
  },
  {
    id: "t1016",
    name: "Skupper",
    url: "https://github.com/skupperproject/skupper",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة من Red Hat تنشئ «شبكة تطبيقات افتراضية» آمنة تربط خدمات مجموعات Kubernetes أو مساحات أسماء متباعدة دون تعديل بياناتها أو كشف المنافذ، عبر موزّعات متراكبة ذكية. تكفي سلسلة أوامر قصيرة لإنشاء موقع وإنشاء رمز ربط ثم فداء الرمز في الموقع الآخر ليتصل الخدمتان مباشرة. أفضل مسار عملي لتجربة بنية الخدمات الهجينة بين غرفة خادمة وسحابة عامة.",
      en: "A Red Hat tool that builds a secure virtual application network, connecting services across separate Kubernetes clusters or namespaces without changing the application or exposing ports, using an overlay of smart routers. A short chain of commands creates a site, issues a token, and redeems it on the other site so the two services connect. The most practical path to a hybrid service fabric between a server room and a public cloud."
    },
    cmd: "skupper site create north --enable-link-access -n prod",
    cmdDesc: { ar: "ينشئ موقع Skupper باسم north مع نقطة وصول للروابط في فضاء prod", en: "Creates a Skupper site named north with link access enabled in the prod namespace" },
    tags: ["skupper", "multicluster", "overlay", "service-network", "redhat"]
  },
  {
    id: "t1017",
    name: "Submariner",
    url: "https://github.com/submariner-io/submariner",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مشروع CNCF يصل شبكات مجموعات Kubernetes متعددة على مستوى IP بحيث تتخاطب الـ Pods من كتل مختلفة مباشرة كأنها في شبكة واحدة. يخصص عقد بوابات في كل كتلة تنشئ أنفاق VXLAN أو IPsec أو WireGuard بينها، ويوسّع اكتشاف الخدمات عبر ClusterDNS ليبحث أسماء الخدمات عن بعيد. أداة قياسية لكل بنية متعددة الكتل أو متعددة السحابات.",
      en: "A CNCF project that connects multiple Kubernetes cluster networks at the IP layer so Pods in different clusters communicate directly as if on one flat network. It dedicates gateway nodes in each cluster that build VXLAN, IPsec or WireGuard tunnels, and extends service discovery so ClusterDNS resolves service names cross-cluster. A standard building block for any multi-cluster or multi-cloud architecture."
    },
    cmd: "subctl show all",
    cmdDesc: { ar: "يلخص حالة عناصر Submariner من بوابات وكابلات واتصالات في الكتلة", en: "Summarizes Submariner's gateways, cables and connections in the cluster" },
    tags: ["submariner", "multicluster", "cncf", "vpn", "kubernetes"]
  },
  {
    id: "t1018",
    name: "kube-vip",
    url: "https://github.com/kube-vip/kube-vip",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة خفيفة توفر عناوين IP افتراضية عالية التوافر وميزة LoadBalancer لمجموعات Kubernetes على خوادم معدنية مكشوفة بلا موازن سحابي خارجي. تدير العنوان الافتراضي عبر ARP أو BGP مع انتخاب قائد بين العقد، فتُستخدم لعنوان مستوى التحكم أو لخدمات type LoadBalancer حقيقية. بديل شائع لـ MetalLB بوزن واحد وملف واحد.",
      en: "A lightweight tool providing highly available virtual IPs and LoadBalancer capability for bare-metal Kubernetes clusters with no external cloud balancer. It manages the VIP via ARP or BGP with leader election across nodes, serving both control-plane endpoints and real type LoadBalancer services. A popular single-binary, single-file alternative to MetalLB."
    },
    cmd: "kube-vip manifest daemonset --interface eth0 --address 10.0.0.9",
    cmdDesc: { ar: "يولّد بيان DaemonSet لـ kube-vip الذي يحمل العنوان الافتراضي 10.0.0.9", en: "Generates the kube-vip DaemonSet manifest that carries the virtual IP 10.0.0.9" },
    tags: ["kube-vip", "loadbalancer", "vip", "kubernetes", "baremetal"]
  },
  {
    id: "t1019",
    name: "slirp4netns",
    url: "https://github.com/rootless-containers/slirp4netns",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "يوفر اتصالًا شبكيًا بوضع المستخدم تمامًا لفضاءات أسماء الشبكة غير المميزة، عبر مزامنة حزم TCP/IP في عملية مستخدم بدل نفق نواة. يسمح بذلك بتشغيل حاويات rootless كاملة عبر Podman مع وصول إنترنت دون أي صلاحيات إدارية، مع خيارات متقدمة مثل MTU ضخم وعزل loopback المضيف. فهم آليته يشرح كثيرًا من غوامض شبكات الحاويات بلا جذور.",
      en: "It delivers fully user-mode networking for unprivileged network namespaces by replaying TCP/IP traffic inside a user-space process built on QEMU's libslirp. This lets completely rootless containers run under Podman with working Internet access and zero administrator privileges, with advanced options like a huge MTU and host-loopback isolation. Understanding its mechanics demystifies much of rootless container networking."
    },
    cmd: "slirp4netns --configure --mtu=65520 --disable-host-loopback $(cat /tmp/pid) tap0",
    cmdDesc: { ar: "يشبك واجهة tap0 بفضاء أسماء العملية المحددة بشبكة مستخدم MTU ضخم", en: "Attaches a tap0 interface with a large MTU into the target process's network namespace" },
    tags: ["slirp4netns", "rootless", "podman", "userns", "libslirp"]
  },
  {
    id: "t1020",
    name: "passt",
    url: "https://passt.top/",
    category: "container",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مشروع شبكات بوضع المستخدم يترجم حزم طبقة النقل TCP وUDP إلى مقابس عادية في عملية واحدة صغيرة، بلا موازنة ولا جسور ولا امتيازات، فيصبح التحويل الشبكي شبه شفاف للحاويات والأجهزة الافتراضية. وضع pasta الخاص به هو الخلفية الشبكية الافتراضية للحاويات غير المميزة في Podman الحديثة. أداة مثالية لفهم بدائل slirp4netns الأسرع والأبسط.",
      en: "A user-space networking project that maps TCP and UDP traffic directly onto ordinary sockets inside one tiny process, with no bridges, no NAT layers and no privileges, making connectivity nearly transparent for containers and VMs. Its pasta mode is the default networking backend for rootless containers in modern Podman. A great tool for understanding the faster, simpler alternative to slirp4netns."
    },
    cmd: "podman run --rm --network=pasta alpine ip a",
    cmdDesc: { ar: "يطلق حاوية alpine بشبكة pasta ويعرض واجهاتها داخل الفضاء غير المميز", en: "Runs an alpine container on the pasta network and lists its interfaces in the rootless namespace" },
    tags: ["passt", "pasta", "podman", "rootless", "userspace"]
  },

  // ── Mesh extras / أدوات الشبكات المتشابكة الإضافية ────────────────────
  {
    id: "t1021",
    name: "Innernet",
    url: "https://github.com/tonarino/innernet",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة من tonari تبني شبكة تراكب خاصة فوق WireGuard مع خادم تنسيق يوزّع المفاتيح ومعلومات النظراء، وتقسم الشبكة إلى CIDRs منطقية تحكم الصلاحيات بينها. تدير كل شبكة قائمة أقران تتحدث مباشرة عبر NAT، وكل قرين يرى فقط الشبكات المصرّح بها له، فتجمع بين بساطة WireGuard وقوة التوريث الدقيق للصلاحيات. خيار أنيق لشبكات الفرق الصغيرة والمتراكبة.",
      en: "A tonari tool that builds a private overlay on top of WireGuard with a coordination server distributing keys and peer endpoints, and divides the network into logical CIDRs that gate access between groups. Every peer talks directly through NAT, and each one only sees the CIDRs it was granted, combining WireGuard's simplicity with fine-grained access inheritance. An elegant choice for small-team overlay networks."
    },
    cmd: "sudo innernet list",
    cmdDesc: { ar: "يعرض واجهات شبكات Innernet المتصلة وحالة كل قرين فيها", en: "Lists the connected innernet interfaces and the status of each peer" },
    tags: ["innernet", "wireguard", "overlay", "acl", "mesh"]
  },
  {
    id: "t1022",
    name: "Tinc",
    url: "https://www.tinc-vpn.org/",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم VPN متشابك عريق يعمل منذ عام 1998 وينشئ شبكة قابلة للتوسع يصل فيها كل جهاز بجيرانه ويوجه الحركة عبر أقصر مسار — مباشرة إن أمكن أو عبر نظراء وسيطين إن حال NAT دون ذلك. يشفّر كل نفق بمفاتيح فردية ويكشف التوبولوجيا تلقائيًا، فتُبنى شبكة مغلقة بين خوادم متفرغة جغرافيًا بلا نقطة فشل واحدة. أداة كلاسيكية لتعلم مفهوم التوجيه المتشابك الفعلي.",
      en: "A veteran mesh VPN daemon dating back to 1998 that builds a scalable network where each node connects to its neighbors and forwards traffic over the shortest path — directly when possible, or through intermediary peers when NAT gets in the way. Every tunnel is individually encrypted and topology is discovered automatically, creating a closed network across scattered servers with no single point of failure. A classic tool for learning true mesh routing."
    },
    cmd: "tincd -D -n mymesh",
    cmdDesc: { ar: "يشغّل خادم tincd لشبكة mymesh في الواجهة الأمامية لمراقبة السجلات", en: "Runs the tincd daemon for the mymesh network in the foreground for log watching" },
    tags: ["tinc", "vpn", "mesh", "encryption", "p2p"]
  },
  {
    id: "t1023",
    name: "Yggdrasil",
    url: "https://yggdrasil-network.github.io/",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "شبكة تراكب تجريبية تهدف إلى بناء إنترنت متشابك لامركزي فوق أي وسط نقل موجود (TCP أو TLS أو حتى الأثير). تعنون كل عقدة بـ IPv6 دائم من المدى 200::/7 وتستخدم جدول توجيه DHT مع بحث غائي يوجّه الحزم نحو أقرب عقدة معرفة بالوجهة، فيتعلم المسار كلما زاد الاكتشاف. مختبر حي لفهم مستقبل التوجيه اللامركزي وفوق-البروتوكولي.",
      en: "An experimental overlay network aiming at a decentralized mesh internet that runs over any transport you already have, be it TCP, TLS or even wireless. Every node holds a permanent 200::/7 IPv6 address and routing uses a DHT-derived greedy search that steers packets toward the best-known next hop, improving as discovery grows. A living lab for understanding the future of decentralized, protocol-agnostic routing."
    },
    cmd: "yggdrasilctl getSelf",
    cmdDesc: { ar: "يعرض مفاتيح العقدة وعنوان IPv6 الخاص بها في شبكة Yggdrasil", en: "Shows the node's keys and its Yggdrasil IPv6 address" },
    tags: ["yggdrasil", "ipv6", "mesh", "overlay", "dht"]
  },
  {
    id: "t1024",
    name: "Cjdns",
    url: "https://github.com/cjdelisle/cjdns",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "شبكة IPv6 مشفّرة بالكامل انطلقت عام 2011 كمشروع Hyperboria، حيث يكون عنوان كل عقدة اشتقاقًا من مفتاحها العمومي فلا يمكن انتحاله، وكل وصلة مشفّرة بمفاتيحها. يوظف جدول تجزئة موزّع بأسلوب Kademlia وتوجيه المصدر لمسارات صاعدة، فيتحول كل مشترك إلى موجّه نشط في الشبكة. أداة بحثية معمّقة لفهم الأمن التأسيسي في الشبكات الندية.",
      en: "A fully encrypted IPv6 network born in 2011 with the Hyperboria community, where each node's address derives from its public key making spoofing impossible, and every link is individually encrypted. It leverages a Kademlia-style distributed hash table plus source-routed ascending paths, turning every participant into an active router. A deep research tool for understanding security built into the very fabric of a network."
    },
    cmd: "cjdroute --genconf > cjdroute.conf",
    cmdDesc: { ar: "يولّد ملف تهيئة cjdroute بمفاتيح جديدة وعنوان IPv6 فريد", en: "Generates a fresh cjdroute.conf with new keys and a unique IPv6 address" },
    tags: ["cjdns", "hyperboria", "ipv6", "mesh", "encryption"]
  },
  {
    id: "t1025",
    name: "babeld",
    url: "https://www.irif.fr/~jch/software/babel/",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خادم لبروتوكول Babel القائم على متجه المسافة بتجنب الحلقات، مصمم للشبكات اللاسلكية المتشابكة والهجينة السلكية/اللاسلكية معًا. يقدّر الروابط بمقياس هجين يجمع بين الفقد والكمون والنطاق فيغيّر المسارات خلال أجزاء من الثانية عند اهتزاز الوصل اللاسلكي، ويدعم IPv4 وIPv6 في نشر واحد. البروتوكول المفضل لمجتمعات الشبكات اللاسلكية المجتمعية في أوروبا.",
      en: "The daemon for Babel, a loop-avoiding distance-vector protocol designed for wireless mesh and hybrid wired/wireless networks. It scores links with a hybrid metric combining loss, latency and cost, so it reroutes within fractions of a second when radio links wobble, and it speaks both IPv4 and IPv6 in one deployment. The protocol of choice for community wireless networks across Europe."
    },
    cmd: "babeld wlan0 eth0",
    cmdDesc: { ar: "يطلق babeld لتبادل المسارات بين الوصلة اللاسلكية wlan0 والسلكية eth0", en: "Launches babeld to exchange routes between the wlan0 radio link and the wired eth0" },
    tags: ["babel", "babeld", "routing", "wireless", "mesh"]
  },
  {
    id: "t1026",
    name: "batman-adv",
    url: "https://www.open-mesh.org/projects/batman-adv/wiki",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "تنفيذ داخل نواة Linux لبروتوكول B.A.T.M.A.N. الأفضل مسارًا، يحوّل مجموعة من الوصلات اللاسلكية المتشابكة إلى إيثرنت وهمية واحدة على الطبقة الثانية. تظهر لكل عقدة واجهة bat0 موحدة تعمل فوق واجهات wifi الخام، وتُدار الحالة عبر أداة batctl التي تعرض جداول المنشأ وتوثيق الوصلات وإحصاءات الحركة. العمود الفقري لشبكات Freifunk المجتمعية الضخمة في ألمانيا.",
      en: "An in-kernel Linux implementation of the B.A.T.M.A.N. better-approach protocol that merges a swarm of wireless links into one virtual layer-2 Ethernet. Every node gets a unified bat0 interface layered over raw wifi radios, with state managed through batctl, which shows originator tables, link quality and traffic statistics. The backbone of Germany's huge Freifunk community networks."
    },
    cmd: "batctl o",
    cmdDesc: { ar: "يعرض جدول المنشأ OGI لعقد الشبكة وجودة الوصول إلى كل منها", en: "Prints the originator table showing every mesh node and the link quality toward it" },
    tags: ["batman-adv", "batctl", "layer2", "wireless", "mesh"]
  },
  {
    id: "t1027",
    name: "olsrd",
    url: "https://www.olsr.org/",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "الخادم المرجعي لبروتوكول OLSR الأمثل لحالة الوصل، بروتوكول استباقي بث حالة الوصل نحو الشبكات اللاسلكية المتحركة MANET. يختار كل جهاز مجموعة من العقد الوسيطة MPRs تعلن نيابةً عنه فقط، فينخفض فيض الرسائل عن الشبكات الكثيفة مع بقاء المسارات جاهزة قبل الحاجة إليها. أداة تعليمية مذهلة لمقارنة التوجيه الاستباقي بالتفاعلي في الشبكات المتشابكة.",
      en: "The reference daemon for OLSR, the Optimized Link State Routing protocol, a proactive link-state design for mobile ad-hoc networks (MANETs). Each device elects a set of Multipoint Relays that advertise on its behalf, slashing message flooding in dense networks while keeping routes precomputed before they are needed. A fantastic teaching tool for contrasting proactive versus reactive routing in mesh networks."
    },
    cmd: "olsrd -f /etc/olsrd/olsrd.conf -d 1",
    cmdDesc: { ar: "يشغّل olsrd بملف التهيئة المحدد مع مستوى تنقيح أولي", en: "Starts olsrd with the given config file and basic debug level" },
    tags: ["olsrd", "olsr", "manet", "ad-hoc", "routing"]
  },
  {
    id: "t1028",
    name: "Husarnet",
    url: "https://husarnet.com/",
    category: "mesh",
    platform: ["cross"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "شبكة VPN ندية تعطي كل جهاز عنوان IPv6 ثابتًا وتحاول التوصيل المباشر بين الأجهزة فور استطاعتها، مع خوادم تنسيق فقط لاكتشاف النظراء. استُخدمت في الأصل لربط الروبوتات المتحركة بأجهزة التحكم عبر إنترنت غير موثوق، وهي سهلة النصب على Linux وأجهزة ARM والحواسيب المكتبية. خيار عملي لتجربة شبكة p2p يديرها طرف ثالث بباقة مجانية سخية.",
      en: "A peer-to-peer VPN that assigns every device a stable IPv6 address and attempts direct connections whenever possible, using coordination servers only for peer discovery. It was originally built to link mobile robots to control stations over unreliable Internet, and installs easily on Linux, ARM boards and desktops. A practical way to experience a managed P2P mesh with a generous free tier."
    },
    cmd: "husarnet status",
    cmdDesc: { ar: "يعرض حالة عميل Husarnet وعنوان IPv6 والشبكات المنضم إليها", en: "Shows the Husarnet client status, its IPv6 address and joined networks" },
    tags: ["husarnet", "ipv6", "p2p", "vpn", "robotics"]
  },
  {
    id: "t1029",
    name: "Gluon",
    url: "https://github.com/freifunk-gluon/gluon",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار بناء نسخ firmware لمجتمعات الشبكات اللاسلكية مثل Freifunk، مبني على OpenWrt ويأتي بمستوى تحكم إداري مركزي خفيف وبروتوكولات mesh جاهزة مثل batman-adv و802.11s. تكتب ملف site.conf واحدًا ثم تبني صورًا موحدة لكل طراز موجّه مدعوم، فتنشر مئات العقد المنزلية كشبكة مدينة واحدة مفتوحة. أفضل طريقة لفهم صناعة شبكات المجتمعات واسعة النطاق.",
      en: "A firmware build framework for community wireless networks like Freifunk, based on OpenWrt and shipping with a light central management layer plus ready mesh protocols such as batman-adv and 802.11s. You write one site.conf and build uniform images for every supported router model, deploying hundreds of home nodes as one open city-wide network. The best way to understand community networks at scale."
    },
    cmd: "make GLUON_TARGET=ath79-generic",
    cmdDesc: { ar: "يبني صورة Gluon لمنصة ath79-generic للموجهات الداعمة لها", en: "Builds the Gluon image for the ath79-generic router platform" },
    tags: ["gluon", "freifunk", "openwrt", "firmware", "mesh"]
  },
  {
    id: "t1030",
    name: "LibreMesh",
    url: "https://libremesh.org/",
    category: "mesh",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منظومة برمجيات حرة تتقدمها صورة firmware مبنية على OpenWrt مع حزم lime-packages لتنشئة شبكات متشابكة مجتمعية ذاتية التهيئة. تُفعّل بروتوكولات مثل batman-adv وbmx تلقائيًا وتوزّع العناوين عبر anygw وتكشف شبكة انضمام بلا تدخل يدوي تقريبًا. وتبنّاها مجتمعات أمريكا اللاتينية بقوة لتوسيع التغطية بالاعتماد على السكان أنفسهم.",
      en: "A free-software collective centered on an OpenWrt-based firmware with the lime-packages suite that grows self-configuring community mesh networks. It activates protocols like batman-adv or bmx automatically, distributes addressing through anygw, and offers a near-zero-touch join experience for new nodes. Latin American communities in particular embrace it as a powerful way to expand coverage through residents themselves."
    },
    tags: ["libremesh", "lime", "openwrt", "community", "mesh"]
  },

  // ── VoIP extras / أدوات VoIP الإضافية ─────────────────────────────────
  {
    id: "t1031",
    name: "rtpproxy",
    url: "https://github.com/sippy/rtpproxy",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم ترحيل حزم RTP مكتوب بلغة C من Sippy Software، يعمل منذ عام 2004 بجانب الوكلاء SIP مثل Kamailio وOpenSIPS التي تتحكم به عبر قناة UDP مخصصة. يحل مشكلة اجتياز NAT للوسائط بقبول تدفق RTP من الطرفين عبر منافذ وسيطة، ويعمل بوابة IPv4/IPv6 للوسائط ويسجل الجلسات عند الحاجة. من الأركان الكلاسيكية في أي بنية SIP عالية التوافر.",
      en: "A C-language RTP relay from Sippy Software, in production since 2004, that pairs with SIP proxies like Kamailio and OpenSIPS which steer it over a dedicated UDP control channel. It solves media NAT traversal by relaying both parties' RTP through intermediate ports, doubles as an IPv4/IPv6 media gateway, and can record sessions when needed. A classic building block of any high-availability SIP architecture."
    },
    cmd: "rtpproxy -s udp:127.0.0.1:2222",
    cmdDesc: { ar: "يطلق rtpproxy مع قناة تحكم UDP على المنفذ 2222 ليتحكم به Kamailio", en: "Starts rtpproxy with its UDP control channel on port 2222 for Kamailio to command" },
    tags: ["rtpproxy", "rtp", "kamailio", "opensips", "nat"]
  },
  {
    id: "t1032",
    name: "sipexer",
    url: "https://github.com/miconda/sipexer",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة فحص واختبار SIP حديثة كتبها Daniel-Constantin Mierla مؤسس Kamailio بلغة Go، لتكون سكين الجيب التالي لـ sipsak. تتحقق من وصول الوجهة SIP وتفحص طرق التوجيه وتصادق REGISTER وتقيس زمن الاستجابة، مع إمكانيات تحميل إضافية، وتدعم TLS وWebSocket وIPv6 من العلبة. أداة خفيفة يستخدمها مديرو Kamailio/OpenSIPS لقياس صحة خوادمهم يوميًا.",
      en: "A modern SIP testing tool written in Go by Kamailio founder Daniel-Constantin Mierla as the next-generation pocket knife after sipsak. It verifies SIP reachability, inspects routing paths, authenticates REGISTER flows and measures response times, with optional load generation, and supports TLS, WebSocket and IPv6 out of the box. A lightweight daily-health tool for Kamailio and OpenSIPS administrators."
    },
    cmd: "sipexer -register -au alice -ap secret udp:10.0.0.5:5060",
    cmdDesc: { ar: "يختبر تسجيل SIP لحساب alice بكلمة السر عبر خادم UDP محدد", en: "Tests a SIP registration for user alice with a password against the given UDP server" },
    tags: ["sipexer", "sip", "testing", "kamailio", "go"]
  },
  {
    id: "t1033",
    name: "sipsak",
    url: "https://github.com/nils-ohlmeier/sipsak",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة سطر الأوامر الكلاسيكية المعروفة بسكين الجيش السويسري لبروتوكول SIP، تدعم أوضاع ping وtraceroute وflood وUSERS لفحص أي خادم SIP. تكشف معلومات المسار Record-Route وتجرب مصادقة Digest وتساعد في تعداد امتدادات المستخدمين المتاحة. أداة صغيرة سريعة تظل الأسرع في فحص خادم SIP من الطرفية مباشرة.",
      en: "The classic command-line tool known as the Swiss Army knife of SIP, offering ping, traceroute, flood and USERS modes to probe any SIP server. It surfaces Record-Route path information, exercises Digest authentication and helps enumerate which user extensions exist. A tiny, fast utility that remains the quickest way to health-check a SIP server straight from the terminal."
    },
    cmd: "sipsak -s sip:100@10.0.0.5",
    cmdDesc: { ar: "يرسل رسالة SIP OPTIONS لاختبار استجابة الامتداد 100 على الخادم", en: "Sends a SIP OPTIONS message to test extension 100 on the server" },
    tags: ["sipsak", "sip", "testing", "troubleshooting", "cli"]
  },
  {
    id: "t1034",
    name: "SEMS",
    url: "https://github.com/sems-server/sems",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خادم وسائط SIP Express مكتوب بـ ++C يكمّل Kamailio بخدمات صوتية تتطلب معالجة RTP فعلية: البريد الصوتي، الردود الآلية، المؤتمرات، الإعلانات المسجلة والبث. يبرمج منطق التطبيقات عبر لغة DSM النصية أو وحدات Python، فيفصل التطبيق الصوتي عن المنطق البرمجي بوضوح. أداة مثالية لفهم دور «خادم الوسائط» مقابل «وكيل الإشارة» في معماريات SIP.",
      en: "A C++ SIP Express Media Server that complements Kamailio with voice services requiring real RTP processing: voicemail, auto-attendants, conferencing, announcements and streaming. Application logic is scripted with the DSL called DSM or with Python modules, cleanly separating the voice application from the proxy logic. Ideal for understanding the media-server role versus the signaling proxy in SIP architectures."
    },
    cmd: "sems -f /etc/sems/sems.conf",
    cmdDesc: { ar: "يبدأ SEMS بقراءة ملف التهيئة المحدد وتحميل تطبيقاته الصوتية", en: "Starts SEMS with the given config file and loads its voice applications" },
    tags: ["sems", "media-server", "voicemail", "ivr", "rtp"]
  },
  {
    id: "t1035",
    name: "baresip",
    url: "https://github.com/baresip/baresip",
    category: "voip",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "هاتف SIP برمجي معياري مكتوب بلغة C يُبنى من وحدات تُختار وقت الترجمة لبروتوكولات الوسائل ومرمّزات الصوت ومصادر الفيديو، حتى صار عميلًا مرجعيًا شبه رسمي لمكدس libre. يمكن قيادته بالكامل عبر واجهة أوامر نصية أو مقبس TCP أو مدير CLI متحكم به برمجيًا، ما يجعله مثاليًا للأتمتة واختبار خوادم SIP. خفيف بما يكفي للعمل على Raspberry Pi كخط هاتف موثوق.",
      en: "A modular SIP softphone written in C, assembled from selectable modules for transports, codecs and video sources, effectively serving as the reference client for the libre stack. It is fully drivable through its console interface, a TCP command socket or an interactive CLI manager, making it perfect for automation and SIP server testing. Light enough to run reliably on a Raspberry Pi as a desk line."
    },
    cmd: "baresip -e \"/dial sip:100@example.com\"",
    cmdDesc: { ar: "يطلق baresip وينفذ أمر الاتصال بـ 100 فور البدء دون تدخل", en: "Launches baresip and executes the dial command for extension 100 at startup" },
    tags: ["baresip", "softphone", "sip", "libre", "c"]
  },
  {
    id: "t1036",
    name: "Twinkle",
    url: "https://github.com/lubosd/twinkle",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "هاتف SIP برمجي لنظام Linux بواجهة Qt يصونه Luboš Doležel، يدعم حسابين متزامنين مع حضور IM، ومؤتمرات ثلاثية، وبريدًا صوتيًا محليًا، ومرمّزات صوت متعددة مع نطاق عريض. يُشغّل من الواجهة الرسومية أو من سطر الأوامر بأوامر مثل الاتصال المباشر، فيناسب الاستخدام اليومي أو الاختبارات السريعة. هاتف أنيق ومكتمل لا يحتاج أكثر من نافذة صغيرة.",
      en: "A Qt-based Linux SIP softphone maintained by Luboš Doležel, supporting two concurrent accounts with IM presence, three-way conferencing, local voicemail and wideband audio codecs. It runs from the GUI or the command line with direct actions such as dialing, fitting both daily use and quick tests. A polished, complete softphone that needs nothing more than a small window."
    },
    cmd: "twinkle --call sip:100@10.0.0.5",
    cmdDesc: { ar: "يطلب من Twinkle الاتصال فورًا بالامتداد 100 على الخادم المحدد", en: "Asks Twinkle to immediately dial extension 100 on the given server" },
    tags: ["twinkle", "softphone", "qt", "linux", "sip"]
  },
  {
    id: "t1037",
    name: "MicroSIP",
    url: "https://www.microsip.org/",
    category: "voip",
    platform: ["windows"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "هاتف SIP خفيف جدًا لنظام Windows مبني فوق مكدس PJSIP الشهير، حجمه بضع ميغابايت ويوجد بنسخة محمولة تعمل من ذاكرة USB دون تثبيت. يتيح محادثات صوتية عالية الجودة بمرمّزات مثل Opus وG.722 واتصالات فيديو H.264 وخدمة انتظار الاتصال، بواجهة بسيطة يشبه هاتف المكتب. أول ما يثبّته مدراء الشبكات على أجهزة windows لاختبار خط SIP جديد.",
      en: "An extremely light Windows SIP softphone built on the well-known PJSIP stack, only a few megabytes large with a portable edition that runs straight from a USB stick. It delivers high-quality audio with codecs like Opus and G.722, H.264 video calls and call waiting in an interface resembling a desk phone. The first thing network admins install on Windows boxes to test a fresh SIP line."
    },
    tags: ["microsip", "softphone", "windows", "pjsip", "portable"]
  },
  {
    id: "t1038",
    name: "STUNTMAN",
    url: "https://github.com/jselbie/stunserver",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم STUN مفتوح المصدر بمعمارية عالية الأداء من John Selbie، يدعم RFC 5389 بتحديثاته ومحاكاة كامل سلوك NAT في وضع full server بعناوين أساسية وبديلة. يرافقه عميل اختبار جاهز يكشف نوع NAT لديك بطلقة واحدة، وهي المعلومة التي تقرر نجاح الاتصال الصوتي المباشر أو حاجته لخادم TURN. أساس مهم لفهم اجتياز NAT في VoIP وWebRTC.",
      en: "An open-source, high-performance STUN server by John Selbie implementing RFC 5389 and beyond, with a full-server mode that emulates real NAT behavior using primary and alternate IP addresses. It ships with a ready test client that reveals your NAT type in a single shot, the exact fact that decides whether direct voice calls work or a TURN server is needed. A key foundation for NAT traversal in VoIP and WebRTC."
    },
    cmd: "stunclient 10.0.0.5",
    cmdDesc: { ar: "يسأل خادم STUN المحدد ويعرض عنوانك المترجم ونوع NAT المكتشف", en: "Queries the STUN server and prints your mapped address and detected NAT type" },
    tags: ["stun", "stuntman", "nat", "webrtc", "traversal"]
  },
  {
    id: "t1039",
    name: "Yate",
    url: "https://github.com/yatevoip/yate",
    category: "voip",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "محرك هاتف Yet Another Telephony Engine من Null Team صُمم منذ 2004 بمبدأ «كل شيء وحدة قابلة للتحميل»: توجيه وبروتوكولات وبرامج تشغيل وسكربتات تُحمّل حسب الحاجة. يعمل كـ PBX كامل بواجهة ويب، أو كبوابة بين SIP وH.323 وISDN وSS7، ويتوسع لخدمة ملايين المكالمات في شركات الاتصالات الفعلية. أداة عميقة لمن يريد تعلم هندسة محركات الاتصال الحقيقية.",
      en: "Null Team's Yet Another Telephony Engine, designed since 2004 around the principle that everything is a loadable module: routing, protocols, drivers and scripting load on demand. It runs as a full PBX with a web UI, as a gateway between SIP, H.323, ISDN and SS7, and scales to millions of calls at real telcos. A deep tool for learning how production telephony engines are engineered."
    },
    cmd: "./run",
    cmdDesc: { ar: "يبدأ محرك Yate من مجلد البناء بوحداته وتكوين conf.d المرفق", en: "Starts the Yate engine from the build directory with its modules and bundled conf.d" },
    tags: ["yate", "pbx", "sip", "gateway", "null-team"]
  },
  {
    id: "t1040",
    name: "FusionPBX",
    url: "https://www.fusionpbx.com/",
    category: "voip",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "واجهة إدارة شاملة لخادم FreeSWITCH كتبت بـ PHP تمنحك PBX مؤسسي كاملًا: امتدادات المستخدمين وخطوط SIP وسياسات النداء والبريد الصوتي والفاكس وحدائق الاتصال. تدعم الافتراض متعدد المستأجرين لتشغيل مئات الشركات على خادم واحد، وتتكامل مع خطط الفوترة وأنظمة الـ RTP من خلال سكربتات تثبيت نظامية جاهزة لكل توزيعة كبرى.",
      en: "A comprehensive PHP management front end for FreeSWITCH that hands you an enterprise-grade PBX: user extensions, SIP trunks, call policies, voicemail, fax and call parks. It supports true multi-tenancy to host hundreds of companies on one server and integrates with billing plans and RTP infrastructure, with well-maintained install scripts for every major distribution."
    },
    cmd: "wget -O - https://raw.githubusercontent.com/fusionpbx/fusionpbx-install.sh/master/debian/install.sh | sh",
    cmdDesc: { ar: "ينزّل سكربت التثبيت الرسمي ويشغّل فيثبّت FusionPBX بكل تبعياته على Debian", en: "Downloads and pipes the official installer to fully provision FusionPBX with dependencies on Debian" },
    tags: ["fusionpbx", "freeswitch", "pbx", "multi-tenant", "billing"]
  },

  // ── IoT extras / أدوات إنترنت الأشياء الإضافية ────────────────────────
  {
    id: "t1041",
    name: "MQTT CLI",
    url: "https://github.com/hivemq/hivemq-cli",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "عميل MQTT نصّي من HiveMQ بواجهة أوامر شاملة تجعل اختبار الوسطاء عملًا يوميًا بسيطًا: نشرًا واشتراكًا وتشخيصًا مباشرة من الطرفية. يضمّ صدفة تفاعلية ذكية تكمل الأوامر وتحفظ سياق الاتصال بين الخطوات، ووضع اختبار يقيس أداء الوسيط ومدى مطابقته لمواصفة MQTT. أداة مثالية لأتمتة فحص جاهزية بيئات إنترنت الأشياء قبل النشر.",
      en: "HiveMQ's textual MQTT client with a rich command surface that turns broker testing into a simple daily task: publish, subscribe and diagnose straight from the terminal. It packs a smart interactive shell that completes commands and preserves connection context between steps, plus a test mode that measures broker performance and spec compliance. An ideal tool for automating IoT environment readiness checks before rollout."
    },
    cmd: "mqtt pub -t home/temp -m \"23.5\" -h 10.0.0.5",
    cmdDesc: { ar: "ينشر قيمة قياس على الموضوع home/temp نحو الوسيط المحدد", en: "Publishes a measurement value to the home/temp topic on the given broker" },
    tags: ["mqtt-cli", "hivemq", "mqtt", "testing", "shell"]
  },
  {
    id: "t1042",
    name: "Mochi MQTT",
    url: "https://github.com/mochi-co/mqtt",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "وسيط MQTT مكتوب بلغة Go صُمم ليُضمّن داخل تطبيقك في عملية واحدة، مع دعم كامل لمواصفتي MQTT 5.0 و3.1.1 وبرمجيات ربط قابلة للتخصيص للتوثيق والقياس. يعمل كوسيط مستقل أيضًا بواجهات TCP وWebSocket مع لوحة إحصاءات مدمجة، وتتوفر له صورة Docker رسمية جاهزة. حل أنيق لدمج خدمة الرسائل نفسها مع منطق التطبيق عند حوسبة الحافة.",
      en: "A Go-based MQTT broker designed to embed inside your own application as a single process, with full MQTT 5.0 and 3.1.1 support and customizable hooks for auth and telemetry. It also runs standalone exposing TCP and WebSocket listeners with a built-in stats dashboard, plus an official ready-made Docker image. An elegant way to fuse the messaging layer with your edge application logic."
    },
    cmd: "docker run -p 1883:1883 -p 8080:8080 mochimqtt/server",
    cmdDesc: { ar: "يشغّل وسيط Mochi MQTT مع منفذ MQTT ولوحة الإحصاءات من الصورة الرسمية", en: "Runs the Mochi MQTT broker with its MQTT port and stats dashboard from the official image" },
    tags: ["mochi-mqtt", "mqtt", "broker", "golang", "embedded"]
  },
  {
    id: "t1043",
    name: "Eclipse Wakaama",
    url: "https://github.com/eclipse-wakaama/wakaama",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "التنفيذ المرجعي مفتوح المصدر لبروتوكول OMA LwM2M لإدارة الأجهزة محدودة الموارد عبر CoAP، وهو من مشاريع Eclipse ومكتوب بلغة C قابلة للنقل إلى المتحكمات الدقيقة. يوفر وحدات خادم وعميل مع تطبيقات مثال جاهزة، فتجرب عليها عمليات تسجيل الجهاز وقراءة الموارد وكتابتها والإبلاغ الدوري عن القيم. الطريق العملي لفهم كيف تُدار ملايين الأجهزة الصغيرة ببروتوكول موحد موفّر للطاقة.",
      en: "The open-source reference implementation of the OMA LwM2M protocol for managing constrained devices over CoAP, an Eclipse project written in portable C for microcontrollers. It provides both server and client modules with ready example applications, letting you exercise device registration, resource read/write and periodic value reporting hands-on. The practical path to understanding how millions of small devices are managed with one energy-efficient protocol."
    },
    cmd: "./lwm2mclient -h 10.0.0.5 -p 5683",
    cmdDesc: { ar: "يسجّل جهاز العميل النموذجي في خادم LwM2M عبر CoAP على المنفذ 5683", en: "Registers the example client device with an LwM2M server over CoAP on port 5683" },
    tags: ["wakaama", "lwm2m", "coap", "eclipse", "device-management"]
  },
  {
    id: "t1044",
    name: "Aedes",
    url: "https://github.com/moscajs/aedes",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "وسيط MQTT مكتوب بـ Node.js يبسّط تشغيل الوسيط إلى سطور قليلة داخل تطبيقك نفسه، بدل خدمة منفصلة، ما جعله شائعًا للنماذج الأولية والبنى المصغّرة. يمتد عبر حزم منفصلة لكل تفصيل: مصادقة مخصصة، تخزين Redis أو MongoDB للمحفوظات، ومراقبة الاشتراكات، مع وحدة aedes-cli لتشغيله من الطرفية فورًا. أداة ممتازة لتعلم تشريح وسيط MQTT من الداخل.",
      en: "A Node.js MQTT broker that shrinks running a broker to a few lines inside your own application instead of a separate service, which made it popular for prototypes and small architectures. Every concern is a pluggable package: custom authentication, Redis or MongoDB persistence for retained state, subscription monitoring, and an aedes-cli module to run it instantly from the terminal. A great way to study MQTT broker internals."
    },
    cmd: "aedes start -p 1883",
    cmdDesc: { ar: "يطلق وسيط Aedes على المنفذ 1883 عبر وحدة aedes-cli", en: "Starts the Aedes broker on port 1883 via the aedes-cli module" },
    tags: ["aedes", "mqtt", "broker", "nodejs", "embeddable"]
  },
  {
    id: "t1045",
    name: "eKuiper",
    url: "https://github.com/lf-edge/ekuiper",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محرك معالجة تدفقات خفيف من مؤسسة LF Edge مصمم للأجهزة الحدودية المحدودة، يحوّل بيانات MQTT وEdgeX وNeuron إلى استعلامات SQL قابلة للتشغيل عند الحافة مباشرة. تكتب قاعدة تصفية أو تجميع أو كشف شذوذ بصياغة SQL مألوفة وتحصل على النتيجة إلى لوحة أو إلى الوسيط نفسه، بدل شحن كل البيانات الخام إلى السحابة. مشروع تخرّج في LF Edge ويُستخدم في مصانع حقيقية.",
      en: "A lightweight stream-processing engine from LF Edge built for constrained edge devices, turning MQTT, EdgeX and Neuron data into SQL you can run right at the edge. You write filtering, aggregation or anomaly rules in familiar SQL and route results to a dashboard or back to the broker, instead of shipping every raw sample to the cloud. A graduated LF Edge project deployed in real factories."
    },
    cmd: "docker run -d lfedge/ekuiper:latest",
    cmdDesc: { ar: "يطلق حاوية eKuiper جاهزة لمعالجة التدفقات عند الحافة", en: "Runs the eKuiper container ready for edge stream processing" },
    tags: ["ekuiper", "stream-processing", "sql", "edge", "lf-edge"]
  },
  {
    id: "t1046",
    name: "LoRa Basics Station",
    url: "https://github.com/lorabasics/basicstation",
    category: "iot",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "برمجية بوابة LoRaWAN من Semtech تعمل على موجّه Raspberry Pi موصول بلوحات مركّز لاسلكي، وتتحدث مع خوادم الشبكة عبر بروتوكولي TC وCUPS المحسّنينين للأداء والتحديث الآمن. توحّد طبقة تجريد الراديو لمخططات المرجع v1.5 وv2 وCorecell، وتدع الخادم يدير قنوات الراديو وملفات التحديث عن بعد مباشرة. العمود الفقري الميداني لبوابات The Things Network وشبكات ChirpStack التجارية.",
      en: "Semtech's LoRaWAN gateway software that runs on a Raspberry Pi attached to radio concentrator boards, talking to network servers through the TC and CUPS protocols optimized for performance and secure remote updates. It unifies the radio abstraction layer across reference designs v1.5, v2 and Corecell, and lets the server manage channel plans and firmware updates over the air. The field backbone behind The Things Network and commercial ChirpStack gateways."
    },
    cmd: "RADIODEV=/dev/spidev0.0 ./build-rpi-std/bin/station",
    cmdDesc: { ar: "يطلق محطة Basic Station موصولة بمركّز الراديو عبر واجهة SPI", en: "Launches the Basic Station process wired to the radio concentrator over SPI" },
    tags: ["basicstation", "lorawan", "gateway", "semtech", "lora"]
  },
  {
    id: "t1047",
    name: "deCONZ",
    url: "https://github.com/dresden-elektronik/deconz-rest-plugin",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "برمجيات dresden elektronik لتحويل منسق Zigbee (مثل ConBee أو RaspBee) إلى بوابة Zigbee/IP كاملة عبر REST API وWebSocket مع تطبيق Phoscon الويبي. تدير شبكة Zigbee بأجهزتها ومجموعاتها وروابطها، وتتيح لأي نظام أتمتة منزلية — أو لسكربت بسيط — قراءة المستشعرات وإرسال الأوامر بصيغة JSON. طبقة تحكم قوية ومحايدة للمورّد فوق بروتوكول Zigbee.",
      en: "dresden elektronik software that turns a Zigbee coordinator such as ConBee or RaspBee into a full Zigbee/IP gateway via a REST API, WebSocket and the Phoscon web app. It manages the Zigbee network's devices, groups and bindings, letting any home-automation platform, or a plain script, read sensors and send commands as JSON. A vendor-neutral control layer on top of Zigbee."
    },
    tags: ["deconz", "zigbee", "gateway", "conbee", "home-automation"]
  },
  {
    id: "t1048",
    name: "FUXA",
    url: "https://github.com/frangoteam/FUXA",
    category: "iot",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة SCADA وواجهات HMI تعمل في المتصفح مبنية بـ Node.js وAngular من فريق frango، تدعم مصادر بيانات صناعية حقيقية: MQTT وOPC UA وModbus TCP وWebSockets وREST. ترسم لوحات تفاعلية كاملة بمخططات ومقاييس وإنذارات بلا كتابة كود، مع طبقة مستخدمين وصلاحيات، وتُشغّل بحاوية Docker واحدة. أسرع طريق لبناء غرفة مراقبة مرئية لمصنع صغير أو مختبر.",
      en: "A browser-based SCADA and HMI platform built on Node.js and Angular by the frango team, speaking real industrial sources: MQTT, OPC UA, Modbus TCP, WebSockets and REST. It composes interactive dashboards with charts, gauges and alarms without writing code, includes users and roles, and runs as a single Docker container. The fastest route to a visual control room for a small plant or lab."
    },
    cmd: "docker run -d -p 1881:1881 frangoteam/fuxa:latest",
    cmdDesc: { ar: "يطلق FUXA على المنفذ 1881 جاهزًا لتوصيل مصادر البيانات الصناعية", en: "Starts FUXA on port 1881, ready to wire up industrial data sources" },
    tags: ["fuxa", "scada", "hmi", "opc-ua", "modbus"]
  },
  {
    id: "t1049",
    name: "ESPEasy",
    url: "https://github.com/letscontrolit/ESPEasy",
    category: "iot",
    platform: ["web"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "نسخة firmware مفتوحة المصدر لمتحكمات ESP8266 وESP32 الرخيصة تحوّل لوحة بضعة دولارات إلى عقدة استشعار كاملة تديرها من صفحة ويب داخلية. تختار الوحدة (DHT22 أو BH1750 أو BMP280...) من قائمة، تحدد فترة القياس، وترسل النتائج إلى MQTT أو HTTP أو Domoticz وOpenHAB بضغطة زر دون برمجة. أقصر مسار لتعلم دورة بيانات إنترنت الأشياء كاملة من الاستشعار حتى الوسيط.",
      en: "An open-source firmware for cheap ESP8266 and ESP32 microcontrollers that turns a few-dollar board into a complete sensing node managed from its built-in web page. You pick a plugin such as DHT22, BH1750 or BMP280 from a list, set the measurement interval, and push results to MQTT, HTTP, Domoticz or openHAB with zero programming. The shortest path to learning the full IoT loop from sensor to broker."
    },
    tags: ["espeasy", "esp8266", "esp32", "firmware", "sensors"]
  },
  {
    id: "t1050",
    name: "Kaa",
    url: "https://www.kaaproject.org/",
    category: "iot",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "منصة إنترنت الأشياء مفتوحة المصدر بدأت عام 2012 وتقدم نواة Kaa Core لإدارة الأجهزة وجمع بياناتها وتوفير لوحات مراقبة وقواعد تنبيه جاهزة. تسجّل الأجهزة تلقائيًا وتدير إصدارات firmware وبياناتها الوصفية، وتتصل بخدمات التخزين والتحليلات بمعمارية قابلة للتوسيع، مع باقة سحابية مجانية للتجارب. أداة جيدة لتجربة بنية منصة IoT إنتاجية دون بنائها من الصفر.",
      en: "An open-source IoT platform started in 2012, offering the Kaa Core for device management, telemetry collection, ready dashboards and alerting rules. Devices auto-provision, firmware versions and metadata stay managed, and storage or analytics services plug in through an extensible architecture, with a free cloud tier for experiments. A good way to experience a production-grade IoT platform without building one from scratch."
    },
    tags: ["kaa", "iot-platform", "device-management", "telemetry", "cloud"]
  },

  // ── Incident extras / أدوات الاستجابة للحوادث الإضافية ─────────────────
  {
    id: "t1051",
    name: "Fenrir",
    url: "https://github.com/Neo23x0/Fenrir",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "ماسح مؤشرات اختراق IOC كتبه Florian Roth بلغة Bash الخالصة فلا يحتاج تثبيت أي تبعيات على الأنظمة المفحوصة. يقرأ قوائم IOC بصرائف بسيطة (هاشات و SSDEEP وسلاسل نصية وأسماء ملفات) ويمسح بها نظام Linux أو macOS خلال دقائق ويعمل تقريرًا منظمًا. أداة الفحص السريع الأولى عند دخولك شبكة مشتبه بها أثناء حادثة، بلا أي تغيير على الجهاز.",
      en: "An indicator-of-compromise scanner written by Florian Roth in pure Bash, so it needs zero dependencies installed on the systems it inspects. It consumes simple tabular IOC lists of hashes, SSDEEP fuzzy hashes, strings and file names, sweeps a Linux or macOS host in minutes, and emits a structured report. The first quick-sweep tool when you step into a suspect network mid-incident, without altering the machine."
    },
    cmd: "./fenrir.sh /case/evidence",
    cmdDesc: { ar: "يفحص الدليل المحدد بحثًا عن مطابقات لقوائم IOC المرفقة وينتج تقريرًا", en: "Scans the given evidence path for matches against the bundled IOC lists and writes a report" },
    tags: ["fenrir", "ioc", "scanner", "bash", "dfir"]
  },
  {
    id: "t1052",
    name: "Strelka",
    url: "https://github.com/target/strelka",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار فحص ملفات آني من فريق Target مبني على قواعد YARA ومنظومة ماسحات Python لكل نوع ملف (أرشيفات وملفات تنفيذية ومستندات ورسائل بريد). يُشغّل كخدمة خلفية تستقبل الملفات عبر gRPC أو ZeroMQ وتعيد ميتاداتا غنية عن كل عينة، ما يجعله قلب منصات الصيد الآلي في SOC. يكفي تشغيل strelka-oneshot محليًا لتحليل عينة مشبوهة فورًا.",
      en: "A real-time file-scanning framework from Target's security team, driven by YARA rules plus a family of Python scanners for archives, executables, documents and mail. Deployed as a backend service ingesting files over gRPC or ZeroMQ and returning rich metadata for every sample, it powers automated hunting pipelines in SOCs. A local strelka-oneshot run is enough to dissect a suspicious file immediately."
    },
    cmd: "./strelka-oneshot -f sample.exe -l - | jq",
    cmdDesc: { ar: "يفحص العينة عبر كل الماسحات ويعرض النتيجة JSON منسقة بـ jq", en: "Scans the sample through all scanners and pretty-prints the JSON result with jq" },
    tags: ["strelka", "yara", "file-scanning", "target", "threat-hunting"]
  },
  {
    id: "t1053",
    name: "RITA",
    url: "https://github.com/activecm/rita",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة Real Intelligence Threat Analytics من Active Countermeasures تحلّل سجلات Zeek لاكتشاف سلوك القيادة والتحكم C2 إحصائيًا بدل الاعتماد على التواقيع. تحسب «إشارات المنارة» من انتظام الاتصالات الزمنية وحجمها، وتكشف الاتصالات الطويلة والنادرة وشذوذ DNS، ثم تصنف النتائج بدرجات قابلة للفرز. أداة صيد أساسية لكل من عنده سجلات Zeek ولا يعرف ماذا يفعل بها.",
      en: "Real Intelligence Threat Analytics from Active Countermeasures parses Zeek logs to detect command-and-control behavior statistically instead of relying on signatures. It computes beaconing scores from the timing and volume regularity of connections, flags long and rare connections plus DNS anomalies, and ranks results with sortable scores. An essential hunting tool for anyone sitting on Zeek logs and unsure what to do with them."
    },
    cmd: "rita import --database=case1 --logs=~/zeek-logs",
    cmdDesc: { ar: "يستورد سجلات Zeek إلى قاعدة بيانات الحادثة case1 استعدادًا للتحليل", en: "Imports the Zeek logs into incident database case1 ready for analysis" },
    tags: ["rita", "zeek", "beaconing", "c2", "threat-hunting"]
  },
  {
    id: "t1054",
    name: "FIR",
    url: "https://github.com/certsocietegenerale/FIR",
    category: "incident",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة إدارة الحوادث FIR من فريق CERT في بنك Société Générale مبنية بـ Django، وُلدت من ممارسة CSIRT حقيقية لا من نظرية. تدعم إدارة الحوادث بوحدات مخصصة لكل نوع (حوادث أمن وطلبات عامة وتحقيق جنائي)، مع خط زمني للإجراءات وتصنيف تلقائي وشجرة تقارير قابلة للتفصيل والملخص. أداة عملية لتشغيل فريق استجابة صغير بنظام وتوثيق قابل للتدقيق.",
      en: "The FIR incident-management platform from Société Générale's CERT built on Django, born from actual CSIRT practice rather than theory. It handles incidents with dedicated modules for security incidents, general requests and investigations, with action timelines, automatic classification and a drillable summary/reporting tree. A practical tool to run a small response team with auditable records."
    },
    tags: ["fir", "incident-management", "csirt", "django", "cert"]
  },
  {
    id: "t1055",
    name: "UAC",
    url: "https://github.com/tclahr/uac",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "جامع أدلة Unix-like Artifacts Collector يفحص AIX وLinux وmacOS وSolaris ويجمع أكثر من 600 عنصر جنائي في بضعة دقائق من سطر واحد. يغطي ملفات النظام والسجلات والاتصالات وذاكرة العمليات وأدلة الحسابات ومخلفات الحاويات والسحابة، بملفات YAML تصف كل عنصر فيمكن تخصيصها أو استبعادها بسهولة. أداة التفرّغ الأولى للمحقق عند وصوله أي خادم Unix.",
      en: "The Unix-like Artifacts Collector sweeps AIX, Linux, macOS and Solaris, gathering more than 600 forensic artifacts in minutes from a single command line. It covers system files, logs, connections, process memory, account traces and container or cloud leftovers, with every artifact described in editable YAML definitions you can customize or exclude. The first triage tool for an investigator landing on any Unix server."
    },
    cmd: "sudo ./uac -p ir_triage /mnt/case",
    cmdDesc: { ar: "يجمع أدلة التفرّغ الأولي من صورة القضية وفق ملف ir_triage", en: "Collects first-response triage artifacts from the case image using the ir_triage profile" },
    tags: ["uac", "triage", "artifacts", "forensics", "ir"]
  },
  {
    id: "t1056",
    name: "LiME",
    url: "https://github.com/504ensicsLabs/LiME",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "وحدة نواة Linux Memory Extractor تُحمّل داخل النواة لالتقاط صورة كاملة من الذاكرة الطيارة بصورة موثوقة عبر قناة الكتابة المباشرة للملف أو الشبكة. تميّزها عن أدوات userspace التقليدية أنها تقرأ الذاكرة من مسار لا يمكن للبرمجيات الخبيثة تعديله، وتقرأ الذاكرة قراءة ذرّية سليمة على الأنظمة متعددة المراحل SMP. أداة أساسية لأي تحقيق جنائي في خادم Linux جارٍ.",
      en: "The Linux Memory Extractor kernel module loads straight into the kernel to capture a complete volatile memory image, writing it to a file or over the network through a path malware cannot tamper with. Unlike conventional userspace dumpers it reads memory atomically and handles multi-core systems safely. An indispensable tool for live forensic investigations on running Linux servers."
    },
    cmd: "insmod ./lime-6.1.0.ko \"path=/mnt/usb/ram.lime format=lime\"",
    cmdDesc: { ar: "يحمّل وحدة LiME لتحفظ نسخة الذاكرة بتنسيق lime على قرص USB", en: "Loads the LiME module to save the memory dump in lime format onto a USB drive" },
    tags: ["lime", "memory-acquisition", "forensics", "linux", "volatility"]
  },
  {
    id: "t1057",
    name: "Rekall",
    url: "https://github.com/google/rekall",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار تحليل الذاكرة الطيارة من Google بدأه مؤلفو Volatility الأصليون لتصحيح مسار الإطار وتمكين التحليل الحي والآجل معًا. يوفر قابلات استدلال ذاتية التحديث فوق طبقة حساب أدق، وملحقات مثل pslist وmemmap وnetscan تعمل على صور Windows وLinux وmacOS، مع واجهة ويب تفاعلية اختيارية. دراسة مقارنته مع Volatility3 تكشف تطور علم تحليل الذاكرة نفسه.",
      en: "Google's volatile-memory analysis framework, started by the original Volatility authors to rebuild the engine for both live and offline analysis. It ships self-updating profile inference over a more precise computation layer, with plugins like pslist, memmap and netscan working across Windows, Linux and macOS images, plus an optional interactive web console. Comparing it with Volatility3 reveals how memory-forensic science itself evolved."
    },
    cmd: "rekal -f /mnt/usb/ram.raw pslist",
    cmdDesc: { ar: "يستخرج قائمة العمليات الجارية من صورة الذاكرة الملتقطة", en: "Extracts the process list from the captured memory image" },
    tags: ["rekall", "memory-forensics", "google", "malware", "dfir"]
  },
  {
    id: "t1058",
    name: "bulk_extractor",
    url: "https://github.com/simsong/bulk_extractor",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أداة استخراج سمات رقمية عالية الإنتاجية من Simson Garfinkel تمسح صور الأقراص والذاكرة بأكملها وفقًا لمعمارية متوازية بلا نظام ملفات مسبق. تكتشف تلقائيًا عناوين البريد الإلكتروني وبطاقات الائتمان وعناوين URL وبيانات EXIF ومحفوظات المتصفح وتضغط الكشوف في ملفات نصية جاهزة للفرز والفهرسة. سرعتها تجعلها أول خط فرز في التحقيقات الضخمة متعددة التيرابايت.",
      en: "Simson Garfinkel's high-throughput digital-feature extractor scans entire disk or memory images in parallel, without needing a prior filesystem. It automatically surfaces email addresses, credit-card numbers, URLs, EXIF data, browser histories and more, emitting sorted text feature files ready for review and indexing. Its speed makes it the first-pass triage tool in multi-terabyte investigations."
    },
    cmd: "bulk_extractor -o /case/be /mnt/usb/disk.dd",
    cmdDesc: { ar: "يمسح صورة القرص ويكتب كل السمات المستخرجة إلى مجلد التقرير", en: "Scans the disk image and writes every extracted feature into the report folder" },
    tags: ["bulk-extractor", "forensics", "carving", "triage", "parallel"]
  },
  {
    id: "t1059",
    name: "CAINE",
    url: "https://www.caine-live.net/",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "توزيعة GNU/Linux إيطالية للحوسبة الجنائية تعمل من قرص USB مباشرة وتعتمد مبدأ عدم تغيير الدليل أصلًا: تمنع الكتابة التلقائية على الأقراص المرفقة ووحدة rbfuser تطلب تأكيدًا صريحًا لأي وصول كتابي. تضم أدوات تصوير مثل Guymager وFTK Imager وأدوات تحليل متكاملة مع واجهة Palesco وCAINE Report لصناعة تقرير الحادثة آليًا. بيئة جاهزة كاملة يُقلع منها المحقق في أي جلسة ميدانية.",
      en: "An Italian GNU/Linux forensics live distribution that boots straight from USB and is engineered around not altering evidence: automatic mounting of attached disks is blocked, and a wrapper tool demands explicit confirmation for any write access. It bundles imaging tools such as Guymager and FTK Imager, analysis suites, and automated case reporting. A complete ready-to-boot environment for field examination sessions."
    },
    tags: ["caine", "live-distro", "forensics", "acquisition", "guymager"]
  },
  {
    id: "t1060",
    name: "Scalpel",
    url: "https://github.com/sleuthkit/scalpel",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة نحت الملفات file carving المكتوبة بـ ++C والمصونة في مستودع The Sleuth Kit، وُلدت من إعادة بناء أداة Foremost عام 2005 وأصبحت مرجعًا في المجال. تبني القراءة من ملف تعريفات يحدد توقيعات الرأس والذيل لكل نوع ملف فتستخرج الملفات مباشرة من الصورة الثنائية حتى بلا نظام ملفات سليم، مع خيوط متعددة ودعم تعابير نمطية. أداة أصيلة لاستعادة الصور والمستندات من الأقراص المعطوبة أو المحذوفة.",
      en: "A C++ file-carving tool hosted in The Sleuth Kit repository, born from a 2005 rewrite of Foremost that itself became an industry reference. Driven by a definition file of header/footer signatures per file type, it extracts files straight from raw images even without a healthy filesystem, with multithreading and regular-expression signatures. The classic tool for recovering pictures and documents from damaged or wiped disks."
    },
    cmd: "scalpel -c /etc/scalpel/scalpel.conf -o /case/carved /mnt/usb/disk.dd",
    cmdDesc: { ar: "ينحت الملفات من صورة القرص وفق توقيعات ملف التهيئة ويضعها في مجلد النتائج", en: "Carves files from the disk image per the config signatures into the output folder" },
    tags: ["scalpel", "carving", "sleuthkit", "forensics", "recovery"]
  }
];
