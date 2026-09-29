import type { Tool } from "@/lib/types";

// ─── الاستجابة للحوادث والتحقيقات الجنائية | Incident Response & Network Forensics (t701–t725) ───
// ─── OSINT والاستطلاع | OSINT & Reconnaissance (t726–t750) ───
// ─── تطبيقات الشبكات للأجهزة المحمولة | Mobile Network Apps (t751–t775) ───
// ─── مكتبات وحزم تطوير الشبكات | Network Libraries & SDKs (t776–t800) ───

export const TOOLS_PART8: Tool[] = [
  // ═══ Incident Response & Network Forensics (t701–t725) ═══
  {
    id: "t701",
    name: "TheHive",
    url: "https://thehive-project.org",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة استجابة للحوادث مفتوحة المصدر تُستخدم في مراكز العمليات الأمنية لإدارة قضايا الاستجابة بشكل تعاوني. تربط المهام والملصقات والقضايا في لوحة واحدة، وتتكامل مع Cortex وMISP لأتمتة التحليل ومشاركة المؤشرات. أداة جوهرية لتنظيم التحقيق في الحوادث الشبكية الكبيرة.",
      en: "An open-source incident response platform used by SOCs to collaboratively manage security cases. It links tasks, observables and case notes on one board, and integrates with Cortex and MISP to automate analysis and share indicators. Essential for organising large-scale network incident investigations."
    },
    cmd: "curl -s http://localhost:9000/api/case -H 'Authorization: Bearer <KEY>' | jq",
    cmdDesc: {
      ar: "يستعلم واجهة برمجة تطبيقات TheHive لعرض قائمة القضايا المفتوحة بصيغة JSON.",
      en: "Queries TheHive REST API to list open cases as JSON."
    },
    tags: ["thehive", "ir", "soc", "case-management"]
  },
  {
    id: "t702",
    name: "Cortex",
    url: "https://github.com/TheHive-Project/Cortex",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "محرك تحليل وأتمتة مصاحب لمنصة TheHive، يشغّل مئات المحللات على المؤشرات مثل عناوين IP والنطاقات والملفات تلقائيًا. يُقلل العمل اليدوي المكرر أثناء الاستجابة للحوادث عبر مكتبة قابلة للتوسيع من المحللات. يمنح مهندس الشبكات قدرة على فحص عشرات المؤشرات بضغطة واحدة.",
      en: "An automation and analysis engine that accompanies TheHive, running hundreds of analyzers against indicators such as IPs, domains and files. It removes repetitive manual work during incident response via an extensible analyzer library. It lets a network engineer triage dozens of indicators in a single click."
    },
    cmd: "curl -s http://localhost:9001/api/analyzer | jq '.[].name'",
    cmdDesc: {
      ar: "يعرض قائمة المحللات المتاحة في مثيل Cortex عبر واجهته البرمجية.",
      en: "Lists the available analyzers on a Cortex instance via its REST API."
    },
    tags: ["cortex", "thehive", "automation", "threat-intel"]
  },
  {
    id: "t703",
    name: "MISP",
    url: "https://www.misp-project.org",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة مفتوحة المصدر لمشاركة مؤشرات التهديد بين الفرق والمؤسسات، وتُعد معيارًا فعليًا في مجتمع الاستجابة للحوادث. تدعم الأحداث والملصقات وربط المؤشرات وتصديرها إلى قواعد كشف مثل Suricata. تُساعد مهندس الشبكات على تحويل المعلومات الاستخباراتية إلى قواعد حماية عملية.",
      en: "An open-source threat intelligence sharing platform that has become a de facto standard in the incident response community. It supports events, tags, correlated indicators and exports into detection rules. It helps network engineers turn intelligence feeds into actionable defensive rules."
    },
    cmd: "curl -s -H 'Authorization: <API_KEY>' https://misp.local/events/restSearch -d 'returnFormat=json' | jq",
    cmdDesc: {
      ar: "يبحث في أحداث MISP عن المؤشرات عبر واجهة REST ويعيد النتائج بصيغة JSON.",
      en: "Searches MISP events through its REST interface and returns JSON results."
    },
    tags: ["misp", "threat-intel", "stix", "sharing"]
  },
  {
    id: "t704",
    name: "Yeti",
    url: "https://yeti-platform.io",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة لتنظيم مؤشرات التهديد والكيانات المرتبطة بها بطريقة قابلة للاستعلام، تربط النطاقات وعناوين IP والبرمجيات الخبيثة بعضها ببعض. مبنية على قاعدة بيانات مرنة تُسهّل على محللي الاستجابة تتبع البنية التحتية للمهاجمين. أداة مفيدة لتحويل بيانات الاستطلاع إلى صورة متكاملة للحملات.",
      en: "A platform for organising threat indicators and their linked entities in a queryable graph, connecting domains, IPs and malware families. Its flexible datastore makes it easy for responders to track adversary infrastructure. Useful for turning scattered reconnaissance data into a coherent campaign picture."
    },
    cmd: "curl -s http://localhost:5000/api/indicators/ | jq '.[0:5]'",
    cmdDesc: {
      ar: "يستعرض أول خمسة مؤشرات مسجلة في مثيل Yeti عبر واجهته البرمجية.",
      en: "Fetches the first five indicators stored in a Yeti instance via its API."
    },
    tags: ["yeti", "threat-intel", "osint", "investigation"]
  },
  {
    id: "t705",
    name: "Brim",
    url: "https://www.brimdata.io",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تطبيق لاستكشاف ملفات التقاط الحزم الضخمة بسرعة عالية مبني على لغة الاستعلام Zed وصيغة ZNG المضغوطة. يُتيح للباحثين في الحوادث تصفية مليارات الحزم والأحداث في ثوانٍ دون توقف الواجهة. امتداد طبيعي لسير عمل Zeek لتحليل حركة الشبكة أثناء التحقيق.",
      en: "A desktop app for exploring very large packet captures at high speed, built on the Zed query language and the compressed ZNG format. It lets incident investigators slice billions of packets and events in seconds without UI stalls. A natural companion to Zeek workflows during network investigations."
    },
    cmd: "zq 'count() by _path' logs.zng",
    cmdDesc: {
      ar: "يحسب عدد سجلات كل نوع حدث في ملف ZNG باستخدام أداة zq من عائلة Brim.",
      en: "Counts records per event type in a ZNG file using zq from the Brim family."
    },
    tags: ["brim", "zed", "pcap", "zeek", "forensics"]
  },
  {
    id: "t706",
    name: "CyberChef",
    url: "https://gchq.github.io/CyberChef/",
    category: "incident",
    platform: ["web"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "ساحة عمليات لفك الشفرات وفك الترميز داخل المتصفح، طورتها GCHQ وتضم أكثر من ثلاثمئة عملية. تُستخدم بكثافة في تحليل الحمولات المشفرة في حركة الشبكة مثل Base64 وXOR والسلاسل المخفية. أداة لا غنى عنها لأي محلل يفكك بيانات حادثة بسرعة دون كتابة سطر برمجي.",
      en: "A browser-based data decoding and crypto operations workbench from GCHQ with over three hundred operations. It is heavily used to dissect encoded payloads in network traffic such as Base64, XOR and hidden strings. A must-have for analysts triaging incident data quickly without writing code."
    },
    cmd: "https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true,false)",
    cmdDesc: {
      ar: "يفتح وصفة جاهزة في CyberChef لفك ترميز Base64 عبر رابط مباشر.",
      en: "Opens a ready CyberChef recipe to decode Base64 via a deep link."
    },
    tags: ["cyberchef", "decoding", "forensics", "triage"]
  },
  {
    id: "t707",
    name: "GRR Rapid Response",
    url: "https://github.com/google/grr",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "إطار استجابة للحوادث من جوجل يسمح بالتحقيق الحي في آلاف الأجهزة عن بُعد بشكل متوازٍ. يجمع الأدلة الجنائية الملفات والسجلات والذاكرة الجزئية عبر وكلاء خفيفين مع أرشفة موثوقة. يُساعد فرق الاستجابة على النطاق الواسع في الاطلاع على حالة الشبكة دون تعطيل العمل.",
      en: "Google's incident response framework that allows live remote forensics on thousands of endpoints in parallel. It collects files, registry, logs and partial memory through lightweight agents with verifiable archival. It enables broad-scope response teams to see fleet state without disrupting users."
    },
    cmd: "pip install grr-api-client && grr_api_shell",
    cmdDesc: {
      ar: "يثبت مكتبة عميل GRR ويفتح قشرة تفاعلية لاستعلام خوادم GRR.",
      en: "Installs the GRR API client and opens an interactive shell to query GRR servers."
    },
    tags: ["grr", "dfir", "live-forensics", "remote"]
  },
  {
    id: "t708",
    name: "Osquery",
    url: "https://osquery.io",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة من Meta تحول نظام التشغيل إلى قاعدة بيانات علائقية تُستعلم بلغة SQL. تمنح مهندس الشبكات رؤية فورية للاتصالات الشبكية والمنافذ المفتوحة والعمليات عبر جداول مثل process_open_sockets. أساس شائع لبناء قدرات الكشف والاستجابة على مستوى الأسطول.",
      en: "A Meta tool that exposes the operating system as a relational database queried with SQL. It gives network engineers instant visibility into connections, listening ports and processes through tables like process_open_sockets. A common foundation for fleet-wide detection and response."
    },
    cmd: "osqueryi 'SELECT pid, name, remote_address, state FROM process_open_sockets LIMIT 20;'",
    cmdDesc: {
      ar: "يعرض الاتصالات الشبكية النشطة مع أسماء العمليات باستعلام SQL في الطرفية التفاعلية.",
      en: "Lists active network connections with owning processes using SQL in the interactive shell."
    },
    tags: ["osquery", "sql", "edr", "xdr"]
  },
  {
    id: "t709",
    name: "Velociraptor",
    url: "https://docs.velociraptor.app",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة جمع أدلة رقمية مفتوحة المصدر من Rapid7 تُشغّل استعلامات تحقيقية فورية على آلاف الأجهزة. تعتمد على لغة VQL المرنة لتصفح الملفات والسجلات والشبكة وتنصيب فحوص مخصصة. أداة قوية لتحليل الحوادث الشبكية على نطاق المؤسسة كاملة.",
      en: "An open-source digital forensics platform from Rapid7 that runs instant investigative hunts across thousands of endpoints. Its flexible VQL language sifts files, registry, memory and network state with custom hunts. A powerful tool for enterprise-wide network incident analysis."
    },
    cmd: "velociraptor query 'SELECT OsInfo FROM info()'",
    cmdDesc: {
      ar: "يشغل استعلام VQL محلي لعرض معلومات نظام الجهاز الحالي.",
      en: "Runs a local VQL query showing current system information."
    },
    tags: ["velociraptor", "vql", "dfir", "hunting"]
  },
  {
    id: "t710",
    name: "YARA",
    url: "https://virustotal.github.io/yara/",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة وصف أنماط البرمجيات الخبيثة ومطابقتها، أصبحت معيارًا لتبادل قواعد الكشف بين المحللين. تُمكّن من كتابة قواعد تصف الحزم الخبيثة بمرونة قائمة على النصوص والمقاطع الثنائية. يوظفها مهندس الشبكات في مسح الملفات المشبوهة المكتشفة في حركة التحميل.",
      en: "The pattern-matching Swiss knife for describing and detecting malware families, now the de facto standard for sharing detection rules. It lets analysts write rules that characterise malicious binaries using strings and binary sections. Network engineers use it to scan suspicious files found in downloads."
    },
    cmd: "yara -r rules/malware.yar /var/www/uploads",
    cmdDesc: {
      ar: "يطبق قواعد YARA بشكل تكراري على مجلد الملفات المرفوعة بحثًا عن تطابقات.",
      en: "Applies YARA rules recursively over an uploads folder looking for matches."
    },
    tags: ["yara", "malware", "detection", "rules"]
  },
  {
    id: "t711",
    name: "Volatility 3",
    url: "https://github.com/volatilityfoundation/volatility3",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "الإطار المرجعي للتحليل الجنائي لصور الذاكرة، ويدعم أنظمة ويندوز ولينكس وماك عبر إضافات متعددة. يكشف الاتصالات الشبكية المخفية والعمليات الجارية والبرمجيات الجذرية عبر أوامر مثل netscan. أداة متقدمة لتحليل ذاكرة الأجهزة بعد الحوادث الأمنية.",
      en: "The reference framework for memory image forensics, supporting Windows, Linux and macOS via plugin architecture. It uncovers hidden network connections, running processes and rootkits through plugins like netscan. An advanced tool for post-incident host memory analysis."
    },
    cmd: "python3 vol.py -f memory.dmp windows.netscan",
    cmdDesc: {
      ar: "يستخرج الاتصالات الشبكية من صورة ذاكرة ويندوز باستخدام إضافة netscan.",
      en: "Extracts network connections from a Windows memory image using the netscan plugin."
    },
    tags: ["volatility", "memory-forensics", "malware", "dfir"]
  },
  {
    id: "t712",
    name: "Timesketch",
    url: "https://timesketch.org",
    category: "incident",
    platform: ["linux", "web"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة تحليل جنائي تعاونية من جوجل لتجميع الخطوط الزمنية من مصادر متعددة في تحقيق واحد. تدمج قواعد Sigma وواجهة بحث مرنة لتسريع تحليل الأحداث بعد الحوادث. تُناسب تحليل سجلات الشبكة والأنظمة معًا في قضية واحدة.",
      en: "A Google-built collaborative forensic timeline analysis platform that merges multiple timeline sources into one investigation. It integrates Sigma rules and a flexible search UI to accelerate post-incident analysis. Great for analysing network and host logs together in one case."
    },
    cmd: "timesketch_importer auth.log --sketch_id 1",
    cmdDesc: {
      ar: "يستورد ملف سجل إلى مخطط Timesketch المحدد برقمه لبناء الخط الزمني.",
      en: "Imports a log file into a Timesketch sketch by its ID to build the timeline."
    },
    tags: ["timesketch", "timeline", "forensics", "sigma"]
  },
  {
    id: "t713",
    name: "Plaso",
    url: "https://plaso.readthedocs.io",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "محرك توليد الخطوط الزمنية المعروف سابقًا باسم log2timeline، يحول صور الأقراص والسجلات إلى خط زمني جنائي موحد. يقرأ عشرات الصيغ من أنظمة وملفات مختلفة ويدعم الفلاتر والتصنيف أثناء المعالجة. الأساس التقني خلف Timesketch لتحليل سلاسل الأحداث المعقدة.",
      en: "The timeline super-timing engine formerly known as log2timeline, turning disk images and logs into one unified forensic timeline. It parses dozens of formats across operating systems and supports filtering and labelling during processing. It is the technical core behind Timesketch."
    },
    cmd: "log2timeline.py --hashers md5 timeline.plaso disk.dd",
    cmdDesc: {
      ar: "يعالج صورة قرص خام ويولد ملف خط زمني Plaso مع بصمات MD5.",
      en: "Processes a raw disk image and produces a Plaso timeline file with MD5 hashes."
    },
    tags: ["plaso", "log2timeline", "forensics", "timeline"]
  },
  {
    id: "t714",
    name: "Autopsy",
    url: "https://www.autopsy.com",
    category: "incident",
    platform: ["windows", "linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "واجهة رسومية لتحليل الأدلة الجنائية الرقمية مبنية على The Sleuth Kit، وهي المعيار الأكاديمي في مختبرات التحقيق. تتيح فحص صور الأقراص واستخراج المحفوظات وتحليل سجل المتصفح واتصالات البريد. مفيدة لمحللي الشبكات عند فحص أجهزة المشتبه بهم بعد حادثة.",
      en: "A graphical digital forensics platform built on The Sleuth Kit and a de facto standard in university labs. It examines disk images, recovers deleted files, and parses browser history and email stores. Useful for network analysts examining suspect machines after an incident."
    },
    tags: ["autopsy", "disk-forensics", "sleuthkit", "gui"]
  },
  {
    id: "t715",
    name: "The Sleuth Kit",
    url: "https://github.com/sleuthkit/sleuthkit",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مجموعة أدوات سطر أوامر كلاسيكية للتحليل الجنائي لأنظمة الملفات، مثل mmls وfls وicat. تُكشف بنية الأقسام والملفات المحذوفة بدقة عالية دون واجهة رسومية. تُشكل العمود الفقري لأدوات مثل Autopsy وسير عمل التحليل المؤتمت.",
      en: "A classic command-line suite for file system forensics, including mmls, fls and icat. It reveals partition layouts and deleted files with precision, without any GUI. It forms the backbone of tools like Autopsy and automated investigation workflows."
    },
    cmd: "fls -r -o 2048 disk.dd > bodyfile && mactime -b bodyfile -z UTC > timeline.csv",
    cmdDesc: {
      ar: "يستخرج قائمة الملفات من صورة القرص ثم يحولها إلى خط زمني بصيغة CSV.",
      en: "Extracts the file listing from a disk image, then converts it into a CSV timeline."
    },
    tags: ["sleuthkit", "tsk", "forensics", "cli"]
  },
  {
    id: "t716",
    name: "SIFT Workstation",
    url: "https://www.sans.org/tools/sift-workstation/",
    category: "incident",
    platform: ["linux"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "توزيعة تحقيق جنائي مجانية من معهد SANS تجمع أكثر من عشرين أداة مفتوحة المصدر مهيأة مسبقًا. تتضمن أدوات تحليل الخطوط الزمنية والذاكرة والشبكة والملفات في بيئة Ubuntu واحدة. نقطة انطلاق سريعة لمختبر تحليل الحوادث دون عناء التثبيت اليدوي.",
      en: "A free SANS forensic distribution bundling twenty-plus open-source tools, pre-configured on Ubuntu. It covers timeline, memory, network and file analysis in a single environment. A fast starting point for an incident analysis lab without manual setup overhead."
    },
    tags: ["sift", "sans", "forensics", "distro"]
  },
  {
    id: "t717",
    name: "REMnux",
    url: "https://remnux.org",
    category: "incident",
    platform: ["linux"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "توزيعة لينكس متخصصة في التحليل العكسي للبرمجيات الخبيثة من قبل Lenny Zeltser. تأتي محملة بأدوات لتحليل ملفات الشبكة الخبيثة مثل PCAP وسلاسل DNS ومراقبة سلوك الحمولات. مثالية لعزل عينات البرمجيات الخبيثة وفهم اتصالاتها الشبكية.",
      en: "A Linux distribution curated by Lenny Zeltser specialising in malware reverse engineering. It ships with tools to analyse malicious network artefacts like PCAP, DNS strings and payload behaviour monitoring. Ideal for isolating malware samples and understanding their network calls."
    },
    cmd: "sudo remnux upgrade",
    cmdDesc: {
      ar: "يحدّث حزم وأدوات توزيعة REMnux إلى أحدث الإصدارات المتاحة.",
      en: "Updates REMnux packages and tools to the latest available versions."
    },
    tags: ["remnux", "malware", "reverse-engineering", "distro"]
  },
  {
    id: "t718",
    name: "Network Security Toolkit (NST)",
    url: "https://www.networksecuritytoolkit.org",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "توزيعة تحليل جنائي وأمن شبكات حية مبنية على فيدورا، تُشغل من قرص USB أو DVD دون تثبيت دائم. تجمع أدوات التقاط الحزم والتحليل والمراقبة خلف واجهة ويب واحدة سهلة الاستخدام. محطة عمل متنقلة كاملة لمهندس الشبكات أثناء التحقيق الميداني.",
      en: "A live Fedora-based network security analysis and forensics distribution that boots from USB or DVD without permanent installation. It bundles packet capture, analysis and monitoring tools behind one easy web interface. A complete mobile workstation for network engineers doing field investigations."
    },
    tags: ["nst", "live-distro", "forensics", "nsm"]
  },
  {
    id: "t719",
    name: "CrowdSec",
    url: "https://www.crowdsec.net",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام كشف ومنع تسلل حديث مفتوح المصدر ينشر كشافات خفيفة على الخوادم ويحلل السجلات سلوكيًا. يشارك مؤشرات الهجوم مع مجتمع عالمي ويتغذى بقوائم حجب جماعية ذكية. بديل عصري لأداة fail2ban بذكاء تعاوني مضاعف.",
      en: "A modern open-source intrusion detection and prevention system deploying lightweight agents that analyse logs behaviourally. It shares attack signals with a global community and feeds on collective blocklists. A contemporary fail2ban successor with crowd-powered intelligence."
    },
    cmd: "cscli decisions list",
    cmdDesc: {
      ar: "يعرض قرارات الحجب الحالية الصادرة من محرك CrowdSec.",
      en: "Lists the current blocking decisions issued by the CrowdSec engine."
    },
    tags: ["crowdsec", "ips", "behavior", "blocklist"]
  },
  {
    id: "t720",
    name: "OSSEC",
    url: "https://www.ossec.net",
    category: "incident",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام كشف تسلل على مستوى المضيف مفتوح المصدر يراقب سلامة الملفات وسجلات الأنظمة والسياسات. يرسل تنبيهات مركزية عند تعديلات غير متوقعة أو محاولات تسجيل مشبوهة. طبقة دفاع تكمل أدوات IDS الشبكية في منظومة الاستجابة للحوادث.",
      en: "An open-source host-based intrusion detection system that monitors file integrity, system logs and policy compliance. It raises centralised alerts on unexpected changes or suspicious login attempts. A defensive layer that complements network IDS tools in IR programmes."
    },
    cmd: "/var/ossec/bin/ossec-control status",
    cmdDesc: {
      ar: "يعرض حالة خدمات OSSEC العاملة على المضيف الحالي.",
      en: "Displays the status of running OSSEC services on the host."
    },
    tags: ["ossec", "hids", "file-integrity", "logs"]
  },
  {
    id: "t721",
    name: "AIDE",
    url: "https://aide.github.io",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة Advanced Intrusion Detection Environment تفحص سلامة الملفات وتقارن قاعدة بيانات مرجعية بالوضع الحالي. تكشف أي تعديل على ملفات النظام أو ملفات التهيئة الشبكية بعد اختراق محتمل. خفيفة وسهلة وتُشغل عبر جدولة cron بشكل دوري.",
      en: "The Advanced Intrusion Detection Environment verifies file integrity by comparing a reference database against current state. It flags any change to system or network configuration files after a suspected compromise. Lightweight, simple and easily scheduled via cron."
    },
    cmd: "aide --check",
    cmdDesc: {
      ar: "يقارن حالة الملفات الحالية بقاعدة البيانات المرجعية ويطبع الفروقات.",
      en: "Compares current file state against the reference database and prints differences."
    },
    tags: ["aide", "fim", "integrity", "hids"]
  },
  {
    id: "t722",
    name: "rkhunter",
    url: "https://sourceforge.net/projects/rkhunter/",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة Rootkit Hunter تبحث عن آثار برمجيات الجذر في أنظمة لينكس ويونكس عبر بصمات معروفة. تفحص الملفات التنفيذية الحساسة ووحدات النواة المحملة ومنافذ الشبكة المخفية. خط دفاع شائع ضمن فحوص دورية على الخوادم الشبكية.",
      en: "Rootkit Hunter scans Linux and Unix systems for rootkit traces using known fingerprints. It inspects sensitive binaries, loaded kernel modules and hidden network ports. A common layer in periodic checks on network servers."
    },
    cmd: "rkhunter --check --sk",
    cmdDesc: {
      ar: "يشغل فحصًا شاملًا لبرمجيات الجذر مع تخطي مطالبات المفاتيح التفاعلية.",
      en: "Runs a full rootkit scan, skipping the interactive key prompts."
    },
    tags: ["rkhunter", "rootkit", "linux", "security"]
  },
  {
    id: "t723",
    name: "chkrootkit",
    url: "http://www.chkrootkit.org",
    category: "incident",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة كلاسيكية بسيطة لاكتشاف برمجيات الجذر في لينكس عبر فحص العمليات والملفات والمنافذ الشبكية الغريبة. تعمل بدون تثبيت معقد وتُعطي نتيجة سريعة أثناء التحقيق الأولي. مكون خفيف في مجموعة أدوات الاستجابة للحوادث على الخوادم.",
      en: "A classic, simple tool for detecting Linux rootkits by scanning processes, files and odd network ports. It runs without complex installation and gives fast results during initial triage. A lightweight component of an IR toolkit on servers."
    },
    cmd: "chkrootkit | grep -i INFECTED",
    cmdDesc: {
      ar: "يشغل chkrootkit ويعرض أي نتائج مصابة فقط.",
      en: "Runs chkrootkit and shows only infected findings."
    },
    tags: ["chkrootkit", "rootkit", "forensics", "linux"]
  },
  {
    id: "t724",
    name: "KAPE",
    url: "https://github.com/Kroll-Artifacts/KAPE",
    category: "incident",
    platform: ["windows"],
    license: "freemium",
    difficulty: 4,
    desc: {
      ar: "أداة Kroll لجمع ومعالجة الأدلة الجنائية على ويندوز بسرعة هائلة عبر وحدات قابلة للتخصيص. تجمع الأجزاء الهامة فقط من القرص ثم تُشغل عليها معالجات مثل المجمعات والمصادر المرجعية. أداة سير عمل الاستجابة الحديثة لحوادث ويندوز الشبكية.",
      en: "Kroll's Artifact Parser and Extractor collects and processes Windows forensic evidence at extreme speed via modular targets and modules. It gathers only the important artefacts, then runs parsers and enrichment tools over them. A modern IR workflow tool for Windows incidents."
    },
    cmd: "kape.exe --target KapeTriage --dest C:\\Forensics\\out",
    cmdDesc: {
      ar: "يجمع مجموعة أدلة KapeTriage القياسية إلى مجلد الإخراج المحدد.",
      en: "Collects the standard KapeTriage evidence set into the specified output folder."
    },
    tags: ["kape", "kroll", "windows", "triage", "forensics"]
  },
  {
    id: "t725",
    name: "Hayabusa",
    url: "https://github.com/Yamato-Security/hayabusa",
    category: "incident",
    platform: ["windows", "linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة مكتوبة بلغة Rust لتحليل سجلات أحداث ويندوز وبناء خطوط زمنية بأسرع من الأدوات التقليدية بأضعاف. تدعم قواعد Sigma للكشف وتُنتج تقارير CSV وJSON جاهزة للتحليل. تُسرّع بشكل كبير فحص سجلات ملايين الأحداث أثناء تحقيق الحوادث.",
      en: "A Rust tool that analyses Windows event logs and builds timelines many times faster than traditional tools. It supports Sigma rules for detection and outputs ready CSV/JSON reports. It massively speeds up sifting millions of events during incident investigations."
    },
    cmd: "hayabusa csv-timeline -d C:\\Windows\\System32\\winevt\\Logs",
    cmdDesc: {
      ar: "يبني خطًا زمنيًا بصيغة CSV من مجلد سجلات أحداث ويندوز.",
      en: "Builds a CSV timeline from a Windows event log directory."
    },
    tags: ["hayabusa", "sigma", "event-logs", "timeline"]
  },

  // ═══ OSINT & Reconnaissance (t726–t750) ═══
  {
    id: "t726",
    name: "SecurityTrails",
    url: "https://securitytrails.com",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "قاعدة بيانات تاريخية شاملة للنطاقات وسجلات DNS وسجلات WHOIS مع واجهة برمجية قوية. تُظهر خريطة البنية التحتية الفرعية لموقع ما عبر الزمن للعثور على النطاقات المنسية القابلة للاختراق. أداة أساسية في الاستطلاع الدفاعي لتحصين سطح الهجوم.",
      en: "A comprehensive historical database of domains, DNS records and WHOIS with a powerful API. It maps a domain's subdomain infrastructure over time, exposing forgotten takeover-prone assets. A key tool in defensive reconnaissance to shrink the attack surface."
    },
    cmd: "curl -s -H 'apikey: <KEY>' https://api.securitytrails.com/v1/domain/example.com/subdomains",
    cmdDesc: {
      ar: "يستعلم واجهة SecurityTrails لجلب النطاقات الفرعية لنطاق معين.",
      en: "Queries the SecurityTrails API for the subdomains of a given domain."
    },
    tags: ["securitytrails", "dns", "subdomains", "osint"]
  },
  {
    id: "t727",
    name: "ZoomEye",
    url: "https://www.zoomeye.org",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "محرك بحث صيني شهير عن الأجهزة والخدمات المتصلة بالإنترنت، نظير Shodan في المنطقة الآسيوية. يفهرس الباناتر والأجهزة الصناعية والكاميرات وخدمات الشبكات مع بصمات تقنية دقيقة. يستخدمه الباحثون لقياس انتشار الثغرات الشبكية عالميًا.",
      en: "A well-known Chinese search engine for internet-connected devices and services, the Asian counterpart to Shodan. It indexes banners, industrial devices, cameras and network services with precise fingerprints. Researchers use it to measure global exposure of network vulnerabilities."
    },
    cmd: "curl -s -H 'API-KEY: <KEY>' 'https://api.zoomeye.org/host/search?query=apache'",
    cmdDesc: {
      ar: "يبحث في ZoomEye عن الأجهزة المطابقة لاستعلام معين عبر واجهته البرمجية.",
      en: "Searches ZoomEye for devices matching a query via its API."
    },
    tags: ["zoomeye", "search-engine", "censys", "recon"]
  },
  {
    id: "t728",
    name: "FOFA",
    url: "https://fofa.info",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "محرك بحث فضاء الشبكة الصيني الأشهر، يتيح استعلامات معقدة عن الأصول المتصلة بصيغة قواعد نصية. يدعم البحث بالشهادات والمنافذ والمنتجات لرسم خريطة كاملة للبنية التحتية المستهدفة. أداة قوية للبحث عن الثغرات والأجهزة المكشوفة على نطاق واسع.",
      en: "China's most popular cyberspace search engine, supporting complex queries over internet assets with expressive rule syntax. It searches by certificates, ports and products to map an entire target infrastructure. A powerful engine for wide-scale exposure and vulnerability hunting."
    },
    cmd: "curl -s 'https://fofa.info/api/v1/search/all?email=<EMAIL>&key=<KEY>&qbase64=aXA9MS4yLjMuNA=='",
    cmdDesc: {
      ar: "يستعلم FOFA باستعلام مرمز بـ Base64 عن عناوين IP محددة.",
      en: "Queries FOFA with a Base64-encoded query for specific IP addresses."
    },
    tags: ["fofa", "search-engine", "assets", "recon"]
  },
  {
    id: "t729",
    name: "Hunter.io",
    url: "https://hunter.io",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "خدمة متخصصة في العثور على عناوين البريد الإلكتروني المهنية المرتبطة بنطاق ما. تفحص مصادر عامة وتتحقق من صحة العناوين قبل عرضها مع درجة ثقة. أداة شائعة في اختبارات الاختراق المعتمدة والبحث عن جهات الاتصال التقنية.",
      en: "A service that finds professional email addresses associated with a domain. It scours public sources and verifies deliverability before listing addresses with a confidence score. Widely used in authorised penetration tests and technical contact research."
    },
    cmd: "curl -s 'https://api.hunter.io/v2/domain-search?domain=example.com&api_key=<KEY>'",
    cmdDesc: {
      ar: "يبحث عن عناوين البريد الإلكتروني المرتبطة بنطاق عبر واجهة Hunter.",
      en: "Finds email addresses linked to a domain via the Hunter API."
    },
    tags: ["hunter", "email", "osint", "recon"]
  },
  {
    id: "t730",
    name: "Intelligence X",
    url: "https://intelx.io",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "محرك بحث استخباراتي يفهرس التسريبات وقواعد البيانات المسربة والوثائق العامة والبيانات من الشبكة المظلمة. يوفر بحثًا متقدمًا عن عناوين البريد والنطاقات وبصمات المفاتيح العامة. مصدر قيم لمحللي الاستجابة عند تتبع تسريب بيانات مؤسستهم.",
      en: "An intelligence search engine indexing leaks, breached databases, public documents and darknet data. It offers advanced search over emails, domains and public key fingerprints. Valuable for responders tracing their organisation's leaked data."
    },
    tags: ["intelx", "leaks", "breaches", "darknet", "osint"]
  },
  {
    id: "t731",
    name: "crt.sh",
    url: "https://crt.sh",
    category: "osint",
    platform: ["web"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "محرك بحث في سجلات الشفافية للشهادات الرقمية Certificate Transparency، من خلال قاعدة بيانات CT-Log الخاصة بالشهادات الصادرة. يكشف النطاقات الفرعية المخفية التي صدرت لها شهادات حتى لو لم تُنشر في DNS. تقنية مجربة لاستطلاع البنية التحتية الخفية.",
      en: "A certificate transparency search engine that queries CT logs for issued TLS certificates. It uncovers hidden subdomains that were issued certificates even when not published in DNS. A proven technique for mapping invisible infrastructure."
    },
    cmd: "curl -s 'https://crt.sh/?q=%25.example.com&output=json' | jq -r '.[].name_value' | sort -u",
    cmdDesc: {
      ar: "يستخرج جميع الأسماء الفريدة من شهادات النطاق الفرعي عبر سجلات الشفافية.",
      en: "Extracts all unique names from certificates of a domain via transparency logs."
    },
    tags: ["crt.sh", "certificates", "ct-logs", "subdomains"]
  },
  {
    id: "t732",
    name: "DNSDumpster",
    url: "https://dnsdumpster.com",
    category: "osint",
    platform: ["web"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة ويب مجانية لاستطلاع DNS ترسم خريطة البنية التحتية لنطاق ما في تقرير واحد. تُظهر خوادم MX وTXT والنطاقات الفرعية ومزودي الاستضافة مع تصور جغرافي. نقطة بداية سريعة لفهم انتشار الأصول قبل اختبار الاختراق.",
      en: "A free web tool for DNS reconnaissance that maps a domain's infrastructure in a single report. It shows MX, TXT, subdomains and hosting providers with a visual map. A quick starting point for understanding asset spread before a pentest."
    },
    tags: ["dnsdumpster", "dns", "recon", "mapping"]
  },
  {
    id: "t733",
    name: "ViewDNS.info",
    url: "https://viewdns.info",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "مجموعة أدوات DNS استخباراتية تشمل البحث العكسي عن IP وسجل WHOIS التاريخي وعكس DNS. تُستخدم لفهم تغيرات ملكية النطاق واكتشاف الاستضافة المشتركة للخوادم. واجهتها البرمجية تتيح أتمتة هذه الفحوص في سير العمل.",
      en: "A bundle of DNS intelligence utilities including reverse IP, historical WHOIS and reverse DNS lookups. Useful for tracking domain ownership changes and finding shared hosting neighbours. Its API allows automating these checks in a workflow."
    },
    cmd: "curl -s 'https://api.viewdns.info/reversedns/?host=example.com&apikey=<KEY>&output=json'",
    cmdDesc: {
      ar: "يستعلم واجهة ViewDNS لعرض نطاقات البحث العكسي لمضيف معين.",
      en: "Queries the ViewDNS API for the reverse DNS entries of a host."
    },
    tags: ["viewdns", "reverse-dns", "whois", "osint"]
  },
  {
    id: "t734",
    name: "Netcraft",
    url: "https://www.netcraft.com",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "شركة رائدة في خدمات الإنترنت والاستطلاع منذ التسعينات، توفر تقارير مفصلة عن البنية التحتية للمواقع. تُظهر مزودي الاستضافة وسلاسل الشهادات وتقنيات الخوادم وتقارير مخاطر التصيد. مصدر موثوق لتقييم سلامة الأصول الشبكية للمنافسين أو المهاجمين.",
      en: "An internet services and reconnaissance pioneer since the 1990s, providing detailed reports on website infrastructure. It reveals hosting providers, certificate chains, server technologies and anti-phishing risk reports. A trusted source for assessing network assets' posture."
    },
    tags: ["netcraft", "recon", "phishing", "web-intel"]
  },
  {
    id: "t735",
    name: "BinaryEdge",
    url: "https://binaryedge.io",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة استخبارات فضاء الشبكمة تجمع بيانات الأجهزة المتصلة عبر عمليات مسح مستمرة. تُصدر تنبيهات عند تعرض أصول مؤسستك أو ظهور خدمات خطيرة مثل قواعد بيانات مكشوفة. توفر واجهة برمجية وإشعارات مراقبة لمساحة العناوين الخاصة بك.",
      en: "A cyberspace intelligence platform that continuously scans and fingerprints internet-connected devices. It alerts when your organisation's assets are exposed or dangerous services appear, like open databases. Offers an API and monitoring notifications for your address space."
    },
    cmd: "curl -s -H 'X-API-Key: <KEY>' 'https://api.binaryedge.io/v2/query/ip/1.2.3.4'",
    cmdDesc: {
      ar: "يستعلم BinaryEdge عن تفاصيل فحص IP محدد عبر واجهته البرمجية.",
      en: "Queries BinaryEdge for scan details of a given IP via its API."
    },
    tags: ["binaryedge", "attack-surface", "monitoring", "osint"]
  },
  {
    id: "t736",
    name: "GreyNoise",
    url: "https://www.greynoise.io",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة تصنف حركة المسح الضجيجية على الإنترنت لتمييزها عن الهجمات الموجهة. تسأل هل عنوان IP معين يفحص الجميع أم يستهدفك أنت تحديدًا، وهو سؤال محوري في الفرز الأمني. تُقلل الإنذارات الزائفة في فرق الاستجابة بشكل ملموس.",
      en: "A platform that classifies internet-wide scanning noise to separate it from targeted attacks. It answers whether an IP scans everyone or specifically targets you, a pivotal triage question. It meaningfully cuts false positives for response teams."
    },
    cmd: "curl -s -H 'key: <KEY>' 'https://api.greynoise.io/v3/community/8.8.8.8'",
    cmdDesc: {
      ar: "يستعلم واجهة المجتمع في GreyNoise عن تصنيف عنوان IP معين.",
      en: "Queries GreyNoise's community API for the classification of an IP."
    },
    tags: ["greynoise", "scanners", "triage", "classification"]
  },
  {
    id: "t737",
    name: "Recorded Future",
    url: "https://www.recordedfuture.com",
    category: "osint",
    platform: ["web"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "أكبر منصة استخبارات تهديد تجارية، تحلل ملايين المصادر المفتوحة والمظلمة بذكاء اصطناعي. تُنتج تنبيهات استباقية عن التهديدات التي تستهدف قطاعك أو بنيتك التحتية. معيار الصناعة لفرق الاستخبارات المؤسسية واسعة النطاق.",
      en: "The largest commercial threat intelligence platform, analysing millions of open and dark sources with AI. It produces proactive alerts about threats targeting your sector or infrastructure. An industry standard for enterprise-scale intelligence teams."
    },
    tags: ["recorded-future", "threat-intel", "ai", "commercial"]
  },
  {
    id: "t738",
    name: "VirusTotal",
    url: "https://www.virustotal.com",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "خدمة جوجل الشهيرة لتحليل الملفات وعناوين URL والنطاقات بأكثر من سبعين محرك مكافحة. تقدم سلوك الملفات وعلاقاتها الشبكية وتقارير المجتمع في صفحة واحدة. أول محطة لأي محلل عند فرز ملف مشبوه أو رابط تصيد.",
      en: "A Google-owned service analysing files, URLs and domains with seventy-plus antivirus engines. It provides file behaviour, network relations and community reports on one page. The first stop for any analyst triaging a suspicious file or phishing link."
    },
    cmd: "curl -s -H 'x-apikey: <KEY>' 'https://www.virustotal.com/api/v3/domains/example.com'",
    cmdDesc: {
      ar: "يستعلم واجهة VirusTotal v3 عن تقييم النطاقات عبر مفتاحك البرمجي.",
      en: "Queries the VirusTotal v3 API for a domain's assessment using your key."
    },
    tags: ["virustotal", "malware", "reputation", "sandbox"]
  },
  {
    id: "t739",
    name: "URLhaus",
    url: "https://urlhaus.abuse.ch",
    category: "osint",
    platform: ["web"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "مشروع من abuse.ch يجمع عناوين URL المستخدمة في توزيع البرمجيات الخبيثة بصورة حية. يمكن تنزيل قوائم يومية أو استعلمتها برمجيًا لحجبها على بوابات الشبكة. مصدر مجاني ممتاز لتغذية قوائم الحجب المؤسسية.",
      en: "An abuse.ch project that live-collects URLs used for malware distribution. It offers daily downloadable lists and an API to block them at network gateways. An excellent free source for corporate blocklist feeds."
    },
    cmd: "curl -s https://urlhaus-api.abuse.ch/v1/recent/ -d 'query=recent&limit=10'",
    cmdDesc: {
      ar: "يجلب آخر عشرة عناوين URL خبيثة مسجلة في قاعدة URLhaus.",
      en: "Fetches the last ten malicious URLs recorded in the URLhaus database."
    },
    tags: ["urlhaus", "abuse.ch", "malware-urls", "blocklist"]
  },
  {
    id: "t740",
    name: "AbuseIPDB",
    url: "https://www.abuseipdb.com",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "قاعدة بيانات تعاونية لتصنيف عناوين IP المسيئة استخدمت في هجمات أو مسح ضار. يرفع المتطوعون التقارير وتُظهر درجة الثقة ونوع الإساءة لكل عنوان. مرجع سريع قبل اتخاذ قرار الحجب أو التجاهل أثناء التحقيق.",
      en: "A crowdsourced database reporting abusive IPs involved in attacks or harmful scanning. Volunteers file reports, and each IP shows a confidence score and abuse category. A quick reference before blocking or ignoring during investigation."
    },
    cmd: "curl -s -G 'https://api.abuseipdb.com/api/v2/check' --data-urlencode 'ipAddress=1.2.3.4' -H 'Key: <KEY>' -H 'Accept: application/json'",
    cmdDesc: {
      ar: "يتحقق من سمعة عنوان IP في AbuseIPDB عبر واجهة v2 البرمجية.",
      en: "Checks an IP's reputation in AbuseIPDB via the v2 API."
    },
    tags: ["abuseipdb", "reputation", "blacklist", "osint"]
  },
  {
    id: "t741",
    name: "PhishTank",
    url: "https://phishtank.org",
    category: "osint",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "مجتمع عالمي لتعقب ومشاركة عناوين URL المزيفة المستخدمة في هجمات التصيد. يتحقق من التقارير المرسلة ويصنفها ويوفر بيانات قابلة للتنزيل للمطورين. أداة مجانية قديمة وموثوقة في تدريب المستخدمين على اكتشاف الروابط الخبيثة.",
      en: "A global community for tracking and sharing phishing URLs. It verifies submitted reports, classifies them, and offers downloadable data for developers. A long-standing free resource for training users to spot malicious links."
    },
    tags: ["phishtank", "phishing", "community", "urls"]
  },
  {
    id: "t742",
    name: "AlienVault OTX",
    url: "https://otx.alienvault.com",
    category: "osint",
    platform: ["web"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "منصة تبادل التهديدات المفتوحة من AT&T Cybersecurity بملايين المؤشرات المتجددة يوميًا. تسمح بمتابعة قنوات مؤشرات الاهتمام وسحبها آليًا إلى أدوات الكشف لديك. جسر عملي بين أبحاث الثغرات وقواعد حماية الشبكة.",
      en: "AT&T Cybersecurity's Open Threat Exchange with millions of daily-contributed indicators. It lets you subscribe to pulses of interest and pull them automatically into your detection stack. A practical bridge between threat research and network defence rules."
    },
    cmd: "curl -s -H 'X-OTX-API-KEY: <KEY>' 'https://otx.alienvault.com/api/v1/indicators/domain/example.com/general'",
    cmdDesc: {
      ar: "يجلب التقرير العام لمؤشر نطاق من OTX عبر مفتاحك البرمجي.",
      en: "Fetches the general OTX report for a domain indicator using your key."
    },
    tags: ["otx", "alienvault", "threat-intel", "pulses"]
  },
  {
    id: "t743",
    name: "Have I Been Pwned",
    url: "https://haveibeenpwned.com",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "خدمة Troy Hunt الشهيرة التي تخبرك إن كان بريدك الإلكتروني ظهر في تسريب بيانات معروف. تحتفظ بمئات التسريبات المؤرشفة مع تفاصيل نوع البيانات المكشوفة في كل منها. أداة توعية ممتازة لفرق الشبك لتدريب الموظفين على تغيير كلمات المرور المسرّبة.",
      en: "Troy Hunt's famous service telling you whether your email appeared in known data breaches. It archives hundreds of breaches with details of what data each exposed. An excellent awareness tool for network teams teaching staff to rotate leaked passwords."
    },
    cmd: "curl -s -H 'hibp-api-key: <KEY>' 'https://haveibeenpwned.com/api/v3/breachedaccount/user@example.com'",
    cmdDesc: {
      ar: "يستعلم واجهة v3 للتأكد من تورط بريد إلكتروني في تسريبات معروفة.",
      en: "Uses the v3 API to check whether an email appears in known breaches."
    },
    tags: ["hibp", "breaches", "passwords", "awareness"]
  },
  {
    id: "t744",
    name: "OSINT Framework",
    url: "https://osintframework.com",
    category: "osint",
    platform: ["web"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "دليل تفاعلي مجمع يربط مئات أدوات ومصادر الاستطلاع مفتوحة المصدر مصنفة حسب نوع البيانات. من أسماء المستخدمين إلى الأقمار الصناعية والسجلات العامة في مكان واحد. خريطة طريق تعليمية لأي مبتدئ يتعلم فن الاستخبارات مفتوحة المصدر.",
      en: "An interactive curated directory linking hundreds of OSINT tools and sources, organised by data type. From usernames to satellites and public records, all in one place. An educational roadmap for anyone learning open-source intelligence."
    },
    tags: ["osint-framework", "directory", "resources", "learning"]
  },
  {
    id: "t745",
    name: "PeeringDB",
    url: "https://www.peeringdb.com",
    category: "osint",
    platform: ["web"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "قاعدة البيانات الرسمية المجتمعية لشبكات الإنترنت المتبادلة، تشمل نقاط تبادل المرور ومزودي المرور والشبكات. تُستخدم لتخطيط الربط المباشر وفهم سياسات التوجيه بين الشبكات. مرجع عملي لمهندسي الشبكات في موفري الخدمة ومراكز البيانات.",
      en: "The community-maintained database of internet peering: exchange points, transit providers and networks. It is used to plan interconnection and understand routing policies between networks. A practical reference for service provider and datacentre engineers."
    },
    cmd: "curl -s 'https://peeringdb.com/api/net?asn=13335' | jq '.data[0].name'",
    cmdDesc: {
      ar: "يستعلم واجهة PeeringDB عن اسم الشبكة المرتبطة برقم نظام مستقل.",
      en: "Queries the PeeringDB API for the network name behind an ASN."
    },
    tags: ["peeringdb", "ixp", "asn", "bgp"]
  },
  {
    id: "t746",
    name: "Hurricane Electric BGP Toolkit",
    url: "https://bgp.he.net",
    category: "osint",
    platform: ["web"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "مرجع شامل من Hurricane Electric لمعلومات توجيه BGP وأنظمة AS والبادئات المعلنة. يعرض الرسم البياني لجيران كل شبكة وتاريخها وسياستها مع محركات بحث دقيقة. أداة لا غنى عنها عند تحليل حوادث التوجيه أو اختطاف البادئات.",
      en: "A comprehensive Hurricane Electric reference for BGP routing, AS numbers and announced prefixes. It shows each network's peering graph, history and policy with precise search. Indispensable when analysing routing incidents or prefix hijacks."
    },
    tags: ["bgp", "he.net", "routing", "asn"]
  },
  {
    id: "t747",
    name: "BGPview",
    url: "https://bgpview.io",
    category: "osint",
    platform: ["web"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "خدمة بحث عن معلومات توجيه الإنترنت مع واجهة برمجية مجانية تعيد JSON منظمًا. تربط عناوين IP بالبادئات والأنظمة المستقلة وتعرض المؤسسات الراعية والأقران. مثالية لأتمتة التحليل الاستخباراتي لبيانات BGP في أداتك الخاصة.",
      en: "An internet routing lookup service with a free JSON API. It links IPs to prefixes and autonomous systems, listing their sponsors and peers. Ideal for automating BGP intelligence inside your own tooling."
    },
    cmd: "curl -s 'https://api.bgpview.io/ip/8.8.8.8' | jq '.data.prefix, .data.asn'",
    cmdDesc: {
      ar: "يستعلم BGPview عن البادئة والنظام المستقل لعنوان IP محدد.",
      en: "Queries BGPview for the prefix and ASN behind a given IP."
    },
    tags: ["bgpview", "bgp", "api", "routing"]
  },
  {
    id: "t748",
    name: "Wappalyzer",
    url: "https://www.wappalyzer.com",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "أداة بصمات تقنيات المواقع تكشف لغات البرمجة والأطر وخوادم الويب وخدمات التحليل في أي موقع. متوفرة كإضافة متصفح وواجهة برمجية لتحليل الأصول على نطاق واسع. تفيد في رصد تقنيات قديمة عرضة للثغرات في حدود مؤسستك.",
      en: "A technology fingerprinting tool revealing programming languages, frameworks, web servers and analytics on any site. Available as a browser extension and an API for bulk asset analysis. Useful for spotting outdated vulnerable tech within your organisation's perimeter."
    },
    tags: ["wappalyzer", "fingerprinting", "technologies", "recon"]
  },
  {
    id: "t749",
    name: "BuiltWith",
    url: "https://builtwith.com",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "منصة رائدة في كشف تقنيات البناء والتكاملات التجارية لأي موقع على الإنترنت. توفر تقارير عميقة تُظهر خوادم التتبع والإعلانات وشهادات SSL والتغييرات الزمنية. تُستخدم في تحليل المنافسين والاستطلاع الأمني للبنية التقنية.",
      en: "A leading platform uncovering build technologies and commercial integrations of any website. It provides deep reports showing tracking, advertising, SSL certificates and changes over time. Used for competitor analysis and technical security reconnaissance."
    },
    cmd: "curl -s 'https://api.builtwith.com/v21/api.json?KEY=<KEY>&LOOKUP=example.com'",
    cmdDesc: {
      ar: "يستعلم واجهة BuiltWith عن التقنيات المستخدمة في نطاق معين.",
      en: "Queries the BuiltWith API for the technologies used on a domain."
    },
    tags: ["builtwith", "profiling", "technologies", "osint"]
  },
  {
    id: "t750",
    name: "urlscan.io",
    url: "https://urlscan.io",
    category: "osint",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "خدمة تحليل وتفحيس المواقع في بيئة معزولة تلقائية مع التقاط صور ومراقبة الموارد. تسجل كل طلب DNS وHTTP والشهادة ونقاط الاتصال الخارجية في تقرير مرئي. أداة محبوبة لتحليل روابط التصيد ودراسة البنية الخفية للصفحات.",
      en: "A service that scans and sandboxes websites automatically, capturing screenshots and monitored resources. It logs every DNS and HTTP request, certificate and outbound connection in a visual report. Beloved for phishing link analysis and studying hidden page infrastructure."
    },
    cmd: "curl -s 'https://urlscan.io/api/v1/search/?q=domain:example.com' | jq '.results[0].page'",
    cmdDesc: {
      ar: "يبحث في أرشيف urlscan عن الفحوص السابقة لنطاق معين.",
      en: "Searches the urlscan archive for previous scans of a domain."
    },
    tags: ["urlscan", "sandbox", "phishing", "scanning"]
  },

  // ═══ Mobile Network Apps (t751–t775) ═══
  {
    id: "t751",
    name: "Network Analyzer",
    url: "https://techet.net",
    category: "mobile",
    platform: ["ios", "android"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "تطبيق شامل لتحليل الشبكات على iOS وأندرويد يجمع أدوات المسح والتشخيص في واجهة واحدة. يتضمن ماسح منافذ وعارض DNS وping وtraceroute ومراقب واي فاي بمخططات إشارة. حقيبة أدوات عملية لمهندس الشبكات الميداني في الجيب.",
      en: "An all-in-one iOS and Android network analysis app combining scanning and diagnostics in one interface. It includes a port scanner, DNS lookup, ping, traceroute and a Wi-Fi monitor with signal graphs. A practical pocket toolkit for field network engineers."
    },
    tags: ["network-analyzer", "ios", "scanner", "wifi"]
  },
  {
    id: "t752",
    name: "PingTools",
    url: "https://play.google.com/store/apps/details?id=ua.com.streamsoft.pingtools",
    category: "mobile",
    platform: ["android"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "مجموعة أدوات شبكية لأندرويد تشمل ping وtraceroute وماسح LAN ومراقب المنافذ والـ whois. تُظهر الأجهزة المجاورة في شبكتك مع أسمائها ومصنّعيها ومالكي عناوين IP. واجهة سريعة ومصممة تجعل التشخيص الميداني بسيطًا دون حاسوب.",
      en: "An Android networking suite featuring ping, traceroute, LAN scanner, port monitor and whois. It lists neighbouring devices with names, vendors and IP ownership. A fast, well-designed UI that makes field diagnosis possible without a laptop."
    },
    tags: ["pingtools", "android", "lan", "diagnostics"]
  },
  {
    id: "t753",
    name: "HE.NET Network Tools",
    url: "https://play.google.com/store/apps/details?id=net.he.networktools",
    category: "mobile",
    platform: ["android"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "تطبيق أدوات شبكية مجاني من Hurricane Electric يضم أكثر من عشر أداة تشخيصية. يدعم dig وwhois وtraceroute وping وIPv6 وBGP lookup مع سجل بحث مرن. خيار خفيف وموثوق للمهندسين العاملين في بيئات متعددة البروتوكولات.",
      en: "A free network tools app from Hurricane Electric with over ten diagnostic utilities. It supports dig, whois, traceroute, ping, IPv6 and BGP lookups with flexible history. A light, trusted choice for engineers working in multi-protocol environments."
    },
    tags: ["he.net", "android", "dig", "whois"]
  },
  {
    id: "t754",
    name: "Termux",
    url: "https://github.com/termux/termux-app",
    category: "mobile",
    platform: ["android"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "طرفية لينكس كاملة على أندرويد مع مدير حزم خاص يتيح تثبيت أدوات مثل nmap وtcpdump وcurl. يفتح الباب أمام إدارة الخوادم والشبكات من الهاتف عبر SSH وpython وbash. بيئة مفتوحة المصدر يحبها مهندسو الشبكات في العمل الميداني.",
      en: "A complete Linux terminal on Android with its own package manager, letting you install nmap, tcpdump and curl. It unlocks server and network administration from your phone via SSH, Python and Bash. An open-source environment beloved by network engineers on the move."
    },
    cmd: "pkg install nmap && nmap -sn 192.168.1.0/24",
    cmdDesc: {
      ar: "يثبت nmap داخل Termux ثم يمسح الشبكة المحلية لعرض الأجهزة الحية.",
      en: "Installs nmap inside Termux then sweeps the local network for live hosts."
    },
    tags: ["termux", "android", "terminal", "linux"]
  },
  {
    id: "t755",
    name: "ConnectBot",
    url: "https://github.com/connectbot/connectbot",
    category: "mobile",
    platform: ["android"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عميل SSH مفتوح المصدر وعريق لأندرويد، من أوائل العملاء الموثوقين على المنصة. يدعم جلسات متعددة متزامنة مع تمرير المفاتيح العامة وإدارة مفاتيح SSH داخلية. خيار مجاني خفيف لإدارة أجهزة الشبكة عن بُعد من هاتفك.",
      en: "A long-standing open-source SSH client for Android and one of the first trusted options on the platform. It supports multiple concurrent sessions, public key exchange and built-in SSH key management. A lean free option for remotely managing network gear from your phone."
    },
    tags: ["connectbot", "ssh", "android", "client"]
  },
  {
    id: "t756",
    name: "Blink Shell",
    url: "https://blink.sh",
    category: "mobile",
    platform: ["ios"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "طرفية احترافية لنظام iOS تدعم SSH وmosh مع واجهة عصرية قابلة للتخصيص بالكامل. تحافظ جلسات mosh على الاتصال عبر تغيير الشبكات وانتقالات الأجهزة المحمولة بسلاسة. أداة مفضلة لمدراء الأنظمة الذين يعملون من iPad أو iPhone بشكل دائم.",
      en: "A professional iOS terminal supporting SSH and mosh with a fully customisable modern UI. Mosh sessions survive network changes and mobile handovers gracefully. The tool of choice for sysadmins who work permanently from an iPad or iPhone."
    },
    tags: ["blink", "ssh", "mosh", "ios"]
  },
  {
    id: "t757",
    name: "Prompt 3",
    url: "https://panic.com/prompt/",
    category: "mobile",
    platform: ["ios"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "عميل SSH من شركة Panic بتصميم أنيق ولوحة مفاتيح ذكية إضافية فوق لوحة iOS. يوفر مقتطفات أوامر وجلسات متزامنة وتكاملًا سلسًا مع أدوات Panic الأخرى. تطبيق مدفوع مصقول يحبه من يقضي ساعات في إدارة الخوادم من الجهاز المحمول.",
      en: "A beautifully crafted SSH client from Panic, with smart extra keys above the iOS keyboard. It offers command snippets, split sessions and tight integration with Panic's other tools. A polished paid app for those spending hours managing servers from mobile."
    },
    tags: ["prompt", "panic", "ssh", "ios"]
  },
  {
    id: "t758",
    name: "Secure ShellFish",
    url: "https://secureshellfish.app",
    category: "mobile",
    platform: ["ios"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "عميل SSH وSFTP لنظام iOS يتكامل مع تطبيق الملفات لاستعراض ملفات الخوادم مثل ملفاتك المحلية. يدعم تحرير النصوص مباشرة على الخادم وحفظ الجلسات والوصول عبر Face ID. حل عملي لإدارة ملفات الإعدادات الشبكية من الجهاز المحمول.",
      en: "An iOS SSH and SFTP client integrating with the Files app to browse server files like local ones. It supports editing text directly on the server, saved sessions and Face ID access. A practical way to manage network config files from a mobile device."
    },
    tags: ["secureshellfish", "ssh", "sftp", "ios"]
  },
  {
    id: "t759",
    name: "a-Shell",
    url: "https://github.com/holzschu/a-Shell",
    category: "mobile",
    platform: ["ios"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "طرفية مفتوحة المصدر لنظام iOS تُشغّل مجموعة أدوات يونكس بدون كسر الحماية. تتضمن ping وcurl وtelnet وpython وlua مع دعم الأوامر المتتالية عبر pipes. إعجاز تقني يمنح المهندس بيئة تشغيل حقيقية داخل آبل.",
      en: "An open-source iOS terminal running a Unix-style toolkit without jailbreak. It includes ping, curl, telnet, Python and Lua with pipes between commands. A technical marvel giving engineers a real execution environment on Apple devices."
    },
    tags: ["a-shell", "terminal", "ios", "unix"]
  },
  {
    id: "t760",
    name: "PCAPdroid",
    url: "https://github.com/emanuele-f/PCAPdroid",
    category: "mobile",
    platform: ["android"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تطبيق أندرويد لالتقاط حركة الشبكة على شكل PCAP دون الحاجة لصلاحيات الجذر. يستخدم واجهة VPN محلية لاعتراض الحزم مع عرض إحصاءات لكل تطبيق ومضيف وجهة. أداة تحليل جنائي ممتازة لرصد سلوك التطبيقات المشبوهة على الهاتف.",
      en: "An Android app capturing device traffic as PCAP without root privileges. It uses a local VPN interface to intercept packets, showing per-app and per-host statistics. An excellent mobile forensics tool for analysing suspicious app behaviour."
    },
    tags: ["pcapdroid", "pcap", "capture", "android"]
  },
  {
    id: "t761",
    name: "AndFTP",
    url: "https://play.google.com/store/apps/details?id=lysesoft.andftp",
    category: "mobile",
    platform: ["android"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "عميل نقل ملفات لأندرويد يدعم FTP وSFTP وFTPS وSCP في تطبيق واحد. يتيح تحرير الملفات عن بُعد ومزامنة المجلدات وحفظ اعتمادات الاتصال بأمان. أداة عملية لنقل ملفات الإعدادات والصور من وإلى أجهزة الشبكة.",
      en: "An Android file transfer client supporting FTP, SFTP, FTPS and SCP in one app. It allows remote file editing, folder synchronisation and securely stored credentials. A practical tool for moving config files and images to and from network devices."
    },
    tags: ["andftp", "ftp", "sftp", "transfer"]
  },
  {
    id: "t762",
    name: "AirPort Utility",
    url: "https://apps.apple.com/us/app/airport-utility/id427276530",
    category: "mobile",
    platform: ["ios"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "تطبيق آبل الرسمي لإدارة محطات AirPort الأساسية مع ميزة مخفية لقياس قوة إشارة واي فاي. بعد تفعيل وضع ماسح Wi-Fi من إعدادات التطبيق يعرض قناة كل شبكة وقوة إشارتها بمخطط زمني حي. حيلة معروفة لمهندسي الشبكات اللاسلكية لتحليل البيئة الراديوية من iPhone.",
      en: "Apple's official AirPort management app, hiding a Wi-Fi signal survey feature. With simplified Wi-Fi mode disabled, it shows each network's channel and signal strength on a live graph. A known trick for wireless engineers to survey the RF environment from an iPhone."
    },
    tags: ["airport", "apple", "wifi", "survey"]
  },
  {
    id: "t763",
    name: "WiFiman",
    url: "https://wifiman.com",
    category: "mobile",
    platform: ["android", "ios"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "تطبيق مجاني من Ubiquiti لتحليل شبكات Wi-Fi وقياس سرعات الإنترنت ومسح الأجهزة المجاورة. يرسم قوة الإشارة لكل قناة ويساعد في اختيار القناة الأقل ازدحامًا في نطاق 2.4 و5 جيجاهرتز. أداة مثالية لمن يدير شبكات UniFi أو أي بيئة لاسلكية منزلية أو مكتبية.",
      en: "A free Ubiquiti app for analysing Wi-Fi networks, testing internet speeds and scanning neighbouring devices. It charts per-channel signal strength to help pick the least congested channel in 2.4 and 5 GHz. Ideal for anyone running UniFi or any home or office wireless environment."
    },
    tags: ["wifiman", "ubiquiti", "wifi", "speedtest"]
  },
  {
    id: "t764",
    name: "OpenSignal",
    url: "https://www.opensignal.com",
    category: "mobile",
    platform: ["android", "ios"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "تطبيق وخدمة قياس تغطية الشبكات الخلوية عبر بيانات جماعية من مستخدميه حول العالم. يعرض خرائط تغطية كل مشغل وسرعات التنزيل والرفع واتجاه أقرب برج. مرجع مهم عند تقييم جودة الاتصال في موقع جديد أو مقارنة المشغلين.",
      en: "An app and service measuring cellular coverage using crowdsourced data from users worldwide. It shows per-operator coverage maps, download and upload speeds, and nearest tower direction. A key reference when assessing connectivity at a new site or comparing carriers."
    },
    tags: ["opensignal", "cellular", "coverage", "lte"]
  },
  {
    id: "t765",
    name: "nPerf",
    url: "https://www.nperf.com",
    category: "mobile",
    platform: ["android", "ios", "web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "منصة اختبار سرعة متخصصة في الشبكات المحمولة تقيس التصفح والبث واليوتيوب إلى جانب السرعة. تنتج تقارير مفصلة بجودة الاتصال لكل مشغل في كل موقع على الخريطة. أدق من اختبارات السرعة التقليدية عند تقييم تجربة المستخدم الحقيقية.",
      en: "A speed test platform specialised in mobile networks, measuring browsing and YouTube streaming alongside raw throughput. It produces detailed per-operator quality reports for each map location. More accurate than plain speed tests when assessing real user experience."
    },
    tags: ["nperf", "speedtest", "mobile-networks", "qoe"]
  },
  {
    id: "t766",
    name: "SpeedSmart",
    url: "https://speedsmart.net",
    category: "mobile",
    platform: ["ios", "web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "خدمة اختبار سرعة وتطبيق iOS بنتائج فورية وواجهة نظيفة بدون تعقيد. تحفظ سجل اختباراتك عبر iCloud لمراقبة استقرار الاتصال عبر الزمن. خيار سريع وخفيف لفحص أداء الشبكة قبل الاجتماعات المهمة.",
      en: "A speed test service and iOS app delivering instant results through a clean, simple interface. It keeps your test history in iCloud to monitor connection stability over time. A quick, lightweight way to check network performance before important meetings."
    },
    tags: ["speedsmart", "speedtest", "ios", "history"]
  },
  {
    id: "t767",
    name: "zANTI",
    url: "https://www.zimperium.com",
    category: "mobile",
    platform: ["android"],
    license: "freemium",
    difficulty: 4,
    desc: {
      ar: "أداة اختبار اختراق متكاملة على أندرويد من Zimperium لبحث الشبكات المحلية لاسلكيًا. تدمج ماسح منافذ ومراقب حزم وهجمات man-in-the-middle في واجهة رسومية واحدة. تُستخدم فقط بإذن مكتوب لتقييم أمان الشبكات اللاسلكية في الميدان.",
      en: "A comprehensive Android penetration testing suite from Zimperium for wireless local network assessment. It bundles port scanning, packet inspection and man-in-the-middle attacks in one GUI. Only to be used with written authorisation when assessing wireless networks in the field."
    },
    tags: ["zanti", "zimperium", "pentest", "android"]
  },
  {
    id: "t768",
    name: "DroidSheep",
    url: "https://droidsheep.info",
    category: "mobile",
    platform: ["android"],
    license: "freemium",
    difficulty: 4,
    desc: {
      ar: "أداة أمان على أندرويد تلتقط جلسات ويب غير المشفرة في الشبكات المحلية لعرض مخاطرها. تعترض الكوكيز عبر وضع المراقبة لتثبت أهمية استخدام HTTPS في كل مكان. تُستخدم تعليميًا لإقناع الإدارات بترقية أمان تطبيقاتها الداخلية.",
      en: "An Android security tool that captures unencrypted web sessions on local networks to expose their risks. It intercepts cookies in monitor mode, proving why HTTPS-everywhere matters. Used educationally to convince management to upgrade internal app security."
    },
    tags: ["droidsheep", "session-hijacking", "wifi", "awareness"]
  },
  {
    id: "t769",
    name: "NetGuard",
    url: "https://www.netguard.me",
    category: "mobile",
    platform: ["android"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "جدار حماية لأندرويد بدون صلاحيات جذر يتحكم في اتصال كل تطبيق بالإنترنت عبر VPN محلي. يسمح بحجب الاتصال الخلوي أو الواي فاي أو التجول لكل تطبيق على حدة مع سجل حركة مفصل. كشف عميق للتطبيقات التي تتصل بخوادم غريبة.",
      en: "A no-root Android firewall controlling per-app internet access through a local VPN. It can block cellular, Wi-Fi or roaming per app, with a detailed traffic log. Reveals which apps quietly phone home to odd servers."
    },
    tags: ["netguard", "firewall", "privacy", "android"]
  },
  {
    id: "t770",
    name: "G-NetTrack Lite",
    url: "https://play.google.com/store/apps/details?id=com.gyokovsolutions.gnettracklite",
    category: "mobile",
    platform: ["android"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "تطبيق قياس ومراقبة الشبكات الخلوية يسجل معلومات الأبراج وقوة الإشارة والتقنيات المتصلة. يعرض الخلايا المجاورة وPCI وTAC و ARFCN مع خريطة حية لمسار القياس. أداة قياسية لمهندسي RF ومحللي تغطية الشبكات المحمولة.",
      en: "A cellular measurement and monitoring app logging cell info, signal strength and connected technology. It shows neighbouring cells, PCI, TAC and ARFCN with a live measurement map. A standard tool for RF engineers and mobile coverage analysts."
    },
    tags: ["gnettrack", "cellular", "rf", "lte", "drive-test"]
  },
  {
    id: "t771",
    name: "NetCut",
    url: "https://arcai.com",
    category: "mobile",
    platform: ["android"],
    license: "free",
    difficulty: 3,
    desc: {
      ar: "تطبيق أندرويد كلاسيكي يعرض الأجهزة المتصلة بشبكتك ويقطع اتصال أي جهاز عنها بضغطة. يعمل عبر تزوير رسائل ARP على الشبكة المحلية اللاسلكية. مفيد لاختبار استجابة أجهزتك لهجمات حرمان الخدمة المحلية ومعرفة المتطفلين.",
      en: "A classic Android app listing devices on your Wi-Fi and cutting any device off with a tap. It works by spoofing ARP messages on the local wireless network. Useful for testing how your gear handles local DoS and spotting freeloaders."
    },
    tags: ["netcut", "arp", "wifi", "protection"]
  },
  {
    id: "t772",
    name: "Jump Desktop",
    url: "https://jumpdesktop.com",
    category: "mobile",
    platform: ["android", "ios"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "عميل سطح مكتب بعيد ممتاز لأندرويد وiOS يدعم RDP وVNC بجودة عالية واستجابة فائقة. يتميز ب توجيه دقيق بالمؤشر ولوحة مفاتيح مصممة للإنتاجية الحقيقية. أداة مثالية للوصول إلى محطات التحكم الشبكية من الجهاز المحمول.",
      en: "An excellent remote desktop client for Android and iOS supporting RDP and VNC with superb quality. It features precise pointer routing and a keyboard designed for real productivity. Ideal for reaching network control stations from a mobile device."
    },
    tags: ["jump-desktop", "rdp", "vnc", "remote"]
  },
  {
    id: "t773",
    name: "Screens 5",
    url: "https://edovia.com/screens-ios/",
    category: "mobile",
    platform: ["ios"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "عميل VNC أنيق لنظام iOS من Edovia بتفاصيل مصقولة وتكامل عميق مع نظام آبل. يدعم تسجيل الجلسات ولوحة مفاتيح Trackpad وApple Watch وكافة اختصارات اللمس. تجربة وصول بعيد راقية لواجهات أجهزة الشبكة القائمة على VNC.",
      en: "An elegant iOS VNC client from Edovia with deeply polished Apple-platform integration. It supports session recording, trackpad keyboard and full touch shortcuts. A premium remote access experience for VNC-based network device consoles."
    },
    tags: ["screens", "vnc", "ios", "edovia"]
  },
  {
    id: "t774",
    name: "GlassWire",
    url: "https://www.glasswire.com",
    category: "mobile",
    platform: ["android"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "تطبيق مراقبة وبيانات لأندرويد يعرض كل اتصال شبكي يجريه كل تطبيق في الزمن الحقيقي. يرسم مخططات استهلاك البيانات لكل تطبيق مع تنبيهات عند ظهور نشاط غير معتاد. يكشف التطبيقات الجائعة للبيانات والاتصالات المشبوهة فور حدوثها.",
      en: "An Android monitoring app showing every network connection made by every app in real time. It draws per-app data usage graphs and alerts on unusual new activity. It exposes data-hungry apps and suspicious connections the moment they happen."
    },
    tags: ["glasswire", "monitoring", "data-usage", "android"]
  },
  {
    id: "t775",
    name: "Microsoft Remote Desktop",
    url: "https://play.google.com/store/apps/details?id=com.microsoft.rdc.androidx",
    category: "mobile",
    platform: ["android", "ios"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "عميل سطح المكتب البعيد الرسمي من مايكروسوفت للوصول إلى أجهزة ويندوز من أندرويد وiOS. يدعم أجهزة متعددة الشاشات والبث عالي الجودة و بوابة Remote Desktop للشبكات المؤسسية. بوابة مجانية للوصول إلى خوادم ويندوز الإدارية من أي مكان.",
      en: "Microsoft's official remote desktop client for reaching Windows machines from Android and iOS. It supports multi-monitor, high-quality streaming and RD Gateway for corporate networks. A free gateway to administer Windows servers from anywhere."
    },
    tags: ["rdp", "microsoft", "remote-desktop", "windows"]
  },

  // ═══ Network Libraries & SDKs (t776–t800) ═══
  {
    id: "t776",
    name: "libpcap",
    url: "https://www.tcpdump.org",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مكتبة C المرجعية لالتقاط حزم الشبكة التي يقوم عليها tcpdump وWireshark وآلاف الأدوات. توفر واجهة موحدة للالتقاط على يونكس وويندوز عبر Npcap المكافئة. المعيار الفعلي الذي تبنى عليه أي أداة لتحليل الحزم على مستوى العالم.",
      en: "The reference C library for packet capture underpinning tcpdump, Wireshark and thousands of tools. It provides a unified capture API across Unix and Windows through Npcap. The de facto standard behind nearly every packet analysis tool in the world."
    },
    cmd: "gcc -lpcap sniffer.c -o sniffer && ./sniffer eth0",
    cmdDesc: {
      ar: "يبني مثال ملتقط حزم يستخدم libpcap ثم يشغله على واجهة محددة.",
      en: "Builds a libpcap-based sniffer example and runs it on a given interface."
    },
    tags: ["libpcap", "capture", "c", "packets"]
  },
  {
    id: "t777",
    name: "DPDK",
    url: "https://www.dpdk.org",
    category: "dev",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "مجموعة مكتبات Data Plane Development Kit لمعالجة الحزم بسرعة خطية عالية في مساحة المستخدم. تلغي نسخ الحزم إلى النواة وتستخدم HugePages وpolling لبلوغ ملايين الحزم في الثانية. أساس الأداء العالي في أنظمة مثل vRouter وموزعات الحمل الافتراضية.",
      en: "The Data Plane Development Kit libraries for high-rate linear packet processing in userspace. It bypasses kernel copies using HugePages and polling to reach millions of packets per second. The performance foundation of vRouters and virtual load balancers."
    },
    cmd: "meson setup build && ninja -C build",
    cmdDesc: {
      ar: "يبني DPDK من المصدر باستخدام meson و ninja.",
      en: "Builds DPDK from source using meson and ninja."
    },
    tags: ["dpdk", "userspace", "high-performance", "dataplane"]
  },
  {
    id: "t778",
    name: "PF_RING",
    url: "https://github.com/ntop/PF_RING",
    category: "dev",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "إطار التقاط حزم عالي الأداء من ntop يبدل واجهة BSD التقليدية بحلقات حزم في النواة. يرفع معدلات الالتقاط إلى ملايين الحزم في الثانية عبر مكالمات zero-copy. القوة خلف ntopng وتطبيقات DPI واسعة النطاق.",
      en: "An ntop high-performance packet capture framework replacing traditional Berkeley sockets with kernel packet rings. It lifts capture rates to millions of packets per second via zero-copy calls. The engine behind ntopng and large-scale DPI deployments."
    },
    cmd: "insmod kernel/pf_ring.ko && ./userland/examples/pfcount -i eth0",
    cmdDesc: {
      ar: "يحمّل وحدة نواة PF_RING ثم يشغل أداة pfcount لقياس معدل الالتقاط.",
      en: "Loads the PF_RING kernel module then runs pfcount to measure capture rate."
    },
    tags: ["pf_ring", "ntop", "capture", "high-speed"]
  },
  {
    id: "t779",
    name: "netmap",
    url: "https://github.com/luigirizzo/netmap",
    category: "dev",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "إطار بحثي من Luigi Rizzo يوفر وصولاً مباشرًا إلى حلقات بطاقات الشبكة من مساحة المستخدم. يحقق معدلات استثنائية في إرسال واستقبال الحزم مع أدوات مثل pkt-gen و VALE switch. مرجع أكاديمي في هندسة أنظمة معالجة الحزم عالية الأداء.",
      en: "A research framework by Luigi Rizzo providing direct userspace access to NIC rings. It achieves exceptional send/receive rates with tools like pkt-gen and the VALE switch. An academic reference in high-performance packet processing engineering."
    },
    cmd: "./apps/pkt-gen -i eth0 -f rx -l 60",
    cmdDesc: {
      ar: "يقيس معدل استقبال الحزم على واجهة باستخدام أداة pkt-gen من netmap.",
      en: "Benchmarks packet receive rate on an interface using netmap's pkt-gen."
    },
    tags: ["netmap", "zero-copy", "benchmark", "high-speed"]
  },
  {
    id: "t780",
    name: "VPP",
    url: "https://fd.io",
    category: "dev",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "Vector Packet Processing من مشروع fd.io، وهو مسار بيانات في مساحة المستخدم يعالج حزمًا على شكل متجهات. يوظف تعليمات SIMD وتحسينات ذاكرة التخزين المؤقت لبلوغ أداء عالٍ على عتاد منخفض التكلفة فوق DPDK. القلب النابض في موجهات Tungsten Fabric و vSwitch.",
      en: "The fd.io Vector Packet Processing userspace datapath that processes packets in vector batches. It leverages SIMD instructions and cache optimisations for commodity-hardware throughput on top of DPDK. The beating heart of Tungsten Fabric routers and vSwitches."
    },
    cmd: "vppctl show interface",
    cmdDesc: {
      ar: "يعرض واجهات الشبكة وإحصاءاتها في مثيل VPP قيد التشغيل.",
      en: "Lists network interfaces and their stats in a running VPP instance."
    },
    tags: ["vpp", "fd.io", "userspace", "vector"]
  },
  {
    id: "t781",
    name: "libbpf",
    url: "https://github.com/libbpf/libbpf",
    category: "dev",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "المكتبة المرجعية لتحميل برامج eBPF في نواة لينكس وتفاعل التطبيقات معها. مبنية عليها أدوات مثل bpftool وأدلة libbpf-tools لتتبع الشبكة والأداء. البوابة البرمجية لبناء راصدات XDP وفلاتر حزم عالية السرعة.",
      en: "The reference library for loading eBPF programs into the Linux kernel and interacting with them from applications. It powers tools like bpftool and the libbpf-tools collection for network and performance tracing. The programmatic gateway to XDP observability and fast packet filters."
    },
    cmd: "bpftool prog show",
    cmdDesc: {
      ar: "يعرض برامج eBPF المحملة حاليًا في النواة عبر bpftool المبني على libbpf.",
      en: "Lists currently loaded eBPF programs via bpftool, built on libbpf."
    },
    tags: ["libbpf", "ebpf", "xdp", "tracing"]
  },
  {
    id: "t782",
    name: "GoPacket",
    url: "https://github.com/google/gopacket",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة Go لمعالجة الحزم توفر فك طبقات البروتوكولات والالتقاط الحي من libpcap. تُستخدم في أدوات أمن الشبكة الشهيرة لأنها تجمع بساطة Go مع عمق تحليل البروتوكولات. تسهّل كتابة ماسحات وتحليلات حزم بأسلوب حديث.",
      en: "A Go packet-processing library providing protocol layer decoding and live capture through libpcap. It powers well-known network security tools by marrying Go's simplicity with deep protocol analysis. It makes writing scanners and packet analytics refreshingly modern."
    },
    cmd: "go doc github.com/google/gopacket",
    cmdDesc: {
      ar: "يعرض توثيق مكتبة GoPacket من داخل مشروع Go مباشرة.",
      en: "Shows GoPacket's package documentation from inside a Go project."
    },
    tags: ["gopacket", "go", "golang", "decoding"]
  },
  {
    id: "t783",
    name: "dpkt",
    url: "https://github.com/kbandla/dpkt",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة بايثون خفيفة لتحليل ملفات PCAP وبناء الحزم برمجيًا بأدنى تعقيد. مثالية ل سكربتات التحليل السريعة عند فحص آلاف الالتقاطات في تحقيق جنائي. أبسط طريق من ملف PCAP إلى معلومة قابلة للاستخدام.",
      en: "A lightweight Python library for parsing PCAP files and programmatically building packets. Ideal for quick analysis scripts when sifting thousands of captures in a forensic investigation. The shortest path from a PCAP file to actionable insight."
    },
    cmd: "python3 -c 'import dpkt; r=dpkt.pcap.Reader(open(\"c.pcap\",\"rb\")); print(sum(1 for _ in r))'",
    cmdDesc: {
      ar: "يعد عدد الحزم في ملف PCAP بسطر بايثون واحد باستخدام dpkt.",
      en: "Counts the packets in a PCAP file with a one-liner using dpkt."
    },
    tags: ["dpkt", "python", "pcap", "parsing"]
  },
  {
    id: "t784",
    name: "PcapPlusPlus",
    url: "https://pcapplusplus.github.io",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة C++ متعددة المنصات لالتقاط الحزم وتحليلها وإعادة بنائها وتعديلها وإرسالها. تتضمن أدوات جاهزة مثل PcapSplitter وPcapSearch مع فك طبقات للعشرات من البروتوكولات. توازن ذكي بين قوة C++ وسهولة استخدام مكتبات البايثون.",
      en: "A multi-platform C++ library for capturing, parsing, crafting, editing and sending packets. It ships ready tools like PcapSplitter and PcapSearch with decoders for dozens of protocols. A smart balance between C++ power and Python-style ease."
    },
    cmd: "PcapSplitter -f capture.pcap -o split_out",
    cmdDesc: {
      ar: "يقسم ملف PCAP كبير إلى ملفات أصغر باستخدام أداة PcapSplitter المرفقة.",
      en: "Splits a large PCAP file into smaller ones using the bundled PcapSplitter."
    },
    tags: ["pcapplusplus", "cpp", "parsing", "reassembly"]
  },
  {
    id: "t785",
    name: "libtins",
    url: "https://libtins.github.io",
    category: "dev",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مكتبة C++ أنيقة لتحليل وبناء الحزم تقدم واجهة معبرة لكل طبقة بروتوكول. تُبنى عليها أدوات اختبار أمن الشبكة لسهولة تكوين حزم TCP/IP المخصصة. تُستخدم أيضًا في أبحاث أمن الشبكات بفضل الالتقاط المدمج.",
      en: "An elegant C++ packet crafting and parsing library with an expressive API for every protocol layer. Network security tools build on it because crafting custom TCP/IP packets is effortless. Also popular in network security research thanks to built-in sniffing."
    },
    cmd: "g++ sniffer.cpp -ltins -o sniffer && ./sniffer eth0",
    cmdDesc: {
      ar: "يبني ملتقط حزم يعتمد libtins ويربطه بالمكتبة ثم يشغله.",
      en: "Compiles a libtins-based sniffer, links the library, and runs it."
    },
    tags: ["libtins", "cpp", "crafting", "sniffing"]
  },
  {
    id: "t786",
    name: "Pcap4J",
    url: "https://github.com/kaitoy/pcap4j",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة Java لالتقاط وتحليل الحزم تغلف libpcap وWinPcap بواجهة كائنية نقية. تُمكّن مطوري Java من بناء أدوات مراقبة شبكية دون مغادرة منظومتهم المفضلة. جسر عملي بين عالم JVM وعالم التحليل الشبكي منخفض المستوى.",
      en: "A Java packet capture and analysis library wrapping libpcap and WinPcap in a clean object API. It lets Java developers build network monitoring tools without leaving their favourite ecosystem. A practical bridge between the JVM world and low-level network analysis."
    },
    cmd: "mvn dependency:get -Dartifact=org.pcap4j:pcap4j-core:1.8.2",
    cmdDesc: {
      ar: "يضيف مكتبة Pcap4J الأساسية إلى مشروع Maven بشكل تلقائي.",
      en: "Adds the core Pcap4J library to a Maven project automatically."
    },
    tags: ["pcap4j", "java", "capture", "jvm"]
  },
  {
    id: "t787",
    name: "Netty",
    url: "https://netty.io",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار Java شهير لبناء خوادم وعملاء شبكيين عاليي الأداء غير المتزامنين المدفوعين بالأحداث. يبسط برمجة NIO و يُسرّع إطار أعمال تطبيقات مثل Spring وgRPC. القاعدة التي تُبنى عليها أنظمة الوسائط والبروتوكولات والتطبيقات الموزعة الضخمة.",
      en: "A famous Java framework for building high-performance asynchronous event-driven network servers and clients. It tames NIO complexity and accelerates application frameworks like Spring and gRPC. The foundation beneath huge middleware, protocol, and distributed systems."
    },
    cmd: "mvn dependency:get -Dartifact=io.netty:netty-all:4.1.100.Final",
    cmdDesc: {
      ar: "يجلب جميع وحدات Netty إلى مشروعك عبر نظام Maven.",
      en: "Fetches all Netty modules into your project via Maven."
    },
    tags: ["netty", "java", "async", "nio"]
  },
  {
    id: "t788",
    name: "Asio",
    url: "https://think-async.com/Asio/",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مكتبة C++ مكتوبة بملفات رأس فقط للشبكات غير المتزامنة قائمة على مُجدول proactor مرن. متاحة إما مستقلة أو كجزء من Boost وتُستخدم في خدمات TCP وUDP عالية الأداء. من أنظف التصاميم للبرمجة الشبكية الحديثة بلغة ++C.",
      en: "A header-only C++ asynchronous networking library built on a flexible proactor model. Available standalone or as part of Boost, it powers high-performance TCP and UDP services. One of the cleanest designs for modern C++ network programming."
    },
    cmd: "g++ -std=c++17 -pthread echo_server.cpp -o echo_server",
    cmdDesc: {
      ar: "يبني خادم صدى مبنى على Asio بدعم خيوط المعالجة.",
      en: "Builds an Asio-based echo server with threading support."
    },
    tags: ["asio", "boost", "cpp", "async"]
  },
  {
    id: "t789",
    name: "POCO C++ Libraries",
    url: "https://pocoproject.org",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مجموعة مكتبات C++ حديثة تجمع طبقات الشبكة وHTTP وWebSocket وTLS مع أدوات التطبيق الأوسع. تجعل كتابة خادم ويب مدمج أو عميل FTP بلغة C++ أمرًا بسيطًا ومنظمًا. شائعة في التطبيقات المدمجة والأنظمة الصناعية الشبكية.",
      en: "A modern C++ library suite combining networking, HTTP, WebSocket and TLS layers with broader application utilities. It makes writing an embedded web server or FTP client in C++ clean and simple. Popular in embedded and industrial networked systems."
    },
    cmd: "cmake -B build && cmake --build build -j",
    cmdDesc: {
      ar: "يهيئ مشروع POCO ويبنيه بكل النوى المتاحة.",
      en: "Configures and builds a POCO project using all available cores."
    },
    tags: ["poco", "cpp", "http", "framework"]
  },
  {
    id: "t790",
    name: "libevent",
    url: "https://libevent.org",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة C كلاسيكية للإشعارات بالأحداث غير المتزامنة على المقابس والمؤقتات والإشارات. المحرك خلف memcached وTor وChromium لكفاءتها العالية في الأحداث الحدودية. حجر الأساس التاريخي لأي خادم شبكي أحداثي في C.",
      en: "A classic C library for asynchronous event notifications on sockets, timers and signals. The engine behind memcached, Tor and Chromium, prized for its edge-triggered efficiency. The historic cornerstone of event-driven network servers in C."
    },
    cmd: "gcc $(pkg-config --cflags --libs libevent) server.c -o server",
    cmdDesc: {
      ar: "يبني خادمًا يعتمد libevent مع الروابط والمسارات الصحيحة.",
      en: "Builds a libevent-based server with the correct link flags and paths."
    },
    tags: ["libevent", "c", "event-loop", "async"]
  },
  {
    id: "t791",
    name: "libuv",
    url: "https://libuv.org",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة الإدخال والإخراج غير المتزامن متعددة المنصات التي تُشغّل Node.js. تجرّد epoll وkqueue وIOCP في واجهة موحدة للأحداث والمقابس والعمليات. تجعل كتابة برامج شبكية غير متزامنة بلغة C++ سهلة نسبيًا.",
      en: "The cross-platform asynchronous I/O library that powers Node.js. It abstracts epoll, kqueue and IOCP into one unified event, socket and process API. It makes writing asynchronous network programs in C/C++ surprisingly approachable."
    },
    cmd: "gcc echo.c -luv -o echo",
    cmdDesc: {
      ar: "يبني مثال خادم صدى قائم على libuv بربط بسيط.",
      en: "Builds a libuv-based echo server example with simple linking."
    },
    tags: ["libuv", "nodejs", "async", "io"]
  },
  {
    id: "t792",
    name: "ZeroMQ",
    url: "https://zeromq.org",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة مراسلة متزامنة عالية الأداء تعمل كطبقة جوارب ذكية فوق TCP وIPC. تقدم أنماط مراسلة مثل الناشر والمشترك والطلب والرد بإزالة تفاصيل الشبكة. تبسط بناء الأنظمة الموزعة دون التعقيد الكامل لوسيط رسائل.",
      en: "A high-performance asynchronous messaging library acting as smart sockets over TCP and IPC. It provides patterns like pub-sub and request-reply while hiding networking plumbing. It simplifies building distributed systems without a full message broker."
    },
    cmd: "gcc hwserver.c $(pkg-config --cflags --libs libzmq) -o hwserver",
    cmdDesc: {
      ar: "يبني خادم ZeroMQ الشهير بالروابط اللازمة.",
      en: "Builds the classic ZeroMQ hello-world server with the needed link flags."
    },
    tags: ["zeromq", "zmq", "messaging", "pubsub"]
  },
  {
    id: "t793",
    name: "gRPC",
    url: "https://grpc.io",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار استدعاء إجراءات بعيد حديث من Google يربط الخدمات عبر HTTP/2 و Protobuf. يوفر تدفقات ثنائية الاتجاه ومولدات كود لغات عديدة ومهل زمنية مدمجة. المعيار السائد لتواصل الخدمات المصغرة في مراكز البيانات الحديثة.",
      en: "A modern Google remote procedure call framework connecting services over HTTP/2 and Protobuf. It offers bidirectional streaming, code generators for many languages, and built-in deadlines. The dominant standard for microservice communication in modern datacentres."
    },
    cmd: "python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. service.proto",
    cmdDesc: {
      ar: "يولد كود Python لملف تعريف خدمة Protobuf.",
      en: "Generates Python code from a Protobuf service definition."
    },
    tags: ["grpc", "rpc", "protobuf", "http2"]
  },
  {
    id: "t794",
    name: "Apache Thrift",
    url: "https://thrift.apache.org",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار RPC مفتوح المصدر من فيسبوك إلى Apache يدعم عشرات اللغات مع تعريف واجهات واحد. يولد طبقات التسلسل والنقل كاملة لتسهيل ربط خدمات مختلفة التقنيات. رائد في توحيد واجهات الخدمات عبر حدود اللغات والمنصات.",
      en: "An Apache open-source RPC framework originating at Facebook, supporting dozens of languages from one IDL. It generates full serialization and transport layers, easing cross-tech service wiring. A pioneer in unifying service interfaces across language and platform boundaries."
    },
    cmd: "thrift --gen py service.thrift",
    cmdDesc: {
      ar: "يولد كود Python من ملف تعريف Thrift.",
      en: "Generates Python code from a Thrift definition file."
    },
    tags: ["thrift", "rpc", "serialization", "idl"]
  },
  {
    id: "t795",
    name: "Twisted",
    url: "https://twisted.org",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار بايثون رائد في البرمجة المدفوعة بالأحداث للشبكات مكتوب منذ عام 2002. يدعم عشرات البروتوكولات من HTTP وSSH إلى IRC وDNS مع نماذج خوادم جاهزة. الأداة المفضلة لبناء خوادم بايثون خاصة وبروتوكولات تجريبية.",
      en: "A pioneering Python event-driven networking framework dating back to 2002. It implements dozens of protocols from HTTP and SSH to IRC and DNS with ready server patterns. The go-to framework for custom Python servers and experimental protocols."
    },
    cmd: "twistd web --path . --port tcp:8080",
    cmdDesc: {
      ar: "يُشغل خادم ويب ثابت فوري للمجلد الحالي على المنفذ 8080.",
      en: "Serves the current directory instantly as a static web server on port 8080."
    },
    tags: ["twisted", "python", "event-driven", "protocols"]
  },
  {
    id: "t796",
    name: "c-ares",
    url: "https://c-ares.org",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مكتبة C لحل أسماء DNS بشكل غير متزامن دون حجب التطبيق أثناء الاستعلام. تُستخدم داخل curl و Node.js للتقاط الأسماء دون تجميد حلقة الأحداث. أداة أساسية لأي خادم شبكي يحتاج حل أسماء فعالًا وغير معطل.",
      en: "A C library for asynchronous DNS resolution that never blocks the application during queries. It is used inside curl and Node.js to resolve names without freezing the event loop. Essential for any network server needing efficient non-blocking name resolution."
    },
    cmd: "adig example.com",
    cmdDesc: {
      ar: "يستخدم أداة adig المرفقة مع c-ares لاستعلام DNS من سطر الأوامر.",
      en: "Uses adig, shipped with c-ares, to perform a command-line DNS query."
    },
    tags: ["c-ares", "dns", "async", "resolver"]
  },
  {
    id: "t797",
    name: "quiche",
    url: "https://github.com/cloudflare/quiche",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "تنفيذ QUIC و HTTP/3 من Cloudflare مكتوب بلغة Rust لأداء وأمان عاليين. تدمج مع nginx وEnvoy لتقديم خدمات HTTP/3 عالمية على حافة الشبكة. مرجع مفتوح ممتاز لفهم بروتوكولات الجيل الجديد من الويب.",
      en: "Cloudflare's Rust implementation of QUIC and HTTP/3 built for high performance and safety. It integrates with nginx and Envoy to serve HTTP/3 globally at the network edge. An excellent open reference for understanding the web's newest transport generation."
    },
    cmd: "cargo build --examples",
    cmdDesc: {
      ar: "يبني أمثلة quiche التعليمية المرفقة داخل المستودع.",
      en: "Builds the educational quiche examples bundled in the repository."
    },
    tags: ["quiche", "quic", "http3", "rust"]
  },
  {
    id: "t798",
    name: "MsQuic",
    url: "https://github.com/microsoft/msquic",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "تنفيذ Microsoft لبروتوكول QUIC بلغة C مُهيأ للإنتاج على ويندوز ولينكس. يُشغّل نقل SMB و HTTP/3 في ويندوز الحديثة مع دعم TLS 1.3 مدمج. مكتبة تعليمية ممتازة للدخول إلى عالم QUIC من منظور صناعي.",
      en: "Microsoft's production-grade C implementation of QUIC for Windows and Linux. It powers SMB and HTTP/3 transport in modern Windows with integrated TLS 1.3. An excellent library for entering the QUIC world from an industrial perspective."
    },
    cmd: "cmake -B build -S . && cmake --build build",
    cmdDesc: {
      ar: "يبني مكتبة MsQuic من المصدر عبر نظام CMake.",
      en: "Builds the MsQuic library from source using CMake."
    },
    tags: ["msquic", "quic", "microsoft", "tls"]
  },
  {
    id: "t799",
    name: "libwebsockets",
    url: "https://libwebsockets.org",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مكتبة C خفيفة لتطبيقات WebSocket وHTTP مع خادم واحد قوي منذ 2010. تدعم TLS والبروتوكولات الفرعية وآلاف الاتصالات المتزامنة بموارد قليلة. مختارة في الأنظمة المدمجة والوسائط الحية مثل كاميرات IP.",
      en: "A lightweight C library for WebSocket and HTTP applications with one powerful server since 2010. It supports TLS, subprotocols and thousands of concurrent connections on few resources. Chosen for embedded systems and live media like IP camera firmware."
    },
    cmd: "libwebsockets-test-server --port 7681",
    cmdDesc: {
      ar: "يشغل خادم اختبار WebSocket المرفق على المنفذ 7681 للتجربة.",
      en: "Runs the bundled WebSocket test server on port 7681 to experiment."
    },
    tags: ["libwebsockets", "websocket", "http", "c"]
  },
  {
    id: "t800",
    name: "lwIP",
    url: "https://github.com/lwip-tcpip/lwip",
    category: "dev",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "حزمة TCP/IP صغيرة مكتوبة بلغة C صُممت للأنظمة المدمجة محدودة الذاكرة. تُشغل ملايين الأجهزة من ESP32 إلى أجهزة الاستشعار الصناعية بواجهة API تشبه BSD. عمود فقري في إنترنت الأشياء والشبكات المدمجة في كل مكان.",
      en: "A small C TCP/IP stack designed for memory-constrained embedded systems. It runs in millions of devices from ESP32 boards to industrial sensors with a BSD-like API. A backbone of the Internet of Things and embedded networking everywhere."
    },
    cmd: "cmake -B build -S contrib && cmake --build build",
    cmdDesc: {
      ar: "يبني منفذ lwIP التجريبي من مجلد contrib عبر CMake.",
      en: "Builds lwIP's experimental port from the contrib directory using CMake."
    },
    tags: ["lwip", "embedded", "tcpip", "iot"]
  }
];
