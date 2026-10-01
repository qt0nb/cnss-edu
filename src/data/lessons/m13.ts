import type { Lesson } from "@/lib/types";

// Authored by content agent 2-c — 10 lessons (m13) mirroring BPT IT6004 Unix Systems labs
// (Putty/SSH login to student servers on Amazon Linux 2, passwd, file management,
// users, processes, yum, scripting). Terminal-first: every lesson carries bash
// code with realistic command output from the actual lab environment.

export const m13_LESSONS: Lesson[] = [
  {
    id: "l121",
    moduleId: "m13",
    order: 1,
    level: "beginner",
    title: { ar: "أول دخول: SSH و Putty", en: "First Login: SSH & Putty" },
    summary: {
      ar: "مختبر Unix الأول حرفيًا: تحميل Putty، ضبط نافذة الاتصال على 120×20، الاتصال بخادم الطلبة عبر SSH، قبول مفتاح المضيف بكتابة yes، ثم الدخول باسم المستخدم A+رقمك الجامعي.",
      en: "Literally your first Unix lab: download Putty, set the window to 120×20, connect to the student server over SSH, accept the host key by typing yes, then log in with your A+StudentID username.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "ما هو SSH ولماذا لا نستخدم Telnet؟", en: "What is SSH and why not Telnet?" },
        body: {
          ar: "SSH (Secure Shell) بروتوكول يمنحك طرفية مشفّرة على خادم بعيد عبر الشبكة. كل ما تكتبه — كلمة المرور والأوامر والمخرجات — يسافر داخل نفق مشفّر فلا يستطيع أحد في الطريق قراءته أو تعديله.\n\nقبل SSH كان الناس يستخدمون Telnet الذي يرسل كل شيء نصًا صريحًا؛ أي شخص يتنصّت على الشبكة يرى كلمة مرورك حرفًا حرفًا. لهذا هُجر Telnet في كل عمل جدي.\n\n- SSH يعمل على المنفذ 22 عبر TCP\n- التشفير يحمي السرية وسلامة البيانات معًا\n- خوادم الطلبة في المعهد تعمل بنظام Amazon Linux 2 فوق سحابة AWS، وتصل إليها من جهازك عبر SSH تمامًا كما ستفعل في المختبر الأول",
          en: "SSH (Secure Shell) is a protocol that gives you an encrypted terminal on a remote server across the network. Everything you type — password, commands, output — travels inside an encrypted tunnel that nobody on the path can read or alter.\n\nBefore SSH people used Telnet, which sends everything as plain text; anyone sniffing the network sees your password character by character. That is why Telnet was abandoned for any serious work.\n\n- SSH runs on port 22 over TCP\n- The encryption protects confidentiality and integrity together\n- The Polytechnic's student servers run Amazon Linux 2 on AWS, and you reach them from your machine over SSH exactly as you will in the first lab",
        },
        table: {
          caption: { ar: "SSH مقابل Telnet القديم", en: "SSH vs old Telnet" },
          headers: [
            { ar: "وجه المقارنة", en: "Comparison point" },
            { ar: "SSH", en: "SSH" },
            { ar: "Telnet", en: "Telnet" },
          ],
          rows: [
            [
              { ar: "التشفير", en: "Encryption" },
              { ar: "مفعّل بالكامل افتراضيًا", en: "Fully on by default" },
              { ar: "لا يوجد — نص صريح", en: "None — plain text" },
            ],
            [
              { ar: "المنفذ", en: "Port" },
              { ar: "22/TCP", en: "22/TCP" },
              { ar: "23/TCP", en: "23/TCP" },
            ],
            [
              { ar: "كلمة المرور أثناء الإرسال", en: "Password in transit" },
              { ar: "مشفّرة داخل النفق", en: "Encrypted inside the tunnel" },
              { ar: "ظاهرة لأي متنصّت", en: "Visible to any sniffer" },
            ],
            [
              { ar: "الاستخدام اليوم", en: "Use today" },
              { ar: "المعيار العالمي لإدارة الخوادم عن بعد", en: "The global standard for remote server admin" },
              { ar: "مهجور للأغراض الحساسة", en: "Abandoned for sensitive use" },
            ],
          ],
        },
      },
      {
        heading: { ar: "Putty: بوابتك من ويندوز", en: "Putty: your gateway from Windows" },
        body: {
          ar: "Putty عميل SSH مجاني وخفيف لويندوز، وهو مثبّت مسبقًا على أجهزة المعهد ومختبراته فلا حاجة لتثبيت شيء هناك.\n\nخطوات الاتصال كما وردت في ورقة المختبر الأولى:\n\n- حمّله من الموقع الرسمي putty.org إذا احتجته على حاسوبك الشخصي\n- افتح Putty فتظهر نافذة إعدادات الجلسة\n- في خانة Host Name (or IP address) اكتب اسم خادم الطلبة مثل student1.bptest.cloud\n- من شجرة الإعدادات الجانبية اختر Window ثم اضبط الأعمدة (Columns) إلى 120 والصفوف (Rows) إلى 20 حتى لا تلتفّ السطور الطويلة وتُقرأ المخرجات بوضوح\n- تأكد أن نوع الاتصال SSH والمنفذ 22، ثم اضغط زر Open",
          en: "Putty is a free, lightweight SSH client for Windows, pre-installed on the Polytechnic's lab machines, so there is nothing to install there.\n\nThe connection steps as written in the actual first lab sheet:\n\n- Download it from the official site putty.org if you need it on your own computer\n- Open Putty and the session settings window appears\n- In Host Name (or IP address) type the student server name, e.g. student1.bptest.cloud\n- In the side settings tree choose Window and set Columns to 120 and Rows to 20 so long output lines do not wrap and remain readable\n- Make sure the connection type is SSH on port 22, then click Open",
        },
        tip: {
          ar: "احفظ الجلسة باسم مثل student1 من خانة Saved Sessions ثم اضغط Save؛ في المرة التالية نقرة واحدة تكفي بدل إعادة كتابة كل الإعدادات.",
          en: "Save the session under a name like student1 in Saved Sessions and click Save; next time a single click replaces retyping every setting.",
        },
      },
      {
        heading: { ar: "أول اتصال: تحذير مفتاح المضيف", en: "First connection: the host-key warning" },
        body: {
          ar: "في المرة الأولى التي تتصل فيها بالخادم سيوقفك Putty بتحذير يقول إن مفتاح المضيف (Host Key) غير مخزّن في السجل. هذا طبيعي تمامًا وليس خطأً منك ولا من الشبكة.\n\nالمفتاح هو البصمة المشفّرية للخادم؛ بتخزينها يتأكد Putty في كل مرة قادمة أنك تتصل بالخادم نفسه فعلًا ولم يقف بينكما وسيط مخادع (هجوم الرجل في المنتصف).\n\n- اكتب yes ثم اضغط Enter لتخزين المفتاح والاستمرار\n- بعد القبول تظهر شاشة الدخول السوداء وتطلب اسم المستخدم\n- إذا عاد التحذير في وقت لاحق دون سبب واضح فأخبر أستاذ المختبر؛ قد يعني أمرًا يستحق الانتباه\n- بعد نجاح الدخول تطبع Amazon Linux 2 شعارها ثم يظهر المحث بانتظار أوامرك",
          en: "The very first time you connect, Putty stops you with a warning that the server's host key is not cached in the registry. That is completely normal — it is not your mistake and not a network failure.\n\nThe key is the server's cryptographic fingerprint; caching it lets Putty verify on every future connection that you truly reached the same server and no man-in-the-middle slipped in between.\n\n- Type yes and press Enter to store the key and continue\n- After accepting, the black login screen appears and asks for your username\n- If the warning reappears later without an obvious reason, tell the lab instructor; it may mean something worth attention\n- After a successful login Amazon Linux 2 prints its banner and then the prompt appears waiting for your commands",
        },
        code: {
          lang: "bash",
          snippet:
            "login as: A20161234\nA20161234@student1.bptest.cloud's password:\nLast login: Sun Oct  5 09:12:44 2025 from 10.20.3.44\n\n       __|  __|_  )\n       _|  (     /   Amazon Linux 2 AMI\n      ___|\\___|___|\n\nhttps://aws.amazon.com/amazon-linux-2/\n[A20161234@student1 ~]$",
        },
      },
      {
        heading: { ar: "اسم المستخدم وبديل ماك ولينكس", en: "Your username and the Mac/Linux alternative" },
        body: {
          ar: "اسم المستخدم في مختبرات المعهد يتبع صيغة ثابتة: حرف A ثم رقمك الجامعي مباشرة دون أي مسافة، مثل A20161234. كلمة المرور الأولية يزوّدك بها أستاذ المختبر.\n\nإن كنت على ماك أو لينكس فلا تحتاج Putty إطلاقًا؛ افتح تطبيق Terminal واكتب أمر ssh مباشرة بنفس الصيغة: اسم المستخدم ثم @ ثم اسم المضيف.\n\n- الأوامر بعد الدخول واحدة سواء دخلت من Putty أو من Terminal\n- لإنهاء الجلسة اكتب exit دائمًا — الدرس التالي يفصّل لماذا إغلاق النافذة بالـ X عادة سيئة",
          en: "The username in the Polytechnic labs follows one fixed pattern: the letter A followed immediately by your student ID with no space, e.g. A20161234. Your initial password comes from the lab instructor.\n\nOn a Mac or Linux machine you do not need Putty at all; open the Terminal app and type the ssh command directly in the same pattern: username, then @, then the hostname.\n\n- Commands after login are identical whether you arrived from Putty or Terminal\n- To end the session always type exit — the next lesson details why closing the window with X is a bad habit",
        },
        code: {
          lang: "bash",
          snippet:
            "# From a macOS or Linux Terminal:\n$ ssh A20161234@student1.bptest.cloud\nThe authenticity of host 'student1.bptest.cloud' can't be established.\nAre you sure you want to continue connecting (yes/no)? yes\nWarning: Permanently added 'student1.bptest.cloud' (ED25519) to the list of known hosts.\nA20161234@student1.bptest.cloud's password:\n[A20161234@student1 ~]$",
        },
      },
      {
        heading: { ar: "رحلة الدخول كاملة في رسم واحد", en: "The whole login journey in one picture" },
        body: {
          ar: "قبل أن تنتقل، لخّص الرحلة كلها في تسلسل واحد ثابت ستمرّ به كل أسبوع مختبر:\n\n- جهّز الأداة: Putty على ويندوز أو Terminal على ماك\n- اضبط الجلسة: المضيف والمنفذ وحجم النافذة\n- تعامل مع مفتاح المضيف في أول مرة فقط\n- ادخل باسمك وكلمة مرورك ثم تصبح على سطر أوامر لينكس مباشرة\n\nكرّر التمرين حتى يصبح الدخول reflex تلقائيًا؛ بقية الوحدة كلها تُبنى فوق هذه الخطوة.",
          en: "Before moving on, capture the whole journey in one fixed sequence you will repeat every lab week:\n\n- Prepare the tool: Putty on Windows or Terminal on Mac\n- Configure the session: hostname, port and window size\n- Handle the host key once, only on the first connection\n- Enter your username and password, and you are sitting at a real Linux command line\n\nRepeat the drill until logging in becomes automatic; the rest of this module is built entirely on top of this step.",
        },
        diagram: {
          kind: "flow",
          title: { ar: "من التحميل إلى سطر الأوامر", en: "From download to a shell" },
          items: [
            { ar: "حمّل Putty أو افتح Terminal", en: "Download Putty or open Terminal" },
            { ar: "أدخل المضيف student1.bptest.cloud", en: "Enter the host student1.bptest.cloud" },
            { ar: "اضبط النافذة 120 عمودًا × 20 صفًا ثم Open", en: "Set the window to 120 columns × 20 rows, then Open" },
            { ar: "اقبل مفتاح المضيف بكتابة yes", en: "Accept the host key by typing yes" },
            { ar: "أدخل A20161234 ثم كلمة المرور", en: "Enter A20161234 then the password" },
          ],
        },
      },
    ],
    keyPoints: [
      { ar: "SSH قناة طرفية مشفّرة عبر المنفذ 22 تحمي كل ما تكتبه", en: "SSH is an encrypted terminal channel on port 22 protecting everything you type" },
      { ar: "Putty عميل SSH لويندوز يُحمَّل من putty.org ومثبّت مسبقًا في مختبرات المعهد", en: "Putty is the Windows SSH client from putty.org, pre-installed in the Polytechnic labs" },
      { ar: "ضبط النافذة 120 عمودًا × 20 صفًا يمنع التفافّ السطور الطويلة", en: "Setting the window to 120 columns × 20 rows prevents long lines from wrapping" },
      { ar: "تحذير أول اتصال طبيعي: اكتب yes لتخزين مفتاح المضيف", en: "The first-connection warning is normal: type yes to store the host key" },
      { ar: "اسم المستخدم = حرف A + الرقم الجامعي مباشرة مثل A20161234", en: "Username = letter A + student ID with no space, e.g. A20161234" },
      { ar: "على ماك ولينكس يغنيك أمر ssh في Terminal عن Putty", en: "On Mac and Linux the ssh command in Terminal replaces Putty" },
    ],
    commands: [
      { cmd: "ssh A20161234@student1.bptest.cloud", desc: { ar: "الدخول إلى خادم الطلبة من طرفية ماك أو لينكس", en: "Log in to the student server from a Mac or Linux terminal" } },
      { cmd: "exit", desc: { ar: "إنهاء جلسة SSH بشكل صحيح ونظيف", en: "End an SSH session cleanly and properly" } },
      { cmd: "who", desc: { ar: "عرض المستخدمين المتصلين بالخادم حاليًا", en: "List users currently logged in to the server" } },
    ],
    quiz: [
      {
        q: { ar: "على أي منفذ يعمل بروتوكول SSH؟", en: "On which port does SSH operate?" },
        options: [
          { ar: "22", en: "22" },
          { ar: "23", en: "23" },
          { ar: "21", en: "21" },
          { ar: "80", en: "80" },
        ],
        correct: 0,
        explain: { ar: "SSH يستخدم المنفذ 22 عبر TCP؛ أما 23 فهو منفذ Telnet القديم غير المشفّر.", en: "SSH uses TCP port 22; port 23 belongs to the old, unencrypted Telnet." },
      },
      {
        q: { ar: "ظهر تحذير مفتاح المضيف عند أول اتصال — ما التصرف الصحيح؟", en: "The host-key warning appears on your first connection — what is the correct action?" },
        options: [
          { ar: "اكتب yes لتخزين المفتاح وتابع الاتصال", en: "Type yes to store the key and continue" },
          { ar: "أغلق النافذة فورًا فالخادم مخترق", en: "Close the window at once, the server is hacked" },
          { ar: "اكتب كلمة المرور من جديد", en: "Type the password again" },
          { ar: "غيّر المنفذ إلى 23 وأعد المحاولة", en: "Change the port to 23 and retry" },
        ],
        correct: 0,
        explain: { ar: "التحذير طبيعي في أول اتصال فقط؛ كتابة yes تخزّن بصمة الخادم فلا يظهر التحذير مجددًا.", en: "The warning appears only on the first connection; typing yes caches the server fingerprint so it never reappears." },
      },
      {
        q: { ar: "طالب رقمه الجامعي 20161234 — ما اسم المستخدم الصحيح؟", en: "A student with ID 20161234 — what is the correct username?" },
        options: [
          { ar: "A20161234", en: "A20161234" },
          { ar: "20161234A", en: "20161234A" },
          { ar: "A 20161234", en: "A 20161234" },
          { ar: "a2016_1234", en: "a2016_1234" },
        ],
        correct: 0,
        explain: { ar: "الصيغة المعتمدة في المختبرات: حرف A يليه الرقم الجامعي مباشرة دون مسافة أو رموز.", en: "The lab convention is the letter A followed immediately by the student ID, no spaces or symbols." },
      },
      {
        q: { ar: "على جهاز macOS كيف تتصل بالخادم دون Putty؟", en: "On macOS, how do you connect without Putty?" },
        options: [
          { ar: "ssh A20161234@student1.bptest.cloud", en: "ssh A20161234@student1.bptest.cloud" },
          { ar: "telnet student1.bptest.cloud", en: "telnet student1.bptest.cloud" },
          { ar: "putty --open student1", en: "putty --open student1" },
          { ar: "login student1.bptest.cloud", en: "login student1.bptest.cloud" },
        ],
        correct: 0,
        explain: { ar: "ماك ولينكس يحملان عميل ssh مدمجًا؛ الصيغة: المستخدم@المضيف.", en: "Mac and Linux ship a built-in ssh client; the pattern is user@host." },
      },
    ],
  },
  {
    id: "l122",
    moduleId: "m13",
    order: 2,
    level: "beginner",
    title: { ar: "كلمات المرور وإدارة الجلسات", en: "Passwords & Session Management" },
    summary: {
      ar: "الأمر passwd خطوة بخطوة ولماذا لا تظهر الأحرف أثناء الكتابة، صفات كلمة المرور الجيدة، والقاعدة الذهبية من ورقة المختبر: اخرج دائمًا بـ exit ولا تغلق النافذة بالـ X.",
      en: "The passwd command step by step and why characters stay invisible, what makes a strong password, and the lab's golden rule: always exit — never close the window with X.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "الأمر passwd خطوة بخطوة", en: "The passwd command step by step" },
        body: {
          ar: "بعد أول دخول تطلب منك ورقة المختبر تغيير كلمة المرور فورًا، وذلك بالأمر passwd (اختصار password).\n\nيسألك الأمر ثلاثة أسئلة بالترتيب:\n\n- كلمة المرور الحالية (Current password) لإثبات هويتك\n- كلمة المرور الجديدة (New password)\n- تأكيد الجديدة (Retype new password) لحمايتك من خطأ الكتابة\n\nأهم ملاحظة تربك الجميع أول مرة: الأحرف لا تظهر إطلاقًا أثناء الكتابة — لا نجوم ولا نقاط. هذا مقصود أمنيًا حتى لا يعرف أحد متنصّب خلفك طول كلمة مرورك ولا حتى عدد أحرفها. اكتبها بثقة واضغط Enter حتى لو بدا لك أن شيئًا لم يُكتب.",
          en: "Right after your first login, the lab sheet asks you to change your password immediately using the passwd command.\n\nThe command asks three questions in order:\n\n- Your current password, to prove your identity\n- The new password\n- A retyped confirmation, protecting you from typos\n\nThe detail that confuses everyone at first: characters never appear while typing — not stars, not dots. This is deliberate: someone glancing over your shoulder must not learn even the length of your password. Type confidently and press Enter even when it feels like nothing was typed.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ passwd\nChanging password for user A20161234.\nCurrent password:\nNew password:\nRetype new password:\npasswd: all authentication tokens updated successfully.",
        },
        tip: {
          ar: "إذا رفض النظام كلمة المرور الجديدة فغالبًا لأنها بسيطة أو قريبة جدًا من القديمة؛ جرّب أطول وأكثر تنويعًا.",
          en: "If the system rejects the new password it is usually too simple or too close to the old one; try longer with more variety.",
        },
      },
      {
        heading: { ar: "ما الذي يجعل كلمة المرور جيدة؟", en: "What makes a good password?" },
        body: {
          ar: "كلمة المرور هي مفتاح حسابك على خادم يشغّله آخرون، والأدوات الحديثة تخمّن ملايين الكلمات في الثانية. القواعد العملية:\n\n- الطول أولاً: 12 حرفًا فأفضل من 8 قصيرة معقدة\n- نوّع: أحرف كبيرة وصغيرة وأرقام ورموز\n- لا معلومات شخصية: اسمك أو رقمك الجامعي أو تاريخ ميلادك أول ما يُجرَّب\n- لا كلمات قاموسية وحدها؛ الجملة الطويلة الغريبة أقوى\n- لا تعيد استخدام كلمة مرور بين خدمة وأخرى؛ تسريب واحد يفتح كل أبوابك",
          en: "Your password is the key to your account on a shared server, and modern tools guess millions of candidates per second. Practical rules:\n\n- Length first: 12 plain characters beat 8 twisted ones\n- Variety: upper and lower case, digits, symbols\n- No personal data: your name, student ID or birthday are the first things tried\n- No bare dictionary words; a long strange sentence is stronger\n- Never reuse one password across services; a single leak opens every door",
        },
        table: {
          caption: { ar: "أمثلة: ضعيف مقابل قوي ولماذا", en: "Examples: weak vs strong and why" },
          headers: [
            { ar: "كلمة المرور", en: "Password" },
            { ar: "التقييم", en: "Verdict" },
            { ar: "السبب", en: "Reason" },
          ],
          rows: [
            [
              { ar: "A20161234", en: "A20161234" },
              { ar: "ضعيفة جدًا", en: "Very weak" },
              { ar: "اسم المستخدم نفسه — أول تخمين", en: "It is the username itself — the very first guess" },
            ],
            [
              { ar: "12345678", en: "12345678" },
              { ar: "ضعيفة جدًا", en: "Very weak" },
              { ar: "من أشهر كلمات المرور عالميًا", en: "Among the world's most common passwords" },
            ],
            [
              { ar: "P@ssw0rd", en: "P@ssw0rd" },
              { ar: "ضعيفة", en: "Weak" },
              { ar: "تبديل حرف واحد لكلمة شهيرة موجودة في قوائم التسريب", en: "A one-character twist on a famous word already in leak lists" },
            ],
            [
              { ar: "Green-Cactus-Rides-The-7am-Train", en: "Green-Cactus-Rides-The-7am-Train" },
              { ar: "قوية", en: "Strong" },
              { ar: "طويلة وغريبة وسهلة التذكر لك وحدك", en: "Long, unusual, and easy for you alone to remember" },
            ],
          ],
        },
      },
      {
        heading: { ar: "exit مقابل إغلاق النافذة: تحذير المختبر الحاسم", en: "exit vs closing the window: the lab's critical warning" },
        body: {
          ar: "تحذّر ورقة المختبر بوضوح: أنهِ جلستك دائمًا بكتابة exit. لماذا كل هذا التشدد؟\n\n- أمر exit يخبر الخادم رسميًا بانتهاء الجلسة فيغلق قشرة الأوامر ويحرر الموارد نظيفًا\n- إغلاق نافذة Putty بالـ X يقطع الاتصال من طرفك فقط، وقد تبقى الجلسة حيّة على الخادم وقتًا بعده\n- جلسة معلقة قد تحتفظ بملفات مفتوحة أو عمليات تجري خلف الستار\n- ومن الناحية الأمنية: طرفية مفتوحة بلا مراقبة على حسابك في مختبر عام دعوة مفتوحة لمن يمر بجانبك\n\nالقاعدة الذهبية: انهِ عملك، اكتب exit، ثم أغلق البرنامج إن شئت.",
          en: "The lab sheet is explicit: always end your session by typing exit. Why so strict?\n\n- exit formally tells the server the session is over: the shell closes and resources are released cleanly\n- Closing the Putty window with X cuts the connection from your side only; the session may stay alive on the server for a while\n- A lingering session can hold open files or keep processes running behind the curtain\n- Security-wise: an unattended open terminal under your account in a public lab is an open invitation to whoever passes by\n\nGolden rule: finish your work, type exit, then close the program if you wish.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ exit\nlogout\nConnection to student1.bptest.cloud closed.",
        },
        tip: {
          ar: "لا تترك طرفية مفتوحة على حسابك ولو لدقيقة في المختبر؛ اكتب exit أو على الأقل امسك جهازك بعينيك.",
          en: "Never leave a terminal open on your account, even for a minute in the lab; type exit, or at least keep the machine in sight.",
        },
      },
      {
        heading: { ar: "التحقق بالخروج والعودة، ومَن على الخادم؟", en: "Verify by logging out and back in — and who is on the server?" },
        body: {
          ar: "كيف تتأكد أن كلمة المرور تغيّرت فعلًا؟ الطريقة التجريبية نفسها في المختبر:\n\n- اكتب exit لتخرج نظيفًا\n- أعد الاتصال من Putty أو Terminal\n- أدخل كلمة المرور الجديدة — نجاح الدخول هو الإثبات\n\nأمران صغيران يساعدانك في الجلسات اللاحقة:\n\n- who يعرض كل المستخدمين المتصلين بالخادم الآن ومن أي عنوان IP\n- whoami يذكّرك في أي حساب تعمل — مفيد قبل أوامر حساسة",
          en: "How do you prove the password really changed? The same empirical method as in the lab:\n\n- Type exit to log out cleanly\n- Reconnect with Putty or Terminal\n- Enter the new password — a successful login is the proof\n\nTwo small helpers for later sessions:\n\n- who lists every user currently logged in and from which IP address\n- whoami reminds you which account you are operating — useful before sensitive commands",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ who\nA20161234 pts/0 2025-10-05 09:41 (10.20.3.44)\nA20161234 pts/1 2025-10-05 10:02 (10.20.3.51)\nA20210077 pts/2 2025-10-05 10:15 (10.20.7.9)\n[A20161234@student1 ~]$ whoami\nA20161234",
        },
      },
    ],
    keyPoints: [
      { ar: "passwd يسأل بالترتيب: الحالية ← الجديدة ← تأكيد الجديدة", en: "passwd asks in order: current → new → retype new" },
      { ar: "عدم ظهور الأحرف أثناء كتابة كلمة المرور مقصود أمنيًا", en: "Invisible typing is a deliberate security feature" },
      { ar: "كلمة مرور جيدة = طول + تنوّع + لا معلومات شخصية + لا إعادة استخدام", en: "A good password = length + variety + no personal data + no reuse" },
      { ar: "اخرج دائمًا بـ exit؛ إغلاق النافذة بالـ X قد يترك الجلسة حيّة على الخادم", en: "Always exit; closing the window with X can leave the session alive on the server" },
      { ar: "الخروج والدخول مجددًا هو اختبار صحة تغيير كلمة المرور", en: "Logging out and back in is the test that the password change took effect" },
      { ar: "who يعرض المتصلين حاليًا وwhoami يعرض حسابك أنت", en: "who lists current users; whoami shows your own account" },
    ],
    commands: [
      { cmd: "passwd", desc: { ar: "تغيير كلمة مرورك بعد التحقق من الحالية", en: "Change your password after verifying the current one" } },
      { cmd: "exit", desc: { ar: "إنهاء الجلسة بشكل نظيف — لا إغلاق بالـ X", en: "End the session cleanly — never close with X" } },
      { cmd: "who", desc: { ar: "عرض جميع المستخدمين المتصلين بالخادم", en: "List all users currently logged in to the server" } },
      { cmd: "whoami", desc: { ar: "عرض اسم الحساب الذي تعمل عليه الآن", en: "Show the account you are currently using" } },
    ],
    quiz: [
      {
        q: { ar: "أثناء كتابة كلمة المرور الجديدة لا يظهر أي حرف على الشاشة — ماذا تفعل؟", en: "While typing the new password nothing appears on screen — what do you do?" },
        options: [
          { ar: "استمر بالكتابة بثقة ثم اضغط Enter", en: "Keep typing confidently and press Enter" },
          { ar: "اضغط Ctrl+C وأعد الأمر من جديد", en: "Press Ctrl+C and restart the command" },
          { ar: "أعد تشغيل الجهاز؛ لوحة المفاتيح معطلة", en: "Reboot the machine; the keyboard is broken" },
          { ar: "اكتب كلمة المرور مرتين متتاليتين", en: "Type the password twice in a row" },
        ],
        correct: 0,
        explain: { ar: "إخفاء الأحرف مقصود أمنيًا؛ الطرفية تقرأ ضغطاتك فعلًا رغم صمت الشاشة.", en: "Hiding characters is intentional; the terminal really reads your keystrokes despite the silent screen." },
      },
      {
        q: { ar: "ما الطريقة الصحيحة لإنهاء جلسة SSH وفق تحذير ورقة المختبر؟", en: "Per the lab sheet's warning, what is the correct way to end an SSH session?" },
        options: [
          { ar: "كتابة exit ثم إغلاق البرنامج", en: "Typing exit, then closing the program" },
          { ar: "إغلاق نافذة Putty بالـ X مباشرة", en: "Closing the Putty window with X directly" },
          { ar: "ترك النافذة مفتوحة حتى تنتهي من تلقاء نفسها", en: "Leaving the window open until it ends itself" },
          { ar: "إيقاف تشغيل جهازك بالزر الكهربائي", en: "Powering off your computer with the power button" },
        ],
        correct: 0,
        explain: { ar: "exit يغلق الجلسة رسميًا على الخادم؛ الإغلاق بالـ X يقطع الاتصال من طرفك وقد تبقى الجلسة حيّة.", en: "exit closes the session officially on the server; X-cutting only drops it from your side and the session may linger." },
      },
      {
        q: { ar: "بأي ترتيب يطلب الأمر passwd كلمات المرور؟", en: "In which order does passwd ask for passwords?" },
        options: [
          { ar: "الحالية ← الجديدة ← تأكيد الجديدة", en: "Current → new → retype new" },
          { ar: "الجديدة ← الحالية ← تأكيد الجديدة", en: "New → current → retype new" },
          { ar: "التأكيد ← الجديدة ← الحالية", en: "Retype → new → current" },
          { ar: "الحالية ← اسم المستخدم ← الجديدة", en: "Current → username → new" },
        ],
        correct: 0,
        explain: { ar: "التحقق من الهوية أولًا ثم كلمة المرور الجديدة ثم تأكيدها لتلافي أخطاء الكتابة.", en: "Identity first, then the new password, then its confirmation to catch typos." },
      },
      {
        q: { ar: "أي من كلمات المرور التالية أضعف خيار؟", en: "Which of these passwords is the weakest choice?" },
        options: [
          { ar: "A20161234", en: "A20161234" },
          { ar: "Green-Cactus-Rides-The-7am-Train", en: "Green-Cactus-Rides-The-7am-Train" },
          { ar: "9sT!vQ2#pL0w", en: "9sT!vQ2#pL0w" },
          { ar: "My-Dog-Drinks-3-Cups-Of-Tea", en: "My-Dog-Drinks-3-Cups-Of-Tea" },
        ],
        correct: 0,
        explain: { ar: "A20161234 هي اسم المستخدم نفسه؛ أول ما يجرّبه أي مخترق، والبقية طويلة ومتنوعة.", en: "A20161234 is the username itself — an attacker's first guess; the rest are long and varied." },
      },
    ],
  },
  {
    id: "l123",
    moduleId: "m13",
    order: 3,
    level: "beginner",
    title: { ar: "التنقل في نظام الملفات: pwd و ls و cd", en: "Navigating the Filesystem: pwd, ls & cd" },
    summary: {
      ar: "تشريح المحث [user@host ~]$، معرفة موقعك بـ pwd، سرد الملفات بخيارات ls -l و -a و -lh، والتنقل بـ cd بين المسارات المطلقة والنسبية.",
      en: "Anatomy of the [user@host ~]$ prompt, finding your location with pwd, listing files with ls -l, -a and -lh, and moving around with cd across absolute and relative paths.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "تشريح المحث: ماذا تقول لك سطر الأوامر؟", en: "Anatomy of the prompt: what the command line tells you" },
        body: {
          ar: "قبل أي أمر، تأمل المحث الذي يسبق كل سطر تكتبه: [A20161234@student1 ~]$\n\n- A20161234: اسم المستخدم الذي تعمل بحسابه\n- @: فاصل تقليدي يقرأ «على»\n- student1: اسم الخادم المتصل به\n- ~: المجلد الحالي — والعلامة tilde (~) اختصار لمجلد منزلك\n- $: تعني مستخدمًا عاديًا؛ إذا تحولت إلى # فأنت تعمل بصفة الجذر root — لحظة تفتح فيها عينيك جيدًا\n\nالمحث ليس زينة؛ إنه معلومات حالة حية أمامك دائمًا.",
          en: "Before any command, study the prompt that precedes every line you type: [A20161234@student1 ~]$\n\n- A20161234: the account you are operating\n- @: the traditional separator, read as \"at\"\n- student1: the server you are connected to\n- ~: your current folder — the tilde abbreviates your home directory\n- $: marks a normal user; if it turns into # you are acting as root — a moment to open your eyes wide\n\nThe prompt is not decoration; it is live status information sitting in front of you at all times.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ whoami\nA20161234\n[A20161234@student1 ~]$ hostname\nstudent1.bptest.cloud",
        },
      },
      {
        heading: { ar: "أين أنا؟ pwd ثم نظرة أولى بـ ls", en: "Where am I? pwd, then a first look with ls" },
        body: {
          ar: "أول عادة تكتسبها كمدير لينكس: قبل أي عملية على الملفات، اعرف موقعك الحالي بالأمر pwd (print working directory).\n\n- pwd يطبع المسار الكامل للمجلد الذي تقف فيه الآن\n- بعد الدخول تقف تلقائيًا في مجلد منزلك /home/A20161234\n- ls (list) يعرض أسماء محتويات المجلد الحالي في أعمدة مضغوطة\n\nجرّبهما دائمًا معًا: pwd يجيب «أين أنا؟» وls يجيب «ماذا حولي؟».",
          en: "The first habit you gain as a Linux admin: before any file operation, know your current location with pwd (print working directory).\n\n- pwd prints the full path of the folder you are standing in\n- After login you automatically stand in your home /home/A20161234\n- ls (list) shows the contents of the current folder in compact columns\n\nAlways try them together: pwd answers \"where am I?\" and ls answers \"what surrounds me?\".",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ pwd\n/home/A20161234\n[A20161234@student1 ~]$ ls\nDesktop  Documents  Downloads  Music  notes.txt  project.zip",
        },
        tip: {
          ar: "اضغط Tab بعد كتابة أول حروف من اسم ملف لتكمله الطرفية تلقائيًا — أسرع من الكتابة وأأمن من الخطأ.",
          en: "Press Tab after typing the first letters of a filename and the terminal completes it — faster than typing and safer than mistyping.",
        },
      },
      {
        heading: { ar: "خيارات ls الثلاثة الأشهر: -l و -a و -lh", en: "The three most popular ls options: -l, -a and -lh" },
        body: {
          ar: "الأمر ls وحده يعطيك الأسماء فقط؛ الخيارات تكشف التفاصيل:\n\n- ls -l: قائمة طويلة، سطر لكل عنصر، بكل بياناته\n- ls -a: يعرض الملفات المخفية التي تبدأ أسماؤها بنقطة مثل .bashrc\n- ls -lh: مثل -l لكن الأحجام مقروءة للبشر (K وM بدل الأرقام الخام)\n\nكيف تقرأ سطر ls -l من اليسار؟\n\n- النوع والصلاحيات مثل drwxr-xr-x (الدرس التالي يفصّلها تمامًا)\n- عدد الوصلات، ثم المالك، ثم المجموعة\n- الحجم بالبايت، ثم تاريخ آخر تعديل، ثم الاسم\n\nكل هذا عمود واحد متراص من معلومات الإدارة اليومية.",
          en: "Bare ls gives you names only; options reveal the details:\n\n- ls -l: long listing, one line per item, with all its data\n- ls -a: reveals hidden files whose names start with a dot, like .bashrc\n- ls -lh: like -l but human-readable sizes (K and M instead of raw digits)\n\nHow do you read an ls -l line from the left?\n\n- Type and permissions like drwxr-xr-x (next lesson dissects it fully)\n- Link count, then the owner, then the group\n- Size in bytes, then the last-modified date, then the name\n\nOne dense column of everyday administration information.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ ls -l\ntotal 8\ndrwxr-xr-x. 2 A20161234 A20161234   18 Oct  5 09:30 Documents\ndrwxr-xr-x. 2 A20161234 A20161234    6 Oct  5 09:30 Downloads\n-rw-r--r--. 1 A20161234 A20161234  187 Oct  5 10:05 notes.txt\n[A20161234@student1 ~]$ ls -lh project.zip\n-rw-r--r--. 1 A20161234 A20161234 2.1M Oct  5 10:05 project.zip\n[A20161234@student1 ~]$ ls -a\n.  ..  .bash_history  .bash_profile  .bashrc  Documents  notes.txt  project.zip",
        },
        table: {
          caption: { ar: "أوامر التنقل والاستكشاف ووظيفة كل منها", en: "Navigation and exploration commands and their purpose" },
          headers: [
            { ar: "الأمر", en: "Command" },
            { ar: "الوظيفة", en: "Purpose" },
          ],
          rows: [
            [
              { ar: "pwd", en: "pwd" },
              { ar: "طباعة المسار الكامل للمجلد الحالي", en: "Print the full path of the current folder" },
            ],
            [
              { ar: "ls", en: "ls" },
              { ar: "أسماء محتويات المجلد الحالي", en: "Names of the current folder's contents" },
            ],
            [
              { ar: "ls -l", en: "ls -l" },
              { ar: "قائمة طويلة: صلاحيات ومالك وحجم وتاريخ", en: "Long listing: permissions, owner, size and date" },
            ],
            [
              { ar: "ls -a", en: "ls -a" },
              { ar: "إظهار الملفات المخفية التي تبدأ بنقطة", en: "Reveal hidden dot files" },
            ],
            [
              { ar: "ls -lh", en: "ls -lh" },
              { ar: "قائمة طويلة بأحجام مقروءة للبشر", en: "Long listing with human-readable sizes" },
            ],
            [
              { ar: "cd folder", en: "cd folder" },
              { ar: "الانتقال إلى مجلد فرعي أو مسار محدد", en: "Move into a subfolder or a given path" },
            ],
          ],
        },
      },
      {
        heading: { ar: "التنقل بـ cd: مطلق أم نسبي؟", en: "Moving with cd: absolute or relative?" },
        body: {
          ar: "الأمر cd (change directory) ينقلك بين المجلدات، والمسارات نوعان:\n\n- مسار مطلق (Absolute): يبدأ بشرطة مائلة / من جذر النظام، مثل /etc — يعمل من أي مكان تقف فيه\n- مسار نسبي (Relative): يُحسب من موقعك الحالي، مثل Documents أو .. — معناه يتغير بحسب موضعك\n\nرمزان صغيران يحكمان النسبية:\n\n- النقطة . تعني «المجلد الحالي»\n- النقطتان .. تعنيان «المجلد الأب» — أي اصعد درجة واحدة\n\nواختصاران يحبّهما الجميع:\n\n- ~: قفزة مباشرة إلى مجلد منزلك، وcd وحدها تفعل الشيء نفسه\n- /: جذر شجرة الملفات كلها؛ وكل شيء تحته: /home و /etc و /var وغيرها",
          en: "The cd command (change directory) moves you between folders, and paths come in two kinds:\n\n- Absolute: starts with a slash / from the system root, e.g. /etc — works no matter where you stand\n- Relative: counted from your current location, e.g. Documents or .. — its meaning changes with your position\n\nTwo tiny symbols govern relativity:\n\n- The dot . means \"the current folder\"\n- The double dot .. means \"the parent folder\" — climb one step up\n\nAnd two shortcuts everyone loves:\n\n- ~: a direct jump to your home folder; bare cd does the same\n- /: the root of the whole file tree; everything lives under it: /home, /etc, /var and more",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ cd /etc\n[A20161234@student1 etc]$ pwd\n/etc\n[A20161234@student1 etc]$ cd /home/A20161234/Documents\n[A20161234@student1 Documents]$ cd ..\n[A20161234@student1 ~]$ cd\n[A20161234@student1 ~]$ pwd\n/home/A20161234",
        },
      },
      {
        heading: { ar: "شجرة مجلد المنزل في رسم واحد", en: "Your home tree in one picture" },
        body: {
          ar: "تخيل مجلد منزلك كشجرة صغيرة: الجذر /home يحتوي مجلدًا لكل مستخدم، وداخل مجلدك تتفرع مستنداتك.\n\n- الوصول إلى notes.txt من أي مكان: المسار المطلق /home/A20161234/notes.txt\n- الوصول إليه وأنت داخل مجلدك: الاسم وحده notes.txt\n- رمز ~ يختصر الجزء الأول كله إلى ~/notes.txt\n\nهذه الشجرة هي نفسها التي يصفها معيار FHS الذي يحفظ ترتيب /etc و /home و /var على كل توزيعة تقريبًا.",
          en: "Picture your home folder as a small tree: the /home root holds one folder per user, and your files branch inside your own folder.\n\n- Reaching notes.txt from anywhere: the absolute path /home/A20161234/notes.txt\n- Reaching it while inside your home: just the name notes.txt\n- The ~ symbol abbreviates the whole first part into ~/notes.txt\n\nThis same tree is the one the FHS standard keeps orderly across nearly every distribution: /etc, /home, /var and friends.",
        },
        diagram: {
          kind: "topology",
          title: { ar: "شجرة ملفات نموذجية لمجلد المنزل", en: "A sample home-directory file tree" },
          nodes: [
            "/home|المجلد الأم",
            "A20161234|مجلدك",
            "Documents|المستندات",
            "Downloads|التنزيلات",
            "notes.txt|ملف نصي",
            "project.zip|ملف مضغوط",
          ],
          edges: [
            [0, 1],
            [1, 2],
            [1, 3],
            [1, 4],
            [1, 5],
          ],
        },
      },
    ],
    keyPoints: [
      { ar: "المحث [user@host ~]$ يعرض المستخدم والخادم والمجلد الحالي", en: "The [user@host ~]$ prompt shows user, server and current folder" },
      { ar: "$ تعني مستخدمًا عاديًا و# تعني الجذر root", en: "$ marks a normal user; # marks root" },
      { ar: "pwd يجيب «أين أنا؟» وls يجيب «ماذا حولي؟»", en: "pwd answers \"where am I?\"; ls answers \"what surrounds me?\"" },
      { ar: "المسار المطلق يبدأ بـ / والنسبي يُحسب من موقعك الحالي", en: "Absolute paths start with /; relative ones count from your current spot" },
      { ar: ".. يصعد درجة و. يبقى في المكان و~ يقفز إلى المنزل", en: ".. climbs one level, . stays put, ~ jumps home" },
      { ar: "ls -a يكشف الملفات المخفية و-lh يعطي تفاصيل بأحجام مقروءة", en: "ls -a uncovers hidden files; -lh gives details in readable sizes" },
    ],
    commands: [
      { cmd: "pwd", desc: { ar: "معرفة المسار الكامل لموقعك الحالي", en: "Know the full path of your current location" } },
      { cmd: "ls -la", desc: { ar: "قائمة كاملة بالمحتويات مع المخفية", en: "Full listing of contents including hidden files" } },
      { cmd: "cd /etc", desc: { ar: "الانتقال بمسار مطلق إلى مجلد إعدادات النظام", en: "Move with an absolute path to the system config folder" } },
      { cmd: "cd ..", desc: { ar: "الصعود درجة واحدة إلى المجلد الأب", en: "Climb one level up to the parent folder" } },
    ],
    quiz: [
      {
        q: { ar: "ماذا يعني الرمز ~ في المحث؟", en: "What does the ~ symbol in the prompt mean?" },
        options: [
          { ar: "مجلد المنزل الخاص بالمستخدم", en: "The user's home folder" },
          { ar: "جذر نظام الملفات", en: "The root of the filesystem" },
          { ar: "مجلد الإعدادات /etc", en: "The /etc configuration folder" },
          { ar: "مجلد المؤقتات /tmp", en: "The /tmp temporary folder" },
        ],
        correct: 0,
        explain: { ar: "~ اختصار شائع لمسار منزل المستخدم مثل /home/A20161234.", en: "~ is the common shorthand for the user's home path such as /home/A20161234." },
      },
      {
        q: { ar: "ما الفرق الجوهري بين cd /etc و cd etc؟", en: "What is the essential difference between cd /etc and cd etc?" },
        options: [
          { ar: "الأول مسار مطلق من الجذر والثاني نسبي من موقعك", en: "The first is absolute from the root; the second is relative to your location" },
          { ar: "لا فرق بينهما إطلاقًا", en: "There is no difference at all" },
          { ar: "الأول للمجلدات والثاني للملفات", en: "The first is for folders, the second for files" },
          { ar: "الثاني يعمل فقط بصلاحيات الجذر", en: "The second works only with root privileges" },
        ],
        correct: 0,
        explain: { ar: "الشرطة الأولى / تجعل المسار مطلقًا من جذر النظام؛ وبغيابها يُبحث عن المجلد داخل موقعك الحالي.", en: "The leading / makes the path absolute from the system root; without it, the folder is sought inside your current location." },
      },
      {
        q: { ar: "أي أمر يعرض الملفات المخفية مثل .bashrc؟", en: "Which command reveals hidden files like .bashrc?" },
        options: [
          { ar: "ls -a", en: "ls -a" },
          { ar: "ls -l", en: "ls -l" },
          { ar: "pwd -a", en: "pwd -a" },
          { ar: "cd -a", en: "cd -a" },
        ],
        correct: 0,
        explain: { ar: "الخيار -a (all) يضيف الملفات النقطية المخفية إلى القائمة.", en: "The -a (all) option adds hidden dot files to the listing." },
      },
      {
        q: { ar: "من /home/A20161234/Documents أي أمر يعيدك إلى مجلد منزلك مباشرة؟", en: "From /home/A20161234/Documents, which command takes you straight home?" },
        options: [
          { ar: "cd", en: "cd" },
          { ar: "pwd", en: "pwd" },
          { ar: "cd .", en: "cd ." },
          { ar: "cd /etc", en: "cd /etc" },
        ],
        correct: 0,
        explain: { ar: "cd وحدها — وكذلك cd ~ — تعيدانك إلى مجلد المنزل من أي عمق؛ أما cd . فتبقيك في مكانك.", en: "Bare cd — like cd ~ — returns you home from any depth; cd . keeps you exactly where you are." },
      },
    ],
  },
  {
    id: "l124",
    moduleId: "m13",
    order: 4,
    level: "beginner",
    title: { ar: "إنشاء الملفات والتحرير: nano و cp و mv و rm", en: "Creating & Editing Files: nano, cp, mv & rm" },
    summary: {
      ar: "إنشاء الملفات والمجلدات بـ touch و mkdir، تحرير النصوص بـ nano واختصاراته الحيوية، ثم النسخ والنقل والحذف بـ cp و mv و rm مع تحذير لا رجعة فيه.",
      en: "Creating files and folders with touch and mkdir, editing text in nano with its vital shortcuts, then copying, moving and deleting with cp, mv and rm — with an irreversible warning.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "الإنشاء: touch و mkdir", en: "Creation: touch and mkdir" },
        body: {
          ar: "أبسط عمليات أي مختبر هي إنشاء مكان لعملك:\n\n- touch filename ينشئ ملفًا فارغًا إن لم يكن موجودًا (وإن وُجد يحدّث طابع الوقت فقط)\n- mkdir name ينشئ مجلدًا جديدًا\n- mkdir -p a/b/c ينشئ المسار كاملًا مع كل المجلدات الأب في أمر واحد\n\nالخيار -p صديقك في بناء هيكل مشاريع متشعب مثل labs/linux/permissions دون إنشاء كل مستوى على حدة.",
          en: "The simplest operation in any lab is creating a place for your work:\n\n- touch filename creates an empty file if it does not exist (if it exists, it just refreshes its timestamp)\n- mkdir name creates a new folder\n- mkdir -p a/b/c builds the whole path with every parent folder in one command\n\nThe -p option is your friend when building deep structures like labs/linux/permissions without creating each level separately.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ touch notes.txt\n[A20161234@student1 ~]$ mkdir labs\n[A20161234@student1 ~]$ mkdir -p labs/linux/permissions\n[A20161234@student1 ~]$ ls labs\nlinux",
        },
      },
      {
        heading: { ar: "التحرير بـ nano: اختصاراتك الأولى", en: "Editing in nano: your first shortcuts" },
        body: {
          ar: "nano محرر نصوص طرفي صغير وسهل، وهو محررك الافتراضي في مختبرات IT6004:\n\n- nano notes.txt يفتح الملف للتحرير فورًا\n- اكتب نصّك بحرية؛ الأسهم تنقلك والسطر الأخير من الشاشة هو شريط الاختصارات\n- Ctrl+O (المكتوبة ^O) يحفظ — سيطلب تأكيد اسم الملف فاضغط Enter\n- Ctrl+X (المكتوبة ^X) يخرج — وإن كان هناك تغيير غير محفوظ سيسألك Y/N\n- Ctrl+G تعرض شاشة المساعدة بكل الاختصارات\n\nالرمز ^ يعني مفتاح Ctrl؛ احفظ الأربعة الأولى غدًا قبل المختبر.",
          en: "nano is a small, friendly terminal text editor — the default editor in the IT6004 labs:\n\n- nano notes.txt opens the file for editing immediately\n- Type freely; the arrow keys move you and the screen's bottom line is the shortcut bar\n- Ctrl+O (shown as ^O) saves — it asks to confirm the filename, so press Enter\n- Ctrl+X (shown as ^X) exits — if there are unsaved changes it asks Y/N\n- Ctrl+G opens the help screen with every shortcut\n\nThe ^ symbol means the Ctrl key; memorize the first four before tomorrow's lab.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ nano notes.txt\n  GNU nano 2.9.8                  notes.txt\nWelcome to the Unix lab! Write your notes here.\n\n^G Get Help  ^O Write Out  ^K Cut Text  ^X Exit",
        },
        table: {
          caption: { ar: "اختصارات nano التي تحتاجها في كل مختبر", en: "The nano shortcuts you need in every lab" },
          headers: [
            { ar: "الاختصار", en: "Shortcut" },
            { ar: "وظيفته", en: "Function" },
          ],
          rows: [
            [
              { ar: "Ctrl+O ثم Enter", en: "Ctrl+O then Enter" },
              { ar: "حفظ الملف (Write Out)", en: "Save the file (Write Out)" },
            ],
            [
              { ar: "Ctrl+X", en: "Ctrl+X" },
              { ar: "الخروج مع سؤال الحفظ إن لزم", en: "Exit, asking to save if needed" },
            ],
            [
              { ar: "Ctrl+G", en: "Ctrl+G" },
              { ar: "شاشة المساعدة الكاملة", en: "The full help screen" },
            ],
            [
              { ar: "Ctrl+K", en: "Ctrl+K" },
              { ar: "قص السطر الحالي", en: "Cut the current line" },
            ],
            [
              { ar: "Ctrl+W", en: "Ctrl+W" },
              { ar: "البحث داخل النص", en: "Search inside the text" },
            ],
          ],
        },
      },
      {
        heading: { ar: "العرض: cat و head و tail", en: "Viewing: cat, head and tail" },
        body: {
          ar: "بعد الحفظ تحب أن ترى ما كتبت، وثلاثة أوامر تكفي:\n\n- cat file يطبع الملف كاملًا دفعة واحدة — مناسب للملفات القصيرة\n- head -n 5 file يعرض أول 5 أسطر فقط — عيّنة من البداية\n- tail -n 3 file يعرض آخر 3 أسطر — عيّنة من النهاية، وهو الأشهر مع ملفات السجلات logs\n\ncat كذلك يسلسل عدة ملفات: cat a.txt b.txt يطبعهما متتاليين — من هنا جاء اسمها concatenate.",
          en: "After saving you will want to see what you wrote, and three commands suffice:\n\n- cat file prints the whole file at once — suited to short files\n- head -n 5 file shows just the first 5 lines — a sample from the start\n- tail -n 3 file shows the last 3 lines — a sample from the end, the classic use with log files\n\ncat also chains several files: cat a.txt b.txt prints them one after the other — hence its name, concatenate.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ cat notes.txt\nWelcome to the Unix lab! Write your notes here.\n[A20161234@student1 ~]$ head -n 2 /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\nbin:x:1:1:bin:/bin:/sbin/nologin\n[A20161234@student1 ~]$ tail -n 1 /etc/passwd\nA20161234:x:1000:1000:Student:/home/A20161234:/bin/bash",
        },
      },
      {
        heading: { ar: "النسخ والنقل والحذف: cp و mv و rm", en: "Copy, move and delete: cp, mv and rm" },
        body: {
          ar: "ثلاثة أوامر تمثل كامل دورة حياة الملف:\n\n- cp source dest ينسخ: الأصل يبقى والنسخة جديدة\n- mv source dest ينقل — وهو نفسه يُستخدم لإعادة التسمية! لأن إعادة التسمية نقلًا إلى اسم جديد في المجلد نفسه\n- rm file يحذف — وهذا هو الخطر الحقيقي\n\nتحذير يجب أن يُكتب بحروف من نار: لينكس لا يوجد فيه سلة محذوفات ولا تراجع Ctrl+Z؛ rm يمسح الملف نهائيًا في اللحظة نفسها.\n\n- rm -r folder يحذف مجلدًا بكل محتوياته (recursive)\n- rm -i file يسألك تأكيدًا لكل ملف — عادة حميدة للمبتدئين\n- التمييز بين cp و mv هو نفسه بين «صورة طبق الأصل» و«انتقال الملف نفسه»",
          en: "Three commands cover the whole file lifecycle:\n\n- cp source dest copies: the original stays and a new duplicate appears\n- mv source dest moves — and it is the same command used for renaming! Because renaming is just moving to a new name in the same folder\n- rm file deletes — and this is the real danger\n\nA warning that deserves letters of fire: Linux has no recycle bin and no Ctrl+Z undo; rm erases the file permanently the very instant you press Enter.\n\n- rm -r folder deletes a folder with all its contents (recursive)\n- rm -i file asks for confirmation per file — a healthy beginner habit\n- The difference between cp and mv is exactly the difference between \"an identical copy\" and \"the file itself relocating\"",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ cp notes.txt notes-backup.txt\n[A20161234@student1 ~]$ mv notes.txt labs/linux/\n[A20161234@student1 ~]$ mv notes-backup.txt old-notes.txt\n[A20161234@student1 ~]$ rm -i old-notes.txt\nrm: remove regular file 'old-notes.txt'? y\n[A20161234@student1 ~]$ rm -r labs/linux/permissions",
        },
        tip: {
          ar: "rm لا يرسل شيئًا إلى سلة محذوفات — الحذف نهائي بلا رجعة. اجعل rm -i عادتك الافتراضية في أول فصلك.",
          en: "rm sends nothing to a recycle bin — deletion is final, no way back. Make rm -i your default habit in your first term.",
        },
      },
      {
        heading: { ar: "البحث عن ملفاتك: find", en: "Finding your files: find" },
        body: {
          ar: "ضاع منك ملف بين المجلدات؟ أمر find يبحث لك في الشجرة كلها:\n\n- find . -name \"*.txt\" يبحث من المجلد الحالي عن كل ما ينتهي اسمه بـ .txt\n- النجمة * نمط يطابق أي أحرف؛ لذا \"*.txt\" تعني «أي اسم ينتهي بالامتداد .txt\"\n- -name حساسة لحالة الأحرف و-iname تتجاهلها\n- find . -type d -name linux يبحث عن المجلدات فقط التي اسمها linux\n\nضع النمط بين علامتي تنصيص دائمًا حتى لا تعترضه الصدفة وتفسّره قبل find.",
          en: "Lost a file between folders? find searches the whole tree for you:\n\n- find . -name \"*.txt\" searches from the current folder for everything ending in .txt\n- The star * matches any characters, so \"*.txt\" means \"any name ending in txt\"\n- -name is case-sensitive while -iname ignores case\n- find . -type d -name linux searches only folders named linux\n\nAlways quote the pattern so the shell does not intercept and expand it before find sees it.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ find . -name \"*.txt\"\n./labs/linux/notes.txt\n[A20161234@student1 ~]$ find . -type d -name \"linux\"\n./labs/linux\n[A20161234@student1 ~]$ find . -iname \"*read*\"\n./labs/README",
        },
      },
    ],
    keyPoints: [
      { ar: "touch ينشئ ملفًا فارغًا وmkdir -p يبني مسارًا كاملًا بمجلداته الأب", en: "touch creates an empty file; mkdir -p builds a whole path with parents" },
      { ar: "في nano: Ctrl+O يحفظ وCtrl+X يخرج وCtrl+G المساعدة", en: "In nano: Ctrl+O saves, Ctrl+X exits, Ctrl+G helps" },
      { ar: "cat يعرض كامل الملف وhead وtail يعرضان طرفيه", en: "cat shows the whole file; head and tail show its two ends" },
      { ar: "mv ينقل ويعيد التسمية في الأمر نفسه؛ cp يترك الأصل سليمًا", en: "mv moves and renames in one command; cp leaves the original intact" },
      { ar: "rm حذف نهائي بلا سلة محذوفات ولا تراجع — rm -i حمايتك", en: "rm is permanent deletion with no recycle bin or undo — rm -i protects you" },
      { ar: "find . -name \"*.txt\" يبحث في الشجرة عن كل ملفات النص", en: "find . -name \"*.txt\" hunts the tree for every text file" },
    ],
    commands: [
      { cmd: "nano notes.txt", desc: { ar: "فتح ملف للتحرير في محرر الطرفية nano", en: "Open a file for editing in the nano terminal editor" } },
      { cmd: "cp notes.txt notes-backup.txt", desc: { ar: "نسخ الملف مع بقاء الأصل", en: "Copy the file while the original stays" } },
      { cmd: "mv notes.txt labs/linux/", desc: { ar: "نقل الملف إلى مجلد — أو إعادة تسميته ضمن المجلد نفسه", en: "Move a file into a folder — or rename it within the same folder" } },
      { cmd: "rm -i old-notes.txt", desc: { ar: "حذف مع طلب تأكيد قبل كل ملف", en: "Delete with a confirmation request before each file" } },
    ],
    quiz: [
      {
        q: { ar: "ماذا يفعل الأمر mv draft.txt final.txt؟", en: "What does mv draft.txt final.txt do?" },
        options: [
          { ar: "يعيد تسمية الملف إلى الاسم الجديد", en: "Renames the file to the new name" },
          { ar: "ينسخ الملف ويترك الأصل", en: "Copies the file and leaves the original" },
          { ar: "يحذف الملفين معًا", en: "Deletes both files" },
          { ar: "ينشئ مجلدًا باسم final.txt", en: "Creates a folder named final.txt" },
        ],
        correct: 0,
        explain: { ar: "إعادة التسمية في لينكس هي نقل إلى اسم جديد في المجلد نفسه — الأمر واحد: mv.", en: "Renaming in Linux is a move to a new name within the same folder — one command: mv." },
      },
      {
        q: { ar: "أي أمر يحذف مجلدًا بكامل ما بداخله؟", en: "Which command deletes a folder with everything inside it?" },
        options: [
          { ar: "rm -r folder", en: "rm -r folder" },
          { ar: "rm folder", en: "rm folder" },
          { ar: "mv folder /tmp", en: "mv folder /tmp" },
          { ar: "touch folder", en: "touch folder" },
        ],
        correct: 0,
        explain: { ar: "الخيار -r (recursive) يجعل rm ينزل داخل المجلد ويمحو محتواه ثم المجلد نفسه.", en: "The -r (recursive) option makes rm descend into the folder, erase its contents, then the folder itself." },
      },
      {
        q: { ar: "أنت في محرر nano وتريد الحفظ ثم الخروج — ما التسلسل؟", en: "You are in nano and want to save then exit — what is the sequence?" },
        options: [
          { ar: "Ctrl+O ثم Enter ثم Ctrl+X", en: "Ctrl+O, then Enter, then Ctrl+X" },
          { ar: "Ctrl+X ثم Y فقط", en: "Ctrl+X then just Y" },
          { ar: "Ctrl+K ثم Ctrl+X", en: "Ctrl+K then Ctrl+X" },
          { ar: "اضغط Esc ثم Enter", en: "Press Esc then Enter" },
        ],
        correct: 0,
        explain: { ar: "Ctrl+O يحفظ ويطلب تأكيد الاسم بـ Enter، ثم Ctrl+X يخرج نظيفًا.", en: "Ctrl+O saves and asks for the name confirmed with Enter, then Ctrl+X exits cleanly." },
      },
      {
        q: { ar: "لماذا يُنصح المبتدئ بـ rm -i بدل rm وحدها؟", en: "Why is rm -i advised for beginners over bare rm?" },
        options: [
          { ar: "لأن الحذف نهائي ولا سلة محذوفات، فالتأكيد ينقذك من الخطأ", en: "Because deletion is permanent with no recycle bin; the confirmation saves you from mistakes" },
          { ar: "لأن -i يجعل الحذف أسرع", en: "Because -i makes deletion faster" },
          { ar: "لأن rm وحدها لا تحذف الملفات فعلًا", en: "Because bare rm does not really delete files" },
          { ar: "لأن -i ترسل الملفات إلى الأرشيف", en: "Because -i sends files to an archive" },
        ],
        correct: 0,
        explain: { ar: "لينكس بلا تراجع؛ سؤال التأكيد y/n قبل كل حذف هو خط الدفاع الأخير أمام خطأ كتابة الاسم.", en: "Linux has no undo; the y/n question before each deletion is the last line of defense against a mistyped name." },
      },
    ],
  },
  {
    id: "l125",
    moduleId: "m13",
    order: 5,
    level: "beginner",
    title: { ar: "الصلاحيات: chmod و chown", en: "Permissions: chmod & chown" },
    summary: {
      ar: "قراءة رموز rwxr-xr-- مجموعةً مجموعة، معنى r وw وx للملفات والمجلدات، الحساب الثماني 755 و644 والوضع الرمزي، وتغيير المالك بـ chown — مادة امتحانك مباشرة.",
      en: "Reading the rwxr-xr-- triplets group by group, what r, w and x mean for files vs folders, the octal math of 755 and 644, symbolic mode, and chown — your direct exam material.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "قراءة ls -l: النوع ثم ثلاث مجموعات", en: "Reading ls -l: the type, then three triplets" },
        body: {
          ar: "هذا الدرس يفكّ أعقد جزء في مخرجات ls -l، وهو سؤال امتحان شبه مؤكد في IT6004 (المخرج التعليمي الثالث: إدارة ملفات الخادم).\n\nخذ هذا السطر وحلّله حرفًا حرفًا: -rwxr-xr--. 1 A20161234 students 512 Oct 5 11:02 report.sh\n\n- الحرف الأول هو النوع: الشرطة - ملف عادي، وd مجلد، وl وصلة رمزية\n- بعده ثلاث مجموعات من ثلاثة أحرف: rwx ثم r-x ثم r--\- المجموعة الأولى (user): حقوق المالك A20161234 نفسه\n- المجموعة الثانية (group): حقوق أعضاء مجموعة students\n- المجموعة الثالثة (others): حقوق كل من عداهم على النظام\n\nفي كل موضع: r قراءة، w كتابة، x تنفيذ؛ ووجود الشرطة في الموضع يعني أن الحق غائب.",
          en: "This lesson unpacks the hardest part of ls -l output — a near-certain IT6004 exam question (learning outcome 3: managing server files).\n\nTake this line and dissect it character by character: -rwxr-xr--. 1 A20161234 students 512 Oct 5 11:02 report.sh\n\n- The first character is the type: a dash - for a regular file, d for a directory, l for a symbolic link\n- Then come three triplets: rwx, then r-x, then r--\n- The first triplet (user): the rights of the owner A20161234 personally\n- The second triplet (group): the rights of members of the students group\n- The third triplet (others): the rights of everyone else on the system\n\nIn each position: r read, w write, x execute; a dash in a position means that right is absent.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ ls -l report.sh\n-rwxr-xr--. 1 A20161234 students 512 Oct  5 11:02 report.sh\n\n# breakdown: - | rwx | r-x | r--\n#            type  user  group others",
        },
      },
      {
        heading: { ar: "ماذا تعني r وw وx؟ الملف غير المجلد", en: "What do r, w and x mean? Files are not folders" },
        body: {
          ar: "المعنى يتغير تمامًا بحسب نوع العنصر، وهنا يخطئ كثيرون في الامتحان:\n\n- على ملف: r تعني قراءة محتواه، وw تعني تعديل محتواه، وx تعني تشغيله كبرنامج\n- على مجلد: r تعني سرد أسماء ما بداخله بـ ls، وw تعني إنشاء وحذف عناصر داخله، وx تعني الدخول إليه عبر cd والوصول لما فيه\n\nالخلاصة المدهشة: بدون x على الملجد لن تستطيع الوصول إلى ملفاته حتى لو كانت r مسموحة؛ فx هي «مفتاح الباب» وr هي «إذنة النظر من الداخل».",
          en: "The meaning changes completely with the item's type — and this is where many lose exam marks:\n\n- On a file: r means reading its content, w means modifying its content, x means running it as a program\n- On a folder: r means listing the names inside it with ls, w means creating and deleting items inside it, x means entering it with cd and reaching its contents\n\nThe surprising takeaway: without x on the folder you cannot reach its files even when r is granted; x is the \"door key\" while r is merely \"permission to look around once inside\".",
        },
        table: {
          caption: { ar: "معنى كل بت حسب نوع العنصر", en: "What each bit means by item type" },
          headers: [
            { ar: "البت", en: "Bit" },
            { ar: "على ملف", en: "On a file" },
            { ar: "على مجلد", en: "On a folder" },
          ],
          rows: [
            [
              { ar: "r", en: "r" },
              { ar: "قراءة محتوى الملف", en: "Read the file's content" },
              { ar: "سرد أسماء المحتويات بـ ls", en: "List the contents' names with ls" },
            ],
            [
              { ar: "w", en: "w" },
              { ar: "تعديل محتوى الملف", en: "Modify the file's content" },
              { ar: "إنشاء وحذف عناصر داخل المجلد", en: "Create and delete items inside the folder" },
            ],
            [
              { ar: "x", en: "x" },
              { ar: "تنفيذ الملف كبرنامج", en: "Execute the file as a program" },
              { ar: "الدخول عبر cd والوصول للداخل", en: "Enter with cd and reach the inside" },
            ],
          ],
        },
      },
      {
        heading: { ar: "الوضع الثماني: حساب 755 في ثانيتين", en: "Octal mode: computing 755 in two seconds" },
        body: {
          ar: "بدل كتابة تسعة أحرف، يسمح chmod بأرقام ثمانية — كل رقم يلخّص مجموعة كاملة:\n\n- r = 4، وw = 2، وx = 1\n- اجمع قيم الحقوق الممنوحة في كل مجموعة\n- 7 = r+w+x (كل شيء)، و6 = r+w، و5 = r+x، و4 = r وحدها\n\nفالرقم 755 يُقرأ: المالك 7 كامل، والمجموعة 5 قراءة وتنفيذ، والآخرون 5 قراءة وتنفيذ — أي rwxr-xr-x.\n\nوأشهر القيم التي ستراها كل يوم في الإدارة:\n\n- 755 للمجلدات والبرامج المشتركة\n- 644 للملفات النصية العادية\n- 700 و600 للمجلدات والملفات الخاصة بمالكها وحده",
          en: "Instead of writing nine letters, chmod accepts octal digits — each digit compresses one whole triplet:\n\n- r = 4, w = 2, and x = 1\n- Sum the granted rights in each triplet\n- 7 = r+w+x (everything), 6 = r+w, 5 = r+x, 4 = r alone\n\nSo 755 reads: owner 7 full, group 5 read-and-execute, others 5 read-and-execute — in other words rwxr-xr-x.\n\nAnd the everyday classics of administration:\n\n- 755 for shared folders and programs\n- 644 for ordinary text files\n- 700 and 600 for folders and files private to their owner",
        },
        table: {
          caption: { ar: "جدول التحويل الثماني والرمزي والمعنى — احفظه للامتحان", en: "The octal, symbolic and meaning conversion table — memorize it for the exam" },
          headers: [
            { ar: "ثماني", en: "Octal" },
            { ar: "رمزي", en: "Symbolic" },
            { ar: "المعنى العملي", en: "Practical meaning" },
          ],
          rows: [
            [
              { ar: "755", en: "755" },
              { ar: "rwxr-xr-x", en: "rwxr-xr-x" },
              { ar: "المالك كامل؛ البقية قراءة وتنفيذ — مجلدات وبرامج مشتركة", en: "Owner full; others read and execute — shared folders and programs" },
            ],
            [
              { ar: "644", en: "644" },
              { ar: "rw-r--r--", en: "rw-r--r--" },
              { ar: "المالك يقرأ ويكتب؛ البقية قراءة فقط — الملفات العادية", en: "Owner reads and writes; others read only — ordinary files" },
            ],
            [
              { ar: "700", en: "700" },
              { ar: "rwx------", en: "rwx------" },
              { ar: "الملك كامل ولا أحد سواه — مجلد خاص", en: "Owner full and nobody else — a private folder" },
            ],
            [
              { ar: "600", en: "600" },
              { ar: "rw-------", en: "rw-------" },
              { ar: "ملف سري كالمفاتيح الخاصة", en: "A secret file like a private key" },
            ],
            [
              { ar: "777", en: "777" },
              { ar: "rwxrwxrwx", en: "rwxrwxrwx" },
              { ar: "الجميع بكل الصلاحيات — خطر ولا يُستخدم إلا نادرًا", en: "Everyone, everything — dangerous and rarely justified" },
            ],
          ],
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ chmod 644 report.sh\n[A20161234@student1 ~]$ ls -l report.sh\n-rw-r--r--. 1 A20161234 students 512 Oct  5 11:02 report.sh",
        },
      },
      {
        heading: { ar: "الوضع الرمزي: u و g و o مع + و − و =", en: "Symbolic mode: u, g and o with +, − and =" },
        body: {
          ar: "الوضع الرمزي يعدّل صلاحيات موجودة دون إعادة كتابة المجموع كلها — مثالي للتعديل الجراحي:\n\n- u للمستخدم المالك، وg للمجموعة، وo للآخرين، وa للجميع\n- علامة + تضيف حقًا، وعلامة - تنزعه، وعلامة = تضبط الصلاحيات على القيمة المذكورة بالضبط\n\nأمثلة تقرأها كما تنطقها:\n\n- chmod u+x report.sh: امنح المالك حق التنفيذ\n- chmod go-w report.sh: انزع الكتابة عن المجموعة والآخرين\n- chmod o= report.sh: اجعل صلاحيات الآخرين صفرًا تمامًا\n\nويمكن دمج أكثر من تعديل بفاصلة: chmod u+x,go-w report.sh",
          en: "Symbolic mode adjusts existing permissions without rewriting the whole set — ideal for surgical edits:\n\n- u for the owning user, g for the group, o for others, a for all\n- The plus sign + grants a right, the minus - removes it, and the equals = sets permissions to exactly the listed ones\n\nExamples you read the way you say them:\n\n- chmod u+x report.sh: grant the owner execute\n- chmod go-w report.sh: strip write from group and others\n- chmod o= report.sh: zero out the others' permissions entirely\n\nMultiple edits combine with commas: chmod u+x,go-w report.sh",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ chmod u+x,go-w report.sh\n[A20161234@student1 ~]$ chmod o= report.sh\n[A20161234@student1 ~]$ ls -l report.sh\n-rwxr-----. 1 A20161234 students 512 Oct  5 11:02 report.sh",
        },
        tip: {
          ar: "قاعدة امتحان: البتات تعمل جماعات ثلاثًا؛ اقرأ دائمًا user ثم group ثم others بهذا الترتيب نفسه.",
          en: "Exam rule: the bits work in triplets; always read user, then group, then others in exactly that order.",
        },
      },
      {
        heading: { ar: "تغيير المالك: chown ولماذا يتجاوز الجذر؟", en: "Changing the owner: chown and why root bypasses it all" },
        body: {
          ar: "الأمر chown (change owner) يغيّر المالك والمجموعة معًا بصيغة user:group:\n\n- chown sara:webteam report.sh ينقل الملكية إلى sara ومجموعتها webteam\n- تغيير الملكية عملية حساسة، فلا يُسمح إلا للجذر root عبر sudo\n\nوما معنى رسالة Permission denied التي ستراها كثيرًا؟ معناها الحرفي: طلبت من النواة عملية لا تملك حقها وفق جدول الصلاحيات — النظام يعمل كما صُمم تمامًا، فلا تلُم الطرفية.\n\nأما الجذر root فوحدوه فوق هذا النظام كله: النواة تتجاوز فحص الصلاحيات لعملياته؛ لهذا يُقال إن الجذر «يستطيع كل شيء»، ولهذا أيضًا حساب خطِر يُستعمل بأقل قدر ممكن.",
          en: "The chown command (change owner) transfers ownership and group together in the user:group form:\n\n- chown sara:webteam report.sh hands the file to sara and her webteam group\n- Changing ownership is sensitive, so only root may do it, via sudo\n\nAnd what does the Permission denied message you will often see really mean? Literally: you asked the kernel for an operation your entry in the permission table does not allow — the system is working exactly as designed, so do not blame the terminal.\n\nRoot alone stands above this whole scheme: the kernel skips permission checks for it; that is why root \"can do anything\" — and why it is a dangerous account to use as sparingly as possible.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ chown sara:webteam report.sh\nchown: changing ownership of 'report.sh': Operation not permitted\n[A20161234@student1 ~]$ sudo chown sara:webteam report.sh\n[A20161234@student1 ~]$ ls -l report.sh\n-rwxr-----. 1 sara webteam 512 Oct  5 11:02 report.sh",
        },
      },
    ],
    keyPoints: [
      { ar: "ls -l: النوع (-/d/l) ثم ثلاث مجموعات user وgroup وothers", en: "ls -l: the type (-/d/l), then the user, group and others triplets" },
      { ar: "r=4 وw=2 وx=1؛ والجمع يعطي 7 و6 و5 — فـ755 هي rwxr-xr-x", en: "r=4, w=2, x=1; the sums give 7, 6 and 5 — so 755 is rwxr-xr-x" },
      { ar: "على المجلد: x مفتاح الدخول عبر cd وr سرد الأسماء وw إنشاء وحذف الداخل", en: "On a folder: x is the cd entry key, r lists names, w creates and deletes inside" },
      { ar: "الوضع الرمزي: u/g/o مع + لإضافة و- للنزع و= للضبط الدقيق", en: "Symbolic mode: u/g/o with + to add, - to strip, = to set exactly" },
      { ar: "chown user:group يغيّر الملكية ويحتاج صلاحيات الجذر", en: "chown user:group changes ownership and needs root privileges" },
      { ar: "Permission denied = النظام يعمل كما صُمم؛ والجذر وحده يتجاوز فحص الصلاحيات", en: "Permission denied = the system working as designed; only root bypasses the checks" },
    ],
    commands: [
      { cmd: "chmod 644 notes.txt", desc: { ar: "ضبط صلاحيات ملف عادي بالوضع الثماني", en: "Set ordinary-file permissions in octal mode" } },
      { cmd: "chmod u+x script.sh", desc: { ar: "منح المالك حق تنفيذ السكربت بالوضع الرمزي", en: "Grant the owner execute on a script in symbolic mode" } },
      { cmd: "chown sara:webteam report.sh", desc: { ar: "نقل ملكية الملف إلى مستخدم ومجموعة (بصلاحيات الجذر)", en: "Transfer a file to a user and group (with root privileges)" } },
      { cmd: "ls -l", desc: { ar: "قراءة الصلاحيات والمالك والمجموعة لكل عنصر", en: "Read permissions, owner and group of every item" } },
    ],
    quiz: [
      {
        q: { ar: "ما الرمز المكافئ للوضع الثماني 644؟", en: "Which symbolic string matches octal 644?" },
        options: [
          { ar: "rw-r--r--", en: "rw-r--r--" },
          { ar: "rwxr-xr-x", en: "rwxr-xr-x" },
          { ar: "rw-rw-rw-", en: "rw-rw-rw-" },
          { ar: "r--r--r--", en: "r--r--r--" },
        ],
        correct: 0,
        explain: { ar: "6 = r+w للمالك، ثم 4 = r للمجموعة، ثم 4 = r للآخرين.", en: "6 = r+w for the owner, then 4 = r for the group, then 4 = r for others." },
      },
      {
        q: { ar: "بالنسبة لمجلد، ماذا تمنح صلاحية x؟", en: "For a directory, what does the x permission grant?" },
        options: [
          { ar: "الدخول إلى المجلد والوصول لمحتوياته", en: "Entering the directory and reaching its contents" },
          { ar: "سرد أسماء محتوياته فقط", en: "Only listing the names of its contents" },
          { ar: "حذف المجلد نفسه", en: "Deleting the directory itself" },
          { ar: "تنفيذ المجلد كبرنامج", en: "Running the directory as a program" },
        ],
        correct: 0,
        explain: { ar: "x على المجلد هي مفتاح الباب (cd)؛ أما r فهي النظر للأسماء وw الإنشاء والحذف داخله.", en: "x on a folder is the door key (cd); r looks at names and w creates/deletes inside it." },
      },
      {
        q: { ar: "ماذا يفعل chmod o= file؟", en: "What does chmod o= file do?" },
        options: [
          { ar: "يمسح كل صلاحيات الآخرين على الملف", en: "Wipes every others-permission on the file" },
          { ar: "يمنح الآخرين كل الصلاحيات", en: "Grants others every permission" },
          { ar: "يمنح الآخرين حق التنفيذ فقط", en: "Grants others execute only" },
          { ar: "يغير مالك الملف", en: "Changes the file's owner" },
        ],
        correct: 0,
        explain: { ar: "علامة = تضبط الصلاحيات على ما بعدها بالضبط؛ وبلا شيء بعدها تصير صفرًا.", en: "The = sign sets permissions to exactly what follows; with nothing after it, that is zero." },
      },
      {
        q: { ar: "المجموعة الثانية في rwxr-xr-- تُقرأ لصالح:", en: "The second triplet in rwxr-xr-- is read for the benefit of:" },
        options: [
          { ar: "مجموعة المالك", en: "The owner's group" },
          { ar: "المالك نفسه", en: "The owner personally" },
          { ar: "كل مستخدمي النظام", en: "Every user on the system" },
          { ar: "الجذر وحده", en: "Root alone" },
        ],
        correct: 0,
        explain: { ar: "الترتيب ثابت: user ثم group ثم others؛ والثانية دائمًا للمجموعة.", en: "The order is fixed: user, then group, then others; the second is always the group's." },
      },
    ],
  },
  {
    id: "l126",
    moduleId: "m13",
    order: 6,
    level: "beginner",
    title: { ar: "المستخدمون والمجموعات و sudo", en: "Users, Groups & sudo" },
    summary: {
      ar: "النظام متعدد المستخدمين: whoami وid وقراءة /etc/passwd بحقوله السبعة، إنشاء الحسابات بـ useradd وإدارتها، وفلسفة sudo مقابل su -.",
      en: "The multi-user system: whoami and id, reading /etc/passwd with its seven fields, creating accounts with useradd, and the sudo philosophy versus su -.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "نظام وُلد متعدد المستخدمين", en: "A system born multi-user" },
        body: {
          ar: "بينما وُلدت ويندوز حول حاسوب شخصي واحد لمستخدم واحد، وُلد يونكس في المختبرات لخدمة عشرات المستخدمين على آلة واحدة في آن واحد (نظام مشاركة الزمن Time-Sharing).\n\nهذا الأصل يفسّر كل شيء حولك:\n\n- كل حساب له رقم تعريف uid وهوية وملفاته الخاصة\n- الصلاحيات (الدرس السابق) هي جدران الفصل بين الحسابات\n- المجموعات تجمع ذوي العمل المشترك ليشاركوا ملفات بلا فتحها للعالم\n\nأمران يعرّفان بك في أي لحظة:\n\n- whoami يطبع اسم حسابك\n- id يطبع uid وgid وكل مجموعاتك — لاحظ في مخرجاته groups=... وستجد غالبًا wheel وهي مجموعة من يحق له استخدام sudo",
          en: "While Windows was born around one personal computer for one user, Unix was born in labs to serve dozens of users on one machine simultaneously (time-sharing).\n\nThis origin explains everything around you:\n\n- Every account has a uid number, an identity and its own files\n- Permissions (previous lesson) are the separating walls between accounts\n- Groups gather people doing shared work so they can share files without opening them to the world\n\nTwo commands identify you at any moment:\n\n- whoami prints your account name\n- id prints your uid, gid and all your groups — notice groups=... in its output; you will usually find wheel, the group of those allowed to use sudo",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ whoami\nA20161234\n[A20161234@student1 ~]$ id\nuid=1000(A20161234) gid=1000(A20161234) groups=1000(A20161234),10(wheel)",
        },
      },
      {
        heading: { ar: "ملف /etc/passwd: بطاقة هوية كل حساب", en: "/etc/passwd: the identity card of every account" },
        body: {
          ar: "كل حساب على النظام له سطر واحد في الملف النصي /etc/passwd — ونعم، ملف نصي عادي تقرأه بـ cat!\n\nالسطر سبعة حقول تفصلها نقطتان :\n\n- 1 اسم المستخدم للدخول\n- 2 حرف x: يعني أن كلمة المرور مشفّرة في ملف /etc/shadow المحمي\n- 3 رقم المستخدم uid (الجذر دائمًا 0)\n- 4 رقم المجموعة الرئيسية gid\n- 5 حقل التعليق GECOS (الاسم الكامل مثلًا)\n- 6 مسار مجلد المنزل\n- 7 الصدفة shell التي تُفتح عند الدخول (مثل /bin/bash)\n\nلو كانت كلمات المرور هنا لقرأها كل مستخدم؛ لذا فُصلت في shadow بصلاحيات 600 للجذر وحده.",
          en: "Every account on the system has a single line in the plain text file /etc/passwd — and yes, an ordinary file you can read with cat!\n\nThe line holds seven colon-separated fields:\n\n- 1 the login username\n- 2 the letter x: the encrypted password lives in the protected /etc/shadow\n- 3 the user id uid (root is always 0)\n- 4 the primary group id gid\n- 5 the GECOS comment field (e.g. the full name)\n- 6 the home directory path\n- 7 the login shell (such as /bin/bash)\n\nIf passwords lived here every user could read them; that is why they moved to shadow, mode 600, root only.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ head -n 3 /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\nbin:x:1:1:bin:/bin:/sbin/nologin\ndaemon:x:2:2:daemon:/sbin:/sbin/nologin\n[A20161234@student1 ~]$ grep A20161234 /etc/passwd\nA20161234:x:1000:1000:Student:/home/A20161234:/bin/bash",
        },
        table: {
          caption: { ar: "الملفات الثلاثة التي تخزّن هويات النظام", en: "The three files storing the system's identities" },
          headers: [
            { ar: "الملف", en: "File" },
            { ar: "دوره", en: "Role" },
          ],
          rows: [
            [
              { ar: "/etc/passwd", en: "/etc/passwd" },
              { ar: "حسابات المستخدمين وبياناتها — مقروء للجميع", en: "User accounts and their data — world-readable" },
            ],
            [
              { ar: "/etc/shadow", en: "/etc/shadow" },
              { ar: "كلمات المرور المشفّرة وتواريخ انتهائها — الجذر فقط", en: "Encrypted passwords and expiry dates — root only" },
            ],
            [
              { ar: "/etc/group", en: "/etc/group" },
              { ar: "المجموعات وأعضاؤها", en: "Groups and their members" },
            ],
          ],
        },
      },
      {
        heading: { ar: "إنشاء الحسابات وإدارتها", en: "Creating and managing accounts" },
        body: {
          ar: "كمدير ستنشئ حسابات لزملائك أو لخدمات النظام، وسلسلة الأوامر واحدة دائمًا:\n\n- useradd -m sara ينشئ الحساب مع مجلد منزله (-m تنسخ ملفات البداية)\n- passwd sara تضبط كلمة مرورها (يسأل الجديدة مرتين)\n- usermod -aG wheel sara تضيفها إلى مجموعة wheel فتصبح من مستخدمي sudo\n- groupadd webteam ينشئ مجموعة جديدة للمشتركين في مشروع\n\nهذه الأوامر تعدّل ملفات /etc الثلاثة نيابة عنك — عد إلى الجدول أعلاه وستعرف أين يقع كل تغيير.",
          en: "As an administrator you will create accounts for colleagues or system services, and the command chain is always the same:\n\n- useradd -m sara creates the account with its home folder (-m copies the starter files)\n- passwd sara sets her password (asking the new one twice)\n- usermod -aG wheel sara adds her to the wheel group, making her a sudo user\n- groupadd webteam creates a fresh group for a shared project\n\nThese commands edit the three /etc files on your behalf — return to the table above and you know exactly where each change lands.",
        },
        code: {
          lang: "bash",
          snippet:
            "[root@student1 ~]# useradd -m -c \"Sara Ahmed\" sara\n[root@student1 ~]# passwd sara\nChanging password for user sara.\nNew password:\nRetype new password:\npasswd: all authentication tokens updated successfully.\n[root@student1 ~]# usermod -aG wheel sara\n[root@student1 ~]# groupadd webteam\n[root@student1 ~]# grep sara /etc/passwd\nsara:x:1001:1001:Sara Ahmed:/home/sara:/bin/bash",
        },
      },
      {
        heading: { ar: "sudo مقابل su -؛ وملف sudoers", en: "sudo versus su -; and the sudoers file" },
        body: {
          ar: "يحتاج المدير أحيانًا صلاحيات الجذر، وللفلسفة طريقان:\n\n- su - يفتح قشرة جذر كاملة: كل ما بعده يعمل بصفة root حتى تخرج — سيف حاد بلا غمد، ولا أثر لكل أمر على حدة\n- sudo يرفع أمرًا واحدًا فقط: تطلب ما تحتاجه وتعود مستخدمًا عاديًا — وكل استخدام يُسجّل في سجل يُراجع، ويطلب كلمة مرورك أنت\n\nلذلك توصي كل أدبيات الإدارة الحديثة بـ sudo: أقل تعرضًا للخطر وأكثر قابلية للتدقيق.\n\nمن يملك صلاحية sudo؟ يحددها الملف /etc/sudoers — وتحذير مهم: لا تحرّره بمحرر نصوص عادي أبدًا؛ خطأ سطر واحد قد يقفل باب النظام كله عليك. استخدم دائمًا visudo الذي يفحص الصياغة قبل الحفظ.",
          en: "Administrators occasionally need root powers, and there are two philosophical routes:\n\n- su - opens a full root shell: everything after it runs as root until you exit — a naked blade with no audit trail per command\n- sudo elevates a single command: you take exactly what you need and return to being a normal user — every use lands in a reviewable log, and it asks for your own password\n\nThat is why modern administration guides recommend sudo: less exposure, more accountability.\n\nWho may sudo? The /etc/sudoers file decides — and a serious warning: never edit it with a plain text editor; one bad line can lock you out of the whole system. Always use visudo, which validates the syntax before saving.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ sudo yum update\n[sudo] password for A20161234:\nLast metadata expiration check: 0:24:12 ago on Sun Oct  5 10:51:04 2025.\nNo packages marked for update\n\n[A20161234@student1 ~]$ visudo  # as root; edits /etc/sudoers safely",
        },
        tip: {
          ar: "خطأ شائع قاتل: تحرير /etc/sudoers بـ nano مباشرة. visudo وحده يفحص الصياغة قبل الحفظ ويحمي بابك إلى النظام.",
          en: "A classic fatal mistake: editing /etc/sudoers with nano directly. Only visudo checks the syntax before saving and protects your door into the system.",
        },
      },
    ],
    keyPoints: [
      { ar: "يونكس متعدد المستخدمين بالتصميم؛ كل حساب له uid ومجموعاته", en: "Unix is multi-user by design; every account has a uid and its groups" },
      { ar: "id يعرض uid وgid والمجموعات؛ وwheel هي مجموعة مستخدمي sudo", en: "id shows uid, gid and groups; wheel is the sudo users' group" },
      { ar: "/etc/passwd سبعة حقول؛ الحقل x يعني كلمة المرور في /etc/shadow", en: "/etc/passwd has seven fields; the x field means the password is in /etc/shadow" },
      { ar: "useradd -m ثم passwd ثم usermod -aG: سلسلة إنشاء الحسابات", en: "useradd -m, then passwd, then usermod -aG: the account creation chain" },
      { ar: "sudo يرفع أمرًا واحدًا مسجّلًا؛ وsu - قشرة جذر كاملة بلا تدقيق", en: "sudo elevates one logged command; su - is a full unaudited root shell" },
      { ar: "حرّر /etc/sudoers بـ visudo فقط — خطأ الصياغة يقفل النظام", en: "Edit /etc/sudoers with visudo only — a syntax error locks the system" },
    ],
    commands: [
      { cmd: "id", desc: { ar: "عرض رقمك ومجموعاتك كاملة في سطر واحد", en: "Show your uid and full group list in one line" } },
      { cmd: "sudo useradd -m sara", desc: { ar: "إنشاء حساب جديد مع مجلد منزله", en: "Create a new account with its home folder" } },
      { cmd: "sudo passwd sara", desc: { ar: "ضبط كلمة مرور حساب آخر", en: "Set another account's password" } },
      { cmd: "sudo usermod -aG wheel sara", desc: { ar: "إضافة مستخدم إلى مجموعة sudoers", en: "Add a user to the sudoers group" } },
    ],
    quiz: [
      {
        q: { ar: "ماذا يعني الحقل الثاني x في سطر /etc/passwd؟", en: "What does the second field, x, mean in a /etc/passwd line?" },
        options: [
          { ar: "كلمة المرور مشفّرة ومخزنة في /etc/shadow", en: "The password is encrypted and stored in /etc/shadow" },
          { ar: "الحساب معطّل وممنوع من الدخول", en: "The account is disabled and barred from login" },
          { ar: "لا يوجد حقل ثانٍ أصلًا", en: "There is no second field at all" },
          { ar: "المستخدم عضو في مجموعة wheel", en: "The user belongs to the wheel group" },
        ],
        correct: 0,
        explain: { ar: "استبدلت كلمات المرور بحرف x وفُصلت في shadow المحمي بصلاحيات 600 لئلا يقرأها الجميع.", en: "Passwords were replaced by x and moved to the protected shadow, mode 600, so not everyone can read them." },
      },
      {
        q: { ar: "أي أمر يفتح قشرة جذر كاملة تدوم حتى تخرج منها؟", en: "Which command opens a full root shell that lasts until you exit it?" },
        options: [
          { ar: "su -", en: "su -" },
          { ar: "sudo whoami", en: "sudo whoami" },
          { ar: "id", en: "id" },
          { ar: "useradd", en: "useradd" },
        ],
        correct: 0,
        explain: { ar: "su - يمنحك جلسة جذر كاملة؛ أما sudo فيرفع أمرًا واحدًا ثم يعيدك مستخدمًا عاديًا.", en: "su - gives a whole root session; sudo lifts a single command then returns you to normal." },
      },
      {
        q: { ar: "لماذا يجب استخدام visudo لتحرير /etc/sudoers؟", en: "Why must you use visudo to edit /etc/sudoers?" },
        options: [
          { ar: "لأنه يفحص الصياغة قبل الحفظ فيمنع قفل النظام", en: "Because it validates syntax before saving, preventing a system lockout" },
          { ar: "لأنه يحرّر الملف بصلاحيات أقل", en: "Because it edits the file with lower privileges" },
          { ar: "لأن nano لا يستطيع فتح الملفات النصية", en: "Because nano cannot open text files" },
          { ar: "لأنه يضيف مستخدمين تلقائيًا", en: "Because it adds users automatically" },
        ],
        correct: 0,
        explain: { ar: "سطر تالف في sudoers قد يعطّل sudo كله؛ visudo يتحقق قبل الاعتماد فينقذك.", en: "A corrupted line in sudoers can disable sudo entirely; visudo verifies before committing and saves you." },
      },
      {
        q: { ar: "ما رقم uid الخاص بحساب الجذر root دائمًا؟", en: "What is the uid of the root account, always?" },
        options: [
          { ar: "0", en: "0" },
          { ar: "1", en: "1" },
          { ar: "100", en: "100" },
          { ar: "1000", en: "1000" },
        ],
        correct: 0,
        explain: { ar: "الجذر uid=0 دومًا؛ والحسابات البشرية تبدأ غالبًا من 1000 كما في مخرجات id الخاصة بك.", en: "Root is always uid=0; human accounts usually start at 1000, as your own id output shows." },
      },
    ],
  },
  {
    id: "l127",
    moduleId: "m13",
    order: 7,
    level: "beginner",
    title: { ar: "العمليات: ps و top و kill", en: "Processes: ps, top & kill" },
    summary: {
      ar: "العملية برنامج يجري وله رقم PID؛ قراءة أعمدة ps aux وواجهة top الحية، إدارة المهام الأمامية والخلفية، وإشارات الإنهاء المهذبة والقسرية.",
      en: "A process is a running program with a PID; reading ps aux columns and the live top view, managing foreground and background jobs, and polite versus forceful termination signals.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "ما العملية؟ من البرنامج إلى PID", en: "What is a process? From program to PID" },
        body: {
          ar: "فرق دقيق لكنه أساسي:\n\n- البرنامج (Program): الملف النصي أو الثنائي الساكن على القرص\n- العملية (Process): ذلك البرنامج وهو يجري فعلًا في الذاكرة: له مساحة ذاكرة وملفات مفتوحة وسياق تشغيل\n\nالنواة تمنح كل عملية رقمًا مميزًا PID (Process ID) غير قابل للتكرار في اللحظة نفسها؛ ويمكن تشغيل نسخ كثيرة من البرنامج الواحد فتُصبح كل نسخة عملية مستقلة برقمها.\n\n- اكتب ps لترى عمليات طرفيتك الحالية: قشرة bash نفسها وعملية ps\n- لكل عملية مالك من المستخدمين — والصلاحيات تنطبق عليها كما على الملفات",
          en: "A subtle but essential distinction:\n\n- The program: the static text or binary file sitting on disk\n- The process: that program actually running in memory, with its memory space, open files and execution context\n\nThe kernel gives every process a unique PID (Process ID), never shared at the same instant; you can run many copies of one program, each becoming an independent process with its own number.\n\n- Type ps to see your current terminal's processes: the bash shell itself and the ps process\n- Every process has an owning user — permissions apply to it just as to files",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ ps\n    PID TTY          TIME CMD\n   2151 pts/0    00:00:00 bash\n   2245 pts/0    00:00:00 ps",
        },
      },
      {
        heading: { ar: "ps aux: الأعمدة التي تهم المدير", en: "ps aux: the columns an admin cares about" },
        body: {
          ar: "ps وحدها محدودة بطرفيتك؛ أضف aux لترى كل عمليات النظام كلها مع مستخدميها:\n\n- USER: مالك العملية\n- PID: رقمها المميز — الذي ستكتبه لـ kill لاحقًا\n- %CPU و%MEM: نصيبها من المعالج والذاكرة — أول ما تفتشه عند بطء الخادم\n- VSZ وRSS: الذاكرة الافتراضية والمقيمة فعليًا\n- STAT: حالتها (R تجري، S نائمة، Z ميتة حرفيًا)\n- TIME: زمن المعالج المستهلك، وCOMMAND: سطر تشغيلها\n\nلاحظ PID رقم 1: عملية systemd — أول عملية تبدأ على لينكس وجدّ كل ما بعدها.",
          en: "Bare ps is limited to your terminal; add aux to see every process on the whole system with its owners:\n\n- USER: the process owner\n- PID: its unique number — the one you will feed to kill later\n- %CPU and %MEM: its share of CPU and memory — the first thing you inspect when a server slows down\n- VSZ and RSS: virtual and physically resident memory\n- STAT: its state (R running, S sleeping, Z literally dead)\n- TIME: accumulated CPU time, and COMMAND: its command line\n\nNotice PID 1: systemd — the first process Linux starts and the ancestor of everything after it.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ ps aux | head -n 5\nUSER       PID %CPU %MEM    VSZ   RSS TTY   STAT START  TIME COMMAND\nroot         1  0.0  0.4 125412  4460 ?     Ss   09:00  0:02 /usr/lib/systemd/systemd --switched-root\nroot       812  0.0  0.2  90876  2216 ?     Ss   09:00  0:00 /usr/sbin/sshd -D\nroot       977  0.0  0.5 391204  5216 ?     Ssl  09:00  0:00 /usr/sbin/amazon-ecs-agent\nA20161234  2151  0.0  0.3 116872  3396 pts/0 Ss   09:41  0:00 -bash",
        },
      },
      {
        heading: { ar: "top وuptime: نبض الخادم الحي", en: "top and uptime: the server's live pulse" },
        body: {
          ar: "الأمر top يعرض لوحة حية تتجدد كل بضع ثوانٍ — شاشة مراقبة المدير الأولى:\n\n- أعلى الشاشة: uptime مدة التشغيل وعدد المستخدمين ومؤشرات التحميل\n- load average ثلاثة أرقام: متوسط الحمل في آخر دقيقة و5 دقائق و15 دقيقة\n- قاعدتك السريعة: حمل أقل من عدد أنوية المعالج = وضع صحي؛ أعلى منها باستمرار = ازدحام\n- %Cpu(s) وMiB Mem تقولان أين يذهب المعالج والذاكرة\n- الجدول نفسه نسخة حية من ps aux مرتبة بأكبر مستهلك\n\nخفيف top السريع هو uptime الذي يطبع السطر الأول وحده.",
          en: "The top command shows a live dashboard refreshing every few seconds — the administrator's first monitoring screen:\n\n- Screen top: uptime, the user count and load indicators\n- load average: three numbers — the mean load over the last 1, 5 and 15 minutes\n- Quick rule: load below the CPU core count = healthy; persistently above = congestion\n- %Cpu(s) and MiB Mem say where processor and memory are going\n- The table itself is a live ps aux sorted by biggest consumer\n\nuptime is the quick lightweight top, printing only that first line.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ uptime\n 11:14:03 up 2:12,  1 user,  load average: 0.08, 0.03, 0.05\n\n[A20161234@student1 ~]$ top -bn1 | head -n 5\ntop - 11:14:03 up  2:12,  1 user,  load average: 0.08, 0.03, 0.05\nTasks:  96 total,   1 running,  95 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  0.7 us,  0.3 sy,  0.0 ni, 99.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st\nMiB Mem :   1830.0 total,   1204.2 free,    308.4 used,    317.4 buff/cache",
        },
      },
      {
        heading: { ar: "الأمامية والخلفية: Ctrl+Z و jobs و fg و bg", en: "Foreground and background: Ctrl+Z, jobs, fg and bg" },
        body: {
          ar: "الطرفية تدير مهامك Jobs وليس أوامر منفردة فقط:\n\n- & في نهاية الأمر تشغّله خلفية فورًا وتعيد لك المحث: sleep 300 &\n- Ctrl+Z يعلّق المهمة الأمامية المجهدة (Stopp) دون إنهائها\n- jobs يسرد مهامك بأرقامها وحالاتها\n- bg %1 يستأنف المهمة المعلقة في الخلفية\n- fg %1 يعيدها إلى الأمام فتتفاعل معها مجددًا\n\nسيناريو المختبر المعتاد: أمر طويل يسد الطرفية — علّقه بـ Ctrl+Z، أرسله للخلفية بـ bg، تابع عملك، وراجعه بـ jobs.",
          en: "The terminal manages your jobs, not just single commands:\n\n- An & at the end of a command runs it in the background at once and returns your prompt: sleep 300 &\n- Ctrl+Z suspends the blocking foreground job (Stopped) without ending it\n- jobs lists your jobs with their numbers and states\n- bg %1 resumes the suspended job in the background\n- fg %1 brings it back to the foreground to interact with it again\n\nThe classic lab scenario: a long command clogs the terminal — suspend with Ctrl+Z, send it back with bg, keep working, and check on it with jobs.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ sleep 300 &\n[1] 2240\n[A20161234@student1 ~]$ sleep 600\n^Z\n[2]+  Stopped                 sleep 600\n[A20161234@student1 ~]$ jobs\n[1]-  Running                 sleep 300 &\n[2]+  Stopped                 sleep 600\n[A20161234@student1 ~]$ bg %2\n[2]+ sleep 600 &\n[A20161234@student1 ~]$ fg %1\nsleep 300",
        },
        diagram: {
          kind: "flow",
          title: { ar: "دورة إدارة المهمة الطويلة", en: "Managing a long job's lifecycle" },
          items: [
            { ar: "ابدأ أمرًا طويلًا في سطر الأوامر", en: "Start a long-running command in the foreground" },
            { ar: "اضغط Ctrl+Z فيعلق (Stopped)", en: "Press Ctrl+Z and it suspends (Stopped)" },
            { ar: "bg %1 يستأنفه خلفيةً", en: "bg %1 resumes it in the background" },
            { ar: "jobs يعرض حالة مهامك", en: "jobs shows your jobs' status" },
            { ar: "fg %1 يعيده أمامك عند الحاجة", en: "fg %1 brings it back when needed" },
          ],
        },
      },
      {
        heading: { ar: "إشارات kill: المهذبة ثم القسرية", en: "kill signals: polite first, forceful last" },
        body: {
          ar: "الأمر kill لا «يقتل» مباشرة؛ إنه يرسل إشارة (Signal) إلى العملية، والفارق بين الإشارات هو قلب هذا الدرس:\n\n- kill 2240 يرسل افتراضيًا SIGTERM (15): طلب مهذب «أنهِ عملك وأغلق ملفاتك بنفسك» — العملية تلتقطه وتنظّف قبل الخروج\n- kill -9 2240 يرسل SIGKILL: قرار قسري من النواة نفسها؛ لا تُلتقط ولا تُتجاهل ولا تحصل العملية على فرصة حفظ شيء — الملاذ الأخير فقط\n- Ctrl+C في الطرفية يرسل SIGINT (2): مقاطعة تفاعلية منك مباشرة\n- SIGHUP (1) تاريخيًا «سقوط الخطّ»؛ وتستخدمه الخدمات اليوم لإعادة قراءة إعداداتها\n\nمصطلحان ستقابلهما في المراقبة: اليتيمة orphan عملية مات أبوها فتبنّاها init؛ والزومبي zombie انتهت لكن لم يُنظّف سجلها بعد — قتلها بـ kill -9 لا ينفع لأنها ميتة أصلًا؛ من ينظفها هو والدها.\n\nقاعدة الالتزام العملي: جرّب TERM أولًا وامهل العملية ثوانٍ، ثم فقط انتقل إلى KILL.",
          en: "The kill command does not \"kill\" directly; it delivers a signal to the process, and the difference between signals is the heart of this lesson:\n\n- kill 2240 sends the default SIGTERM (15): a polite request — \"finish your work and close your files yourself\" — the process catches it and cleans up before exiting\n- kill -9 2240 sends SIGKILL: a forced verdict from the kernel itself; it cannot be caught, ignored, or given a chance to save anything — the absolute last resort\n- Ctrl+C in the terminal sends SIGINT (2): an interactive interruption straight from you\n- SIGHUP (1) historically meant \"line hangup\"; services today use it to re-read their configuration\n\nTwo terms you will meet while monitoring: an orphan is a process whose parent died, adopted by init; a zombie already finished but its entry is not reaped yet — kill -9 cannot help because it is already dead; its parent is the one who must clean it.\n\nThe practical discipline: try TERM first and give the process a few seconds, and only then escalate to KILL.",
        },
        table: {
          caption: { ar: "أشهر الإشارات وسلوكها", en: "The most common signals and their behavior" },
          headers: [
            { ar: "الإشارة", en: "Signal" },
            { ar: "رقمها", en: "Number" },
            { ar: "سلوكها", en: "Behavior" },
          ],
          rows: [
            [
              { ar: "SIGTERM", en: "SIGTERM" },
              { ar: "15", en: "15" },
              { ar: "طلب إنهاء مهذب قابل للالتقاط والتنظيف", en: "Polite termination request, catchable, allows cleanup" },
            ],
            [
              { ar: "SIGKILL", en: "SIGKILL" },
              { ar: "9", en: "9" },
              { ar: "قتل قسري من النواة لا يُلتقط ولا يُتجاهل", en: "Forced kernel kill; cannot be caught or ignored" },
            ],
            [
              { ar: "SIGINT", en: "SIGINT" },
              { ar: "2", en: "2" },
              { ar: "مقاطعة تفاعلية عبر Ctrl+C", en: "Interactive interruption via Ctrl+C" },
            ],
            [
              { ar: "SIGHUP", en: "SIGHUP" },
              { ar: "1", en: "1" },
              { ar: "علّق الاتصال؛ تُستخدم لإعادة قراءة الإعدادات", en: "Hangup; reused for config reloads" },
            ],
          ],
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ kill 2240\n[A20161234@student1 ~]$ jobs\n[1]-  Terminated              sleep 300\n[A20161234@student1 ~]$ kill -9 2255",
        },
        tip: {
          ar: "kill -9 يعطي العملية صفر فرص لحفظ بياناتها؛ اجعله خيارك الأخير بعد SIGTERM وقليل من الصبر.",
          en: "kill -9 gives the process zero chances to save its data; make it your last option after SIGTERM and a little patience.",
        },
      },
    ],
    keyPoints: [
      { ar: "العملية = البرنامج وهو يجري، ولكل منها PID ومالك", en: "A process = the program while running; each has a PID and an owner" },
      { ar: "ps aux يعرض كل عمليات النظام مع %CPU و%MEM والحالة", en: "ps aux shows every system process with %CPU, %MEM and state" },
      { ar: "load average فوق عدد الأنوية باستمرار = ازدحام يحتاج تدخلًا", en: "Load average persistently above the core count = congestion needing attention" },
      { ar: "Ctrl+Z يعلّق وbg يستأنف خلفيةً وjobs يراقب وfg يعيد للأمام", en: "Ctrl+Z suspends, bg resumes in background, jobs monitors, fg restores" },
      { ar: "kill الافتراضي SIGTERM مهذب؛ و-9 SIGKILL قسري بلا تنظيف", en: "Default kill is polite SIGTERM; -9 is forced SIGKILL with no cleanup" },
      { ar: "الزومبي انتهى ولم يُنظّف؛ kill -9 لا ينفع معه لأنه ميت أصلًا", en: "A zombie finished but was not reaped; kill -9 cannot help — it is already dead" },
    ],
    commands: [
      { cmd: "ps aux", desc: { ar: "عرض كل العمليات مع مستخدميها ومواردها", en: "List all processes with their owners and resources" } },
      { cmd: "top", desc: { ar: "لوحة مراقبة حية للمعالج والذاكرة والعمليات", en: "Live dashboard for CPU, memory and processes" } },
      { cmd: "jobs", desc: { ar: "سرد مهام الطرفية الحالية وحالاتها", en: "List the current terminal jobs and their states" } },
      { cmd: "kill -9 2255", desc: { ar: "إنهاء قسري فوري للعملية رقم 2255 (الملاذ الأخير)", en: "Force-terminate process 2255 immediately (last resort)" } },
    ],
    quiz: [
      {
        q: { ar: "ما الإشارة التي يرسلها الأمر kill PID افتراضيًا؟", en: "Which signal does kill PID send by default?" },
        options: [
          { ar: "SIGTERM رقم 15", en: "SIGTERM, number 15" },
          { ar: "SIGKILL رقم 9", en: "SIGKILL, number 9" },
          { ar: "SIGINT رقم 2", en: "SIGINT, number 2" },
          { ar: "SIGHUP رقم 1", en: "SIGHUP, number 1" },
        ],
        correct: 0,
        explain: { ar: "الافتراضي هو الطلب المهذب SIGTERM الذي يمنح العملية فرصة التنظيف قبل الخروج.", en: "The default is the polite SIGTERM, giving the process a chance to clean up before exiting." },
      },
      {
        q: { ar: "لماذا يُعد kill -9 الملاذ الأخير؟", en: "Why is kill -9 considered the last resort?" },
        options: [
          { ar: "لأن العملية لا تحصل على فرصة لحفظ بياناتها أو تنظيف ملفاتها", en: "Because the process gets no chance to save data or clean up its files" },
          { ar: "لأنه بطيء جدًا مقارنة بغيره", en: "Because it is very slow compared to others" },
          { ar: "لأنه يعيد تشغيل الخادم كله", en: "Because it reboots the whole server" },
          { ar: "لأنه يرسل الإشارة إلى كل المستخدمين", en: "Because it sends the signal to every user" },
        ],
        correct: 0,
        explain: { ar: "SIGKILL قسري من النواة؛ لا تُلتقط الإشارة، فتموت العملية فورًا بأي حال كانت عليه.", en: "SIGKILL is a kernel-level force; the signal cannot be caught, so the process dies instantly, whatever its state." },
      },
      {
        q: { ar: "ماذا يفعل Ctrl+Z داخل الطرفية؟", en: "What does Ctrl+Z do inside the terminal?" },
        options: [
          { ar: "يعلّق العملية الأمامية دون إنهائها", en: "Suspends the foreground process without ending it" },
          { ar: "يرسلها للخلفية وهي تعمل", en: "Sends it to the background still running" },
          { ar: "ينهيها نهائيًا", en: "Terminates it permanently" },
          { ar: "يرفع أولويتها على المعالج", en: "Raises its CPU priority" },
        ],
        correct: 0,
        explain: { ar: "Ctrl+Z يعلّق (Stopped)؛ ثم bg تستأنفها خلفيةً أو fg أمامك — و& وحدها تبدأ خلفيةً من البداية.", en: "Ctrl+Z suspends (Stopped); then bg resumes it behind the scenes or fg in front — while & alone starts it in the background from the start." },
      },
      {
        q: { ar: "خادم بأربعة أنوية معالج و load average 5.00 مستمرة — ما القراءة الصحيحة؟", en: "A four-core server with a persistent load average of 5.00 — what is the correct reading?" },
        options: [
          { ar: "حمل أعلى من طاقة الخادم؛ ازدحام يستحق التدخل", en: "Load above the server's capacity; congestion worth attention" },
          { ar: "وضع مثالي تمامًا", en: "A perfectly ideal state" },
          { ar: "الخادم معطّل تمامًا", en: "The server is completely down" },
          { ar: "الأمر يعني خمس مستخدمين متصلين", en: "It means five users are connected" },
        ],
        correct: 0,
        explain: { ar: "قاعدتك: قارن الحمل بعدد الأنوية؛ 5 على 4 أنوية = طابور انتظار دائم.", en: "Your rule: compare load to the core count; 5 on 4 cores = a standing wait queue." },
      },
    ],
  },
  {
    id: "l128",
    moduleId: "m13",
    order: 8,
    level: "beginner",
    title: { ar: "إدارة الحزم: yum و dnf و apt", en: "Package Management: yum, dnf & apt" },
    summary: {
      ar: "لماذا يستخدم لينكس المستودعات بدل تنزيل ملفات exe؟ وأوامر yum الفعلية على Amazon Linux 2 — مختبرك — من التثبيت والبحث حتى التراجع بـ yum history.",
      en: "Why Linux uses repositories instead of .exe downloads? The actual yum commands on Amazon Linux 2 — your lab OS — from installing and searching to rolling back with yum history.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "لماذا مدير حزم أصلًا؟", en: "Why a package manager at all?" },
        body: {
          ar: "في ويندوز اعتدت البحث عن برنامج، تنزيل ملف exe من موقع ما، وتثبيته يدويًا. في عالم لينكس الطريقة مختلفة جذريًا:\n\n- المستودع (Repository): مستودعات ضخمة تستضيفها التوزيعة أو الشركة، تحتوي آلاف الحزم المفهرسة والجاهزة\n- التبعيات (Dependencies): كل برنامج يحتاج مكتبات؛ مدير الحزم يحلّها ويجلبها معه تلقائيًا\n- التواقيع الرقمية: كل حزمة موقّعة، فلا يمكن لأحد حقن برنامج خبيث بينك وبين المستودع\n- التحديث الموحد: أمر واحد يحدّث مئات البرامج دفعة واحدة من مصدر موثوق\n\nعالمان كبيران: عائلة rpm (Red Hat وCentOS وAmazon Linux وFedora) وعائلة deb (Debian وUbuntu) — الأدوات تختلف والفكرة واحدة.",
          en: "On Windows you are used to hunting a program, downloading an .exe from some site, and installing it manually. In the Linux world the approach is fundamentally different:\n\n- The repository: huge indexes hosted by the distribution or vendor, holding thousands of ready packages\n- Dependencies: every program needs libraries; the package manager resolves and fetches them automatically\n- Digital signatures: every package is signed, so nobody can inject a malicious program between you and the repo\n- Unified updates: one command updates hundreds of programs at once from a trusted source\n\nTwo big families: the rpm world (Red Hat, CentOS, Amazon Linux, Fedora) and the deb world (Debian, Ubuntu) — different tools, one idea.",
        },
      },
      {
        heading: { ar: "yum على Amazon Linux 2 — مختبرك الفعلي", en: "yum on Amazon Linux 2 — your actual lab" },
        body: {
          ar: "خوادم مختبراتك تعمل بنظام Amazon Linux 2، ومدير حزمها هو yum (Yellowdog Updater Modified) — وبه تثبّت مختبرات IT6004 حزمها فعليًا:\n\n- sudo yum install -y tree: ثبّت حزمة tree دون سؤال تأكيد (-y)\n- لاحظ مخرجاته الواقعية: حل التبعيات، ثم قائمة التثبيت، ثم Complete!\n- الأوامر التالية تحتاج sudo لأنها تعدّل النظام كله\n\nبعد التثبيت يصبح الأمر tree أداة نظام حقيقية تعرض شجرة المجلدات.",
          en: "Your lab servers run Amazon Linux 2 whose package manager is yum (Yellowdog Updater Modified) — and it is literally how the IT6004 labs install their packages:\n\n- sudo yum install -y tree: install the tree package without a confirmation question (-y)\n- Notice the realistic output: dependency resolution, then the install list, then Complete!\n- The following commands need sudo because they modify the whole system\n\nAfter installation, tree becomes a real system tool that draws folder trees.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ sudo yum install -y tree\nLoaded plugins: priorities, update-motd, upgrade-helper\nResolving Dependencies\n--> Running transaction check\n... [truncated]\nInstalled:\n  tree.x86_64 0:1.7.0-15.amzn2.0.1\n\nComplete!\n[A20161234@student1 ~]$ tree -L 1 labs\nlabs\n|-- README\n`-- linux\n\n1 directory, 1 file",
        },
      },
      {
        heading: { ar: "البحث والاستعلام والتحديث", en: "Searching, querying and updating" },
        body: {
          ar: "قبل التثبيت يليق بك أن تسأل عن الحزمة:\n\n- yum search nano: ابحث بالاسم والوصف — عرف اسم البرنامج الدقيق\n- yum info nano: بطاقة الحزمة: الإصدار، الحجم، الوصف، ومن أي مستودع\n- yum update: حدّث كل الحزم المثبتة إلى أحدث نسخة (يحتاج sudo)\n- yum list installed: كل ما هو مثبت على جهازك الآن\n\nالفارق التربوي المهم: مدير الحزم يعرف عن نظامك كل شيء؛ من هنا قيمته على بقاء الأنظمة آمنة ومحدثة.",
          en: "Before installing, it is right to ask about the package:\n\n- yum search nano: search by name and description — learn the exact package name\n- yum info nano: the package card: version, size, description and source repo\n- yum update: upgrade every installed package to its newest copy (needs sudo)\n- yum list installed: everything currently installed on your machine\n\nThe educational point: the package manager knows everything about your system; hence its value in keeping systems secure and current.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ yum search nano\n================= N/S matched: nano =================\nnano.x86_64 : A small text editor with syntax coloring\n[A20161234@student1 ~]$ yum info nano\nInstalled Packages\nName        : nano\nArch        : x86_64\nVersion     : 2.9.8\nRelease     : 1.amzn2.0.1\nRepo        : installed\nSummary     : A small text editor with syntax coloring\n[A20161234@student1 ~]$ sudo yum update\nNo packages marked for update",
        },
      },
 {
        heading: { ar: "yum history: التراجع عن التثبيت!", en: "yum history: undoing an installation!" },
        body: {
          ar: "الميزة التي تبهر كل من ينتقل من ويندوز: yum يسجّل كل عملية تثبيت أو تحديث برقم (Transaction) ويمكن التراجع عنها:\n\n- yum history: سجل العمليات مرتبة بأرقامها وتواريخها وحجم التغيير\n- sudo yum history undo 3: أرجع النظام إلى ما قبل العملية رقم 3 — أزِل حزمها وارجِع القديمة\n- sudo yum history redo 3: أعد تنفيذ عملية سابقة\n\nهذه أداة إنقاذ حقيقية حين يفسد تحديثٌ خدمةً إنتاجية: بدل البحث اليدوي، تراجع خطوة واحدة إلى الوراء.",
          en: "The feature that amazes everyone coming from Windows: yum logs every install or update as a numbered transaction and can roll it back:\n\n- yum history: the transaction log with numbers, dates and change sizes\n- sudo yum history undo 3: return the system to before transaction 3 — remove its packages and restore the old ones\n- sudo yum history redo 3: re-apply a previous transaction\n\nA genuine rescue tool when an update breaks a production service: instead of manual archaeology, step one transaction back.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ yum history\nID     | Login user   | Date and time    | Action(s)  | Altered\n     3 | A20161234    | 2025-10-05 11:20 | I          |    1\n     2 | A20161234    | 2025-10-05 10:55 | I, U       |    5 EE\n     1 | System       | 2025-09-28 09:00 | I          |  312 EE\n[A20161234@student1 ~]$ sudo yum history undo 3\nUndoing transaction 3 ...\nRemoved:\n  tree.x86_64 0:1.7.0-15.amzn2.0.1\n\nComplete!",
        },
        tip: {
          ar: "yum history undo رقم العملية — احفظها؛ إنها إجابة سؤال «كيف أتراجع عن تثبيت؟» الذي لا يمل الممتحنون من طرحه.",
          en: "yum history undo <transaction id> — memorize it; it is the standard answer to \"how do I undo an install?\" that examiners never tire of asking.",
        },
      },
      {
        heading: { ar: "dnf و apt: نفس الفكرة بأسماء أخرى", en: "dnf and apt: the same idea under other names" },
        body: {
          ar: "dnf هو الخلف الحديث لـ yum (الاسم الكامل Dandified YUM): نفس الأوامر تقريبًا لكن بمحلّ تبعيات أسرع وأدق — Fedora تستخدمه، وAmazon Linux 2 حديثة يربط dnf بـ yum.\n\nأما apt فهو مدير عائلة Debian/Ubuntu الشهير:\n\n- apt install tree يقابل yum install tree\n- apt update يحدّث فهارس المستودعات (يختلف عن yum update التي تحدّث الحزم نفسها)\n- apt upgrade يقابل yum update في الترقية الفعلية\n- apt remove يزيل الحزمة\n\nسواء كنت أمام خادم Amazon Linux بمختبرك أو Ubuntu في شركة، فأنت تعرف المفاهيم ذاتها؛ تغيّر الأسماء فقط.",
          en: "dnf is yum's modern successor (Dandified YUM): nearly identical commands but a faster, sharper dependency solver — Fedora uses it, and recent Amazon Linux links dnf to yum.\n\napt, in turn, is the famous manager of the Debian/Ubuntu family:\n\n- apt install tree parallels yum install tree\n- apt update refreshes the repository indexes (unlike yum update, which upgrades the packages themselves)\n- apt upgrade parallels yum update in the actual upgrading\n- apt remove removes a package\n\nWhether you face an Amazon Linux server in your lab or Ubuntu at a company, you already know the concepts; only the names change.",
        },
        table: {
          caption: { ar: "المهمة نفسها في عالم yum/ rpm وعالم apt/ deb", en: "The same task in the yum/rpm world and the apt/deb world" },
          headers: [
            { ar: "المهمة", en: "Task" },
            { ar: "yum / dnf (Amazon Linux)", en: "yum / dnf (Amazon Linux)" },
            { ar: "apt (Debian / Ubuntu)", en: "apt (Debian / Ubuntu)" },
          ],
          rows: [
            [
              { ar: "تثبيت حزمة", en: "Install a package" },
              { ar: "yum install tree", en: "yum install tree" },
              { ar: "apt install tree", en: "apt install tree" },
            ],
            [
              { ar: "البحث", en: "Search" },
              { ar: "yum search nano", en: "yum search nano" },
              { ar: "apt search nano", en: "apt search nano" },
            ],
            [
              { ar: "بطاقة الحزمة", en: "Package card" },
              { ar: "yum info nano", en: "yum info nano" },
              { ar: "apt show nano", en: "apt show nano" },
            ],
            [
              { ar: "تحديث الفهارس", en: "Refresh indexes" },
              { ar: "yum makecache", en: "yum makecache" },
              { ar: "apt update", en: "apt update" },
            ],
            [
              { ar: "ترقية المثبّت", en: "Upgrade installed" },
              { ar: "yum update", en: "yum update" },
              { ar: "apt upgrade", en: "apt upgrade" },
            ],
            [
              { ar: "التراجع عن عملية", en: "Undo a transaction" },
              { ar: "yum history undo N", en: "yum history undo N" },
              { ar: "لا مكافئ مباشر", en: "No direct equivalent" },
            ],
          ],
        },
      },
    ],
    keyPoints: [
      { ar: "المستودعات تحل التبعيات وتوقّع الحزم وتوحّد التحديث — لا exe يدوي", en: "Repositories resolve dependencies, sign packages and unify updates — no manual .exe" },
      { ar: "Amazon Linux 2 — نظام مختبرك — يستخدم yum", en: "Amazon Linux 2 — your lab's OS — uses yum" },
      { ar: "yum install وsearch وinfo وupdate: رباعية العمل اليومي", en: "yum install, search, info and update: the daily-work quartet" },
      { ar: "yum history undo N تتراجع عن عملية تثبيت أو تحديث كاملة", en: "yum history undo N rolls back a whole install or update transaction" },
      { ar: "dnf خلف yum الحديث؛ وapt مدير عائلة Debian/Ubuntu", en: "dnf is yum's modern successor; apt manages the Debian/Ubuntu family" },
      { ar: "apt update يحدّث الفهارس فقط بينما yum update ترفع الحزم نفسها", en: "apt update refreshes indexes only, while yum upgrade upgrades the packages themselves" },
    ],
    commands: [
      { cmd: "sudo yum install -y tree", desc: { ar: "تثبيت حزمة من مستودع النظام فورًا", en: "Install a package from the system repository immediately" } },
      { cmd: "yum search nano", desc: { ar: "البحث عن حزمة بالاسم أو الوصف", en: "Search for a package by name or description" } },
      { cmd: "yum info nano", desc: { ar: "استعراض بطاقة الحزمة قبل التثبيت", en: "Inspect the package card before installing" } },
      { cmd: "sudo yum update", desc: { ar: "ترقية كل الحزم المثبتة لأحدث نسخة", en: "Upgrade every installed package to its newest version" } },
    ],
    quiz: [
      {
        q: { ar: "ما مدير الحزم الافتراضي في Amazon Linux 2 — نظام خوادم مختبرك؟", en: "What is the default package manager on Amazon Linux 2, your lab servers' OS?" },
        options: [
          { ar: "yum", en: "yum" },
          { ar: "apt", en: "apt" },
          { ar: "Microsoft Store", en: "Microsoft Store" },
          { ar: "homebrew", en: "homebrew" },
        ],
        correct: 0,
        explain: { ar: "عائلة rpm تعتمد yum وdnf؛ وAmazon Linux 2 من هذه العائلة — apt يعمل على Debian وUbuntu.", en: "The rpm family relies on yum and dnf; Amazon Linux 2 belongs to it — apt serves Debian and Ubuntu." },
      },
      {
        q: { ar: "ماذا يفعل sudo yum history undo 3؟", en: "What does sudo yum history undo 3 do?" },
        options: [
          { ar: "يلغي العملية رقم 3 ويعيد النظام إلى ما قبلها", en: "Cancels transaction 3 and returns the system to its prior state" },
          { ar: "يعرض سجل العمليات فقط", en: "Only displays the transaction log" },
          { ar: "يحدّث الحزم إلى الإصدار الثالث", en: "Updates packages to the third version" },
          { ar: "يحذف أول ثلاث حزم مثبتة", en: "Deletes the first three installed packages" },
        ],
        correct: 0,
        explain: { ar: "yum يسجل كل عملية برقم؛ undo N تعكسها بالكامل: إزالة المضاف وإرجاع المستبدل.", en: "yum logs every transaction with a number; undo N fully reverses it: removing what was added, restoring what was replaced." },
      },
      {
        q: { ar: "أكبر فارق أمني بين المستودعات وتنزيل exe من مواقع عشوائية:", en: "The biggest security difference between repositories and downloading .exe from random sites:" },
        options: [
          { ar: "الحزم موقّعة رقميًا والتبعيات محسومة من مستودع موثوق", en: "Packages are digitally signed and dependencies resolved from a trusted repo" },
          { ar: "المستودعات أسرع في التنزيل دائمًا", en: "Repositories are always faster to download" },
          { ar: "ملفات exe أصغر حجمًا", en: ".exe files are smaller" },
          { ar: "لا فرق بين الطريقتين", en: "There is no difference between the two" },
        ],
        correct: 0,
        explain: { ar: "التوقيع يمنع التلاعب في الطريق، والفهرسة تحل التبعيات — مشكلتا التنزيل اليدوي الكبرتان.", en: "Signing blocks tampering in transit and indexing resolves dependencies — the two big problems of manual downloads." },
      },
      {
        q: { ar: "على Ubuntu، أي أمر يثبّت حزمة tree؟", en: "On Ubuntu, which command installs the tree package?" },
        options: [
          { ar: "sudo apt install tree", en: "sudo apt install tree" },
          { ar: "sudo yum install tree", en: "sudo yum install tree" },
          { ar: "tree.exe /install", en: "tree.exe /install" },
          { ar: "sudo install tree", en: "sudo install tree" },
        ],
        correct: 0,
        explain: { ar: "Ubuntu من عائلة deb وتستخدم apt؛ وyum تخص عائلة rpm.", en: "Ubuntu belongs to the deb family using apt; yum serves the rpm family." },
      },
    ],
  },
  {
    id: "l129",
    moduleId: "m13",
    order: 9,
    level: "beginner",
    title: { ar: "الأنابيب والتصفية وإعادة التوجيه", en: "Pipes, Filters & Redirection" },
    summary: {
      ar: "فلسفة يونكس عمليًا: الأنبوب | يوصل مخرجات أمر بمدخلات آخر، والمصفّيات grep وwc وsort وuniq وhead تحوّل النص الخام إلى تقارير، ثم > و >> لتحويل كل ذلك إلى ملفات.",
      en: "The Unix philosophy in practice: the pipe | wires one command's output to the next's input, the filters grep, wc, sort, uniq and head turn raw text into reports, then > and >> turn it all into files.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "فلسفة يونكس: برامج صغيرة تتقن شيئًا واحدًا", en: "The Unix philosophy: small programs doing one thing well" },
        body: {
          ar: "منذ سبعينيات القرن الماضي والسؤال الملحّ: كيف تبني نظامًا مرنًا من أدوات بسيطة؟ جواب يونكس: أدوات صغيرة جدًا، كل أداة تتقن مهمة واحدة، وتوصيلها ببعضها يصنع أي شيء.\n\n- grep يبحث، sort يرتّب، wc يعدّ، head يقصّ — لا أداة تحاول فعل كل شيء\n- الوصل بينها ليس ميزة مضافة؛ إنه الفكرة نفسها\n- النص الخام (Plain Text) هو العملة المشتركة: كل شيء يقرأ ويكتب النص، فتترابط الأدوات\n\nدرس اليوم هو تطبيق هذه الفلسفة حرفيًا: أنابيب ومصفّيات وإعادة توجيه.",
          en: "Since the 1970s the pressing question has been: how do you build a flexible system from simple tools? Unix's answer: very small tools, each mastering one job, and wiring them together to build anything.\n\n- grep searches, sort orders, wc counts, head trims — no tool tries to do everything\n- The wiring is not an added feature; it is the core idea\n- Plain text is the shared currency: everything reads and writes text, so the tools interlock\n\nToday's lesson is this philosophy applied literally: pipes, filters and redirection.",
        },
      },
      {
        heading: { ar: "الأنبوب |: من مخرجات أمر إلى مدخلات آخر", en: "The pipe |: one command's output into the next's input" },
        body: {
          ar: "الرمز | (الأنبوب) يخبر الصدفة: خذ مخرجات الأمر على يساري — التي كانت ستُطبع على الشاشة — وأرسلها إلى مدخلات الأمر على يميني.\n\n- الأمران يعملان معًا في اللحظة نفسها؛ البيانات تجري بينهما مباشرة\n- stdout (المخرجات القياسية) للأول تصبح stdin (المدخلات القياسية) للثاني\n- يمكنك التوصيل بالطول الذي تشاء: ثلاثة وأربعة أوامر في سلسلة\n\nالمثال المرجعي الذي ستبني عليه: ps aux | grep sshd | wc -l — احصر عمليات sshd ثم عُدّها؛ والنتيجة رقم واحد بدل شاشات من الأسطر.",
          en: "The | symbol (the pipe) tells the shell: take the left command's output — which was headed for the screen — and feed it to the right command's input.\n\n- Both commands run together at the same instant; data flows between them directly\n- The left's stdout (standard output) becomes the right's stdin (standard input)\n\n- You can chain as long as you like: three or four commands in a row\n\nThe reference example you will build on: ps aux | grep sshd | wc -l — narrow down to sshd's processes, then count them; the result is a single number instead of screens of lines.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ ps aux | grep sshd\nroot       812  0.0  0.2  90876  2216 ?    Ss  09:00 0:00 /usr/sbin/sshd -D\n[A20161234@student1 ~]$ ps aux | grep sshd | wc -l\n2",
        },
        diagram: {
          kind: "flow",
          title: { ar: "بيانات تجري في سلسلة الأنابيب", en: "Data flowing through the pipeline" },
          items: [
            { ar: "ps aux يولّد قائمة كل العمليات", en: "ps aux generates the full process list" },
            { ar: "grep sshd يرشّح السطور التي تحوي sshd", en: "grep sshd filters lines containing sshd" },
            { ar: "wc -l يعدّ الأسطر المتبقية", en: "wc -l counts the surviving lines" },
            { ar: "رقم واحد يظهر على شاشتك", en: "A single number lands on your screen" },
          ],
        },
      },
      {
        heading: { ar: "المصفّيات الذهبية الخمسة", en: "The five golden filters" },
        body: {
          ar: "خمسة أوامر صغيرة تُبنى بها معظم التقارير اليومية:\n\n- grep pattern: يطبع الأسطر التي يظهر فيها النمط (-i تجاهل حالة الأحرف، و-v عكسها: الأسطر التي لا تحويه)\n- wc -l: عدّ الأسطر (-w للكلمات و-c للبايتات)\n- sort: ترتيب أسطري أبجديًا (-r عكسيًا و-n رقميًا)\n- uniq -c: يدمج الأسطر المتطابقة المتجاورة ويطبع العدد — مهم: يعمل صحيحًا على مدخل مرتّب، لذا يسبقه sort دائمًا\n- head -n 5: أول خمسة أسطر (وtail -n 5: آخرها)\n\nبونص صغير ستحتاجه كثيرًا: cut -d: -f7 يقتطع الحقل السابع من سطر مقسوم بنقطتين.",
          en: "Five small commands build most daily reports:\n\n- grep pattern: prints lines containing the pattern (-i ignores case, -v inverts: lines without it)\n- wc -l: counts lines (-w words, -c bytes)\n- sort: sorts lines alphabetically (-r reversed, -n numerically)\n- uniq -c: collapses adjacent identical lines and prints counts — important: it works correctly on sorted input, so it is always preceded by sort\n- head -n 5: the first five lines (and tail -n 5: the last)\n\nA small bonus you will use constantly: cut -d: -f7 extracts the seventh field of a colon-separated line.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ cut -d: -f7 /etc/passwd | sort | uniq -c | sort -rn\n     33 /sbin/nologin\n      7 /bin/bash\n      1 /sbin/halt\n      1 /sbin/shutdown\n[A20161234@student1 ~]$ cat /etc/passwd | wc -l\n42\n[A20161234@student1 ~]$ cat /etc/passwd | sort | head -n 2\nabrt:x:173:173::/etc/abrt:/sbin/nologin\nadm:x:3:4:adm:/var/adm:/sbin/nologin",
        },
        tip: {
          ar: "شرط كلاسيكي في الامتحانات: لماذا أعادت ps aux | grep sshd | wc -l النتيجة 2 بينما عملية sshd واحدة؟ لأن سطر grep نفسه يحتوي كلمة sshd فيطابق نفسه!",
          en: "A classic exam trap: why did ps aux | grep sshd | wc -l return 2 when there is one sshd process? Because grep's own command line contains sshd, so it matches itself!",
        },
      },
      {
        heading: { ar: "إعادة التوجيه: إلى الملفات بدل الشاشة", en: "Redirection: into files instead of the screen" },
        body: {
          ar: "الأنبوب يمرر البيانات بين الأوامر؛ وإعادة التوجيه ترسلها إلى ملف:\n\n- > filename يكتب المخرجات في الملف — ويستبدل محتواه السابق بالكامل فورًا!\n- >> filename يُلحق بالملف دون مسح شيء — للأرشيف والسجلات\n- 2> filename يلتقط رسائل الأخطاء وحدها (الخطأ القياسي stderr)\n- /dev/null جهاز «الثقب الأسود» الذي يبتلع كل ما يُرسل إليه\n\nقبل استخدام > افتح الملف وتأكد أنك لا تحتاج محتواه؛ فالكتابة فوقه فورية بلا رحمة ولا نسخة قديمة.",
          en: "The pipe passes data between commands; redirection sends it into a file:\n\n- > filename writes the output into the file — replacing its previous content entirely, instantly!\n- >> filename appends to the file without erasing anything — for archives and logs\n- 2> filename captures the error messages alone (standard error, stderr)\n- /dev/null is the \"black hole\" device that swallows whatever you send it\n\nBefore using > open the file and make sure you do not need its content; the overwrite is instant, merciless, with no old copy kept.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ ps aux > processes.txt\n[A20161234@student1 ~]$ wc -l < processes.txt\n96\n[A20161234@student1 ~]$ echo \"session started\" >> worklog.txt\n[A20161234@student1 ~]$ ls /nofolder 2> errors.txt\n[A20161234@student1 ~]$ cat errors.txt\nls: cannot access '/nofolder': No such file or directory",
        },
      },
      {
        heading: { ar: "ركّب تقريرًا حقيقيًا من ثلاث طبقات", en: "Assemble a real report in three layers" },
        body: {
          ar: "اجمع كل ما تعلمته في تقرير واحد جاهز للتسليم — التقرير نفسه الذي يطلبه المختبر:\n\n- الطبقة 1: رأس التقرير — سطر عنوان يُكتب فوق الملف بـ >\n- الطبقة 2: الجدول — استخرج الصدفات من /etc/passwd، رتّبها، وادمج المكرر بعدّاد بـ uniq -c، ثم ألحقها بـ >>\n- الطبقة 3: العرض النهائي — cat يظهر التقرير جاهزًا\n\nلاحظ أن الملف تُبُني على مرحلتين: > أنشأت البداية و>> أضافت البقية — هذا هو نمط بناء أي تقرير في الطرفية.",
          en: "Combine everything you learned into one submission-ready report — the very report the lab asks for:\n\n- Layer 1: the header — a title line written over the file with >\n- Layer 2: the table — extract the shells from /etc/passwd, sort them, collapse duplicates with counts via uniq -c, then append with >>\n- Layer 3: the final view — cat shows the finished report\n\nNotice the file was built in two stages: > created the start and >> added the rest — the pattern for building any report in the terminal.",
        },
        code: {
          lang: "bash",
          snippet:
            "[A20161234@student1 ~]$ echo \"=== Shell usage report ===\" > report.txt\n[A20161234@student1 ~]$ cut -d: -f7 /etc/passwd | sort | uniq -c | sort -rn >> report.txt\n[A20161234@student1 ~]$ cat report.txt\n=== Shell usage report ===\n     33 /sbin/nologin\n      7 /bin/bash\n      1 /sbin/halt\n      1 /sbin/shutdown",
        },
      },
    ],
    keyPoints: [
      { ar: "الأنبوب | يربط stdout أمر بـ stdin آخر؛ والسلاسل تطول كما تشاء", en: "The pipe | wires one command's stdout to the next's stdin; chains grow as long as you like" },
      { ar: "المصفّيات: grep يبحث وwc -l يعدّ وsort يرتّب وuniq -c يدمج المكرر وhead يقصّ", en: "Filters: grep searches, wc -l counts, sort orders, uniq -c collapses duplicates, head trims" },
      { ar: "uniq يحتاج مدخلًا مرتّبًا؛ لذا يسبقه sort في السلسلة دائمًا", en: "uniq needs sorted input; that is why sort always precedes it in the chain" },
      { ar: "> تكتب فوق الملف بالكامل و>> تُلحق به دون مسح", en: "> overwrites the whole file; >> appends without erasing" },
      { ar: "2> تلتقط رسائل الأخطاء وحدها؛ و/dev/null يبتلع كل شيء", en: "2> captures errors alone; /dev/null swallows everything" },
      { ar: "سطر grep نفسه قد يطابق نفسه فيزيد العدد — فخ الامتحانات المشهور", en: "grep's own line can match itself and inflate the count — the famous exam trap" },
    ],
    commands: [
      { cmd: "ps aux | grep sshd | wc -l", desc: { ar: "عدّ عمليات sshd عبر سلسلة أنابيب", en: "Count sshd processes through a pipe chain" } },
      { cmd: "cut -d: -f7 /etc/passwd | sort | uniq -c", desc: { ar: "جدول تكراري للصدفات بعد الترتيب والدمج", en: "A frequency table of shells after sorting and collapsing" } },
      { cmd: "cat file | grep -i error", desc: { ar: "البحث عن أسطر الأخطاء دون حساسية لحالة الأحرف", en: "Hunt error lines case-insensitively" } },
      { cmd: "ps aux > snapshot.txt", desc: { ar: "حفظ لقطة العمليات في ملف (استبدال كامل)", en: "Save a process snapshot into a file (full overwrite)" } },
    ],
    quiz: [
      {
        q: { ar: "ماذا يفعل الأنبوب | بين أمرين؟", en: "What does the pipe | do between two commands?" },
        options: [
          { ar: "يربط مخرجات الأول بمدخلات الثاني", en: "Connects the first's output to the second's input" },
          { ar: "يشغّل الأمرين بالتناوب", en: "Runs the two commands alternately" },
          { ar: "يجمع مخرجاتهما في ملف واحد", en: "Merges their outputs into one file" },
          { ar: "يربط مدخلات الأول بمخرجات الثاني", en: "Connects the first's input to the second's output" },
        ],
        correct: 0,
        explain: { ar: "stdout الأول يصبح stdin الثاني — جوهر فلسفة يونكس كلها.", en: "The first's stdout becomes the second's stdin — the very heart of the Unix philosophy." },
      },
      {
        q: { ar: "ps aux | grep sshd | wc -l أعادت 2 وعلى الخادم عملية sshd واحدة — لماذا؟", en: "ps aux | grep sshd | wc -l returned 2 with only one sshd process — why?" },
        options: [
          { ar: "لأن سطر grep نفسه يضم كلمة sshd فيطابق نفسه", en: "Because grep's own line contains sshd, matching itself" },
          { ar: "لأن wc -l يضيف واحدًا دائمًا", en: "Because wc -l always adds one" },
          { ar: "لأن ps يكرر العمليات أحيانًا", en: "Because ps sometimes duplicates processes" },
          { ar: "لأن الأنبوب يضاعف الأسطر", en: "Because the pipe doubles the lines" },
        ],
        correct: 0,
        explain: { ar: "عملية grep تجري ضمن ps aux وسطرها يحوي sshd؛ لهذا يتضاعف العدّ — الفخ الشهير.", en: "The grep process appears inside ps aux and its own line contains sshd; hence the doubled count — the famous trap." },
      },
      {
        q: { ar: "ما الفرق بين > و >>؟", en: "What is the difference between > and >>?" },
        options: [
          { ar: "> تستبدل محتوى الملف و>> تُلحق به", en: "> replaces the file's content; >> appends to it" },
          { ar: "لا فرق بينهما إطلاقًا", en: "There is no difference at all" },
          { ar: "> للأخطاء و>> للمخرجات", en: "> is for errors and >> for output" },
          { ar: ">> أسرع في الكتابة", en: ">> is faster at writing" },
        ],
        correct: 0,
        explain: { ar: "الاستبدال مقابل الإلحاق — قاعدة السجلات: >> دائمًا كي لا تخسر التاريخ.", en: "Overwrite versus append — the logging rule: always >> so history is never lost." },
      },
      {
        q: { ar: "متى يعمل uniq -c بشكل صحيح؟", en: "When does uniq -c work correctly?" },
        options: [
          { ar: "عندما يكون المدخل مرتّبًا مسبقًا", en: "When the input is pre-sorted" },
          { ar: "عندما يكون المدخل أرقامًا فقط", en: "When the input is numbers only" },
          { ar: "عندما يُستخدم مع grep فقط", en: "When used with grep only" },
          { ar: "دائمًا بلا أي شرط", en: "Always, with no condition" },
        ],
        correct: 0,
        explain: { ar: "uniq يدمج المتطابقات المتجاورة فقط؛ فبلا sort ستفوتك التكرارات المتفرقة.", en: "uniq collapses only adjacent matches; without sort, scattered duplicates slip through." },
      },
    ],
  },
  {
    id: "l130",
    moduleId: "m13",
    order: 10,
    level: "beginner",
    title: { ar: "أول برنامج نصي Bash", en: "Your First Bash Script" },
    summary: {
      ar: "المخرج التعليمي الرابع لـ IT6004: لماذا نؤتمت؟ السطر الأول #!/bin/bash، chmod +x، المتغيرات والوسائط والشروط والحلقات، ثم سكربت نسخ احتياطي كامل يُشرح سطرًا سطرًا.",
      en: "IT6004 learning outcome 4: why automate? The #!/bin/bash first line, chmod +x, variables, arguments, conditions and loops, then a complete backup script explained line by line.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "لماذا نبرمج الصدفة؟", en: "Why script the shell?" },
        body: {
          ar: "أسبوعك الأول في الإدارة سيكشف النمط نفسه: مهام متكررة تُنفّذ كل يوم بالترتيب نفسه — إنشاء حساب، تفتيش السجلات، نسخ احتياطي، فحص المساحة.\n\nالمدير المحترف لا يكرر؛ إنه يكتب:\n\n- السكربت Script: ملف نصي يضم الأوامر بالترتيب، تُنفّذه الصدفة كأنك كتبته يدويًا\n- التنفيذ بضغطة واحدة بدل عشر خطوات\n- التوثيق الذاتي: السكربت نفسه وثيقة تشرح ماذا يربط النظام\n- القابلية للجدولة: يمكن للنظام تشغيله وحده فجرًا (cron — فصل قادم)\n\nلهذا جعلت IT6004 البرمجة النصية مخرجها التعليمي الرابع، وهذا الدرس خاتمة الوحدة وخلاصتها.",
          en: "Your first admin week will expose the same pattern: repetitive tasks executed daily in the same order — create an account, inspect logs, run a backup, check disk space.\n\nThe professional administrator does not repeat; they write:\n\n- A script: a text file holding the commands in order, which the shell executes as if you typed them by hand\n- One-click execution instead of ten manual steps\n- Self-documentation: the script itself documents what binds the system\n- Schedulability: the machine can run it alone at dawn (cron — a coming module)\n\nThat is why IT6004 made scripting its fourth learning outcome — and this lesson is the module's finale and summary.",
        },
      },
      {
        heading: { ar: "السطر الأول shebang ثم chmod +x", en: "The shebang first line, then chmod +x" },
        body: {
          ar: "كل سكربت bash يبدأ بسطر مقدس: #!/bin/bash\n\n- يسمى shebang: العلامة # ثم ! ثم مسار المفسّر\n- يخبر النواة: عند تنفيذ هذا الملف، شغّله عبر /bin/bash\n- بدونه قد تحاول النواة تنفيذه بقواعد مختلفة — فلا تبدأ سكربتًا بدونه أبدًا\n\nبعده يصبح الملف مجرد نص أوامر؛ لكن النظام لن يشغّل ملفًا لا يملك صلاحية التنفيذ x:\n\n- chmod +x hello.sh تمنح المالك حق التنفيذ (الدرس الخامس يعود إليك!)\n- ثم التشغيل بالمسار: ./hello.sh — النقطة تعني «من المجلد الحالي»\n- البديل المؤقت: bash hello.sh يشغّل الملف حتى بلا صلاحية x",
          en: "Every bash script begins with a sacred first line: #!/bin/bash\n\n- It is called the shebang: the # mark, then !, then the interpreter path\n- It tells the kernel: when this file is executed, run it through /bin/bash\n- Without it the kernel may guess a different rule — so never start a script without it\n\nAfter it the file is just a sequence of commands; but the system will not run a file lacking the execute x permission:\n\n- chmod +x hello.sh grants the owner the execute right (lesson five returns to you!)\n- Then run it by path: ./hello.sh — the dot means \"from the current folder\"\n- The temporary alternative: bash hello.sh runs the file even without the x bit",
        },
        code: {
          lang: "bash",
          snippet:
            "#!/bin/bash\n# my very first script\necho \"Hello from my first script!\"\necho \"Today is: $(date)\"\n\n# make it executable and run it\n[A20161234@student1 ~]$ chmod +x hello.sh\n[A20161234@student1 ~]$ ./hello.sh\nHello from my first script!\nToday is: Sun Oct  5 11:40:12 UTC 2025",
        },
      },
      {
        heading: { ar: "المتغيرات والمدخلات والوسائط", en: "Variables, input and arguments" },
        body: {
          ar: "المتغيرات تمنح سكربتك ذاكرة ومرونة:\n\n- التعريف: NAME=\"value\" — احترس: لا مسافات حول علامة = إطلاقًا! فالمسافة تجعل الصدفة تظن NAME أمرًا\n- الاستخدام: $NAME أو ${NAME} بين علامات التنصيص\n- read -p \"سؤال: \" NAME يقرأ إجابة المستخدم أثناء التشغيل\n- الوسائط عند الاستدعاء: $1 أول وسيط و$2 ثانيه؛ و$# عددها و$@ كلها معًا\n\n$(date) الذي رأيته قبل قليل «تعويض أمر»: تنفّذ الصدفة ما بين القوسين وتضع ناتجه مكان التعبير — أداة تركيب النصوص الأقوى.",
          en: "Variables give your script memory and flexibility:\n\n- Definition: NAME=\"value\" — beware: absolutely no spaces around the = sign! A space makes the shell think NAME is a command\n- Usage: $NAME or ${NAME} inside double quotes\n- read -p \"Question: \" NAME reads the user's answer while running\n- Arguments at call time: $1 is the first, $2 the second; $# is their count, $@ all of them\n\nThe $(date) you just saw is \"command substitution\": the shell runs what is inside the parentheses and puts its output where the expression stood — the most powerful text-composition tool.",
        },
        code: {
          lang: "bash",
          snippet:
            "#!/bin/bash\n# greet.sh - variables, input and arguments\nread -p \"What is your name? \" NAME\nread -p \"Which lab? \" LAB\necho \"Hello $NAME, welcome to lab $LAB!\"\necho \"You passed $# argument(s): $@\"\n\n# sample run:\n[A20161234@student1 ~]$ ./greet.sh weekend\nWhat is your name? Sara\nWhich lab? IT6004\nHello Sara, welcome to lab IT6004!\nYou passed 1 argument(s): weekend",
        },
        tip: {
          ar: "أشهر خطأ مبتدئ في bash: كتابة NAME = \"sara\" بمسافات — احذفها فورًا: NAME=\"sara\".",
          en: "The most common beginner bug in bash: writing NAME = \"sara\" with spaces — delete them at once: NAME=\"sara\".",
        },
      },
      {
        heading: { ar: "الشروط والحلقات", en: "Conditions and loops" },
        body: {
          ar: "المنطق الذي يميّز السكربت عن قائمة أوامر صمّاء:\n\n- if [ شرط ]; then ... else ... fi: نفّذ شيئًا حين يتحقق الشرط وشيئًا آخر حين لا يتحقق\n- أشهر الشروط: -f \"file\" الملف موجود؟ و-d المجلد موجود؟ و\"$a\" = \"$b\" نصان متساويان؟\n- for f in قائمة; do ... done: كرّر التنفيذ على كل عنصر من القائمة\n- التعليقات: كل ما بعد # حتى نهاية السطر — توثيقك المجاني\n\nتذكيران حرفيان يجنّبانك أخطاء ساعات:\n\n- المسافات داخل [ ] إلزامية: [ -f x ] صحيحة و[-f x] خطأ — فالقوس نفسه أمر!\n- ضع أسماء الملفات في المتغيرات بين تنصيص \"$f\" كي لا تتشتت عند المسافات",
          en: "The logic that separates a script from a deaf command list:\n\n- if [ condition ]; then ... else ... fi: do one thing when the condition holds and another when it does not\n- The most common conditions: -f \"file\" does the file exist? -d a folder? \"$a\" = \"$b\" are two strings equal?\n- for f in list; do ... done: repeat the body over each list element\n- Comments: everything after # to the end of the line — your free documentation\n\nTwo literal reminders that save hours of debugging:\n\n- Spaces inside [ ] are mandatory: [ -f x ] is correct, [-f x] is an error — the bracket itself is a command!\n- Quote variables holding filenames, \"$f\", so spaces do not scatter them",
        },
        code: {
          lang: "bash",
          snippet:
            "#!/bin/bash\n# check.sh - conditions and loops\nif [ -f notes.txt ]; then\n  echo \"notes.txt exists\"\nelse\n  echo \"notes.txt is missing\"\nfi\n\nfor f in notes.txt report.txt; do\n  if [ -f \"$f\" ]; then\n    echo \"Found: $f ($(wc -l < \"$f\") lines)\"\n  else\n    echo \"Not found: $f\"\n  fi\ndone",
        },
      },
      {
        heading: { ar: "المشروع الختامي: سكربت نسخ احتياطي كامل", en: "The finale project: a complete backup script" },
        body: {
          ar: "هذا خاتمة الوحدة: سكربت حقيقي يمكن تشغيله فعلًا على خادم المختبر. اقرأ الكود أولًا ثم الشرح سطرًا سطرًا:\n\n- السطر 1 #!/bin/bash: المفسّر\n- السطر 3: تعليق توضيحي — ماذا يفعل السكربت وكيف يُستدعى\n- السطر 5 SRC=${1:-$HOME}: المصدر أول وسيط $1، وإن غاب فمجلد المنزل — القيمة الافتراضية بصيغة ${var:-default}\n- السطر 6 DATE=$(date +%F): التاريخ بصيغة 2025-10-05 عبر تعويض الأمر\n- السطر 7 DEST=...: مجلد الوجهة داخل backups/ بتاريخ اليوم — نسخة لكل يوم في مجلد مستقل\n- السطر 9 mkdir -p: أنشئ الوجهة مع كل مجلداتها الأب\n- السطر 10 cp -r: انسخ محتوى المصدر كاملًا إلى الوجهة\n- السطر 11 if [ $? -eq 0 ]: $? يضم حالة خروج آخر أمر — 0 تعني نجاحًا بلا أخطاء\n- الأسطر 12-15: سجّل النتيجة OK أو FAILED في backup.log بإلحاق >>\n- السطر 17 ls: اعرض للمستخدم ما وُضع في مجلد اليوم\n\nجرّبه: ./backup.sh labs — وستجد نسخة يومية من مجلد labs داخل ~/backups وسجلًا يوثّق كل عملية.",
          en: "The module's finale: a real script you can actually run on the lab server. Read the code first, then the line-by-line walkthrough:\n\n- Line 1 #!/bin/bash: the interpreter\n- Line 3: a clarifying comment — what the script does and how to call it\n- Line 5 SRC=${1:-$HOME}: the source is the first argument $1, defaulting to the home folder — the default value via ${var:-default}\n- Line 6 DATE=$(date +%F): the date in 2025-10-05 form via command substitution\n- Line 7 DEST=...: the destination inside backups/ named by today's date — one folder per day\n- Line 9 mkdir -p: create the destination with all its parent folders\n- Line 10 cp -r: copy the whole source content into the destination\n- Line 11 if [ $? -eq 0 ]: $? holds the last command's exit status — 0 means success without errors\n- Lines 12-15: log OK or FAILED into backup.log by appending >>\n- Line 17 ls: show the user what landed in today's folder\n\nTry it: ./backup.sh labs — and you will find a dated copy of labs inside ~/backups plus a log documenting every run.",
        },
        code: {
          lang: "bash",
          snippet:
            "#!/bin/bash\n# backup.sh - copies my work into a dated folder\n# usage: ./backup.sh <source-folder>\n\nSRC=${1:-$HOME}\nDATE=$(date +%F)\nDEST=\"$HOME/backups/$DATE\"\n\nmkdir -p \"$DEST\"\ncp -r \"$SRC\"/. \"$DEST\"/\nif [ $? -eq 0 ]; then\n  echo \"[$(date)] backup OK: $DEST\" >> \"$HOME/backup.log\"\nelse\n  echo \"[$(date)] backup FAILED\" >> \"$HOME/backup.log\"\nfi\necho \"Done. Contents:\"\nls \"$DEST\"\n\n# sample run:\n[A20161234@student1 ~]$ ./backup.sh labs\nDone. Contents:\nlinux  README\n[A20161234@student1 ~]$ cat backup.log\n[Sun Oct 5 11:55:01 UTC 2025] backup OK: /home/A20161234/backups/2025-10-05",
        },
      },
    ],
    keyPoints: [
      { ar: "السكربت أتمتة للمتكرر: توثيق وتنفيذ بضغطة وجدولة لاحقة بـ cron", en: "A script automates repetition: documentation, one-click execution, later cron scheduling" },
      { ar: "#!/bin/bash في أول سطر يخبر النواة بالمفسّر — لا استثناء", en: "#!/bin/bash on line one tells the kernel the interpreter — no exceptions" },
      { ar: "chmod +x ثم ./script.sh لتشغيل سكربتك من مجلده", en: "chmod +x then ./script.sh to run your script from its folder" },
      { ar: "المتغيرات بلا مسافات حول =؛ والوسائط $1 $2 و$# و$@", en: "Variables take no spaces around =; arguments are $1 $2, $# and $@" },
      { ar: "if [ ] وfor ... do ... done هما عقل السكربت؛ والمسافات داخل القوسين إلزامية", en: "if [ ] and for ... do ... done are the script's brain; spaces inside the brackets are mandatory" },
      { ar: "$? يضم حالة آخر أمر؛ 0 نجاح — أساس تسجيل نجاح السكربت أو فشله", en: "$? holds the last command's status; 0 is success — the basis for logging script success or failure" },
    ],
    commands: [
      { cmd: "chmod +x backup.sh", desc: { ar: "منح السكربت صلاحية التنفيذ", en: "Grant the script execute permission" } },
      { cmd: "./backup.sh labs", desc: { ar: "تشغيل السكربت من المجلد الحالي على مجلد labs", en: "Run the script from the current folder on the labs folder" } },
      { cmd: "bash hello.sh", desc: { ar: "تشغيل ملف عبر مفسّر bash مباشرة", en: "Run a file through the bash interpreter directly" } },
      { cmd: "date +%F", desc: { ar: "توليد التاريخ بصيغة ملفات قياسية 2025-10-05", en: "Generate the date in the standard file form 2025-10-05" } },
    ],
    quiz: [
      {
        q: { ar: "ما وظيفة السطر الأول #!/bin/bash في السكربت؟", en: "What does the first line, #!/bin/bash, do in a script?" },
        options: [
          { ar: "يخبر النواة بمفسّر تنفيذ الملف", en: "Tells the kernel which interpreter executes the file" },
          { ar: "تعليق عادي لا وظيفة له", en: "An ordinary comment with no function" },
          { ar: "يطبع المسار عند التشغيل", en: "Prints the path when running" },
          { ar: "يمنح الملف صلاحية التنفيذ تلقائيًا", en: "Automatically grants the file execute permission" },
        ],
        correct: 0,
        explain: { ar: "السطر shebang إرشاد للنواة: نفّذ هذا الملف عبر /bin/bash؛ وبدونه قد تختلف طريقة التنفيذ.", en: "The shebang instructs the kernel: execute this file through /bin/bash; without it the execution rule may differ." },
      },
      {
        q: { ar: "أي سطر برمجي صحيح في bash؟", en: "Which line is valid bash?" },
        options: [
          { ar: "NAME=\"sara\"", en: "NAME=\"sara\"" },
          { ar: "NAME = \"sara\"", en: "NAME = \"sara\"" },
          { ar: "NAME: \"sara\"", en: "NAME: \"sara\"" },
          { ar: "NAME = sara", en: "NAME = sara" },
        ],
        correct: 0,
        explain: { ar: "في bash لا مسافات حول علامة = في تعريف المتغير؛ المسافة تحوّل التعريف إلى أمر خاطئ.", en: "In bash there are no spaces around = when defining a variable; a space turns the definition into a broken command." },
      },
      {
        q: { ar: "داخل سكربت، ماذا يمثل $1؟", en: "Inside a script, what does $1 represent?" },
        options: [
          { ar: "أول وسيط مُمرّر عند تشغيل السكربت", en: "The first argument passed when running the script" },
          { ar: "رقم السكربت في النظام", en: "The script's number in the system" },
          { ar: "عدد الأسطر في الملف", en: "The number of lines in the file" },
          { ar: "اسم المفسّر", en: "The interpreter's name" },
        ],
        correct: 0,
        explain: { ar: "الوسائط بالترتيب: $1 ثم $2؛ و$# عددها و$@ كلها — جسر السكربت مع مستخدمه.", en: "Arguments in order: $1 then $2; $# counts them and $@ holds all — the script's bridge to its user." },
      },
      {
        q: { ar: "بعد تنفيذ أمر داخل السكربت، ماذا يعني $? بقيمة 0؟", en: "After a command runs inside a script, what does $? equal to 0 mean?" },
        options: [
          { ar: "الأمر نجح بلا أخطاء", en: "The command succeeded without errors" },
          { ar: "الأمر فشل", en: "The command failed" },
          { ar: "السكربت توقف عن العمل", en: "The script stopped running" },
          { ar: "لا معنى لهذه القيمة", en: "This value has no meaning" },
        ],
        correct: 0,
        explain: { ar: "في اصطلاح يونكس: 0 نجاح وكل رقم آخر خطأ بتفسيره — وبه بُني سطر if في سكربت النسخ الاحتياطي.", en: "Unix convention: 0 is success and any other number is a coded error — on which the backup script's if line was built." },
      },
    ],
  },
];
