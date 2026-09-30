import type { Tool } from "@/lib/types";

// ─── TOOLS PART 7: t601–t700 ─────────────────────────────────────────────
// Categories: loadbalance (t601–t625), storage (t626–t650),
//             iot (t651–t675), telecom (t676–t700)

export const TOOLS_PART7: Tool[] = [
  // ── Load Balancing / موازنة الحمل ──────────────────────────────────────
  {
    id: "t601",
    name: "HAProxy",
    url: "https://www.haproxy.org",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أشهر موازن حمل مفتوح المصدر لبروتوكولات TCP وHTTP، يشتهر بأدائه العالي واستقراره في بيئات الإنتاج التي تخدم ملايين الطلبات في الثانية. يدعم الفحوصات الصحية وقوائم التحكم ACL وخوارزميات موازنة متعددة مثل roundrobin وleastconn، وهو المكون القياسي أمام الواجهات الخلفية في معظم بنى الويب.",
      en: "The most widely used open-source load balancer for TCP and HTTP, famous for its performance and rock-solid stability in production environments serving millions of requests per second. It offers health checks, ACLs, and balancing algorithms such as roundrobin and leastconn, making it the de-facto front end for web backends."
    },
    cmd: "haproxy -c -f /etc/haproxy/haproxy.cfg",
    cmdDesc: { ar: "التحقق من صحة ملف إعدادات HAProxy قبل إعادة تحميل الخدمة", en: "Validate the HAProxy configuration file before reloading the service" },
    tags: ["haproxy", "load-balancer", "proxy", "tcp"]
  },
  {
    id: "t602",
    name: "NGINX",
    url: "https://nginx.org",
    category: "loadbalance",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم ويب ومضاد عكسي (Reverse Proxy) يؤدي أيضًا دور موازن حمل فعّال عبر كتل upstream ووحدة stream لموازنة الطبقة الرابعة. يشغّل جزءًا هائلًا من مواقع الإنترنت الحديثة بفضل استهلاكه المنخفض للذاكرة وقدرته على إنهاء TLS ومعالجة عشرات آلاف الاتصالات المتزامنة.",
      en: "A web server and reverse proxy that also acts as an effective load balancer through upstream blocks and the stream module for Layer 4 balancing. It powers a huge share of the modern web thanks to its low memory footprint, TLS termination, and ability to handle tens of thousands of concurrent connections."
    },
    cmd: "nginx -t",
    cmdDesc: { ar: "اختبار صحة إعدادات NGINX والتحقق من مسارات الملفات", en: "Test the NGINX configuration and verify file paths" },
    tags: ["nginx", "reverse-proxy", "web-server", "load-balancer"]
  },
  {
    id: "t603",
    name: "Keepalived",
    url: "https://www.keepalived.org",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "تنفيذ عملي لبروتوكول VRRP يوفّر عنوان IP افتراضيًا عائمًا ينتقل تلقائيًا إلى العقدة الاحتياطية عند فشل الأساسية، ما يبني توفرًا عاليًا أمام HAProxy أو NGINX. يُدمج مع IPVS ليوزّع الحركة بين خوادم حقيقية خلف عنوان واحد، فيصبح العمود الفقري لمنصات التوفر العالي على لينكس.",
      en: "A practical VRRP implementation providing a floating virtual IP that automatically moves to the standby node when the primary fails, delivering high availability in front of HAProxy or NGINX. Combined with IPVS it spreads traffic across real servers behind one address, forming the backbone of Linux HA stacks."
    },
    cmd: "keepalived -f /etc/keepalived/keepalived.conf",
    cmdDesc: { ar: "تشغيل Keepalived بملف إعدادات محدد لتفعيل عناوين VRRP", en: "Run Keepalived with a given config file to activate VRRP addresses" },
    tags: ["keepalived", "vrrp", "high-availability", "failover"]
  },
  {
    id: "t604",
    name: "Seesaw",
    url: "https://github.com/google/seesaw",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "موازن حمل من جوجل مبني على Linux Virtual Server مع دعم عناوين VIP بنمط anycast وأتمتة الإعداد عبر وحدات NodeJS. استُخدم داخليًا في بنية جوجل لسنوات قبل إطلاقه للعموم، ويصلح لمن يريد موازن L4 مرنًا يتكامل مع سير العمل البرمجي.",
      en: "Google's load balancer built on Linux Virtual Server with anycast VIP support and NodeJS-based configuration automation. It ran inside Google's infrastructure for years before being open-sourced, and suits teams wanting a flexible L4 balancer that fits programmatic workflows."
    },
    cmd: "seesaw_engine --vserver prod",
    cmdDesc: { ar: "تشغيل محرك Seesaw لمجموعة موازنة افتراضية باسم prod", en: "Start the Seesaw engine for the virtual server cluster named prod" },
    tags: ["seesaw", "lvs", "anycast", "google"]
  },
  {
    id: "t605",
    name: "Katran",
    url: "https://github.com/facebookincubator/katran",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "محرك إعادة توجيه من ميتا (فيسبوك سابقًا) يعمل داخل نواة لينكس عبر eBPF/XDP لموازنة حمل الطبقة الرابعة بسرعة خطية. يتجاوز حدود iptables وIPVS التقليدية لأن معالجة الحزم تحدث مبكرًا في مسار بيانات XDP، وهو المثال العملي الأبرز على موازنة الحمل الحديثة القائمة على eBPF.",
      en: "Meta's (formerly Facebook's) forwarding engine that runs in the Linux kernel via eBPF/XDP to perform line-rate Layer 4 load balancing. It bypasses the limits of traditional iptables and IPVS because packets are processed early in the XDP data path, making it the flagship real-world example of modern eBPF-based load balancing."
    },
    cmd: "sudo bpftool prog show | grep -i xdp",
    cmdDesc: { ar: "عرض برامج eBPF/XDP المحملة في النواة للتحقق من جاهزية بيئة Katran", en: "List loaded eBPF/XDP programs in the kernel to verify Katran's environment" },
    tags: ["katran", "ebpf", "xdp", "facebook"]
  },
  {
    id: "t606",
    name: "Pound",
    url: "https://www.apsis.ch/pound/",
    category: "loadbalance",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "موازن حمل ومضاد عكسي خفيف الوزن جدًا يجيد إنهاء HTTPS وتوزيع الطلبات على خوادم خلفية. يمتاز ببساطة إعداده وملف إعدادات صغير واضح، ما يجعله خيارًا عمليًا للمواقع الصغيرة والمتوسطة التي لا تحتاج تعقيد HAProxy.",
      en: "A very lightweight reverse proxy and load balancer that handles HTTPS termination and request distribution across backend servers. Its dead-simple configuration and tiny config file make it a practical pick for small and mid-sized sites that do not need HAProxy's complexity."
    },
    cmd: "pound -c -f /etc/pound.cfg",
    cmdDesc: { ar: "فحص صحة ملف إعدادات Pound قبل تشغيل الخدمة", en: "Check the Pound configuration file before starting the service" },
    tags: ["pound", "reverse-proxy", "https", "load-balancer"]
  },
  {
    id: "t607",
    name: "Varnish Cache",
    url: "https://varnish-cache.org",
    category: "loadbalance",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مضاد عكسي مخبئي (Caching Reverse Proxy) يسرّع المواقع بتخزين استجابات HTTP في الذاكرة ويوزّع الطلبات على الخوادم الخلفية عند فقدان الكاش. تُدار سلوكياته كاملة عبر لغة VCL القوية، ويعتمد عليه مواقع عالية الضغط لتقليص زمن الاستجابة وتخفيف حمل الخوادم الأصلية.",
      en: "A caching reverse proxy that accelerates websites by storing HTTP responses in memory and balancing requests across backends on cache misses. Its entire behaviour is driven by the powerful VCL language, and high-traffic sites rely on it to cut response times and offload origin servers."
    },
    cmd: "varnishd -f /etc/varnish/default.vcl -s malloc,256m",
    cmdDesc: { ar: "تشغيل Varnish بملف VCL مع تخزين مؤقت بحجم 256 ميجابايت في الذاكرة", en: "Start Varnish with a VCL file and a 256 MB in-memory cache" },
    tags: ["varnish", "cache", "reverse-proxy", "vcl"]
  },
  {
    id: "t608",
    name: "Caddy",
    url: "https://caddyserver.com",
    category: "loadbalance",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "خادم ويب حديث يعمل بمبدأ الضبط الافتراضي، يحصل تلقائيًا على شهادات HTTPS من Let's Encrypt ويجددها دون تدخل بشري. يعمل مضادًا عكسيًا وموازن حمل عبر تعليمة reverse_proxy في ملف Caddyfile قصير، ما يجعله أسرع طريق إلى خدمة آمنة موزعة.",
      en: "A modern convention-over-configuration web server that automatically obtains and renews HTTPS certificates from Let's Encrypt. Its reverse_proxy directive in a short Caddyfile turns it into a reverse proxy and load balancer, making it the fastest route to a secure, distributed service."
    },
    cmd: "caddy run --config Caddyfile",
    cmdDesc: { ar: "تشغيل Caddy بملف Caddyfile الذي يعرّف المضيفات والوكالة العكسية", en: "Run Caddy with a Caddyfile defining hosts and reverse proxying" },
    tags: ["caddy", "https", "reverse-proxy", "load-balancer"]
  },
  {
    id: "t609",
    name: "OpenResty",
    url: "https://openresty.org",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة تجمع NGINX مع محرك LuaJIT لتنفيذ منطق التوجيه والتحكم داخل حلقة الأحداث نفسها دون عمليات منفصلة. بوابة مثالية لبناء APIs وموازنات ذكية تعالج الطلبات وتعدّلها برمجيًا بزمن استجابة منخفض جدًا.",
      en: "A platform bundling NGINX with LuaJIT so routing and control logic run inside the same event loop without separate processes. It is ideal for building API gateways and smart balancers that process and rewrite requests programmatically with very low latency."
    },
    cmd: "sudo openresty -t",
    cmdDesc: { ar: "اختبار صحة إعدادات OpenResty (NGINX المدمج)", en: "Test the OpenResty (bundled NGINX) configuration" },
    tags: ["openresty", "nginx", "lua", "api-gateway"]
  },
  {
    id: "t610",
    name: "ipvsadm",
    url: "https://www.linuxvirtualserver.org",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أداة إدارة IPVS، وهي وحدة موازنة حمل الطبقة الرابعة داخل نواة لينكس المعروفة بمشروع Linux Virtual Server. تتيح تعريف خدمات افتراضية وخوادم حقيقية وخوارزميات جدولة مثل rr وwlc وsh، وتقدم أداءً ممتازًا لأن الموازنة تجري داخل النواة نفسها.",
      en: "The management tool for IPVS, the in-kernel Layer 4 load balancing framework of the Linux Virtual Server project. It defines virtual services, real servers, and scheduling algorithms such as rr, wlc, and sh, delivering outstanding performance since balancing happens inside the kernel."
    },
    cmd: "ipvsadm -Ln",
    cmdDesc: { ar: "عرض قواعد IPVS الحالية بالعناوين الرقمية دون حل أسماء DNS", en: "List current IPVS rules with numeric addresses and no DNS resolution" },
    tags: ["ipvsadm", "lvs", "l4", "kernel"]
  },
  {
    id: "t611",
    name: "Balance",
    url: "https://www.inlab.de/balance.html",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "موازن حمل TCP بسيط جدًا مكتوب بلغة C، يوزّع الاتصالات على قنوات خلفية بدوران round-robin مع نسخ احتياطية عند فشل إحداها. حجمه الصغير وسطر أوامره المختصر يجعلانه مناسبًا لتوزيع أحمال سريع على الأجهزة الضعيفة والبيئات المدمجة.",
      en: "An extremely small C-based TCP load balancer that spreads connections across backend channels in round-robin fashion with automatic failover to backup channels. Its tiny footprint and concise command line make it a good fit for quick load distribution on low-power hosts and embedded environments."
    },
    cmd: "balance 8080 10.0.0.11 10.0.0.12",
    cmdDesc: { ar: "توزيع اتصالات المنفذ 8080 على خادمين خلفيين بدوران round-robin", en: "Distribute port 8080 connections across two backend servers in round-robin" },
    tags: ["balance", "tcp", "round-robin", "lightweight"]
  },
  {
    id: "t612",
    name: "gobetween",
    url: "https://github.com/yyyar/gobetween",
    category: "loadbalance",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "موازن حمل حديث للطبقة الرابعة مكتوب بلغة Go بملف إعداد واحد بصيغة TOML. يكتشف الخوادم الخلفية تلقائيًا من قوائم ثابتة أو Docker أو Consul أو etcd أو سجلات DNS SRV، مع فحوصات صحية متعددة، ما يجعله رفيقًا مثاليًا للبيئات الديناميكية.",
      en: "A modern Go-based Layer 4 load balancer configured through a single TOML file. It discovers backends automatically from static lists, Docker, Consul, etcd, or DNS SRV records and offers multiple health check types, making it a great companion for dynamic environments."
    },
    cmd: "gobetween -c /etc/gobetween/config.toml",
    cmdDesc: { ar: "تشغيل gobetween بملف الإعدادات الذي يعرّف الخدمات والخوادم", en: "Run gobetween with the config file defining servers and backends" },
    tags: ["gobetween", "golang", "l4", "service-discovery"]
  },
  {
    id: "t613",
    name: "Fabio",
    url: "https://github.com/fabiolb/fabio",
    category: "loadbalance",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "موازن حمل HTTP وTCP طُوّر في eBay يتغذى مباشرة من سجل Consul، فيولّد قواعد التوجيه من وسوم الخدمات دون إعادة تشغيل. يخزّن شهادات TLS في مخزن مشفّر، وينتشر في بنى الخدمات المصغرة حيث تتغير الخوادم الخلفية باستمرار.",
      en: "An HTTP and TCP load balancer developed at eBay, fed directly from the Consul registry so routing rules are generated from service tags without restarts. It stores TLS certificates in an encrypted key-value store and is popular in microservice architectures where backends change constantly."
    },
    cmd: "fabio -proxy.addr ':80;proto=http'",
    cmdDesc: { ar: "تشغيل Fabio كوكيل HTTP يستمع على المنفذ 80", en: "Run Fabio as an HTTP proxy listening on port 80" },
    tags: ["fabio", "consul", "http", "reverse-proxy"]
  },
  {
    id: "t614",
    name: "Vulcand",
    url: "https://github.com/vulcand/vulcand",
    category: "loadbalance",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "موازن حمل ومضاد عكسي قابل للبرمجة بالكامل من Mailgun، مبني على NGINX ويُدار ديناميكيًا عبر etcd. صُمم للبيئات التي تتطلب تحديث قواعد التوجيه والصيانات برمجيًا دون إعادة تحميل الخدمة أو قطع الاتصالات.",
      en: "A fully programmable load balancer and reverse proxy from Mailgun, built on NGINX and managed dynamically through etcd. It targets environments that require routing rules and maintenance windows to be updated programmatically without service reloads or dropped connections."
    },
    cmd: "vulcand -etcd=http://127.0.0.1:2379",
    cmdDesc: { ar: "تشغيل Vulcand بقراءة إعداداته من عنقود etcd محلي", en: "Run Vulcand reading its configuration from a local etcd cluster" },
    tags: ["vulcand", "etcd", "nginx", "programmable"]
  },
  {
    id: "t615",
    name: "Zevenet",
    url: "https://www.zevenet.com",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "موزّع تطبيقات (ADC) مفتوح المصدر بواجهة ويب سهلة، يوفر مزارع L7 لبروتوكول HTTP ومزارع L4 لـ TCP/UDP. يجمع توزيعة مجتمعية مجانية مع إصدار مؤسسي مدفوع، ويتضمن إنهاء TLS وفحوصات صحية وواجهة REST API تسمى ZAPI.",
      en: "An open-source application delivery controller with a friendly web UI that provides L7 farms for HTTP and L4 farms for TCP/UDP. It combines a free community distribution with a paid enterprise edition, and ships TLS termination, health checks, and a REST API called ZAPI."
    },
    cmd: "curl -k -H 'ZAPI_KEY: <key>' https://lb:444/zapi/v4.0/zapi.cgi/farms",
    cmdDesc: { ar: "سرد مزارع الموازنة عبر واجهة ZAPI البرمجية في Zevenet", en: "List load balancing farms through Zevenet's ZAPI REST interface" },
    tags: ["zevenet", "adc", "web-ui", "zapi"]
  },
  {
    id: "t616",
    name: "BFE",
    url: "https://github.com/bfenetworks/bfe",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "محرك موازنة حمل حديث للطبقة السابعة طوّرته بايدو لخدمة حركة بحثها الضخمة، ومبني بلغة Go للتوسع الأفقي. يقدّم جداول توجيه غنية وقواعد حماية من هجمات DDoS التطبيقية، مع فصل واضح بين منطق التوجيه وتحليل الحركة.",
      en: "A modern Layer 7 load balancing engine developed at Baidu to serve its massive search traffic, built in Go for horizontal scale. It provides rich routing tables, application-layer DDoS protection rules, and a clean separation between routing logic and traffic analytics."
    },
    cmd: "bfe -c /etc/bfe/conf",
    cmdDesc: { ar: "تشغيل BFE بقراءة إعداداته من دليل /etc/bfe/conf", en: "Run BFE loading its configuration from /etc/bfe/conf" },
    tags: ["bfe", "baidu", "l7", "traffic-management"]
  },
  {
    id: "t617",
    name: "Citrix ADC (NetScaler)",
    url: "https://www.citrix.com/products/citrix-adc/",
    category: "loadbalance",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "منصة ADC مؤسسية متمرسة تُعرف سابقًا باسم NetScaler، تجمع موازنة حمل L4–L7 وتفريغ TLS وتوجيه GSLB عالميًا وتحسين WAN. تُدار عبر واجهة ويب أو وحدة CLI عبر SSH بأوامر مباشرة سهلة القراءة، وتنتشر في مراكز البيانات الكبيرة والبنوك.",
      en: "A battle-tested enterprise ADC formerly known as NetScaler, combining L4–L7 load balancing, TLS offload, global GSLB routing, and WAN optimization. It is managed via a web console or an SSH CLI with readable commands, and is widespread in large datacenters and banks."
    },
    cmd: "add lb vserver web_vip HTTP 10.0.0.100 80",
    cmdDesc: { ar: "إنشاء خادم افتراضي لموازنة HTTP بعنوان VIP من وحدة Citrix ADC CLI", en: "Create an HTTP load balancing virtual server with a VIP from the Citrix ADC CLI" },
    tags: ["citrix", "netscaler", "adc", "gslb"]
  },
  {
    id: "t618",
    name: "F5 BIG-IP",
    url: "https://www.f5.com/products/big-ip-services",
    category: "loadbalance",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "المعيار المؤسسي الكلاسيكي في موازنة الحمل وتوصيل التطبيقات، يتميز بقوة iRules التي تسمح ببرمجة سلوك التوجيه بلغة قريبة من TCL. يغطي من موازنة L4/L7 إلى جدار حماية التطبيقات وإدارة DNS العالمي، ويُدار عبر tmsh أو الواجهة الرسومية.",
      en: "The classic enterprise standard in load balancing and application delivery, best known for iRules that let you program traffic behaviour with a TCL-like language. It spans L4/L7 balancing, application firewalling, and global DNS management, administered via tmsh or the GUI."
    },
    cmd: "tmsh list ltm virtual /Common/web_vip",
    cmdDesc: { ar: "عرض إعدادات الخادم الافتراضي web_vip من واجهة tmsh على BIG-IP", en: "Show the web_vip virtual server configuration via tmsh on BIG-IP" },
    tags: ["f5", "big-ip", "irules", "ltm"]
  },
  {
    id: "t619",
    name: "AWS Elastic Load Balancing",
    url: "https://aws.amazon.com/elasticloadbalancing/",
    category: "loadbalance",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "عائلة موازنات الحمل المدارة في AWS التي تشمل ALB للطبقة السابعة وNLB للطبقة الرابعة بأداء عالٍ وGWLB لإدراج الأجهزة الافتراضية في المسار. تتكامل تلقائيًا مع مجموعات التوسع التلقائي والفحوصات الصحية ومقاييس CloudWatch دون إدارة أي خوادم.",
      en: "AWS's family of managed load balancers covering ALB for Layer 7, high-performance NLB for Layer 4, and GWLB for inserting virtual appliances in path. It integrates automatically with autoscaling groups, health checks, and CloudWatch metrics with zero server management."
    },
    cmd: "aws elbv2 describe-load-balancers --output table",
    cmdDesc: { ar: "سرد موازنات الحمل في حساب AWS بتنسيق جدولي", en: "List the load balancers in an AWS account in table format" },
    tags: ["aws", "elb", "alb", "nlb"]
  },
  {
    id: "t620",
    name: "Azure Load Balancer",
    url: "https://azure.microsoft.com/en-us/products/load-balancer/",
    category: "loadbalance",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "موازن حمل سحابي مدار من مايكروسوفت للطبقة الرابعة بزمن استجابة منخفض وإنتاجية عالية جدًا، مع دعم منافذ HA والموازنة الداخلية والخارجية. تعمل خدمات Azure نفسها فوقه، ويُدار عبر Azure CLI أو قوالب ARM أو بوابة الويب.",
      en: "Microsoft's managed cloud Layer 4 load balancer with very low latency and extremely high throughput, including HA ports and both public and internal balancing. Azure services themselves run on top of it, and it is managed via Azure CLI, ARM templates, or the web portal."
    },
    cmd: "az network lb list --output table",
    cmdDesc: { ar: "سرد موازنات الحمل في اشتراك Azure بتنسيق جدولي", en: "List load balancers in an Azure subscription in table format" },
    tags: ["azure", "load-balancer", "l4", "cloud"]
  },
  {
    id: "t621",
    name: "Kemp LoadMaster",
    url: "https://kemptechnologies.com",
    category: "loadbalance",
    platform: ["web"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "موزّع تطبيقات شهير بتوزيعة مجانية LOADMASTER FREE للأحمال الصغيرة، ويعمل كجهاز افتراضي أو فيزيائي أو سحابي. يجمع إنهاء TLS وضغط HTTP وموازنة L4/L7 مع قوالب جاهزة لتطبيقات مثل Exchange وRDP وSharePoint.",
      en: "A popular application delivery controller with a free LOADMASTER FREE tier for small loads, available as virtual, physical, or cloud appliances. It combines TLS offload, HTTP compression, and L4/L7 balancing with ready templates for apps like Exchange, RDP, and SharePoint."
    },
    tags: ["kemp", "loadmaster", "adc", "free-tier"]
  },
  {
    id: "t622",
    name: "Ingress-NGINX",
    url: "https://github.com/kubernetes/ingress-nginx",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "وحدة تحكم Ingress الأكثر استخدامًا في Kubernetes، تحوّل موارد Ingress إلى قواعد NGINX حية لتوجيه حركة HTTP/HTTPS إلى الخدمات. تدعم إعادة الكتابة والجلسات اللاصقة عبر التعليقات، وتعدّ البوابة القياسية للدخول في عناقيد Kubernetes.",
      en: "The most widely used Ingress controller in Kubernetes, translating Ingress resources into live NGINX rules that route HTTP/HTTPS traffic to services. It supports rewrites and sticky sessions through annotations, and is the de-facto entry gateway for Kubernetes clusters."
    },
    cmd: "kubectl get ingress -A",
    cmdDesc: { ar: "سرد قواعد الدخول Ingress في جميع فضاءات الأسماء", en: "List Ingress rules across all namespaces" },
    tags: ["ingress-nginx", "kubernetes", "ingress", "controller"]
  },
  {
    id: "t623",
    name: "Octavia",
    url: "https://docs.openstack.org/octavia/latest/",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خدمة موازنة الحمل الرسمية في OpenStack، تنشئ مزارع موازنة كاملة بإنشاء آلات افتراضية مخصصة تسمى Amphora. تدعم موازنة L4/L7 وإنهاء TLS والمستمعين والمراقبة، وتُدار عبر واجهة OpenStack CLI أو لوحة Horizon.",
      en: "OpenStack's official load balancing service, which creates full balancing farms by spawning dedicated virtual machines called Amphoras. It supports L4/L7 balancing, TLS termination, listeners, and monitoring, managed through the OpenStack CLI or the Horizon dashboard."
    },
    cmd: "openstack loadbalancer list",
    cmdDesc: { ar: "سرد موازنات الحمل المنشأة عبر خدمة Octavia", en: "List load balancers created through the Octavia service" },
    tags: ["octavia", "openstack", "amphora", "lbaas"]
  },
  {
    id: "t624",
    name: "Contour",
    url: "https://projectcontour.io",
    category: "loadbalance",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "وحدة تحكم Ingress مبنية على Envoy لبيئة Kubernetes، توفر توجيهًا متقدمًا للطبقة السابعة عبر مخصص CRD اسمه HTTPProxy. تنشر Envoy كـ DaemonSet أو Deployment، وتدعم تفويض إدارة المسارات بين الفرق في المؤسسات الكبيرة.",
      en: "An Envoy-based Ingress controller for Kubernetes delivering advanced Layer 7 routing through a CRD named HTTPProxy. It deploys Envoy as a DaemonSet or Deployment and supports delegated route management across teams in large organizations."
    },
    cmd: "kubectl get httpproxies -A",
    cmdDesc: { ar: "سرد موارد HTTPProxy لتوجيه الحركة عبر Contour", en: "List HTTPProxy resources routing traffic through Contour" },
    tags: ["contour", "envoy", "kubernetes", "ingress"]
  },
  {
    id: "t625",
    name: "Pingora",
    url: "https://github.com/cloudflare/pingora",
    category: "loadbalance",
    platform: ["cross"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "إطار عمل من كلاودفلير بلغة Rust لبناء خدمات وكيلة سريعة وقابلة للبرمجة، يشغّل اليوم أكثر من تريليون طلب يوميًا عبر شبكتهم. يوفر أمان الذاكرة وتزامنًا فعالًا دون جمع قمامة، وهو خيار متقدم لمن يريد بناء وكيله الخاص بأداء إنتاجي.",
      en: "A Rust framework from Cloudflare for building fast, programmable proxy services, now serving over a trillion requests per day on their network. It provides memory safety and efficient async concurrency without garbage collection, suiting teams building their own production-grade proxies."
    },
    cmd: "cargo add pingora",
    cmdDesc: { ar: "إضافة مكتبة Pingora إلى مشروع Rust لبناء وكيل مخصص", en: "Add the Pingora crate to a Rust project to build a custom proxy" },
    tags: ["pingora", "rust", "cloudflare", "proxy-framework"]
  },

  // ── Storage Networking / شبكات التخزين ─────────────────────────────────
  {
    id: "t626",
    name: "TrueNAS",
    url: "https://www.truenas.com",
    category: "storage",
    platform: ["linux"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "نظام تشغيل تخزين متصل بالشبكة مبني على نظام ملفات ZFS بنسختيه CORE وSCALE التي تدعم حاويات Docker، مع واجهة ويب ناضجة. يقدّم لقطات فورية ومزامنة وضغطًا وإلغاء استنساخ وتشفيرًا للقرص، ويعتبر الخيار الأوسع انتشارًا من المعامل المنزلية إلى المؤسسات.",
      en: "A network-attached storage operating system built on ZFS in its CORE and SCALE editions, the latter adding Docker and VM support, all behind a mature web UI. It delivers instant snapshots, replication, compression, deduplication, and disk encryption, and is the most widely deployed NAS choice from homelab to enterprise."
    },
    cmd: "zpool status -x",
    cmdDesc: { ar: "فحص صحة تجمعات ZFS في خادم TrueNAS", en: "Check the health of ZFS pools on a TrueNAS server" },
    tags: ["truenas", "zfs", "nas", "iscsi"]
  },
  {
    id: "t627",
    name: "XigmaNAS",
    url: "https://www.xigmanas.com",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "توزيعة NAS مدمجة خفيفة جدًا مبنية على FreeBSD طورت من NAS4Free، تُقلع من ذاكرة صغيرة وتخدّم مشاركات SMB وNFS وFTP وiSCSI بواجهة ويب. تناسب الأجهزة القديمة والأنظمة المدمجة حيث يلزم تخزين مشترك بأقل الموارد.",
      en: "A very lightweight embedded NAS distribution based on FreeBSD that evolved from NAS4Free, booting from a tiny image while serving SMB, NFS, FTP, and iSCSI shares from a web UI. It fits older hardware and embedded setups where shared storage is needed with minimal resources."
    },
    tags: ["xigmanas", "nas", "freebsd", "embedded"]
  },
  {
    id: "t628",
    name: "Ceph",
    url: "https://ceph.io/en/",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "منصة تخزين موزّعة موحدة تقدم كتلًا (RBD) ونظام ملفات (CephFS) وتخزين كائن متوافقًا مع S3 (RGW) فوق عنقود خوادم بلا نقطة فشل واحدة. تعيد التوازن ذاتيًا وتتعافى تلقائيًا عند فقدان عقدة أو قرص، وهي أساس التخزين في OpenStack وكثير من السحب الخاصة.",
      en: "A unified distributed storage platform delivering block (RBD), a file system (CephFS), and S3-compatible object storage (RGW) across a cluster with no single point of failure. It self-rebalances and self-heals when a node or disk is lost, underpinning OpenStack and many private clouds."
    },
    cmd: "ceph -s",
    cmdDesc: { ar: "عرض حالة عنقود Ceph العام وصحة العقد والخدمات", en: "Show overall Ceph cluster status and the health of nodes and services" },
    tags: ["ceph", "rados", "rbd", "distributed"]
  },
  {
    id: "t629",
    name: "GlusterFS",
    url: "https://www.gluster.org",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "نظام ملفات موزع قابل للتوسع يحوّل خوادم تخزين عادية إلى فضاء أسماء واحد عبر وحدات تسمى bricks. يدعم النسخ المتكرر والتوزيع والتوسع الأفقي، ويشتهر بسهولة إعداده مقارنة ببدائله في مراكز البيانات المتوسطة.",
      en: "A scalable distributed file system that turns ordinary storage servers into one namespace using building blocks called bricks. It supports replication, distribution, and horizontal scale-out, and is known for simpler setup compared to alternatives in mid-sized datacenters."
    },
    cmd: "gluster volume info",
    cmdDesc: { ar: "عرض معلومات تجمعات Gluster وأنواعها وحالتها", en: "Show Gluster volume details, types, and status" },
    tags: ["glusterfs", "distributed-fs", "scale-out", "bricks"]
  },
  {
    id: "t630",
    name: "BeeGFS",
    url: "https://www.beegfs.io",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "نظام ملفات متوازٍ صُمم للأنظمة العنقودية والحوسبة عالية الأداء، يقدم إنتاجية هائلة بفصل خدمات الواصفات عن خدمات التخزين. يشيع في بيئات HPC والأبحاث حيث تحتاج آلاف العقد قراءة الملفات نفسها بسرعة قريبة من سرعة الخط.",
      en: "A parallel file system designed for clusters and high-performance computing, delivering massive throughput by separating metadata services from storage services. It is common in HPC and research environments where thousands of nodes must read the same files at near line rate."
    },
    cmd: "beegfs-ctl --getstate",
    cmdDesc: { ar: "عرض حالة خدمات BeeGFS والواصفات والتخزين", en: "Show the state of BeeGFS metadata and storage services" },
    tags: ["beegfs", "parallel-fs", "hpc", "cluster"]
  },
  {
    id: "t631",
    name: "Lustre",
    url: "https://www.lustre.org",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "نظام الملفات المتوازي المهيمن على أسرع أجهزة الحوسبة الفائقة في العالم، يخزّن الواصفات على خوادم MGS/MDS والبيانات على أهداف OSS. تُظهر قوائم Top500 أن أضخم مراكز الحوسبة تعتمد عليه لسعات تخزين تتجاوز البيتابايت.",
      en: "The parallel file system dominating the world's fastest supercomputers, keeping metadata on MGS/MDS servers and file data on OSS storage targets. Top500 lists show the largest HPC centers rely on it for storage capacities well beyond petabytes."
    },
    cmd: "lctl dl",
    cmdDesc: { ar: "سرد أجهزة Lustre المنشأة والواصفات المتصلة", en: "List Lustre devices and attached targets" },
    tags: ["lustre", "parallel-fs", "supercomputing", "oss"]
  },
  {
    id: "t632",
    name: "MooseFS",
    url: "https://moosefs.com",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "نظام ملفات موزع يوفر تحمل أعطال عبر مستويات نسخ قابلة للضبط لكل ملف وتوسعًا أفقيًا بإضافة خوادم أجزاء فقط. يوفر سلة محذوفات ولقطات شبيهة بالآلة الزمنية وسهولة استعادة الملفات، مع إدارة مركزية عبر خادم Master وواجهة مراقبة ويب.",
      en: "A distributed fault-tolerant file system with per-file configurable replication goals and easy horizontal scaling by adding chunk servers. It includes a trash bin, time-machine-like snapshots, and simple file recovery, coordinated by a master server with a web monitoring UI."
    },
    cmd: "mfscli -SIN",
    cmdDesc: { ar: "عرض معلومات خادم Master ونشاط عنقود MooseFS", en: "Show MooseFS master server info and cluster activity" },
    tags: ["moosefs", "distributed-fs", "chunks", "master"]
  },
  {
    id: "t633",
    name: "OpenZFS",
    url: "https://openzfs.github.io",
    category: "storage",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "المشروع المجتمعي الذي يقود تطوير ZFS عبر لينكس وفري بي إس دي، موحدًا نظام الملفات وإدارة الأحجام في طبقة واحدة. يجمع التحقق الدائم بالبصمات والضغط واللقطات الفورية وذاكرة ARC للقراءة، ما يجعله أساس معظم بنى التخزين الحرجة للأعمال.",
      en: "The community project driving ZFS development across Linux and FreeBSD, unifying a file system and volume manager in one layer. It combines end-to-end checksumming, compression, instant snapshots, and the ARC read cache, forming the foundation of most business-critical storage builds."
    },
    cmd: "zpool create tank mirror /dev/sdb /dev/sdc",
    cmdDesc: { ar: "إنشاء تجمع ZFS باسم tank كمرآة بين قرصين", en: "Create a ZFS pool named tank mirroring two disks" },
    tags: ["openzfs", "zfs", "zpool", "filesystem"]
  },
  {
    id: "t634",
    name: "DRBD",
    url: "https://www.linbit.com/drbd/",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "نسخ تخزين كتل على مستوى الشبكة من LINBIT، يزامن أجهزة الكتل بين عقدتين أو أكثر وكأنه RAID1 موزع. يُعتمد عليه لبناء عنقود توفر عالي مع Pacemaker، وهو معيار النسخ المتزامن للبيانات في عناقيد لينكس منذ عقدين.",
      en: "LINBIT's network block replication that synchronizes block devices across two or more nodes like a distributed RAID1. It is the classic building block for two-node Pacemaker clusters and has been the Linux standard for synchronous data replication for two decades."
    },
    cmd: "drbdadm status",
    cmdDesc: { ar: "عرض حالة موارد DRBD ومرحلة المزامنة بين العقد", en: "Show DRBD resource status and inter-node sync state" },
    tags: ["drbd", "replication", "block-device", "ha"]
  },
  {
    id: "t635",
    name: "targetcli",
    url: "https://packages.debian.org/sid/targetcli-fb",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة الإعداد الرسمية لمحرك LIO، وهو هدف iSCSI والبروتوكولات SCSI الأخرى داخل نواة لينكس. توفر غلافًا تفاعليًا شجريًا لإنشاء backstores وتصدير أقراص LUN إلى مبادرات iSCSI مع دعم ALUA للمسارات المتعددة.",
      en: "The official configuration shell for LIO, the Linux kernel's SCSI target engine serving iSCSI and other SCSI fabrics. It offers an interactive tree-based shell to create backstores and export LUNs to iSCSI initiators with ALUA multipath support."
    },
    cmd: "targetcli ls",
    cmdDesc: { ar: "عرض شجرة هدف SCSI الحالية وأقراص LUN المصدرة", en: "Show the current SCSI target tree and exported LUNs" },
    tags: ["targetcli", "lio", "iscsi", "lun"]
  },
  {
    id: "t636",
    name: "Open-iSCSI",
    url: "https://github.com/open-iscsi/open-iscsi",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "المبادرة المرجعية لبروتوكول iSCSI على لينكس، تتضمن أداة iscsiadm لإدارة الاكتشاف وتسجيل الدخول والجلسات. يجعل تخزين SAN متاحًا عبر شبكة TCP/IP عادية بأداء يقترب من الألياف الضوئية عند استخدام شبكات 10 جيجابت أو أسرع.",
      en: "The reference iSCSI initiator for Linux, shipping the iscsiadm CLI for discovery, login, and session management. It makes SAN storage reachable over ordinary TCP/IP with performance approaching Fibre Channel when 10 GbE or faster networking is used."
    },
    cmd: "iscsiadm -m discovery -t sendtargets -p 192.168.1.10",
    cmdDesc: { ar: "اكتشاف أهداف iSCSI المتاحة على خادم SAN عبر عنوانه", en: "Discover available iSCSI targets on a SAN server via its address" },
    tags: ["iscsi", "iscsiadm", "initiator", "san"]
  },
  {
    id: "t637",
    name: "iSCSI Initiator (Windows)",
    url: "https://learn.microsoft.com/en-us/powershell/module/iscsi/",
    category: "storage",
    platform: ["windows"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "عميل iSCSI المدمج في ويندوز يُفتح عبر أمر iscsicpl ويُدار أيضًا بأوامر PowerShell من وحدة iSCSI. يسمح بتركيب أقراص LUN كأحجام كتل دائمة مع دعم MPIO لتعدد المسارات إلى هدف SAN.",
      en: "The iSCSI client built into Windows, opened with iscsicpl and driven by the iSCSI PowerShell module. It mounts LUNs as persistent block volumes and supports MPIO multipath connections to SAN targets."
    },
    cmd: "iscsicpl",
    cmdDesc: { ar: "فتح أداة مبادرة iSCSI في ويندوز لتسجيل الدخول إلى الأهداف", en: "Open the Windows iSCSI Initiator tool to log in to targets" },
    tags: ["iscsi", "windows", "mpio", "initiator"]
  },
  {
    id: "t638",
    name: "NFS-Ganesha",
    url: "https://github.com/nfs-ganesha/nfs-ganesha",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خادم NFS يعمل في مساحة المستخدم عبر وحدات FSAL تمكّنه من تصدير مخازن خلفية متنوعة عبر NFSv3 وv4 وv4.2. يتوسع أفضل من خادم النواة التقليدي، ويسمح ببناء بوابات NFS فوق Ceph أو GlusterFS أو أجهزة الكتل مباشرة.",
      en: "A userspace NFS server whose FSAL modules export heterogeneous backends through NFSv3, v4, and v4.2. It scales better than the classic in-kernel server and lets you build NFS gateways on top of Ceph, GlusterFS, or raw block devices."
    },
    cmd: "ganesha.nfsd -f /etc/ganesha/ganesha.conf",
    cmdDesc: { ar: "تشغيل NFS-Ganesha بملف إعدادات يعرّف الصادرات ووحدات FSAL", en: "Run NFS-Ganesha with a config file defining exports and FSAL backends" },
    tags: ["nfs-ganesha", "nfs", "fsal", "userspace"]
  },
  {
    id: "t639",
    name: "nvme-cli",
    url: "https://github.com/linux-nvme/nvme-cli",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة سطر الأوامر المرجعية لإدارة أجهزة NVMe في لينكس، بما فيها اكتشاف أهداف NVMe-oF عبر أنواع نقل مثل TCP وRDMA وFC. أصبحت البوابة القياسية للاتصال بمنصات SAN الحديثة القائمة على NVMe عبر إيثرنت.",
      en: "The reference Linux CLI for managing NVMe devices, including discovery of NVMe-oF Fabrics targets over TCP, RDMA, and FC transports. It has become the standard gateway to modern Ethernet-based NVMe SAN platforms."
    },
    cmd: "nvme discover -t tcp -a 192.168.1.20 -s 4420",
    cmdDesc: { ar: "اكتشاف أهداف NVMe-oF عبر TCP على خادم تخزين بعيد", en: "Discover NVMe-oF TCP targets on a remote storage server" },
    tags: ["nvme", "nvme-of", "fabrics", "cli"]
  },
  {
    id: "t640",
    name: "MinIO",
    url: "https://min.io",
    category: "storage",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم تخزين كائنات عالي الأداء متوافق مع S3 يعمل بملف تنفيذي واحد أو كعنقود موزع. يبسّط بناء تخزين كائني خاص للنسخ الاحتياطية وسجلات التطبيقات والبيانات الضخمة، مع إصدار مجتمعي مفتوح المصدر وإصدار مؤسسي مدفوع.",
      en: "A high-performance S3-compatible object store that runs as a single binary or a distributed cluster. It simplifies building private object storage for backups, application logs, and big data, with a free open-source community edition alongside a paid enterprise release."
    },
    cmd: "minio server /data --console-address ':9001'",
    cmdDesc: { ar: "تشغيل خادم MinIO على دليل /data مع وحدة تحكم على المنفذ 9001", en: "Run a MinIO server on /data with the console on port 9001" },
    tags: ["minio", "s3", "object-storage", "self-hosted"]
  },
  {
    id: "t641",
    name: "MinIO Client",
    url: "https://min.io/docs/minio/linux/reference/minio-mc.html",
    category: "storage",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "أداة mc الرسمية للتعامل مع MinIO وأي خدمة متوافقة مع S3، بأوامر بأسلوب Unix مثل ls وcp وmirror. تدعم الأسماء المستعارة لخوادم متعددة ومزامنة دورية بين الدلاء، ما يجعلها رفيقة مثالية لأتمتة التخزين الكائني.",
      en: "The official mc CLI for MinIO and any S3-compatible service, using Unix-style commands such as ls, cp, and mirror. It supports aliases for multiple servers and scheduled bucket-to-bucket replication, making it perfect for automating object storage operations."
    },
    cmd: "mc alias set local http://127.0.0.1:9000",
    cmdDesc: { ar: "تعريف اسم مستعار local لخادم MinIO لاستخدامه في أوامر mc", en: "Define the alias local for a MinIO server to use in mc commands" },
    tags: ["mc", "minio", "s3", "cli"]
  },
  {
    id: "t642",
    name: "SeaweedFS",
    url: "https://github.com/seaweedfs/seaweedfs",
    category: "storage",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام تخزين كائنات سريع مستوحى من ورقة Haystack في فيسبوك، بوصول قرص O(1) لكل ملف. يعرض واجهات S3 ونظام ملفات Filer كاملًا، ما يجعله أخف بكثير من Ceph لحالات استخدام مليارات الملفات الصغيرة.",
      en: "A fast object store inspired by Facebook's Haystack paper, achieving O(1) disk access per file. It exposes S3 and a full Filer file system, making it far lighter than Ceph for use cases with billions of small files."
    },
    cmd: "weed server -dir=/data -volume.max=100",
    cmdDesc: { ar: "تشغيل خادم SeaweedFS على دليل /data بحد 100 وحدة تخزين", en: "Run a SeaweedFS server on /data with a 100-volume limit" },
    tags: ["seaweedfs", "object-storage", "haystack", "s3"]
  },
  {
    id: "t643",
    name: "JuiceFS",
    url: "https://github.com/juicedata/juicefs",
    category: "storage",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام ملفات موزع مفتوح المصدر يفصل البيانات عن الواصفات عبر مخزن كائنات خلفي وRedis أو قاعدة بيانات للواصفات. يشغّل أحمال POSIX كاملة بسرعة عالية فوق S3 أو أي تخزين كائني، ويناسب مشاركة البيانات بين الخدمات والمواقع.",
      en: "An open-source distributed file system that separates data from metadata, using an object store for bytes and Redis or SQL for inodes. It runs full POSIX workloads at high speed on top of S3-compatible storage, ideal for sharing data across services and sites."
    },
    cmd: "juicefs mount redis://127.0.0.1:6379/1 /mnt/jfs",
    cmdDesc: { ar: "تركيب نظام ملفات JuiceFS عند /mnt/jfs بواصفات مخزنة في Redis", en: "Mount a JuiceFS file system at /mnt/jfs with metadata in Redis" },
    tags: ["juicefs", "posix", "s3", "metadata"]
  },
  {
    id: "t644",
    name: "OpenStack Swift",
    url: "https://docs.openstack.org/swift/latest/",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خدمة تخزين الكائنات في OpenStack المصممة لمتانة عالية وتكرار عبر مناطق متعددة، مع تحقق بالبصمات في كل قراءة. تُخزّن الكائنات في دلاء تحت حسابات وأذونات دقيقة، وتُدار برمجيًا أو عبر أدوات متوافقة مع S3.",
      en: "OpenStack's object storage service engineered for high durability and multi-region replication, verifying checksums on every read. Objects live in containers governed by accounts and fine-grained ACLs, managed programmatically or with S3-compatible tooling."
    },
    cmd: "swift list",
    cmdDesc: { ar: "سرد الحاويات في تخزين Swift عبر عميل python-swiftclient", en: "List containers in Swift storage via the python-swiftclient CLI" },
    tags: ["swift", "openstack", "object-storage", "replication"]
  },
  {
    id: "t645",
    name: "Rook",
    url: "https://rook.io",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مشغّل تخزين لبيئة Kubernetes يحوّل Ceph ونظم تخزين أخرى إلى خدمات سحابية أصلية تُدار بموارد Kubernetes. ينشر MONs وOSDs تلقائيًا ويوفر فئات تخزين لـ RBD وCephFS وS3 عبر مزودات CSI دون خبرة Ceph يدوية عميقة.",
      en: "A storage orchestrator for Kubernetes that turns Ceph and other backends into cloud-native services managed as custom resources. It automates MON and OSD deployment and exposes storage classes for RBD, CephFS, and S3 through CSI drivers without deep manual Ceph expertise."
    },
    cmd: "kubectl get cephclusters -A",
    cmdDesc: { ar: "عرض عناقيد Ceph التي يديرها Rook في جميع الفضاءات", en: "Show Ceph clusters managed by Rook across all namespaces" },
    tags: ["rook", "kubernetes", "ceph", "csi"]
  },
  {
    id: "t646",
    name: "Longhorn",
    url: "https://longhorn.io",
    category: "storage",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تخزين كتل موزع لبيئة Kubernetes من Rancher يعتمد نسخًا متزامنًا للأحجام بين العقد لضمان قابلية الاستمرار. يتضمن جدولة النسخ ولقطات دورية ونسخًا احتياطيًا إلى NFS أو S3، مع واجهة رسومية واضحة لمراقبة صحة الأحجام.",
      en: "Rancher's distributed block storage for Kubernetes that replicates volumes synchronously across nodes for resiliency. It includes replica scheduling, recurring snapshots, backups to NFS or S3, and a clean UI for volume health visibility."
    },
    cmd: "kubectl -n longhorn-system get volumes.longhorn.io",
    cmdDesc: { ar: "سرد أحجام التخزين التي يديرها Longhorn في عنقود Kubernetes", en: "List storage volumes managed by Longhorn in a Kubernetes cluster" },
    tags: ["longhorn", "kubernetes", "block-storage", "replication"]
  },
  {
    id: "t647",
    name: "NetApp ONTAP",
    url: "https://www.netapp.com/data-storage/ontap/",
    category: "storage",
    platform: ["web"],
    license: "paid",
    difficulty: 4,
    desc: {
      ar: "نظام تشغيل التخزين المؤسسي من NetApp يوحّد NAS عبر NFS/SMB وSAN عبر iSCSI/FC/NVMe-oF في منصة واحدة. يوفر مجلدات FlexGroup مرنة ولقطات Snapshot فورية وترتيبًا طبقيًا سلسًا إلى السحابة لأحمال المؤسسات.",
      en: "NetApp's enterprise storage operating system unifying NAS over NFS/SMB with SAN over iSCSI/FC/NVMe-oF on one platform. It delivers flexible FlexGroup volumes, instant Snapshot copies, and seamless cloud tiering for enterprise workloads."
    },
    cmd: "storage aggregate show",
    cmdDesc: { ar: "عرض مجمّعات التخزين وسعتها من وحدة ONTAP CLI", en: "Show storage aggregates and their capacity from the ONTAP CLI" },
    tags: ["ontap", "netapp", "san", "nas"]
  },
  {
    id: "t648",
    name: "Dell PowerStore",
    url: "https://www.dell.com/en-us/dt/storage/powerstore.htm",
    category: "storage",
    platform: ["web"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "منصة تخزين متوسطة المدى من ديل مبنية بالكامل على NVMe تجمع الكتل والملفات والكائنات مع ترقيات Anytime Upgrade. تُدار عبر واجهة PowerStore Manager، وتدعم تشغيل الآلات الافتراضية مباشرة على المصفوفة عبر خاصية AppsON.",
      en: "Dell's midrange all-NVMe storage platform combining block, file, and object access with Anytime Upgrade capability. It is administered through PowerStore Manager and can even run VMs natively on the array with the AppsON feature."
    },
    tags: ["powerstore", "dell", "nvme", "all-flash"]
  },
  {
    id: "t649",
    name: "VMware vSAN",
    url: "https://www.vmware.com/products/vsan.html",
    category: "storage",
    platform: ["web"],
    license: "paid",
    difficulty: 3,
    desc: {
      ar: "تخزين فائق الدمج مدمج في vSphere يجمع أقراص العقد إلى مخزن بيانات مشترك دون جهاز SAN خارجي. يوفر سياسات تخزين قائمة على القواعد وضغطًا وترميزًا محوًا وعناقيد ممتدة بين المواقع لرفع التوفر.",
      en: "Hyperconverged storage embedded in vSphere that pools host disks into a shared datastore without an external SAN array. It provides policy-based storage classes, compression, erasure coding, and stretched clusters across sites for higher availability."
    },
    cmd: "esxcli vsan cluster get",
    cmdDesc: { ar: "عرض حالة عنقود vSAN ومعلوماته من مضيف ESXi", en: "Show vSAN cluster state and info from an ESXi host" },
    tags: ["vsan", "vmware", "hyperconverged", "vsphere"]
  },
  {
    id: "t650",
    name: "Amazon S3",
    url: "https://aws.amazon.com/s3/",
    category: "storage",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "خدمة تخزين الكائنات الأشهر عالميًا التي بُنيت عليها الواجهة القياسية S3 API التي تقلّدها منصات لا تُحصى. تقدم فئات تخزين من الاستخدام المتكرر إلى Glacier للأرشيف، مع إصدارات وسياسات دورة حياة وتوسّع بلا حدود عملية.",
      en: "The world's most famous object storage service whose S3 API became the industry standard imitated by countless platforms. It offers storage classes from frequent access to Glacier archival, plus versioning, lifecycle policies, and practically unlimited scale."
    },
    cmd: "aws s3 ls s3://my-bucket",
    cmdDesc: { ar: "سرد محتويات دلو S3 عبر أداة AWS CLI", en: "List the contents of an S3 bucket via the AWS CLI" },
    tags: ["s3", "aws", "object-storage", "cloud"]
  },

  // ── IoT & MQTT / إنترنت الأشياء وبروتوكول MQTT ─────────────────────────
  {
    id: "t651",
    name: "Eclipse Mosquitto",
    url: "https://mosquitto.org",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "وسيط MQTT الأشهر مفتوح المصدر، خفيف الوزن بما يكفي للأجهزة المدمجة وقوي بما يكفي لبيئات الإنتاج. يدعم إصدارات MQTT v3.1 وv5 وشهادات TLS وقوائم تحكم ACL، وتأتي معه أدوات النشر والاشتراك الجاهزة للتشخيص.",
      en: "The most popular open-source MQTT broker, light enough for embedded devices yet production-proven. It supports MQTT v3.1 and v5, TLS certificates, and ACLs, and ships the handy mosquitto_pub/sub diagnostic clients."
    },
    cmd: "mosquitto_sub -h broker.local -t 'sensors/#' -v",
    cmdDesc: { ar: "الاشتراك في جميع مواضيع sensors مع عرض المواضيع والحمولات", en: "Subscribe to all sensors topics showing full topic and payload" },
    tags: ["mosquitto", "mqtt", "broker", "eclipse"]
  },
  {
    id: "t652",
    name: "EMQX",
    url: "https://www.emqx.com",
    category: "iot",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "وسيط MQTT موزّع واسع النطاق يوصل ملايين الاتصالات المتزامنة عبر عناقيد أفقية، ويدعم MQTT v3/v5 وMQTT عبر QUIC. يقدم لوحة مراقبة مدمجة ومحرك قواعد يوجّه الرسائل إلى قواعد البيانات وKafka دون كتابة كود خارجي.",
      en: "A massively scalable distributed MQTT broker sustaining millions of concurrent connections on horizontally clustered nodes, with MQTT v3/v5 and MQTT-over-QUIC support. It ships a built-in dashboard and a rules engine that routes messages to databases and Kafka without external code."
    },
    cmd: "emqx start",
    cmdDesc: { ar: "تشغيل خدمة وسيط EMQX على الخادم", en: "Start the EMQX broker service on the server" },
    tags: ["emqx", "mqtt", "cluster", "rules-engine"]
  },
  {
    id: "t653",
    name: "VerneMQ",
    url: "https://vernemq.com",
    category: "iot",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "وسيط MQTT موزع مكتوب بلغة Erlang فوق منصة OTP بتحمل أعطال أصيل. يوازن حمل الاشتراكات عبر عقد العنقود ويحفظ الرسائل في طبقة إصرار قابلة للضبط، ما يناسب بيئات MQTT عالية الاعتمادية.",
      en: "A distributed MQTT broker written in Erlang on top of the OTP platform's native fault tolerance. It load-balances subscriptions across cluster nodes and persists messages in a tunable storage layer, fitting high-reliability MQTT deployments."
    },
    cmd: "vmq-admin cluster show",
    cmdDesc: { ar: "عرض عقد عنقود VerneMQ وحالة انضمامها", en: "Show VerneMQ cluster nodes and their join state" },
    tags: ["vernemq", "mqtt", "erlang", "cluster"]
  },
  {
    id: "t654",
    name: "NanoMQ",
    url: "https://nanomq.io",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "وسيط MQTT خفيف موجه لشبكة الحافة مبنٍ على نواة NNG لتحقيق أداء عالٍ على معالجات ARM الضعيفة. يدعم MQTT 3.1.1 و5.0 وبروتوكول MQTT عبر QUIC الناشئ، مع قواعد مدمجة وجسر للرسائل من الحافة إلى السحابة.",
      en: "An edge-focused MQTT broker built on the NNG messaging core for strong performance on low-power ARM CPUs. It supports MQTT 3.1.1, MQTT 5.0, and the emerging MQTT-over-QUIC, with embedded rules for edge-to-cloud message bridging."
    },
    cmd: "nanomq start",
    cmdDesc: { ar: "تشغيل وسيط NanoMQ على جهاز الحافة", en: "Start the NanoMQ broker on an edge device" },
    tags: ["nanomq", "mqtt", "edge", "quic"]
  },
  {
    id: "t655",
    name: "HiveMQ",
    url: "https://www.hivemq.com",
    category: "iot",
    platform: ["cross"],
    license: "freemium",
    difficulty: 3,
    desc: {
      ar: "وسيط MQTT تجاري موجه للمؤسسات وإنترنت الأشياء الحرجة، مع خطة مجانية صغيرة في إصداره السحابي HiveMQ Cloud. يتميز بملحقات جاهزة لـ Kafka والأنظمة المؤسسية وأدوات مراقبة عميقة لضمانات جودة الخدمة QoS.",
      en: "A commercial MQTT broker aimed at enterprise and mission-critical IoT, with a small free plan in its HiveMQ Cloud edition. It stands out through ready-made Kafka and enterprise extensions plus deep observability for QoS guarantees."
    },
    tags: ["hivemq", "mqtt", "enterprise", "cloud"]
  },
  {
    id: "t656",
    name: "Node-RED",
    url: "https://nodered.org",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة برمجة تدفقية من IBM تربط أجهزة إنترنت الأشياء وواجهات API والخدمات عبر عقد مرئية دون كتابة كود. تتكامل أصلًا مع MQTT وWebSockets وقواعد البيانات، وتعد أسرع طريق لبناء لوحات أجهزة وأتمتة عمليات من المتصفح.",
      en: "IBM's flow-based programming tool that wires IoT devices, APIs, and services together using visual nodes without code. It integrates natively with MQTT, WebSockets, and databases, and is the fastest way to build device dashboards and automation from the browser."
    },
    cmd: "node-red",
    cmdDesc: { ar: "تشغيل محرر Node-RED على المنفذ 1880 لبدء بناء التدفقات", en: "Start the Node-RED editor on port 1880 to begin building flows" },
    tags: ["node-red", "flow", "automation", "mqtt"]
  },
  {
    id: "t657",
    name: "ThingsBoard",
    url: "https://thingsboard.io",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة إنترنت أشياء مفتوحة المصدر لإدارة الأجهزة وجمع القياسات وتصورها عبر لوحات قابلة للتخصيص. تدعم MQTT وCoAP وHTTP وتوفر محرك قواعد لتحويل البيانات وإطلاق التنبيهات، مع تسلسل إداري متعدد المستأجرين.",
      en: "An open-source IoT platform for device management, telemetry collection, and visualization through customizable dashboards. It supports MQTT, CoAP, and HTTP, and includes a rules engine for data transformation and alerting plus multi-tenant asset hierarchies."
    },
    cmd: "docker run -it -p 8080:8080 -p 1883:1883 thingsboard/tb-postgres",
    cmdDesc: { ar: "تشغيل ThingsBoard في حاوية مع قاعدة PostgreSQL ووسيط MQTT", en: "Run ThingsBoard in a container with PostgreSQL and an MQTT listener" },
    tags: ["thingsboard", "iot-platform", "dashboard", "telemetry"]
  },
  {
    id: "t658",
    name: "Eclipse Hono",
    url: "https://www.eclipse.org/hono/",
    category: "iot",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار اتصال إنترنت أشياء من Eclipse يعرض موصلات بروتوكول موحدة لـ MQTT وHTTP وAMQP فوق شبكة رسائل مشتركة. يفصل مصادقة الأجهزة عن التوجيه ويصدر بيانات اعتماد لكل جهاز، فيعمل كطبقة استيعاب موحدة لأسطول أجهزة متنوع.",
      en: "Eclipse's IoT connectivity framework exposing unified protocol adapters for MQTT, HTTP, and AMQP on top of a common messaging network. It separates device authentication from routing and issues per-device credentials, acting as a homogeneous ingestion layer for heterogeneous fleets."
    },
    cmd: "kubectl -n hono get deployments",
    cmdDesc: { ar: "عرض مكونات Hono المنشورة في فضاء hono على Kubernetes", en: "Show Hono components deployed in the hono namespace on Kubernetes" },
    tags: ["hono", "eclipse", "protocol-adapters", "amqp"]
  },
  {
    id: "t659",
    name: "Eclipse Kura",
    url: "https://www.eclipse.org/kura/",
    category: "iot",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "إطار بوابة إنترنت أشياء من Eclipse يعمل على لينكس والأجهزة المدمجة مثل Raspberry Pi. يوفر حاوية خدمات OSGi لإدارة الوصلات والسجلات من واجهة ويب، مع موصلات MQTT سحابية لربط البوابات الميدانية بالخوادم الخلفية.",
      en: "Eclipse's IoT gateway framework running on Linux and edge hardware like the Raspberry Pi. It provides an OSGi service container managing connectivity and logs from a web UI, with MQTT cloud connectors linking field gateways to backend servers."
    },
    cmd: "sudo ./start_kura.sh",
    cmdDesc: { ar: "تشغيل بوابة Kura عبر سكربت البدء الرسمي", en: "Start the Kura gateway using the official startup script" },
    tags: ["kura", "gateway", "osgi", "edge"]
  },
  {
    id: "t660",
    name: "Eclipse Kapua",
    url: "https://www.eclipse.org/kapua/",
    category: "iot",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة سحابية لإدارة أجهزة إنترنت الأشياء من Eclipse صُممت كخلفية مكملة لبوابات Kura. تجمع سجل الأجهزة والقياسات والتحكم البعيد عبر MQTT وREST مع أدوار وأذونات صارمة، فوق خدمات حاوية قابلة للتوسع.",
      en: "Eclipse's cloud platform for IoT device management, designed as the backend counterpart to Kura gateways. It combines a device registry, telemetry storage, and remote commands over MQTT/REST with strict roles and permissions on scalable containerized services."
    },
    cmd: "docker compose up -d",
    cmdDesc: { ar: "تشغيل مكونات Kapua في حاويات Docker في الخلفية", en: "Start Kapua components in Docker containers in the background" },
    tags: ["kapua", "device-management", "eclipse", "cloud"]
  },
  {
    id: "t661",
    name: "Eclipse Paho",
    url: "https://eclipse.dev/paho/",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "عائلة مكتبات عملاء MQTT الرسمية من Eclipse بأكثر من عشر لغات برمجة منها C وJava وPython وGo. تعدّ المرجع لاختبار وسطاء MQTT وبناء تطبيقات النشر والاشتراك، وتلتزم بمواصفات البروتوكول بدقة عبر جميع التطبيقات.",
      en: "Eclipse's official MQTT client library family spanning more than ten languages including C, Java, Python, and Go. It is the reference for testing MQTT brokers and building pub/sub applications, closely tracking the protocol specification across implementations."
    },
    cmd: "pip install paho-mqtt",
    cmdDesc: { ar: "تثبيت مكتبة عميل MQTT بلغة بايثون من عائلة Paho", en: "Install the Python MQTT client library from the Paho family" },
    tags: ["paho", "mqtt", "client", "libraries"]
  },
  {
    id: "t662",
    name: "MQTT Explorer",
    url: "https://mqtt-explorer.com",
    category: "iot",
    platform: ["cross"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "عميل MQTT رسومي شامل يعرض مواضيع الوسيط كشجرة ديناميكية مع رسوم بيانية حية لقيم الحمولات. يسهّل تشخيص الرسائل المتناثرة وفحص الحمولات الثنائية والنصية أثناء تطوير أنظمة إنترنت الأشياء.",
      en: "A comprehensive graphical MQTT client that visualizes broker topics as a dynamic tree with live charts of payload values. It eases debugging of scattered messages and inspection of binary and JSON payloads while developing IoT systems."
    },
    cmd: "mqtt-explorer",
    cmdDesc: { ar: "فتح واجهة MQTT Explorer للاتصال بوسيط MQTT", en: "Open the MQTT Explorer interface to connect to an MQTT broker" },
    tags: ["mqtt-explorer", "mqtt", "gui", "debugging"]
  },
  {
    id: "t663",
    name: "MQTTX",
    url: "https://mqttx.app",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "عميل MQTT رسومي وسطر أوامر من فريق EMQ يدعم MQTT 3.1.1 و5.0 وWebSocket فوق TLS. يوفر واجهة من صفحة واحدة لمحاكاة عملاء متعددين، مع نمط CLI للتشغيل الآلي داخل السكربتات.",
      en: "EMQ's cross-platform MQTT client offering both a GUI and a CLI, supporting MQTT 3.1.1, 5.0, and WebSocket over TLS. It provides a single-page interface for simulating multiple clients, plus a CLI mode for scripted automation."
    },
    cmd: "mqttx sub -t 'sensors/#' -h broker.local -v",
    cmdDesc: { ar: "الاشتراك في مواضيع sensors عبر واجهة MQTTX سطر الأوامر", en: "Subscribe to sensors topics via the MQTTX command line interface" },
    tags: ["mqttx", "mqtt", "client", "cli"]
  },
  {
    id: "t664",
    name: "libcoap",
    url: "https://github.com/obgm/libcoap",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "التنفيذ المرجعي المفتوح المصدر لبروتوكول CoAP بلغة C مع مكتبات عميل وخادم مصممة للأجهزة محدودة الموارد. يدعم Observe وDTLS وOSCORE للأمان الخفيف، ويشيع في أنظمة إنترنت الأشياء محدودة الطاقة والذاكرة.",
      en: "The open-source reference C implementation of the CoAP protocol with client and server libraries tailored for constrained devices. It supports Observe, DTLS, and OSCORE lightweight security, and is widely used in battery- and memory-limited IoT systems."
    },
    cmd: "coap-client -m get coap://localhost/.well-known/core",
    cmdDesc: { ar: "استعلام مورد اكتشاف CoAP القياسي على خادم محلي", en: "Query the standard CoAP discovery resource on a local server" },
    tags: ["libcoap", "coap", "constrained", "rfc7252"]
  },
  {
    id: "t665",
    name: "aiocoap",
    url: "https://github.com/chrysn/aiocoap",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "تنفيذ CoAP ببايثون غير متزامن يوفر عميلًا وخادمًا ووكلاء مع دعم Observe وOSCORE. أداة عملية لأتمتة اختبارات CoAP وبناء أنظمة مراقبة شبه فورية عبر تفاعلات بأسلوب REST لإنترنت الأشياء.",
      en: "A Python asyncio implementation of CoAP providing client, server, and proxy support with Observe and OSCORE. It is a practical choice for automating CoAP tests and building near-real-time monitoring over REST-style IoT interactions."
    },
    cmd: "python3 -m aiocoap-client coap://localhost/time",
    cmdDesc: { ar: "طلب مورد الوقت عبر عميل aiocoap سطر الأوامر", en: "Request the time resource via the aiocoap command line client" },
    tags: ["aiocoap", "coap", "python", "asyncio"]
  },
  {
    id: "t666",
    name: "Eclipse Leshan",
    url: "https://www.eclipse.org/leshan/",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خادم LwM2M مرجعي من Eclipse يدير الأجهزة محدودة الموارد عبر CoAP/DTLS بنموذج كائنات OMA. يشمل عميل Leshan وأدوات تجريبية لاختبار تسجيل الأجهزة والتحديث البعيد للبرامج الثابتة OTA.",
      en: "Eclipse's reference LwM2M server managing constrained devices over CoAP/DTLS using the OMA object model. It includes the Leshan client and demo tools to exercise device registration and over-the-air firmware updates."
    },
    cmd: "java -jar leshan-server-demo.jar",
    cmdDesc: { ar: "تشغيل خادم Leshan التجريبي لاختبار أجهزة LwM2M", en: "Run the Leshan demo server to test LwM2M devices" },
    tags: ["leshan", "lwm2m", "oma", "coap"]
  },
  {
    id: "t667",
    name: "Home Assistant",
    url: "https://www.home-assistant.io",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "منصة أتمتة المنازل مفتوحة المصدر الأوسع انتشارًا، تتكامل مع آلاف الأجهزة عبر MQTT وZigbee وZ-Wave. تتيح كتابة أتمتة قوية ولوحات مراقبة مع أولوية الخصوصية المحلية دون الاعتماد على سحابة خارجية.",
      en: "The most widely deployed open-source home automation platform, integrating thousands of devices through MQTT, Zigbee, and Z-Wave. It supports powerful automations and dashboards with a local-first privacy model that avoids external clouds."
    },
    cmd: "ha core info",
    cmdDesc: { ar: "عرض معلومات نواة Home Assistant من واجهة سطر الأوامر ha", en: "Show Home Assistant Core info via the ha command line interface" },
    tags: ["home-assistant", "smart-home", "zigbee", "automation"]
  },
  {
    id: "t668",
    name: "openHAB",
    url: "https://www.openhab.org",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة أتمتة مفتوحة المصدر مكتوبة بلغة Java ومحايدة تجاه الشركات والأجهزة، تعمل على ويندوز ولينكس وماك. توحد الأجهزة في نموذج things وchannels وbindings، وتتيح كتابة القواعد رسوميًا أو نصيًا مع تنبيهات.",
      en: "A Java-based, vendor-neutral open-source automation platform running on Windows, Linux, and macOS. It models devices as things with channels and bindings, and lets rules be authored graphically or in text with alerting support."
    },
    cmd: "openhab-cli info",
    cmdDesc: { ar: "عرض معلومات تثبيت openHAB وحالته عبر أداة سطر الأوامر", en: "Show openHAB installation info and status via its CLI tool" },
    tags: ["openhab", "smart-home", "java", "bindings"]
  },
  {
    id: "t669",
    name: "ESPHome",
    url: "https://esphome.io",
    category: "iot",
    platform: ["cross"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "نظام يمنح رقاقات ESP32 وESP8260 حياة ذكية عبر تحويل ملف YAML إلى برامج ثابتة جاهزة. يتصل كل مستشعر تلقائيًا بشبكة WiFi أو MQTT ويظهر في Home Assistant دون كتابة سطر C واحد.",
      en: "A system that turns ESP32 and ESP8266 boards into smart devices by compiling YAML files into ready firmware. Every sensor automatically joins WiFi or MQTT and appears in Home Assistant without writing a single line of C."
    },
    cmd: "esphome wizard livingroom.yaml",
    cmdDesc: { ar: "بدء معالج إنشاء ملف إعدادات جهاز ESPHome باسم livingroom", en: "Start the wizard creating an ESPHome device config named livingroom" },
    tags: ["esphome", "esp32", "firmware", "yaml"]
  },
  {
    id: "t670",
    name: "Tasmota",
    url: "https://tasmota.github.io/docs/",
    category: "iot",
    platform: ["web"],
    license: "opensource",
    difficulty: 2,
    desc: {
      ar: "برنامج ثابت مفتوح المصدر لرقاقات ESP يعاد تحميله على الأجهزة الذكية التجارية ليعمل محليًا عبر MQTT أو HTTP. يدعم مئات الأجهزة المغلقة أصلًا، ويمكن تثبيته غالبًا من المتصفح عبر أداة التثبيت الويب.",
      en: "An open-source firmware for ESP chips that reflashes commercial smart devices to work locally over MQTT or HTTP. It supports hundreds of formerly closed devices and can often be installed straight from the browser with the web installer."
    },
    cmd: "esptool.py write_flash 0x0 tasmota.bin",
    cmdDesc: { ar: "تحميل برنامج Tasmota الثابت إلى رقاقة ESP عبر العنوان 0x0", en: "Flash the Tasmota firmware onto an ESP chip at address 0x0" },
    tags: ["tasmota", "esp8266", "firmware", "smart-devices"]
  },
  {
    id: "t671",
    name: "Zigbee2MQTT",
    url: "https://www.zigbee2mqtt.io",
    category: "iot",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "جسر برمجي يربط منسّق Zigbee بوسيط MQTT، فيحرر أجهزة Zigbee من الجسور السحابية المغلقة للمصنّعين. يدعم آلاف الأجهزة مباشرة عبر قاعدة تعيينات ضخمة ويعمل على Raspberry Pi بموارد ضئيلة.",
      en: "A software bridge connecting a Zigbee coordinator to an MQTT broker, freeing Zigbee devices from vendor cloud gateways. It supports thousands of devices out of the box through an extensive mapping database and runs comfortably on a Raspberry Pi."
    },
    cmd: "systemctl status zigbee2mqtt",
    cmdDesc: { ar: "فحص حالة خدمة Zigbee2MQTT على مضيف لينكس", en: "Check the Zigbee2MQTT service status on a Linux host" },
    tags: ["zigbee2mqtt", "zigbee", "mqtt", "bridge"]
  },
  {
    id: "t672",
    name: "ChirpStack",
    url: "https://www.chirpstack.io",
    category: "iot",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خادم شبكة LoRaWAN مفتوح المصدر الأشهر لإدارة بوابات وأجهزة LoRa. يمرّر الرسائل عبر تكامل MQTT ويوفر مسار بيانات مرنًا إلى قواعد البيانات وHTTP، مع دعم تفعيل ABP وOTAA وفئات الأجهزة A/B/C.",
      en: "The most popular open-source LoRaWAN network server for managing LoRa gateways and devices. It funnels uplinks through an MQTT integration, offers flexible routing to databases and HTTP, and supports ABP/OTAA activation and Class A/B/C devices."
    },
    cmd: "chirpstack --config /etc/chirpstack/chirpstack.toml",
    cmdDesc: { ar: "تشغيل خادم ChirpStack بملف إعدادات بصيغة TOML", en: "Run the ChirpStack server with a TOML configuration file" },
    tags: ["chirpstack", "lorawan", "lora", "network-server"]
  },
  {
    id: "t673",
    name: "The Things Network",
    url: "https://www.thethingsnetwork.org",
    category: "iot",
    platform: ["web"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "شبكة LoRaWAN مجتمعية عالمية توفر اتصال إنترنت أشياء مجانيًا عبر بوابات يديرها متطوعون حول العالم. تقدم نشرًا من Things Stack بواجهات غنية للأجهزة والتكاملات دون تكاليف تشغيل.",
      en: "A global community LoRaWAN network providing free IoT connectivity through volunteer-run gateways worldwide. It offers a Things Stack deployment with rich device and integration consoles at no operating cost."
    },
    cmd: "ttn-lw-cli login",
    cmdDesc: { ar: "تسجيل الدخول إلى The Things Stack عبر أداته الرسمية ttn-lw-cli", en: "Log in to The Things Stack via the official ttn-lw-cli tool" },
    tags: ["ttn", "lorawan", "community", "things-stack"]
  },
  {
    id: "t674",
    name: "Magistrala",
    url: "https://github.com/absmach/magistrala",
    category: "iot",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "منصة إنترنت أشياء مفتوحة المصدر تعرف سابقًا باسم Mainflux، مبنية على معمارية الخدمات المصغرة بلغة Go. توفر موصلات موحدة لـ MQTT وHTTP وCoAP مع تجريد الأشياء والقنوات ومصادقة JWT وتخزين الرسائل.",
      en: "An open-source IoT platform formerly known as Mainflux, built on Go microservices. It exposes unified MQTT, HTTP, and CoAP adapters with things-and-channels abstractions, JWT authentication, and message persistence."
    },
    cmd: "docker compose -f docker/compose/docker-compose.yml up -d",
    cmdDesc: { ar: "تشغيل مكونات Magistrala في حاويات Docker بالوضع الخلفي", en: "Start Magistrala components in Docker containers in the background" },
    tags: ["magistrala", "mainflux", "microservices", "golang"]
  },
  {
    id: "t675",
    name: "ThingSpeak",
    url: "https://thingspeak.com",
    category: "iot",
    platform: ["web"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "منصة تحليلات إنترنت أشياء من MathWorks تستقبل بيانات الأجهزة عبر REST وMQTT إلى قنوات تخزين. تتيح معالجة القياسات ببرامج MATLAB مدمجة وإطلاق تفاعلات وتنبيهات دون تشغيل خادم خاص.",
      en: "MathWorks' IoT analytics platform that ingests device data through REST and MQTT into storage channels. It lets you process measurements with embedded MATLAB analyses and trigger reactions and alerts without running your own backend."
    },
    cmd: "curl 'https://api.thingspeak.com/update?api_key=KEY&field1=25'",
    cmdDesc: { ar: "إرسال قياس جديد إلى قناة ThingSpeak عبر واجهة REST", en: "Push a new measurement to a ThingSpeak channel via the REST API" },
    tags: ["thingspeak", "analytics", "matlab", "iot-cloud"]
  },

  // ── Telecom & Mobile Core / الاتصالات والنواة المتنقلة ──────────────────
  {
    id: "t676",
    name: "Open5GS",
    url: "https://open5gs.org",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "تنفيذ كامل مفتوح المصدر لنواة شبكات 4G EPC و5GC بلغة C يتضمن MME وHSS وSMF وUPF وAMF. يتيح تشغيل نواة شبكة متنقلة حقيقية في المختبر لتجربة GTP وNGAP وتسجيل الأجهزة بشهادات ملفات SIM قابلة للبرمجة.",
      en: "A complete open-source implementation of the 4G EPC and 5G core (5GC) in C, including MME, HSS, SMF, UPF, and AMF. It lets you run a real mobile core in the lab to experiment with GTP, NGAP, and IMSI-based registration using programmable SIMs."
    },
    cmd: "systemctl status open5gs-mmed",
    cmdDesc: { ar: "فحص حالة خدمة MME ضمن مكونات Open5GS", en: "Check the status of the MME service among Open5GS components" },
    tags: ["open5gs", "epc", "5gc", "mme"]
  },
  {
    id: "t677",
    name: "free5GC",
    url: "https://www.free5gc.org",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "نواة 5G مفتوحة المصدر ذات توجه بحثي من جامعة تايوان الوطنية، مكتوبة بلغة Go وتدعم الوضع المستقل SA. تنفذ مجموعة وظائف الشبكة القياسية من AMF وSMF وUPF وNRF، وتعتمد مرجعًا أكاديميًا لتجارب 5GC.",
      en: "A research-oriented open-source 5G core from National Taiwan University written in Go, supporting standalone (SA) mode. It implements the standard network function set (AMF, SMF, UPF, NRF) and serves as an academic reference for 5GC experimentation."
    },
    cmd: "./run.sh",
    cmdDesc: { ar: "تشغيل مكونات نواة free5GC عبر السكربت الرسمي", en: "Start the free5GC core components via the official script" },
    tags: ["free5gc", "5gc", "sa", "research"]
  },
  {
    id: "t678",
    name: "Magma",
    url: "https://www.magmacore.org",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "نواة شبكة متنقلة مفتوحة المصدر طوّرتها ميتا لتمديد التغطية الخلوية إلى المناطق النائية. تعمل كبوابة وصول AGW خفيفة تنفذ EPC بواجهات S1 وGTP-C، وتُدار مركزيًا عبر منسق سحابي Orchestrator.",
      en: "An open-source mobile core developed at Meta to extend cellular coverage into remote regions. It runs as a lightweight Access Gateway (AGW) implementing the EPC with S1 and GTP-C interfaces, orchestrated centrally from the cloud."
    },
    cmd: "cd $MAGMA_ROOT/lte/gateway && make run",
    cmdDesc: { ar: "بناء وتشغيل بوابة الوصول AGW من شجرة مصادر Magma", en: "Build and run the AGW access gateway from the Magma source tree" },
    tags: ["magma", "agw", "epc", "facebook"]
  },
  {
    id: "t679",
    name: "OpenAirInterface",
    url: "https://www.openairinterface.org",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "منصة برمجية مفتوحة المصدر من Eurecom تنفذ eNodeB وgNodeB بمطابقة معايير 3GPP لأغراض البحث والتطوير. تشغّل محطات قاعدة 4G/5G على أجهزة راديو SDR مثل USRP وتتكامل مع Open5GS وfree5GC في مختبرات العالم.",
      en: "Eurecom's open-source software suite implementing 3GPP-compliant eNodeB and gNodeB for research and prototyping. It runs 4G/5G base stations on SDR radios like the USRP and pairs with Open5GS and free5GC in labs worldwide."
    },
    cmd: "sudo ./cmake_targets/ran_build/build/lte-softmodem -O enb.conf",
    cmdDesc: { ar: "تشغيل eNodeB من OpenAirInterface بملف إعدادات محدد", en: "Run the OpenAirInterface eNodeB with a given configuration file" },
    tags: ["oai", "enodeb", "gnodeb", "sdr"]
  },
  {
    id: "t680",
    name: "srsRAN 4G",
    url: "https://www.srsran.com",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مجموعة برمجيات مفتوحة المصدر تعرف سابقًا باسم srsLTE تشغّل eNodeB ونواة EPC كاملة على أجهزة SDR. تُستخدم في المختبرات التعليمية والأبحاث لتشغيل شبكة LTE كاملة مع محاكاة UE افتراضية عبر ZeroMQ.",
      en: "An open-source suite formerly known as srsLTE that runs a complete eNodeB and EPC on SDR hardware. It is used in teaching labs and research to stand up full LTE networks with virtual UE simulation over ZeroMQ."
    },
    cmd: "sudo srsenb /etc/srsran/enb.conf",
    cmdDesc: { ar: "تشغيل eNodeB من srsRAN بملف إعداداته الافتراضي", en: "Run the srsRAN eNodeB with its configuration file" },
    tags: ["srsran", "srslte", "enodeb", "sdr"]
  },
  {
    id: "t681",
    name: "srsRAN Project",
    url: "https://github.com/srsran/srsRAN_Project",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "الجيل التالي من srsRAN المعاد كتابته بلغة C++ الحديثة لتنفيذ gNodeB لشبكات 5G المستقلة مع فصل O-RAN 7-2x. يستهدف أداء الإنتاج وقابلية الدمج في أنابيب CI لأنظمة اختبار 5G.",
      en: "The next-generation srsRAN rewrite in modern C++ implementing a standalone 5G gNodeB with O-RAN 7-2x fronthaul split. It targets production-grade performance and CI-friendly integration for 5G system testing."
    },
    cmd: "gnb -c gnb.yaml",
    cmdDesc: { ar: "تشغيل gNodeB من مشروع srsRAN بملف إعدادات YAML", en: "Run the srsRAN Project gNodeB with a YAML configuration file" },
    tags: ["srsran", "gnodeb", "5g", "o-ran"]
  },
  {
    id: "t682",
    name: "UERANSIM",
    url: "https://github.com/aligungr/UERANSIM",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "محاكي مفتوح المصدر لجهاز 5G UE ومحطة gNB مكتوب بلغة C++ دون الحاجة إلى أي جهاز SDR. يختبر نواة 5G مثل Open5GS وfree5GC عبر واجهات NGAP وGTP اصطناعية، ما يجعله مثاليًا لبيئات التطوير والتعليم.",
      en: "An open-source 5G UE and gNB simulator written in C++ with no SDR hardware required. It exercises cores like Open5GS and free5GC over synthetic NGAP and GTP interfaces, perfect for development and classroom environments."
    },
    cmd: "nr-gnb -c config/gnb.yaml",
    cmdDesc: { ar: "تشغيل محاكي gNB من UERANSIM بملف إعداداته", en: "Run the UERANSIM gNB simulator with its configuration file" },
    tags: ["ueransim", "5g", "simulator", "gnodeb"]
  },
  {
    id: "t683",
    name: "OsmocomBB",
    url: "https://osmocom.org/projects/osmocombb",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "تنفيذ مفتوح المصدر لمكدس طبقات هاتف GSM على هواتف كالإصدارات القديمة ذات شريحة Calypso مثل Motorola C123. يمنح تحكمًا كاملًا في طبقات الهاتف لمراقبة القنوات وسلوك الشبكة من منظور الجهاز، وهو أداة بحث أساسية في GSM.",
      en: "An open-source implementation of the GSM mobile station stack on legacy Calypso phones such as the Motorola C123. It gives you full control over the phone-side layers for monitoring channels and network behaviour from the device's perspective."
    },
    cmd: "sudo osmocon -p /dev/ttyUSB0 -m c123 layer1.compalram",
    cmdDesc: { ar: "تحميل طبقة L1 إلى هاتف Calypso عبر منفذ USB التسلسلي", en: "Load the L1 firmware into a Calypso phone over the serial USB port" },
    tags: ["osmocombb", "gsm", "calypso", "layer1"]
  },
  {
    id: "t684",
    name: "OsmoBTS",
    url: "https://osmocom.org/projects/osmobts",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "تنفيذ مفتوح المصدر لبرنامج محطة أساس BTS في GSM يتكامل مع OsmoBSC عبر واجهة Abis. يشغّل محطات BTS عبر OsmoTRX على أجهزة SDR أو على وحدات مادية مثل sysmoBTS.",
      en: "An open-source GSM BTS implementation integrating with OsmoBSC over the Abis interface. It drives base stations through OsmoTRX on SDR hardware or on physical units such as sysmoBTS."
    },
    cmd: "osmo-bts-trx -c osmo-bts-trx.cfg",
    cmdDesc: { ar: "تشغيل OsmoBTS-TRX لخدمة محطة BTS عبر OsmoTRX", en: "Run OsmoBTS-TRX to serve a BTS through OsmoTRX" },
    tags: ["osmobts", "bts", "gsm", "abis"]
  },
  {
    id: "t685",
    name: "OsmoMSC",
    url: "https://osmocom.org/projects/osmomsc",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مبدّل مركزي MSC مفتوح المصدر لشبكات GSM يعالج مكالمات واجهة A ويسجّل المشتركين عبر GSUP إلى HLR. يعمل مع OsmoSTP لتوجيه إشارات SS7/SIGTRAN داخل نواة GSM مبنية بالكامل من مكونات Osmocom.",
      en: "An open-source GSM Mobile Switching Center handling A-interface calls and registering subscribers to the HLR over GSUP. Together with OsmoSTP it routes SS7/SIGTRAN signalling inside a fully Osmocom-based GSM core."
    },
    cmd: "osmo-msc -c /etc/osmocom/osmo-msc.cfg",
    cmdDesc: { ar: "تشغيل OsmoMSC بملف إعداداته في /etc/osmocom", en: "Run OsmoMSC with its configuration file in /etc/osmocom" },
    tags: ["osmomsc", "msc", "gsm", "gsup"]
  },
  {
    id: "t686",
    name: "OsmoSTP",
    url: "https://osmocom.org/projects/osmostp",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "ناقل إشارات SS7 مفتوح المصدر ينفذ عقدة STP في شبكات SIGTRAN عبر بروتوكولات M3UA وSUA. يوجّه الرسائل بين مكونات نواة Osmocom مثل MSC وHLR وSGSN، ويعدّ أداة تعليمية ممتازة لمفاهيم SS7.",
      en: "An open-source SS7 Signal Transfer Point implementing SIGTRAN routing over M3UA and SUA. It relays messages between Osmocom core components such as MSC, HLR, and SGSN, and doubles as an excellent teaching tool for SS7 concepts."
    },
    cmd: "osmo-stp -c /etc/osmocom/osmo-stp.cfg",
    cmdDesc: { ar: "تشغيل OsmoSTP بملف إعدادات إشارات SS7", en: "Run OsmoSTP with its SS7 signalling configuration file" },
    tags: ["osmostp", "ss7", "sigtran", "m3ua"]
  },
  {
    id: "t687",
    name: "OpenGGSN",
    url: "https://osmocom.org/projects/openggsn",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "بوابة GGSN مفتوحة المصدر من مشروع Osmocom تنفذ GTP الإصدار الأول لنواة حزم 2G/3G. توجّه حزم بيانات المشتركين بين SGSN وشبكة IP الخارجية، وكانت أول بوابة GTP مفتوحة تُستخدم في مختبرات GPRS.",
      en: "An open-source GGSN from the Osmocom project implementing GTP version 1 for 2G/3G packet cores. It forwards subscriber data between the SGSN and external IP networks, and was the first open GTP gateway used in GPRS labs."
    },
    cmd: "ggsn -c /etc/ggsn.conf",
    cmdDesc: { ar: "تشغيل بوابة GGSN بملف إعدادات GTP المحدد", en: "Run the GGSN gateway with the given GTP configuration file" },
    tags: ["openggsn", "ggsn", "gtp", "gprs"]
  },
  {
    id: "t688",
    name: "OpenBTS",
    url: "https://github.com/RangeNetworks/openbts",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 5,
    desc: {
      ar: "تنفيذ مفتوح المصدر لمحطة BTS يربط GSM مباشرة بعالم SIP دون نواة GSM تقليدية. يتيح تشغيل شبكة خلوية صغيرة خاصة عبر Asterisk لإجراء المكالمات، وتاريخه محوري في حركة الشبكات الخلوية المفتوحة.",
      en: "An open-source BTS implementation that bridges GSM directly to SIP without a traditional core. It enables small private cellular networks over an Asterisk PBX and is historically central to the open cellular movement."
    },
    cmd: "sudo ./OpenBTSCLI",
    cmdDesc: { ar: "فتح واجهة سطر أوامر OpenBTS للتحكم بالمحطة", en: "Open the OpenBTS command line interface to control the station" },
    tags: ["openbts", "gsm", "bts", "sip"]
  },
  {
    id: "t689",
    name: "gr-gsm",
    url: "https://github.com/ptrkrysik/gr-gsm",
    category: "telecom",
    platform: ["linux", "mac"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مجموعة أدوات GNU Radio لاستقبال وتحليل إشارات GSM من هوائي SDR. تلتقط قنوات BCCH وCCCH وتحوّل الحزم إلى PCAP بصيغة GSMTAP لتحليلها لاحقًا بـ Wireshark أو tshark.",
      en: "A GNU Radio toolkit for receiving and decoding GSM signals from an SDR antenna. It captures BCCH/CCCH channels and exports packets in GSMTAP PCAP format for later analysis in Wireshark or tshark."
    },
    cmd: "grgsm_livemon -f 945.2M",
    cmdDesc: { ar: "مراقبة قناة GSM حية على تردد 945.2 ميجاهرتز", en: "Monitor a live GSM channel at 945.2 MHz" },
    tags: ["gr-gsm", "gnuradio", "gsmtap", "sdr"]
  },
  {
    id: "t690",
    name: "kalibrate-rtl",
    url: "https://github.com/steve-m/kalibrate-rtl",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "أداة معايرة لأجهزة RTL-SDR تستخدم إشارات محطات GSM لقياس انحراف ساعة المذبذب الرخيص في الجهاز. تمسح القنوات القريبة تلقائيًا وتحدد أرقام ARFCN وقوة الإشارة قبل أي تحليل GSM أعمق.",
      en: "A calibration utility for RTL-SDR dongles that uses GSM BTS signals to measure the clock offset of the receiver's cheap oscillator. It automatically scans nearby GSM channels, reporting ARFCNs and signal power before deeper GSM analysis."
    },
    cmd: "kal -s GSM900 -g 40",
    cmdDesc: { ar: "مسح نطاق GSM900 بكسب 40 لقياس انحراف التردد", en: "Scan the GSM900 band with gain 40 to measure frequency offset" },
    tags: ["kalibrate", "rtl-sdr", "gsm", "calibration"]
  },
  {
    id: "t691",
    name: "pycrate",
    url: "https://github.com/P1sec/pycrate",
    category: "telecom",
    platform: ["cross"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "مكتبة بايثون من P1Sec لتفكيك وبناء بروتوكولات الاتصالات مثل GSM MAP وGTP وNAS وDiameter وSS7. تُستخدم في اختبار Fuzzing لمكدسات النواة والفحص البرمجي لرسائل SS7 داخل ملفات PCAP.",
      en: "A P1Sec Python library for dissecting and generating telecom protocols such as GSM MAP, GTP, NAS, Diameter, and SS7. It powers fuzzing of core stacks and programmatic inspection of SS7 messages inside PCAP traces."
    },
    cmd: "pip3 install pycrate",
    cmdDesc: { ar: "تثبيت مكتبة pycrate للتعامل مع بروتوكولات الاتصالات", en: "Install the pycrate library for working with telecom protocols" },
    tags: ["pycrate", "asn1", "ss7", "fuzzing"]
  },
  {
    id: "t692",
    name: "Seagull",
    url: "https://gull.sourceforge.net/",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "أداة توليد حركة بروتوكولات مفتوحة المصدر طورت في HP، تدعم Diameter وSIP وRADIUS وH.248 عبر ملفات سيناريو XML. تولّد آلاف الرسائل في الثانية لاختبار سعة عقد الشبكات في مختبرات الاتصالات.",
      en: "An open-source protocol traffic generator originally developed at HP, supporting Diameter, SIP, RADIUS, and H.248 through XML scenario files. It drives thousands of messages per second to capacity-test telecom nodes in the lab."
    },
    cmd: "seagull -conf client-conf.xml -dico diameter-dictionary.xml -scen scenario.xml",
    cmdDesc: { ar: "تشغيل Seagull بسيناريو XML وقاموس Diameter محددين", en: "Run Seagull with a given XML scenario and Diameter dictionary" },
    tags: ["seagull", "diameter", "traffic-generator", "testing"]
  },
  {
    id: "t693",
    name: "freeDiameter",
    url: "https://github.com/freediameter/freediameter",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "التنفيذ المرجعي المفتوح المصدر لبروتوكول Diameter فوق SCTP أو TCP لبوابات AAA ونواة EPC. يُستخدم في واجهات مثل S6a بين MME وHSS، ويدعم امتدادات 3GPP عبر وحدات قابلة للتحميل.",
      en: "The open-source reference implementation of Diameter over SCTP or TCP for AAA gateways and EPC nodes. It is used on interfaces such as S6a between the MME and HSS, and supports 3GPP extensions through loadable modules."
    },
    cmd: "freeDiameterd -c /etc/freeDiameter/freeDiameter.conf",
    cmdDesc: { ar: "تشغيل عقدة freeDiameter بملف إعداداتها المحدد", en: "Run the freeDiameter node with its configuration file" },
    tags: ["freediameter", "diameter", "aaa", "sctp"]
  },
  {
    id: "t694",
    name: "FreeRADIUS",
    url: "https://freeradius.org",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 4,
    desc: {
      ar: "خادم RADIUS الأوسع انتشارًا عالميًا لمصادقة الشبكات عبر AAA في المؤسسات ومزودي الخدمة. يدعم 802.1X وTTLS/PEAP وربطًا بخلفيات LDAP وSQL، ويعمل مرجعًا لاختبار أي عميل RADIUS.",
      en: "The world's most deployed RADIUS server, authenticating networks with AAA in enterprises and ISPs. It supports 802.1X, TTLS/PEAP, and LDAP/SQL backends, and serves as the reference for testing any RADIUS client."
    },
    cmd: "radiusd -X",
    cmdDesc: { ar: "تشغيل FreeRADIUS في وضع التصحيح التفاعلي لرؤية الطلبات مباشرة", en: "Run FreeRADIUS in interactive debug mode to see requests live" },
    tags: ["freeradius", "radius", "aaa", "802.1x"]
  },
  {
    id: "t695",
    name: "daloRADIUS",
    url: "https://github.com/lirantal/daloradius",
    category: "telecom",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "لوحة إدارة ويب مفتوحة المصدر لخادم FreeRADIUS تبسّط إدارة المستخدمين والملفات الشخصية والفوترة. تدير قواعد MySQL وPostgreSQL خلف الوسيط، وتعرض تقارير رسومية للجلسات والاستخدام تناسب مزودي الخدمة.",
      en: "An open-source web management panel for FreeRADIUS that simplifies user, profile, and billing administration. It manages MySQL/PostgreSQL backends behind the server and charts session and usage reports for ISP operations."
    },
    tags: ["daloradius", "radius", "web-ui", "billing"]
  },
  {
    id: "t696",
    name: "GenieACS",
    url: "https://genieacs.com",
    category: "telecom",
    platform: ["web"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "خادم TR-069/CWMP مفتوح المصدر لإدارة أجهزة CPE عن بعد مثل راوترات المنازل. يوفر تزويدًا تلقائيًا دون لمسة وترقيات للبرامج الثابتة وتشخيص المشتركين عبر واجهة ويب حديثة وواجهة API قوية.",
      en: "An open-source TR-069/CWMP server for remotely managing CPE devices such as home routers. It provides zero-touch provisioning, firmware upgrades, and subscriber diagnostics through a modern web UI and a solid API."
    },
    cmd: "systemctl status genieacs-cwmp",
    cmdDesc: { ar: "فحص حالة خدمة CWMP ضمن مكونات GenieACS", en: "Check the CWMP service status among GenieACS components" },
    tags: ["genieacs", "tr-069", "cwmp", "cpe-management"]
  },
  {
    id: "t697",
    name: "lksctp-tools",
    url: "https://github.com/sctp/lksctp-tools",
    category: "telecom",
    platform: ["linux"],
    license: "opensource",
    difficulty: 3,
    desc: {
      ar: "حزمة أدوات مكتبة SCTP في لينكس تتضمن الأداة sctp_darn لاختبار الاتصالات والسعة. يعدّ بروتوكول SCTP حجر أساس لواجهات الاتصالات مثل M3UA وS1AP وDiameter، وهذه الحزمة هي السبيل القياسي لاختباره.",
      en: "The Linux kernel SCTP library toolset, including the sctp_darn utility for connection and capacity testing. SCTP underlies key telecom interfaces such as M3UA, S1AP, and Diameter, and this package is the standard way to exercise it."
    },
    cmd: "sctp_darn -H 0.0.0.0 -P 9899 -l",
    cmdDesc: { ar: "إنشاء مستمع SCTP على المنفذ 9899 لاختبار الاتصال", en: "Create an SCTP listener on port 9899 to test connectivity" },
    tags: ["sctp", "lksctp-tools", "sigtran", "testing"]
  },
  {
    id: "t698",
    name: "OpenCelliD",
    url: "https://opencellid.org",
    category: "telecom",
    platform: ["web"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "قاعدة بيانات مجتمعية مفتوحة لمواقع أبراج البث الخلوي حول العالم بتراخيص حرة للاستخدام. تتيح البحث البرمجي عبر واجهة API عن موقع أي خلية بمعرفات MCC وMNC وLAC وCID، وتفيد في تحليل تغطية الشبكات.",
      en: "An open community database of worldwide cell tower locations under a free license. Its API resolves any cell's position from MCC, MNC, LAC, and CID identifiers, useful for coverage analysis and network studies."
    },
    cmd: "curl 'https://opencellid.org/cell/get?key=KEY&mcc=420&mnc=5&lac=1201&cid=2345'",
    cmdDesc: { ar: "الاستعلام عن موقع خلية خلوية عبر واجهة OpenCelliD البرمجية", en: "Query a cell tower location via the OpenCelliD API" },
    tags: ["opencellid", "cell-towers", "database", "api"]
  },
  {
    id: "t699",
    name: "CellMapper",
    url: "https://www.cellmapper.net",
    category: "telecom",
    platform: ["web"],
    license: "free",
    difficulty: 2,
    desc: {
      ar: "منصة خرائط مجتمعية تعرض مواقع أبراج 2G/3G/4G/5G وقوة الإشارة حول العالم. تُبنى من قياسات مستخدمي تطبيقها المحمول، وتفيد في توقع التغطية قبل التنقل أو عند اختيار المشغّل.",
      en: "A crowdsourced mapping platform showing 2G/3G/4G/5G tower locations and signal strength worldwide. Built from mobile app measurements, it helps predict coverage before travelling or when choosing an operator."
    },
    tags: ["cellmapper", "coverage", "crowdsourced", "towers"]
  },
  {
    id: "t700",
    name: "Network Cell Info Lite",
    url: "https://play.google.com/store/apps/details?id=com.wilysis.cellinfolite",
    category: "telecom",
    platform: ["android"],
    license: "freemium",
    difficulty: 2,
    desc: {
      ar: "تطبيق أندرويد يعرض خلية الخدمة الحالية وجاراتها مع تفاصيل EARFCN وPCI وقوة الإشارة. يوفر مؤشرات ملونة للتغطية وخريطة للأبراج القريبة، ما يجعله أداة تشخيص أولية لأعطال الشبكة الخلوية في الميدان.",
      en: "An Android app showing the serving cell and its neighbours with EARFCN, PCI, and signal metrics. Its colour-coded gauges and nearby-tower map make it a handy first-line tool for diagnosing cellular issues in the field."
    },
    tags: ["network-cell-info", "android", "cellular", "drive-test"]
  }
];
