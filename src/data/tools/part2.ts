import type { Tool } from "@/lib/types";

// ─── TOOLS PART 2: t101–t200 ─────────────────────────────────────────────
// Categories: pentest (t101–t125), webproxy (t126–t145),
//             utility (t146–t175), speed (t176–t200)

export const TOOLS_PART2: Tool[] = [
  // ── Pentest / اختبار الاختراق ─────────────────────────────────────────
  {
    id: "t101",
    name: "Metasploit Framework",
    url: "https://metasploit.com",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار عمل مفتوح المصدر يضم أكبر قاعدة استغلالات (Exploits) في العالم، يُستخدم للبحث عن الثغرات وتنفيذ الاستغلالات وبناء جلسات التحكم عن بُعد وما بعد الاختراق. يُعد المعيار الفعلي في مجال الاختبار الهجومي ويأتي مثبتًا مسبقًا في توزيعة Kali Linux.",
      en: "The world's most-used open-source exploitation framework, bundling thousands of exploits, payloads, and auxiliary modules for staging penetration tests and post-exploitation. It is the de facto industry standard and ships pre-installed on Kali Linux."
    },
    cmd: "msfconsole",
    cmdDesc: { ar: "تشغيل وحدة تحكم ميتاسبلويت", en: "Launch the Metasploit console" },
    tags: ["metasploit", "exploitation", "framework", "pentest"]
  },
  {
    id: "t102",
    name: "Armitage",
    url: "https://github.com/rsmudge/armitage",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "واجهة رسومية بلغة Java تعمل فوق Metasploit وتحوّل سير عمل الاختراق إلى خريطة مرئية للمضيفين المستهدفين مع إطلاق الاستغلالات بنقرة واحدة. مثالية لمن يجد وحدة تحكم msfconsole مرهقة ولإدارة حملات اختبار جماعية.",
      en: "A Java GUI front-end for Metasploit that visualizes targets on an interactive graph and launches exploits with a single right-click. It makes team-based penetration testing approachable for anyone intimidated by the msfconsole workflow."
    },
    cmd: "armitage",
    cmdDesc: { ar: "تشغيل واجهة Armitage الرسومية", en: "Launch the Armitage GUI" },
    tags: ["armitage", "metasploit", "gui", "pentest"]
  },
  {
    id: "t103",
    name: "Burp Suite",
    url: "https://portswigger.net/burp",
    category: "pentest",
    platform: ["cross"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "منصة متكاملة لاختبار اختراق تطبيقات الويب تتضمن وكيلًا اعتراضيًا وأداة Repeater لإعادة الطلبات وفاحصًا آليًا للثغرات، وهي أداة كل باحث ويب تقريبًا. تُعد النسخة المجتمعية كافية للتعلم بينما تضيف نسخة Pro الفاحص الآلي المتقدم.",
      en: "The industry-standard toolkit for web application penetration testing, combining an intercepting proxy, repeater, intruder, and an automated vulnerability scanner. The Community edition covers learning needs, while Pro adds the active scanner."
    },
    cmd: "burpsuite",
    cmdDesc: { ar: "تشغيل Burp Suite من الطرفية", en: "Start Burp Suite from the terminal" },
    tags: ["burp", "webapp", "proxy", "pentest"]
  },
  {
    id: "t104",
    name: "sqlmap",
    url: "https://sqlmap.org",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة مفتوحة المصدر لاكتشاف ثغرات حقن SQL واستغلالها آليًا، فهي تستخرج أسماء قواعد البيانات والجداول والمستخدمين وكلمات المرور دون كتابة استعلام واحد يدويًا. تدعم أنظمة قواعد بيانات متعددة وتتجاوز جدران WAF ببراميل تلاعب متقدمة.",
      en: "An open-source tool that automates the detection and exploitation of SQL injection flaws, dumping database names, tables, and credentials without writing manual queries. It supports many database engines and includes tamper scripts to bypass web application firewalls."
    },
    cmd: "sqlmap -u \"http://target/page?id=1\" --dbs",
    cmdDesc: { ar: "فحص معامل id بحثًا عن حقن SQL وسرد قواعد البيانات", en: "Test the id parameter for SQLi and enumerate databases" },
    tags: ["sqlmap", "sqli", "database", "webapp"]
  },
  {
    id: "t105",
    name: "THC Hydra",
    url: "https://github.com/vanhauser-thc/thc-hydra",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة شهيرة لتنفيذ هجمات تخمين كلمات المرور عبر الشبكة ضد عشرات البروتوكولات مثل SSH وFTP وHTTP وSMB ضمن اختبارات الاختراق المصرّح بها. تشتهر بسرعتها العالية ودعمها للهجمات المتوازية عبر قوائم مستخدمين وكلمات مرور ضخمة.",
      en: "A famous parallelized network login brute-forcer from THC attacking dozens of protocols such as SSH, FTP, HTTP, and SMB during authorized penetration tests. It is known for its speed and its ability to combine large username and password lists."
    },
    cmd: "hydra -l admin -P rockyou.txt 10.10.10.5 ssh",
    cmdDesc: { ar: "هجوم قاموس على خدمة SSH بمستخدم admin", en: "Dictionary attack against SSH for user admin" },
    tags: ["hydra", "brute-force", "passwords", "online"]
  },
  {
    id: "t106",
    name: "Medusa",
    url: "https://github.com/jmk-foofus/medusa",
    category: "pentest",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة سطر أوامر لتخمين بيانات الدخول عبر عشرات الخدمات الشبكية بالتوازي، وتُعد بديلًا سريعًا وخفيفًا لـ Hydra في هجمات التحقق من كلمات المرور. تدعم فحص عدة بروتوكولات وعدة مضيفين في وقت واحد عبر خيوط معالجة متعددة.",
      en: "A speedy, modular, parallel login brute-forcer supporting dozens of network services, positioned as a lightweight alternative to Hydra. It can test multiple hosts, users, and protocols simultaneously through threaded execution."
    },
    cmd: "medusa -H hosts.txt -U users.txt -P passes.txt -M ssh",
    cmdDesc: { ar: "اختبار بيانات دخول SSH على قائمة مضيفين", en: "Test SSH logins across a host list" },
    tags: ["medusa", "brute-force", "login", "parallel"]
  },
  {
    id: "t107",
    name: "John the Ripper",
    url: "https://www.openwall.com/john/",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "كاسر كلمات المرور الأشهر عالميًا؛ يكتشف مئات صيغ التجزئة (Hashes) تلقائيًا ويهاجمها بالقواميس والقواعد والقوة الغاشمة عبر أنوية المعالج. أداة أساسية في أي مختبر اختراق لاستعادة كلمات المرور المستخرجة من الأنظمة المستهدفة.",
      en: "The world's most famous password cracker, auto-detecting hundreds of hash formats and attacking them with dictionaries, word-mangling rules, and brute-force across CPU cores. It is a lab essential for recovering credentials captured from target systems."
    },
    cmd: "john --wordlist=rockyou.txt hashes.txt",
    cmdDesc: { ar: "كسر ملف تجزئات بقاموس rockyou", en: "Crack a hash file with the rockyou wordlist" },
    tags: ["john", "passwords", "hash-cracking", "offline"]
  },
  {
    id: "t108",
    name: "Hashcat",
    url: "https://hashcat.net/hashcat/",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أسرع كاسر كلمات مرور في العالم؛ يستفيد من بطاقات الرسوميات (GPU) لفك تجزئات كلمات المرور بسرعات تتجاوز مليارات التخمينات في الثانية. يدعم أكثر من 200 خوارزمية تجزئة ويعتمد عليه الباحثون في محطات عمل كسر كلمات المرور الجادة.",
      en: "The world's fastest password recovery tool, harnessing GPUs to crack password hashes at billions of guesses per second. It supports over 200 hashing algorithms and is the standard for serious credential-cracking workstations."
    },
    cmd: "hashcat -m 1000 hashes.txt rockyou.txt",
    cmdDesc: { ar: "كسر تجزئات NTLM بقاموس كلمات المرور", en: "Crack NTLM hashes with a password list" },
    tags: ["hashcat", "gpu", "passwords", "hash-cracking"]
  },
  {
    id: "t109",
    name: "Nikto",
    url: "https://cirt.net/Nikto2",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "ماسح ويب مفتوح المصدر يفحص خوادم الويب بحثًا عن ملفات خطيرة وإعدادات افتراضية غير آمنة وإصدارات برمجيات قديمة معروفة الثغرات. رغم قدمه يبقى الفحص الأولي السريع الذي يُجريه المختبرون على أي موقع قبل الانتقال لأدوات أعمق.",
      en: "A classic open-source web server scanner that checks for dangerous files, outdated software, misconfigurations, and thousands of known vulnerabilities. Despite its age it remains the quick first pass testers run against any web target before deeper tooling."
    },
    cmd: "nikto -h http://target",
    cmdDesc: { ar: "فحص خادم ويب بحثًا عن الثغرات الشائعة", en: "Scan a web server for common issues" },
    tags: ["nikto", "web-scanner", "cgi", "vulnerability"]
  },
  {
    id: "t110",
    name: "OpenVAS (Greenbone GVM)",
    url: "https://www.openvas.org",
    category: "pentest",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "مجموعة فحص ثغرات مفتوحة المصدر كاملة الميزات تحوّلت لاحقًا إلى منصة Greenbone Vulnerability Management، وتضم ماسحًا يغطي آلاف الثغرات عبر تغذية CVE وOVAL. بديل قوي ومجاني لـ Nessus في المختبرات المنزلية وفرق الأمن الصغيرة.",
      en: "A full-featured open-source vulnerability scanning suite that evolved into Greenbone Vulnerability Management (GVM), fed by a large feed of CVE and OVAL tests. It is a capable free alternative to Nessus for home labs and small security teams."
    },
    cmd: "gvm-start",
    cmdDesc: { ar: "تشغيل خدمات Greenbone/OpenVAS", en: "Start the Greenbone/OpenVAS services" },
    tags: ["openvas", "gvm", "vulnerability-scanner", "greenbone"]
  },
  {
    id: "t111",
    name: "Nessus Essentials",
    url: "https://www.tenable.com/products/nessus/nessus-essentials",
    category: "pentest",
    platform: ["cross"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "النسخة المجانية من ماسح الثغرات الأشهر Nessus من شركة Tenable، وهي مخصصة للاستخدام الشخصي والتعليمي حتى 16 هدفًا مع كشف عشرات آلاف الثغرات والتكوينات الخاطئة. يُعد Nessus المعيار المؤسسي الذي تبدأ به معظم تقييمات الأمن.",
      en: "The free tier of Tenable's famous Nessus vulnerability scanner, limited to 16 assets for personal and educational use while still detecting tens of thousands of CVEs and misconfigurations. Nessus itself is the enterprise benchmark most assessments begin with."
    },
    cmd: "systemctl start nessusd",
    cmdDesc: { ar: "تشغيل خدمة خادم Nessus", en: "Start the Nessus scanner service" },
    tags: ["nessus", "tenable", "vulnerability-scanner", "cve"]
  },
  {
    id: "t112",
    name: "Nuclei",
    url: "https://github.com/projectdiscovery/nuclei",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "ماسح ثغرات سريع قائم على قوالب YAML يكتبها مجتمع ضخم، فيستطيع فحص آلاف الأهداف بحثًا عن ثغرات معروفة وإفصاحات ومفاتيح مسربة بسرعة هائلة. صار معيارًا في مشاريع البحث عن الثغرات واسعة النطاق (Bug Bounty).",
      en: "A fast template-driven vulnerability scanner where a large community writes YAML detections for CVEs, exposures, and leaked keys, allowing rapid scanning of thousands of targets. It has become the standard engine for large-scale bug bounty reconnaissance."
    },
    cmd: "nuclei -u https://target -t cves/",
    cmdDesc: { ar: "فحص هدف بقوالب ثغرات CVE", en: "Scan a target with the CVE templates" },
    tags: ["nuclei", "templates", "recon", "cve"]
  },
  {
    id: "t113",
    name: "Shodan",
    url: "https://www.shodan.io",
    category: "pentest",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "محرك بحث لأجهزة الإنترنت المتصلة يفهرس الراوترات والكاميرات والخوادم وأجهزة إنترنت الأشياء عبر اللافتات (Banners) التي تجمعها بواباته، فيكشف الأنظمة المكشوفة بكلمات مرور افتراضية. أداة لا غنى عنها لرسم سطح هجوم المنظمة قبل أن يجدها المهاجمون.",
      en: "A search engine for internet-connected devices that indexes banners from routers, cameras, servers, and IoT gear, exposing systems left open with default credentials. It is essential for mapping your attack surface before attackers find the same assets."
    },
    cmd: "shodan search \"apache country:SA\"",
    cmdDesc: { ar: "البحث في Shodan عن خوادم Apache في بلد محدد", en: "Search Shodan for Apache servers in a country" },
    tags: ["shodan", "search-engine", "iot", "recon"]
  },
  {
    id: "t114",
    name: "Censys",
    url: "https://censys.io",
    category: "pentest",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "محرك بحث أكاديمي المنشأ يفهرس شهادات TLS والخدمات المكشوفة على الإنترنت عبر المسح المستمر لكامل فضاء العناوين مع بيانات دقيقة عن الأصول. يُستخدم للعثور على الأصول غير الموثقة والشهادات المنتهية والخدمات المكشوفة بأسلوب منظم.",
      en: "An internet-wide scanning search engine born from academic research that indexes TLS certificates and exposed services across the entire address space with rich asset metadata. Teams use it to hunt shadow IT assets, expiring certificates, and exposed services."
    },
    cmd: "censys search services",
    cmdDesc: { ar: "الاستعلام عن الخدمات المكشوفة عبر واجهة Censys", en: "Query exposed services via the Censys CLI" },
    tags: ["censys", "search-engine", "certificates", "recon"]
  },
  {
    id: "t115",
    name: "SearchSploit",
    url: "https://www.exploit-db.com/searchsploit",
    category: "pentest",
    platform: ["linux"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "نسخة سطر الأوامر من قاعدة بيانات Exploit-DB التي تجمع آلاف الاستغلالات الجاهزة المنشورة علنًا، فتتيح البحث المحلي عن ثغرات أي برنامج دون اتصال بالإنترنت. مثبتة افتراضيًا في Kali وتُخرج المسار المباشر لملف الاستغلال المراد تشغيله.",
      en: "The command-line copy of the Exploit-DB archive of thousands of ready-made public exploits, letting you search offline for vulnerabilities in any software product. It ships by default on Kali Linux and prints the exact file path of the exploit to run."
    },
    cmd: "searchsploit remote desktop",
    cmdDesc: { ar: "البحث محليًا عن استغلالات Remote Desktop", en: "Search locally for Remote Desktop exploits" },
    tags: ["searchsploit", "exploit-db", "cve", "offline"]
  },
  {
    id: "t116",
    name: "RouterSploit",
    url: "https://github.com/threat9/routersploit",
    category: "pentest",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "إطار استغلال يشبه Metasploit لكنه مخصص للأجهزة المدمجة كالراوترات والكاميرات وأجهزة إنترنت الأشياء، إذ يحوي مئات الاستغلالات لثغرات البرامج الثابتة وبيانات الدخول الافتراضية. يُستخدم لتقييم أمان عتاد الشبكات المنزلية والصغيرة.",
      en: "A Metasploit-like exploitation framework dedicated to embedded devices such as routers, cameras, and IoT gear, packing hundreds of exploits for firmware flaws and default credentials. It is the go-to for auditing home and small-business network hardware."
    },
    cmd: "routersploit",
    cmdDesc: { ar: "تشغيل وحدة RouterSploit التفاعلية", en: "Launch the RouterSploit interactive console" },
    tags: ["routersploit", "embedded", "routers", "iot"]
  },
  {
    id: "t117",
    name: "Social-Engineer Toolkit (SET)",
    url: "https://github.com/trustedsec/social-engineer-toolkit",
    category: "pentest",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار أدوات من TrustedSec لهندسة هجمات الهندسة الاجتماعية مثل استنساخ صفحات التصيد وتوليد الحِمل الخبيثة وسيناريوهات USB. يُستخدم في اختبارات الوعي الأمني لمحاكاة أساليب المهاجمين الفعلية على الموظفين بشكل أخلاقي ومضبوط.",
      en: "TrustedSec's toolkit for orchestrating social-engineering attacks, from cloned phishing pages to malicious payload generation and USB drop scenarios. It powers authorized security-awareness testing that mimics real attacker playbooks."
    },
    cmd: "setoolkit",
    cmdDesc: { ar: "فتح قوائم Social-Engineer Toolkit", en: "Open the SET attack menus" },
    tags: ["set", "social-engineering", "phishing", "payloads"]
  },
  {
    id: "t118",
    name: "BeEF",
    url: "https://beefproject.com",
    category: "pentest",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار استغلال المتصفح (Browser Exploitation Framework) الذي يتحكم في المتصفحات المصابة بثغرات XSS عبر مئات وحدات الأوامر من مسح المنافذ إلى سرقة الجلسات. يوضح عمليًا خطورة حقن السكربتات بتحويل متصفح الضحية إلى نقطة انطلاق داخل الشبكة.",
      en: "The Browser Exploitation Framework that hooks browsers via XSS vulnerabilities and drives them with hundreds of command modules from port scanning to session theft. It vividly demonstrates why cross-site scripting matters by turning a browser into a foothold."
    },
    cmd: "beef-xss",
    cmdDesc: { ar: "تشغيل خادم BeEF على Kali Linux", en: "Start the BeEF server on Kali Linux" },
    tags: ["beef", "xss", "browser", "exploitation"]
  },
  {
    id: "t119",
    name: "WPScan",
    url: "https://wpscan.com",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "ماسح مخصص لمواقع WordPress يُعدّد الإضافات والقوالب والمستخدمين ثم يطابقها مع قاعدة ثغراته ومكشوفات مفاتيح API. أداة إلزامية عند اختبار أي موقع يُدار بـ WordPress الذي يشغّل قرابة ثلث الويب.",
      en: "A WordPress-specific black-box scanner that enumerates plugins, themes, and users, then matches them against its vulnerability database and exposed API keys. It is mandatory when testing any WordPress site, given the CMS powers about a third of the web."
    },
    cmd: "wpscan --url http://target --enumerate u",
    cmdDesc: { ar: "فحص موقع WordPress وتعداد مستخدميه", en: "Scan a WordPress site and enumerate users" },
    tags: ["wpscan", "wordpress", "cms", "enumeration"]
  },
  {
    id: "t120",
    name: "Gobuster",
    url: "https://github.com/OJ/gobuster",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة مكتوبة بلغة Go لاكتشاف المجلدات والملفات المخفية والنطاقات الفرعية في المواقع عبر قوائم كلمات بسرعة تناصف أقوى الأدوات. تعتمد على الطلبات المتزامنة بالتوازي فتغطي آلاف المسارات خلال ثوانٍ معدودة.",
      en: "A Go-based directory, DNS, and virtual-host brute-forcer that uncovers hidden files and folders on websites using wordlists. Its concurrent request engine covers thousands of paths per second during reconnaissance."
    },
    cmd: "gobuster dir -u http://target -w common.txt",
    cmdDesc: { ar: "اكتشاف مسارات مخفية بموقع بقائمة كلمات", en: "Discover hidden paths on a site with a wordlist" },
    tags: ["gobuster", "fuzzing", "directories", "recon"]
  },
  {
    id: "t121",
    name: "ffuf",
    url: "https://github.com/ffuf/ffuf",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة Fuzzer للويب مكتوبة بلغة Go تُعد الأسرع في اكتشاف المسارات والمعاملات والوسطاء الافتراضيين عبر طلبات متوازية كثيفة. لغة القوالب المرنة فيها تجعلها قابلة لاختبار الصفحات وواجهات API بتغيير موضع كلمة FUZZ.",
      en: "A lightning-fast Go web fuzzer for discovering paths, parameters, and virtual hosts through massive parallel requests. Its flexible keyword templating lets you probe pages and APIs by simply moving the FUZZ placeholder."
    },
    cmd: "ffuf -u http://target/FUZZ -w words.txt",
    cmdDesc: { ar: "تعمية عناوين URL بقائمة كلمات لاكتشاف المسارات", en: "Fuzz URLs with a wordlist to find hidden paths" },
    tags: ["ffuf", "fuzzing", "recon", "web"]
  },
  {
    id: "t122",
    name: "OWASP Amass",
    url: "https://owasp.org/www-project-amass/",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة من مشروع OWASP لجمع المعلومات الاستخبارية عن نطاق ما من مصادر متعددة كمحركات البحث وسجلات الشفافية وواجهات DNS، فتكتشف النطاقات الفرعية غير الموثقة. تُعد المرجع الأول في رسم سطح الهجوم وجرد الأصول الخارجية.",
      en: "An OWASP project for in-depth DNS enumeration and OSINT collection that merges search engines, certificate transparency logs, and APIs to map every subdomain of a target. It is the reference tool for attack-surface discovery and external asset inventory."
    },
    cmd: "amass enum -d example.com",
    cmdDesc: { ar: "تعداد نطاقات فرعية لنطاق معين", en: "Enumerate subdomains for a domain" },
    tags: ["amass", "osint", "subdomains", "recon"]
  },
  {
    id: "t123",
    name: "Sublist3r",
    url: "https://github.com/aboul3la/Sublist3r",
    category: "pentest",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة Python خفيفة تستعلم محركات البحث ومواقع تحليل الشهادات وقواعد بيانات الأمان لاستخراج النطاقات الفرعية لأي نطاق. حل سريع وعملي للمسح الأولي لسطح الهجوم دون تعقيدات الأطر الأثقل.",
      en: "A lightweight Python tool that queries Google, Bing, VirusTotal, and certificate transparency sources to enumerate subdomains of any domain. It is a quick first-pass option for attack-surface mapping before heavier frameworks."
    },
    cmd: "sublist3r -d example.com",
    cmdDesc: { ar: "استخراج النطاقات الفرعية لموقع ما", en: "Extract subdomains for a domain" },
    tags: ["sublist3r", "subdomains", "osint", "recon"]
  },
  {
    id: "t124",
    name: "Responder",
    url: "https://github.com/lgandx/Responder",
    category: "pentest",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة تسميم بروتوكولات LLMNR وNBT-NS وmDNS في شبكات ويندوز لخطف طلبات المصادقة NTLM وحصاد تجزئات بيانات الاعتماد أثناء اختبارات الاختراق الداخلية. تكشف عادة كلمات مرور قابلة للكسر تُظهر خطورة بروتوكولات حل الأسماء بالبث.",
      en: "An LLMNR/NBT-NS/MDNS poisoner that intercepts Windows authentication requests on the LAN and captures crackable NTLM hashes during internal penetration tests. It routinely proves how dangerous broadcast name-resolution protocols are."
    },
    cmd: "sudo responder -I eth0",
    cmdDesc: { ar: "تشغيل Responder على الواجهة eth0 لتسميم حل الأسماء", en: "Run Responder on eth0 to poison name resolution" },
    tags: ["responder", "llmnr", "ntlm", "poisoning"]
  },
  {
    id: "t125",
    name: "CrackMapExec",
    url: "https://github.com/byt3bl33d3r/CrackMapExec",
    category: "pentest",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة ما بعد الاختراق متعددة الأغراض تتحقق من صحة بيانات الدخول عبر SMB وWinRM وLDAP على شريحة كاملة بضربة واحدة، فاستحقت لقب سكين الجيش السويسري لهجمات الشبكات الداخلية. وقد خلفها المشروع المحدَّث NetExec بعد توقف تطويرها.",
      en: "A post-exploitation multitool that validates credentials and sprays logins across entire subnets via SMB, WinRM, and LDAP, earning its Swiss-Army-knife reputation for internal network attacks. The community successor NetExec continues development today."
    },
    cmd: "crackmapexec smb 192.168.1.0/24 -u user -p pass",
    cmdDesc: { ar: "التحقق من بيانات دخول على شريحة SMB كاملة", en: "Validate credentials across an SMB subnet" },
    tags: ["crackmapexec", "smb", "post-exploitation", "windows"]
  },

  // ── Webproxy / الوكلاء والاعتراض ──────────────────────────────────────
  {
    id: "t126",
    name: "mitmproxy",
    url: "https://mitmproxy.org",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "وكيل HTTP تفاعلي مفتوح المصدر يتيح اعتراض وفحص وتعديل حركة الويب بما فيها HTTPS عبر واجهة طرفية أو واجهة ويب. يضم سكربتات Python قابلة للتخصيص بالكامل لتحويله إلى مراقب آلي أو مولّد سيناريوهات اختبار.",
      en: "A free interactive HTTPS-capable intercepting proxy for inspecting and rewriting web traffic from a terminal or web UI. Its Python scripting add-ons turn it into an automated traffic transformer or a test-scenario engine."
    },
    cmd: "mitmproxy",
    cmdDesc: { ar: "تشغيل الوكيل الاعتراضي التفاعلي على المنفذ 8080", en: "Start the interactive intercepting proxy on port 8080" },
    tags: ["mitmproxy", "mitm", "https", "python"]
  },
  {
    id: "t127",
    name: "Fiddler Classic",
    url: "https://www.telerik.com/fiddler/fiddler-classic",
    category: "webproxy",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "وكيل تصحيح ويب مجاني عريق لويندوز يعرض كل حركة HTTP/HTTPS في جلسات قابلة للفحص والتعديل وإعادة الإرسال يدويًا. رفيق مطوري الويب منذ سنوات طويلة قبل ظهور البدائل الحديثة متعددة المنصات.",
      en: "The veteran free Windows-only web debugging proxy that lists every HTTP/HTTPS session for inspection, editing, and replay. It has been a web developer's companion for years before modern cross-platform alternatives appeared."
    },
    cmd: "fiddler",
    cmdDesc: { ar: "تشغيل Fiddler Classic لالتقاط حركة الويب", en: "Launch Fiddler Classic to capture web traffic" },
    tags: ["fiddler", "debugging", "http", "windows"]
  },
  {
    id: "t128",
    name: "Fiddler Everywhere",
    url: "https://www.telerik.com/fiddler/fiddler-everywhere",
    category: "webproxy",
    platform: ["cross"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "الجيل الجديد من Fiddler متعدد المنصات لاعتراض حركة HTTP/HTTPS وفحصها وتعديلها مع مشاركة الجلسات بين الأجهزة عبر السحابة. الوضع المجاني محدود بعدد جلسات يوميًا بينما تفتح الخطوط المدفوعة كل الميزات.",
      en: "The modern cross-platform rebuild of Fiddler for capturing, inspecting, and editing HTTP/HTTPS traffic, with cloud session sharing across devices. The free tier allows a handful of sessions per day, while paid plans unlock unlimited use."
    },
    cmd: "curl -x http://localhost:8866 https://example.com",
    cmdDesc: { ar: "تمرير طلب عبر وكيل Fiddler Everywhere المحلي", en: "Route a request through the local Fiddler proxy" },
    tags: ["fiddler", "debugging", "http", "cross-platform"]
  },
  {
    id: "t129",
    name: "Charles Proxy",
    url: "https://www.charlesproxy.com",
    category: "webproxy",
    platform: ["cross"],
    license: "paid",
    difficulty: 2,
    desc: {
      ar: "وكيل تصحيح HTTP للمطورين على ويندوز وماك ولينكس، يعرض الطلبات والاستجابات بتنسيق واضح ويدعم خفض السرعة لمحاكاة الشبكات البطيئة. مدفوع بعد تجربة 30 يومًا ومحبوب جدًا لدى مطوري تطبيقات الجوال.",
      en: "A polished HTTP debugging proxy for Windows, macOS, and Linux that pretty-prints requests and responses and can throttle bandwidth to simulate slow networks. It is paid after a 30-day trial and is beloved by mobile app developers."
    },
    cmd: "curl -x http://localhost:8888 https://example.com",
    cmdDesc: { ar: "إرسال طلب عبر منفذ Charles الافتراضي 8888", en: "Send a request through Charles' default port 8888" },
    tags: ["charles", "proxy", "http", "debugging"]
  },
  {
    id: "t130",
    name: "OWASP ZAP",
    url: "https://www.zaproxy.org",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "وكيل هجوم Zed من OWASP مفتوح المصدر يعترض حركة الويب ويفحصها أمنيًا، ويعمل بواجهة رسومية أو وضع خفي يتكامل مع خطوط CI/CD. البديل المجاني الرائد لـ Burp Suite في التعلم والفحص الآلي.",
      en: "The OWASP Zed Attack Proxy is a free, open-source web proxy that intercepts traffic and actively scans for vulnerabilities, working as a GUI app or a headless daemon in CI pipelines. It is the leading free alternative to Burp Suite."
    },
    cmd: "zap.sh -cmd -quickurl https://target",
    cmdDesc: { ar: "فحص سريع لهدف في وضع سطر الأوامر", en: "Run a quick headless scan against a target" },
    tags: ["zap", "owasp", "webproxy", "scanner"]
  },
  {
    id: "t131",
    name: "Proxyman",
    url: "https://proxyman.io",
    category: "webproxy",
    platform: ["mac"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "وكيل تصحيح HTTP/HTTPS أصلي لـ macOS بواجهة أنيقة على طراز تطبيقات آبل مع أدوات تلاعب بالطلبات وسكربتات JavaScript مخصصة. الخطة المجانية تكفي للتجربة بينما تفتح الخطة المدفوعة ميزات سير العمل المهنية.",
      en: "A native macOS HTTP/HTTPS debugging proxy with an Apple-style polished UI, powerful request rewriting tools, and JavaScript scripting support. Its free plan suits evaluation, while the paid tier targets professional workflows."
    },
    cmd: "proxyman",
    cmdDesc: { ar: "تشغيل Proxyman لالتقاط حركة ماك", en: "Launch Proxyman to capture macOS traffic" },
    tags: ["proxyman", "macos", "debugging", "https"]
  },
  {
    id: "t132",
    name: "HTTP Toolkit",
    url: "https://httptoolkit.com",
    category: "webproxy",
    platform: ["cross"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "أداة اعتراض HTTP مفتوحة المصدر بنقرة واحدة؛ تفتح متصفحًا أو طرفية أو حتى هاتف أندرويد مُعدًا مسبقًا ليُرصد داخل واجهة واحدة دون إعدادات شهادات يدوية. الوضع المجاني سخي والنسخة المدفوعة تضيف الأتمتة والاستخدام غير المحدود.",
      en: "Open-source one-click HTTP interception that spins up a pre-configured browser, terminal, or Android device and shows every request in a clean GUI with zero manual certificate setup. The free tier is generous, while Pro adds automation and unlimited interception."
    },
    cmd: "httptoolkit",
    cmdDesc: { ar: "تشغيل HTTP Toolkit لبدء جلسة اعتراض", en: "Launch HTTP Toolkit to start an intercepting session" },
    tags: ["httptoolkit", "interception", "https", "debugging"]
  },
  {
    id: "t133",
    name: "Reqable",
    url: "https://reqable.com",
    category: "webproxy",
    platform: ["cross"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "أداة اعتراض وتصحيح HTTP/API حديثة بواجهة رشيقة تعرض طلبات REST وGraphQL وWebSocket بوضوح مع أدوات Mocking واختبار الأداء. تُعد بديلًا صاعدًا لـ Charles وFiddler بحد مجاني سخي للمطورين.",
      en: "A modern API debugging proxy that captures and inspects HTTP/HTTPS, REST, GraphQL, and WebSocket traffic with built-in mock and throttling tools. It is a rising Charles/Fiddler alternative with a generous free tier for developers."
    },
    cmd: "curl -x http://localhost:9000 https://example.com",
    cmdDesc: { ar: "تمرير طلب عبر وكيل Reqable على المنفذ 9000", en: "Route a request through Reqable on port 9000" },
    tags: ["reqable", "api", "debugging", "proxy"]
  },
  {
    id: "t134",
    name: "whistle",
    url: "https://wproxy.org",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "وكيل تصحيح شامل مكتوب بـ Node.js يتحكم بالطلبات عبر ملف قواعد مرن يُعيد توجيه المواقع أو يستبدل الردود أو يحاكي الأعطال بديلًا عن Fiddler. يُدار عبر واجهة ويب ويدعم HTTPS وWebSocket بالكامل.",
      en: "A Node.js cross-platform debugging proxy controlled by a powerful rules file that rewrites, rescripts, or mocks responses, making it a Fiddler alternative for developers. It is managed through a web UI with full HTTPS and WebSocket support."
    },
    cmd: "w2 start",
    cmdDesc: { ar: "تشغيل whistle وتشغيل واجهته الإدارية", en: "Start whistle and its admin web UI" },
    tags: ["whistle", "nodejs", "proxy", "rules"]
  },
  {
    id: "t135",
    name: "Squid",
    url: "http://www.squid-cache.org",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "الوكيل الأمامي HTTP الأشهر في تاريخ الإنترنت؛ يُستخدم للتحكم بالوصول وتخزين المحتوى مؤقتًا لتسريع التصفح وحجب المواقع في الشركات والمدارس. يدعم قوائم تحكم معقدة (ACL) وتقنية SSL bump ومصادقة LDAP.",
      en: "The most deployed HTTP forward proxy on the internet, used for access control, content caching, and URL filtering in enterprises and schools. It supports rich ACLs, SSL bumping, and LDAP authentication."
    },
    cmd: "squid -k reconfigure",
    cmdDesc: { ar: "إعادة قراءة إعدادات Squid دون إيقافه", en: "Reload Squid configuration without downtime" },
    tags: ["squid", "forward-proxy", "cache", "http"]
  },
  {
    id: "t136",
    name: "Privoxy",
    url: "https://www.privoxy.org",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "وكيل خصوصية لا يخزّن المحتوى يرشّح الإعلانات وملفات التتبع والنوافذ المنبثقة على مستوى HTTP عبر آلاف القواعد القابلة للتخصيص. يُقرن غالبًا بـ Tor أو Squid لتنقية التصفح من المحتوى غير المرغوب.",
      en: "A non-caching privacy proxy that filters ads, trackers, and pop-ups at the HTTP layer using thousands of customizable rules. It is commonly chained with Tor or Squid to scrub browsing of unwanted content."
    },
    cmd: "privoxy /etc/privoxy/config",
    cmdDesc: { ar: "تشغيل Privoxy بملف الإعدادات الافتراضي", en: "Start Privoxy with its default config file" },
    tags: ["privoxy", "privacy", "filtering", "adblock"]
  },
  {
    id: "t137",
    name: "TinyProxy",
    url: "https://tinyproxy.github.io",
    category: "webproxy",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "وكيل HTTP خفيف الحجم جدًا مكتوب بلغة C صُمم للأجهزة الضعيفة والخوادم الصغيرة، فلا يستهلك ذاكرة تُذكر ويُضبط بملف إعداد واحد بسيط. الحل الأمثل لتشغيل وسيط ويب بسيط على راوتر أو خادم مدمج.",
      en: "A minimal C-language HTTP proxy designed for embedded boxes and small servers where Squid would be overkill, sipping memory and configured with one simple file. It is the ideal lightweight forward proxy for routers and VMs."
    },
    cmd: "tinyproxy -d",
    cmdDesc: { ar: "تشغيل TinyProxy في الوضع الأمامي دون فصل", en: "Run TinyProxy in the foreground" },
    tags: ["tinyproxy", "lightweight", "http-proxy", "posix"]
  },
  {
    id: "t138",
    name: "3proxy",
    url: "https://github.com/3proxy/3proxy",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "وكيل متعدد البروتوكولات فائق الخفة يدعم HTTP وSOCKS وبروكسيات البريد داخل ملف تنفيذي واحد يعمل على معظم الأنظمة. شائع كخادم وكلاء صغير على الخوادم الافتراضية ومشاريع التوجيه المنزلية.",
      en: "A tiny multi-protocol proxy daemon supporting HTTP, SOCKS, and mail proxies in a single binary that runs nearly everywhere. It is popular as a compact proxy server on VPS instances and routing projects."
    },
    cmd: "3proxy /etc/3proxy/3proxy.cfg",
    cmdDesc: { ar: "تشغيل 3proxy بملف الإعدادات", en: "Start 3proxy with its config file" },
    tags: ["3proxy", "multi-protocol", "socks", "lightweight"]
  },
  {
    id: "t139",
    name: "Shadowsocks-libev",
    url: "https://github.com/shadowsocks/shadowsocks-libev",
    category: "webproxy",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تنفيذ خفيف بلغة C لبروتوكول Shadowsocks الذي يمرر حركة SOCKS5 مشفّرة عبر الشبكات المقيدة، وهو مشهور بتجاوز التصفية. يعمل بثنائيات خادم وعميل منفصلة بأداء ممتاز حتى على الأجهزة الصغيرة.",
      en: "The lightweight C implementation of the Shadowsocks protocol that tunnels encrypted SOCKS5 traffic through restrictive networks, famous for censorship circumvention. Its split server/client design performs well even on modest hardware."
    },
    cmd: "ss-server -c /etc/shadowsocks/config.json",
    cmdDesc: { ar: "تشغيل خادم Shadowsocks بملف الإعدادات", en: "Start a Shadowsocks server from its config" },
    tags: ["shadowsocks", "socks5", "encryption", "proxy"]
  },
  {
    id: "t140",
    name: "redsocks",
    url: "https://github.com/darkk/redsocks",
    category: "webproxy",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة لينكس تحوّل أي اتصال TCP يمر عبر قواعد الجدار الناري إلى حركة عبر وكيل SOCKS أو HTTP فيما يُعرف بالوكيل الشفاف. تُستخدم لتوجيه حركة الشبكة المحلية بالكامل عبر وسيط دون تعديل كل تطبيق على حدة.",
      en: "A Linux transparent-redirector daemon that converts any TCP connection flowing through iptables into traffic via a SOCKS or HTTP proxy. It is how routers force whole-LAN traffic through an upstream proxy transparently."
    },
    cmd: "redsocks -c /etc/redsocks.conf",
    cmdDesc: { ar: "تشغيل redsocks بملف إعدادات التحويل", en: "Run redsocks with its redirect configuration" },
    tags: ["redsocks", "transparent-proxy", "redirect", "iptables"]
  },
  {
    id: "t141",
    name: "gost",
    url: "https://github.com/ginuerzh/gost",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة أنفاق ووكلاء مكتوبة بلغة Go تعمل كسلسلة وكلاء مرنة بين عشرات البروتوكولات من HTTP وSOCKS إلى Shadowsocks والترحيل عبر TLS. واجهتها سطر أوامر واحد يجعل بناء سلاسل الوكلاء المعقدة مسألة سطر واحد.",
      en: "A Go-based multi-protocol tunnel and relay that chains proxies across HTTP, SOCKS, Shadowsocks, and TLS in one command line. Its single-binary model turns building complex proxy chains into a one-liner."
    },
    cmd: "gost -L :8080 -F socks5://server:1080",
    cmdDesc: { ar: "إنشاء وكيل محلي يسلسل عبر SOCKS5 بعيد", en: "Create a local proxy chaining to a remote SOCKS5" },
    tags: ["gost", "tunnel", "relay", "proxy"]
  },
  {
    id: "t142",
    name: "chisel",
    url: "https://github.com/jpillora/chisel",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة نفق TCP/UDP فوق HTTP من ثنائية Go واحدة تنقل المنافذ بين الأجهزة، وتُستخدم كثيرًا في اختبارات الاختراق لفتح قنوات عكسية. بديل سريع وأخف من SSH في البيئات المقيدة.",
      en: "A TCP/UDP-over-HTTP tunnel from a single Go binary that forwards ports between machines and is heavily used in penetration tests for reverse tunnels. It serves as a fast, lightweight alternative to SSH in restricted environments."
    },
    cmd: "chisel server -p 8080 --reverse",
    cmdDesc: { ar: "تشغيل خادم chisel يدعم الأنفاق العكسية", en: "Start a chisel server allowing reverse tunnels" },
    tags: ["chisel", "tcp-tunnel", "http", "port-forwarding"]
  },
  {
    id: "t143",
    name: "proxify",
    url: "https://github.com/projectdiscovery/proxify",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "وكيل MITM من ProjectDiscovery يسجّل كل HTTP/HTTPS يمر عبره في ملفات منظمة قابلة للبحث لاحقًا مع خيار إعادة الإرسال عبر httpx أو إرسالها إلى قواعد بيانات. صُمم لسير عمل اختبار الاختراق القائم على الخطوط الأنابيبية.",
      en: "ProjectDiscovery's MITM proxy that records every HTTP/HTTPS request flowing through it into structured, greppable files ready for replay through httpx or shipping to a database. It is built for pipeline-style penetration-testing workflows."
    },
    cmd: "proxify -l 127.0.0.1:8888",
    cmdDesc: { ar: "تشغيل proxify كوكيل استماع محلي", en: "Start proxify as a local listening proxy" },
    tags: ["proxify", "mitm", "logging", "recon"]
  },
  {
    id: "t144",
    name: "stunnel",
    url: "https://www.stunnel.org",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة عريقة تغلّف أي اتصال TCP داخل تشفير TLS دون تعديل البرنامج الأصلي، فتحمي خدمات قديمة لا تدعم التشفير بطبيعتها. تُستخدم أيضًا كواجهة TLS أمام خوادم IMAP وRedis وغيرها.",
      en: "A veteran TLS wrapper that encrypts any TCP connection without touching the original application, protecting legacy protocols that lack native crypto. It is also used as an SSL frontend in front of IMAP, Redis, and similar services."
    },
    cmd: "stunnel /etc/stunnel/stunnel.conf",
    cmdDesc: { ar: "تشغيل stunnel بملف تعريف الأنفاق", en: "Run stunnel with its tunnel definitions" },
    tags: ["stunnel", "tls", "wrapper", "encryption"]
  },
  {
    id: "t145",
    name: "WireMock",
    url: "https://wiremock.org",
    category: "webproxy",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "خادم Mock لمحاكاة واجهات HTTP/HTTPS بقواعد مطابقة مرنة وردود مُبرمجة مسبقًا، فيتيح اختبار التطبيقات دون الاتصال بالخدمة الحقيقية. يدعم سيناريوهات التأخير والأخطاء وحالات الشبكة النادرة عند الطلب.",
      en: "A mock HTTP/HTTPS server for stubbing APIs with flexible request matching and preprogrammed responses, letting you test apps without the real backend. It can simulate latency, faults, and rare network states on demand."
    },
    cmd: "wiremock --port 8080",
    cmdDesc: { ar: "تشغيل خادم WireMock على المنفذ 8080", en: "Run WireMock on port 8080" },
    tags: ["wiremock", "mocking", "api", "testing"]
  },

  // ── Utility / أدوات النظام المدمجة ─────────────────────────────────────
  {
    id: "t146",
    name: "ping",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping",
    category: "utility",
    platform: ["cross"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أول أداة يتعلمها كل مهندس شبكات؛ ترسل حزم ICMP Echo لاختبار الوصول إلى عنوان وتقيس زمن الرحلة ونسبة فقد الحزم. حكمها الأولي — وصول ناجح أو مهلة زمنية أو تحليل خاطئ — يبدأ كل جلسة تشخيص تقريبًا.",
      en: "The first tool every network engineer learns, sending ICMP Echo requests to test reachability and report round-trip time and packet loss. Its instant verdict — reachable, timing out, or resolving wrong — starts nearly every troubleshooting session."
    },
    cmd: "ping -c 4 8.8.8.8",
    cmdDesc: { ar: "اختبار الوصول إلى خادم Google DNS بأربع حزم", en: "Test reachability of Google DNS with four packets" },
    tags: ["ping", "icmp", "connectivity", "diagnostics"]
  },
  {
    id: "t147",
    name: "traceroute",
    url: "https://man7.org/linux/man-pages/man8/traceroute.8.html",
    category: "utility",
    platform: ["linux", "mac"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة يونكس ترسم مسار الحزم حتى الهدف عبر قيم TTL متزايدة فتُظهر كل قفزة موجّه وزمن الاستجابة عندها. تُستخدم لتحديد القفزة التي يتوقف عندها المسار أو التي ترفع زمن الوصول في الشبكات العامة والخاصة.",
      en: "The Unix path-tracing tool that increments TTL to reveal each router hop toward a destination along with per-hop latency. It pinpoints exactly where traffic dies or where a slow link begins on public and private networks."
    },
    cmd: "traceroute 8.8.8.8",
    cmdDesc: { ar: "تتبع مسار الحزم حتى خادم DNS عام", en: "Trace the packet path to a public DNS server" },
    tags: ["traceroute", "routing", "path", "latency"]
  },
  {
    id: "t148",
    name: "tracert",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "النسخة المدمجة من أداة تتبع المسار في ويندوز، وتعمل بأسلوب ICMP بدل UDP مع TTL متزايد لتعريف كل موجّه على الطريق. خيارك الأول لرسم المسار من أي جهاز ويندوز دون تثبيت أي شيء.",
      en: "Windows' built-in route-tracing command that walks hop by hop to a destination using increasing TTL values over ICMP. It is your first diagnostic on any Windows box when a path needs to be mapped, with zero installation."
    },
    cmd: "tracert 8.8.8.8",
    cmdDesc: { ar: "تتبع المسار من ويندوز إلى هدف خارجي", en: "Trace the path from Windows to an external target" },
    tags: ["tracert", "windows", "routing", "path"]
  },
  {
    id: "t149",
    name: "tracepath",
    url: "https://man7.org/linux/man-pages/man8/tracepath.8.html",
    category: "utility",
    platform: ["linux"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة لينكس من حزمة iputils تكتشف المسار حتى الهدف كما يفعل traceroute لكن دون صلاحيات جذر، وتعرض أعلى MTU على الطريق. مفيدة جدًا في تشخيص مشاكل تجزئة الحزم في الأنفاق مثل VPN وPPPoE.",
      en: "An iputils utility that discovers the path to a destination without root privileges and reports the path MTU along the way. It is especially useful for diagnosing fragmentation problems in tunnels such as VPN and PPPoE."
    },
    cmd: "tracepath example.com",
    cmdDesc: { ar: "اكتشاف المسار وقيمة MTU حتى الهدف", en: "Discover the path and MTU to the target" },
    tags: ["tracepath", "mtu", "path-discovery", "linux"]
  },
  {
    id: "t150",
    name: "pathping",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/pathping",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة ويندوز تجمع بين traceroute وping معًا؛ ترسم المسار ثم ترسل مئات الحزم لكل قفزة لتقيس متوسط الفقد وزمن الاستجابة لكل موجّه. مثالية لتحديد القفزة المسببة لضعف الشبكة بشكل إحصائي موثوق.",
      en: "A Windows command combining traceroute and ping: it maps the route then floods each hop with packets to compute per-router loss and latency statistics. It is ideal for statistically identifying which hop degrades a connection."
    },
    cmd: "pathping 8.8.8.8",
    cmdDesc: { ar: "قياس الفقد والزمن لكل قفزة على المسار", en: "Measure loss and latency per hop along the path" },
    tags: ["pathping", "windows", "latency", "loss"]
  },
  {
    id: "t151",
    name: "ipconfig",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "الأداة المدمجة في ويندوز لعرض إعدادات IP لكل واجهة وتجديد عناوين DHCP وإفراغ ذاكرة DNS المؤقتة. خطوة التشخيص الأولى لكل مشكلة شبكة على أجهزة ويندوز بلا استثناء.",
      en: "Windows' built-in command that shows per-interface IP settings, renews DHCP leases, and flushes the DNS resolver cache. It is the mandatory first check for any connectivity complaint on a Windows machine."
    },
    cmd: "ipconfig /all",
    cmdDesc: { ar: "عرض إعدادات IP كاملة لكل المحولات", en: "Show full IP configuration for all adapters" },
    tags: ["ipconfig", "windows", "ip-address", "dhcp"]
  },
  {
    id: "t152",
    name: "ifconfig",
    url: "https://net-tools.github.io/",
    category: "utility",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "الأداة التقليدية لعرض وتعديل واجهات الشبكة وعناوينها في يونكس، وقد أصبحت مهجورة لصالح ip الأقدر لكنها لا تزال منتشرة. تعلّم قراءتها ضروري لأنها موجودة على ملايين الخوادم وفي كل الدروس القديمة.",
      en: "The classic Unix tool for viewing and configuring network interfaces and their addresses, now deprecated in favor of iproute2 but still everywhere. Every engineer must read it fluently on legacy servers and older tutorials."
    },
    cmd: "ifconfig eth0",
    cmdDesc: { ar: "عرض إعدادات الواجهة eth0", en: "Show the configuration of interface eth0" },
    tags: ["ifconfig", "net-tools", "interfaces", "legacy"]
  },
  {
    id: "t153",
    name: "ip (iproute2)",
    url: "https://wiki.linuxfoundation.org/networking/iproute2",
    category: "utility",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "الأداة الحديثة لإدارة الشبكة في لينكس من حزمة iproute2؛ أداة واحدة تستعرض الواجهات والعناوين والمسارات والجيران بدل ifconfig وroute وarp مجتمعة. أساس سير العمل في إدارة لينكس الحديثة وشبكات الحاويات.",
      en: "The modern Linux networking Swiss Army knife from iproute2 that replaces ifconfig, route, and arp with one tool covering addresses, links, routes, and neighbors. It underpins contemporary Linux administration and container networking."
    },
    cmd: "ip addr show",
    cmdDesc: { ar: "عرض عناوين IP لكل الواجهات", en: "List IP addresses of all interfaces" },
    tags: ["iproute2", "ip", "routing", "linux"]
  },
  {
    id: "t154",
    name: "netstat",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat",
    category: "utility",
    platform: ["cross"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة إحصاءات الشبكة الكلاسيكية التي تعرض الاتصالات الجارية والمنافذ المفتوحة وجداول التوجيه على ويندوز ولينكس وماك. ما زالت عملية وسريعة رغم أن أداة ss في لينكس تجاوزتها أداءً اليوم.",
      en: "The classic network statistics command showing active connections, listening ports, and routing tables across Windows, Linux, and macOS. It remains universally handy even though Linux's ss has outpaced it."
    },
    cmd: "netstat -an",
    cmdDesc: { ar: "عرض كل الاتصالات والمنافذ بأطوارها", en: "List all connections and ports with their states" },
    tags: ["netstat", "connections", "ports", "statistics"]
  },
  {
    id: "t155",
    name: "ss",
    url: "https://man7.org/linux/man-pages/man8/ss.8.html",
    category: "utility",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "بديل netstat في حزمة iproute2 يستعرض المقابس (Sockets) بسرعة أكبر بكثير مع تفاصيل العمليات المالكة والمنافذ المستمعة. أداة يومية لفحص من يستمع على منفذ ومن يتصل بمن.",
      en: "The iproute2 socket-statistics replacement for netstat that lists sockets much faster, including owning processes and listening ports. It is the daily driver for checking which daemon owns a port and who is connected to it."
    },
    cmd: "ss -tulnp",
    cmdDesc: { ar: "عرض المنافذ المستمعة والعمليات المالكة لها", en: "Show listening ports and their owning processes" },
    tags: ["ss", "sockets", "iproute2", "connections"]
  },
  {
    id: "t156",
    name: "arp",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/arp",
    category: "utility",
    platform: ["cross"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أداة عرض وتعديل جدول ARP الذي يربط عناوين IP بعناوين MAC في الشبكة المحلية. فحصها يكشف أخطاء الربط، وفي الشبكات الصغيرة يكشف أيضًا مؤشرات تسميم ARP أمنيًا.",
      en: "The command that displays and edits the ARP table mapping IP addresses to MAC addresses on the local segment. Inspecting it reveals mapping mistakes and, in smaller networks, signs of ARP poisoning."
    },
    cmd: "arp -a",
    cmdDesc: { ar: "عرض جدول ARP الحالي كاملًا", en: "Display the full current ARP table" },
    tags: ["arp", "mac-address", "neighbors", "layer2"]
  },
  {
    id: "t157",
    name: "route",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/route",
    category: "utility",
    platform: ["cross"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "الأداة التقليدية لعرض جدول التوجيه وإضافة مسارات ثابتة يدويًا في ويندوز ويونكس. تُظهر البوابة الافتراضية وتشكل خط الأساس لكل تشخيص توجيه قبل أدوات أعمق.",
      en: "The traditional command for displaying the routing table and adding static routes on Windows and Unix systems. It reveals the default gateway and forms the baseline of every routing troubleshooting session."
    },
    cmd: "route print",
    cmdDesc: { ar: "طباعة جدول التوجيه في ويندوز", en: "Print the Windows routing table" },
    tags: ["route", "routing-table", "gateway", "diagnostics"]
  },
  {
    id: "t158",
    name: "nbtstat",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nbtstat",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة ويندوز لعرض إحصاءات NetBIOS عبر TCP/IP وأسماء الأجهزة المخزنة وجداول الأسماء للمضيفين البعيدين. مفيدة في بيئات ويندوز القديمة عند تشخيص حل الأسماء التقليدي قبل أن يستحوذ DNS.",
      en: "A Windows utility that displays NetBIOS-over-TCP/IP statistics, cached remote names, and name tables of remote hosts. It is useful in older Windows environments when troubleshooting legacy name resolution."
    },
    cmd: "nbtstat -n",
    cmdDesc: { ar: "عرض أسماء NetBIOS المسجلة محليًا", en: "Show locally registered NetBIOS names" },
    tags: ["nbtstat", "netbios", "windows", "names"]
  },
  {
    id: "t159",
    name: "getmac",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/getmac",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر ويندوز الذي يرجع عناوين MAC لكل محولات الجهاز بصيغ متعددة مع تسمية واضحة لكل واجهة. أسرع وسيلة لجمع عناوين MAC لأغراض الجرد أو التراخيص المرتبطة بالعتاد.",
      en: "A Windows command returning the MAC addresses of all adapters in multiple formats with clear per-interface labels. It is the quickest way to gather hardware addresses for inventory or license binding."
    },
    cmd: "getmac /v",
    cmdDesc: { ar: "عرض عناوين MAC بتفصيل لكل محول", en: "List MAC addresses verbosely per adapter" },
    tags: ["getmac", "mac-address", "windows", "inventory"]
  },
  {
    id: "t160",
    name: "hostname",
    url: "https://man7.org/linux/man-pages/man1/hostname.1.html",
    category: "utility",
    platform: ["cross"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر صغير موجود على كل نظام تشغيل يعرض اسم الجهاز الحالي أو يضبطه مؤقتًا. تعتمد عليه السكربتات بكثافة لختم هوية المضيف في التقارير والسجلات.",
      en: "A tiny command present on every operating system that prints or temporarily sets the machine's host name. Scripts lean on it constantly to stamp host identity into logs and reports."
    },
    cmd: "hostname",
    cmdDesc: { ar: "عرض اسم الجهاز الحالي", en: "Print the current host name" },
    tags: ["hostname", "dns", "identity", "shell"]
  },
  {
    id: "t161",
    name: "netsh",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netsh",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة سطر الأوامر الشاملة لكل إعدادات شبكة ويندوز: من عناوين IP وقواعد الجدار الناري إلى ملفات WLAN والوكلاء. سياقاتها المتداخلة تجعلها أقوى مظلة تشخيص وضبط في نظام ويندوز.",
      en: "Windows' all-encompassing networking shell scripting IP settings, firewall rules, WLAN profiles, and proxies from one context-driven CLI. Its nested contexts make it the most powerful configuration umbrella on the OS."
    },
    cmd: "netsh wlan show profiles",
    cmdDesc: { ar: "عرض شبكات Wi-Fi المحفوظة على الجهاز", en: "List saved Wi-Fi profiles on the machine" },
    tags: ["netsh", "windows", "configuration", "wlan"]
  },
  {
    id: "t162",
    name: "ethtool",
    url: "https://mirrors.edge.kernel.org/pub/software/network/ethtool/",
    category: "utility",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة لينكس للاستعلام عن حالة محول الشبكة وتعديل سرعته ووضع الدوبلكس وإعدادات إلغاء التحميل وإحصاءات الأخطاء. أول ما تفتحه عند الشك في مشكلة فيزيائية في المنفذ أو الكابل.",
      en: "The Linux tool for querying and changing NIC parameters such as link speed, duplex mode, offloads, and error counters. It is the first stop whenever a physical-layer or cabling problem is suspected."
    },
    cmd: "ethtool eth0",
    cmdDesc: { ar: "عرض حالة الوصلة وسرعة eth0", en: "Show link status and speed of eth0" },
    tags: ["ethtool", "nic", "speed", "duplex"]
  },
  {
    id: "t163",
    name: "tcping",
    url: "https://www.elifulkerson.com/projects/tcping.php",
    category: "utility",
    platform: ["windows", "mac"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة صغيرة من Eli Fulkerson تعمل ping على مستوى TCP نحو منفذ محدد بدل ICMP الذي تحجبه الجدران النارية عادة. تحل محل ping في قياس زمن إنشاء الاتصال وتوافر الخدمات.",
      en: "Eli Fulkerson's tiny utility that 'pings' a TCP port instead of ICMP, sidestepping firewalls that block traditional pings. It measures connection-establishment time and service availability where ping fails."
    },
    cmd: "tcping www.google.com 443",
    cmdDesc: { ar: "اختبار توافر منفذ 443 عبر TCP", en: "Check availability of port 443 over TCP" },
    tags: ["tcping", "tcp", "latency", "connectivity"]
  },
  {
    id: "t164",
    name: "PsPing",
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/psping",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة Sysinternals من Mark Russinovich تدمج ping وقياس TCP وقياسات الخادم في ملف تنفيذي واحد بدقة توقيت عالية. تُستخدم لقياسات زمن الدورة الدقيقة على ويندوز خلال اختبارات الأداء.",
      en: "Mark Russinovich's Sysinternals tool combining ICMP ping, TCP ping, and latency/bandwidth measurement modes in one executable. It delivers high-resolution timing tests on Windows during performance work."
    },
    cmd: "psping www.google.com:443",
    cmdDesc: { ar: "قياس زمن الاتصال بمنفذ 443 عبر PsPing", en: "Measure connection time to port 443 with PsPing" },
    tags: ["psping", "sysinternals", "tcp", "latency"]
  },
  {
    id: "t165",
    name: "Test-NetConnection",
    url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر PowerShell الحديث الذي يدمج ping وفحص المنفذ وتتبع المسار وحل الأسماء في اختبار واحد نظيف. الأسلوب الموصى به اليوم بدل عادة telend القديمة في فحص المنافذ على ويندوز.",
      en: "The modern PowerShell cmdlet bundling ping, port testing, route tracing, and DNS resolution into one clean diagnostic. It is today's recommended replacement for the old telnet port-checking habit."
    },
    cmd: "Test-NetConnection 8.8.8.8 -Port 443",
    cmdDesc: { ar: "فحص الوصول إلى منفذ 443 على خادم بعيد", en: "Test remote port 443 reachability" },
    tags: ["powershell", "test-netconnection", "tcp", "diagnostics"]
  },
  {
    id: "t166",
    name: "Get-NetIPConfiguration",
    url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-netipconfiguration",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر PowerShell يجمع كل إعدادات IP للجهاز من عناوين وبوابات وخوادم DNS في عرض واحد شامل. يشبه ipconfig /all لكنه بتنسيق كائنات قابل للتصفية والسكربتة.",
      en: "A PowerShell cmdlet that aggregates the machine's IP addresses, gateways, and DNS servers into one comprehensive object view. It is ipconfig /all reimagined as filterable, scriptable objects."
    },
    cmd: "Get-NetIPConfiguration",
    cmdDesc: { ar: "عرض إعدادات IP كاملة عبر PowerShell", en: "Show the full IP configuration via PowerShell" },
    tags: ["powershell", "ip", "windows", "diagnostics"]
  },
  {
    id: "t167",
    name: "Get-NetAdapter",
    url: "https://learn.microsoft.com/en-us/powershell/module/netadapter/get-netadapter",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "أمر PowerShell يستعرض محولات الشبكة بحالتها وسرعتها وعنوان MAC في جدول قابل للفرز. البداية الطبيعية لأي سكربت إدارة يتعامل مع بطاقات الشبكة على ويندوز.",
      en: "The PowerShell cmdlet listing network adapters with status, link speed, and MAC address in a sortable table. It is the natural starting point for any Windows network administration script."
    },
    cmd: "Get-NetAdapter | Format-Table",
    cmdDesc: { ar: "عرض المحولات في جدول منسق", en: "List adapters in a formatted table" },
    tags: ["powershell", "adapter", "windows", "inventory"]
  },
  {
    id: "t168",
    name: "Get-NetTCPConnection",
    url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أمر PowerShell يعرض اتصالات TCP الحالية بأطوارها والعمليات المالكة لكل اتصال. النسخة العصرية من netstat -ano لكن بقدرة تصفية فورية وربط مباشر بالعمليات.",
      en: "A PowerShell cmdlet showing live TCP connections with their states and owning processes. Think netstat -ano reborn with instant filtering and rich process integration."
    },
    cmd: "Get-NetTCPConnection -State Established",
    cmdDesc: { ar: "عرض الاتصالات المنشأة فقط", en: "List only established connections" },
    tags: ["powershell", "tcp", "connections", "windows"]
  },
  {
    id: "t169",
    name: "Get-NetRoute",
    url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-netroute",
    category: "utility",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أمر PowerShell يستعرض جدول توجيه ويندوز كاملًا مع إمكانية التصفية حسب الوجهة أو البوابة أو الواجهة. يكشف المسار الافتراضي والمسارات الثابتة بصيغة قابلة للسكربتة.",
      en: "A PowerShell cmdlet exposing the Windows routing table, filterable by destination, gateway, or interface. It reveals default and static routes in a clean scriptable format."
    },
    cmd: "Get-NetRoute -DestinationPrefix 0.0.0.0/0",
    cmdDesc: { ar: "عرض المسار الافتراضي في جدول التوجيه", en: "Show the default route in the routing table" },
    tags: ["powershell", "routing", "windows", "gateway"]
  },
  {
    id: "t170",
    name: "whois",
    url: "https://github.com/rfc1036/whois",
    category: "utility",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "بروتوكول وأداة الاستعلام عن معلومات تسجيل النطاقات: المالك والمسجّل وخوادم الأسماء وتواريخ الانتهاء. أساس أي بحث استخباري مفتوح المصدر عن نطاق أو تحقق من ملكية موقع.",
      en: "The protocol and CLI for querying domain registration records: owner, registrar, name servers, and expiry dates. It is the foundation of any domain OSINT investigation or ownership verification."
    },
    cmd: "whois example.com",
    cmdDesc: { ar: "الاستعلام عن معلومات تسجيل نطاق", en: "Query the registration record of a domain" },
    tags: ["whois", "domains", "records", "osint"]
  },
  {
    id: "t171",
    name: "telnet",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/telnet",
    category: "utility",
    platform: ["cross"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "بروتوكول قديم للدخول عن بُعد، لكن استخدامه الأعم اليوم هو فتح اتصال TCP خام إلى منفذ لاختبار خدمة كـ SMTP يدويًا. ما زال أسرع وسيلة لتفاهم مع بروتوكول نصي أو فحص منفذ.",
      en: "A legacy remote-login protocol whose surviving daily use is opening a raw TCP connection to a port to hand-test services like SMTP. It is still the quickest way to speak a text protocol or probe a port."
    },
    cmd: "telnet smtp.example.com 25",
    cmdDesc: { ar: "فتح اتصال خام بمنفذ SMTP 25", en: "Open a raw connection to SMTP port 25" },
    tags: ["telnet", "tcp", "legacy", "testing"]
  },
  {
    id: "t172",
    name: "nc (netcat)",
    url: "https://man.openbsd.org/nc",
    category: "utility",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "سكين الجيش السويسري لشبكات TCP/UDP؛ يفتح الاتصالات ويستمع على المنافذ وينقل الملفات ويصلح كماسح منافذ بسيط. أداة أساسية لكل مهندس شبكات ومختبر اختراق على السواء.",
      en: "The TCP/UDP Swiss Army knife: it opens connections, listens on ports, shuttles files, and doubles as a minimal port scanner. Netcat is a staple for both network engineers and penetration testers."
    },
    cmd: "nc -zv 192.168.1.1 22",
    cmdDesc: { ar: "فحص منفذ SSH على موجّه المنزل", en: "Probe the SSH port on a home router" },
    tags: ["netcat", "tcp", "udp", "swiss-army"]
  },
  {
    id: "t173",
    name: "finger",
    url: "https://man7.org/linux/man-pages/man1/finger.1.html",
    category: "utility",
    platform: ["linux", "windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "بروتوكول قديم يعرض معلومات المستخدمين على مضيف بعيد مثل اسم الدخول والدليل الرئيسي وآخر دخول. أُهمل أمنيًا لأنه يكشف تفاصيل الحسابات، لكنه لا يزال يعمل في بيئات يونكس القديمة وويندوز.",
      en: "An ancient user-information protocol that returns account details like login name, home directory, and last login from remote hosts. It faded for security reasons yet still runs on legacy Unix boxes and Windows."
    },
    cmd: "finger user@example.com",
    cmdDesc: { ar: "الاستعلام عن مستخدم على مضيف بعيد", en: "Query a user on a remote host" },
    tags: ["finger", "user-info", "legacy", "protocol"]
  },
  {
    id: "t174",
    name: "mtr",
    url: "https://www.bitwizard.nl/mtr/",
    category: "utility",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة تدمج traceroute وping في واجهة واحدة حية تعرض إحصاءات كل قفزة لحظيًا بالتحديث المستمر. البديل الحديث الأمثل لتشخيص فقد الحزم وتحديد القفزة المشتبه بها في المسار.",
      en: "My TraceRoute merges traceroute and ping into one live, continuously updating view of per-hop loss and latency statistics. It is the go-to modern tool for locating which hop drops packets on a path."
    },
    cmd: "mtr 8.8.8.8",
    cmdDesc: { ar: "تشغيل mtr التفاعلي نحو هدف", en: "Run interactive mtr toward a target" },
    tags: ["mtr", "traceroute", "ping", "statistics"]
  },
  {
    id: "t175",
    name: "nmcli",
    url: "https://wiki.gnome.org/Projects/NetworkManager/nmcli",
    category: "utility",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "واجهة سطر الأوامر لـ NetworkManager تدير الاتصالات السلكية واللاسلكية وVPN على توزيعات لينكس المكتبية والخوادم. أداة يومية لإعداد الاتصالات في السكربتات والأنظمة بلا واجهة رسومية.",
      en: "The command-line face of NetworkManager, managing wired, wireless, and VPN connections across desktop and server Linux distros. It is the everyday tool for provisioning connections in scripts and headless systems."
    },
    cmd: "nmcli device status",
    cmdDesc: { ar: "عرض حالة أجهزة الشبكة لدى NetworkManager", en: "Show NetworkManager device status" },
    tags: ["nmcli", "networkmanager", "wifi", "linux"]
  },

  // ── Speed / الأداء والسرعة ─────────────────────────────────────────────
  {
    id: "t176",
    name: "iPerf3",
    url: "https://iperf.fr",
    category: "speed",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة قياس عرض النطاق المعيارية في العالم؛ تشغّل خادمًا وعميلًا لاختبار سرعة TCP وUDP الفعلية بين طرفين مع تفاصيل النوافذ والتدفقات المتعددة. الخطوة الأولى في كل تحقيق جدي لأداء شبكة.",
      en: "The world's de facto bandwidth testing tool, running a server/client pair to measure real TCP and UDP throughput with window and multi-stream detail. Every serious network performance investigation starts here."
    },
    cmd: "iperf3 -c 192.168.1.10",
    cmdDesc: { ar: "قياس سرعة التنزيل من خادم iperf3", en: "Measure download speed from an iperf3 server" },
    tags: ["iperf3", "throughput", "bandwidth", "testing"]
  },
  {
    id: "t177",
    name: "iPerf2",
    url: "https://sourceforge.net/projects/iperf2/",
    category: "speed",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "النسخة الثانية الأقدم من عائلة iperf، وما زالت مطلوبة لاختبارات UDP متعددة الخيوط المتزامنة وضبط جودة الخدمة. تتفوق على iperf3 في سيناريوهات معينة من اختبارات البث والبث المتعدد.",
      en: "The second-generation iperf that remains preferred for multi-threaded simultaneous UDP streams and QoS validation. It outperforms iperf3 in specific multicast and streaming-style test scenarios."
    },
    cmd: "iperf -c 192.168.1.10",
    cmdDesc: { ar: "تشغيل عميل iperf2 نحو خادم", en: "Run an iperf2 client against a server" },
    tags: ["iperf", "throughput", "udp", "testing"]
  },
  {
    id: "t178",
    name: "speedtest-cli",
    url: "https://github.com/sivel/speedtest-cli",
    category: "speed",
    platform: ["cross"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "سكربت Python من Sivel يتصل بخوادم Ookla ويعرض سرعة الرفع والتنزيل مباشرة من الطرفية. مثالي للخوادم البعيدة بلا واجهة رسومية وللدمج في سكربتات المراقبة الدورية.",
      en: "Sivel's Python script that talks to Ookla's servers and reports download and upload speeds straight from the terminal. It is perfect for headless remote servers and periodic monitoring scripts."
    },
    cmd: "speedtest-cli",
    cmdDesc: { ar: "قياس سرعة الإنترنت من الطرفية", en: "Measure internet speed from the terminal" },
    tags: ["speedtest", "python", "cli", "bandwidth"]
  },
  {
    id: "t179",
    name: "LibreSpeed",
    url: "https://librespeed.org",
    category: "speed",
    platform: ["web"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "بديل مفتوح المصدر لـ Speedtest.net يعمل بصفحة HTML5 خفيفة بلا تتبع، ويمكن استضافته داخليًا لقياس شبكتك دون الخروج إلى الإنترنت. يُستخدم في الشركات لقياس أداء الشبكة المحلية بدقة وموثوقية.",
      en: "An open-source, self-hostable Speedtest.net alternative built on a lightweight HTML5 page with zero tracking. Companies deploy it internally to measure LAN throughput without touching the public internet."
    },
    cmd: "docker run -it --rm -p 80:80 ghcr.io/librespeed/speedtest",
    cmdDesc: { ar: "تشغيل خادم LibreSpeed في حاوية Docker", en: "Run a LibreSpeed server in a Docker container" },
    tags: ["librespeed", "self-hosted", "html5", "bandwidth"]
  },
  {
    id: "t180",
    name: "Ookla Speedtest",
    url: "https://www.speedtest.net",
    category: "speed",
    platform: ["windows", "mac", "linux", "android", "ios", "web"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "التطبيق والموقع الأشهر عالميًا في قياس سرعة الإنترنت عبر آلاف الخوادم الموزعة، ويعرض سرعة التنزيل والرفع والبينغ والتذبذب. واجهة سطر الأوامر الرسمية تسهّل الدمج في المراقبة والسكربتات.",
      en: "The world's most famous speed testing app and site, measuring download, upload, latency, and jitter against thousands of global servers. Its official CLI makes scripted monitoring straightforward."
    },
    cmd: "speedtest",
    cmdDesc: { ar: "تشغيل اختبار Ookla من سطر الأوامر", en: "Run an Ookla test from the command line" },
    tags: ["ookla", "speedtest", "bandwidth", "latency"]
  },
  {
    id: "t181",
    name: "Fast.com",
    url: "https://fast.com",
    category: "speed",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "خدمة قياس سرعة من Netflix تعمل من المتصفح بضغطة واحدة دون أي أزرار، وتركّز على سرعة التنزيل من شبكة Netflix نفسها. أسرع طريقة للتأكد من سرعة التنزيل الفعلية لخدمات البث.",
      en: "Netflix's one-click browser speed test that starts measuring immediately with no buttons, focused on download speed from Netflix's own CDN. It is the fastest way to sanity-check real streaming throughput."
    },
    cmd: "curl -sI https://fast.com",
    cmdDesc: { ar: "التحقق من استجابة خدمة قياس السرعة", en: "Check that the speed service responds" },
    tags: ["fast", "netflix", "bandwidth", "web"]
  },
  {
    id: "t182",
    name: "nload",
    url: "http://www.roland-riegel.de/nload/index.html",
    category: "speed",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة طرفية ترسم منحنيين حيّين لسرعة الرفع والتنزيل لكل واجهة بشكل بسيط وواضح. أسهل وسيلة لمشاهدة استهلاك النطاق اللحظي من الطرفية دون أي تعقيد.",
      en: "A console tool drawing two clean live graphs of incoming and outgoing throughput per interface. It is the simplest way to watch real-time bandwidth usage from a terminal."
    },
    cmd: "nload eth0",
    cmdDesc: { ar: "عرض حركة الواجهة eth0 حيًّا", en: "Show live traffic on interface eth0" },
    tags: ["nload", "console", "bandwidth", "monitoring"]
  },
  {
    id: "t183",
    name: "iftop",
    url: "http://www.ex-parrot.com/~pdw/iftop/",
    category: "speed",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة تشبه top لكن للشبكة؛ تعرض جدولًا حيًا بالاتصالات الأكثر استهلاكًا للنطاق مع سرعة كل اتجاه. تكشف فورًا من يلتهم عرض الشبكة في لحظة الازدحام.",
      en: "A top-like tool for traffic that shows a live table of connections consuming the most bandwidth with per-direction rates. It instantly reveals which conversation is eating the pipe during congestion."
    },
    cmd: "iftop -i eth0",
    cmdDesc: { ar: "مراقبة حركة الواجهة eth0 حسب الاتصالات", en: "Monitor eth0 traffic per connection" },
    tags: ["iftop", "bandwidth", "connections", "console"]
  },
  {
    id: "t184",
    name: "nettop",
    url: "https://ss64.com/mac/nettop.html",
    category: "speed",
    platform: ["mac"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "أداة macOS المدمجة تعرض تحديثًا حيًّا للعمليات والمقابس مع بايتات الإرسال والاستقبال لكل منها مباشرة من النواة. تجيب عن سؤال «أي تطبيق يستهلك الشبكة؟» دون تثبيت أي شيء خارجي.",
      en: "The built-in macOS utility that streams live per-process and per-socket traffic counters straight from the kernel. It answers 'which app is using the network' with zero installation."
    },
    cmd: "nettop -m tcp",
    cmdDesc: { ar: "عرض حركة اتصالات TCP حسب العملية", en: "Show TCP traffic grouped by process" },
    tags: ["nettop", "macos", "connections", "throughput"]
  },
  {
    id: "t185",
    name: "bmon",
    url: "https://github.com/tgraf/bmon",
    category: "speed",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة مراقبة عرض النطاق بواجهة طرفية مرنة تعرض إحصاءات لكل واجهة مع إمكانية التصدير بصيغ متعددة. تدعم قراءة الإدخالات من ملفات pcap ومن مصادر مراقبة متنوعة.",
      en: "A bandwidth monitoring and debugging tool with a flexible curses UI showing per-interface statistics and exportable output formats. It can ingest from multiple sources including pcap capture files."
    },
    cmd: "bmon",
    cmdDesc: { ar: "تشغيل مراقب النطاق التفاعلي", en: "Launch the interactive bandwidth monitor" },
    tags: ["bmon", "bandwidth", "monitoring", "console"]
  },
  {
    id: "t186",
    name: "bwm-ng",
    url: "https://github.com/vgropp/bwm-ng",
    category: "speed",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة Bandwidth Monitor NG تحدّث جدولًا طرفيًا بسرعة كل واجهة كل ثانية، وتقرأ من /proc وnetstat ومصادر أخرى. خفيفة جدًا حتى على أجهزة التضمين والراوترات.",
      en: "Bandwidth Monitor NG refreshes a console table of per-interface rates every second, reading from /proc, netstat, and more. It is light enough for embedded devices and routers."
    },
    cmd: "bwm-ng",
    cmdDesc: { ar: "عرض سرعات كل الواجهات حيًّا", en: "Show live rates of all interfaces" },
    tags: ["bwm-ng", "bandwidth", "console", "monitoring"]
  },
  {
    id: "t187",
    name: "cbm",
    url: "https://github.com/resurrecting-open-source-projects/cbm",
    category: "speed",
    platform: ["linux"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة Color Bandwidth Meter تعرض استهلاك النطاق لكل واجهة بأشرطة ملونة تعكس سرعتها النسبية بصريًا وفورًا. بسيطة وواضحة عند مراقبة عدة واجهات في آن واحد.",
      en: "The Color Bandwidth Meter renders per-interface traffic as color bars that visually scale with each link's rate. It stays simple while making multi-interface monitoring intuitive."
    },
    cmd: "cbm",
    cmdDesc: { ar: "عرض استهلاك النطاق بأشرطة ملونة", en: "Show bandwidth usage as color bars" },
    tags: ["cbm", "color-bandwidth", "console", "monitoring"]
  },
  {
    id: "t188",
    name: "vnStat",
    url: "https://humdi.net/vnstat/",
    category: "speed",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عدّاد مرور شبكة رقيق يسجّل استهلاك البيانات كتاريخ يومي وشهري لكل واجهة دون التقاط لحظي للحواف. مثالي لمتابعة خطط البيانات المحدودة على الخوادم والراوترات.",
      en: "A lightweight traffic accountant that logs per-interface data usage into daily and monthly history without live sniffing. It is ideal for tracking capped data plans on servers and routers."
    },
    cmd: "vnstat -i eth0",
    cmdDesc: { ar: "عرض إحصاءات استخدام الواجهة eth0", en: "Show usage statistics for eth0" },
    tags: ["vnstat", "traffic-accounting", "monthly", "statistics"]
  },
  {
    id: "t189",
    name: "nethogs",
    url: "https://github.com/raboof/nethogs",
    category: "speed",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة تُفصّل استهلاك النطاق حسب العملية وليس الواجهة فقط؛ تُظهر البرنامج الذي يستهلك الشبكة الآن كأنها top للشبكة. الحل الفوري لسؤال: أي برنامج يأكل النطاق؟",
      en: "A per-process bandwidth breaker that shows exactly which program is consuming network capacity now, like top for the network. It answers 'which app is eating my upload' instantly."
    },
    cmd: "sudo nethogs eth0",
    cmdDesc: { ar: "مراقبة استهلاك النطاق حسب العملية", en: "Monitor bandwidth usage per process" },
    tags: ["nethogs", "per-process", "bandwidth", "linux"]
  },
  {
    id: "t190",
    name: "bandwhich",
    url: "https://github.com/imsnif/bandwhich",
    category: "speed",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة مكتوبة بلغة Rust تعرض استهلاك النطاق حسب العملية والاتصال والعنوان البعيد في واجهة طرفية واحدة منظمة. تجمع مزايا iftop وnethogs في تنفيذ أسرع وأوضح.",
      en: "A modern Rust utility that displays network utilization by process, connection, and remote address in one tidy terminal view. It combines iftop's and nethogs' strengths in a faster, cleaner implementation."
    },
    cmd: "sudo bandwhich",
    cmdDesc: { ar: "تشغيل bandwhich بامتيازات القراءة اللحظية", en: "Run bandwhich with live capture privileges" },
    tags: ["bandwhich", "rust", "per-process", "utilization"]
  },
  {
    id: "t191",
    name: "iptraf-ng",
    url: "https://github.com/iptraf-ng/iptraf-ng",
    category: "speed",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة إحصاءات IP تفاعلية بواجهة ncurses تعرض حركة كل واجهة وقوائم الاتصالات وإحصاءات البروتوكولات بتفصيل غني. خيار كلاسيكي في مراقبة الخوادم منذ التسعينات.",
      en: "An interactive ncurses-based IP LAN monitor showing per-interface traffic, connection lists, and detailed protocol statistics. A rich classic for server monitoring since the nineties."
    },
    cmd: "sudo iptraf-ng",
    cmdDesc: { ar: "فتح قوائم iptraf-ng التفاعلية", en: "Open the iptraf-ng interactive menus" },
    tags: ["iptraf-ng", "statistics", "console", "monitoring"]
  },
  {
    id: "t192",
    name: "slurm",
    url: "https://github.com/mattthias/slurm",
    category: "speed",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة رسم حي لحركة الواجهة بواجهة ASCII أنيقة تعرض منحنيات الإرسال والاستقبال والإحصاءات التراكمية. اسمها يبدو مزحة لكنها عملية ومحبوبة على السيرفرات.",
      en: "A neat ASCII interface that charts interface traffic live with send/receive graphs and cumulative statistics. The name jokes aside, it is practical and beloved on servers."
    },
    cmd: "slurm -i eth0",
    cmdDesc: { ar: "رسم حركة eth0 الحية في الطرفية", en: "Chart live eth0 traffic in the terminal" },
    tags: ["slurm", "console", "bandwidth", "graphs"]
  },
  {
    id: "t193",
    name: "M-Lab NDT",
    url: "https://www.measurementlab.net/tests/ndt/",
    category: "speed",
    platform: ["web"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة تشخيص الشبكة من ائتلاف Measurement Lab البحثي؛ تقيس سرعة التنزيل والرفع وتشخّص زمن الوصول وازدحام المخازن المؤقتة بأسلوب علمي معياري. تُستخدم بياناتها العلنية عالميًا في أبحاث جودة الإنترنت وصناعة سياساته.",
      en: "The Network Diagnostic Tool from the Measurement Lab research consortium; it measures download/upload speed and diagnoses latency and buffer congestion in a scientifically standardized way. Its public data feeds global internet quality research and policy."
    },
    cmd: "ndt7-client",
    cmdDesc: { ar: "تشغيل عميل NDT لاختبار السرعة وتشخيص الوصلة", en: "Run the NDT client to test and diagnose the link" },
    tags: ["ndt", "mlab", "speedtest", "research"]
  },
  {
    id: "t194",
    name: "gping",
    url: "https://github.com/orf/gping",
    category: "speed",
    platform: ["linux", "mac", "windows"],
    license: "opensource",
    difficulty: 1,
    desc: {
      ar: "أداة ping مكتوبة بلغة Rust ترسم زمن الاستجابة في منحنى بياني حي عبر الزمن بدل أسطر الأرقام المتراكمة. تعرض عدة أهداف في رسم واحد لتقارن زمن الوصول بينها مباشرة وتكشف التقطعات المتقطعة بصريًا.",
      en: "A Rust-based ping that plots response times on a live graph over time instead of endless lines of numbers. It can chart multiple targets in one window so you can compare latencies side by side and spot intermittent drops visually."
    },
    cmd: "gping 8.8.8.8",
    cmdDesc: { ar: "رسم زمن الاستجابة لهدف عبر الزمن", en: "Chart response time to a target over time" },
    tags: ["gping", "ping", "graphs", "latency"]
  },
  {
    id: "t195",
    name: "qperf",
    url: "https://github.com/linux-rdma/qperf",
    category: "speed",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة قياس عرض النطاق وزمن الوصول معًا في اختبار واحد لـ TCP وRDMA، وهي شائعة في مراكز البيانات عالية الأداء. تقيس زمن الاستجابة الدقيق بجانب الإنتاجية الكاملة في تقرير واحد.",
      en: "A bandwidth and latency measurement tool for TCP and RDMA in a single test, common in high-performance data centers. It reports fine-grained round-trip latency alongside full throughput."
    },
    cmd: "qperf 192.168.1.10 tcp_bw tcp_lat",
    cmdDesc: { ar: "قياس عرض النطاق وزمن الوصول TCP معًا", en: "Measure TCP bandwidth and latency together" },
    tags: ["qperf", "rdma", "bandwidth", "latency"]
  },
  {
    id: "t196",
    name: "Flent",
    url: "https://flent.org",
    category: "speed",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "إطار اختبارات مرن يشغّل تدفقات اختبار متزامنة لقياس سلوك الشبكة تحت الضغط مثل Bufferbloat وعدالة جودة الخدمة. يبني رسومًا مقارنة تحلل ما تخفيه اختبارات السرعة البسيطة.",
      en: "The FLExible Network Tester that orchestrates competing test streams to expose bufferbloat and QoS fairness under load. Its comparison plots reveal what simple speed tests hide."
    },
    cmd: "flent rrul -H 192.168.1.10",
    cmdDesc: { ar: "تشغيل اختبار RRUL الشامل للرفع والتنزيل المتزامن", en: "Run the RRUL bidirectional load test" },
    tags: ["flent", "qos", "bufferbloat", "testing"]
  },
  {
    id: "t197",
    name: "LAN Speed Test",
    url: "https://totusoft.com/software/lanspeedtest",
    category: "speed",
    platform: ["windows", "mac"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "برنامج صغير من Totusoft لقياس سرعة القراءة والكتابة على مجلد شبكي مشترك ليعكس أداء شبكتك المحلية الفعلي. النسخة Lite مجانية بينما تضيف النسخة الكاملة المدفوعة ميزات متقدمة.",
      en: "Totusoft's lightweight program that measures read and write speeds against a shared network folder to reflect real LAN throughput. The Lite edition is free while the paid version adds advanced options."
    },
    cmd: "LAN_SpeedTest.exe",
    cmdDesc: { ar: "تشغيل برنامج اختبار سرعة الشبكة المحلية", en: "Launch the LAN speed testing program" },
    tags: ["lan-speed-test", "smb", "throughput", "windows"]
  },
  {
    id: "t198",
    name: "LANBench",
    url: "https://totusoft.com/software/lanbench",
    category: "speed",
    platform: ["windows"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "برنامج مجاني من Totusoft لقياس إنتاجية نقل الملفات عبر الشبكة بنوافذ اختبار قابلة للضبط. مناسب للتحقق السريع من أداء شبكة LAN بعد تغييرات في المبدّلات أو الكابلات.",
      en: "Totusoft's free utility for benchmarking network file transfer throughput with adjustable test windows. It suits quick LAN performance verification after switch or cabling changes."
    },
    cmd: "LANBench.exe",
    cmdDesc: { ar: "تشغيل أداة قياس أداء الشبكة المحلية", en: "Launch the LAN benchmarking utility" },
    tags: ["lanbench", "throughput", "windows", "benchmark"]
  },
  {
    id: "t199",
    name: "OpenSpeedTest",
    url: "https://openspeedtest.com",
    category: "speed",
    platform: ["web"],
    license: "free",
    difficulty: 1,
    desc: {
      ar: "خدمة قياس سرعة HTML5 يمكن استضافتها داخليًا لاختبار سرعة شبكتك المحلية من المتصفح مباشرة دون أدوات خارجية. يشتغل خادم Docker بسيط ويقيس التنزيل والرفع داخل الشبكة المحلية.",
      en: "A self-hostable HTML5 speed test you can run inside your LAN to measure download and upload speeds straight from the browser. A one-line Docker server makes internal network testing effortless."
    },
    cmd: "docker run -d -p 3000:3000 openspeedtest/latest",
    cmdDesc: { ar: "تشغيل خادم OpenSpeedTest ذاتي الاستضافة", en: "Run a self-hosted OpenSpeedTest server" },
    tags: ["openspeedtest", "self-hosted", "html5", "lan"]
  },
  {
    id: "t200",
    name: "PingPlotter",
    url: "https://www.pingplotter.com",
    category: "speed",
    platform: ["windows", "mac"],
    license: "freemium",
    difficulty: 1,
    desc: {
      ar: "برنامج رسومي يجمع بين traceroute والمراقبة المستمرة، فيرسم زمن كل قفزة عبر الزمن ويكشف التقطعات المتقطعة التي يخفيها ping العادي. النسخة المجانية كافية للمتابعة الأساسية والنسخ المدفوعة تضيف التنبيهات وتاريخًا طويلًا.",
      en: "A graphical traceroute monitor that charts every hop's latency over time, exposing intermittent packet loss that plain ping misses. The free tier covers basic monitoring while paid plans add alerting and long-term history."
    },
    cmd: "pingplotter",
    cmdDesc: { ar: "تشغيل PingPlotter لمراقبة المسار", en: "Launch PingPlotter to monitor a route" },
    tags: ["pingplotter", "traceroute", "latency", "monitoring"]
  }
];
