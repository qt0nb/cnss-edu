import type { Lesson } from "@/lib/types";

// ─── Module 14: Programming, Databases & Web (l131–l140) ─────────────────
// BPT alignment: IT6008 Computer Programming 1 (problem-solving, source→
// executable, data structures, testing/debugging) · IT6005 Database
// Systems 1 (Oracle, ERD, normalization, SQL) · IT6012 Web Fundamentals
// (multi-page site, consistent maintainable styling) · bridge to IT7520
// Network & Security Programmability (Python sockets, APIs).

export const m14_LESSONS: Lesson[] = [
  // ───────────────────────── l131 ─────────────────────────
  {
    id: "l131",
    moduleId: "m14",
    order: 1,
    level: "beginner",
    title: {
      ar: "التفكير الحاسوبي وحل المشكلات",
      en: "Computational Thinking & Problem Solving",
    },
    summary: {
      ar: "الأساس الذي تقف عليه مادة البرمجة كلها: التجزئة والتعرف على الأنماط والتجريد وتصميم الخوارزميات، مع المخططات الانسيابية والشيفرة الزائفة والتتبع اليدوي.",
      en: "The foundation your whole programming course stands on: decomposition, pattern recognition, abstraction and algorithm design, with flowcharts, pseudocode and desk-checking.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "ما هو التفكير الحاسوبي؟", en: "What is Computational Thinking?" },
        body: {
          ar: "التفكير الحاسوبي (Computational Thinking) ليس مهارة للحاسوبات وحدها؛ هو طريقة عقل منظمة لتحويل مشكلة كبيرة غامضة إلى خطوات صغيرة واضحة يستطيع حاسوب تنفيذها. قبل أن تكتب سطر برمجة واحداً في مادة Computer Programming، ستقضي وقتاً طويلاً هنا — وهذه أفضل استثمار ممكن.\n\nيقوم التفكير الحاسوبي على أربع ركائز تعمل معاً كخط إنتاج:\n\n- التجزئة (Decomposition): كسر المشكلة الكبيرة إلى قطع صغيرة قابلة للحل كلٌّ على حدة\n- التعرف على الأنماط (Pattern Recognition): البحث عن تشابه مع مشكلات حُلَّت من قبل — 80% من مشكلاتك لها حل جاهز\n- التجريد (Abstraction): تجاهل التفاصيل غير المؤثرة والاحتفاظ بالجوهر فقط\n- تصميم الخوارزمية (Algorithm Design): كتابة الخطوات المرتبة التي تحوّل المدخلات إلى المخرجات المطلوبة",
          en: "Computational thinking is not a skill for computers alone; it is an organized way of thinking that turns a big vague problem into small clear steps a machine can execute. Before you write a single line of code in your programming course, you will spend a long time here — and it is the best investment possible.\n\nComputational thinking rests on four pillars working together like an assembly line:\n\n- Decomposition: breaking the big problem into small pieces solvable one at a time\n- Pattern recognition: hunting for similarity with problems solved before — 80% of your problems already have an answer\n- Abstraction: ignoring irrelevant details and keeping the essence only\n- Algorithm design: writing the ordered steps that transform inputs into the required outputs",
        },
        diagram: {
          kind: "flow",
          title: { ar: "خط إنتاج التفكير الحاسوبي الأربع خطوات", en: "The four-step computational thinking pipeline" },
          items: [
            { ar: "المشكلة الكبيرة الغامضة كما وردت من العميل", en: "The big vague problem as the customer stated it" },
            { ar: "التجزئة: قطع صغيرة كلٌّ لها هدف واحد", en: "Decomposition: small pieces, each with a single goal" },
            { ar: "التعرف على الأنماط: أين رأينا هذا قبل الآن؟", en: "Pattern recognition: where have we seen this before?" },
            { ar: "التجريد: ما التفاصيل التي نتجاهلها بسلام؟", en: "Abstraction: which details can we safely ignore?" },
            { ar: "الخوارزمية: خطوات مرتبة + تتبع يدوي ثم شيفرة", en: "Algorithm: ordered steps + desk-check, then code" },
          ],
        },
      },
      {
        heading: { ar: "لغة المصممين: رموز المخططات الانسيابية", en: "The Designers' Language: Flowchart Symbols" },
        body: {
          ar: "المخطط الانسيابي (Flowchart) هو رسم لخوارزميتك قبل كتابتها. قوته في أنه لغة عالمية: أي مبرمج في أي بلد يفهم مخططك دون ترجمة. لكن للرسم قواعد صارمة — رمز خاطئ يقلب المعنى رأساً على عقب.\n\nالقاعدة الذهبية: لكل نوع خطوة شكل واحد فقط. لا ترسم عملية داخل معيّن، ولا قراراً داخل مستطيل — الامتحانات تحب هذه الفخاخ.",
          en: "A flowchart is a drawing of your algorithm before you write it. Its power is being a universal language: any programmer in any country understands your diagram without translation. But the drawing has strict rules — one wrong symbol flips the meaning upside down.\n\nThe golden rule: one shape per step type. Never draw a process inside a diamond or a decision inside a rectangle — exams love these traps.",
        },
        table: {
          caption: { ar: "رموز المخطط الانسيابي القياسية ومعانيها", en: "Standard flowchart symbols and their meanings" },
          headers: [
            { ar: "الرمز", en: "Symbol" },
            { ar: "الشكل", en: "Shape" },
            { ar: "المعنى", en: "Meaning" },
            { ar: "مثال", en: "Example" },
          ],
          rows: [
            [
              { ar: "البداية/النهاية Terminator", en: "Start/End (Terminator)" },
              { ar: "بيضاوي مدور", en: "Rounded oval" },
              { ar: "نقطة انطلاق الخوارزمية أو نقطة توقفها", en: "The algorithm's entry point or its halt point" },
              { ar: "ابدأ / توقف", en: "Start / Stop" },
            ],
            [
              { ar: "العملية Process", en: "Process" },
              { ar: "مستطيل", en: "Rectangle" },
              { ar: "حساب أو تنفيذ خطوة واحدة", en: "A computation or a single performed step" },
              { ar: "المجموع = أ + ب", en: "total = a + b" },
            ],
            [
              { ar: "القرار Decision", en: "Decision" },
              { ar: "معيّن (مربع مائل)", en: "Diamond (rhombus)" },
              { ar: "سؤال نعم/لا يتفرع منه مساران", en: "A yes/no question branching into two paths" },
              { ar: "هل كلمة السر صحيحة؟", en: "Is the password correct?" },
            ],
            [
              { ar: "الإدخال/الإخراج Input/Output", en: "Input/Output" },
              { ar: "متوازي أضلاع", en: "Parallelogram" },
              { ar: "استقبال بيانات من المستخدم أو عرض نتيجة", en: "Receiving data from the user or displaying a result" },
              { ar: "أدخل كلمة السر / اطبع النتيجة", en: "Enter password / print result" },
            ],
            [
              { ar: "سهم التدفق Flow line", en: "Flow line" },
              { ar: "سهم", en: "Arrow" },
              { ar: "ترتيب التنفيذ بين الرموز — اتجاهه لا يُخالَف", en: "Execution order between symbols — its direction is law" },
              { ar: "من القرار إلى العملية التالية", en: "From the decision to the next process" },
            ],
          ],
        },
      },
      {
        heading: { ar: "المثال العملي: مدقق تسجيل الدخول", en: "Worked Example: The Login Validator" },
        body: {
          ar: "لنطبق الركائز الأربع على مشكلة حقيقية من عالم الشبكات: نظام تسجيل دخول يمنح المستخدم ثلاث محاولات فقط.\n\n- التجزئة: قراءة الاسم → قراءة كلمة السر → التحقق → القرار (قبول أو رفض) → عدّ المحاولات\n- النمط: هذا نمط «التحقق من صحة بيانات» الشهير، وستقابله في RADIUS وSSH وتسجيل الدخول للراوتر\n- التجريد: نتجاهل تشفير كلمة السر وسرعة الشبكة ونوع المتصفح — نمسك الاسم وكلمة السر والقرار فقط\n- الخوارزمية: حلقة تتكرر ثلاث مرات، وفي كل مرة قرار معيّن واحد\n\nوبعد التتبع اليدوي الناجح نكتب الشيفرة — لاحظ كيف يقابل كل رمز في مخططك سطراً أو كتلة في بايثون.",
          en: "Let us apply the four pillars to a real networking-world problem: a login system that gives the user exactly three attempts.\n\n- Decomposition: read username → read password → validate → decide (accept or reject) → count attempts\n- Pattern: this is the famous 'credential validation' pattern; you will meet it again in RADIUS, SSH and router logins\n- Abstraction: ignore password encryption, network speed and browser type — hold only the username, the password and the decision\n- Algorithm: a loop repeating three times, with a single diamond decision inside\n\nAfter a successful desk-check we write the code — notice how every symbol in your diagram maps to a line or block in Python.",
        },
        code: {
          lang: "python",
          snippet: "# login_validator.py — a tiny login checker\n# design: 3 attempts, one decision per attempt\ncorrect_user = \"admin\"\ncorrect_pass = \"P@ssw0rd!\"\n\nattempts = 0\nwhile attempts < 3:                      # loop = flowchart's arrow going back\n    username = input(\"Username: \")        # parallelogram: input\n    password = input(\"Password: \")        # parallelogram: input\n\n    if username == correct_user and password == correct_pass:\n        print(\"Access granted. Welcome,\", username)   # oval: success end\n        break\n    else:\n        attempts = attempts + 1           # rectangle: process\n        print(\"Wrong credentials. Attempts left:\", 3 - attempts)\n\nif attempts == 3:\n    print(\"Account locked. Contact the administrator.\")  # oval: failure end",
        },
        tip: {
          ar: "خدعة الامتحان المفضلة: مخطط فيه قرارات بدون مسارَي نعم/لا، أو حلقة بلا سهم عودة. ارسم دائماً مخرجَين من كل معيّن، وسهم رجوع لكل تكرار.",
          en: "A favourite exam trick: a diagram whose decisions lack yes/no paths, or a loop with no return arrow. Always draw two exits from every diamond and a return arrow for every repetition.",
        },
      },
      {
        heading: { ar: "الشيفرة الزائفة والتتبع اليدوي", en: "Pseudocode & Desk-Checking" },
        body: {
          ar: "الشيفرة الزائفة (Pseudocode) هي الخوارزمية مكتوبة بلغة بشرية مبسطة تشبه البرمجة دون قيود نحوية: لا أقواس مطلوبة، لا فواصل منقوطة، فقط منطق مرتب. تكتبها لك نفسك قبل البرمجة، وتقرؤها بعد سنة فتفهمها فوراً — هذه معيار جودتها.\n\nأما التتبع اليدوي (Desk-Check) فهو تشغيل الخوارزمية بيدك على ورقة: تختار قيم مدخلات، ثم تسجل قيمة كل متغير بعد كل خطوة. عشرة دقائق تتبع توفر ساعة تصحيح ليلية — صدق أجيال المبرمجين قبلك.\n\n- تتبع الحالة الطبيعية أولاً: مدخلات صحيحة متوقعة\n- ثم الحالات الحدية: كلمة السر صحيحة في المحاولة الثالثة بالضبط\n- ثم الحالات الشاذة: مدخلات فارغة أو اسم خاطئ",
          en: "Pseudocode is your algorithm written in simplified human language that resembles programming without grammatical constraints: no required brackets, no semicolons, just ordered logic. You write it for yourself before coding, and a year later you still understand it instantly — that is its quality bar.\n\nDesk-checking is running the algorithm by hand on paper: pick sample input values, then record every variable's value after each step. Ten minutes of tracing saves an hour of late-night debugging — generations of programmers vouch for it.\n\n- Trace the normal case first: expected, correct inputs\n- Then boundary cases: the password correct on exactly the third attempt\n- Then abnormal cases: empty inputs or a wrong username",
        },
        code: {
          lang: "text",
          snippet: "PSEUDOCODE — login validator\nSET attempts TO 0\nWHILE attempts < 3\n    READ username, password\n    IF username = correct_user AND password = correct_pass\n        DISPLAY \"Access granted\"\n        EXIT WHILE\n    ELSE\n        INCREMENT attempts\n        DISPLAY remaining attempts\n    ENDIF\nENDWHILE\nIF attempts = 3 THEN DISPLAY \"Account locked\"\n\nDESK-CHECK TRACE (attempts table on paper)\ntry | username | password      | decision | attempts after\n 1  | admin    | wrong-pass    | No       | 1\n 2  | root     | P@ssw0rd!     | No       | 2\n 3  | admin    | P@ssw0rd!     | Yes      | 2 -> granted",
        },
      },
      {
        heading: { ar: "من نص المشكلة إلى البرنامج", en: "From Problem Statement to Program" },
        body: {
          ar: "مسار مادة البرمجة كله يلخص في خط واحد تتقنه الآن: نص المشكلة ← فهم وتحديد المدخلات والمخرجات ← خوارزمية (مخطط أو شيفرة زائفة) ← تتبع يدوي ← شيفرة ← اختبار.\n\nأهم سؤالين قبل أي شيفرة، وبهما يسقط أكثر الطلاب في الواجبات:\n\n- ما مدخلاتي بالضبط؟ (أرقام؟ نصوص؟ من أين تأتي؟)\n- ما مخرجاتي بالضبط؟ (شكل الإجابة المطلوب نصاً)\n\nمن يجيب عنهما بدقة يكتب البرنامج في نصف الوقت — ومن يتعجل يكتبه مرتين.",
          en: "Your entire programming module compresses into one pipeline you now own: problem statement ← understand and pin inputs/outputs ← algorithm (diagram or pseudocode) ← desk-check ← code ← test.\n\nThe two most important questions before any code — and where most students lose assignment marks:\n\n- What exactly are my inputs? (numbers? text? from where?)\n- What exactly are my outputs? (the required answer's textual shape)\n\nWhoever answers precisely writes the program in half the time — whoever rushes writes it twice.",
        },
      },
    ],
    keyPoints: [
      { ar: "ركائز التفكير الحاسوبي: التجزئة والأنماط والتجريد وتصميم الخوارزمية", en: "Computational thinking pillars: decomposition, patterns, abstraction, algorithm design" },
      { ar: "معيّن = قرار بفرعَي نعم/لا، مستطيل = عملية، متوازي أضلاع = إدخال/إخراج", en: "Diamond = decision with yes/no branches, rectangle = process, parallelogram = input/output" },
      { ar: "الشيفرة الزائفة لغة بشرية مرتبة؛ معيارها أن تفهمها بعد سنة", en: "Pseudocode is ordered human language; its bar is understanding it a year later" },
      { ar: "التتبع اليدوي: قيم مدخلات + جدول متغيرات على الورق قبل أي تشغيل", en: "Desk-check: sample inputs + a variable table on paper before any run" },
      { ar: "حدد المدخلات والمخرجات نصاً قبل كتابة أول سطر شيفرة", en: "Pin down inputs and outputs in words before writing the first line of code" },
    ],
    commands: [
      { cmd: "python3 login_validator.py", desc: { ar: "شغّل مدقق تسجيل الدخول وجرّب المحاولات الثلاث", en: "Run the login validator and try the three attempts" } },
      { cmd: "printf 'admin\\nP@ssw0rd!\\n' | python3 login_validator.py", desc: { ar: "اختبر مسار النجاح تلقائياً دون كتابة يدوية", en: "Automatically test the success path without typing" } },
    ],
    quiz: [
      {
        q: { ar: "تقسيم مشكلة كبيرة إلى قطع صغيرة قابلة للحل يسمى:", en: "Breaking a big problem into small solvable pieces is called:" },
        options: [
          { ar: "التجزئة (Decomposition)", en: "Decomposition" },
          { ar: "التعرف على الأنماط", en: "Pattern recognition" },
          { ar: "التجريد", en: "Abstraction" },
          { ar: "الترجمة إلى لغة الآلة", en: "Translation to machine language" },
        ],
        correct: 0,
        explain: { ar: "التجزئة هي الركيزة الأولى: كسر الكبير إلى صغير حتى تصبح كل قطعة مفهومة قابلة للحل منفردة.", en: "Decomposition is the first pillar: breaking the big into the small until each piece is understandable and solvable alone." },
      },
      {
        q: { ar: "أي رمز مخطط انسيابي يمثل سؤالاً بجواب نعم/لا؟", en: "Which flowchart symbol represents a yes/no question?" },
        options: [
          { ar: "المستطيل", en: "The rectangle" },
          { ar: "المعيّن", en: "The diamond" },
          { ar: "متوازي الأضلاع", en: "The parallelogram" },
          { ar: "البيضاوي المدور", en: "The rounded oval" },
        ],
        correct: 1,
        explain: { ar: "المعيّن هو رمز القرار، ويخرج منه فرعان: مسار نعم ومسار لا. المستطيل للعمليات والمتوازي للإدخال والإخراج.", en: "The diamond is the decision symbol with two exits: a yes path and a no path. The rectangle is for processes and the parallelogram for input/output." },
      },
      {
        q: { ar: "تنفيذ الخوارزمية بيدك على ورقة مع قيم افتراضية يسمى:", en: "Executing the algorithm by hand on paper with sample values is called:" },
        options: [
          { ar: "التجميع (Compilation)", en: "Compilation" },
          { ar: "التفسير (Interpretation)", en: "Interpretation" },
          { ar: "التتبع اليدوي (Desk-check)", en: "Desk-checking" },
          { ar: "إعادة الهيكلة (Refactoring)", en: "Refactoring" },
        ],
        correct: 2,
        explain: { ar: "التتبع اليدوي هو محاكاة الخوارزمية على الورق: تسجل قيمة كل متغير بعد كل خطوة فتكشف الأخطاء المنطقية مبكراً.", en: "Desk-checking simulates the algorithm on paper: recording each variable's value after every step exposes logic errors early." },
      },
      {
        q: { ar: "في مثال مدقق تسجيل الدخول، أي جزء يمثل التجريد (Abstraction)؟", en: "In the login validator example, which part reflects abstraction?" },
        options: [
          { ar: "منح المستخدم ثلاث محاولات فقط", en: "Giving the user exactly three attempts" },
          { ar: "عدّ المحاولات في متغير", en: "Counting attempts in a variable" },
          { ar: "تجاهل التشفير وسرعة الشبكة والاحتفاظ بالاسم وكلمة السر والقرار", en: "Ignoring encryption and network speed, keeping username, password and decision" },
          { ar: "استخدام حلقة while بدلاً من for", en: "Using a while loop instead of for" },
        ],
        correct: 2,
        explain: { ar: "التجريد هو تقرير ما نتجاهله وما نبقي: هنا أسقطنا كل تفاصيل النظام الواقعي وتمسكنا بالبيانات التي تؤثر في القرار فقط.", en: "Abstraction is deciding what to drop and what to keep: here we discarded all real-world system details and held only the data that affects the decision." },
      },
    ],
  },

  // ───────────────────────── l132 ─────────────────────────
  {
    id: "l132",
    moduleId: "m14",
    order: 2,
    level: "beginner",
    title: {
      ar: "من الشيفرة المصدرية إلى التنفيذ",
      en: "From Source Code to Execution",
    },
    summary: {
      ar: "ماذا يحدث بين كتابتك للشيفرة وظهور النتيجة؟ المصرف مقابل المفسر، الطريق الوسط لبايثون، وعائلات الأخطاء الثلاث وعقلية التصحيح وخطة الاختبار.",
      en: "What happens between writing code and seeing output? Compilers vs interpreters, Python's middle path, the three error families, the debugging mindset and the test plan.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "الحاسوب لا يفهم لغتك", en: "The Computer Does Not Speak Your Language" },
        body: {
          ar: "الشيفرة المصدرية (Source Code) التي تكتبها بلغة C أو بايثون نصٌّ للبشر أولاً؛ المعالج في المقابل لا ينفذ إلا لغة الآلة (Machine Code): أرقام ثنائية صماء. بين الطرفين يقف مترجمون — وهنا يفرق المبرمجون بين مشروعين عظيمين:\n\n- المصرف (Compiler): يقرأ برنامجك كاملاً دفعة واحدة ويترجمه إلى ملف لغة آلة جاهز للتشغيل لاحقاً — مثل ترجمة كتاب كامل ثم طباعته\n- المفسر (Interpreter): يقرأ سطورك واحداً تلو الآخر وينفذ كل سطر لحظة قراءته — مثل مترجم فوري في مؤتمر\n\nكلٌّ منهما له مملكته: المصرف يمنح سرعة تنفيذ قصوى (C في أنظمة التشغيل والموجّهات)، والمفسر يمنح حرية التنقل والتجربة السريعة (بايثون في السكربتات والأتمتة).",
          en: "The source code you write in C or Python is text for humans first; the processor, by contrast, executes only machine code: raw binary numbers. Between the two stand translators — and here programmers divide between two great camps:\n\n- The compiler: reads your entire program in one pass and translates it into a machine-code file ready to run later — like translating a whole book before printing it\n- The interpreter: reads your lines one by one and executes each the moment it reads it — like a live conference interpreter\n\nEach has its kingdom: the compiler grants maximum execution speed (C in operating systems and routers), while the interpreter grants portability and rapid experimentation (Python in scripts and automation).",
        },
        table: {
          caption: { ar: "المصرف مقابل المفسر: مقارنة القرار", en: "Compiler vs interpreter: the decision table" },
          headers: [
            { ar: "المعيار", en: "Criterion" },
            { ar: "المصرف Compiler", en: "Compiler" },
            { ar: "المفسر Interpreter", en: "Interpreter" },
          ],
          rows: [
            [
              { ar: "متى تتم الترجمة", en: "When translation happens" },
              { ar: "قبل التنفيذ: البرنامج كاملاً دفعة واحدة", en: "Before running: the whole program at once" },
              { ar: "أثناء التنفيذ: سطراً بسطر", en: "While running: line by line" },
            ],
            [
              { ar: "سرعة التنفيذ", en: "Execution speed" },
              { ar: "أسرع — لغة الآلة جاهزة ومحسَّنة", en: "Faster — machine code is ready and optimized" },
              { ar: "أبطأ — الترجمة مستمرة أثناء العمل", en: "Slower — translation continues while running" },
            ],
            [
              { ar: "اكتشاف الأخطاء النحوية", en: "Syntax-error discovery" },
              { ar: "داخل الترجمة كلها قبل أي تنفيذ", en: "All at compile time, before anything runs" },
              { ar: "بالتدريج: قد يتوقف عند السطر العاشر بعد تنفيذ تسعة", en: "Gradually: may stop at line 10 after running nine" },
            ],
            [
              { ar: "النقل بين الأنظمة", en: "Portability" },
              { ar: "ملف التنفيذ مقيد بمعمارية المعالج", en: "The executable is bound to the CPU architecture" },
              { ar: "الشيفرة نفسها تعمل حيثما وُجد مفسر", en: "The same code runs wherever an interpreter exists" },
            ],
            [
              { ar: "أمثلة", en: "Examples" },
              { ar: "C وC++ وRust وGo", en: "C, C++, Rust, Go" },
              { ar: "بايثون الكلاسيكية وRuby وPHP", en: "Classic Python, Ruby, PHP" },
            ],
          ],
        },
      },
      {
        heading: { ar: "البرنامج نفسه بلغتين", en: "The Same Program in Two Languages" },
        body: {
          ar: "إليك أضعف برنامجين في العالم — نفس المهمة، لكن رحلة كلٍّ منهما إلى التنفيذ مختلفة جذرياً. اكتبهما بنفسك في المختبر، فالمسافة بين «أعرف» و«جربت» هي كل شيء في البرمجة.",
          en: "Here are the two smallest programs in the world — the same task, but each takes a radically different road to execution. Write them yourself in the lab: the gap between 'I know' and 'I tried' is everything in programming.",
        },
        code: {
          lang: "c",
          snippet: "/* hello.c — the same greeting in C (compiled) */\n#include <stdio.h>\n\nint main(void)\n{\n    printf(\"Hello, networks!\\n\");\n    return 0;\n}",
        },
        tip: {
          ar: "لاحظ التباين: عشرة أسطر في C مقابل سطر واحد في بايثون لطباعة الجملة ذاتها — هذا الثمن الذي تدفعه C مقابل سرعتها القصوى.",
          en: "Notice the contrast: ten lines in C versus one line in Python to print the same sentence — the price C charges for its raw speed.",
        },
      },
      {
        heading: { ar: "بايثون: الطريق الوسط", en: "Python: The Middle Path" },
        body: {
          ar: "الحقيقة الدقيقة التي تحبها الامتحانات: بايثون ليست مفسراً خالصاً ولا مصرفاً خالصاً. عند تشغيل ملف .py تحدث مرحلتان:\n\n- أولاً تُترجَم شيفرتك كلها إلى بايت كود (Bytecode): تمثيل وسيط مضغوط خاص ببايثون (ستجده في مجلد __pycache__ بامتداد .pyc)\n- ثم تتولى آلة بايثون الافتراضية (PVM) تنفيذ هذا البايت كود سطراً بسطر\n\nفائدة عملية: إذا استوردت وحدتك في ملف آخر، لن يعاد ترجمة بايت كودها — تسريع مجاني. والملف .pyc نفسه ليس لغة آلة؛ ما زال يحتاج PVM ليشتغل، ولذا يقال: بايثون «مفسَّرة عند التنفيذ، مُصرَّفة عند التحميل».",
          en: "The exam-favourite nuance: Python is neither a pure interpreter nor a pure compiler. Running a .py file happens in two stages:\n\n- First, your whole file is compiled to bytecode: a compact intermediate representation Python owns (you will find it in the __pycache__ folder with the .pyc extension)\n- Then the Python Virtual Machine (PVM) executes that bytecode line by line\n\nPractical payoff: if another file imports your module, its bytecode is not recompiled — free speed-up. And the .pyc file is still not machine code; it needs the PVM to run — hence the saying: Python is 'compiled at load, interpreted at run'.",
        },
        code: {
          lang: "bash",
          snippet: "# The two roads to the same output\ngcc hello.c -o hello   # C: translate ALL of hello.c to machine code NOW\n./hello                # run the finished binary directly on the CPU\npython3 hello.py       # Python: compile to bytecode, then PVM executes it\nls __pycache__/ 2>/dev/null   # imported modules leave their .pyc behind",
        },
      },
      {
        heading: { ar: "عائلة الأخطاء الثلاثة", en: "The Three Error Families" },
        body: {
          ar: "كل خطأ ستقابله في حياتك ينتمي إلى عائلة من ثلاث، وتشخيص العائلة هو نصف العلاج:\n\n- خطأ نحوي (Syntax Error): جملة مكسورة لا يفهمها المترجم — القوس الناقص، النقطتان المنسيتان. لا ينفذ شيء أبداً؛ يرفض المصرف/المفسر الشيفرة من الأساس\n- خطأ زمن التشغيل (Runtime Error): الشيفرة سليمة نحوياً وتنطلق، ثم تنهار أثناء العمل — القسمة على صفر، فتح ملف غير موجود\n- خطأ منطقي (Logic Error): الأخبث على الإطلاق — البرنامج يعمل بلا شكوى ويطبع نتيجة خاطئة. لا رسالة خطأ تدلك؛ عقلك وحده يصححه\n\nعوّد نفسك تصنيف كل خطأ تقابله فوراً قبل لمس لوحة المفاتيح.",
          en: "Every error you will ever meet belongs to one of three families, and diagnosing the family is half the cure:\n\n- Syntax error: a broken sentence the translator cannot understand — the missing bracket, the forgotten colon. Nothing ever runs; the compiler/interpreter rejects the code outright\n- Runtime error: the code is syntactically fine and starts running, then crashes mid-flight — division by zero, opening a missing file\n- Logic error: the wickedest of all — the program runs happily and prints a wrong answer. No message points at it; only your brain can fix it\n\nTrain yourself to classify every error you meet before touching the keyboard.",
        },
        code: {
          lang: "python",
          snippet: "# Family 1: syntax — the parser refuses before anything runs\n# print(\"Connecting\"        # SyntaxError: missing closing parenthesis\n\n# Family 2: runtime — parsing succeeded, execution crashed\ncount = 0\n# average = 100 / count    # ZeroDivisionError at run time\n\n# Family 3: logic — runs 'perfectly', prints the wrong answer\nscores = [80, 90, 100]\naverage = 80 + 90 + 100    # forgot to divide by 3\nprint(\"Average:\", average) # prints 270 — silently wrong!",
        },
      },
      {
        heading: { ar: "عقلية المصحح وخطة الاختبار", en: "The Debugger Mindset & the Test Plan" },
        body: {
          ar: "التصحيح (Debugging) مهارة عقلية قبل أن يكون أداة، وقاعدته الميكانيكية ثلاث خطوات تكررها حتى تضيق دائرة الشك إلى سطر واحد:\n\n- أعد إنتاج الخطأ: خطأ لا يمكن استنساخه لا يمكن إصلاحه — سجل المدخلات المسببة نفسها في كل مرة\n- قسّم المشكلة: علّق نصف الشيفرة أو أعد الإنتاج على بيانات أصغر — الخطأ في النصف الذي يظهر فيه\n- اطبع الحدود: print عند كل حلقة وقرار يكشف أين تنحرف القيم عن المتوقع\n\nثم الاختبار المنهجي بثلاث طبقات، وهو مطلوب صريح في مادة البرمجة (CILO 5: تحليل وتصحيح برامج وفق خطة اختبار):\n\n- الحالات الطبيعية (Normal): مدخلات صحيحة متوقعة\n- الحالات الحدية (Boundary): القيم عند الحواف تماماً — 0، و100، والمحاولة الثالثة بالضبط\n- الحالات الشاذة (Invalid): نص مكان رقم، ومدخلات فارغة، وضغط زر مبكر\n\nبرنامجك لا يُسلَّم قبل اجتياز الطبقات الثلاث — هذه هي المعيارية الصناعية التي تريدها الجامعة وسوق العمل.",
          en: "Debugging is a mindset before it is a tool, and its mechanical core is three steps you repeat until the circle of suspicion shrinks to a single line:\n\n- Reproduce the error: a bug you cannot reproduce, you cannot fix — record the exact inputs that trigger it, every time\n- Divide the problem: comment out half the code or shrink the input — the bug lives in the half where it still appears\n- Print the checkpoints: a print inside each loop and decision reveals where values drift from expectation\n\nThen systematic testing in three layers — an explicit course requirement (CILO 5: analyse and debug programs following a test plan):\n\n- Normal cases: correct, expected inputs\n- Boundary cases: values exactly at the edges — 0, 100, precisely the third attempt\n- Invalid cases: text where a number belongs, empty inputs, premature button presses\n\nYour program is not delivered before surviving all three layers — that is the industry standard your university and the job market both want.",
        },
        tip: {
          ar: "ادرس رسالة الخطأ كاملة قبل الهلع: آخر سطر فيها يقول نوع الخطأ ورقم السطر غالباً — Python أخبرك بالضبط أين انفجر البرنامج؛ المطلوب فقط أن تقرأ.",
          en: "Read the whole error message before panicking: its last line usually names the error type and line number — Python told you exactly where the program exploded; you only had to read.",
        },
      },
    ],
    keyPoints: [
      { ar: "المصرف يترجم البرنامج كاملاً قبل التنفيذ؛ المفسر ينفذ سطراً بسطر لحظياً", en: "A compiler translates the whole program before running; an interpreter executes line by line on the fly" },
      { ar: "بايثون طريق وسط: شيفرة ← بايت كود ← آلة افتراضية PVM تنفذه", en: "Python is a middle path: source → bytecode → the PVM executes it" },
      { ar: "الأخطاء النحوية تمنع التشغيل؛ التشغيلية تنهار أثناء العمل؛ المنطقية تطبع خطأ بصمت", en: "Syntax errors block startup; runtime errors crash mid-flight; logic errors print wrong answers silently" },
      { ar: "منهجية التصحيح: أعد الإنتاج ← قسّم ← اطبع نقاط الفحص", en: "Debugging method: reproduce → divide → print checkpoints" },
      { ar: "خطة اختبار ثلاثية: حالات طبيعية وحدية وشاذة", en: "A three-layer test plan: normal, boundary and invalid cases" },
    ],
    commands: [
      { cmd: "gcc hello.c -o hello", desc: { ar: "صرّف برنامج C كاملاً إلى ملف تنفيذي", en: "Compile a whole C program into an executable" } },
      { cmd: "./hello", desc: { ar: "شغّل الملف الثنائي الناتج مباشرة على المعالج", en: "Run the resulting binary directly on the CPU" } },
      { cmd: "python3 hello.py", desc: { ar: "شغّل بايثون: ترجمة إلى بايت كود ثم تنفيذ", en: "Run Python: compile to bytecode, then execute" } },
    ],
    quiz: [
      {
        q: { ar: "أي عبارة تصف المصرف (Compiler) بدقة؟", en: "Which statement accurately describes a compiler?" },
        options: [
          { ar: "ينفذ البرنامج سطراً واحداً في كل مرة", en: "It executes the program one line at a time" },
          { ar: "يترجم البرنامج كاملاً إلى لغة الآلة قبل التنفيذ", en: "It translates the entire program to machine code before execution" },
          { ar: "يعمل فقط داخل متصفح الويب", en: "It only works inside a web browser" },
          { ar: "يكتشف الأخطاء المنطقية ويصلحها تلقائياً", en: "It detects logic errors and fixes them automatically" },
        ],
        correct: 1,
        explain: { ar: "المصرف يقرأ برنامجك كاملاً وينتج ملف لغة آلة محسَّناً؛ سرعة التنفيذ القصوى هي ثمن الانتظار في الترجمة.", en: "A compiler reads your whole program and produces an optimized machine-code file; raw execution speed is the payoff for the wait." },
      },
      {
        q: { ar: "بايثون عند تشغيل ملف .py تنتج أولاً:", en: "When running a .py file, Python first produces:" },
        options: [
          { ar: "لغة آلة مباشرة للمعالج", en: "Machine code directly for the CPU" },
          { ar: "بايت كود وسيطاً تنفذه الآلة الافتراضية PVM", en: "Intermediate bytecode executed by the PVM" },
          { ar: "ملف HTML يعرض النتيجة", en: "An HTML file displaying the result" },
          { ar: "قائمة أخطاء منطقية", en: "A list of logic errors" },
        ],
        correct: 1,
        explain: { ar: "تُصرَّف الشيفرة إلى بايت كود (.pyc) ثم تنفذه آلة بايثون الافتراضية — لذا يوصف بأنه «مُصرَّف عند التحميل، مُفسَّر عند التنفيذ».", en: "The source compiles to bytecode (.pyc) which the Python Virtual Machine then executes — hence 'compiled at load, interpreted at run'." },
      },
      {
        q: { ar: "print(\"Hi\" بقوس ناقص — من أي عائلة هذا الخطأ؟", en: "print(\"Hi\" with a missing parenthesis — which error family?" },
        options: [
          { ar: "خطأ منطقي", en: "Logic error" },
          { ar: "خطأ زمن تشغيل", en: "Runtime error" },
          { ar: "خطأ نحوي", en: "Syntax error" },
          { ar: "ليس خطأ أصلاً", en: "Not an error at all" },
        ],
        correct: 2,
        explain: { ar: "جملة مكسورة نحوياً يرفضها المفسر قبل تنفيذ أي سطر — عائلة الأخطاء النحوية.", en: "A grammatically broken sentence the interpreter rejects before running any line — the syntax-error family." },
      },
      {
        q: { ar: "برنامج يحسب المعدل ونسي القسمة على عدد المواد، فطبع 270 بدلاً من 90. هذا:", en: "A program averaging grades forgot to divide by the count and printed 270 instead of 90. This is:" },
        options: [
          { ar: "خطأ نحوي", en: "A syntax error" },
          { ar: "خطأ زمن تشغيل", en: "A runtime error" },
          { ar: "خطأ منطقي — البرنامج يعمل ويجيب خطأ", en: "A logic error — the program runs and answers wrongly" },
          { ar: "خطأ في لغة الآلة", en: "A machine-code error" },
        ],
        correct: 2,
        explain: { ar: "لا رسالة خطأ ولا انهيار: الخوارزمية نفسها معيبة. أخطر عائلة لأنها لا تنبهك — فقط الاختبار اليدوي يكشفها.", en: "No message, no crash: the algorithm itself is flawed. The deadliest family because it never alerts you — only testing reveals it." },
      },
    ],
  },

  // ───────────────────────── l133 ─────────────────────────
  {
    id: "l133",
    moduleId: "m14",
    order: 3,
    level: "beginner",
    title: {
      ar: "أساسيات بايثون: المتغيرات والأنواع والشروط",
      en: "Python Basics: Variables, Types & Conditionals",
    },
    summary: {
      ar: "لماذا بايثون لطالب الشبكات؟ المتغيرات والأنواع الأربعة والعوامل، الإدخال والإخراج وسلاسل f، والشروط حيث المسافة البادئة بنية نحوية — بمثال الدرجات.",
      en: "Why Python for a networks student? Variables, the four core types, operators, input/output and f-strings, and conditionals where indentation is syntax — with the grading example.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "لماذا بايثون لطالب الشبكات تحديداً؟", en: "Why Python, Specifically for a Networks Student?" },
        body: {
          ar: "يمكنك اختيار أي لغة لتتعلم البرمجة، لكن بايثون تمنح طالب الشبكات ثلاث هدايا لا تجتمع في غيرها:\n\n- مقروئية شبه إنجليزية: الشيفرة تقرأ كتعليمات مباشرة، فتتعلم المنطق لا النحو — ولهذا اختارتها جامعتك لتعليم البرمجة\n- منظومة أدوات ضخمة: لكل مهمة شبكية مكتبة جاهزة — netmiko للتشغيل، scapy لصناعة الحزم، requests لواجهات REST\n- ملك الأتمتة بلا منازع: سكربتات الإعداد والمراقبة والتقارير في الشركات تكتب غالبها بايثون\n\nوفي سنة دراستك الرابعة (Network & Security Programmability) ستعود إلى اللغة نفسها لبناء أدوات sockets وAPIs — فكل ساعة تتقنها الآن هي استثمار مباشر في ذلك الفصل.",
          en: "You could learn programming in any language, but Python gives a networks student three gifts no other combines:\n\n- Near-English readability: code reads like direct instructions, so you learn logic, not grammar — which is exactly why your university picked it for teaching\n- A colossal ecosystem: every networking task has a ready library — netmiko for operations, scapy for crafting packets, requests for REST APIs\n- The undisputed king of automation: companies write most config, monitoring and reporting scripts in Python\n\nAnd in your fourth year (Network & Security Programmability) you return to this very language to build sockets and API tools — every hour you master now is a direct investment in that semester.",
        },
      },
      {
        heading: { ar: "المتغيرات والأنواع والعوامل", en: "Variables, Types & Operators" },
        body: {
          ar: "المتغير (Variable) اسم تطلقه على قيمة محفوظة في الذاكرة، والتعيين بعلامة = لا يعني مساواة رياضية بل «ضع هذا في ذاك» — أهم تصحيح ذهني في أسبوعك الأول.\n\nبايثون تعرف نوع القيمة تلقائياً من شكلها، والدالة type() تكشفه لك. الأنواع الأولية الأربعة التي ستبني عليها كل شيء:\n\n- int: الأعداد الصحيحة — عدد الواجهات، عدد المحاولات\n- float: الأعداد العشرية — النطاق الترددي، زمن الاستجابة\n- str: النصوص بين علامتي تنصيص — اسم الجهاز، عنوان IP\n- bool: منطقية بقيمتين فقط True أو False — الواجهة فعّالة أو معطلة\n\nوالعوامل المألوفة: الحساب + - * /، والقسمة الصحيحة //، وباقي القسمة %، والمقارنة == != < > <= >=، والمنطق and/or/not — ستستخدم الأخيرة كل يوم في شروط الشبكات.",
          en: "A variable is a name you pin on a value stored in memory, and assignment with = does not mean mathematical equality but 'put this in that' — the most important mental correction of your first week.\n\nPython infers a value's type from its shape, and the type() function reveals it. The four primitive types you will build everything on:\n\n- int: whole numbers — interface counts, attempt counters\n- float: decimal numbers — bandwidth, response time\n- str: text between quotes — device names, IP addresses\n- bool: logical with only True or False — the interface is up or down\n\nAnd the familiar operators: arithmetic + - * /, integer division //, remainder %, comparison == != < > <= >=, and logic and/or/not — you will use the last trio daily in network conditions.",
        },
        code: {
          lang: "python",
          snippet: "device_count = 3              # int   — a whole number\nlink_speed = 2.5              # float — a decimal number\nhostname = \"R1-EDGE\"          # str   — text between quotes\nis_up = True                  # bool  — True or False only\n\nprint(type(device_count))     # <class 'int'>\nprint(type(link_speed))       # <class 'float'>\nprint(type(hostname))         # <class 'str'>\nprint(type(is_up))            # <class 'bool'>\n\n# assignment is NOT equality maths\nattempts = 0\nattempts = attempts + 1       # now 1: read old value, add, store back\n\nprint(10 % 3)                 # 1  — remainder: 10 divided by 3 leaves 1\nprint(10 // 3)                # 3  — integer division discards decimals\nprint(2.5 * 2)                # 5.0 — floats stay floats",
        },
        table: {
          caption: { ar: "الأنواع الأولية الأربعة في بايثون", en: "The four primitive types in Python" },
          headers: [
            { ar: "النوع", en: "Type" },
            { ar: "مثال قيمة", en: "Example value" },
            { ar: "استخدام شبكي نموذجي", en: "Typical networking use" },
          ],
          rows: [
            [
              { ar: "int", en: "int" },
              { ar: "42", en: "42" },
              { ar: "عدد الواجهات، عدد محاولات تسجيل الدخول", en: "Interface count, login attempt counter" },
            ],
            [
              { ar: "float", en: "float" },
              { ar: "2.5", en: "2.5" },
              { ar: "سرعة الوصلة بالجيجابت، زمن ping بالمللي ثانية", en: "Link speed in Gbps, ping time in ms" },
            ],
            [
              { ar: "str", en: "str" },
              { ar: "\"10.0.0.1\"", en: "\"10.0.0.1\"" },
              { ar: "عناوين IP وأسماء الأجهزة وأوامر الإعداد", en: "IP addresses, hostnames, config commands" },
            ],
            [
              { ar: "bool", en: "bool" },
              { ar: "True / False", en: "True / False" },
              { ar: "حالة الواجهة، نجاح آخر اختبار اتصال", en: "Interface status, last connectivity test result" },
            ],
          ],
        },
      },
      {
        heading: { ar: "الإدخال والإخراج وسلاسل f", en: "Input, Output & f-strings" },
        body: {
          ar: "الدالة input() تستقبل نصاً من المستخدم وتوقف البرنامج حتى يكتب شيئاً، وprint() تعرض النتيجة. وميزتها الأنيقة: دمج القيم داخل النص بثلاث طرائق، وأجملها سلسلة f — ضع الحرف f قبل علامة التنصيص ثم كل اسم متغير بين قوسين معقوفين يُستبدل بقيمته.\n\n- input() تعيد دائماً str حتى لو كتب المستخدم رقماً — الفخ الأول في الواجبات!\n- لتحويل النص إلى رقم استخدم int() أو float()\n- التعليق يبدأ بعلامة # والبايثون تتجاهل ما بعدها — كتب تعليقات لإنسان المستقبل (وأنت هو)",
          en: "The input() function receives text from the user, pausing the program until they type something, and print() displays results. Its elegant finishing touch: embedding values inside text in three ways, the loveliest being the f-string — put the letter f before the quote, then every variable name inside curly braces gets replaced by its value.\n\n- input() always returns str even when the user types a number — assignment trap number one!\n- To convert text to a number use int() or float()\n- A comment starts with # and Python ignores the rest of the line — write comments for the future human (who is you)",
        },
        code: {
          lang: "python",
          snippet: "# input() ALWAYS returns a string — convert before maths\nraw = input(\"Enter interface count: \")   # user types: 4\ncount = int(raw)                        # \"4\" -> 4\nspare = count + 1                       # 5: arithmetic works now\n\nprint(\"Count:\", count)                  # classic: comma-separated\nprint(\"Count is \" + str(count))          # concatenation: must cast first\nprint(f\"Count is {count}, spare {spare}\") # f-string: cleanest — use this\n\n# quick error demo: maths on the raw string\n# raw + 1   # TypeError: can only concatenate str + str",
        },
      },
      {
        heading: { ar: "الشروط: الشيفرة تستدير", en: "Conditionals: Where Code Turns" },
        body: {
          ar: "الشروط تعطي برنامجك القدرة على اتخاذ القرار: if تختبر شرطاً، وelif تضيف اختبارات بديلة بالترتيب، وelse تمسك كل ما سقط من الشبكة. ولاحظ النقطتين : في نهاية كل سطر شرطي.\n\nوهنا الفخ الأول في بايثون والقاتل الصامت للطلاب: المسافة البادئة (Indentation) ليست تجميلاً اختيارياً — هي بنية نحوية تُعرّف جسم الشرط. بايثون لا تستخدم أقواس معقوفة {} كـC؛ بل تستخدم أربع مسافات في بداية السطر تقول «هذا السطر داخل الكتلة». سطر بمسافة خاطئة = خطأ نحوي أو — الأسوأ — منطق مختلف تماماً بصمت.",
          en: "Conditionals give your program decision power: if tests a condition, elif adds alternative tests in order, and else catches everything that fell through the net. Note the colon : ending each conditional line.\n\nAnd here is Python's number-one trap, the silent killer of students: indentation is not optional cosmetics — it is syntax that defines the condition's body. Python does not use curly braces {} like C; instead, four spaces at a line's start say 'this line lives inside the block'. A wrongly indented line is either a syntax error or — far worse — silently different logic.",
        },
        code: {
          lang: "python",
          snippet: "ping_ms = float(input(\"Ping time in ms: \"))\n\nif ping_ms <= 10:\n    print(\"LAN-grade latency\")\nelif ping_ms <= 100:\n    print(\"Acceptable WAN latency\")\nelse:\n    print(\"Investigate the path!\")\n\n# INDENTATION IS SYNTAX — same words, different programs:\nif ping_ms > 100:\n    print(\"High latency detected\")\n    print(\"Ticket created\")      # inside the if: runs only when > 100\n\nif ping_ms > 100:\n    print(\"High latency detected\")\nprint(\"Ticket created\")          # OUTSIDE the if: always runs — logic bug!",
        },
        tip: {
          ar: "اضبط محررك على 4 مسافات بدل Tab، وشغّل برامجك الصغيرة مرات عدة بمدخلات مختلفة — المسافات الخاطئة لا ترحم المبتدئ ولا المتقدم.",
          en: "Set your editor to 4 spaces instead of Tab, and run your small programs repeatedly with different inputs — wrong indentation spares neither beginner nor expert.",
        },
      },
      {
        heading: { ar: "المثال المُمتحَن: من الدرجة إلى التقدير", en: "The Exam Example: Score to Grade" },
        body: {
          ar: "البرنامج الذي ستكتبه في الأسبوع الأول تقريباً في أي جامعة: اقرأ درجة من 100 وحوّلها إلى تقدير حرفي. جرّبه بقيم الحدود تماماً: 90 و80 و70 و60 — انظر أي تقدير يظهر، وتأكد أن الحد نفسه يقع في التقدير الأعلى كما تقتضيه الشروط >=.",
          en: "The program you will write in almost any university's first week: read a score out of 100 and convert it to a letter grade. Test it with the exact boundary values — 90, 80, 70, 60 — see which grade appears, and verify each boundary falls into the higher grade as the >= conditions demand.",
        },
        code: {
          lang: "python",
          snippet: "# grade.py — convert a score to a letter grade\nscore = float(input(\"Enter your score (0-100): \"))\n\nif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"\nelif score >= 70:\n    grade = \"C\"\nelif score >= 60:\n    grade = \"D\"\nelse:\n    grade = \"F\"\n\nprint(f\"Score {score} -> grade {grade}\")   # f-string embeds both values\n\n# boundary self-test (no input needed):\n# 90 -> A   89.9 -> B   80 -> B   79.9 -> C   0 -> F",
        },
      },
    ],
    keyPoints: [
      { ar: "بايثون مقروئية + منظومة شبكية + ملك الأتمتة — ولغة سنة البرمجة الرابعة نفسها", en: "Python = readability + networking ecosystem + automation king — and the same language as your year-4 course" },
      { ar: "الأنواع الأربعة: int وfloat وstr وbool — وtype() تكشف النوع", en: "The four types: int, float, str, bool — and type() reveals it" },
      { ar: "input() تعيد str دائماً؛ حوّل بـ int() أو float() قبل أي حساب", en: "input() always returns str; convert with int() or float() before any arithmetic" },
      { ar: "المسافة البادئة (4 مسافات) بنية نحوية تحدد جسم الشرط — لا تجميل", en: "Indentation (4 spaces) is syntax defining the block body — not decoration" },
      { ar: "سلاسل f: f\"{variable}\" تدمج القيم في النص بأناقة", en: "f-strings: f\"{variable}\" embeds values in text elegantly" },
      { ar: "اختبر قيم الحدود (90 و80 و70 و60) لا القيم الوسطى فقط", en: "Test the boundary values (90, 80, 70, 60), not just mid-range ones" },
    ],
    commands: [
      { cmd: "python3 -V", desc: { ar: "تحقق من نسخة بايثون المثبتة (3.x مطلوبة)", en: "Check your installed Python version (3.x required)" } },
      { cmd: "python3 grade.py", desc: { ar: "شغّل مثال الدرجات واختبر قيم الحدود", en: "Run the grading example and test boundary values" } },
      { cmd: "python3 -c 'print(type(2.5), type(\"2.5\"))'", desc: { ar: "تحقق فوري: العدد العشري نص مختلف عن نصه", en: "Instant check: a decimal differs in type from its text" } },
    ],
    quiz: [
      {
        q: { ar: "ماذا تعيد الدالة input() عندما يكتب المستخدم 25؟", en: "What does input() return when the user types 25?" },
        options: [
          { ar: "قيمة عددية int", en: "An int value" },
          { ar: "النص \"25\" من النوع str", en: "The text \"25\" of type str" },
          { ar: "تكتشف النوع تلقائياً", en: "It auto-detects the type" },
          { ar: "قيمة float دائماً", en: "Always a float" },
        ],
        correct: 1,
        explain: { ar: "input() تعيد نصاً دائماً؛ أضف int() أو float() لتحويله قبل أي عملية حسابية وإلا فوجئت بخطأ TypeError.", en: "input() always returns text; wrap it in int() or float() before arithmetic or you meet a TypeError." },
      },
      {
        q: { ar: "ما دور المسافة البادئة في بايثون؟", en: "What is indentation's role in Python?" },
        options: [
          { ar: "تجميل اختياري يوصي به الدليل فقط", en: "Optional decoration the style guide recommends" },
          { ar: "بنية نحوية تحدد أي الأسطر داخل الكتلة", en: "Syntax that defines which lines belong to the block" },
          { ar: "لا تأثير لها إطلاقاً على التنفيذ", en: "It has no effect on execution at all" },
          { ar: "تستخدم فقط داخل التعليقات", en: "Used only inside comments" },
        ],
        correct: 1,
        explain: { ar: "بايثون تستبعد الأقواس المعقوفة وتعتمد المسافات: السطر بمسافة بادئة صحيحة داخل الكتلة، والخاطئ خارجها — أو خطأ نحوي.", en: "Python drops curly braces and trusts spaces: a line indented correctly lives inside the block, an incorrect one outside — or is a syntax error." },
      },
      {
        q: { ar: "ماذا يطبع f\"Count is {count}\" عندما count = 4؟", en: "What does f\"Count is {count}\" print when count = 4?" },
        options: [
          { ar: "Count is {count}", en: "Count is {count}" },
          { ar: "Count is 4", en: "Count is 4" },
          { ar: "count", en: "count" },
          { ar: "خطأ نحوي", en: "A syntax error" },
        ],
        correct: 1,
        explain: { ar: "بادئة f تفعّل السلسلة المنسقة: كل اسم بين معقوفين يُستبدل بقيمته الحالية وقت التنفيذ.", en: "The f prefix activates the formatted string: each name in braces is replaced by its current value at run time." },
      },
      {
        q: { ar: "score = 80 بالضبط في مثال الدرجات — ما التقدير؟", en: "score = 80 exactly in the grading example — which grade?" },
        options: [
          { ar: "A", en: "A" },
          { ar: "B", en: "B" },
          { ar: "C", en: "C" },
          { ar: "F", en: "F" },
        ],
        correct: 1,
        explain: { ar: "الشرط score >= 80 صادق عند 80 بالضبط (الحد من ضمن نطاقه)، فتتوقف السلسلة عند التقدير B — لهذا نختبر الحدود دائماً.", en: "The condition score >= 80 is true at exactly 80 (boundaries belong to their own band), so the chain stops at B — hence always test boundaries." },
      },
    ],
  },

  // ───────────────────────── l134 ─────────────────────────
  {
    id: "l134",
    moduleId: "m14",
    order: 4,
    level: "intermediate",
    title: {
      ar: "الحلقات وهياكل البيانات والدوال في بايثون",
      en: "Loops, Data Structures & Functions in Python",
    },
    summary: {
      ar: "الحلقات والتكرار الذكي، القوائم والصفوف والقواميس بأمثلة عناوين IP والأجهزة، ثم الدوال ونطاق المتغيرات في مثال جامع واحد — CILO 1 من مادة البرمجة.",
      en: "Loops and smart repetition, lists, tuples and dictionaries with IP and device examples, then functions and variable scope in one combined example — your programming course's CILO 1.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "الحلقات: كرر بلا تعب", en: "Loops: Repeat Without Fatigue" },
        body: {
          ar: "قوة الحاسوب الحقيقية ليست السرعة بل التكرار الصبور: فحص ألف عنوان، أو قراءة مليون سطر سجل، دون كلل ودون خطأ نسخ ولصق. الحلقتان الأساسيتان:\n\n- while: كرر ما دام الشرط صادقاً — مثالية حين لا تعرف عدد المرات مقدماً (انتظر حتى ينجح الاتصال)\n- for: لكل عنصر في تسلسل — مثالية حين تعرف ما تمر عليه (كل جهاز في القائمة، كل رقم في range)\n\nدالة range() تولد سلسلة أرقام: range(5) تعطي 0 1 2 3 4 — انتبه: تبدأ من صفر وتتوقف قبل الرقم المذكور. وrange(1, 11) تعطي 1 حتى 10.\n\nونظام المهام الحرج: break يهرب من الحلقة فوراً، وcontinue يتخطى الدورة الحالية ويمضي للتالية.",
          en: "A computer's real power is not speed but patient repetition: checking a thousand addresses or reading a million log lines, without fatigue and without copy-paste errors. The two fundamental loops:\n\n- while: repeat as long as the condition is true — perfect when the count is unknown upfront (wait until connection succeeds)\n- for: for each element in a sequence — perfect when you know what you are walking over (each device in the list, each number in range)\n\nThe range() function generates number sequences: range(5) yields 0 1 2 3 4 — note: starts at zero and stops before the stated number. range(1, 11) yields 1 through 10.\n\nAnd the two emergency controls: break escapes the loop immediately, while continue skips the current round and jumps to the next.",
        },
        code: {
          lang: "python",
          snippet: "# for: walk a known sequence of octet values\nfor host in range(1, 5):\n    print(f\"10.0.0.{host}\")        # 10.0.0.1 .. 10.0.0.4\n\n# while: retry an unknown number of times\nattempts = 0\nconnected = False\nwhile not connected and attempts < 3:\n    attempts += 1\n    print(f\"Attempt {attempts}: connecting...\")\n    connected = True                # imagine a successful connect()\n\n# break and continue\nfor host in range(1, 255):\n    if host == 13:                  # skip the unlucky lab PC\n        continue\n    if host == 20:\n        print(\"Reached the gateway — stop the sweep\")\n    break\n# (break belongs to the if at host 20; indentation decides!)",
        },
      },
      {
        heading: { ar: "القوائم: القطار المرتب", en: "Lists: The Ordered Train" },
        body: {
          ar: "القائمة (List) هي سفينة بايثون الشحن: تسلسل مرتب من عناصر قد تختلط أنواعها، قابل للتعديل بعد الإنشاء. وإليك مفاجأة مقصودة: أول عنصر رقمه 0 لا 1 — مثل عدّ واجهات الموجّه من صفر، ومن هنا index -1 يعني الأخير.\n\n- الفهرسة: ip_list[0] أول عنصر، وip_list[-1] آخر عنصر\n- التقطيع: ip_list[1:3] عناصر من الفهرس 1 حتى قبل 3 — مقطع جديد مستقل\n- الإلحاق: append() يضيف إلى النهاية فيزداد len() بواحد\n\nمثال شبكي أصيل: قائمة عناوين IP تريد تفتيشها واحداً واحداً.",
          en: "The list is Python's cargo ship: an ordered sequence of elements of possibly mixed types, modifiable after creation. And here is a deliberate surprise: the first element is numbered 0, not 1 — like counting router interfaces from zero, which is why index -1 means the last one.\n\n- Indexing: ip_list[0] is the first element, ip_list[-1] the last\n- Slicing: ip_list[1:3] takes elements from index 1 up to before 3 — a fresh independent copy\n- Appending: append() adds at the end, growing len() by one\n\nA genuinely networking example: a list of IP addresses you want to inspect one by one.",
        },
        code: {
          lang: "python",
          snippet: "ip_list = [\"10.0.0.1\", \"10.0.0.2\", \"10.0.0.3\", \"192.168.1.1\"]\n\nprint(ip_list[0])          # 10.0.0.1   — index 0 is FIRST\nprint(ip_list[-1])         # 192.168.1.1 — index -1 is LAST\nprint(ip_list[1:3])        # ['10.0.0.2', '10.0.0.3'] — slice excludes 3\nprint(len(ip_list))        # 4\n\nip_list.append(\"172.16.0.1\")   # add to the end\nprint(len(ip_list))        # 5\n\n# loop over the list — the everyday network pattern\nfor ip in ip_list:\n    if ip.startswith(\"10.\"):\n        print(f\"{ip}: private RFC1918 range\")\n    else:\n        print(f\"{ip}: check this address class\")",
        },
      },
      {
        heading: { ar: "الصفوف والقواميس: الثبات والخريطة", en: "Tuples & Dictionaries: Constancy & Mapping" },
        body: {
          ar: "الصف (Tuple) قائمة في سجن: مرتبة لكنها غير قابلة للتعديل بعد الإنشاء — وأقواسها دائرية () بدل المربعة. قيمته الثمن: بيانات يجب ألا تتغير بالخطأ (إحداثيات مركز البيانات، أرقام منافذ الخدمات الشهيرة).\n\nأما القاموس (Dictionary) فأقوى هياكل بايثون اليومية: أزواج مفتاح ← قيمة بين قوسين معقوصين. يمنحك البحث الفوري بالاسم بدل تذكر أرقام الفهارس — قل اسم الجهاز يظهر عنوانه. وهذا هو الهيكل الطبيعي لجرد الشبكات: اسم الجهاز مفتاح، وعنوانه وقيمه معلومات.\n\n- إنشاء: devices = {\"R1\": \"10.0.0.1\"}\n- قراءة: devices[\"R1\"] أو الأأمن devices.get(\"R9\") التي تعيد None بدل الانهيار\n- إضافة: devices[\"SW1\"] = \"10.0.0.3\"\n- الجرد: .keys() و.values() و.items() — والأخيرة نجم حلقات for",
          en: "A tuple is a list in prison: ordered but immutable after creation — its brackets are round () instead of square. Its priceless value: data that must never change by accident (data-centre coordinates, well-known service port numbers).\n\nThe dictionary, by contrast, is Python's most powerful everyday structure: key ← value pairs inside curly braces. It gives instant lookup by name instead of memorizing index numbers — say the device's name and its address appears. This is the natural network-inventory structure: device name as key, its address and values as the payload.\n\n- Create: devices = {\"R1\": \"10.0.0.1\"}\n- Read: devices[\"R1\"] or the safer devices.get(\"R9\") which returns None instead of crashing\n- Add: devices[\"SW1\"] = \"10.0.0.3\"\n- Inventory: .keys(), .values() and .items() — the last is the star of for loops",
        },
        code: {
          lang: "python",
          snippet: "# tuple: read-only data (changing it raises an error)\ncore_location = (\"Manama\", \"DC1\", \"Rack 4\")\nprint(core_location[0])    # Manama\n# core_location[0] = \"Riffa'  # TypeError! tuples refuse assignment\n\n# dictionary: the device inventory pattern\ndevices = {\n    \"R1\": \"10.0.0.1\",\n    \"R2\": \"10.0.0.2\",\n    \"SW1\": \"10.0.0.3\",\n}\nprint(devices[\"R1\"])               # 10.0.0.1 — lookup by NAME\nprint(devices.get(\"R9\"))           # None — no crash on missing key\ndevices[\"SW2\"] = \"10.0.0.4\"        # add a new device\n\n# .items() unpacks key and value together — the golden loop\nfor name, ip in devices.items():\n    print(f\"{name}: {ip}\")",
        },
        table: {
          caption: { ar: "أي هيكل بيانات لكل مهمة؟", en: "Which data structure for which job?" },
          headers: [
            { ar: "الهيكل", en: "Structure" },
            { ar: "الأقواس", en: "Brackets" },
            { ar: "قابل للتعديل؟", en: "Mutable?" },
            { ar: "الاستخدام الشبكي الأمثل", en: "Best networking use" },
          ],
          rows: [
            [
              { ar: "القائمة list", en: "list" },
              { ar: "مربعة []", en: "Square []" },
              { ar: "نعم — append وحذف وتعديل", en: "Yes — append, remove, modify" },
              { ar: "طابور عناوين IP للفحص، أسطر سجل مرت", en: "A queue of IPs to scan, log lines read" },
            ],
            [
              { ar: "الصف tuple", en: "tuple" },
              { ar: "دائرية ()", en: "Round ()" },
              { ar: "لا — قراءة فقط", en: "No — read only" },
              { ar: "ثوابت لا تتغير: أرقام المنافذ، إحداثيات الموقع", en: "Constants that must not change: port numbers, site coordinates" },
            ],
            [
              { ar: "القاموس dict", en: "dict" },
              { ar: "معقوصة {}", en: "Curly {}" },
              { ar: "نعم — إضافة مفاتيح وتحديث قيم", en: "Yes — add keys, update values" },
              { ar: "جرد الأجهزة: الاسم مفتاح والعنوان قيمة", en: "Device inventory: name as key, IP as value" },
            ],
          ],
        },
      },
      {
        heading: { ar: "الدوال: صناديق قابلة لإعادة الاستخدام", en: "Functions: Reusable Boxes" },
        body: {
          ar: "الدالة (Function) صندوق يلف مجموعة خطوات باسم واحد: تكتب منطقك مرة، ثم تستدعيه عشرات المرات باسمها. فائدتها الكبرى ليست اختصار الشيفرة بل عزلها: أصلح داخل الدالة فينتظم كل من استدعاها.\n\n- تعريف بالكلمة def ثم الاسم وقوسا المعاملات والنقطتان\n- المعاملات (Parameters) مدخلات الصندوق، والوسائط (Arguments) القيم الفعلية عند الاستدعاء\n- return تسلّم النتيجة للمستدعي — وبغيرها تعيد الدالة None بصمت\n- القيم الافتراضية: def report(inventory, status=\"UP\") تعطي معاملاً اختيارياً\n\nثم النطاق (Scope): متغير يولد داخل الدالة يكون محلياً — يعيش ويموت داخلها، ولا يراه الخارج. هذا عزل مقصود يمنع الدوال من تخريب بعضها؛ ولإرسال قيمة للخارج استخدم return لا تعديل متغير خارجي.",
          en: "A function is a box wrapping a group of steps under one name: you write the logic once, then call it by name dozens of times. Its greatest gift is not brevity but isolation: fix the inside and everyone who calls it is healed.\n\n- Define with the word def, the name, parameter brackets and a colon\n- Parameters are the box's inputs; arguments are the actual values at call time\n- return hands the result to the caller — without it, the function silently returns None\n- Default values: def report(inventory, status=\"UP\") creates an optional parameter\n\nThen scope: a variable born inside a function is local — it lives and dies inside, invisible outside. This isolation is deliberate, preventing functions from wrecking each other; to send a value outward, use return rather than modifying an outer variable.",
        },
        code: {
          lang: "python",
          snippet: "def is_private(ip):\n    \"\"\"True when the address belongs to a private range.\"\"\"\n    return ip.startswith(\"10.\") or ip.startswith(\"192.168.\")\n\ndef status_report(inventory, status=\"UP\"):\n    \"\"\"Build one report line per device in the inventory.\"\"\"\n    lines = []                      # local: born and dies here\n    for name, ip in inventory.items():\n        lines.append(f\"{name} ({ip}) is {status}\")\n    return lines                    # hand the result to the caller\n\n# call with an argument, then with the default\ndevices = {\"R1\": \"10.0.0.1\", \"SW1\": \"10.0.0.3\"}\nprint(status_report(devices)[0])            # R1 (10.0.0.1) is UP\nprint(status_report(devices, status=\"DOWN\")[1])  # SW1 (10.0.0.3) is DOWN\nprint(is_private(\"10.0.0.1\"))               # True\n# print(lines)  # NameError — 'lines' is local to the function!",
        },
      },
      {
        heading: { ar: "المثال الجامع: تقرير حالة الأجهزة", en: "The Combined Example: Device Status Report" },
        body: {
          ar: "الآن اجمع كل ما تعلمته في السكربت الذي يستحقه ملفك: قائمة عناوين للفحص، وصف للثوابت، وقاموس جرد، ودالتان، وحلقة جامعة، وشرط الترشيح. اقرأ السكربت سطراً سطراً وسمّ كل مفهوم تقابله — هذه هي مهارة الامتحان العملية الحقيقية.",
          en: "Now combine everything you learned into the script your portfolio deserves: a list of addresses to audit, a tuple for constants, an inventory dictionary, two functions, a unifying loop and a filtering condition. Read the script line by line and name every concept you meet — that is the real practical-exam skill.",
        },
        code: {
          lang: "python",
          snippet: "# net_devices.py — loops + structures + functions, all together\n\nip_list = [\"10.0.0.1\", \"10.0.0.2\", \"10.0.0.3\", \"192.168.1.1\", \"8.8.8.8\"]\nsite = (\"Manama\", \"DC1\")                     # tuple: fixed facts\ndevices = {\"R1\": \"10.0.0.1\", \"R2\": \"10.0.0.2\", \"SW1\": \"10.0.0.3\"}\n\ndef is_private(ip):\n    \"\"\"True for RFC1918 private addresses.\"\"\"\n    return ip.startswith(\"10.\") or ip.startswith(\"192.168.\")\n\ndef status_report(inventory, status=\"UP\"):\n    \"\"\"Return one status line per device.\"\"\"\n    lines = []\n    for name, ip in inventory.items():\n        lines.append(f\"{name} ({ip}) is {status}\")\n    return lines\n\nprint(f\"Site: {site[0]} / {site[1]}\")\nfor line in status_report(devices):\n    print(line)\n\nprint(\"--- Address audit ---\")\nfor ip in ip_list:\n    if is_private(ip):\n        print(f\"{ip}: private, keep internal\")\n    else:\n        print(f\"{ip}: public, double-check routing\")",
        },
        tip: {
          ar: "قاعدة الصناعة: إن تكرر منطق مرتين فارفعه إلى دالة؛ وإن تجاوز السكربت مئة سطر ففكّر في تقسيمه — هذان الانضباطان هما CILO 1 الذي ستحاسب عليه.",
          en: "Industry rule: if logic repeats twice, lift it into a function; if a script passes a hundred lines, consider splitting it — these two disciplines are the CILO 1 you will be graded on.",
        },
      },
    ],
    keyPoints: [
      { ar: "while لمرة مجهولة العدد وfor لتمر على تسلسل معروف، وbreak/continue للتحكم الفوري", en: "while for unknown repetition counts, for for walking known sequences, break/continue for instant control" },
      { ar: "القوائم مرتبة قابلة للتعديل؛ الفهرس يبدأ من 0 و[-1] الأخير", en: "Lists are ordered and mutable; indexing starts at 0 with [-1] as the last" },
      { ar: "الصف ثابت للبيانات التي لا تتغير؛ والقاموس مفتاح ← قيمة للجرد بالاسم", en: "Tuples are immutable for never-changing data; dictionaries map key ← value for name-based inventories" },
      { ar: "def يعرف الدالة، وreturn يسلم النتيجة — وبغيره تعيد None", en: "def defines the function and return hands back the result — without it, None" },
      { ar: "متغيرات الدالة محلية: تعيش وتموت داخلها — فاستخدم return للتواصل", en: "A function's variables are local: born and dying inside — communicate through return" },
    ],
    commands: [
      { cmd: "python3 net_devices.py", desc: { ar: "شغّل السكربت الجامع وراقب المخرجات", en: "Run the combined script and watch the output" } },
      { cmd: "python3 -i net_devices.py", desc: { ar: "شغّل ثم افتح جلسة تفاعلية لفحص المتغيرات والدوال", en: "Run then open an interactive session to inspect variables and functions" } },
    ],
    quiz: [
      {
        q: { ar: "ماذا يعيد ip_list[-1] على قائمة من خمسة عناوين؟", en: "What does ip_list[-1] return on a five-element list?" },
        options: [
          { ar: "العنصر الأول", en: "The first element" },
          { ar: "العنصر الخامس الأخير", en: "The fifth (last) element" },
          { ar: "خطأ — الفهرس السالب غير مسموح", en: "An error — negative indexes are forbidden" },
          { ar: "القائمة معكوسة كاملة", en: "The entire reversed list" },
        ],
        correct: 1,
        explain: { ar: "الفهرس -1 يلتقط العنصر الأخير من أي قائمة — أداة يومية لجلب أحدث عنصر أُلحق.", en: "Index -1 grabs the last element of any list — a daily tool for fetching the newest appended item." },
      },
      {
        q: { ar: "أي هيكل البيانات الأمثل لجرد أجهزة (اسم الجهاز → عنوان IP)؟", en: "Which data structure is optimal for a device inventory (name → IP)?" },
        options: [
          { ar: "القائمة list", en: "A list" },
          { ar: "الصف tuple", en: "A tuple" },
          { ar: "القاموس dict", en: "A dictionary" },
          { ar: "قائمة من الصفوف فقط", en: "A list of tuples only" },
        ],
        correct: 2,
        explain: { ar: "القاموس يربط المفتاح بالقيمة: قل devices[\"R1\"] يظهر العنوان فوراً — هذا هو تعريف جرد الأجهزة.", en: "A dictionary binds key to value: say devices[\"R1\"] and the address appears instantly — the very definition of an inventory." },
      },
      {
        q: { ar: "محاولة تعديل عنصر داخل صف tuple تؤدي إلى:", en: "Trying to modify an element inside a tuple results in:" },
        options: [
          { ar: "تعديل صامت ناجح", en: "A silent successful change" },
          { ar: "خطأ TypeError", en: "A TypeError" },
          { ar: "تحويل تلقائي إلى قائمة", en: "Automatic conversion to a list" },
          { ar: "تحذير فقط وتستمر العملية", en: "A warning only, and the change proceeds" },
        ],
        correct: 1,
        explain: { ar: "الصف غير قابل للتعديل بطبيعته؛ البايثون ترفض بالخطأ TypeError — وهذا بالضبط سبب استخدامه للثوابت.", en: "Tuples are immutable by nature; Python refuses with TypeError — which is precisely why constants live in them." },
      },
      {
        q: { ar: "دالة بلا عبارة return تعيد:", en: "A function without a return statement returns:" },
        options: [
          { ar: "صفر 0", en: "Zero 0" },
          { ar: "سلسلة فارغة", en: "An empty string" },
          { ar: "القيمة None", en: "The value None" },
          { ar: "آخر متغير استخدمته", en: "The last variable it used" },
        ],
        correct: 2,
        explain: { ar: "بايثون تعيد None تلقائياً من كل دالة بلا return — سبب شائع لطباعة None في الواجبات المنسية.", en: "Python automatically returns None from any function lacking return — a frequent cause of printed None in forgotten assignments." },
      },
    ],
  },

  // ───────────────────────── l135 ─────────────────────────
  {
    id: "l135",
    moduleId: "m14",
    order: 5,
    level: "intermediate",
    title: {
      ar: "قواعد البيانات العلائقية ونمذجة ERD",
      en: "Relational Databases & ERD Modelling",
    },
    summary: {
      ar: "لماذا تخذلنا الملفات؟ نموذج كود العلائقي 1970 بمصطلحاته ومفاتيحه، ثم لغة مخططات ERD من الكيانات إلى العلاقات والتكامل، وتحويل مثال الطالب والمقرر إلى جداول حقيقية.",
      en: "Why files betray us? Codd's 1970 relational model with its terms and keys, then the ERD language from entities to relationships and cardinality, converting a student-course example into real tables.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "لماذا لا تكفي الملفات؟", en: "Why Are Files Not Enough?" },
        body: {
          ar: "كل منظمة بدأت بملفات: ملف Excel للطلاب وملف Word للمقررات. ثم تكبر المنظمة فينكشف العجز الثلاثي المشؤوم:\n\n- التكرار (Redundancy): بيانات الطالب نفسها في خمسة ملفات — خمس فرص للتناقض وخمس مساحات تخزين\n- عدم الاتساق (Inconsistency): غيّرت هاتف الطالب في ملفين ونسيت الثالثة — أيها الحقيقة الآن؟\n- غياب التزامن (No Concurrency): موظفان يحرران الملف ذاته في اللحظة نفسها — كتابة أحدهما تمحو كتابة الآخر\n\nإضافة إلى ذلك: لا بحث فعال، ولا صلاحيات دقيقة، ولا نسخ احتياطي منظم. قاعدة البيانات (Database) ليست ترفاً تقنياً؛ هي الاستجابة الهندسية المباشرة لهذه الآلام — ونظام إدارتها (DBMS) مثل Oracle هو المحرك الذي يجعلها واقعاً.",
          en: "Every organization began with files: one Excel for students, one Word for courses. Then it grows and the ominous triple deficiency appears:\n\n- Redundancy: the same student data in five files — five chances of contradiction and five storage footprints\n- Inconsistency: you updated a phone number in two files and forgot the third — which one holds the truth now?\n- No concurrency: two staff editing the same file at the same instant — one save silently erases the other\n\nOn top of that: no efficient search, no fine-grained permissions, no organized backup. A database is not a technical luxury; it is the direct engineering response to these pains — and its management system (DBMS) like Oracle is the engine making it real.",
        },
      },
      {
        heading: { ar: "نموذج كود العلائقي (1970)", en: "Codd's Relational Model (1970)" },
        body: {
          ar: "عام 1970 نشر عالم IBM إدغار كود الورقة التي غيّرت كل شيء: «نموذج علائقي لبيانات البنوك الكبيرة المشتركة». فكرته الجوهرية بسيطة عبقرية: مثّل البيانات جداول رياضية (علاقات Relations)، يستعلم عنها المستخدم بلغة موحدة دون معرفة كيف خُزنت فعلياً — وقد بنيت Oracle كلها على هذه الورقة.\n\nمصطلحات النموذج التي سيسألك عنها كل امتحان:\n\n- العلاقة Relation = الجدول، والصف Tuple = الصف/السجل، والخاصية Attribute = العمود\n- النطاق Domain: مجموعة القيم المسموحة لعمود (درجة من 0 إلى 100 فقط)\n- المفتاح المرشح Candidate Key: عمود (أو مجموعة) يعرّف كل صف تعريفاً فريداً\n- المفتاح الأساسي Primary Key: المرشح الذي اخترناه رسمياً — لا يتكرر ولا يكون فارغاً أبداً\n- المفتاح الأجنبي Foreign Key: عمود في جدول يشير إلى مفتاح أساسي في جدول آخر — هذا هو الغراء بين الجداول",
          en: "In 1970, IBM researcher Edgar Codd published the paper that changed everything: 'A Relational Model of Data for Large Shared Data Banks'. His core idea is brilliantly simple: represent data as mathematical tables (relations), queried through one uniform language without knowing how it is physically stored — Oracle itself was built on this paper.\n\nThe model's exam-favourite vocabulary:\n\n- Relation = the table, Tuple = the row/record, Attribute = the column\n- Domain: the set of values a column may take (a grade only from 0 to 100)\n- Candidate Key: a column (or set) that uniquely identifies every row\n- Primary Key: the candidate officially chosen — never duplicated, never null\n- Foreign Key: a column in one table pointing at a primary key in another — this is the glue between tables",
        },
        table: {
          caption: { ar: "مصطلحات النموذج العلائقي وترجمتها العملياتية", en: "Relational model terms and their operational translation" },
          headers: [
            { ar: "المصطلح", en: "Term" },
            { ar: "المعنى الرياضي", en: "Mathematical meaning" },
            { ar: "في Oracle العملي", en: "In practical Oracle" },
          ],
          rows: [
            [
              { ar: "Relation علاقة", en: "Relation" },
              { ar: "مجموعة فرعية من ضرب ديكارتي للنطاقات", en: "A subset of the Cartesian product of domains" },
              { ar: "جدول واحد باسم مثل STUDENT", en: "One table named e.g. STUDENT" },
            ],
            [
              { ar: "Tuple صف", en: "Tuple" },
              { ar: "زوج مرتب من القيم (قائمة قيم)", en: "An ordered list of values" },
              { ar: "صف واحد: طالب واحد", en: "One row: one single student" },
            ],
            [
              { ar: "Attribute عمود", en: "Attribute" },
              { ar: "اسم موصول بنطاق قيم", en: "A name paired with a domain" },
              { ar: "عمود مثل FULL_NAME", en: "A column like FULL_NAME" },
            ],
            [
              { ar: "Primary Key", en: "Primary Key" },
              { ar: "مُعرّف فريد أدنى لكل صف", en: "A minimal unique identifier per tuple" },
              { ar: "قيد PRIMARY KEY مع فهرس تلقائي", en: "A PRIMARY KEY constraint with an automatic index" },
            ],
            [
              { ar: "Foreign Key", en: "Foreign Key" },
              { ar: "مرجع إلى مفتاح أساسي في علاقة أخرى", en: "A reference to another relation's primary key" },
              { ar: "قيد REFERENCES يمنع الجفاء المرجعي", en: "A REFERENCES constraint blocking broken links" },
            ],
          ],
        },
      },
      {
        heading: { ar: "المفاتيح: بطاقات الهوية والغراء", en: "Keys: Identity Cards & Glue" },
        body: {
          ar: "قوة النموذج العلائقي تسكن في مفاتيحه. المفتاح الأساسي هو بطاقة الهوية الوطنية للصف: قيمة واحدة لشخص واحد، لا تتكرر ولا تكون فارغة — بها يصبح «تحديث سجل أحمد» أمراً آمناً لا يمس أحداً غيره.\n\nوقد يكون المفتاح مركباً: عمودان معاً يحققان التفرد — (الطالب + المقرر) في جدول التسجيل؛ كلٌّ وحده يتكرر، واجتماعهما لا يتكرر أبداً.\n\nأما المفتاح الأجنبي فهو عقد الزواج بين جدولين: قيده في Oracle يرفض تسجيلاً لطالب لا وجود له، ويرفض حذف طالب له تسجيلات يتيمة — تكامل مرجعي (Referential Integrity) يحمي بياناتك من الجفاء.",
          en: "The relational model's strength lives in its keys. The primary key is the row's national ID card: one value per person, never duplicated, never null — through it, 'update Ahmed's record' becomes a safe command touching nobody else.\n\nA key can be composite: two columns together achieving uniqueness — (student + course) in the enrolment table; each alone repeats, their pair never does.\n\nThe foreign key, then, is the marriage contract between two tables: its Oracle constraint rejects an enrolment for a non-existent student, and rejects deleting a student who still has enrolments — referential integrity protecting your data from broken links.",
        },
      },
      {
        heading: { ar: "مخطط ERD: لغة المصممين", en: "ERD: The Modellers' Language" },
        body: {
          ar: "مخطط الكيان والعلاقة (ERD) هو لوحة الرسم التي تترجم قصة العميل إلى تصميم قاعدة بيانات — قبل كتابة أي SQL. وهو مطلب صريح في مادتك (CILO 2: نمذجة البيانات لإنتاج نماذج منطقية بتقنيات ERD).\n\n- الكيان Entity: شيء حقيقي نحفظ عنه بيانات — الطالب، المقرر، الجهاز (مستطيل)\n- الخاصية Attribute: معلومة نحفظها عن الكيان (بيضاوي) — وتحتها خط = مفتاح أساسي\n- العلاقة Relationship: ربط بين كيانين (معيّن) — «يسجّل في»\n- التكامل Cardinality: كم من كل طرف — وترميز غراب القدم Crow's Foot يشير بأسهم الأصابع لجهة «العديد»\n\nالتكاملات الثلاثة التي تقرر شكل قاعدتك:\n\n- واحد لواحد 1:1 — كل طالب له ملف طبي واحد\n- واحد للعديد 1:N — قسم واحد يضم عشرات الطلاب\n- العديد للعديد M:N — الطلاب يسجلون في مقررات والمقررات تحوي طلاباً — وهذا يفرض حلاً شهيراً (القسم التالي!)",
          en: "The Entity-Relationship Diagram is the drawing board translating the customer's story into a database design — before writing any SQL. It is an explicit requirement in your course (CILO 2: data modelling producing logical models with ERD techniques).\n\n- Entity: a real thing we store data about — student, course, device (rectangle)\n- Attribute: a fact stored about the entity (oval) — underlined = primary key\n- Relationship: a link between two entities (diamond) — 'enrols in'\n- Cardinality: how many on each side — the crow's foot notation points its toe-marks toward the 'many' side\n\nThe three cardinalities that shape your database:\n\n- One-to-one 1:1 — each student has exactly one medical file\n- One-to-many 1:N — one department hosting tens of students\n- Many-to-many M:N — students enrol in courses and courses hold students — and this demands a famous solution (next section!)",
        },
        table: {
          caption: { ar: "رموز مخطط ERD ومعانيها", en: "ERD symbols and their meanings" },
          headers: [
            { ar: "الرمز", en: "Symbol" },
            { ar: "الشكل", en: "Shape" },
            { ar: "المعنى", en: "Meaning" },
          ],
          rows: [
            [
              { ar: "الكيان Entity", en: "Entity" },
              { ar: "مستطيل", en: "Rectangle" },
              { ar: "شيء نحفظ بياناته: طالب، مقرر، جهاز", en: "A thing we store data about: student, course, device" },
            ],
            [
              { ar: "الخاصية Attribute", en: "Attribute" },
              { ar: "بيضاوي متصل بالكيان", en: "Oval linked to the entity" },
              { ar: "حقيقة عن الكيان؛ الخط تحتها = مفتاح أساسي", en: "A fact about the entity; underline = primary key" },
            ],
            [
              { ar: "العلاقة Relationship", en: "Relationship" },
              { ar: "معيّن", en: "Diamond" },
              { ar: "الفعل الرابط: «يسجّل في»، «يدير»", en: "The linking verb: 'enrols in', 'manages'" },
            ],
            [
              { ar: "تكامل 1:1", en: "1:1 cardinality" },
              { ar: "شرطة واحدة بكل طرف", en: "A single tick on each end" },
              { ar: "سجل من كل طرف يقابل سجلاً وحيداً", en: "One record on each side maps to a single record" },
            ],
            [
              { ar: "تكامل 1:N (غراب القدم)", en: "1:N (crow's foot)" },
              { ar: "أصابع الغراب جهة «العديد»", en: "The crow's toes toward the 'many' side" },
              { ar: "الأب الواحد له أبناء متعددون", en: "One parent with many children" },
            ],
          ],
        },
        diagram: {
          kind: "topology",
          title: { ar: "ERD مثال: الطالب يسجّل في المقرر (M:N عبر جدول وسيط)", en: "Example ERD: student enrols in course (M:N via a junction table)" },
          nodes: ["STUDENT|الطالب", "ENROLMENT|التسجيل", "COURSE|المقرر", "DEPARTMENT|القسم"],
          edges: [[0, 1], [1, 2], [3, 0]],
        },
      },
      {
        heading: { ar: "من ERD إلى جداول: حيلة M:N الشهيرة", en: "From ERD to Tables: The Famous M:N Trick" },
        body: {
          ar: "العلاقة العديد-للعديد لا يمكن تخزينها مباشرة: أين نضع درجة الطالب في مقرر ما؟ في صف الطالب؟ ستتكرر بكل مقرر. في صف المقرر؟ ستتضخم بكل طالب.\n\nالحل الذي بُنيت عليه كل أنظمة الجامعات: جدول وسيط (Junction Table) يفكك M:N إلى علاقتَي 1:N — جدول التسجيل ENROLMENT يحمل مفتاح الطالب + مفتاح المقرر + حقائق التسجيل نفسها (الفصل، الدرجة)، ومفتاحه الأساسي مركب من العمودين معاً.\n\nهذا بالضبط ما ستبنيه على Oracle في مختبرات المادة — الشيفرة التالية جاهزة للتنفيذ هناك.",
          en: "The many-to-many relationship cannot be stored directly: where do we put a student's grade in a particular course? In the student's row? It repeats for every course. In the course's row? It bloats with every student.\n\nThe solution every university system is built on: a junction table decomposing M:N into two 1:N relationships — the ENROLMENT table carries the student's key + the course's key + the enrolment's own facts (term, grade), with a composite primary key of exactly those two columns.\n\nThis is precisely what you will build on Oracle in your course labs — the following code runs there as-is.",
        },
        code: {
          lang: "sql",
          snippet: "-- From the ERD to real Oracle tables\nCREATE TABLE student (\n    student_id   NUMBER(5)      PRIMARY KEY,\n    full_name    VARCHAR2(60)   NOT NULL,\n    email        VARCHAR2(80)   UNIQUE,\n    dept_code    VARCHAR2(10)\n);\n\nCREATE TABLE course (\n    course_id    CHAR(7)        PRIMARY KEY,   -- e.g. 'IT6005'\n    title        VARCHAR2(80)   NOT NULL,\n    credits      NUMBER(1)      DEFAULT 3\n);\n\nCREATE TABLE enrolment (\n    student_id   NUMBER(5)      REFERENCES student(student_id),\n    course_id    CHAR(7)        REFERENCES course(course_id),\n    term         VARCHAR2(10)   NOT NULL,\n    grade        CHAR(2),\n    PRIMARY KEY (student_id, course_id)   -- composite key: the pair is unique\n);",
        },
        tip: {
          ar: "قاعدة تصميم ذهبية: كلما ظهرت M:N في ERD صمم جدولاً وسيطاً فوراً — ستقابلك في الامتحان مرات أكثر مما تتوقع، والدرجة كاملة لمن يحسمها بلا تردد.",
          en: "A golden design rule: whenever M:N appears in an ERD, design a junction table immediately — exams throw it at you more often than you expect, and full marks go to whoever settles it without hesitation.",
        },
      },
    ],
    keyPoints: [
      { ar: "عيوب الملفات: تكرار وعدم اتساق وغياب تزامن — وقاعدة البيانات هي العلاج الهندسي", en: "Files' flaws: redundancy, inconsistency, no concurrency — the database is the engineering cure" },
      { ar: "نموذج كود 1970: علاقة=جدول، صف=Tuple، عمود=Attribute، والاستعلام بلغة موحدة", en: "Codd's 1970 model: relation=table, row=tuple, column=attribute, queried in one uniform language" },
      { ar: "المفتاح الأساسي فريد وغير فارغ؛ والأجنبي غراء التكامل المرجعي بين الجداول", en: "The primary key is unique and never null; the foreign key is the referential-integrity glue" },
      { ar: "ERD: مستطيل كيان، بيضاوي خاصية، معيّن علاقة، وغراب القدم للتكامل", en: "ERD: rectangle entity, oval attribute, diamond relationship, crow's foot for cardinality" },
      { ar: "M:N تُفك بجدول وسيط بمفتاح مركب — جدول التسجيل مثالك الدائم", en: "M:N decomposes into a junction table with a composite key — the enrolment table is your eternal example" },
    ],
    commands: [
      { cmd: "sqlplus student@orcl", desc: { ar: "اتصل بقاعدة Oracle الخاصة بالمادة بإدخال كلمة المرور", en: "Connect to your course Oracle database by entering the password" } },
      { cmd: "sqlite3 uni.db", desc: { ar: "تدرب في البيت على قاعدة خفيفة بصياغة SQL شبه مطابقة", en: "Practise at home on a light database with near-identical SQL" } },
      { cmd: "sqlite3 uni.db '.tables'", desc: { ar: "اعرض جداول قاعدتك للتحقق من إنشاء الكيانات الثلاثة", en: "List your database tables to verify the three entities were created" } },
    ],
    quiz: [
      {
        q: { ar: "في النموذج العلائقي، الصف الواحد من الجدول يسمى:", en: "In the relational model, a single table row is called:" },
        options: [
          { ar: "Attribute", en: "Attribute" },
          { ar: "Tuple", en: "Tuple" },
          { ar: "Domain", en: "Domain" },
          { ar: "Relation", en: "Relation" },
        ],
        correct: 1,
        explain: { ar: "الصف Tuple والعمود Attribute والجدول Relation — المصطلحات الثلاثة التي يفاخر امتحان IT6005 بسؤالها.", en: "Row = tuple, column = attribute, table = relation — the three terms every IT6005 exam loves to ask." },
      },
      {
        q: { ar: "عمود في جدول يشير إلى المفتاح الأساسي لجدول آخر هو:", en: "A column in one table pointing at another table's primary key is:" },
        options: [
          { ar: "مفتاح مرشح", en: "A candidate key" },
          { ar: "مفتاح أجنبي Foreign Key", en: "A foreign key" },
          { ar: "مفتاح مركب", en: "A composite key" },
          { ar: "نطاق Domain", en: "A domain" },
        ],
        correct: 1,
        explain: { ar: "المفتاح الأجنبي هو الغراء: يقيد القيم على صفوف موجودة فعلاً في الجدول الأم فيتحقق التكامل المرجعي.", en: "The foreign key is the glue: it restricts values to rows actually present in the parent table, enforcing referential integrity." },
      },
      {
        q: { ar: "الطلاب يسجلون في مقررات والمقررات تحوي طلاباً — هذا تكامل:", en: "Students enrol in courses and courses hold students — this cardinality is:" },
        options: [
          { ar: "واحد لواحد 1:1", en: "One-to-one 1:1" },
          { ar: "واحد للعديد 1:N", en: "One-to-many 1:N" },
          { ar: "العديد للعديد M:N", en: "Many-to-many M:N" },
          { ar: "لا علاقة", en: "No relationship" },
        ],
        correct: 2,
        explain: { ar: "كل طالب له مقررات متعددة وكل مقرر فيه طلاب متعددون: M:N التي تُحل بجدول وسيط بمفتاح مركب.", en: "Every student takes multiple courses and every course holds multiple students: M:N, solved by a junction table with a composite key." },
      },
      {
        q: { ar: "كيف نعالج علاقة M:N عند التحويل من ERD إلى جداول؟", en: "How do we handle an M:N relationship when converting an ERD to tables?" },
        options: [
          { ar: "نخزنها مباشرة بإضافة أعمدة متكررة", en: "Store it directly by adding repeated columns" },
          { ar: "جدول وسيط يحمل مفتاحي الطرفين وحقائق العلاقة", en: "A junction table carrying both sides' keys and the relationship's facts" },
          { ar: "نحذف العلاقة من التصميم نهائياً", en: "Delete the relationship from the design entirely" },
          { ar: "ندمج الكيانين في جدول واحد", en: "Merge the two entities into one table" },
        ],
        correct: 1,
        explain: { ar: "الجدول الوسيط يفكك M:N إلى علاقتين 1:N آمنتين، ويحمل حقائق العلاقة نفسها كالدرجة والفصل — نمط كل أنظمة الجامعات.", en: "The junction table decomposes M:N into two safe 1:N relations and carries the relationship's own facts like grade and term — the pattern of every university system." },
      },
    ],
  },

  // ───────────────────────── l136 ─────────────────────────
  {
    id: "l136",
    moduleId: "m14",
    order: 6,
    level: "intermediate",
    title: {
      ar: "SQL: استعلامات البيانات",
      en: "SQL: Querying Data",
    },
    summary: {
      ar: "لهجات SQL الثلاث على Oracle: قراءة البيانات بSELECT وشروطها، كتابتها بINSERT وUPDATE وDELETE مع كارثة WHERE المنسية، ثم التجميع بGROUP BY والوصلات بJOIN.",
      en: "SQL's three dialects on Oracle: reading with SELECT and its conditions, writing with INSERT, UPDATE and DELETE plus the forgotten-WHERE disaster, then GROUP BY aggregation and JOINs.",
    },
    durationMin: 21,
    sections: [
      {
        heading: { ar: "لغة واحدة بثلاث لهجات", en: "One Language, Three Dialects" },
        body: {
          ar: "SQL (لغة الاستعلام المهيكلة) هي اللغة التي تتخاطب بها مع كل قواعد البيانات تقريباً — ومادتك تدرسها على Oracle تحديداً، فالصياغات هنا Oracle-متوافقة جاهزة للمختبر.\n\nتقسم SQL إلى ثلاث لهجات وظيفية، ومعرفة أي لهجة ينتمي إليها أمر = نصف فهمه:\n\n- DQL لغة استعلام البيانات: SELECT — القراءة فقط، لا تمس البيانات\n- DML لغة معالجة البيانات: INSERT وUPDATE وDELETE — تغير المحتوى\n- DDL لغة تعريف البيانات: CREATE وALTER وDROP — تغير البنية نفسها\n\nترتيب خطورة تصاعدي: DDL أخطرها لأنها تهدم البنية؛ وأخطر أمرين في SQL: DELETE بلا WHERE وDROP — وكلاهما غير قابل للتراجع بعد COMMIT.",
          en: "SQL (Structured Query Language) is the language nearly every database speaks — and your course teaches it specifically on Oracle, so every statement here is Oracle-compatible and lab-ready.\n\nSQL divides into three functional dialects, and knowing which dialect a statement belongs to is half of understanding it:\n\n- DQL, Data Query Language: SELECT — read-only, never touches data\n- DML, Data Manipulation Language: INSERT, UPDATE, DELETE — changes content\n- DDL, Data Definition Language: CREATE, ALTER, DROP — changes structure itself\n\nAscending danger: DDL is the deadliest because it demolishes structure; and the two deadliest statements in SQL are DELETE without WHERE and DROP — neither reversible after COMMIT.",
        },
        table: {
          caption: { ar: "لهجات SQL الثلاث وحدود كل منها", en: "SQL's three dialects and their boundaries" },
          headers: [
            { ar: "اللهجة", en: "Dialect" },
            { ar: "الأوامر", en: "Statements" },
            { ar: "ما تفعله", en: "What it does" },
            { ar: "قابل للتراجع؟", en: "Rollbackable?" },
          ],
          rows: [
            [
              { ar: "DQL استعلام", en: "DQL query" },
              { ar: "SELECT", en: "SELECT" },
              { ar: "قراءة صفوف بلا أي تعديل", en: "Reads rows without any change" },
              { ar: "لا يلزم — لا شيء تغير", en: "Unneeded — nothing changed" },
            ],
            [
              { ar: "DML معالجة", en: "DML manipulation" },
              { ar: "INSERT / UPDATE / DELETE", en: "INSERT / UPDATE / DELETE" },
              { ar: "إضافة صفوف وتعديل قيم وحذف", en: "Adds rows, changes values, deletes" },
              { ar: "نعم قبل COMMIT بROLLBACK", en: "Yes before COMMIT via ROLLBACK" },
            ],
            [
              { ar: "DDL تعريف", en: "DDL definition" },
              { ar: "CREATE / ALTER / DROP", en: "CREATE / ALTER / DROP" },
              { ar: "إنشاء الجداول والأعمدة وهدمها", en: "Creates and demolishes tables and columns" },
              { ar: "يُنفذ فوراً بCOMMIT ضمني", en: "Executes instantly with implicit COMMIT" },
            ],
          ],
        },
      },
      {
        heading: { ar: "القراءة: SELECT وشروطها", en: "Reading: SELECT and Its Filters" },
        body: {
          ar: "SELECT قلب SQL النابض: اختر أعمدة FROM جدول WHERE شرط ORDER BY ترتيب. غياب WHERE يعني «كل الصفوف» — مبدأ تنبيهي دائم.\n\nصندوق أدوات WHERE النهائي:\n\n- عوامل المقارنة = <> > < وبناء عليها AND وOR وNOT\n- LIKE مع البدلين: % أي عدد أحرف، و_ حرف واحد بالضبط\n- IN (قائمة): العضوية في مجموعة قيم\n- BETWEEN a AND b: المدى المغلق بطرفيه\n- IS NULL: القيمة الفارغة — ولا يجوز = NULL أبداً لأن NULL ليست قيمة بل الغياب\n\nوتذكر قاعدة الأسبقية: AND أقوى من OR، فالأقواس عادتك الدائمة للوضوح.",
          en: "SELECT is SQL's beating heart: pick columns FROM a table WHERE a condition ORDER BY an order. A missing WHERE means 'every row' — a permanent warning principle.\n\nThe ultimate WHERE toolbox:\n\n- Comparison operators = <> > <, building into AND, OR, NOT\n- LIKE with the two wildcards: % any number of characters, _ exactly one\n- IN (list): membership in a value set\n- BETWEEN a AND b: the closed range including both ends\n- IS NULL: the empty value — never = NULL, because NULL is not a value but its absence\n\nAnd remember precedence: AND binds tighter than OR, so parentheses are your permanent clarity habit.",
        },
        code: {
          lang: "sql",
          snippet: "-- DQL: reading data — safe to run anywhere\nSELECT full_name, email\nFROM   student\nWHERE  full_name LIKE 'A%'            -- starts with A\nORDER  BY full_name;\n\nSELECT *\nFROM   enrolment\nWHERE  grade IN ('A', 'B')\n  AND  term = '2025-1'\n  AND  student_id BETWEEN 100 AND 200\n  AND  grade IS NOT NULL\nORDER  BY student_id DESC;\n\n-- parentheses tame operator precedence\nSELECT * FROM enrolment\nWHERE  (grade = 'A' OR grade = 'B')\n  AND  term = '2025-1';",
        },
      },
      {
        heading: { ar: "الكتابة: INSERT وUPDATE وDELETE", en: "Writing: INSERT, UPDATE, DELETE" },
        body: {
          ar: "ثلاثة أوامر تغير محتوى قاعدتك، وكلها تمر عبر دورة المعاملة: تنفذ في جلستك أولاً، ثم COMMIT يثبتها للجميع أو ROLLBACK يلغيها — شبكة أمانك في Oracle طالما لم تلتزم بعد.\n\nثم الحكاية المحذِّرة التي تعيش في كل قسم IT: مشغل أرسل UPDATE لتصحيح بريد طالب واحد ونسي WHERE — فأصبح بريد كل الطلاب في الكلية نسخة واحدة متطابقة خلال ثانية. المعنى العملي: اكتب WHERE أولاً قبل أي شيء في الأمر، وطبّق SELECT بالشرط نفسه قبل التنفيذ لتعاين الضحايا.\n\n- INSERT INTO جدول (أعمدة) VALUES (قيم) — صف جديد\n- UPDATE جدول SET عمود = قيمة WHERE شرط — تعديل المستهدف فقط\n- DELETE FROM جدول WHERE شرط — حذف المستهدف فقط\n- لا WHERE = كل الصفوف تتغير أو تُحذف — بالضبط ما لا تريد",
          en: "Three statements change your database's content, and all pass through the transaction cycle: they execute in your session first, then COMMIT publishes them to everyone or ROLLBACK cancels them — your Oracle safety net as long as you have not committed.\n\nThen the cautionary tale living in every IT department: an operator sent an UPDATE to fix one student's email and forgot WHERE — within a second, every student's email in the college became one identical copy. The practical lesson: write WHERE first before anything else in the statement, and run a SELECT with the same condition beforehand to preview the victims.\n\n- INSERT INTO table (columns) VALUES (values) — a new row\n- UPDATE table SET column = value WHERE condition — modify only the target\n- DELETE FROM table WHERE condition — remove only the target\n- No WHERE = every row changes or dies — exactly what you do not want",
        },
        code: {
          lang: "sql",
          snippet: "-- DML: writing data — inside a transaction until COMMIT\nINSERT INTO student (student_id, full_name, email, dept_code)\nVALUES (101, 'Ahmed Hassan', 'ahmed@polytechnic.edu', 'ICT');\n\nUPDATE student\nSET    email = 'ahmed.h@polytechnic.edu'\nWHERE  student_id = 101;              -- ONE row: exactly the target\n\nDELETE FROM enrolment\nWHERE  grade IS NULL\n  AND  term < '2024-1';               -- purge old empty grades only\n\n-- THE DISASTER: WHERE forgotten -> EVERY student becomes Ali\n-- UPDATE student SET full_name = 'Ali';\nROLLBACK;                             -- your only saviour before COMMIT\n\nCOMMIT;                               -- only when the preview looked right",
        },
        tip: {
          ar: "طقس الأمان قبل كل UPDATE وDELETE: شغّل SELECT بنفس WHERE أولاً وعُدّ الصفوف؛ إن طابقت توقعك فنفّذ — عادة واحدة تحمي وظيفتك المستقبلية.",
          en: "The safety ritual before every UPDATE and DELETE: run a SELECT with the same WHERE first and count the rows; if it matches your expectation, execute — one habit that protects your future job.",
        },
      },
      {
        heading: { ar: "التجميع: COUNT وSUM وAVG مع GROUP BY", en: "Aggregating: COUNT, SUM, AVG with GROUP BY" },
        body: {
          ar: "الدوال التجميعية تطوي صفوفاً كثيرة في رقم واحد: COUNT تعد، وSUM تجمع، وAVG تُوسط، وMIN وMAX تحدان. لكن السؤال الجماعي الحقيقي: «عدد الطلاب في كل مقرر» — يحتاج تجميعاً مشروطاً هنا GROUP BY.\n\n- GROUP BY عمود: اجمع الصفوف المتشابهة في سلال، والدالة التجميعية تعمل داخل كل سلة\n- HAVING: فلترة للسلال نفسها بعد التجميع — وWHERE تُطبق على الصفوف قبل التجميع؛ هذا التمييز سؤال امتحان كلاسيكي\n- قاعدة صارمة: كل عمود في SELECT خارج الدوال التجميعية يجب أن يظهر في GROUP BY",
          en: "Aggregate functions fold many rows into one number: COUNT counts, SUM totals, AVG averages, MIN and MAX bound. But the real collective question — 'the number of students per course' — needs conditional folding: enter GROUP BY.\n\n- GROUP BY column: gathers similar rows into baskets, and the aggregate works inside each basket\n- HAVING: filters the baskets themselves after grouping — while WHERE filters rows before grouping; this distinction is a classic exam question\n- A strict rule: every column in SELECT outside aggregate functions must appear in GROUP BY",
        },
        code: {
          lang: "sql",
          snippet: "-- one number for the whole table\nSELECT COUNT(*) FROM student;\n\n-- one number per basket (course)\nSELECT course_id,\n       COUNT(*)              AS students,\n       ROUND(AVG(score), 1)  AS avg_score\nFROM   enrolment\nWHERE  term = '2025-1'          -- rows filtered BEFORE grouping\nGROUP  BY course_id             -- one basket per course\nHAVING COUNT(*) >= 2;           -- baskets filtered AFTER grouping\n\n-- students enrolled in 3 or more courses\nSELECT student_id, COUNT(*) AS courses\nFROM   enrolment\nGROUP  BY student_id\nHAVING COUNT(*) >= 3\nORDER  BY courses DESC;",
        },
      },
      {
        heading: { ar: "وصل الجداول: INNER JOIN", en: "Joining Tables: INNER JOIN" },
        body: {
          ar: "قوة العلائقية الحقيقية أن بياناتك موزعة بسلام في جداول متخصصة — وقوتها الثانية أن JOIN يعيد لمّها لحظة السؤال: «أسماء الطلاب مع عناوين مقرراتهم ودرجاتهم» معطيات في ثلاثة جداول، وINNER JOIN يصلها بالمفاتيح.\n\n- ON شرط الوصل: عمود المفتاح الأجنبي في جدول = المفتاح الأساسي في الآخر\n- الصفوف التي لا تجد شريكاً في الطرف الآخر تسقط من النتيجة — هذا معنى «الداخلية»\n- استعمل الأسماء المستعارة القصيرة (s وc وe) فتقرأ الشيفرة وتكتبها أسرع — عادة Oracle احترافية",
          en: "The relational model's first power is your data safely distributed across specialized tables — its second power is JOIN reuniting them the moment the question arrives: 'student names with their course titles and grades' lives in three tables, and INNER JOIN stitches them by keys.\n\n- ON is the join condition: the foreign-key column in one table = the primary key in the other\n- Rows finding no partner on the other side drop out of the result — that is what 'inner' means\n- Use short aliases (s, c, e) and your code reads and writes faster — a professional Oracle habit",
        },
        code: {
          lang: "sql",
          snippet: "-- three tables reunited by keys\nSELECT s.full_name,\n       c.title,\n       e.grade\nFROM   enrolment e\nJOIN   student s ON s.student_id = e.student_id\nJOIN   course  c ON c.course_id  = e.course_id\nWHERE  e.term = '2025-1'\nORDER  BY s.full_name;\n\n-- aggregate + join: course popularity with average score\nSELECT c.title,\n       COUNT(*)             AS enrolled,\n       ROUND(AVG(e.score),1) AS avg_score\nFROM   enrolment e\nJOIN   course  c ON c.course_id = e.course_id\nGROUP  BY c.title\nORDER  BY enrolled DESC;",
        },
      },
    ],
    keyPoints: [
      { ar: "DQL يقرأ، وDML يعدل المحتوى، وDDL يعدل البنية — وصنّف كل أمر قبل تنفيذه", en: "DQL reads, DML changes content, DDL changes structure — classify before you execute" },
      { ar: "SELECT بلا WHERE = كل الصفوف؛ وLIKE وIN وBETWEEN وIS NULL صندوق الفلترة", en: "SELECT without WHERE = every row; LIKE, IN, BETWEEN and IS NULL are the filter toolbox" },
      { ar: "UPDATE أو DELETE بلا WHERE يصيب كل الصفوف — والمنقذ ROLLBACK قبل COMMIT", en: "UPDATE or DELETE without WHERE hits every row — ROLLBACK before COMMIT is the rescuer" },
      { ar: "WHERE يفلتر الصفوف قبل التجميع وHAVING يفلتر السلال بعده", en: "WHERE filters rows before grouping; HAVING filters the baskets after" },
      { ar: "INNER JOIN يصل الجداول بالمفاتيح ويسقط الصفوف بلا شريك", en: "INNER JOIN stitches tables by keys and drops partnerless rows" },
    ],
    commands: [
      { cmd: "sqlplus student@orcl", desc: { ar: "افتح جلسة SQL على قاعدة Oracle الخاصة بالمادة", en: "Open a SQL session on your course Oracle database" } },
      { cmd: "@lab_queries.sql", desc: { ar: "نفّذ ملف الاستعلامات كاملاً من داخل sqlplus", en: "Run your whole query file from inside sqlplus" } },
      { cmd: "spool results.txt", desc: { ar: "التقط كل المخرجات في ملف لتسليم الواجب", en: "Capture all output into a file for assignment submission" } },
    ],
    quiz: [
      {
        q: { ar: "أي من الأوامر التالية ينتمي إلى DDL؟", en: "Which of the following statements belongs to DDL?" },
        options: [
          { ar: "SELECT", en: "SELECT" },
          { ar: "INSERT", en: "INSERT" },
          { ar: "CREATE TABLE", en: "CREATE TABLE" },
          { ar: "UPDATE", en: "UPDATE" },
        ],
        correct: 2,
        explain: { ar: "CREATE تعدل البنية نفسها (اللهجة DDL) بينما الثلاثة الأخرى تقرأ المحتوى أو تعدله (DQL وDML).", en: "CREATE alters the structure itself (the DDL dialect) while the other three read or modify content (DQL and DML)." },
      },
      {
        q: { ar: "الشرط WHERE name LIKE 'A%' يجلب الأسماء التي:", en: "The condition WHERE name LIKE 'A%' fetches names that:" },
        options: [
          { ar: "تنتهي بالحرف A", en: "End with the letter A" },
          { ar: "تبدأ بالحرف A", en: "Start with the letter A" },
          { ar: "تحتوي A في أي موضع", en: "Contain A anywhere" },
          { ar: "تطابق A حرفاً وحيداً بالضبط", en: "Match exactly the single letter A" },
        ],
        correct: 1,
        explain: { ar: "% يعني «أي عدد من الأحرف بعدها»، فوضعه بعد الحرف يجعل البدء به شرطاً؛ و_ حرف واحد بالضبط للبدل الآخر.", en: "% means 'any number of characters after', so placing it after the letter conditions the start; _ is the exactly-one wildcard." },
      },
      {
        q: { ar: "الفرق الجوهري بين WHERE وHAVING:", en: "The essential difference between WHERE and HAVING:" },
        options: [
          { ar: "لا فرق — مترادفان", en: "No difference — synonyms" },
          { ar: "WHERE قبل التجميع على الصفوف، وHAVING بعده على المجموعات", en: "WHERE precedes grouping on rows; HAVING follows it on groups" },
          { ar: "HAVING أسرع دائماً فاستعملها فقط", en: "HAVING is always faster, use it alone" },
          { ar: "WHERE تعمل فقط مع SELECT", en: "WHERE works only with SELECT" },
        ],
        correct: 1,
        explain: { ar: "WHERE تفلتر الصفوف الأفراد قبل بناء السلال، وHAVING تفلتر السلال الناتجة عن GROUP BY — سؤال التمييز المفضل في الامتحانات.", en: "WHERE filters individual rows before the baskets are built; HAVING filters the baskets GROUP BY produced — the exams' favourite distinction question." },
      },
      {
        q: { ar: "ماذا يفعل UPDATE بلا شرط WHERE؟", en: "What does UPDATE without a WHERE clause do?" },
        options: [
          { ar: "يرفض التنفيذ ويظهر خطأ", en: "Refuses to run and raises an error" },
          { ar: "يعدل الصف الأول فقط", en: "Modifies only the first row" },
          { ar: "يعدل كل صفوف الجدول", en: "Modifies every row in the table" },
          { ar: "لا يعدل شيئاً", en: "Changes nothing" },
        ],
        correct: 2,
        explain: { ar: "غياب WHERE يعني «كل الصفوف» في SQL — كارثة UPDATE الشهيرة؛ والمنقذ الوحيد ROLLBACK قبل COMMIT أو النسخ الاحتياطي بعده.", en: "A missing WHERE means 'every row' in SQL — the famous UPDATE disaster; the only rescuers are ROLLBACK before COMMIT or backups after." },
      },
    ],
  },

  // ───────────────────────── l137 ─────────────────────────
  {
    id: "l137",
    moduleId: "m14",
    order: 7,
    level: "intermediate",
    title: {
      ar: "التطبيع: 1NF و 2NF و 3NF",
      en: "Normalization: 1NF, 2NF & 3NF",
    },
    summary: {
      ar: "لماذا نطبع؟ الشذوذات الثلاثة في الجدول الفوضوي، ثم الصعود درجة درجة عبر 1NF و2NF و3NF بمثال واحد متطور، ومتى تتوقف عن التطبيع عمداً.",
      en: "Why normalize? The three anomalies of the messy table, then climbing step by step through 1NF, 2NF and 3NF with one evolving example, and when to deliberately stop.",
    },
    durationMin: 22,
    sections: [
      {
        heading: { ar: "لماذا نطبع؟ الشذوذات الثلاثة", en: "Why Normalize? The Three Anomalies" },
        body: {
          ar: "التطبيع (Normalization) منهج تنظيف تصميمك من التكرار والاعتماديات المعيبة، وقد وُلد في ورقة كود نفسها — وهو CILO 2 في مادة قواعد البيانات: «التطبيع وإنتاج النماذج المنطقية».\n\nإليك الجدول الفوضوي الذي سيرافقك طول الدرس — قاعدة بيانات تسجيل كُتبت كما يرويها موظف غير مصمم:",
          en: "Normalization is the method of cleansing your design of redundancy and defective dependencies, born in Codd's very paper — and it is CILO 2 of your database course: 'normalization and producing logical models'.\n\nMeet the messy table that will accompany you the whole lesson — an enrolment database written exactly as a non-designer clerk would tell it:",
        },
        code: {
          lang: "text",
          snippet: "ENROLLED_FLAT — the unnormalized mess\nstudent_id | full_name | courses              | dept_name | dept_phone\n101        | Ahmed     | IT6005, IT6008       | ICT       | 17888888\n102        | Fatima    | IT6005               | ICT       | 17888888\n103        | Yusuf     | IT6012, IT6008       | Business  | 17887777\n\nTry these everyday operations on it:\n1) UPDATE the ICT phone -> must edit EVERY ICT row (update anomaly)\n2) INSERT a new department with no students yet -> impossible (insert anomaly)\n3) DELETE Yusuf (last Business student) -> the department vanishes too (delete anomaly)",
        },
      },
      {
        heading: { ar: "1NF: قيمة ذرية واحدة لكل خلية", en: "1NF: One Atomic Value per Cell" },
        body: {
          ar: "الشكل الطبيعي الأول يقول قاعدة واحدة: كل خلية تحمل قيمة ذرية واحدة ( indivisible) — لا قائمة، ولا فواصل، ولا حقل متعدد داخل الخلية.\n\nعمود courses في جدولنا الفوضوي يحمل «IT6005, IT6008» — خليتان صرختا في بيت واحد. العلاج: صف مستقل لكل تسجيل، فيصبح لكل طالب-مقرر صفه الخاص.\n\nوالآن انكشف المفتاح المركب: الصف لم يعد يتعرف به student_id وحده (تكرر)، بل بالزوج (student_id, course_id) — وهذا التركيب هو بذرة الدرس التالي.\n\n- القاعدة: قيم ذرية فقط، وكل صف فريد\n- الشذوذ الذي عالجناه: لا يمكنك الاستعلام عن مقرر واحد بسهولة أو فرض مفتاح واضح",
          en: "First normal form states one rule: every cell holds a single indivisible value — no lists, no commas, no sub-fields inside a cell.\n\nThe courses column in our messy table carries 'IT6005, IT6008' — two cells screaming inside one house. The cure: a separate row per enrolment, giving each student-course pair its own row.\n\nAnd now the composite key surfaces: a row is no longer identified by student_id alone (it repeats), but by the pair (student_id, course_id) — this combination is the seed of the next section.\n\n- The rule: atomic values only, every row unique\n- The anomaly we cured: you could not easily query a single course or enforce a clear key",
        },
        code: {
          lang: "text",
          snippet: "ENROLLED_1NF — one atomic value per cell\nstudent_id | course_id | full_name | dept_name | dept_phone\n101        | IT6005    | Ahmed     | ICT       | 17888888\n101        | IT6008    | Ahmed     | ICT       | 17888888\n102        | IT6005    | Fatima    | ICT       | 17888888\n103        | IT6012    | Yusuf     | Business  | 17887777\n103        | IT6008    | Yusuf     | Business  | 17887777\n\nprimary key now COMPOSITE: (student_id, course_id)",
        },
      },
      {
        heading: { ar: "2NF: لا اعتماد على نصف المفتاح", en: "2NF: No Dependency on Half the Key" },
        body: {
          ar: "الشكل الطبيعي الثاني يظهر فقط حين يكون مفتاحك مركباً — ولهذا قلنا إن 1NF بذرة هذا الدرس. القاعدة: كل خاصية غير مفتاحية يجب أن تعتمد على المفتاح كاملاً، لا على جزء منه (لا اعتماد جزئي Partial Dependency).\n\nفي جدولنا: full_name وdept_name وdept_phone تعتمد على student_id وحده — نصف المفتاح فقط! فالطالب نفسه بكل بياناته يتكرر في كل صف مقرر يأخذه.\n\nالعلاج النمطي: افصل الحقائق إلى جداولها — حقائق الطالب في جدول الطالب، وحقائق التسجيل (مثل الدرجة والفصل) تبقى في جدول التسجيل لأنها فعلاً تعتمد على الزوج كاملاً.",
          en: "Second normal form appears only when your key is composite — which is why we called 1NF this lesson's seed. The rule: every non-key attribute must depend on the whole key, not on part of it (no partial dependency).\n\nIn our table: full_name, dept_name and dept_phone depend on student_id alone — just half the key! The same student with all his facts repeats in every course row he takes.\n\nThe standard cure: separate the facts into their own tables — student facts in the student table, while enrolment facts (like grade and term) stay in the enrolment table because they truly depend on the whole pair.",
        },
        code: {
          lang: "text",
          snippet: "Split by dependency: two tables instead of one\nSTUDENT_2NF                       ENROLMENT_2NF\nstudent_id | full_name | dept     student_id | course_id | term\n101        | Ahmed     | ICT      101        | IT6005    | 2025-1\n102        | Fatima    | ICT      101        | IT6008    | 2025-2\n103        | Yusuf     | Business 102        | IT6005    | 2025-1\n                                  103        | IT6012    | 2025-1\n                                  103        | IT6008    | 2025-1\n\nfull_name now depends on the WHOLE single-column key student_id\nAhmed stored ONCE — no matter how many courses he takes",
        },
      },
      {
        heading: { ar: "3NF: لا اعتماد متسلسل، ولمحة عن BCNF", en: "3NF: No Chains, and a Glimpse of BCNF" },
        body: {
          ar: "الشكل الطبيعي الثالث يقص الاعتماد المتسلسل (Transitive Dependency): خاصية غير مفتاحية تعتمد على خاصية غير مفتاحية أخرى — A ← B ← C بدل الجميع يعتمدون على المفتاح مباشرة.\n\nفي جدول الطالب: dept_name يعتمد على student_id نعم — لكن dept_phone لا تعتمد على student_id، بل على dept_name! سلسلة: student_id ← dept_name ← dept_phone. ولهذا يتكرر هاتف القسم مع كل طالبه (شذوذ التحديث من جديد).\n\nالعلاج: انزع الحقيقة إلى بيتها — جدول department يحمل الاسم والهاتف مرة واحدة، وجدول الطالب يحمل رمز القسم فقط كمفتاح أجنبي.\n\nوفوق 3NF تقف BCNF (شكل بويس-كود) — النسخة الصارمة التي تشترط أن كل مُحدِّد (Determinant) يكون مفتاحاً مرشحاً؛ ستقابلها نظرياً في مرجع Silberschatz، وعملياً 3NF تكفي معظم الأنظمة الجامعية والصناعية.",
          en: "Third normal form cuts transitive dependency: a non-key attribute depending on another non-key attribute — A ← B ← C instead of everyone depending on the key directly.\n\nIn the student table: dept_name depends on student_id, yes — but dept_phone does not depend on student_id; it depends on dept_name! A chain: student_id ← dept_name ← dept_phone. That is why the department phone repeats with every student (the update anomaly again).\n\nThe cure: relocate the fact to its own home — a department table holding the name and phone once, while the student table keeps only the department code as a foreign key.\n\nAnd above 3NF stands BCNF (Boyce-Codd normal form) — the strict edition requiring every determinant to be a candidate key; you will meet it theoretically in Silberschatz, while practically 3NF satisfies most university and industrial systems.",
        },
        code: {
          lang: "sql",
          snippet: "-- The journey ends: 3NF tables on Oracle\nCREATE TABLE department (\n    dept_code   VARCHAR2(10) PRIMARY KEY,\n    dept_name   VARCHAR2(40) NOT NULL,\n    dept_phone  VARCHAR2(15)            -- now lives in ONE row only\n);\n\nCREATE TABLE student (\n    student_id  NUMBER(5)    PRIMARY KEY,\n    full_name   VARCHAR2(60) NOT NULL,\n    dept_code   VARCHAR2(10) REFERENCES department(dept_code)\n);\n\nCREATE TABLE course (\n    course_id   CHAR(7)      PRIMARY KEY,\n    title       VARCHAR2(80) NOT NULL\n);\n\nCREATE TABLE enrolment (\n    student_id  NUMBER(5)    REFERENCES student(student_id),\n    course_id   CHAR(7)      REFERENCES course(course_id),\n    term        VARCHAR2(10) NOT NULL,\n    grade       CHAR(2),\n    PRIMARY KEY (student_id, course_id)\n);\n\n-- the phone update anomaly is gone: one row, one edit, done",
        },
      },
      {
        heading: { ar: "متى تتوقف عن التطبيع؟", en: "When Do You Stop Normalizing?" },
        body: {
          ar: "التطبيع فضيلة، والإفراط فيه عيب: كل فصل إضافي = JOIN إضافي في كل استعلام، وكل JOIN = عمل للمعالج. قاعدة الصناعة العملية:\n\n- صمم حتى 3NF كخط الأساس: بيانات نظيفة بلا شذوذات\n- وتوقف هناك: 3NF نقطة التوازن الذهبي بين النقاء والأداء\n- أعد التطبيع عمداً (Denormalization) حين يدفعك الأداء: تقارير القراءة الثقيلة قد تستنسخ حقائق مكررة لتشتري سرعة بنقاء — قرار واعٍ موثق، لا فوضى\n\nوثّق دائماً سبب أي انحراف عن 3NF في تقرير التصميم؛ في مادتك سيسأل المقيّم: «لماذا يوجد تكرار هنا؟» — والفرق بين المهندس والهاوي أن جوابك جاهز.",
          en: "Normalization is a virtue, and overdoing it is a flaw: every extra split = one extra JOIN in every query, and every JOIN = processor work. The practical industry rule:\n\n- Design up to 3NF as the baseline: clean data without anomalies\n- And stop there: 3NF is the golden balance point between purity and performance\n- Denormalize deliberately when performance pushes you: heavy read-only reports may duplicate facts to buy speed with purity — a conscious documented decision, never chaos\n\nAlways document why any deviation from 3NF exists in your design report; in your course the assessor will ask: 'why is there repetition here?' — and the difference between the engineer and the amateur is that your answer is ready.",
        },
        table: {
          caption: { ar: "الأشكال الطبيعية: القاعدة والشذوذ الذي تعالجه", en: "Normal forms: the rule and the anomaly each one fixes" },
          headers: [
            { ar: "الشكل", en: "Form" },
            { ar: "القاعدة", en: "Rule" },
            { ar: "الشذوذ المعالج", en: "Anomaly fixed" },
          ],
          rows: [
            [
              { ar: "1NF", en: "1NF" },
              { ar: "قيمة ذرية واحدة لكل خلية وصفوف فريدة", en: "One atomic value per cell, unique rows" },
              { ar: "قوائم محشوة في خلية واحدة تمنع الاستعلام والمفاتيح الواضحة", en: "Lists stuffed in one cell blocking queries and clear keys" },
            ],
            [
              { ar: "2NF", en: "2NF" },
              { ar: "لا اعتماد جزئي على نصف مفتاح مركب", en: "No partial dependency on half a composite key" },
              { ar: "تكرار حقائق الطالب مع كل مقرر (شذوذ إدراج وتحديث)", en: "Student facts repeating with every course (insert/update anomalies)" },
            ],
            [
              { ar: "3NF", en: "3NF" },
              { ar: "لا اعتماد متسلسل بين خاصيتين غير مفتاحيتين", en: "No transitive dependency between non-key attributes" },
              { ar: "هاتف القسم يتكرر ويُنسى تحديثه (شذوذ تحديث وحذف)", en: "Department phone repeating and forgotten in updates (update/delete anomalies)" },
            ],
            [
              { ar: "BCNF", en: "BCNF" },
              { ar: "كل محدد يجب أن يكون مفتاحاً مرشحاً — نسخة 3NF الصارمة", en: "Every determinant must be a candidate key — strict 3NF" },
              { ar: "حالات نادرة من مفاتيح متراكبة متداخلة", en: "Rare overlapping-composite-key corner cases" },
            ],
          ],
        },
        tip: {
          ar: "خطة الامتحان الذهنية لتطبيق الأشكال: (1) هل توجد قوائم داخل خلية؟ ارفع لـ1NF. (2) هل المفتاح مركب وعمود يعتمد على نصفه؟ ارفع لـ2NF. (3) هل عمودان غير مفتاحيين يتبعان أحدهما الآخر؟ ارفع لـ3NF — بهذا الترتيب دائماً.",
          en: "The mental exam recipe: (1) lists inside a cell? raise to 1NF. (2) composite key with a column depending on half of it? raise to 2NF. (3) two non-key columns following each other? raise to 3NF — always in that order.",
        },
      },
    ],
    keyPoints: [
      { ar: "الجدول غير المطبيع يسبب شذوذات الإدراج والتحديث والحذف", en: "The unnormalized table causes insert, update and delete anomalies" },
      { ar: "1NF: قيمة ذرية واحدة لكل خلية — لا قوائم بعد اليوم", en: "1NF: one atomic value per cell — no lists ever again" },
      { ar: "2NF تعالج الاعتماد الجزئي على نصف مفتاح مركب — بفصل حقائق الطرفين", en: "2NF fixes partial dependency on half a composite key — by separating each side's facts" },
      { ar: "3NF تقص الاعتماد المتسلسل: الحقائق غير المباشرة تنزع إلى بيتها", en: "3NF cuts transitive dependency: indirect facts move to their own home" },
      { ar: "3NF خط الأساس الصناعي؛ والتطبيع العكسي قرار أداء واعٍ وموثق", en: "3NF is the industrial baseline; denormalization is a conscious documented performance decision" },
    ],
    quiz: [
      {
        q: { ar: "خلية تحوي \"IT6005, IT6008\" — أي قاعدة تكسر؟", en: "A cell containing \"IT6005, IT6008\" — which rule does it break?" },
        options: [
          { ar: "قاعدة 3NF فقط", en: "Only 3NF" },
          { ar: "قاعدة 2NF فقط", en: "Only 2NF" },
          { ar: "ذرية القيمة في 1NF", en: "Atomicity of the value in 1NF" },
          { ar: "لا تكسر شيئاً — تصميم مقبول", en: "Nothing — an acceptable design" },
        ],
        correct: 2,
        explain: { ar: "1NF تشترط قيمة واحدة غير قابلة للتجزئة في كل خلية؛ القائمة المفصولة بفواصل أول ما ينظف في رحلة التطبيع.", en: "1NF demands one indivisible value per cell; the comma-separated list is the very first thing the normalization journey cleans." },
      },
      {
        q: { ar: "عمود يعتمد على جزء من مفتاح مركب — أي شكل يعالجه؟", en: "A column depending on part of a composite key — which form fixes it?" },
        options: [
          { ar: "1NF", en: "1NF" },
          { ar: "2NF", en: "2NF" },
          { ar: "3NF", en: "3NF" },
          { ar: "BCNF فقط", en: "Only BCNF" },
        ],
        correct: 1,
        explain: { ar: "2NF موجودة خصيصاً لعلاج الاعتماد الجزئي Partial Dependency: فصل الجدول بحيث تعتمد كل خاصية على المفتاح كاملاً.", en: "2NF exists precisely to cure partial dependency: splitting the table so every attribute depends on the whole key." },
      },
      {
        q: { ar: "هاتف القسم محفوظ في جدول الطالب ويتكرر مع كل طالب — هذه:", en: "The department phone stored in the student table, repeating per student — this is:" },
        options: [
          { ar: "اعتماد جزئي يعالجه 2NF", en: "A partial dependency fixed by 2NF" },
          { ar: "اعتماد متسلسل يعالجه 3NF", en: "A transitive dependency fixed by 3NF" },
          { ar: "تكرار طبيعي لا ضرر منه", en: "Harmless natural repetition" },
          { ar: "خطأ في القيود فقط", en: "A mere constraint error" },
        ],
        correct: 1,
        explain: { ar: "student_id يحدد dept_name وdept_name يحدد dept_phone: سلسلة عبر غير مفتاح — العلاج إزالة الحقيقة إلى جدول department مستقل.", en: "student_id determines dept_name which determines dept_phone: a chain through a non-key — cured by relocating the fact to an independent department table." },
      },
      {
        q: { ar: "متى تقرر إعادة التطبيع (Denormalization) عمداً؟", en: "When do you deliberately choose denormalization?" },
        options: [
          { ar: "دائماً — لأنه أفضل للاستعلامات كلها", en: "Always — it is better for all queries" },
          { ar: "أبداً — التطبيع واجب مطلق", en: "Never — normalization is an absolute duty" },
          { ar: "عندما تفرضه متطلبات أداء القراءة، بقرار موثق", en: "When read-performance requirements force it, as a documented decision" },
          { ar: "عندما ينسى المصمم قواعد 2NF", en: "When the designer forgets 2NF rules" },
        ],
        correct: 2,
        explain: { ar: "التطبيع العكسي صفقة واعية: تضحي بشيء من النقاء لتشتري سرعة في تقارير ثقيلة — وتوثيق السبب هو ما يميز المهندس.", en: "Denormalization is a conscious trade: sacrifice some purity to buy speed in heavy reports — and documenting the reason is what marks the engineer." },
      },
    ],
  },

  // ───────────────────────── l138 ─────────────────────────
  {
    id: "l138",
    moduleId: "m14",
    order: 8,
    level: "intermediate",
    title: {
      ar: "HTML: بنية صفحات الويب",
      en: "HTML: Structuring Web Pages",
    },
    summary: {
      ar: "كيف يصل HTML من الخادم إلى متصفحك، تشريح العناصر والسمات، الهيكل الدلالي header/nav/main/article/footer، والنماذج، وبناء موقع متعدد الصفحات بروابط نسبية.",
      en: "How HTML travels from server to browser, anatomy of elements and attributes, the semantic skeleton header/nav/main/article/footer, forms, and building a multi-page site with relative links.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "كيف يعمل الويب؟ تذكير سريع", en: "How the Web Works: A Quick Recap" },
        body: {
          ar: "راجع معي رحلة الثواني الخمس التي تعلمتها في وحدات الشبكات، لأن مادة Web Fundamentals مبنية فوقها مباشرة:\n\n- تكتب عنوان URL في المتصفح فيستخرج منه DNS عنوان IP للخادم\n- يفتح المتصفح اتصال TCP ويطلق طلب HTTP: «GET /index.html أرجو»\n- يجيب الخادم برمز حالة 200 ومعه الملف المطلوب — وHTTP يحدد معاني الطرائق والرموز (RFC 9110)\n- يفسر المتصفح ملف HTML ويرسم الصفحة: العناوين والفقرات والصور والروابط\n\nالخلاصة الهندسية: HTML ليس «برمجة» بل لغة توصيف (Markup) تشرح للمتصفح معنى كل قطعة محتوى — والمعنى هو ما ستبنيه اليوم.",
          en: "Review with me the five-second journey you learned in the networking modules, because Web Fundamentals is built directly on top of it:\n\n- You type a URL; DNS extracts the server's IP address from it\n- The browser opens a TCP connection and fires an HTTP request: 'GET /index.html please'\n- The server answers with status code 200 plus the requested file — HTTP defines the methods' and codes' semantics (RFC 9110)\n- The browser interprets the HTML file and paints the page: headings, paragraphs, images, links\n\nThe engineering takeaway: HTML is not 'programming' but a markup language explaining to the browser the meaning of each content piece — and meaning is what you build today.",
        },
      },
      {
        heading: { ar: "تشريح العنصر والهيكل العظمي للصفحة", en: "Element Anatomy & the Page Skeleton" },
        body: {
          ar: "كل صفحة HTML شبكية من العناصر (Elements)، والعنصر صناعة ثلاثية: وسم فتح <p> ثم المحتوى ثم وسم إغلاق </p> — وبين قوسي وسم الفتح تسكن السمات (Attributes) مثل href=\"labs.html\".\n\n- العلامة <a> رابط وسمته href وجهته؛ و<img> صورة وسمتاها src المصدر وalt النص البديل\n- بعض العناصر ذاتية الإغلاق لا تحمل محتوى نصياً مثل <img>\n- التعليق <!-- هكذا --> يشرح للمصمم ويتجاهله المتصفح\n\nوكل صفحة محترمة تبدأ بالهيكل العظمي المقدس — احفظه غيباً كما حفظت الأبجدية:\n\n- <!DOCTYPE html>: إعلان أن هذه HTML5 حديثة\n- <html lang=\"...\">: جذر الصفحة ولغتها\n- <head>: ما لا يُرى — العنوان والترميز ووصف الصفحة\n- <body>: كل ما يُرى — المحتوى الفعلي كله",
          en: "Every HTML page is a lattice of elements, and an element is a three-part manufacture: an opening tag <p>, the content, then a closing tag </p> — and inside the opening tag's brackets live the attributes, like href=\"labs.html\".\n\n- The <a> element is a link with href as its destination; <img> is an image with src its source and alt its fallback text\n- Some elements are self-closing with no textual content, like <img>\n- A comment <!-- like this --> explains to the designer and is ignored by the browser\n\nAnd every respectable page starts with the sacred skeleton — memorize it as you did the alphabet:\n\n- <!DOCTYPE html>: declaring this is modern HTML5\n- <html lang=\"...\">: the page's root and its language\n- <head>: the invisible — title, encoding, page description\n- <body>: the visible — all the actual content",
        },
        code: {
          lang: "html",
          snippet: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">              <!-- correct Arabic rendering -->\n  <title>My first page</title>\n</head>\n<body>\n  <h1>Hello, networks!</h1>\n  <p>My first paragraph on the real web.</p>\n  <!-- the browser never shows this comment -->\n</body>\n</html>",
        },
      },
      {
        heading: { ar: "عناصر المحتوى اليومية", en: "The Everyday Content Elements" },
        body: {
          ar: "مفرداتك الأولى في لغة الويب — ستكتبها مئات المرات في مشروع المادة:\n\n- العناوين h1 حتى h6: هرمية منطقية؛ h1 واحد للصفحة ثم h2 للأقسام — ليس حجماً بل بنية\n- <p> الفقرة، و<ul>/<ol> القائمتان غير المرقمة والمرقمة مع <li> لكل بند\n- <a href=\"...\"> الرابط — قلب الويب كله، والاسم اختصار Anchor\n- <img src=\"...\" alt=\"...\"> الصورة — وalt ليس ترفاً: قارئ الشاشة للكفيف يقرؤه، والمتصفح يعرضه عند فشل التحميل\n\nوالروابط النسبية سر الموقع متعدد الصفحات: href=\"labs.html\" يعني «الملف المجاور في المجلد نفسه»، وhref=\"images/star.png\" يعني «انزل مجلد images» — وبهذا ينتقل الزائر بين صفحاتك بلا عنوان كامل",
          en: "Your first vocabulary in the web's language — you will write these hundreds of times in the course project:\n\n- Headings h1 through h6: a logical hierarchy; one h1 per page then h2 for sections — structure, not size\n- <p> the paragraph; <ul>/<ol> the unordered and ordered lists with <li> per item\n- <a href=\"...\"> the link — the very heart of the web, the name short for Anchor\n- <img src=\"...\" alt=\"...\"> the image — and alt is not luxury: the blind user's screen reader speaks it, and the browser shows it when loading fails\n\nAnd relative links are the multi-page site's secret: href=\"labs.html\" means 'the sibling file in this folder', href=\"images/star.png\" means 'step into the images folder' — this is how visitors move between your pages with no full address",
        },
        code: {
          lang: "html",
          snippet: "<h1>Networking Lab</h1>\n<h2>Cables</h2>\n\n<p>Three cable families dominate modern LANs:</p>\n\n<ul>\n  <li>Copper UTP — cheap and everywhere</li>\n  <li>Fiber optics — long distance, no interference</li>\n  <li>Wireless — no cable at all</li>\n</ul>\n\n<p>Read the <a href=\"labs.html\">full lab list</a> or\n   <a href=\"contact.html\">contact the team</a>.</p>\n\n<img src=\"images/star.png\" alt=\"Star topology: a switch connected to four PCs\">",
        },
      },
      {
        heading: { ar: "البنية الدلالية: معنى قبل شكل", en: "Semantic Structure: Meaning Before Looks" },
        body: {
          ar: "ثورة HTML5 الكبرى أن عناصرها صارت تسمي المعنى لا الشكل: <header> ليس «شريطاً أعلى الصفحة» بل «مقدمة الصفحة أو قسمها» — وهذا المعنى تقرؤه ثلاثة جمهور: محركات البحث (تحسين ظهورك SEO)، وقارئات الشاشة (إتاحة الوصول للكفيف — التزام أخلاقي وقانوني تعرفه مادتك)، والمطور الذي يرث شيفرك بعد سنة (قابلية الصيانة — CILO 2).\n\nالقاعدة الذهبية للموقع متعدد الصفحات — مشروعك المباشر: header وnav وfooter يتكرران في كل صفحة بهوية موحدة، وmain يحتضن المحتوى الفريد لكل صفحة وحده. زائر موقعك يعرف دائماً أين هو: نفس السقف، أرضية متجددة.",
          en: "HTML5's great revolution: its elements name the meaning, not the looks: <header> is not 'a bar at the top' but 'the introductory zone of a page or section' — and this meaning is read by three audiences: search engines (your SEO), screen readers (accessibility for the blind — an ethical and legal duty your course covers), and the developer inheriting your code a year later (maintainability — CILO 2).\n\nThe golden rule of the multi-page site — your direct project: header, nav and footer repeat on every page with one identity, while main embraces each page's unique content alone. Your visitor always knows where they are: the same ceiling, a renewing floor.",
        },
        table: {
          caption: { ar: "العناصر الدلالية وغرضها", en: "Semantic elements and their purpose" },
          headers: [
            { ar: "العنصر", en: "Element" },
            { ar: "غرضه", en: "Purpose" },
          ],
          rows: [
            [
              { ar: "<header>", en: "<header>" },
              { ar: "مقدمة الصفحة: الشعار وعنوان الموقع", en: "The page's introduction: logo and site title" },
            ],
            [
              { ar: "<nav>", en: "<nav>" },
              { ar: "كتلة التنقل الرئيسية: قائمة الروابط", en: "The main navigation block: the links list" },
            ],
            [
              { ar: "<main>", en: "<main>" },
              { ar: "المحتوى الفريد لهذه الصفحة — مرة واحدة فقط", en: "This page's unique content — once only" },
            ],
            [
              { ar: "<section>", en: "<section>" },
              { ar: "قسم موضوعي متجانس داخل الصفحة", en: "A thematic grouping inside the page" },
            ],
            [
              { ar: "<article>", en: "<article>" },
              { ar: "كتلة محتوى مستقلة قابلة لإعادة الاستخدام منفردة", en: "A standalone, reusable content block" },
            ],
            [
              { ar: "<footer>", en: "<footer>" },
              { ar: "خاتمة الصفحة: معلومات الاتصال وحقوق النشر", en: "The page's closing: contact info and copyright" },
            ],
          ],
        },
      },
      {
        heading: { ar: "النماذج وبناء الموقع كاملاً", en: "Forms & Building the Complete Site" },
        body: {
          ar: "النموذج (Form) هو جسر المستخدم إلى الخادم: حقل إدخال وزر إرسال، والبيانات تسافر بأسمائها — هنا سر سمة name: هذا الاسم الذي سيصلك في الخادم، فبدونه البيانات يتيمة.\n\n- <form action=\"/subscribe\" method=\"post\">: وجهة البيانات وطريقة إرسالها\n- <label for=\"email\">: نص الحقل — اربطه بمعرف الحقل لتحصل قارئات الشاشة عليه بالنقر\n- <input type=\"email\" ...>: المتصفح يتحقق من الصيغة مجاناً بلا برمجة\n\nوإليك الصفحة الكاملة التي تجمع كل مفاهيم الدرس: هيكل دلالي، قائمة تنقل بروابط نسبية، صورة بنص بديل، ونموذج — أساس مشروعك متعدد الصفحات. وبعد البناء تحقق من سلامتك عبر مدقق W3C (validator.w3.org) — عادة مهنية تكشف وسوماً مفتوحة ونسيان alt قبل أن يراها المقيّم.",
          en: "The form is the user's bridge to the server: an input field and a submit button, and data travels under its names — here is the secret of the name attribute: it is the name that will arrive at the server, and without it the data is orphaned.\n\n- <form action=\"/subscribe\" method=\"post\">: where the data goes and how\n- <label for=\"email\">: the field's caption — link it to the field's id so screen readers grab it on click\n- <input type=\"email\" ...>: the browser validates the format for free, no code\n\nAnd here is the complete page gathering every concept of this lesson: semantic skeleton, a navigation list with relative links, an image with alternative text, and a form — the seed of your multi-page project. After building, verify your health through the W3C validator (validator.w3.org) — a professional habit exposing unclosed tags and missing alt before the assessor sees them.",
        },
        code: {
          lang: "html",
          snippet: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>CNSS Lab — Network Basics</title>\n</head>\n<body>\n  <header>\n    <h1>CNSS Networking Lab</h1>\n    <nav>\n      <ul>\n        <li><a href=\"index.html\">Home</a></li>\n        <li><a href=\"labs.html\">Labs</a></li>\n        <li><a href=\"contact.html\">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n\n  <main>\n    <section>\n      <h2>Latest lab</h2>\n      <article>\n        <h3>Build your first star topology</h3>\n        <p>Four PCs, one switch — the shape of every modern LAN.</p>\n        <img src=\"images/star.png\" alt=\"Star topology diagram: a central switch with four connected PCs\">\n      </article>\n    </section>\n\n    <section>\n      <h2>Join the mailing list</h2>\n      <form action=\"/subscribe\" method=\"post\">\n        <label for=\"email\">Your email</label>\n        <input type=\"email\" id=\"email\" name=\"email\" required>\n        <button type=\"submit\">Subscribe</button>\n      </form>\n    </section>\n  </main>\n\n  <footer>\n    <p>© CNSS-edu — <a href=\"contact.html\">Contact us</a></p>\n  </footer>\n</body>\n</html>",
        },
        tip: {
          ar: "خدم محلي مجاني لمشروعك: نفّذ python3 -m http.server داخل مجلد صفحاتك ثم افتح localhost:8000 — موقعك الحقيقي على متصفحك دون أي رفع، كما ستفعل في تسليم المادة.",
          en: "A free local service for your project: run python3 -m http.server inside your pages folder then open localhost:8000 — your real site in your browser with zero uploading, exactly as you will submit in the course.",
        },
      },
    ],
    keyPoints: [
      { ar: "HTML لغة توصيف تشرح المعنى؛ والمتصفح يطلبها عبر HTTP من الخادم", en: "HTML is a markup language explaining meaning; the browser requests it over HTTP" },
      { ar: "العنصر = وسم فتح + محتوى + وسم إغلاق، والسمات في وسم الفتح", en: "Element = opening tag + content + closing tag, with attributes in the opening tag" },
      { ar: "الهيكل المقدس: DOCTYPE ثم html ثم head غير المرئي وbody المرئي", en: "The sacred skeleton: DOCTYPE, html, invisible head, visible body" },
      { ar: "العناصر الدلالية تخدم SEO والإتاحة والصيانة — <main> فريد لكل صفحة", en: "Semantic elements serve SEO, accessibility and maintenance — <main> is unique per page" },
      { ar: "alt للصور واجب إتاحة؛ وname في النموذج هو اسم البيانات لدى الخادم", en: "alt on images is an accessibility duty; name in forms is the data's server-side name" },
      { ar: "الروابط النسبية + تكرار header/nav/footer = موقع متعدد صفحات متسق", en: "Relative links + repeated header/nav/footer = a consistent multi-page site" },
    ],
    commands: [
      { cmd: "python3 -m http.server 8000", desc: { ar: "قدّم موقعك محلياً من مجلد الصفحات عبر المتصفح", en: "Serve your site locally from the pages folder to your browser" } },
      { cmd: "curl -I http://localhost:8000/index.html", desc: { ar: "اطلب رؤوس HTTP لصفحتك وتأكد من رمز 200", en: "Request your page's HTTP headers and confirm code 200" } },
    ],
    quiz: [
      {
        q: { ar: "أين يسكن المحتوى المرئي للصفحة كلها؟", en: "Where does all of a page's visible content live?" },
        options: [
          { ar: "داخل <head>", en: "Inside <head>" },
          { ar: "داخل <body>", en: "Inside <body>" },
          { ar: "داخل <title>", en: "Inside <title>" },
          { ar: "داخل <!DOCTYPE html>", en: "Inside <!DOCTYPE html>" },
        ],
        correct: 1,
        explain: { ar: "head يحمل المعلومات الخلفية (العنوان والترميز) بينما body يحمل كل ما يراه الزائر — الفصل الأول الذي يتعلمه مصمم الويب.", en: "head carries background information (title, encoding) while body carries everything the visitor sees — the first separation a web designer learns." },
      },
      {
        q: { ar: "ما الغرض الأول لسمة alt في <img>؟", en: "What is the primary purpose of the alt attribute on <img>?" },
        options: [
          { ar: "تكبير الصورة تلقائياً", en: "Automatically enlarging the image" },
          { ar: "وصف الصورة لقارئات الشاشة وعند فشل التحميل", en: "Describing the image for screen readers and failed loads" },
          { ar: "ضبط سرعة تحميل الصورة", en: "Controlling the image's load speed" },
          { ar: "لا فائدة عملية لها", en: "It has no practical use" },
        ],
        correct: 1,
        explain: { ar: "alt نزعة إتاحة: قارئ شاشة الكفيف يقرؤه للمستخدم، والمتصفح يعرضه مكان الصورة الفاشلة — ومحركات البحث تستأنس به أيضاً.", en: "alt is accessibility at heart: the blind user's screen reader speaks it, the browser shows it in place of a failed image — and search engines smile at it too." },
      },
      {
        q: { ar: "أي عنصر يحتضن المحتوى الفريد لكل صفحة ويكرر مرة واحدة؟", en: "Which element embraces each page's unique content and occurs exactly once?" },
        options: [
          { ar: "<nav>", en: "<nav>" },
          { ar: "<footer>", en: "<footer>" },
          { ar: "<main>", en: "<main>" },
          { ar: "<section>", en: "<section>" },
        ],
        correct: 2,
        explain: { ar: "<main> مرة واحدة في الصفحة ويحمل محتواها المتمايز؛ بينما header/nav/footer تتكرر عبر صفحات الموقع بالهوية نفسها.", en: "<main> occurs once per page and holds its differentiating content; header/nav/footer repeat across the site's pages with the same identity." },
      },
      {
        q: { ar: "رابط href=\"labs.html\" يشير إلى:", en: "The link href=\"labs.html\" points to:" },
        options: [
          { ar: "ملف labs.html في المجلد نفسه (رابط نسبي)", en: "The labs.html file in the same folder (a relative link)" },
          { ar: "موقع خارجي كامل بالضرورة", en: "Necessarily a full external site" },
          { ar: "بريد إلكتروني", en: "An email address" },
          { ar: "موقع تخزين الصور حصراً", en: "Exclusively an image storage location" },
        ],
        correct: 0,
        explain: { ar: "الروابط النسبية تُحل من موقع الصفحة الحالية — أسلوب التنقل الطبيعي بين صفحات موقعك في المشروع.", en: "Relative links resolve from the current page's location — the natural navigation style between your project's own pages." },
      },
    ],
  },

  // ───────────────────────── l139 ─────────────────────────
  {
    id: "l139",
    moduleId: "m14",
    order: 9,
    level: "intermediate",
    title: {
      ar: "CSS: تنسيق متسق وقابل للصيانة",
      en: "CSS: Consistent, Maintainable Styling",
    },
    summary: {
      ar: "فصل المحتوى عن الشكل، الصياغة والمحددات وشلال الأولوية، نموذج الصندوق بطبقاته، الألوان والوحدات، وورقة أنماط واحدة لموقع كامل مع flexbox واستعلام الوسائط.",
      en: "Separating content from style, syntax, selectors and the cascade, the box model layers, colors and units, and one stylesheet for a whole site with flexbox and a media query.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "لماذا نفصل المحتوى عن الشكل؟", en: "Why Separate Content from Style?" },
        body: {
          ar: "المشهد الكابوسي الذي وُجد CSS لعلاجه: موقع من عشر صفحات كُتب تنسيقه داخل HTML نفسها بسمة style في كل فقرة. قرر المدير تغيير لون العناوين من الأزرق إلى البرتقالي — عشرة ملفات تُفتح، وثلاثون سطراً تُعدل، وواحدة تُنسى فيبدو الموقع مهترئاً.\n\nالمشهد بعد CSS: ورقة أنماط واحدة تستدعيها كل الصفحات؛ قرار اللون يُغيَّر في سطر واحد فيتغير الموقع كله في ثانية، اتساقاً تلقائياً لا يدوياً.\n\n- HTML يحدد ما هو المحتوى وبنيته\n- CSS يحدد كيف يبدو — في ملف مستقل .css\n- الميزة المزدوجة: اتساق فوري عبر الصفحات + صيانة في نقطة واحدة\n\nوهذا حرفياً CILO 2 من مادة الويب: «تنفيذ تنسيق متسق وقابل للصيانة» — الدرس كله في خدمته.",
          en: "The nightmare scene CSS was invented to cure: a ten-page site styled inside the HTML itself with a style attribute on every paragraph. Management decides headings change from blue to orange — ten files opened, thirty lines edited, one forgotten so the site looks decayed.\n\nThe scene after CSS: one stylesheet invoked by every page; the colour decision changes in a single line and the whole site updates in a second — automatically consistent, not manually.\n\n- HTML defines what the content is and its structure\n- CSS defines how it looks — in a separate .css file\n- The twin payoff: instant cross-page consistency + maintenance at a single point\n\nAnd this is literally CILO 2 of your web course: 'implement consistent and maintainable styling' — this whole lesson serves it.",
        },
      },
      {
        heading: { ar: "الصياغة والمحددات وشلال الأولوية", en: "Syntax, Selectors & the Cascade" },
        body: {
          ar: "صياغة CSS جملة واحدة تتكرر: محدد { خاصية: قيمة; } — المحدد يقول «من»، والخاصية تقول «ماذا»، والقيمة تقول «كيف». مثالك الأول:\n\np { color: #1e293b; line-height: 1.6; }\n\nثلاثة محددات تتدرج في القوة:\n\n- محدد العنصر p: كل فقرة في كل صفحة — العريض والأعم أثراً والأضعف سلطة\n- محدد الصنف .card: كل ما يحمل السمة class=\"card\" — حصان العمل اليومي؛ قابل لإعادة الاستخدام مرات عديدة في الصفحة\n- محدد المعرف #site-title: العنصر الوحيد حامل id معيناً — حاد لكن أناني: عنصر واحد فقط\n\nثم الشلال (Cascade): حين تتصادم قاعدتان على العنصر ذاته، تفوز الأعلى نوعية (Specificity): التنسيق المضمّن inline فوق الجميع، ثم id، ثم class، ثم العنصر. وعند التساوي تفوز القاعدة الأحدث كتابة. توقع الفائز قبل أن تفتح المتصفح — هذه مهارة الامتحان والعمل معاً.",
          en: "CSS syntax is one repeating sentence: selector { property: value; } — the selector says 'who', the property says 'what', the value says 'how'. Your first example:\n\np { color: #1e293b; line-height: 1.6; }\n\nThree selectors rank by power:\n\n- The element selector p: every paragraph on every page — broadest in reach, weakest in authority\n- The class selector .card: anything carrying class=\"card\" — the daily workhorse; reusable many times per page\n- The id selector #site-title: the single element bearing a specific id — sharp but selfish: one element only\n\nThen the cascade: when two rules collide on the same element, the higher specificity wins: inline styling beats all, then id, then class, then element. On a tie, the rule written later wins. Predict the winner before opening the browser — an exam and workplace skill together.",
        },
        table: {
          caption: { ar: "سلّم الأولوية: من يفوز عند التصادم؟", en: "The priority ladder: who wins on collision?" },
          headers: [
            { ar: "المرتبة", en: "Rank" },
            { ar: "المصدر", en: "Source" },
            { ar: "قوة الأولوية", en: "Specificity weight" },
          ],
          rows: [
            [
              { ar: "1", en: "1" },
              { ar: "تنسيق مضمّن style=\"...\" على العنصر نفسه", en: "Inline style=\"...\" on the element itself" },
              { ar: "الأعلى — يهزم كل ما سواه", en: "Highest — beats everything below" },
            ],
            [
              { ar: "2", en: "2" },
              { ar: "محدد المعرف #id", en: "The id selector #id" },
              { ar: "عالية — صنف واحد لا يهزمه", en: "High — no single class beats it" },
            ],
            [
              { ar: "3", en: "3" },
              { ar: "محدد الصنف .class", en: "The class selector .class" },
              { ar: "متوسطة — تفوق محدد العنصر", en: "Medium — beats the element selector" },
            ],
            [
              { ar: "4", en: "4" },
              { ar: "محدد العنصر p", en: "The element selector p" },
              { ar: "الأدنى — نقطة البداية الافتراضية", en: "Lowest — the default starting point" },
            ],
          ],
        },
        code: {
          lang: "css",
          snippet: "/* three selectors, one collision to predict */\np {\n  color: #334155;            /* element: weakest */\n}\n.note {\n  color: #0f766e;            /* class beats element */\n}\n#intro {\n  color: #b91c1c;            /* id beats class */\n}\n\n/* the battleground: <p class=\"note\" id=\"intro\" style=\"color:#111827\">...\n   winner: inline #111827 — remove it and #intro wins,\n   remove that and .note wins, then the humble p. */",
        },
      },
      {
        heading: { ar: "نموذج الصندوق: كل شيء صندوق", en: "The Box Model: Everything Is a Box" },
        body: {
          ar: "المتصفح يرى كل عنصر صندوقاً مستطيلاً من أربع طبقات متحدة المركز — فهمها يعني فهم 80% من مشاكل التصميم:\n\n- المحتوى (Content): النص أو الصورة نفسها — بأبعاد width وheight\n- الحاشية (Padding): فراغ تنفّس داخلي يفصل المحتوى عن حافته؛ جزء من خلفية العنصر\n- الحد (Border): الخط المحيط، له سماكة ونمط ولون\n- الهامش (Margin): فراغ خارجي يدفع الجيران بعيداً — شفاف لا يرسم بل يباعد\n\nوسؤال المبتدئ الأزلي: «ضبطت width لكن العنصر أعرض!» — لأن العرض الافتراضي = المحتوى + الحاشية + الحد. خاصية box-sizing: border-box تضم الحساب كله في القيمة المعلنة، وستضعها معظم المشاريع على كل عنصر بدايةً.",
          en: "The browser sees every element as a rectangular box of four concentric layers — understanding them means understanding 80% of layout problems:\n\n- Content: the text or image itself — sized by width and height\n- Padding: inner breathing space separating content from its edge; part of the element's background\n- Border: the surrounding line, with width, style and colour\n- Margin: outer space pushing neighbours away — transparent, drawn nowhere, spacing only\n\nAnd the eternal beginner question: 'I set width but the element is wider!' — because the default total width = content + padding + border. The box-sizing: border-box property folds all of it into the declared value, and most projects apply it to everything first.",
        },
        diagram: {
          kind: "layers",
          title: { ar: "طبقات نموذج الصندوق من الداخل للخارج", en: "Box model layers from inside out" },
          items: [
            { ar: "المحتوى Content: النص/الصورة نفسها", en: "Content: the text/image itself" },
            { ar: "الحاشية Padding: تنفّس داخلي بخلفية العنصر", en: "Padding: inner breathing with the element's background" },
            { ar: "الحد Border: الخط المحيط بسماكة ونمط ولون", en: "Border: the surrounding line with width, style, colour" },
            { ar: "الهامش Margin: فراغ خارجي يباعد الجيران", en: "Margin: outer spacing that keeps neighbours apart" },
          ],
        },
      },
      {
        heading: { ar: "الألوان والوحدات: لغة القيم", en: "Colours & Units: The Language of Values" },
        body: {
          ar: "الألوان في CSS ثلاث لهجات: الأسماء (red)، و rgb() و rgba() بشفافية، ورموز hex الست عشرية #RRGGBB — وهي التي تعرفها أصلاً من درس التمثيل الثنائي في وحدة العناوين: كل قناة بايتان ست عشريتين (00 حتى ff) أي 256 درجة، فتتولد 16,777,216 لوناً. لون علامتك التجارية في المنصة #c2410c: قناة الأحمر c2 والخضراء 41 والزرقاء 0c.\n\nوالوحدات ثلاث عائلات:\n\n- px البكسل: ثابت مطلق — للحدود والتفاصيل الدقيقة\n- % النسبة: من العنصر الأب — عرض نصف الحاوية 50%\n- rem: مضاعفات حجم خط الجذر (16px افتراضياً) — ملك النصوص المتجاوبة وإتاحة الوصول؛ نص 1.25rem = 20px يعمل مع إعدادات تكبير المستخدم",
          en: "Colours in CSS come in three dialects: names (red), rgb() and rgba() with transparency, and hexadecimal codes #RRGGBB — which you already know from the binary-representation lesson in the addressing module: each channel is two hexadecimal digits (00 to ff), 256 levels, yielding 16,777,216 colours. This platform's brand colour #c2410c: red channel c2, green 41, blue 0c.\n\nAnd units come in three families:\n\n- px the pixel: fixed and absolute — for borders and fine details\n- % the percentage: relative to the parent — half the container is 50%\n- rem: multiples of the root font size (16px default) — king of responsive, accessible text; 1.25rem = 20px that respects the user's zoom settings",
        },
        tip: {
          ar: "خدعة الحفظ: قناة الأحمر القصوى ff0000 حمراء صافية، و000000 سوداء لغياب الضوء، وffffff بيضاء بكماله — ومن الثلاثة يُبنى إحساسك بالرموز فوراً.",
          en: "A memory hook: the maxed red channel ff0000 is pure red, 000000 is black from zero light, ffffff is fully-lit white — build your instinct for codes from these three.",
        },
      },
      {
        heading: { ar: "ورقة واحدة للموقع كله + flexbox واستعلام وسائط", en: "One Sheet for the Whole Site + Flexbox + a Media Query" },
        body: {
          ar: "هذا هو نمط مشروعك النهائي: ملف styles.css واحد يستدعيه كل صفحات الموقع بالسطر نفسه في head، فتتطابق الألوان والمسافات والخطوط تطابقاً بنيوياً لا اجتهادياً — هذا هو «التنسيق المتسق القابل للصيانة» نصاً.\n\nثم أداتا التخطيط الحديثتان برأس واحد:\n\n- flexbox: اتجاه عناصر داخل حاوية بسطر واحد — display: flex مع justify-content لتوزيعها وgap للمسافات؛ صفحة تنقل أفقية في سطرين من الشيفرة\n- استعلام الوسائط @media: قواعد تُفعَّل عند شرط الشاشة — تحت 600px عمّد صف التنقل عمودياً فتتلائم صفحاتك مع الهواتف (تجاوب Responsive بلا مكتبات)\n\nوخصومة أخيرة تذكّرها من درس الأولوية: التنسيق المضمّن style في HTML يهزم ورقتك — فامنعه من مشروعك إلا نادراً، وكل قرار تنسيق يسكن في ملف CSS وحده.",
          en: "Here is your final project's pattern: one styles.css file invoked by every site page with the same line in head, so colours, spacing and fonts match structurally, not by aspiration — this is 'consistent and maintainable styling' verbatim.\n\nThen the two modern layout tools, one head each:\n\n- flexbox: arranging items inside a container on one axis — display: flex with justify-content distributing them and gap for spacing; a horizontal nav bar in two lines of code\n- the media query @media: rules activating on a screen condition — under 600px stack the nav vertically so your pages fit phones (responsive without libraries)\n\nAnd a final feud to remember from the priority lesson: inline style in HTML defeats your stylesheet — banish it from your project, and let every styling decision live in the CSS file alone.",
        },
        code: {
          lang: "css",
          snippet: "/* styles.css — ONE stylesheet for the WHOLE site */\n\n/* element selector: the site-wide baseline */\nbody {\n  font-family: system-ui, sans-serif;\n  color: #1e293b;\n  line-height: 1.6;\n}\n\n/* class: the reusable component look */\n.card {\n  background-color: #f8fafc;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  padding: 1.5rem;          /* inner breathing space */\n  margin-bottom: 1rem;      /* pushes the next card away */\n}\n\n/* id: the one unique accent */\n#site-title {\n  color: #c2410c;            /* hex: r=c2 g=41 b=0c */\n}\n\n/* flexbox: the horizontal nav */\n.nav-bar {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n/* media query: phones stack the nav */\n@media (max-width: 600px) {\n  .nav-bar { flex-direction: column; }\n  .card   { padding: 0.75rem; }\n}",
        },
      },
    ],
    keyPoints: [
      { ar: "فصل HTML (المحتوى) عن CSS (الشكل) = اتساق تلقائي وصيانة بنقطة واحدة", en: "Separating HTML (content) from CSS (looks) = automatic consistency and single-point maintenance" },
      { ar: "الصياغة: محدد { خاصية: قيمة; } والعناصر والفئات والمعرفات ثلاث قوى", en: "Syntax: selector { property: value; } with elements, classes and ids as three powers" },
      { ar: "الأولوية: inline فوق id فوق class فوق عنصر — توقع الفائز ذهنياً", en: "Specificity: inline over id over class over element — predict the winner mentally" },
      { ar: "نموذج الصندوق: محتوى ثم حاشية ثم حد ثم هامش — وbox-sizing يضم الحساب", en: "Box model: content, padding, border, margin — and box-sizing folds the maths" },
      { ar: "hex: قناة × بايت ست عشري — نفس عالمك الثنائي من وحدة العناوين", en: "hex: channel × one hexadecimal byte — your binary world from the addressing module again" },
      { ar: "ورقة واحدة لكل الصفحات + flexbox للتخطيط وmedia query للهواتف", en: "One sheet for all pages + flexbox for layout and a media query for phones" },
    ],
    quiz: [
      {
        q: { ar: "أيهما ينتصر على عنصر واحد عليه قاعدتا .note و#intro؟", en: "Which wins on one element carrying both a .note and an #intro rule?" },
        options: [
          { ar: ".note الصنف", en: "The .note class" },
          { ar: "#intro المعرف", en: "The #intro id" },
          { ar: "الأحدث كتابة دائماً", en: "Always the one written later" },
          { ar: "تتشاركان القيمة مناصفة", en: "They split the value evenly" },
        ],
        correct: 1,
        explain: { ar: "سلّم الأولوية: id أقوى من class بلا تعادل؛ والتساوي الحقيقي فقط بين مستويين متماثلين يُحسم بحداثة الكتابة.", en: "The specificity ladder: id overpowers class with no contest; recency only breaks genuine ties between identical levels." },
      },
      {
        q: { ar: "الطبقات الأربع لنموذج الصندوق من الداخل للخارج:", en: "The box model's four layers from inside out:" },
        options: [
          { ar: "هامش، حد، حاشية، محتوى", en: "Margin, border, padding, content" },
          { ar: "محتوى، حاشية، حد، هامش", en: "Content, padding, border, margin" },
          { ar: "محتوى، حد، هامش، حاشية", en: "Content, border, margin, padding" },
          { ar: "حاشية، محتوى، هامش، حد", en: "Padding, content, margin, border" },
        ],
        correct: 1,
        explain: { ar: "النص في القلب، تنفّس الحاشية حوله، ثم الخط المحيط، ثم الفراغ الخارجي الذي يباعد الجيران — هذا الترتيب لا يتبدل.", en: "The text at the heart, padding breathing around it, then the surrounding line, then the outer space spacing neighbours — this order never changes." },
      },
      {
        q: { ar: "ماذا تفعل الحاشية padding تحديداً؟", en: "What exactly does padding do?" },
        options: [
          { ar: "تباعد بين العناصر المتجاورة خارجياً", en: "Spaces neighbouring elements apart externally" },
          { ar: "فراغ داخلي بين المحتوى وحدّ العنصر، بخلفيته", en: "Inner space between content and the border, with the element's background" },
          { ar: "تغيير لون النص", en: "Changes text colour" },
          { ar: "ضبط عرض الصفحة كاملة", en: "Sets the whole page's width" },
        ],
        correct: 1,
        explain: { ar: "الحاشية تنفس داخلي يورث خلفية العنصر ويكبره بصرياً؛ أما المباعدة الخارجية فمهمة الهامش margin — التباس التصحيح الشهير.", en: "Padding is inner breathing inheriting the element's background and growing it; external spacing is margin's job — the famously corrected confusion." },
      },
      {
        q: { ar: "النهج الصحيح لتنسيق موقع من عشر صفحات باتساق؟", en: "The right approach to styling a ten-page site consistently?" },
        options: [
          { ar: "سمة style مضمّنة في كل عنصر بكل صفحة", en: "An inline style attribute on every element of every page" },
          { ar: "نسخ قواعد CSS داخل كل صفحة HTML على حدة", en: "Copying CSS rules inside each HTML page separately" },
          { ar: "ملف CSS خارجي واحد تستدعيه كل الصفحات", en: "One external CSS file invoked by all pages" },
          { ar: "الاعتماد على الافتراضات دون CSS أصلاً", en: "Relying on defaults with no CSS at all" },
        ],
        correct: 2,
        explain: { ar: "ورقة واحدة = قرار واحد يتسرب للجميع: هذا حرفياً CILO 2 «تنسيق متسق وقابل للصيانة» — والبديلان الأولان فوضى تكرار معروفة المصير.", en: "One sheet = one decision flowing to all: literally CILO 2 'consistent and maintainable styling' — the first two alternatives are repetition chaos with known fates." },
      },
    ],
  },

  // ───────────────────────── l140 ─────────────────────────
  {
    id: "l140",
    moduleId: "m14",
    order: 10,
    level: "intermediate",
    title: {
      ar: "مدخل إلى برمجة الشبكات ببايثون و socket",
      en: "Intro to Network Programming: Python & Sockets",
    },
    summary: {
      ar: "جسر وحدتك إلى سنة رابعة: ما هو المقبس، زوج خادم/عميل TCP كامل قابل للتشغيل، وأخوه UDP، لماذا يبرمج مهندس الشبكات، ونظرة على REST وواجهات البرمجة.",
      en: "Your bridge to year four: what a socket is, a fully runnable TCP server/client pair, its UDP sibling, why network engineers code, and a first look at REST and APIs.",
    },
    durationMin: 25,
    sections: [
      {
        heading: { ar: "المقبس: باب الشبكة في برنامجك", en: "The Socket: Your Program's Network Door" },
        body: {
          ar: "كل ما تعلمته عن TCP وUDP وIP والمنافذ كان حتى الآن تشغيلاً وإعداداً؛ اليوم تفتح الباب من الجهة الأخرى: البرمجة. المقبس (Socket) هو نقطة النهاية البرمجية التي يتحدث منها برنامجك إلى الشبكة — وقد صممه مبرمجو بيركلي في الثمانينيات فصار الواجهة القياسية في كل أنظمة التشغيل تقريباً.\n\n- هوية المقبس = عنوان IP + رقم منفذ: (10.0.0.1, 5000)\n- الخادم يمتلك المقبس ويستمع؛ والعميل يطرق الباب متصلاً\n- نوعان يرثان بروتوكولَي النقل: SOCK_STREAM لـ TCP الموثوق المترابط، وSOCK_DGRAM لـ UDP السريع عديم الاتصال\n\nهذه بذرة مادة سنتك الرابعة IT7520 (قابلية برمجة الشبكات والأمن: sockets وترميز البيانات والأتمتة وواجهات API) — وكل دقيقة هنا رصيد مباشر هناك.",
          en: "Everything you learned about TCP, UDP, IP and ports was operation and configuration so far; today you open the door from the other side: programming. The socket is the programmatic endpoint from which your program speaks to the network — designed at Berkeley in the 1980s, it became the standard interface on nearly every operating system.\n\n- A socket's identity = IP address + port number: (10.0.0.1, 5000)\n- The server owns the socket and listens; the client knocks while connecting\n- Two types inheriting the transport protocols: SOCK_STREAM for reliable, connection-oriented TCP, and SOCK_DGRAM for fast, connectionless UDP\n\nThis is the seed of your fourth-year course IT7520 (Network & Security Programmability: sockets, data encoding, automation, APIs) — and every minute here is direct credit there.",
        },
      },
      {
        heading: { ar: "زوج TCP كامل قابل للتشغيل", en: "A Runnable TCP Pair" },
        body: {
          ar: "احتفظ بنمط الاستدعاءات الخمسة عن ظهر قلب — إنه نصف امتحان المقبس في كل جامعة:\n\n- الخادم: socket() ينشئ المقبس، ثم bind() يربطه بعنوان ومنفذ، ثم listen() يفتح باب الانتظار، ثم accept() يستقبل العميل القادم\n- العميل: socket() ثم connect() مباشرة — وعندها تحدث المصافحة الثلاثية التي تعرفها من وحدة TCP: SYN ثم SYN-ACK ثم ACK\n- بعد الاتصال: send()/recv() لتبادل البيانات، وclose() للوداع\n\nالشيفرة التالية كاملة قابلة للتشغيل في مختبرك: شغّل الخادم في نافذة طرفية والعميل في الثانية وراقب الحوار — أول برنامج شبكي حقيقي في حياتك.",
          en: "Keep the five-call pattern by heart — it is half of every university's socket exam:\n\n- The server: socket() creates it, bind() ties it to an address and port, listen() opens the waiting door, accept() receives the arriving client\n- The client: socket() then connect() directly — and right there the three-way handshake you know from the TCP module fires: SYN, SYN-ACK, ACK\n- After connecting: send()/recv() exchange data, and close() says goodbye\n\nThe following code fully runs in your lab: start the server in one terminal and the client in a second, and watch the dialogue — the first real network program of your life.",
        },
        diagram: {
          kind: "flow",
          title: { ar: "تسلسل استدعاءات المقبس في لقاء TCP", en: "Socket call sequence of a TCP meeting" },
          items: [
            { ar: "الخادم: socket() ينشئ المقبس", en: "Server: socket() creates it" },
            { ar: "الخادم: bind() يمتلك العنوان والمنفذ", en: "Server: bind() owns the address and port" },
            { ar: "الخادم: listen() يفتح طابور الانتظار", en: "Server: listen() opens the waiting queue" },
            { ar: "العميل: connect() يطلق المصافحة الثلاثية SYN/SYN-ACK/ACK", en: "Client: connect() fires the SYN/SYN-ACK/ACK handshake" },
            { ar: "الخادم: accept() يسلّم مقبس الحوار للعميل", en: "Server: accept() hands the dialogue socket to the client" },
            { ar: "الطرفان: send() وrecv() يتبادلان البيانات", en: "Both sides: send() and recv() exchange data" },
            { ar: "الطرفان: close() يغلقان الاتصال بسلام", en: "Both sides: close() ends the connection gracefully" },
          ],
        },
        code: {
          lang: "python",
          snippet: "# tcp_server.py — a minimal TCP echo server\nimport socket\n\nserver = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # TCP\nserver.bind((\"0.0.0.0\", 5000))     # own the IP:port endpoint\nserver.listen(1)                   # open the door (queue = 1)\nprint(\"Listening on port 5000...\")\n\nconn, client_addr = server.accept()        # blocks until a client knocks\nprint(\"Client connected:\", client_addr)\n\ndata = conn.recv(1024)             # read up to 1024 bytes\nprint(\"Received:\", data.decode())\nconn.sendall(b\"ACK: message received\")     # answer back\n\nconn.close()                       # close the dialogue socket\nserver.close()                     # then the listening door itself",
        },
        tip: {
          ar: "ترتيب لا يخطئ: الخادم socket-bind-listen-accept والعميل socket-connect — إن عكسته فستقابلك رسالة خطأ عنوان مستخدم أو رفض اتصال، وهي إشارة الترتيب لا الفشل.",
          en: "An unfailing order: server socket-bind-listen-accept, client socket-connect — reverse it and you will meet an address-in-use or connection-refused error, which signals ordering, not doom.",
        },
      },
      {
        heading: { ar: "أخوه الأخف: UDP بلا اتصال", en: "Its Lighter Sibling: UDP, No Connection" },
        body: {
          ar: "قارن الشيفرة وحدها وستفهم الفلسفة: لا listen ولا accept ولا مصافحة — فـUDP لا يفتح اتصالاً أصلاً. الخادم يستقبل حزمة ومعها عنوان مرسلها في خطوة واحدة بrecvfrom، ويرد بsendto إلى ذاك العنوان.\n\n- الخصلتان اللتان تعرفهما من وحدة النقل حاضرتان هنا: لا ضمان وصول ولا ترتيب — أرسل وانسَ\n- الثمن المكتوم: الحزمة قد تضيع أو تتأخر، والخادم لا يعلم\n- الجائزة: زمن إرسال أقصر بلا طقوس اتصال — لهذا تحبه DNS المرتجلة والألعاب السريعة والبث المرئي",
          en: "Compare the code alone and you understand the philosophy: no listen, no accept, no handshake — UDP never opens a connection at all. The server receives a packet together with its sender's address in one step via recvfrom, and replies with sendto to that address.\n\n- The two traits you know from the transport module are present: no delivery guarantee and no ordering — fire and forget\n- The hidden cost: the packet may vanish or lag, and the server never knows\n- The prize: shorter send time with zero connection ceremony — which is why quick DNS, fast games and video streaming love it",
        },
        code: {
          lang: "python",
          snippet: "# udp_server.py — connectionless: no listen, no accept\nimport socket\n\nserver = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)  # UDP\nserver.bind((\"0.0.0.0\", 5001))\nprint(\"UDP server ready on port 5001\")\n\ndata, addr = server.recvfrom(1024)   # data AND sender address together\nprint(\"From\", addr, \":\", data.decode())\nserver.sendto(b\"UDP ACK\", addr)      # reply straight to that address\n\n# udp_client.py — the matching other half\n# client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\n# client.sendto(b\"Hello UDP\", (\"127.0.0.1\", 5001))\n# reply, _ = client.recvfrom(1024)\n# print(\"Server said:\", reply.decode())",
        },
      },
      {
        heading: { ar: "لماذا يبرمج مهندس الشبكات؟", en: "Why Does a Network Engineer Code?" },
        body: {
          ar: "سؤالك المشروع الآن وقد بلغت نهاية الوحدة: ماذا تصنع البرمجة بمهنتك؟ ثلاث مهام لا تنتهي في حياتك اليومية يجيب عنها الكود وحده:\n\n- أتمتة الإعداد: تهيئة 48 منفذاً على مبدّل عبر netmiko ببضعة أسطر بدل ساعتَي كتابة يدوية عرضة للسهو\n- تحليل السجلات: بايثون تقرأ ملايين أسطر syslogs وتستخرج الأنماط المشبوهة في ثوان — عين لا تنام\n- بناء الأدوات: سكربت صغير يفحص جهازاً بالـping كل دقيقة ويرسل تنبيهاً عند السقوط — نظام مراقبة بثمن قلم\n\nمهندس الشبكات الذي يبرمج يضاعف أثره؛ والذي لا يبرمج يظل مشغّلاً لأدوات غيره. سوق الخليج يدفع اليوم فرق السعر بين الرجلين — والأتمتة بوابتهما، وبايثون مفتاحها.",
          en: "Your rightful question now, having reached the module's end: what does programming do to your profession? Three endless everyday tasks that only code answers:\n\n- Config automation: provisioning 48 switch ports via netmiko in a few lines, instead of two error-prone hours of typing\n- Log analysis: Python reads millions of syslog lines and extracts suspicious patterns in seconds — an eye that never sleeps\n- Tool building: a small script pinging a device every minute and alerting on its fall — a monitoring system for the price of a pen\n\nThe network engineer who codes doubles their impact; the one who does not remains an operator of other people's tools. The Gulf market today pays the price difference between the two — automation is its gate, and Python the key.",
        },
      },
      {
        heading: { ar: "نحو REST وواجهات البرمجة", en: "Toward REST & APIs" },
        body: {
          ar: "الخطوة التالية بعد المقبس في سنتك الرابعة: واجهات REST — النمط المعماري الذي بُني عليه الويب الحديث كما عرّفه روي فيلدنغ عام 2000. جوهره بثلاث جمل:\n\n- كل شيء مورد (Resource) له عنوان URL: /v1/interfaces و/v1/devices\n- الأفعال معدودة وموحدة من HTTP: GET يقرأ وPOST ينشئ وPUT يحدّث وDELETE يحذف — نفس معاني RFC 9110 التي درستها\n- الحالة تنتقل تمثيلاً (Representation): البيانات تسافر غالباً بصيغة JSON، النص الشامل للقواميس والقوائم\n\nومكتبة requests في بايثون تجعل استهلاك هذه الواجهات أقرب إلى كتابة جملة إنجليزية — تذكّر هذا الشكل جيداً فهو قالب مئات سكربتات الأتمتة الحقيقية.",
          en: "The step after sockets in your fourth year: REST interfaces — the architectural style the modern web is built on, as Roy Fielding defined it in 2000. Its essence in three sentences:\n\n- Everything is a resource with a URL: /v1/interfaces and /v1/devices\n- The verbs are few and uniform from HTTP: GET reads, POST creates, PUT updates, DELETE removes — the same RFC 9110 semantics you studied\n- State transfers as a representation: data usually travels as JSON, the text embracing dictionaries and lists\n\nAnd Python's requests library makes consuming these interfaces closer to writing an English sentence — remember this shape well; it is the template of hundreds of real automation scripts.",
        },
        code: {
          lang: "python",
          snippet: "# rest_client.py — talking to an API with requests + json\nimport requests\n\nresp = requests.get(\"https://api.example.com/v1/interfaces\",\n                    headers={\"Accept\": \"application/json\"})\nprint(\"Status:\", resp.status_code)     # 200 = OK (RFC 9110 semantics)\n\nif resp.status_code == 200:\n    data = resp.json()                  # parse the JSON body -> dict\n    for iface in data[\"interfaces\"]:\n        print(iface[\"name\"], iface[\"status\"])\n",
        },
      },
    ],
    keyPoints: [
      { ar: "المقبس = نقطة نهاية برمجية هويتها IP + منفذ، ببابين TCP وUDP", en: "A socket = a programmatic endpoint identified by IP + port, with a TCP door and a UDP door" },
      { ar: "الخادم: socket ثم bind ثم listen ثم accept؛ والعميل: socket ثم connect — والحوار send/recv", en: "Server: socket, bind, listen, accept; client: socket, connect — then the send/recv dialogue" },
      { ar: "المصافحة الثلاثية تحدث داخل connect() في TCP؛ وUDP بلا اتصال أصلاً", en: "The three-way handshake happens inside connect() with TCP; UDP has no connection at all" },
      { ar: "UDP يضحي بالضمان مقابل السرعة — نمط DNS والألعاب والبث", en: "UDP trades guarantees for speed — the DNS, gaming and streaming pattern" },
      { ar: "مهندس الشبكات المبرمج: أتمتة الإعداد وتحليل السجلات وبناء الأدوات", en: "The coding network engineer: config automation, log analysis, tool building" },
      { ar: "REST: موارد بعناوين URL وأفعال HTTP موحدة وبيانات JSON عبر requests", en: "REST: URL-addressed resources, uniform HTTP verbs, JSON data via requests" },
    ],
    commands: [
      { cmd: "python3 tcp_server.py", desc: { ar: "شغّل الخادم في نافذة طرفية أولى واستمع", en: "Run the server in a first terminal and listen" } },
      { cmd: "python3 tcp_client.py", desc: { ar: "شغّل العميل في نافذة ثانية وشاهد الحوار", en: "Run the client in a second terminal and watch the dialogue" } },
      { cmd: "python3 -m json.tool data.json", desc: { ar: "تنسيق ملف JSON وقراءته بوضوح أثناء اختبار الواجهات", en: "Pretty-print a JSON file while testing interfaces" } },
    ],
    quiz: [
      {
        q: { ar: "نقطة النهاية للمقبس تُعرَّف بـ:", en: "A socket's endpoint is identified by:" },
        options: [
          { ar: "عنوان MAC وحده", en: "The MAC address alone" },
          { ar: "عنوان IP ورقم المنفذ معاً", en: "The IP address and port number together" },
          { ar: "اسم المضيف حصراً", en: "The hostname exclusively" },
          { ar: "رقم تسلسل الحزمة", en: "The packet's sequence number" },
        ],
        correct: 1,
        explain: { ar: "المقبس زوج (IP, Port) — مثل عنوان بيت ورقم شقة: معاً فقط يصل الرسالة إلى برنامج بعينه على جهاز بعينه.", en: "A socket is the pair (IP, port) — like a street address plus apartment number: together, and only together, the message reaches one program on one device." },
      },
      {
        q: { ar: "الترتيب الصحيح لاستدعاءات المقبس على الخادم:", en: "The correct order of socket calls on the server:" },
        options: [
          { ar: "socket ثم bind ثم listen ثم accept", en: "socket, bind, listen, accept" },
          { ar: "socket ثم listen ثم bind ثم accept", en: "socket, listen, bind, accept" },
          { ar: "bind ثم socket ثم accept ثم listen", en: "bind, socket, accept, listen" },
          { ar: "accept ثم listen ثم bind ثم socket", en: "accept, listen, bind, socket" },
        ],
        correct: 0,
        explain: { ar: "أنشئ المقبس، امتلك العنوان والمنفذ بbind، افتح باب الانتظار بlisten، ثم استقبل العميل بaccept — الترتيب القانوني الوحيد.", en: "Create the socket, own the address and port with bind, open the waiting door with listen, then receive the client with accept — the only legal order." },
      },
      {
        q: { ar: "أين تقع المصافحة الثلاثية SYN/SYN-ACK/ACK برمجياً؟", en: "Where does the SYN/SYN-ACK/ACK handshake live, programmatically?" },
        options: [
          { ar: "داخل استدعاء listen() في الخادم", en: "Inside the server's listen() call" },
          { ar: "داخل استدعاء connect() من العميل", en: "Inside the client's connect() call" },
          { ar: "داخل recv() عند كلا الطرفين", en: "Inside recv() on both sides" },
          { ar: "لا وجود لها في البرمجة إطلاقاً", en: "It does not exist in programming at all" },
        ],
        correct: 1,
        explain: { ar: "connect() هو الذي يطلق الثلاثية: ترسل النواة SYN فتجيب بSYN-ACK فتؤكد بACK — ثم فقط يعود الاستدعاء ناجحاً لبرنامجك.", en: "connect() fires the triple: the kernel sends SYN, receives SYN-ACK, confirms with ACK — only then does the call return successfully to your program." },
      },
      {
        q: { ar: "REST يعرّف الوصول إلى الموارد عبر:", en: "REST defines access to resources through:" },
        options: [
          { ar: "أفعال HTTP موحدة: GET وPOST وPUT وDELETE", en: "Uniform HTTP verbs: GET, POST, PUT, DELETE" },
          { ar: "أوامر AT للاتصال الهاتفي", en: "AT commands for dial-up" },
          { ar: "رسائل ICMP وحدها", en: "ICMP messages alone" },
          { ar: "اتصالات TCP خام بلا بروتوكول تطبيقي", en: "Raw TCP connections with no application protocol" },
        ],
        correct: 0,
        explain: { ar: "نمط فيلدنغ: كل مورد بعنوان URL، والأفعال معدودة موحّدة من HTTP ذاته — GET يقرأ وPOST ينشئ وPUT يحدّث وDELETE يحذف.", en: "Fielding's style: every resource at a URL, verbs few and uniform from HTTP itself — GET reads, POST creates, PUT updates, DELETE removes." },
      },
    ],
  },
];
