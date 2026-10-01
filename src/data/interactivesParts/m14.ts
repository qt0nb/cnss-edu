import type { LessonInteractive } from "@/lib/types";

// M14 interactive widgets ("w:<lessonId>:<n>") — one checkpoint per lesson.
// Kind mix: order ×2 (l131 CT pipeline, l140 TCP socket calls) ·
// match ×4 (l133 types, l135 ERD, l138 HTML tags, l139 box model) ·
// classify ×3 (l132 error families, l136 SQL dialects, l137 anomalies) ·
// fill ×1 (l134 Python code blanks). Rules: sectionIndex < sections.length,
// xp 8-15, bilingual mobile-length strings, fill bank = every answer + ≤3 distractors.

export const M14_INTERACTIVES: Record<string, LessonInteractive[]> = {
  l131: [
    {
      kind: "order",
      id: "w:l131:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "رتّب مسار حل المشكلة", en: "Order the problem-solving pipeline" },
      instructions: {
        ar: "اضغط خطوات التفكير الحاسوبي بالترتيب الصحيح من نص المشكلة إلى البرنامج",
        en: "Tap the computational-thinking steps in the correct order, from problem text to program",
      },
      items: [
        { ar: "افهم المشكلة وحدد المدخلات والمخرجات", en: "Understand the problem and pin inputs/outputs" },
        { ar: "جزّئها إلى قطع صغيرة قابلة للحل", en: "Decompose it into small solvable pieces" },
        { ar: "تعرف على أنماط من مشكلات حُلَّت قبل", en: "Recognize patterns from problems solved before" },
        { ar: "جرّد التفاصيل غير المؤثرة وصمّم الخوارزمية", en: "Abstract away irrelevant details and design the algorithm" },
        { ar: "تتبّع يدوياً بجدول متغيرات ثم اكتب الشيفرة واختبرها", en: "Desk-check with a variable table, then code and test" },
      ],
    },
  ],
  l132: [
    {
      kind: "classify",
      id: "w:l132:1",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "صنّف عائلة الخطأ", en: "Classify the error family" },
      instructions: {
        ar: "اضغط الحالة ثم عائلة الخطأ التي تنتمي إليها",
        en: "Tap a scenario, then the error family it belongs to",
      },
      buckets: [
        { ar: "خطأ نحوي Syntax", en: "Syntax error" },
        { ar: "خطأ زمن تشغيل Runtime", en: "Runtime error" },
        { ar: "خطأ منطقي Logic", en: "Logic error" },
      ],
      items: [
        { text: { ar: "قوس إغلاق ناقص في print", en: "A missing closing parenthesis in print" }, bucket: 0 },
        { text: { ar: "استخدام = بدل == داخل شرط if", en: "Using = instead of == inside an if" }, bucket: 0 },
        { text: { ar: "قسمة على صفر أثناء التنفيذ", en: "Division by zero during execution" }, bucket: 1 },
        { text: { ar: "فتح ملف غير موجود على القرص", en: "Opening a file that does not exist on disk" }, bucket: 1 },
        { text: { ar: "حساب المعدل ونسيان القسمة على العدد فطبع 270", en: "Averaging without dividing, printing 270" }, bucket: 2 },
        { text: { ar: "شرط أصغر من يفصل بولتين معاً فتسقط حالة الحد", en: "Two < conditions excluding the boundary case" }, bucket: 2 },
      ],
    },
  ],
  l133: [
    {
      kind: "match",
      id: "w:l133:1",
      sectionIndex: 1,
      xp: 8,
      title: { ar: "طابق النوع وقيمته", en: "Match the type to its value" },
      instructions: {
        ar: "اضغط نوع البيانات ثم قيمته الصحيحة من النوع نفسه",
        en: "Tap a data type, then its correct value of that same type",
      },
      pairs: [
        {
          left: { ar: "int", en: "int" },
          right: { ar: "42", en: "42" },
        },
        {
          left: { ar: "float", en: "float" },
          right: { ar: "2.5", en: "2.5" },
        },
        {
          left: { ar: "str", en: "str" },
          right: { ar: "\"R1-EDGE\"", en: "\"R1-EDGE\"" },
        },
        {
          left: { ar: "bool", en: "bool" },
          right: { ar: "True", en: "True" },
        },
        {
          left: { ar: "type()", en: "type()" },
          right: { ar: "الدالة التي تكشف نوع أي قيمة", en: "The function revealing any value's type" },
        },
      ],
    },
  ],
  l134: [
    {
      kind: "fill",
      id: "w:l134:1",
      sectionIndex: 4,
      xp: 12,
      title: { ar: "أكمل سكربت الأجهزة", en: "Complete the devices script" },
      instructions: {
        ar: "اختر من البنك الكلمة الصحيحة لكل فراغ في الشيفرة",
        en: "Pick the correct word for each blank in the code from the bank",
      },
      template: {
        ar: "devices = {\"R1\": \"10.0.0.1\", \"SW1\": \"10.0.0.3\"}\n\nfor name, ip in ____.items():\n    print(f\"{name} -> ____\")",
        en: "devices = {\"R1\": \"10.0.0.1\", \"SW1\": \"10.0.0.3\"}\n\nfor name, ip in ____.items():\n    print(f\"{name} -> ____\")",
      },
      blanks: [
        { answer: { ar: "devices", en: "devices" }, hint: { ar: "القاموس الذي نمرّ على عناصره", en: "The dictionary we walk over" } },
        { answer: { ar: "ip", en: "ip" }, hint: { ar: "المتغير الثاني في فك التعبئة", en: "The second unpacked variable" } },
      ],
      bank: [
        { ar: "devices", en: "devices" },
        { ar: "ip", en: "ip" },
        { ar: "keys", en: "keys" },
        { ar: "append", en: "append" },
      ],
    },
  ],
  l135: [
    {
      kind: "match",
      id: "w:l135:1",
      sectionIndex: 3,
      xp: 10,
      title: { ar: "طابق رمز ERD بمعناه", en: "Match ERD symbols to meanings" },
      instructions: {
        ar: "اضغط رمز مخطط الكيان والعلاقة ثم معناه الصحيح",
        en: "Tap an ERD symbol, then its correct meaning",
      },
      pairs: [
        {
          left: { ar: "المستطيل", en: "Rectangle" },
          right: { ar: "كيان Entity: شيء نحفظ بياناته", en: "Entity: a thing we store data about" },
        },
        {
          left: { ar: "البيضاوي", en: "Oval" },
          right: { ar: "خاصية Attribute، وتحتها خط إن كانت مفتاحاً", en: "Attribute; underlined when it is a key" },
        },
        {
          left: { ar: "المعيّن", en: "Diamond" },
          right: { ar: "علاقة Relationship: الفعل الرابط بين كيانين", en: "Relationship: the linking verb between entities" },
        },
        {
          left: { ar: "أصابع غراب القدم", en: "Crow's foot" },
          right: { ar: "تكامل «العديد» N في جهة العلاقة", en: "The 'many' N cardinality on that side" },
        },
        {
          left: { ar: "الجدول الوسيط", en: "Junction table" },
          right: { ar: "حل علاقة M:N بمفتاح مركب من طرفيها", en: "The M:N solution with a composite key of both sides" },
        },
      ],
    },
  ],
  l136: [
    {
      kind: "classify",
      id: "w:l136:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "صنّف أمر SQL في لهجته", en: "Classify each SQL statement's dialect" },
      instructions: {
        ar: "اضغط الأمر ثم اللهجة الوظيفية التي ينتمي إليها",
        en: "Tap a statement, then the functional dialect it belongs to",
      },
      buckets: [
        { ar: "DQL: قراءة البيانات", en: "DQL: reading data" },
        { ar: "DML: تعديل المحتوى", en: "DML: changing content" },
        { ar: "DDL: تعريف البنية", en: "DDL: defining structure" },
      ],
      items: [
        { text: { ar: "SELECT * FROM student", en: "SELECT * FROM student" }, bucket: 0 },
        { text: { ar: "SELECT COUNT(*) FROM enrolment", en: "SELECT COUNT(*) FROM enrolment" }, bucket: 0 },
        { text: { ar: "INSERT INTO student VALUES (101, ...)", en: "INSERT INTO student VALUES (101, ...)" }, bucket: 1 },
        { text: { ar: "UPDATE student SET email = ... WHERE id = 101", en: "UPDATE student SET email = ... WHERE id = 101" }, bucket: 1 },
        { text: { ar: "DELETE FROM enrolment WHERE grade IS NULL", en: "DELETE FROM enrolment WHERE grade IS NULL" }, bucket: 1 },
        { text: { ar: "CREATE TABLE course (...)", en: "CREATE TABLE course (...)" }, bucket: 2 },
        { text: { ar: "ALTER TABLE student ADD (phone VARCHAR2(15))", en: "ALTER TABLE student ADD (phone VARCHAR2(15))" }, bucket: 2 },
      ],
    },
  ],
  l137: [
    {
      kind: "classify",
      id: "w:l137:1",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "صنّف الشذوذ والشكل الذي يعالجه", en: "Classify the anomaly and its fixing form" },
      instructions: {
        ar: "اضغط العيب ثم الشكل الطبيعي الذي يعالجه",
        en: "Tap the defect, then the normal form that fixes it",
      },
      buckets: [
        { ar: "1NF: قيم ذرية", en: "1NF: atomic values" },
        { ar: "2NF: لا اعتماد جزئي", en: "2NF: no partial dependency" },
        { ar: "3NF: لا اعتماد متسلسل", en: "3NF: no transitive dependency" },
      ],
      items: [
        { text: { ar: "خلية تحوي \"IT6005, IT6008\" بفاصلة", en: "A cell holding \"IT6005, IT6008\"" }, bucket: 0 },
        { text: { ar: "أرقام هواتف متعددة محشوة في خانة الطالب", en: "Multiple phone numbers stuffed in the student field" }, bucket: 0 },
        { text: { ar: "اسم الطالب يتكرر مع كل مقرر يسجله", en: "The student's name repeating with every enrolment" }, bucket: 1 },
        { text: { ar: "حقائق المقرر تعتمد على نصف المفتاح المركب فقط", en: "Course facts depending on half the composite key" }, bucket: 1 },
        { text: { ar: "هاتف القسم يتكرر مع كل طالبيه ويُنسى تحديثه", en: "The department phone repeating per student, missed in updates" }, bucket: 2 },
        { text: { ar: "المدينة مخزنة لأنها تتبع عمود الرمز البريدي", en: "The city stored because it follows the zip column" }, bucket: 2 },
      ],
    },
  ],
  l138: [
    {
      kind: "match",
      id: "w:l138:1",
      sectionIndex: 3,
      xp: 8,
      title: { ar: "طابق الوسم الدلالي بدوره", en: "Match semantic tags to their roles" },
      instructions: {
        ar: "اضغط عنصر HTML ثم غرضه الصحيح في بنية الصفحة",
        en: "Tap an HTML element, then its correct role in the page structure",
      },
      pairs: [
        {
          left: { ar: "<header>", en: "<header>" },
          right: { ar: "مقدمة الصفحة: الشعار وعنوان الموقع", en: "The page's intro: logo and site title" },
        },
        {
          left: { ar: "<nav>", en: "<nav>" },
          right: { ar: "كتلة التنقل: قائمة الروابط الرئيسية", en: "Navigation: the main links list" },
        },
        {
          left: { ar: "<main>", en: "<main>" },
          right: { ar: "المحتوى الفريد لهذه الصفحة، مرة واحدة", en: "This page's unique content, exactly once" },
        },
        {
          left: { ar: "<article>", en: "<article>" },
          right: { ar: "كتلة محتوى مستقلة قابلة لإعادة الاستخدام", en: "A standalone reusable content block" },
        },
        {
          left: { ar: "<footer>", en: "<footer>" },
          right: { ar: "خاتمة الصفحة: الاتصال وحقوق النشر", en: "The closing: contact and copyright" },
        },
      ],
    },
  ],
  l139: [
    {
      kind: "match",
      id: "w:l139:1",
      sectionIndex: 2,
      xp: 10,
      title: { ar: "طابق طبقات نموذج الصندوق", en: "Match the box model layers" },
      instructions: {
        ar: "اضغط الطبقة ثم وظيفتها الصحيحة",
        en: "Tap a layer, then its correct job",
      },
      pairs: [
        {
          left: { ar: "المحتوى Content", en: "Content" },
          right: { ar: "النص أو الصورة نفسها بأبعاد width/height", en: "The text/image itself, sized by width/height" },
        },
        {
          left: { ar: "الحاشية Padding", en: "Padding" },
          right: { ar: "تنفّس داخلي بخلفية العنصر قبل حافته", en: "Inner breathing with the background, before the edge" },
        },
        {
          left: { ar: "الحد Border", en: "Border" },
          right: { ar: "الخط المحيط بسماكة ونمط ولون", en: "The surrounding line with width, style, colour" },
        },
        {
          left: { ar: "الهامش Margin", en: "Margin" },
          right: { ar: "فراغ خارجي يباعد الجيران، شفاف لا يرسم", en: "Outer spacing pushing neighbours, drawn nowhere" },
        },
        {
          left: { ar: "box-sizing: border-box", en: "box-sizing: border-box" },
          right: { ar: "يضم الحساب كله في قيمة width المعلنة", en: "Folds the whole maths into the declared width" },
        },
      ],
    },
  ],
  l140: [
    {
      kind: "order",
      id: "w:l140:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "رتّب استدعاءات لقاء TCP", en: "Order the TCP meeting calls" },
      instructions: {
        ar: "اضغط استدعاءات المقبس بترتيب حدوثها من إنشاء الخادم حتى الإغلاق",
        en: "Tap the socket calls in the order they happen, from server creation to close",
      },
      items: [
        { ar: "الخادم: socket() ينشئ المقبس", en: "Server: socket() creates it" },
        { ar: "الخادم: bind() يربط العنوان والمنفذ", en: "Server: bind() ties address and port" },
        { ar: "الخادم: listen() يفتح طابور الانتظار", en: "Server: listen() opens the queue" },
        { ar: "العميل: connect() يطلق المصافحة الثلاثية", en: "Client: connect() fires the handshake" },
        { ar: "الخادم: accept() يسلم مقبس الحوار", en: "Server: accept() hands the dialogue socket" },
        { ar: "الطرفان: send() وrecv() يتبادلان البيانات", en: "Both: send() and recv() exchange data" },
        { ar: "الطرفان: close() يغلقان بسلام", en: "Both: close() ends gracefully" },
      ],
    },
  ],
};
