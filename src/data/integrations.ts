import type { Bi } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* NetSim → real-lab integrations: EVE-NG / GNS3 / Containerlab       */
/* Pure content data — no React here.                                 */
/* ------------------------------------------------------------------ */

export type IntegrationId = "eveng" | "gns3" | "containerlab";
export type IntegrationLicense = "opensource" | "free" | "freemium";
export type TargetPlatform = "Linux" | "Windows" | "Web" | "macOS";

export interface IntegrationLink {
  kind: "site" | "download" | "repo" | "docs";
  label: Bi;
  url: string;
}

export interface InstallStep {
  title: Bi;
  /** real CLI commands, rendered LTR in a dark code block */
  code?: string;
  note?: Bi;
}

export interface CodeExample {
  title: Bi;
  /** code language label shown above the block: bash / yaml / html */
  lang: string;
  code: string;
  desc?: Bi;
}

export interface ArchNode {
  label: Bi;
  sub?: Bi;
  /** true → the emerald "our platform" box */
  highlight?: boolean;
}

export interface IntegrationPlatform {
  id: IntegrationId;
  name: string;
  tagline: Bi;
  license: IntegrationLicense;
  licenseNote: Bi;
  platforms: TargetPlatform[];
  bestFor: Bi;
  /** "What it is" bilingual paragraph */
  what: Bi;
  links: IntegrationLink[];
  install: InstallStep[];
  /** how our platform talks to the tool */
  archTitle: Bi;
  archNote: Bi;
  arch: ArchNode[];
  examples: CodeExample[];
}

export const INTEGRATION_PLATFORMS: IntegrationPlatform[] = [
  /* ---------------------------------------------------------------- */
  /* EVE-NG (Community Edition)                                       */
  /* ---------------------------------------------------------------- */
  {
    id: "eveng",
    name: "EVE-NG",
    tagline: {
      ar: "مختبر شبكات متعدد المورّدين يعمل كخادم — وكل شيء من المتصفح",
      en: "Multi-vendor network lab that runs as a server — everything from the browser",
    },
    license: "free",
    licenseNote: {
      ar: "إصدار Community مجاني (كود مغلق) — إصدار Pro مدفوع ومغلق المصدر",
      en: "Community Edition is free (closed source) — Pro edition is paid & closed source",
    },
    platforms: ["Linux", "Web"],
    bestFor: {
      ar: "الأفضل لـ: بيئات تدريب CCNA/CCNP/CCIE كاملة بواجهة HTML5 جاهزة للتضمين",
      en: "Best for: full CCNA/CCNP/CCIE training environments with an embeddable HTML5 console",
    },
    what: {
      ar: "EVE-NG منصة محاكاة شبكات تعمل كخادم (على الخادم المعدني مباشرة أو داخل آلة افتراضية) وتُدار بالكامل من المتصفح. نسخة Community المجانية توحّد محركات Dynamips وQEMU وIOL في مختبر واحد متعدد المورّدين، مع كونسول HTML5 لكل عقدة — أي جهاز لديه متصفح يتحول إلى طرفية شبكة حقيقية، وهذا ما يجعله مثالياً لتضمينه في منصة تعليمية مثل منصتنا.",
      en: "EVE-NG is a network emulation platform that runs as a server (bare-metal or inside a VM) and is managed entirely from the browser. The free Community Edition unifies the Dynamips, QEMU and IOL engines into one multi-vendor lab, with an HTML5 console for every node — any device with a browser becomes a real network terminal, which makes it ideal to embed inside an education platform like ours.",
    },
    links: [
      {
        kind: "site",
        label: { ar: "الموقع الرسمي", en: "Official site" },
        url: "https://www.eve-ng.net/",
      },
      {
        kind: "download",
        label: { ar: "تنزيل Community المجاني", en: "Free CE download" },
        url: "https://www.eve-ng.net/index.php/download/",
      },
    ],
    install: [
      {
        title: {
          ar: "١) حمّل نسخة ISO أو OVF من صفحة التنزيل الرسمية",
          en: "1) Grab the ISO or OVF from the official download page",
        },
        code: [
          "# official download page (Community ISO / OVF):",
          "# https://www.eve-ng.net/index.php/download/",
          "",
          "# bare-metal install: write the ISO to a USB stick, then boot the server",
          "lsblk",
          "sudo dd if=EVE-NG-Community.iso of=/dev/sdX bs=4M status=progress oflag=direct",
        ].join("\n"),
        note: {
          ar: "التثبيت على الخادم المعدني مباشرة يمنح أفضل أداء لصور IOL/IOU",
          en: "Bare-metal installs give the best performance for IOL/IOU images",
        },
      },
      {
        title: {
          ar: "٢) أو شغّله كآلة افتراضية",
          en: "2) Or run it as a virtual machine",
        },
        code: [
          "# import the OVF into VMware ESXi / Workstation / VirtualBox",
          "# give it >= 4 vCPU + 8 GB RAM + bridged NIC, then browse to:",
          "#   http://<eve-ip>/     (default credentials: admin / eve)",
        ].join("\n"),
      },
    ],
    archTitle: {
      ar: "كيف نربط منصتنا بخادم EVE-NG",
      en: "How our platform connects to an EVE-NG server",
    },
    archNote: {
      ar: "منصتنا تتكلم مع الخادم عبر REST (مع ملفات كوكيز للمصادقة)، ثم تُضمّن كونسول HTML5 لكل عقدة داخل إطار — المتعلم يرى المختبر الحقيقي دون مغادرة المنصة.",
      en: "Our platform talks to the server over REST (cookie-based auth), then embeds each node's HTML5 console inside a frame — the learner sees the real lab without ever leaving the platform.",
    },
    arch: [
      { label: { ar: "منصتنا PWA", en: "Our PWA" }, sub: { ar: "NetSim + الدروس", en: "NetSim + lessons" }, highlight: true },
      { label: { ar: "REST / HTTPS", en: "REST / HTTPS" }, sub: { ar: "/api/auth/login", en: "/api/auth/login" } },
      { label: { ar: "خادم EVE-NG", en: "EVE-NG server" }, sub: { ar: "لينكس + المختبرات", en: "Linux + labs" } },
      { label: { ar: "عقد المختبر", en: "Lab nodes" }, sub: { ar: "IOL / Dynamips / QEMU", en: "IOL / Dynamips / QEMU" } },
    ],
    examples: [
      {
        title: { ar: "المصادقة على واجهة EVE-NG API", en: "Authenticate against the EVE-NG API" },
        lang: "bash",
        code: [
          "# EVE-NG API — open a session first (cookies required)",
          `curl -k -X POST https://<eve-ip>/api/auth/login \\`,
          `     -d '{"username":"admin","password":"eve","html5":true}' \\`,
          "     -c eve-cookies.txt",
          "",
          "# then list the labs that exist on the server",
          "curl -k -X GET https://<eve-ip>/api/labs -b eve-cookies.txt",
        ].join("\n"),
        desc: {
          ar: "خزّن ملف الكوكيز وأرسله مع كل طلب لاحق — الجلسة تنتهي بانتهاء صلاحية تسجيل الدخول",
          en: "Store the cookie jar and send it with every later request — the session expires with the login",
        },
      },
      {
        title: { ar: "تضمين كونسول HTML5 داخل منصتنا", en: "Embedding the HTML5 console in our platform" },
        lang: "html",
        code: [
          "<!-- EVE-NG serves each node's HTML5 (noVNC) console in the browser.",
          "     Embed the lab view in an iframe once the session is open: -->",
          "<iframe",
          '  src="https://<eve-ip>/"',
          '  title="EVE-NG lab"',
          '  class="w-full h-[480px] rounded-lg border"',
          "></iframe>",
        ].join("\n"),
        desc: {
          ar: "ملاحظة مهمة: بعض الإصدارات ترسل ترويسات تمنع التضمين (مثل X-Frame-Options) — الحل العملي عندها زر يفتح المختبر في تبويب جديد يشترك مع الجلسة نفسها",
          en: "Important note: some builds send frame-blocking headers (e.g. X-Frame-Options) — the practical fallback is a button that opens the lab in a new tab sharing the same session",
        },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* GNS3                                                             */
  /* ---------------------------------------------------------------- */
  {
    id: "gns3",
    name: "GNS3",
    tagline: {
      ar: "المحاكي مفتوح المصدر الأشهر — خادم Python وواجهة Angular وREST كامل",
      en: "The most popular open-source emulator — Python server, Angular UI and a full REST API",
    },
    license: "opensource",
    licenseNote: {
      ar: "رخصة GPL — الخادم والواجهة كلاهما مفتوح المصدر ويمكن قراءة كودهما وتعديلهما",
      en: "GPL licensed — both the server and the UI are open source and forkable",
    },
    platforms: ["Linux", "Windows", "macOS"],
    bestFor: {
      ar: "الأفضل لـ: المطورين — اقرأ الكود، عدّله، وقُد المختبر كاملاً برمجياً عبر REST",
      en: "Best for: developers — read the code, fork it, and drive the whole lab programmatically over REST",
    },
    what: {
      ar: "GNS3 محاكي شبكات مفتوح المصدر بالكامل: خادم Python‏ (gns3-server) يدير عقد Dynamips لصور Cisco IOS، وQEMU للأجهزة متعددة المورّدين، وDocker لعقد الحاويات — بينما تتحكم به عبر واجهة سطح مكتب أو واجهة ويب مكتوبة بـ Angular‏ (gns3-web-ui). وبما أن كل شيء مفتوح وموثّق خلف واجهة REST‏ v2، فهو الجسر الطبيعي بين متصفحنا والمختبر الحقيقي.",
      en: "GNS3 is a fully open-source network emulator: a Python server (gns3-server) drives Dynamips nodes for Cisco IOS images, QEMU for multi-vendor appliances and Docker for container nodes — controlled from a desktop app or an Angular web UI (gns3-web-ui). Because everything is open and documented behind the v2 REST API, it is the natural bridge between our browser and a real lab.",
    },
    links: [
      {
        kind: "repo",
        label: { ar: "مستودع واجهة الويب (Angular + TypeScript)", en: "Web UI repo (Angular + TypeScript)" },
        url: "https://github.com/GNS3/gns3-web-ui",
      },
      {
        kind: "repo",
        label: { ar: "مستودع محرك الخادم (Python)", en: "Server engine repo (Python)" },
        url: "https://github.com/GNS3/gns3-server",
      },
      {
        kind: "docs",
        label: { ar: "وثائق الـ API الرسمية", en: "Official API docs" },
        url: "https://gns3-server.readthedocs.io/",
      },
    ],
    install: [
      {
        title: { ar: "١) لينكس (Ubuntu/Debian) — أمر واحد", en: "1) Linux (Ubuntu/Debian) — one command" },
        code: [
          "sudo apt install gns3-gui gns3-server",
          "",
          "# want fresher builds? add the official PPA first",
          "sudo add-apt-repository ppa:gns3/ppa && sudo apt update",
        ].join("\n"),
        note: {
          ar: "Dynamips يحاكي Cisco IOS، وQEMU يشغّل صور المورّدين (vSR / FortiGate / ...)، وDocker يشغّل عقد الحاويات",
          en: "Dynamips emulates Cisco IOS, QEMU runs vendor appliances (vSR / FortiGate / ...), Docker runs container nodes",
        },
      },
      {
        title: { ar: "٢) ماك / ويندوز — مثبّتات رسمية من gns3.com", en: "2) macOS / Windows — official installers from gns3.com" },
        code: [
          "# after installing, verify:",
          "gns3 --version",
          "",
          "# headless: run only the server and drive it purely over REST",
          "gns3server --host 0.0.0.0 --port 3080",
        ].join("\n"),
      },
    ],
    archTitle: {
      ar: "كيف نربط منصتنا بخادم GNS3",
      en: "How our platform connects to a GNS3 server",
    },
    archNote: {
      ar: "خريطة NetSim تُترجم إلى استدعاءات REST‏ v2 على المنفذ 3080: كل جهاز طلب إنشاء عقدة، وكل وصلة طلب ربط — والخادم يشغّلها فوق Dynamips/QEMU/Docker الحقيقية.",
      en: "A NetSim map translates to v2 REST calls on port 3080: every device becomes a create-node call, every cable a link call — the server runs them on real Dynamips/QEMU/Docker.",
    },
    arch: [
      { label: { ar: "منصتنا PWA", en: "Our PWA" }, sub: { ar: "NetSim + الدروس", en: "NetSim + lessons" }, highlight: true },
      { label: { ar: "REST API", en: "REST API" }, sub: { ar: "HTTP :3080 /v2", en: "HTTP :3080 /v2" } },
      { label: { ar: "خادم GNS3", en: "GNS3 server" }, sub: { ar: "Python gns3-server", en: "Python gns3-server" } },
      { label: { ar: "العقد", en: "Nodes" }, sub: { ar: "Dynamips / QEMU / Docker", en: "Dynamips / QEMU / Docker" } },
    ],
    examples: [
      {
        title: { ar: "GNS3 v2 REST — أنشئ مختبراً وشغّله بالكامل", en: "GNS3 v2 REST — create and start a whole lab" },
        lang: "bash",
        code: [
          `# 1) create a project — the JSON response carries its project_id`,
          `curl -X POST http://localhost:3080/v2/projects \\`,
          `     -d '{"name":"netmastery"}'`,
          "",
          "# 2) create a Dynamips IOS router inside it",
          `curl -X POST http://localhost:3080/v2/projects/<project_id>/nodes \\`,
          `     -d '{"name":"R1","node_type":"dynamips","compute_id":"local"}'`,
          "",
          "# 3) start ALL nodes at once",
          "curl -X POST http://localhost:3080/v2/projects/<project_id>/nodes/start",
        ].join("\n"),
        desc: {
          ar: "خريطة أجهزة NetSim (devices + links) تُحوَّل مباشرة إلى هذه الطلبات: كل جهاز يصبح POST إلى /nodes وكل وصلة POST إلى /links",
          en: "A NetSim map (devices + links) maps straight onto these calls: every device becomes a POST /nodes and every link a POST /links",
        },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* Containerlab                                                     */
  /* ---------------------------------------------------------------- */
  {
    id: "containerlab",
    name: "Containerlab",
    tagline: {
      ar: "شبكات حاوية حقيقية — آلاف العقد في ثوانٍ فوق Docker",
      en: "Real container networks — thousands of nodes in seconds on Docker",
    },
    license: "opensource",
    licenseNote: {
      ar: "مفتوح المصدر بالكامل ومكتوب بلغة Go",
      en: "Fully open source, written in Go",
    },
    platforms: ["Linux"],
    bestFor: {
      ar: "الأفضل لـ: أبنية السحابة وDevNet — سريع وخفيف ومثالي للأتمتة وخطوط CI",
      en: "Best for: cloud & DevNet topologies — fast, light and perfect for automation and CI pipelines",
    },
    what: {
      ar: "Containerlab أداة من عالم DevNet: تصف طوبولوجيا الشبكة في ملف YAML بسيط فيبنيها Docker حاوياتٍ حقيقية — أجهزة لينكس خفيفة أو صور Cisco/Nokia/Juniper عبر vrnetlab. والأجمل: بنية الطوبولوجيا التي يصدّرها NetSim لدينا (أجهزة + وصلات) تُترجم حرفياً إلى ملف topo.yaml — نفس المفاهيم، لكن بشبكة إيثنت حقيقية بين الحاويات.",
      en: "Containerlab is a DevNet-world tool: you describe a network topology in a simple YAML file and Docker builds it as real containers — lightweight Linux nodes or Cisco/Nokia/Juniper images via vrnetlab. Best of all, the topology structure our NetSim exports (devices + links) translates literally into a topo.yaml file — same concepts, but with a real veth network between containers.",
    },
    links: [
      {
        kind: "site",
        label: { ar: "الموقع والوثائق الرسمية", en: "Official site & docs" },
        url: "https://containerlab.dev/",
      },
      {
        kind: "repo",
        label: { ar: "المستودع (Go)", en: "Repo (Go)" },
        url: "https://github.com/srl-labs/containerlab",
      },
    ],
    install: [
      {
        title: { ar: "١) سطر واحد للتثبيت (يتطلب Docker على لينكس)", en: "1) One-line install (requires Docker on Linux)" },
        code: [
          `bash -c "$(curl -sL https://get.containerlab.dev)"`,
          "",
          "# verify the install",
          "containerlab version",
        ].join("\n"),
      },
      {
        title: { ar: "٢) انشر مختبرك ثم دمّره", en: "2) Deploy your lab, then tear it down" },
        code: [
          "# deploy a topology file",
          "containerlab deploy -t topo.yaml",
          "",
          "# see what's running / clean everything up",
          "containerlab inspect",
          "containerlab destroy -t topo.yaml",
        ].join("\n"),
        note: {
          ar: "تُسمّى الحاويات تلقائياً بالصيغة clab-<اسم-المعمل>-<اسم-العقدة> فتدخل إليها بـ docker exec",
          en: "Containers are auto-named clab-<lab-name>-<node-name> — hop into them with docker exec",
        },
      },
    ],
    archTitle: {
      ar: "كيف نربط منصتنا بـ Containerlab",
      en: "How our platform connects to Containerlab",
    },
    archNote: {
      ar: "تصدير NetSim (أجهزة + وصلات) يتحول إلى ملف topo.yaml، وcontainerlab يبنيه فوق Docker حاويات حقيقية موصولة بروابط veth — من المتصفح إلى شبكة Linux فعلية في أمر واحد.",
      en: "The NetSim export (devices + links) becomes a topo.yaml file, and containerlab builds it on Docker as real containers wired with veth links — from the browser to an actual Linux network in a single command.",
    },
    arch: [
      { label: { ar: "منصتنا PWA", en: "Our PWA" }, sub: { ar: "تصدير NetSim", en: "NetSim export" }, highlight: true },
      { label: { ar: "topo.yaml", en: "topo.yaml" }, sub: { ar: "nodes + links", en: "nodes + links" } },
      { label: { ar: "containerlab + Docker", en: "containerlab + Docker" }, sub: { ar: "مكتوب بـ Go", en: "written in Go" } },
      { label: { ar: "الحاويات", en: "Containers" }, sub: { ar: "لينكس / Cisco / FRR", en: "Linux / Cisco / FRR" } },
    ],
    examples: [
      {
        title: { ar: "topo.yaml — نفس بنية تصدير NetSim", en: "topo.yaml — the same shape NetSim exports" },
        lang: "yaml",
        code: [
          "# topo.yaml — mirrors the NetSim export (devices -> nodes, links -> links)",
          "name: netmastery-lab",
          "",
          "topology:",
          "  nodes:",
          "    pc1:                      # host node (like NetSim PC)",
          "      kind: linux",
          "      image: alpine:3",
          "    r1:                       # Cisco router image (via vrnetlab)",
          "      kind: vr-csr",
          "      image: vrnetlab/cisco-csr1000v",
          "    sw1:                      # switch (FRR routing stack)",
          "      kind: linux",
          "      image: frrouting/frr",
          "",
          "  links:",
          `    - endpoints: ["pc1:eth0", "sw1:eth1"]`,
          `    - endpoints: ["r1:eth0", "sw1:eth2"]`,
        ].join("\n"),
        desc: {
          ar: "name لاسم المختبر، وnodes للأجهزة (يحدد kind نوعها)، وlinks للوصلات بترميز [\"الجهاز:المنفذ\", ...] — تماماً كخريطة NetSim",
          en: "name for the lab, nodes for devices (kind picks the type), links for cabling with [\"node:port\", ...] — exactly like a NetSim map",
        },
      },
      {
        title: { ar: "افحص المختبر وادخل إلى أي عقدة", en: "Inspect the lab and exec into any node" },
        lang: "bash",
        code: [
          "# what's running right now?",
          "containerlab inspect",
          "",
          "# hop into a node's shell (containers are named clab-<lab>-<node>)",
          "docker exec -it clab-netmastery-lab-sw1 sh",
          "docker exec -it clab-netmastery-lab-pc1 ping -c3 10.0.0.1",
        ].join("\n"),
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Compare table                                                      */
/* ------------------------------------------------------------------ */

export interface CompareRow {
  label: Bi;
  /** star rating 0–5 per platform */
  stars: Record<IntegrationId, number>;
  note?: Bi;
}

export const COMPARE_ROWS: CompareRow[] = [
  {
    label: { ar: "سهولة التثبيت", en: "Install ease" },
    stars: { eveng: 2, gns3: 4, containerlab: 5 },
  },
  {
    label: { ar: "استهلاك الموارد", en: "Resource footprint" },
    stars: { eveng: 2, gns3: 3, containerlab: 5 },
    note: {
      ar: "حاويات لينكس أخف بكثير من محاكاة المعالجات كاملة",
      en: "Linux containers are far lighter than full processor emulation",
    },
  },
  {
    label: { ar: "دعم Cisco IOS", en: "Cisco IOS support" },
    stars: { eveng: 5, gns3: 5, containerlab: 3 },
    note: {
      ar: "صور IOS الأصلية تعمل عبر Dynamips/IOL — وvrnetlab يشغّل CSR/XR في الحاويات",
      en: "Native IOS images run via Dynamips/IOL — vrnetlab runs CSR/XR in containers",
    },
  },
  {
    label: { ar: "التوسع بالحاويات", en: "Container scale-out" },
    stars: { eveng: 2, gns3: 3, containerlab: 5 },
  },
  {
    label: { ar: "السعر", en: "Price" },
    stars: { eveng: 4, gns3: 5, containerlab: 5 },
    note: {
      ar: "EVE-NG‏ CE مجاني و Pro مدفوع — GNS3 و Containerlab مجانيان بالكامل",
      en: "EVE-NG CE is free with paid Pro — GNS3 & Containerlab are fully free",
    },
  },
];
