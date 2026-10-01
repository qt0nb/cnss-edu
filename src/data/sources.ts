// ─── CNSS-edu academic sources registry ──────────────────────────────────
// Curated from: IETF RFCs, NIST/IEEE/ISO/ITU standards, peer-reviewed papers,
// canonical textbooks, and official university courses (Stanford, MIT, Berkeley…).
// `quote: true`  → excerpt is VERBATIM from the document (see `ref`).
// `quote: false` → excerpt is a faithful summary of the official description.

import type { Source } from "@/lib/types";

export const SOURCES: Source[] = [
  // ── m01 · Network Fundamentals ────────────────────────────────────────
  {
    id: "cerf-kahn-1974",
    kind: "paper",
    title: "A Protocol for Packet Network Intercommunication",
    org: "IEEE Transactions on Communications",
    year: 1974,
    authors: "Vinton G. Cerf, Robert E. Kahn",
    url: "https://scholar.google.com/scholar?q=%22A+Protocol+for+Packet+Network+Intercommunication%22",
    excerpt:
      "The protocol described here breaks the network communication problem into two problems: host-to-network and host-to-host, introducing the idea of a gateway between networks and of internetworking itself — the origin of TCP/IP.",
    quote: false,
    desc: {
      ar: "الورقة المؤسِّسة للإنترنت نفسها: من قلم أبَيْ TCP/IP. هنا وُلدت فكرة «شبكة الشبكات» والبوابة (gateway) بينها — اقرأها لتفهم لماذا صُمِّم الإنترنت من شبكات مستقلة تتواصل عبر بروتوكول مشترك.",
      en: "The founding paper of the Internet itself, by the fathers of TCP/IP: where the idea of a 'network of networks' and the inter-network gateway was born.",
    },
  },
  {
    id: "clark-1988",
    kind: "paper",
    title: "The Design Philosophy of the DARPA Internet Protocols",
    org: "ACM SIGCOMM Computer Communication Review",
    year: 1988,
    authors: "David D. Clark (MIT LCS)",
    url: "https://scholar.google.com/scholar?q=%22The+Design+Philosophy+of+the+DARPA+Internet+Protocols%22",
    excerpt: "Internet communication must continue despite loss of networks or gateways.",
    quote: true,
    ref: "§1 — primary design goal",
    desc: {
      ar: "أهم ورقة تشرح «لماذا» صُمِّم الإنترنت كما هو: البقاء أولاً (survivability)، التوزيع بدل المركزية، وتفضيل الفعالية على الكمال. مرجعنا الأول في دروس فلسفة التصميم.",
      en: "The definitive paper on WHY the Internet is designed the way it is: survivability first, distribution over centralization, and pragmatism over perfection.",
    },
  },
  {
    id: "rfc1122",
    kind: "rfc",
    title: "RFC 1122 — Requirements for Internet Hosts: Communication Layers",
    org: "Internet Engineering Task Force (IETF)",
    year: 1989,
    authors: "R. Braden (ISI)",
    url: "https://www.rfc-editor.org/rfc/rfc1122",
    excerpt: "be conservative in what you do, be liberal in what you accept from others",
    quote: true,
    ref: "§1.2.2 — Robustness Principle",
    desc: {
      ar: "المصدر الأصلي لمبدأ «المتانة» الشهير (مبدأ Postel) الذي يفسر لماذا يتقبل الإنترنت تطبيقاتٍ غير كاملة. المرجع المعياري لمتطلبات الطبقات في الأنظمة المضيفة.",
      en: "The original source of the famous Robustness Principle (Postel's law), and the canonical requirements reference for host-side protocol layers.",
    },
  },
  {
    id: "kurose-ross",
    kind: "book",
    title: "Computer Networking: A Top-Down Approach (8th ed.)",
    org: "Pearson — authors' official site",
    year: 2021,
    authors: "James F. Kurose, Keith W. Ross",
    url: "https://www-net.cs.umass.edu/kurose-ross/",
    excerpt:
      "The world's most widely used university networking textbook (over 100 editions' worth of adoptions). Teaches from the application layer down: first you use an app you love, then you peel its protocols apart layer by layer.",
    quote: false,
    desc: {
      ar: "المرجع الجامعي الأكثر اعتماداً في العالم لتعليم الشبكات، بمنهج «من الأعلى للأسفل». ستجد تشابك دروسنا مع فصوله في كل وحدة من CNSS-edu.",
      en: "The most widely adopted university networking textbook worldwide; our lesson structure is consciously aligned with its top-down chapter flow.",
    },
  },
  {
    id: "tanenbaum-networks",
    kind: "book",
    title: "Computer Networks (6th ed.)",
    org: "Pearson — Andrew Tanenbaum & David Wetherall & Nick Feamster",
    year: 2021,
    authors: "A. S. Tanenbaum, D. J. Wetherall, N. Feamster",
    url: "https://www.distributed-systems.net/",
    excerpt:
      "The classic bottom-up reference: physical layer to applications, with the most-cited structured explanation of layering, encapsulation, and protocol design trade-offs in the field.",
    quote: false,
    desc: {
      ar: "المرجع «الكلاسيكي» بمنهج من الأسفل للأعلى — أدق عرض لطبقات OSI وحدة التغليف (encapsulation) ومقايضات تصميم البروتوكولات منذ 1980.",
      en: "The classic bottom-up reference — the most-cited structured treatment of layering, encapsulation, and protocol design trade-offs since the 1980s.",
    },
  },
  {
    id: "stanford-cs144",
    kind: "course",
    title: "CS144 — Introduction to Computer Networking",
    org: "Stanford University",
    year: 2024,
    url: "https://cs144.github.io/",
    excerpt:
      "Official course: the design and implementation of computer networks, including the Internet. Students build a working, standards-conformant TCP implementation from scratch through the 'Mininet' virtual-network labs.",
    quote: false,
    desc: {
      ar: "مقرر ستانفورد الشهير CS144 — دَرْسُنا في وحدات النقل والتوجيه يستلهم مختباره (بناء TCP كاملاً من الصفر). افحص موقع المقرر لمشاريع إضافية.",
      en: "Stanford's famous CS144 — our transport and routing labs are inspired by its assignments (building a full TCP from scratch).",
    },
  },
  {
    id: "berkeley-cs168",
    kind: "course",
    title: "CS168 — Introduction to Computer Networks",
    org: "UC Berkeley",
    year: 2024,
    url: "https://cs168.io/",
    excerpt:
      "Berkeley's undergraduate networking course: covers the Internet architecture, transport (reliability, congestion control), routing protocols, and link layers, with excellent public lecture notes and labs.",
    quote: false,
    desc: {
      ar: "مقرر بيركلي CS168 — محاضراته المفتوحة من أنضج الموارد الجامعية في التوجيه وتحكم الازدحام؛ نستأنس بها في دروس الخوارزميات.",
      en: "Berkeley's CS168 — its open lecture notes are among the cleanest university treatments of routing and congestion control.",
    },
  },
  {
    id: "rfc2235",
    kind: "rfc",
    title: "RFC 2235 — A Brief History of the Internet",
    org: "Internet Engineering Task Force (IETF)",
    year: 1997,
    authors: "B. M. Leiner et al. (Internet pioneers)",
    url: "https://www.rfc-editor.org/rfc/rfc2235",
    excerpt: "The Internet has revolutionized the computer and communications world like nothing before.",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "تاريخ الإنترنت من رواده أنفسهم: من ARPANET إلى شبكة اليوم — مرجع وحدة «أساسيات الشبكات» في تتبع نشأة المعايير.",
      en: "The Internet's history told by its own pioneers — our reference for how the standards we teach actually came to be.",
    },
  },

  // ── m02 · OSI Model & layering ───────────────────────────────────────
  {
    id: "itu-x200",
    kind: "standard",
    title: "ITU-T X.200 — OSI Basic Reference Model",
    org: "International Telecommunication Union (ITU)",
    year: 1994,
    url: "https://www.itu.int/rec/T-REC-X.200-199411-I/en",
    excerpt:
      "The international standard formally defining the seven-layer Open Systems Interconnection reference model: Physical, Data Link, Network, Transport, Session, Presentation, and Application.",
    quote: false,
    desc: {
      ar: "المعيار الدولي الرسمي الذي عرّف نموذج OSI بطبقاته السبع كما ندرّسه — الوثيقة الأم لكل دروس وحدة OSI.",
      en: "The formal international standard that defines the seven OSI layers — the primary document behind our OSI module.",
    },
  },
  {
    id: "kozierok-tcpipguide",
    kind: "portal",
    title: "The TCP/IP Guide",
    org: "Charles M. Kozierok (free online reference)",
    year: 2005,
    url: "http://www.tcpipguide.com/",
    excerpt:
      "A complete, free online reference to the entire TCP/IP protocol suite with hundreds of conceptual diagrams, covering each protocol's headers, operation, and design rationale in depth.",
    quote: false,
    desc: {
      ar: "أشمل مرجع مجاني على الإنترنت لحزمة TCP/IP: كل بروتوكول برأسه وتشغيله وفلسفة تصميمه — ملازم دروس ترويسات الحزم.",
      en: "The most complete free TCP/IP reference online — our companion for every packet-header lesson.",
    },
  },
  {
    id: "stevens-tcpip",
    kind: "book",
    title: "TCP/IP Illustrated, Volume 1: The Protocols (2nd ed.)",
    org: "Addison-Wesley",
    year: 2011,
    authors: "W. Richard Stevens, Kevin R. Fall",
    url: "https://www.informit.com/store/tcp-ip-illustrated-volume-1-the-protocols-9780321336316",
    excerpt:
      "The legendary deep-dive: every protocol taught from real packet traces. Where other books show diagrams, Stevens shows you the actual bytes on the wire and decodes them line by line.",
    quote: false,
    desc: {
      ar: "المرجع الأسطوري الذي يعلّم كل بروتوكول من التقاطات حزم حقيقية — نهجنا نفسه في «اقرأ الحزمة بعينك» عبر Wireshark.",
      en: "The legendary protocol deep-dive that teaches from real packet traces — the inspiration behind our 'read the packet with your own eyes' approach.",
    },
  },

  // ── m03 · Physical layer & cabling ───────────────────────────────────
  {
    id: "ieee-802-3",
    kind: "standard",
    title: "IEEE Std 802.3 — Ethernet (incl. PoE 802.3af/at/bt)",
    org: "IEEE 802.3 Working Group",
    year: 2024,
    url: "https://www.ieee802.org/3/",
    excerpt:
      "The family of standards defining wired Ethernet: from 10BASE-T through 10/40/400GB, twisted-pair and fiber physical layers, auto-negotiation, MDI/MDIX, and Power over Ethernet.",
    quote: false,
    desc: {
      ar: "عائلة معايير Ethernet الرسمية: سرعاتها، كابلاتها، التفاوض التلقائي، وتغذية PoE — مرجع دروس النحاس والضوء والسرعات.",
      en: "The official Ethernet standards family: speeds, media, auto-negotiation, and PoE — our physical-layer module's backbone.",
    },
  },
  {
    id: "cloudflare-fiber",
    kind: "portal",
    title: "What is a fiber-optic cable?",
    org: "Cloudflare Learning Center",
    year: 2024,
    url: "https://www.cloudflare.com/learning/cdn/glossary/fiber-optic-cable/",
    excerpt:
      "Explains fiber-optic cabling: how light pulses carry data in glass cores, single-mode vs multi-mode, total internal reflection, and why fiber became the backbone of global connectivity.",
    quote: false,
    desc: {
      ar: "شرح Cloudflare التعليمي للألياف الضوئية: الانتقال الكلي للضوء، النمط الأحادي مقابل متعدد الأنماط، ولماذا صارت الألياف عمود الإنترنت الفقري.",
      en: "Cloudflare's learning entry on fiber optics: total internal reflection, single- vs multi-mode, and why fiber runs the Internet's backbone.",
    },
  },
  {
    id: "spurgeon-ethernet",
    kind: "book",
    title: "Ethernet: The Definitive Guide",
    org: "O'Reilly Media",
    year: 2000,
    authors: "Charles E. Spurgeon, Joann Zimmerman (2nd ed. 2014)",
    url: "https://www.oreilly.com/library/view/ethernet-the-definitive/156592559x/",
    excerpt:
      "The definitive practical reference on Ethernet systems: signaling, cabling categories, repeaters vs switches, collision domains, and structured cabling design.",
    quote: false,
    desc: {
      ar: "المرجع العملي الشامل لنظم Ethernet: الإشارات، فئات الكابلات، المجالات التصادمية، وتصميم الكابلات المهيكلة.",
      en: "The definitive practical Ethernet reference: signaling, cable categories, collision domains, and structured cabling design.",
    },
  },

  // ── m04 · Data link & switching ──────────────────────────────────────
  {
    id: "ieee-802-1d",
    kind: "standard",
    title: "IEEE Std 802.1D — MAC Bridges (Spanning Tree)",
    org: "IEEE 802.1 Working Group",
    year: 2004,
    url: "https://www.ieee802.org/1/",
    excerpt:
      "The standard defining bridge operation and the Spanning Tree Protocol (STP/RSTP): how Layer-2 bridges form loop-free active topologies while keeping redundant links in standby.",
    quote: false,
    desc: {
      ar: "المعيار الأم لبروتوكول الشجرة الممتدة: كيف تبني المبدّلات طوبولوجيا بلا حلقات مع إبقاء الوصلات الاحتياطية نائمة.",
      en: "The parent standard of the Spanning Tree Protocol: loop-free active topologies with standby redundancy.",
    },
  },
  {
    id: "ieee-802-1q",
    kind: "standard",
    title: "IEEE Std 802.1Q — Virtual Bridged LANs (VLAN tags)",
    org: "IEEE 802.1 Working Group",
    year: 2022,
    url: "https://www.ieee802.org/1/",
    excerpt:
      "Defines VLAN tagging: the 4-byte 802.1Q tag inserted into Ethernet frames, VLAN identifiers (0-4095), priority code points, and the bridge rules that keep virtual LANs isolated.",
    quote: false,
    desc: {
      ar: "المعيار الذي عرّف وسم VLAN: البايتات الأربعة داخل الإطار، المعرّفات 0-4095، وقواعد عزل الشبكات الافتراضية.",
      en: "The standard that defined the VLAN tag: the 4 bytes inside the frame, VID range, and bridge isolation rules.",
    },
  },
  {
    id: "rfc826",
    kind: "rfc",
    title: "RFC 826 — An Ethernet Address Resolution Protocol (ARP)",
    org: "Internet Engineering Task Force (IETF)",
    year: 1982,
    authors: "D. C. Plummer (MIT)",
    url: "https://www.rfc-editor.org/rfc/rfc826",
    excerpt:
      "Specifies how a host on a broadcast link discovers the link-layer (MAC) address corresponding to a protocol (IP) address, by broadcasting a request and awaiting a reply.",
    quote: false,
    desc: {
      ar: "وثيقة ARP الأصلية من MIT: بثُّ السؤال «من يملك هذا الـIP؟» وانتظار الرد بعنوان MAC — أساس كل دروس وحدة الوصل.",
      en: "The original ARP document: broadcasting 'who owns this IP?' and waiting for the MAC — the basis of every data-link lesson.",
    },
  },
  {
    id: "cisco-vlan-guide",
    kind: "vendor",
    title: "VLAN Configuration Guide — Cisco IOS",
    org: "Cisco Systems (official documentation)",
    year: 2024,
    url: "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/lan/configuration/15-mt/lan-15-mt-book.html",
    excerpt:
      "Cisco's official IOS VLAN guide: creating VLANs, access vs trunk ports, VTP, encapsulation (dot1q/ISL), and inter-VLAN routing configuration.",
    quote: false,
    desc: {
      ar: "دليل Cisco الرسمي لتكوين VLAN: منافذ الوصول مقابل الجذعية، VTP، والتوجيه بين VLANs — مطابق لأوامر محاكي NetSim.",
      en: "Cisco's official VLAN configuration guide — command syntax mirrors our NetSim simulator exactly.",
    },
  },

  // ── m05 · Network layer & IP addressing ──────────────────────────────
  {
    id: "rfc791",
    kind: "rfc",
    title: "RFC 791 — Internet Protocol (IPv4)",
    org: "Internet Engineering Task Force (IETF)",
    year: 1981,
    authors: "J. Postel (ed., USC/ISI)",
    url: "https://www.rfc-editor.org/rfc/rfc791",
    excerpt:
      "The internet protocol is specifically limited in scope to provide the functions necessary to deliver a package of bits (an internet datagram) from a source to a destination over an interconnected system of networks.",
    quote: true,
    ref: "§1.1 — Scope",
    desc: {
      ar: "وثيقة IPv4 الأصلية: تعريف المخطط (datagram)، الترويسة بحقولها الستة عشر، والتفتيت — مرجعنا الحرفي لدرس ترويسة IP.",
      en: "The original IPv4 document: datagram definition, the 16-field header, fragmentation — our literal reference for the IP-header lesson.",
    },
  },
  {
    id: "rfc1918",
    kind: "rfc",
    title: "RFC 1918 — Address Allocation for Private Internets",
    org: "Internet Engineering Task Force (IETF)",
    year: 1996,
    authors: "Y. Rekhter, B. Moskowitz, D. Karrenberg, G. J. de Groot, E. Lear",
    url: "https://www.rfc-editor.org/rfc/rfc1918",
    excerpt: "This document describes address allocation for private internets.",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "المعيار الذي منحنا النطاقات الخاصة 10/8 و172.16/12 و192.168/16 — لماذا توجد العناوين الخاصة أصلاً وما علاقتها بـNAT.",
      en: "The standard that gave us 10/8, 172.16/12 and 192.168/16 — why private addressing exists and how it relates to NAT.",
    },
  },
  {
    id: "rfc950",
    kind: "rfc",
    title: "RFC 950 — Standard Subnetting Procedure",
    org: "Internet Engineering Task Force (IETF)",
    year: 1985,
    authors: "J. Mogul, J. Postel",
    url: "https://www.rfc-editor.org/rfc/rfc950",
    excerpt:
      "The memo that introduced subnetting: borrowing bits from the host part of the address and distributing subnet masks to allow networks to be divided internally.",
    quote: false,
    desc: {
      ar: "الوثيقة التي وضعت إجراء «اقتراض البتات» لتقسيم الشبكة إلى شبكات فرعية — البذرة الأولى لعلم الشبكات الفرعية.",
      en: "The memo that introduced bit-borrowing and subnet masks — the seed of subnetting science.",
    },
  },
  {
    id: "rfc4632",
    kind: "rfc",
    title: "RFC 4632 — Classless Inter-Domain Routing (CIDR)",
    org: "Internet Engineering Task Force (IETF)",
    year: 2006,
    authors: "V. Fuller, T. Li (Cisco)",
    url: "https://www.rfc-editor.org/rfc/rfc4632",
    excerpt:
      "Documents the move from classful A/B/C addressing to CIDR: variable-length prefixes and route aggregation, which saved the IPv4 address space in the 1990s.",
    quote: false,
    desc: {
      ar: "قصة الانتقال من العناوين الصنفية إلى CIDR: البادئات متغيرة الطول وتجميع المسارات التي أنقذت IPv4 في التسعينيات.",
      en: "The story of classful→CIDR: variable prefixes and aggregation that rescued IPv4 in the 1990s.",
    },
  },
  {
    id: "rfc1812",
    kind: "rfc",
    title: "RFC 1812 — Requirements for IP Version 4 Routers",
    org: "Internet Engineering Task Force (IETF)",
    year: 1995,
    authors: "F. Baker (ed., Cisco)",
    url: "https://www.rfc-editor.org/rfc/rfc1812",
    excerpt:
      "The canonical document describing what an IPv4 router MUST, SHOULD and MAY do: forwarding, TTL handling, error generation, subnet masks, and filtering.",
    quote: false,
    desc: {
      ar: "الوثيقة المرجعية لسلوك الموجّه: ماذا يجب وماذا يستحسن أن يفعل الموجّه بالحزمة — مرجع دروس التوجيه والـTTL.",
      en: "The canonical router-behavior document (MUST/SHOULD/MAY) — our reference for forwarding and TTL lessons.",
    },
  },
  {
    id: "rfc8200",
    kind: "rfc",
    title: "RFC 8200 — Internet Protocol, Version 6 (IPv6)",
    org: "Internet Engineering Task Force (IETF)",
    year: 2017,
    authors: "S. Deering (USC/ISI), R. Hinden (Check Point)",
    url: "https://www.rfc-editor.org/rfc/rfc8200",
    excerpt: "This document specifies version 6 of the Internet Protocol (IPv6).",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "مواصفة IPv6 الحالية: ترويسة مبسطة من 40 بايت، معالجة التفتيت على المصدر فقط، وتوسعة العناوين إلى 128 بت.",
      en: "The current IPv6 specification: the fixed 40-byte header, source-only fragmentation, and 128-bit addresses.",
    },
  },
  {
    id: "rfc4291",
    kind: "rfc",
    title: "RFC 4291 — IP Version 6 Addressing Architecture",
    org: "Internet Engineering Task Force (IETF)",
    year: 2006,
    authors: "R. Hinden, S. Deering",
    url: "https://www.rfc-editor.org/rfc/rfc4291",
    excerpt: "This specification defines the addressing architecture of the IP Version 6 (IPv6) protocol.",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "معمارية عنونة IPv6: أنواع العناوين، النطاقات، الترميز، وعنوان link-local الذي يبدأ بـfe80:: — مرجع دروس IPv6.",
      en: "IPv6 addressing architecture: address types, scopes, notation, and the fe80:: link-local behavior.",
    },
  },

  // ── m06 · Routing protocols ──────────────────────────────────────────
  {
    id: "rfc2328",
    kind: "rfc",
    title: "RFC 2328 — OSPF Version 2",
    org: "Internet Engineering Task Force (IETF)",
    year: 1998,
    authors: "J. Moy (Ascend Communications)",
    url: "https://www.rfc-editor.org/rfc/rfc2328",
    excerpt: "This memo documents version 2 of the OSPF protocol. OSPF is a link-state routing protocol.",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "مواصفة OSPF الأم: خوارزمية حالة الوصلة، مناطق الموجّهات، LSAs، وانتخاب الموجّه المعين DR — مرجعنا في وحدة التوجيه.",
      en: "The definitive OSPF spec: link-state algorithm, areas, LSAs, DR election — our routing-module reference.",
    },
  },
  {
    id: "rfc2453",
    kind: "rfc",
    title: "RFC 2453 — RIP Version 2",
    org: "Internet Engineering Task Force (IETF)",
    year: 1998,
    authors: "G. Malkin",
    url: "https://www.rfc-editor.org/rfc/rfc2453",
    excerpt:
      "Documents RIP-2: distance-vector routing with hop count, the 15-hop limit, split horizon, and route-poisoning updates over multicast 224.0.0.9.",
    quote: false,
    desc: {
      ar: "بروتوكول المتجه المسافة الأشهر تاريخياً: حدّ الخمس عشرة قفزة، انقسام الأفق، وسم المسارات — درس RIP مبني عليه.",
      en: "The classic distance-vector protocol: the 15-hop limit, split horizon, and route poisoning.",
    },
  },
  {
    id: "rfc4271",
    kind: "rfc",
    title: "RFC 4271 — A Border Gateway Protocol 4 (BGP-4)",
    org: "Internet Engineering Task Force (IETF)",
    year: 2006,
    authors: "Y. Rekhter (Cisco), T. Li, S. Hares (NextHop)",
    url: "https://www.rfc-editor.org/rfc/rfc4271",
    excerpt: "BGP-4 provides a set of mechanisms for supporting Classless Inter-Domain Routing (CIDR).",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "مواصفة BGP التي تدير التوجيه بين أنظمة الحكم الذاتي — البروتوكول الذي يشغّل التوجيه العالمي للإنترنت فعلياً.",
      en: "The BGP-4 specification — the protocol that literally runs global Internet routing between ASes.",
    },
  },
  {
    id: "labovitz-routing",
    kind: "paper",
    title: "Internet Routing Instability",
    org: "IEEE/ACM Transactions on Networking",
    year: 1998,
    authors: "C. Labovitz, G. R. Malan, F. Jahanian (Univ. of Michigan)",
    url: "https://scholar.google.com/scholar?q=Labovitz+Malan+Jahanian+internet+routing+instability",
    excerpt:
      "The landmark measurement study exposing route flapping and convergence pathology in inter-domain routing — why BGP paths can take minutes, not seconds, to stabilize.",
    quote: false,
    desc: {
      ar: "دراسة القياس الشهيرة التي كشفت اضطراب المسارات في BGP: لماذا قد يستغرق استقرار المسار دقائق كاملة — درسنا عن تقارب التوجيه.",
      en: "The landmark measurement study of route flapping — why BGP convergence can take minutes, not seconds.",
    },
  },
  {
    id: "cisco-ospf",
    kind: "vendor",
    title: "OSPF Design Guide",
    org: "Cisco Systems (official technical documentation)",
    year: 2006,
    url: "https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/7039-1.html",
    excerpt:
      "Cisco's engineering guide to OSPF network design: area sizing, SPF throttling, LSA types, and real-world tuning recommendations.",
    quote: false,
    desc: {
      ar: "دليل Cisco الهندسي لتصميم شبكات OSPF: أحجام المناطق، خنق SPF، وأنواع LSA — التطبيق العملي للمعيار.",
      en: "Cisco's engineering OSPF design guide — the practical application of the RFC.",
    },
  },

  // ── m07 · Transport layer ────────────────────────────────────────────
  {
    id: "rfc793",
    kind: "rfc",
    title: "RFC 793 — Transmission Control Protocol (TCP)",
    org: "Internet Engineering Task Force (IETF)",
    year: 1981,
    authors: "J. Postel (ed., USC/ISI)",
    url: "https://www.rfc-editor.org/rfc/rfc793",
    excerpt:
      "The Transmission Control Protocol (TCP) is intended for use as a highly reliable host-to-host protocol between hosts in packet-switched computer communication networks, and in interconnected systems of such networks.",
    quote: true,
    ref: "§1 — Introduction",
    desc: {
      ar: "وثيقة TCP الأصلية: المصافحة الثلاثية، النوافذ، إعادة الإرسال، وإدارة الاتصال — مرجعنا الحرفي لوحدة النقل.",
      en: "The original TCP document: three-way handshake, windows, retransmission, connection management.",
    },
  },
  {
    id: "rfc768",
    kind: "rfc",
    title: "RFC 768 — User Datagram Protocol (UDP)",
    org: "Internet Engineering Task Force (IETF)",
    year: 1980,
    authors: "J. Postel (ISI)",
    url: "https://www.rfc-editor.org/rfc/rfc768",
    excerpt:
      "This protocol provides a procedure for application programs to send messages to other programs with a minimum of protocol mechanism.",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "وثيقة UDP المكونة من ثلاث صفحات فقط: ترويسة 8 بايت وبساطة متعمدة — الدرس الذي يعلّم «متى تكون البساطة موثوقية».",
      en: "The 3-page UDP document: an 8-byte header and intentional simplicity — when minimalism IS the design.",
    },
  },
  {
    id: "jacobson-1988",
    kind: "paper",
    title: "Congestion Avoidance and Control",
    org: "ACM SIGCOMM '88",
    year: 1988,
    authors: "Van Jacobson (Lawrence Berkeley Laboratory)",
    url: "https://scholar.google.com/scholar?q=Van+Jacobson+%22Congestion+Avoidance+and+Control%22+1988",
    excerpt:
      "The paper that saved the Internet from congestion collapse of 1986-87: introduces slow start, congestion avoidance, and the AIMD paradigm still running inside every TCP stack today.",
    quote: false,
    desc: {
      ar: "الورقة التي أنقذت الإنترنت من انهيار الازدحام 1986: البطء الابتدائي وAIMD — خوارزمية تعمل الآن داخل كل TCP.",
      en: "The paper that saved the Internet from the 1986 congestion collapse: slow start and AIMD, running in every TCP stack today.",
    },
  },
  {
    id: "rfc6298",
    kind: "rfc",
    title: "RFC 6298 — Computing TCP's Retransmission Timer",
    org: "Internet Engineering Task Force (IETF)",
    year: 2011,
    authors: "V. Paxson (ICSI), M. Allman (ICIR), V. Paxson",
    url: "https://www.rfc-editor.org/rfc/rfc6298",
    excerpt:
      "The standardized RTO computation: Karn's algorithm, the exponential weighted moving average (SRTT/RTTVAR), and the rules for backing off retransmission timeouts.",
    quote: false,
    desc: {
      ar: "الطريقة المعيارية لحساب مؤقّت إعادة الإرسال RTO: خوارزمية Karn والمتوسط المتحرك الموزون — درسنا عن المؤقتات مبني عليها.",
      en: "The standardized RTO computation: Karn's algorithm and the EWMA smoothing — our retransmission-timer lesson.",
    },
  },

  // ── m08 · Application layer & services ───────────────────────────────
  {
    id: "rfc1034",
    kind: "rfc",
    title: "RFC 1034 — Domain Names: Concepts and Facilities",
    org: "Internet Engineering Task Force (IETF)",
    year: 1987,
    authors: "P. Mockapetris (USC/ISI)",
    url: "https://www.rfc-editor.org/rfc/rfc1034",
    excerpt:
      "This RFC introduces domain style names, their use for ARPA Internet mail and host address support, and the protocols and servers used to implement domain style names.",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "الورقة التي اخترعها Mockapetris لتقديم DNS: الشجرة الهرمية، التفويض، والحل التكراري — مرجع وحدة DNS.",
      en: "Mockapetris' paper introducing DNS: the hierarchy, delegation, and iterative resolution.",
    },
  },
  {
    id: "rfc2131",
    kind: "rfc",
    title: "RFC 2131 — Dynamic Host Configuration Protocol (DHCP)",
    org: "Internet Engineering Task Force (IETF)",
    year: 1997,
    authors: "R. Droms (Bucknell University)",
    url: "https://www.rfc-editor.org/rfc/rfc2131",
    excerpt:
      "The Dynamic Host Configuration Protocol (DHCP) provides a framework for passing configuration information to hosts on a TCP/IP network.",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "مواصفة DHCP: مراحل DORA الأربع (Discover/Offer/Request/Ack) وتجديد الإيجار — مرجع دروس الإسناد التلقائي.",
      en: "The DHCP specification: the four DORA phases and lease renewal.",
    },
  },
  {
    id: "rfc5321",
    kind: "rfc",
    title: "RFC 5321 — Simple Mail Transfer Protocol (SMTP)",
    org: "Internet Engineering Task Force (IETF)",
    year: 2008,
    authors: "J. Klensin",
    url: "https://www.rfc-editor.org/rfc/rfc5321",
    excerpt:
      "This document is a self-contained specification of the basic protocol for the Internet electronic mail transport.",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "مواصفة نقل البريد الإلكتروني: حوارات MAIL FROM/RCPT TO وترحيل الرسائل بين الخوادم — مرجع دروس البريد.",
      en: "The email transport specification: MAIL FROM/RCPT TO dialogs and server-to-server relay.",
    },
  },
  {
    id: "rfc9110",
    kind: "rfc",
    title: "RFC 9110 — HTTP Semantics",
    org: "Internet Engineering Task Force (IETF)",
    year: 2022,
    authors: "R. Fielding, M. Nottingham, J. Reschke (Adobe/CA/greenbytes)",
    url: "https://www.rfc-editor.org/rfc/rfc9110",
    excerpt:
      "The current definitive specification of HTTP semantics: methods, status codes, headers, content negotiation, caching semantics, and the request/response message model.",
    quote: false,
    desc: {
      ar: "المواصفة الحالية لمعاني HTTP: الطرائق، رموز الحالة، الترويسات، التخزين المؤقت ونموذج الطلب/الاستجابة — مرجع دروس الويب.",
      en: "The current definitive HTTP semantics spec: methods, status codes, headers, caching, and the request/response model.",
    },
  },
  {
    id: "rfc854",
    kind: "rfc",
    title: "RFC 854 — Telnet Protocol Specification",
    org: "Internet Engineering Task Force (IETF)",
    year: 1983,
    authors: "J. Postel, J. Reynolds (USC/ISI)",
    url: "https://www.rfc-editor.org/rfc/rfc854",
    excerpt:
      "The purpose of the TELNET Protocol is to provide a fairly general, bi-directional, eight-bit byte oriented communications facility.",
    quote: true,
    ref: "§1 — Introduction",
    desc: {
      ar: "وثيقة Telnet: القناة ثنائية الاتجاه ثمانية البتات التي غيّرت إدارة الأجهزة عن بعد — ولماذا استُبدلت بـSSH.",
      en: "The Telnet document: the 8-bit bidirectional channel — and why SSH replaced it.",
    },
  },
  {
    id: "rfc959",
    kind: "rfc",
    title: "RFC 959 — File Transfer Protocol (FTP)",
    org: "Internet Engineering Task Force (IETF)",
    year: 1985,
    authors: "J. Postel, J. Reynolds (USC/ISI)",
    url: "https://www.rfc-editor.org/rfc/rfc959",
    excerpt:
      "The official FTP specification: dual connections (control on 21 + data on 20), active vs passive modes, and transfer types — plus the historical objectives of the protocol.",
    quote: false,
    desc: {
      ar: "مواصفة FTP الرسمية: القناتان المنفصلتان (تحكم + بيانات) والوضعان النشط والسلبي — درسنا في قناتي FTP.",
      en: "The official FTP spec: the dual control/data connections and active vs passive modes.",
    },
  },
  {
    id: "wireshark-guide",
    kind: "vendor",
    title: "Wireshark User's Guide (official)",
    org: "Wireshark Foundation",
    year: 2024,
    url: "https://www.wireshark.org/docs/wsug_html_chunked/",
    excerpt:
      "The official manual for Wireshark, the world's foremost open-source packet analyzer: capture filters vs display filters, following streams, protocol dissection, and expert info.",
    quote: false,
    desc: {
      ar: "الدليل الرسمي لأشمل محلل حزم مفتوح المصدر: فلاتر الالتقاط مقابل العرض، تتبع الجداول (Follow TCP Stream) — رفيق كل دروس التحليل.",
      en: "The official Wireshark manual: capture vs display filters, stream following — companion to every analysis lesson.",
    },
  },

  // ── m09 · Network security ───────────────────────────────────────────
  {
    id: "nist-sp800-207",
    kind: "standard",
    title: "NIST SP 800-207 — Zero Trust Architecture",
    org: "National Institute of Standards and Technology (NIST)",
    year: 2020,
    authors: "S. Rose, O. Borchert, S. Mitchell, S. Connelly (NIST)",
    url: "https://csrc.nist.gov/pubs/sp/800/207/final",
    excerpt:
      "Zero trust (ZT) is the term for an evolving set of cybersecurity paradigms that move defenses from static, network-based perimeters to focus on users, assets, and resources.",
    quote: true,
    ref: "§1 — Introduction",
    desc: {
      ar: "المعيار الفدرالي الأمريكي الذي رسّخ «الثقة الصفرية»: من قلعة القلعة والخندق إلى التحقق الدائم — مرجعنا في وحدة الأمن الحديث.",
      en: "The U.S. federal standard that codified Zero Trust: from castle-and-moat to continuous verification.",
    },
  },
  {
    id: "rfc8446",
    kind: "rfc",
    title: "RFC 8446 — The Transport Layer Security (TLS) Protocol 1.3",
    org: "Internet Engineering Task Force (IETF)",
    year: 2018,
    authors: "E. Rescorla (Mozilla/RTFM)",
    url: "https://www.rfc-editor.org/rfc/rfc8446",
    excerpt:
      "TLS allows client/server applications to communicate over the Internet in a way that is designed to prevent eavesdropping, tampering, and message forgery.",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "مواصفة TLS 1.3: المصافحة الأسرع بجولة واحدة، سرية الاتصال الأمامية، والتشفير الإجباري — مرجع دروس التشفير العملي.",
      en: "TLS 1.3: the one-round-trip handshake, forward secrecy, and mandatory modern crypto.",
    },
  },
  {
    id: "nist-sp800-61",
    kind: "standard",
    title: "NIST SP 800-61 Rev.2 — Computer Security Incident Handling Guide",
    org: "National Institute of Standards and Technology (NIST)",
    year: 2012,
    authors: "P. Cichonski, T. Millar, T. Grance, K. Scarfone (NIST)",
    url: "https://csrc.nist.gov/pubs/sp/800/61/rev-2/final",
    excerpt:
      "This publication assists organizations in establishing computer security incident handling capabilities and in handling incidents efficiently and effectively.",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "دليل NIST للتعامل مع حوادث الأمن السيبراني: دورة الحياة (تحضير/كشف/احتواء/تعافٍ) — مرجع دروس الاستجابة للحوادث.",
      en: "NIST's incident-handling guide: the prepare/detect/contain/recover lifecycle.",
    },
  },
  {
    id: "nist-sp800-94",
    kind: "standard",
    title: "NIST SP 800-94 — Guide to Intrusion Detection and Prevention Systems (IDPS)",
    org: "National Institute of Standards and Technology (NIST)",
    year: 2007,
    authors: "K. Scarfone, P. Mell (NIST)",
    url: "https://csrc.nist.gov/pubs/sp/800/94/final",
    excerpt:
      "NIST's guide to IDPS technologies: detection methods (signature, anomaly, stateful protocol analysis), architecture, management, and response capabilities.",
    quote: false,
    desc: {
      ar: "دليل NIST لأنظمة كشف ومنع التسلل: أساليب الكشف (التوقيع، الشذوذ، تحليل البروتوكول بالحالة) — مرجع دروس IDS/IPS.",
      en: "NIST's IDPS guide: signature, anomaly, and stateful-protocol-analysis detection methods.",
    },
  },
  {
    id: "rfc2827",
    kind: "rfc",
    title: "RFC 2827 / BCP 38 — Network Ingress Filtering: Defeating DoS Attacks",
    org: "Internet Engineering Task Force (IETF)",
    year: 2000,
    authors: "P. Ferguson, D. Senie (Cisco / Nortel)",
    url: "https://www.rfc-editor.org/rfc/rfc2827",
    excerpt:
      "a simple, effective, and straightforward method for using ingress traffic filtering to prohibit DoS attacks which use forged IP addresses",
    quote: true,
    ref: "Abstract",
    desc: {
      ar: "المعيار الذي يهزم هجمات انتحال العناوين من المنبع: فلترة الدخول BCP38 — أحد أقوى دفوعات DDoS العملية.",
      en: "BCP 38 ingress filtering: one of the strongest practical DDoS defenses, blocking spoofed sources.",
    },
  },
  {
    id: "rfc4987",
    kind: "rfc",
    title: "RFC 4987 — TCP SYN Flooding Attacks and Common Mitigations",
    org: "Internet Engineering Task Force (IETF)",
    year: 2007,
    authors: "A. Simpson (Cisco)",
    url: "https://www.rfc-editor.org/rfc/rfc4987",
    excerpt:
      "Survey of SYN-flood attacks (filling the half-open connection queue) and mitigations: SYN cookies, backlog tuning, and proxies.",
    quote: false,
    desc: {
      ar: "مسح IETF لهجمات فيضان SYN وطرق التصدي: كعكات SYN وتوسيع الطابور — درسنا في هجمات البروتوكول مبني عليه.",
      en: "The IETF survey of SYN floods and defenses: SYN cookies and backlog tuning.",
    },
  },
  {
    id: "iso-27001",
    kind: "standard",
    title: "ISO/IEC 27001 — Information Security Management Systems",
    org: "International Organization for Standardization (ISO)",
    year: 2022,
    url: "https://www.iso.org/isoiec-27001-information-security.html",
    excerpt:
      "The world's best-known information-security management standard: risk-based ISMS requirements and the Annex A control framework.",
    quote: false,
    desc: {
      ar: "أشهر معيار عالمي لإدارة أمن المعلومات: نظام ISMS قائم على المخاطر وضوابط الملحق A — مرجع دروس الحاكمية.",
      en: "The world's best-known ISMS standard: risk-based controls and Annex A.",
    },
  },
  {
    id: "anderson-security-eng",
    kind: "book",
    title: "Security Engineering: A Guide to Building Dependable Distributed Systems (3rd ed.)",
    org: "Wiley — author's free official copy",
    year: 2020,
    authors: "Ross Anderson (University of Cambridge)",
    url: "https://www.cl.cam.ac.uk/~rja14/book.html",
    excerpt:
      "The encyclopedic reference of security engineering: threat models, psychology, economics, and the engineering of systems that fail safely — free from the author's Cambridge page.",
    quote: false,
    desc: {
      ar: "الموسوعة المرجعية في هندسة الأمن من كامبريدج (نسخة مجانية من المؤلف): نماذج التهديد، نفسانية المستخدم، اقتصاد الأمن.",
      en: "Cambridge's encyclopedic security-engineering reference (free from the author's page): threat models, psychology, security economics.",
    },
  },
  {
    id: "cheswick-firewalls",
    kind: "book",
    title: "Firewalls and Internet Security: Repelling the Wily Hacker (2nd ed.)",
    org: "Addison-Wesley — the book's official free site",
    year: 2003,
    authors: "W. Cheswick, S. Bellovin, A. Rubin",
    url: "http://www.wilyhacker.com/",
    excerpt:
      "The classic that defined firewall thinking: the security-policy-first approach, DMZ architectures, packet filtering and proxies — the entire text is free at the authors' site.",
    quote: false,
    desc: {
      ar: "الكتاب الذي أسّس فلسفة الجدران النارية: السياسة قبل التقنية، معمارية DMZ، والفلترة مقابل الوكيل — نص كامل مجاني.",
      en: "The book that founded firewall philosophy: policy first, DMZ architecture, filtering vs proxies — full text free.",
    },
  },
  {
    id: "mit-6.858",
    kind: "course",
    title: "MIT 6.858 — Computer Systems Security",
    org: "Massachusetts Institute of Technology",
    year: 2024,
    authors: "N. Zeldovich, A. Sivabalan, H. Zheng (MIT CSAIL)",
    url: "https://css.csail.mit.edu/6.858/",
    excerpt:
      "MIT's graduate security course: attack surface analysis, memory-safety exploitation, sandboxing, TLS, and defenses — with public lecture notes and the famous labs.",
    quote: false,
    desc: {
      ar: "مقرر MIT للدراسات العليا في أمن الأنظمة: أسطح الهجوم، حماية الذاكرة، العزل — ملازم مفتوحة وتمارين مشهورة.",
      en: "MIT's graduate systems-security course: attack surfaces, memory safety, sandboxing — public notes and famous labs.",
    },
  },
  {
    id: "berkeley-cs161",
    kind: "course",
    title: "Berkeley CS161 — Computer Security",
    org: "UC Berkeley",
    year: 2024,
    url: "https://cs161.org/",
    excerpt:
      "Berkeley's security fundamentals course: memory-safety bugs, cryptography applied, web security, and network attacks, with excellent open lecture slides.",
    quote: false,
    desc: {
      ar: "مقرر بيركلي لأساسيات الأمن: ثغرات الذاكرة، التشفير التطبيقي، أمن الويب والهجمات الشبكية — شرائح مفتوحة ممتازة.",
      en: "Berkeley's security fundamentals: memory bugs, applied crypto, web and network attacks — excellent open slides.",
    },
  },
  {
    id: "durumeric-heartbleed",
    kind: "paper",
    title: "The Matter of Heartbleed",
    org: "ACM Internet Measurement Conference 2014",
    year: 2014,
    authors: "Z. Durumeric et al. (University of Michigan)",
    url: "https://scholar.google.com/scholar?q=%22The+Matter+of+Heartbleed%22",
    excerpt:
      "The famous measurement study performed within days of Heartbleed's disclosure: internet-wide scanning of the entire IPv4 space to measure exposure and patching response.",
    quote: false,
    desc: {
      ar: "دراسة القياس الأشهر قي لحظة كشف ثغرة Heartbleed: مسح كل فضاء IPv4 خلال أيام لقياس التعرض والترقيع — كيف يتحرك الباحثون عند الأزمات.",
      en: "The famous rapid-response study: scanning the entire IPv4 space days after Heartbleed to measure exposure and patching.",
    },
  },
  {
    id: "nmap-book",
    kind: "book",
    title: "Nmap Network Scanning (official book, free online)",
    org: "nmap.org — Gordon 'Fyodor' Lyon",
    year: 2009,
    authors: "Gordon Lyon",
    url: "https://nmap.org/book/",
    excerpt:
      "The official reference for Nmap: host discovery, port scanning techniques (SYN, connect, UDP, idle), version detection, NSE scripting, and timing/performance tuning.",
    quote: false,
    desc: {
      ar: "المرجع الرسمي لـNmap: أنواع المسح الثلاثة عشر، كشف الخدمات، والبرمجة النصية NSE — رفيق دروس المسح الأمني.",
      en: "The official Nmap reference: scan types, version detection, NSE scripting.",
    },
  },

  // ── m10 · Wireless, cloud & career ───────────────────────────────────
  {
    id: "ieee-802-11",
    kind: "standard",
    title: "IEEE Std 802.11 — Wireless LAN Medium Access Control (MAC) and Physical Layer (PHY)",
    org: "IEEE 802.11 Working Group",
    year: 2024,
    url: "https://www.ieee802.org/11/",
    excerpt:
      "The standards family behind Wi-Fi: CSMA/CA, the a/b/g/n/ac/ax (Wi-Fi 6) amendments, frames, association, and security suites from WEP to WPA3 (via 802.1X).",
    quote: false,
    desc: {
      ar: "عائلة معايير Wi-Fi: CSMA/CA، التعديلات من a إلى ax (Wi-Fi 6)، والأمن من WEP إلى WPA3 — مرجع وحدة اللاسلكي.",
      en: "The Wi-Fi standards family: CSMA/CA, a→ax amendments, WEP→WPA3 security.",
    },
  },
  {
    id: "nist-sp800-48",
    kind: "standard",
    title: "NIST SP 800-48 — Wireless Network Security (802.11, Bluetooth)",
    org: "National Institute of Standards and Technology (NIST)",
    year: 2008,
    authors: "K. Scarfone, C. Grance, K. Masone (NIST)",
    url: "https://csrc.nist.gov/pubs/sp/800/48/r1/final",
    excerpt:
      "NIST's recommendations for securing wireless networks: enterprise vs personal modes, 802.1X/EAP, rogue access-point detection, and Bluetooth risk management.",
    quote: false,
    desc: {
      ar: "توصيات NIST لتأمين الشبكات اللاسلكية: الأنماط المؤسسية مقابل الشخصية، 802.1X/EAP، وكشف نقاط الوصول المارقة.",
      en: "NIST's wireless security recommendations: enterprise vs personal, 802.1X/EAP, rogue AP detection.",
    },
  },
  {
    id: "nist-sp800-145",
    kind: "standard",
    title: "NIST SP 800-145 — The NIST Definition of Cloud Computing",
    org: "National Institute of Standards and Technology (NIST)",
    year: 2011,
    authors: "P. Mell, T. Grance (NIST)",
    url: "https://csrc.nist.gov/pubs/sp/800/145/final",
    excerpt:
      "Cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (e.g., networks, servers, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction.",
    quote: true,
    ref: "§2 — Definition",
    desc: {
      ar: "التعريف الفدرالي الرسمي للحوسبة السحابية بخدماتها الثلاث ونماذج النشر الأربعة — المرجع العالمي المقتبس في كل مقرر سحابة.",
      en: "The official federal definition of cloud computing: the service and deployment models quoted by every cloud course.",
    },
  },
  {
    id: "aws-vpc",
    kind: "vendor",
    title: "Amazon VPC User Guide (official)",
    org: "Amazon Web Services",
    year: 2024,
    url: "https://docs.aws.amazon.com/vpc/latest/userguide/",
    excerpt:
      "AWS's official guide to Virtual Private Clouds: subnets, route tables, Internet Gateways, NAT Gateways, security groups vs NACLs, and VPC peering.",
    quote: false,
    desc: {
      ar: "دليل AWS الرسمي للسحابة الخاصة الافتراضية: الشبكات الفرعية، بوابة NAT، مجموعات الأمان مقابل قوائم ACL — دروسنا السحابية على منواله.",
      en: "AWS's official VPC guide: subnets, NAT Gateways, security groups vs NACLs — our cloud lessons follow it.",
    },
  },
  {
    id: "cisco-netacad",
    kind: "vendor",
    title: "Cisco Networking Academy — CCNA Curriculum",
    org: "Cisco Systems",
    year: 2024,
    url: "https://www.netacad.com/",
    excerpt:
      "Cisco's global skills-to-jobs program and the CCNA certification path: networking fundamentals, IP connectivity, security fundamentals, automation — the industry's reference certification.",
    quote: false,
    desc: {
      ar: "أكاديمية Cisco العالمية ومسار شهادة CCNA — معيار الصناعة الذي نقيس عليه جاهزيتك المهنية في دروس المسار الوظيفي.",
      en: "Cisco Networking Academy and the CCNA path — the industry yardstick for career readiness.",
    },
  },

  // ─── m11 · Computer Systems Fundamentals (BPT IT6001 aligned) ────────
  {
    id: "von-neumann-1945",
    kind: "paper",
    title: "First Draft of a Report on the EDVAC",
    org: "Moore School of Electrical Engineering, University of Pennsylvania",
    year: 1945,
    authors: "John von Neumann",
    url: "https://scholar.google.com/scholar?q=%22First+Draft+of+a+Report+on+the+EDVAC%22",
    excerpt:
      "The report proposed a stored-program computer architecture in which instructions and data share one memory, processed by a single arithmetic unit under the control of a central unit — the blueprint of nearly every computer since.",
    quote: false,
    desc: {
      ar: "الوثيقة التي وَلَدت معمارية الحاسوب الحديث: برنامج مخزّن في الذاكرة، وحدة حساب، وحدة تحكم، مدخلات ومخرجات. كل حاسوب تستخدمه اليوم — من الحاسوب المكتبي إلى الخادم — هو في جوهره جهاز فون نويمان.",
      en: "The document that birthed modern computer architecture: stored program, ALU, control unit, I/O. Every computer you use today is, at its core, a von Neumann machine.",
    },
  },
  {
    id: "turing-1936",
    kind: "paper",
    title: "On Computable Numbers, with an Application to the Entscheidungsproblem",
    org: "Proceedings of the London Mathematical Society",
    year: 1936,
    authors: "Alan M. Turing",
    url: "https://scholar.google.com/scholar?q=%22On+Computable+Numbers%2C+with+an+Application+to+the+Entscheidungsproblem%22",
    excerpt:
      "Introduced the abstract machine now called the Turing machine — a finite control reading and writing symbols on an infinite tape — and proved fundamental limits of what can be computed.",
    quote: false,
    desc: {
      ar: "الورقة التي عرّفت «الحساب» نفسه رياضياً: آلة تورنغ. قبل أي شريحة سيليكون، أثبت تورنغ حدود ما تستطيع الآلات حسابه — الأساس النظري لعلوم الحاسوب بأكملها.",
      en: "The paper that defined computation itself mathematically: the Turing machine. Before any silicon, Turing proved the limits of what machines can compute — the theoretical bedrock of all computer science.",
    },
  },
  {
    id: "stallings-computer",
    kind: "book",
    title: "Computer Organization and Architecture: Designing for Performance",
    org: "Pearson",
    year: 2016,
    authors: "William Stallings",
    url: "http://williamstallings.com/ComputerOrganizationAndArchitecture/",
    excerpt:
      "The canonical textbook on computer internals: processor structure, instruction cycles, memory hierarchy, cache design, buses, and I/O — used in universities worldwide.",
    quote: false,
    desc: {
      ar: "المرجع الجامعي المعتمد في تنظيم الحاسوب: بنية المعالج ودورات التعليمات وتسلسل الذاكرة والكاش والنواقل والإدخال/الإخراج — المرجع الذي تقاس عليه كل دروس العتاد.",
      en: "The canonical university reference on computer internals: processor structure, instruction cycles, memory hierarchy, cache, buses, and I/O.",
    },
  },
  {
    id: "hennessy-patterson",
    kind: "book",
    title: "Computer Architecture: A Quantitative Approach (6th Edition)",
    org: "Morgan Kaufmann / Elsevier",
    year: 2019,
    authors: "John L. Hennessy, David A. Patterson",
    url: "https://shop.elsevier.com/books/computer-architecture/hennessy/978-0-12-811905-1",
    excerpt:
      "The definitive graduate-level text measuring architecture trade-offs with data: pipelines, superscalar and multicore designs, memory-hierarchy walls, and data-level parallelism.",
    quote: false,
    desc: {
      ar: "المرجع الأعلى في معمارية الحاسوب الكمية — من تأليف حائزي وسام جون فون نويمان. يعلّمك أن تصميم الحاسوب قرار موازنة قابل للقياس: السرعة مقابل التكلفة مقابل الطاقة.",
      en: "The definitive quantitative architecture text — by von Neumann Medal winners. Computer design is a measurable trade-off: speed vs cost vs power.",
    },
  },
  {
    id: "moore-1965",
    kind: "paper",
    title: "Cramming more components onto integrated circuits",
    org: "Electronics Magazine",
    year: 1965,
    authors: "Gordon E. Moore",
    url: "https://doi.org/10.1109/N-SSC.2006.4785860",
    excerpt:
      "The complexity for minimum component costs has increased at a rate of roughly a factor of two per year.",
    quote: true,
    ref: "opening paragraph",
    desc: {
      ar: "مقالة مور الأصلية عام 1965 — الجملة التي صارت «قانون مور»: مضاعفة كثافة المكوّنات نحوياً كل عامين، القانون الاقتصادي الذي حكم صناعة الرقائق لنصف قرن.",
      en: "Moore's original 1965 article — the sentence that became 'Moore's Law': component density doubling roughly every two years, the economic law that ruled chips for half a century.",
    },
  },
  {
    id: "ieee-754",
    kind: "standard",
    title: "IEEE 754-2019 — IEEE Standard for Floating-Point Arithmetic",
    org: "IEEE Computer Society",
    year: 2019,
    url: "https://standards.ieee.org/ieee/754/6210/",
    excerpt:
      "Defines interchange and arithmetic formats for binary and decimal floating-point numbers, rounding algorithms, and required exception handling (NaN, infinities, denormals).",
    quote: false,
    desc: {
      ar: "المعيار الذي يقرر كيف يخزّن حاسوبك الأعداد العشرية: صيغة إشارة/أس/كسر، التقريب، وNaN واللانهاية. بفضله تعطي كل الحواسيب النتيجة نفسها — وبفضله نفهم 0.1 + 0.2 ≠ 0.3.",
      en: "The standard deciding how your computer stores decimals: sign/exponent/fraction, rounding, NaN and infinities — why 0.1 + 0.2 ≠ 0.3, everywhere the same.",
    },
  },
  {
    id: "unicode-standard",
    kind: "standard",
    title: "The Unicode Standard, Version 15.0",
    org: "The Unicode Consortium",
    year: 2022,
    url: "https://www.unicode.org/versions/Unicode15.0.0/",
    excerpt:
      "Unicode provides a unique number for every character, no matter what platform, device, application or language — 149,186 characters across 155 scripts in version 15.0.",
    quote: false,
    desc: {
      ar: "المعيار الذي جعل العربية والإنجليزية والصينية تُكتب وتُعرض على أي جهاز في العالم: رقم فريد لكل حرف في 155 نظام كتابة. درس الترميز في منصتك مبني عليه.",
      en: "The standard that made Arabic, English and Chinese render on any device worldwide: a unique number for every character across 155 scripts.",
    },
  },
  {
    id: "uefi-forum",
    kind: "standard",
    title: "Unified Extensible Firmware Interface (UEFI) Specification 2.10",
    org: "UEFI Forum",
    year: 2023,
    url: "https://uefi.org/specifications",
    excerpt:
      "Defines the interface between the operating system and platform firmware — replacing the legacy BIOS with secure boot, GPT disks beyond 2 TB, and network-capable pre-boot drivers.",
    quote: false,
    desc: {
      ar: "المعيار الذي حلّ محل BIOS: التمهيد الآمن Secure Boot وأقراص GPT الأكبر من 2 تيرابايت وبرامج ما قبل التمهيد الشبكية — ما يحدث فعلاً بين ضغط زر الطاقة وظهور شعار النظام.",
      en: "The standard that replaced BIOS: Secure Boot, GPT disks beyond 2 TB, and network pre-boot — what actually happens between the power button and the OS logo.",
    },
  },

  // ─── m12 · Operating Systems & Unix (BPT IT6004 aligned) ─────────────
  {
    id: "stallings-os",
    kind: "book",
    title: "Operating Systems: Internals and Design Principles (7th Edition)",
    org: "Pearson",
    year: 2012,
    authors: "William Stallings",
    url: "http://williamstallings.com/OperatingSystems.html",
    excerpt:
      "Presents the operating system as a manager of resources — processes, memory, files, devices and security — through the software-layer view: each layer makes requests down and replies up.",
    quote: false,
    desc: {
      ar: "المرجع الذي يدرّس منه قسم أنظمة يونكس في البوليتكنيك نفسه — طبقات البرمجيات من العتاد إلى التطبيقات، والنظام بوصفه مديراً للموارد. مخطط معمارية يونكس في محاضراتك مقتبس منه.",
      en: "The textbook the Polytechnic's Unix Systems course itself teaches from — software layers from hardware to applications, the OS as resource manager. The Unix architecture diagram in your lectures is drawn from it.",
    },
  },
  {
    id: "tanenbaum-modern-os",
    kind: "book",
    title: "Modern Operating Systems (5th Edition)",
    org: "Pearson",
    year: 2018,
    authors: "Andrew S. Tanenbaum, Herbert Bos",
    url: "https://search.worldcat.org/title/1045262498",
    excerpt:
      "Covers processes and threads, scheduling, memory management, file systems, and security across UNIX, Linux and Windows — by the creator of MINIX, the OS that inspired Linux.",
    quote: false,
    desc: {
      ar: "كتاب تانينباوم — مبتكر MINIX الذي استلهم منه تورفالدس لينكس — يغطي العمليات والجدولة والذاكرة والملفات والأمان عبر يونكس وويندوز. الرابط التاريخي نفسه الذي ستراه في درس تاريخ لينكس.",
      en: "Tanenbaum's text — creator of MINIX, the OS that inspired Linux — covering processes, scheduling, memory, files and security across UNIX, Linux and Windows.",
    },
  },
  {
    id: "silberschatz-os",
    kind: "book",
    title: "Operating System Concepts (10th Edition) — 'the Dinosaur Book'",
    org: "Wiley",
    year: 2018,
    authors: "Abraham Silberschatz, Peter Baer Galvin, Greg Gagne",
    url: "https://www.os-book.com/",
    excerpt:
      "The most widely adopted OS textbook: process synchronization (semaphores, monitors), deadlock handling, paging and virtual memory, file-system implementation, and protection.",
    quote: false,
    desc: {
      ar: "«كتاب الديناصور» — أكثر كتب أنظمة التشغيل اعتماداً في الجامعات: تزامن العمليات، الأقفال المتبادلة، الذاكرة الافتراضية والترقيم، وتنفيذ أنظمة الملفات.",
      en: "The 'Dinosaur Book' — the most widely adopted OS text: process synchronization, deadlocks, virtual memory and paging, file-system implementation.",
    },
  },
  {
    id: "ritchie-thompson-1974",
    kind: "paper",
    title: "The UNIX Time-Sharing System",
    org: "Communications of the ACM 17(7)",
    year: 1974,
    authors: "Dennis M. Ritchie, Ken Thompson",
    url: "https://dl.acm.org/doi/10.1145/361011.361061",
    excerpt:
      "The original paper describing UNIX by its creators: the file system, the shell, pipes, and a system remarkable for its simplicity — written by the two men who built it at Bell Labs.",
    quote: false,
    desc: {
      ar: "الورقة الأصلية التي وصف بها ريتشي وتومسون — صانعا يونكس — نظامهما في مختبرات بل: نظام ملفات بسيط، وصَدَفة، وأنابيب. قراءتها تجعلك تفهم لماذا صمد تصميم يونكس 50 عاماً.",
      en: "The original paper in which Ritchie and Thompson — the creators of UNIX — described their system at Bell Labs: a simple file system, a shell, pipes. Read it to understand why UNIX design survived 50 years.",
    },
  },
  {
    id: "torvalds-1991",
    kind: "paper",
    title: "Free minix-like kernel sources for 386-486 (the Linux announcement)",
    org: "comp.os.minix newsgroup",
    year: 1991,
    authors: "Linus Torvalds",
    url: "https://www.cs.cmu.edu/~awb/linux.history.html",
    excerpt:
      "I'm doing a (free) operating system (just a hobby, won't be big and professional like gnu) for 386(486) AT clones... I'd like any feedback on things people dislike...",
    quote: true,
    ref: "opening lines, 25 Aug 1991",
    desc: {
      ar: "رسالة هاوٍ طالب عمره 21 عاماً في هلسنكي، صارت نواة أنظمة تشغيل تشغّل أندرويد وكل سوبر كمبيوتر في قائمة TOP500. اقرأ تواضع البداية لتدرك أن أعظم المشاريع تبدأ صغيرة.",
      en: "A hobbyist message from a 21-year-old student in Helsinki that became the kernel powering Android and every supercomputer in the TOP500. Read the humble beginning of greatness.",
    },
  },
  {
    id: "posix-1003",
    kind: "standard",
    title: "IEEE Std 1003.1-2017 — POSIX: Portable Operating System Interface",
    org: "IEEE / The Open Group",
    year: 2017,
    url: "https://standards.ieee.org/ieee/1003.1/7131/",
    excerpt:
      "Defines the standard operating-system interface and environment — the shell, utilities such as ls and grep, and system-call interfaces — enabling portable software across all POSIX-conformant UNIX systems.",
    quote: false,
    desc: {
      ar: "المعيار الذي يجعل مهاراتك في لينكس قابلة للنقل إلى كل أنظمة يونكس التجارية (Solaris، HP-UX، AIX): الصَدَفة والأوامر واستدعاءات النظام موحّدة. ما تتعلمه هنا يعمل هناك.",
      en: "The standard making your Linux skills portable to every commercial UNIX (Solaris, HP-UX, AIX): shell, utilities and system calls unified. Learn once, work everywhere.",
    },
  },
  {
    id: "fhs-30",
    kind: "standard",
    title: "Filesystem Hierarchy Standard 3.0",
    org: "Linux Foundation",
    year: 2015,
    url: "https://refspecs.linuxfoundation.org/FHS_3.0/index.html",
    excerpt:
      "Defines the directory structure and directory contents in Linux distributions: /bin, /etc, /home, /var, /usr and their required contents, so software and administrators can predict file locations.",
    quote: false,
    desc: {
      ar: "المعيار الذي يفكّ شيفرة مجلدات لينكس: لماذا الإعدادات في /etc والسجلات في /var وبرامجك في /home. بعد هذا الدرس لن يبقى مجلد غامضاً أمامك.",
      en: "The standard decoding Linux directories: why configs live in /etc, logs in /var, your files in /home. No directory stays mysterious after this.",
    },
  },
  {
    id: "linux-kernel-org",
    kind: "portal",
    title: "The Linux Kernel Archives (kernel.org)",
    org: "Linux Foundation / kernel.org",
    year: 2024,
    url: "https://www.kernel.org/",
    excerpt:
      "The authoritative home of the Linux kernel source code, release announcements, and signing keys — the canonical origin every distribution builds upon.",
    quote: false,
    desc: {
      ar: "البيت الرسمي لنواة لينكس: الشيفرة المصدرية والإصدارات ومفاتيح التوقيع — المنبع الذي تبني عليه كل التوزيعات. زيارة واحدة تكفي لتلمس قلب المشروع.",
      en: "The official home of the Linux kernel: source, releases, signing keys — the origin every distribution builds upon.",
    },
  },
  {
    id: "gnu-manifesto",
    kind: "paper",
    title: "The GNU Manifesto",
    org: "GNU Project (originally Dr. Dobb's Journal of Software Tools)",
    year: 1985,
    authors: "Richard Stallman",
    url: "https://www.gnu.org/gnu/manifesto.html",
    excerpt:
      "I consider that the golden rule requires that if I like a program I must share it with other people who like it... So that I can continue to use computers without violating my conscience, I have decided to put together a sufficient body of free software.",
    quote: true,
    ref: "on sharing software",
    desc: {
      ar: "مانيفستو البرمجيات الحرة الذي أطلق مشروع GNU — الجذر الفلسفي للينكس: الحرية في التشغيل والدراسة والتعديل والتوزيع. افهم الفلسفة قبل أن تفهم الأمر chmod.",
      en: "The free-software manifesto that launched GNU — the philosophical root of Linux: freedom to run, study, modify, share. Understand the philosophy before the chmod.",
    },
  },
  {
    id: "raymond-cathedral",
    kind: "paper",
    title: "The Cathedral and the Bazaar",
    org: "Linux Kongress, Würzburg",
    year: 1997,
    authors: "Eric S. Raymond",
    url: "https://www.catb.org/~esr/writings/cathedral-bazaar/",
    excerpt:
      "Given enough eyeballs, all bugs are shallow.",
    quote: true,
    ref: "Linus's Law",
    desc: {
      ar: "الورقة التي فسّرت للعالم لماذا تنجح طريقة تطوير لينكس المفتوحة: «مع توافر العيون الكافية تصبح كل الأخطاء سطحية». النقاش بين نموذج الكاتدرائية المغلق والبازار المفتوح — اقتصاد البرمجيات الحرة.",
      en: "The paper that explained to the world why Linux's open development works: 'Given enough eyeballs, all bugs are shallow.' Cathedral vs Bazaar — the economics of free software.",
    },
  },
  {
    id: "nemeth-handbook",
    kind: "book",
    title: "UNIX and Linux System Administration Handbook (5th Edition)",
    org: "Pearson",
    year: 2017,
    authors: "Evi Nemeth, Garth Snyder, Trent Hein, Ben Whaley, Dan Mackin",
    url: "http://www.admin.com/",
    excerpt:
      "The 'purple book' every sysadmin keeps at arm's reach: booting, filesystems, user management, packaging, networking, storage, and automation across Linux, Solaris, HP-UX and AIX.",
    quote: false,
    desc: {
      ar: "«الكتاب الأرجواني» الذي يبقيه كل مسؤول أنظمة في متناول يده: الإقلاع وأنظمة الملفات والمستخدمون والشبكات والتخزين والأتمتة — عبر لينكس وكل يونكس التجارية.",
      en: "The 'purple book' every sysadmin keeps at arm's reach: booting, filesystems, users, networking, storage, automation — across Linux and the commercial UNIXes.",
    },
  },
  {
    id: "kernighan-pike",
    kind: "book",
    title: "The Unix Programming Environment",
    org: "Prentice Hall",
    year: 1984,
    authors: "Brian W. Kernighan, Rob Pike",
    url: "https://books.google.com/books?id=5oBQAAAAMAAJ",
    excerpt:
      "Classic exposition of the Unix philosophy in practice: the shell as a programming language, filters and pipes, and small tools composed into powerful workflows.",
    quote: false,
    desc: {
      ar: "الشرح الكلاسيكي لفلسفة يونكس عملياً: الصَدَفة كلغة برمجة، والمرشّحات والأنابيب، وأدوات صغيرة تُركّب في تدفقات قوية — من قلم مؤلف كتاب لغة C نفسه.",
      en: "The classic hands-on exposition of Unix philosophy: the shell as a programming language, filters and pipes, small tools composed into powerful workflows — by the author of the C book himself.",
    },
  },
  {
    id: "bcs-accreditation",
    kind: "portal",
    title: "BCS, The Chartered Institute for IT — Higher Education Accreditation",
    org: "BCS",
    year: 2024,
    url: "https://www.bcs.org/membership-and-registration/become-a-member/higher-education-accreditation/",
    excerpt:
      "BCS accredits degree programmes that meet the standards of the IT profession — the Bachelor of ICT (Networking Major) at Bahrain Polytechnic is BCS accredited, recognising it against international benchmarks.",
    quote: false,
    desc: {
      ar: "جهة الاعتماد المهني لبرنامجك أنت: معهد BCS المعهد الملكي لتقنية المعلومات يعتمد بكالوريوس تقنية المعلومات (تصميم الشبكات) في البوليتكنيك — اعتراف دولي بمستوى شهادتك.",
      en: "Your programme's professional accreditor: BCS, the Chartered Institute for IT, accredits the BICT (Networking Major) at Bahrain Polytechnic — international recognition of your degree.",
    },
  },

  // ─── m13 · Linux Command Line & Bash (BPT IT6004 labs aligned) ───────
  {
    id: "rfc4251",
    kind: "rfc",
    title: "RFC 4251 — The Secure Shell (SSH) Protocol Architecture",
    org: "Internet Engineering Task Force (IETF)",
    year: 2006,
    authors: "T. Ylonen, C. Lonvick (SSH Communications Security)",
    url: "https://www.rfc-editor.org/rfc/rfc4251",
    excerpt:
      "The SSH protocol provides secure encrypted channels over an insecure network for terminal access, command execution, and TCP port forwarding — protecting against eavesdropping, connection hijacking and DNS spoofing.",
    quote: false,
    desc: {
      ar: "المعيار الذي يصف البروتوكول الذي تستخدمه في كل مختبر: SSH — القناة المشفّرة عبر الشبكة غير الموثوقة. فهم طبقاته يجعل دخولك بـ Putty و ssh أعمق من مجرد نقر أزرار.",
      en: "The standard describing the protocol you use in every lab: SSH — the encrypted channel over untrusted networks. Understanding it makes your Putty/ssh logins more than button-clicking.",
    },
  },
  {
    id: "gnu-bash-manual",
    kind: "portal",
    title: "Bash Reference Manual (Bash 5.2)",
    org: "Free Software Foundation — GNU Project",
    year: 2022,
    authors: "Chet Ramey, Brian Fox",
    url: "https://www.gnu.org/software/bash/manual/",
    excerpt:
      "The official reference for the Bourne-Again SHell: syntax, variables, expansions, conditionals, loops, functions, job control — from shell's own maintainers.",
    quote: false,
    desc: {
      ar: "المرجع الرسمي لـ Bash من مطوّريه أنفسهم: الصياغة والمتغيرات والتوسعات والحلقات والدوال — ما ترجع إليه في كل سطر برمجية نصية تكتبه في المختبر.",
      en: "The official Bash reference from its own maintainers: syntax, variables, expansions, loops, functions — what you consult for every script line you write in the lab.",
    },
  },
  {
    id: "man-pages-linux",
    kind: "portal",
    title: "Linux man-pages — the project manual",
    org: "man7.org / Linux man-pages maintainers",
    year: 2024,
    url: "https://man7.org/linux/man-pages/",
    excerpt:
      "The authoritative manual pages documenting the Linux kernel-userspace API and core utilities: man 5 passwd, man 3 printf, man 8 mount — the reference every command you learn points back to.",
    quote: false,
    desc: {
      ar: "الموسوعة الرسمية داخل نظامك: كل أمر تتعلمه في الدروس له صفحة دليل هنا — man يفتحها، وهذا الموقع يشرح أقسامها الثمانية. تعلّم قراءتها تكتسب استقلالك الكامل.",
      en: "The encyclopedia inside your system: every command you learn has a page here — man opens it. Learn to read them and you become fully self-sufficient.",
    },
  },
  {
    id: "openssh-project",
    kind: "vendor",
    title: "OpenSSH — OpenBSD Secure Shell suite",
    org: "The OpenBSD Project",
    year: 2024,
    url: "https://www.openssh.com/",
    excerpt:
      "The definitive SSH implementation used by virtually every Linux server: ssh, scp, sftp, sshd and ssh-keygen — audited for 20+ years by the OpenBSD team.",
    quote: false,
    desc: {
      ar: "تطبيق SSH القياسي على كل خوادم لينكس تقريباً: ssh و scp و ssh-keygen — يدقّقه فريق OpenBSD منذ أكثر من 20 عاماً. هذا ما يستقبلك فعلاً عند الدخول لخوادم الجامعة.",
      en: "The definitive SSH suite on virtually every Linux server: ssh, scp, ssh-keygen — audited for 20+ years by OpenBSD. This is what actually greets you on the university servers.",
    },
  },
  {
    id: "amazon-linux-2",
    kind: "vendor",
    title: "Amazon Linux 2 User Guide",
    org: "Amazon Web Services",
    year: 2024,
    url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/amazon-linux-2.html",
    excerpt:
      "Amazon Linux 2 is a Linux operating system provided by AWS with long-term support, the yum package manager and systemd — the distribution used on Bahrain Polytechnic's Unix Systems course servers.",
    quote: false,
    desc: {
      ar: "التوزيعة التي تعمل عليها خوادم مختبراتك أنت: Amazon Linux 2 على AWS — بحزم yum و systemd ودعم طويل الأمد. توثيق AWS الرسمي مرجعك في مختبرات يونكس.",
      en: "The distribution your lab servers actually run: Amazon Linux 2 on AWS — yum, systemd, long-term support. The official AWS docs are your lab companion.",
    },
  },

  // ─── m14 · Programming, Databases & Web (BPT IT6008/IT6005/IT6012) ───
  {
    id: "codd-1970",
    kind: "paper",
    title: "A Relational Model of Data for Large Shared Data Banks",
    org: "Communications of the ACM 13(6)",
    year: 1970,
    authors: "Edgar F. Codd",
    url: "https://dl.acm.org/doi/10.1145/362384.362685",
    excerpt:
      "Future users of large data banks must be protected from having to know how the data is organized in the machine... A model based on n-ary relations, a normal form for data relations, and a universal data sublanguage.",
    quote: false,
    ref: "Abstract",
    desc: {
      ar: "الورقة التي اخترع بها إدغار كود القواعد العلائقية عام 1970 — الجداول والمفاتيح والاستعلام — فبنيت عليها Oracle وSQL وكل قاعدة بيانات ستستخدمها في مسيرتك. مادة قواعد البيانات عندكم تبدأ من هنا.",
      en: "The 1970 paper in which Edgar Codd invented relational databases — tables, keys, queries — on which Oracle, SQL and every database you will use are built. Your DB course starts here.",
    },
  },
  {
    id: "silberschatz-db",
    kind: "book",
    title: "Database System Concepts (7th Edition)",
    org: "McGraw-Hill",
    year: 2019,
    authors: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan",
    url: "https://www.db-book.com/",
    excerpt:
      "The standard database text: ER modelling, relational algebra and calculus, SQL, normalization up to BCNF, transactions, indexing (B+ trees) and recovery.",
    quote: false,
    desc: {
      ar: "المرجع القياسي في قواعد البيانات: نمذجة ER والجبر العلائقي وSQL والتطبيع حتى BCNF والمعاملات والفهرسة — بنية مادة Database Systems كاملة بين دفتي كتاب.",
      en: "The standard database text: ER modelling, relational algebra, SQL, normalization to BCNF, transactions, indexing — your entire Database Systems course structure.",
    },
  },
  {
    id: "oracle-sql",
    kind: "vendor",
    title: "Oracle Database SQL Language Reference (19c)",
    org: "Oracle Corporation",
    year: 2024,
    url: "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/",
    excerpt:
      "Official reference for Oracle SQL syntax: SELECT, JOINs, subqueries, DDL, DML, functions, and PL/SQL context — the database used in Bahrain Polytechnic's Database Systems course.",
    quote: false,
    desc: {
      ar: "التوثيق الرسمي لـ SQL على Oracle — قاعدة البيانات التي تُدرَّس بها مادة Database Systems في البوليتكنيك: الاستعلامات والوصلات والدوال وكل صياغة ستحتاجها في الواجبات.",
      en: "The official Oracle SQL reference — the database Bahrain Polytechnic's Database Systems course teaches with: queries, joins, functions and every syntax your assignments need.",
    },
  },
  {
    id: "python-docs",
    kind: "portal",
    title: "The Python Tutorial (Python 3 documentation)",
    org: "Python Software Foundation",
    year: 2024,
    url: "https://docs.python.org/3/tutorial/",
    excerpt:
      "Python is an easy-to-learn, powerful programming language with efficient high-level data structures and a simple but effective approach to object-oriented programming — the official hands-on introduction.",
    quote: false,
    desc: {
      ar: "المرجع الرسمي لتعلّم بايثون من مصدره: هياكل بيانات عالية الكفاءة ونهج بسيط وفعّال للبرمجة كائنية التوجه. لغة أولى مثالية لطالب الشبكات — ومنها ستبني أدوات أتمتة المستقبل.",
      en: "The official Python tutorial from the source: efficient high-level data structures, simple effective OOP. An ideal first language for a networks student — and your future automation tools.",
    },
  },
  {
    id: "w3c-html",
    kind: "standard",
    title: "HTML Living Standard",
    org: "WHATWG",
    year: 2024,
    url: "https://html.spec.whatwg.org/multipage/",
    excerpt:
      "The normative specification of HTML: document structure, semantic elements, forms, links, media — the language every web page (including this platform) is written in.",
    quote: false,
    desc: {
      ar: "المواصفة المعيارية لـ HTML: البنية والعناصر الدلالية والنماذج والوسائط — اللغة التي كُتبت بها كل صفحة ويب، بمن فيها هذه المنصة التي تقرأ عليها الدرس.",
      en: "The normative HTML specification: structure, semantic elements, forms, media — the language every web page is written in, including this very platform.",
    },
  },
  {
    id: "mdn-web",
    kind: "portal",
    title: "MDN Web Docs — Learn Web Development",
    org: "Mozilla",
    year: 2024,
    url: "https://developer.mozilla.org/en-US/docs/Learn",
    excerpt:
      "Structured learning paths for HTML, CSS and JavaScript with working examples — the reference professional developers consult daily, maintained by Mozilla and the web community.",
    quote: false,
    desc: {
      ar: "مسارات تعلّم منظمة لـ HTML وCSS وجافاسكريبت بأمثلة عاملة — المرجع الذي يستشيره المطوّرون المحترفون يومياً. شريكك في مادة Web Fundamentals ومشروعها العملي.",
      en: "Structured learning paths for HTML, CSS and JavaScript with working examples — the reference professional developers consult daily. Your Web Fundamentals companion.",
    },
  },
  {
    id: "fielding-2000",
    kind: "paper",
    title: "Architectural Styles and the Design of Network-based Software Architectures",
    org: "University of California, Irvine (PhD dissertation)",
    year: 2000,
    authors: "Roy Thomas Fielding",
    url: "https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm",
    excerpt:
      "Chapter 5 presents REST — Representational State Transfer — the architectural style of the web itself: resources addressed by URL, uniform interface, statelessness, and hypermedia.",
    quote: false,
    desc: {
      ar: "الفصل الخامس من أطروحة فيلدنغ الذي عرّف REST — النمط المعماري للويب نفسه: موارد بعناوين URL وواجهة موحّدة وعديمي الحالة. كل API ستستهلكه في أتمتة الشبكات مبني عليه.",
      en: "Chapter 5 of Fielding's dissertation defining REST — the architectural style of the web itself. Every API you will consume in network automation is built on it.",
    },
  },

  // ─── m15 · Math, Statistics & Research (BPT IT6010/IT7012 aligned) ────
  {
    id: "likert-1932",
    kind: "paper",
    title: "A Technique for the Measurement of Attitudes",
    org: "Archives of Psychology",
    year: 1932,
    authors: "Rensis Likert",
    url: "https://scholar.google.com/scholar?q=%22A+Technique+for+the+Measurement+of+Attitudes%22+Likert",
    excerpt:
      "Introduced the summated-rating scale — statements with graded response categories (e.g. strongly disagree to strongly agree) — which became the most widely used attitude measurement method in survey research.",
    quote: false,
    desc: {
      ar: "الورقة التي قدّم فيها ليكيرت مقياسه الشهير: عبارات متدرجة من «أوافق بشدة» إلى «أعارف بشدة» — المقياس الأكثر استخداماً في تاريخ بحوث الاستبيانات، والذي ستستخدمه في مشروع بحثك الكمي.",
      en: "The paper introducing the Likert scale: graded statements from strongly agree to strongly disagree — the most used attitude measure in survey history, and the one for your quantitative mini-project.",
    },
  },
  {
    id: "tukey-1977",
    kind: "book",
    title: "Exploratory Data Analysis",
    org: "Addison-Wesley",
    year: 1977,
    authors: "John W. Tukey",
    url: "https://scholar.google.com/scholar?q=%22Exploratory+Data+Analysis%22+Tukey",
    excerpt:
      "The book that taught statistics to look at data first: stem-and-leaf plots, box plots and the philosophy that visualization precedes hypothesis — EDA before modelling.",
    quote: false,
    desc: {
      ar: "الكتاب الذي علّم الإحصاء أن ينظر إلى البيانات أولاً: المخططات الجذعية والصناديق وفلسفة «تصوّر قبل أن تفترض» — منهجية EDA التي ستطبقها في تحليل بيانات استبيانك.",
      en: "The book that taught statistics to look first: stem-and-leaf, box plots, and visualize-before-you-hypothesize — the EDA methodology for your survey analysis.",
    },
  },
  {
    id: "openintro-stats",
    kind: "book",
    title: "OpenIntro Statistics (4th Edition)",
    org: "OpenIntro",
    year: 2019,
    authors: "David M. Diez, Mine Çetinkaya-Rundel, Christopher D. Barr",
    url: "https://www.openintro.org/book/os/",
    excerpt:
      "A free, open-licensed, classroom-tested statistics textbook: data design, numerical and graphical summaries, probability, distributions, and inference for means and proportions.",
    quote: false,
    desc: {
      ar: "مرجع إحصاء مجاني مفتوح الترخيص ومُجرَّب في قاعات الدروس: تنظيم البيانات والتلخيصات الرقمية والرسومية والاحتمالات والاستدلال — كل مخرجات مادة الرياضيات للحوسبة.",
      en: "A free, open-licensed, classroom-tested statistics text: data design, summaries, probability, inference — your Maths for Computing outcomes, covered.",
    },
  },
  {
    id: "nist-sematech",
    kind: "portal",
    title: "NIST/SEMATECH e-Handbook of Statistical Methods",
    org: "National Institute of Standards and Technology (NIST)",
    year: 2012,
    url: "https://www.itl.nist.gov/div898/handbook/",
    excerpt:
      "The authoritative online handbook of applied statistics: descriptive techniques, measurement precision, hypothesis testing, and SPC — with worked engineering examples.",
    quote: false,
    desc: {
      ar: "دليل NIST الإلكتروني للطرق الإحصائية التطبيقية: التقنيات الوصفية ودقة القياس واختبار الفرضيات بأمثلة هندسية محلولة — مرجع حكومي أمريكي بجودة معيارية.",
      en: "NIST's authoritative online handbook of applied statistics: descriptive techniques, measurement precision, hypothesis testing with worked engineering examples.",
    },
  },
  {
    id: "acm-cc2020",
    kind: "course",
    title: "Computing Curricula 2020: Paradigms for Global Computing Education (CC2020)",
    org: "ACM / IEEE Computer Society",
    year: 2020,
    url: "https://doi.org/10.1145/3467967",
    excerpt:
      "The global reference framing computing competencies: knowledge × skills × dispositions across all computing disciplines, guiding accredited degree programmes worldwide — including how IT degrees like the BICT are structured.",
    quote: false,
    desc: {
      ar: "الإطار العالمي لكفايات علوم الحاسوب من ACM وIEEE: معرفة × مهارات × استعدادات — الدليل الذي تُبنى عليه البرامج الأكاديمية المعتمدة عالمياً ومنها بكالوريوس BICT الذي تدرسه. افهم الخريطة الكبرى لخطتك.",
      en: "ACM/IEEE's global competency framework: knowledge × skills × dispositions — the guide behind accredited computing degrees worldwide, including your BICT. See the big map of your study plan.",
    },
  },
];

export const SOURCE_BY_ID: Record<string, Source> = Object.fromEntries(
  SOURCES.map((s) => [s.id, s])
);

/** Get a source by id (undefined-safe) */
export function sourceById(id: string): Source | undefined {
  return SOURCE_BY_ID[id];
}
