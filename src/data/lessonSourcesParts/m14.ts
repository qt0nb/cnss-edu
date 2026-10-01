import type { LessonSourceRef } from "@/lib/types";

// M14 lesson → source citations (sourceIds exist in src/data/sources.ts)
// Pool used: codd-1970, silberschatz-db, oracle-sql, python-docs, w3c-html,
// mdn-web, fielding-2000, kurose-ross, rfc9110, acm-cc2020.
// BPT alignment: IT6008 (l131–l134, l140), IT6005 (l135–l137),
// IT6012 (l138–l139), bridge to IT7520 (l140).

export const M14_LESSON_SOURCES: Record<string, LessonSourceRef[]> = {
  l131: [
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "إطار الكفايات العالمي يضع حل المشكلات والتفكير الحاسوبي في صميم كل برامج الحوسبة المعتمدة — الأساس الذي تنبني عليه مادة البرمجة في خطتك",
        en: "The global competency framework places problem solving and computational thinking at the core of every accredited computing programme — the foundation your programming course builds on",
      },
    },
    {
      sourceId: "python-docs",
      note: {
        ar: "الدروس الرسمية لبايثون تبدأ من تحويل المشكلة إلى خطوات ثم شيفرة — نفس مسار «المشكلة ← الخوارزمية ← البرنامج» الذي يرسمه الدرس",
        en: "The official Python tutorial begins by turning a problem into steps then code — the same problem → algorithm → program pipeline this lesson draws",
      },
    },
  ],
  l132: [
    {
      sourceId: "python-docs",
      note: {
        ar: "التوثيق الرسمي يشرح دورة تشغيل بايثون من الشيفرة إلى البايت كود ثم الآلة الافتراضية — الطريق الوسط الذي يفصّله الدرس",
        en: "The official documentation explains Python's execution cycle from source to bytecode to the virtual machine — the middle path this lesson details",
      },
    },
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "معيار ACM/IEEE يدرج ترجمة الشيفرة المصدرية إلى تنفيذية واختبارها وتصحيحها ضمن كفايات البرمجة الأساسية — CILO 2 وCILO 5 من IT6008",
        en: "The ACM/IEEE standard lists source-to-executable translation with testing and debugging among core programming competencies — IT6008's CILO 2 and CILO 5",
      },
    },
  ],
  l133: [
    {
      sourceId: "python-docs",
      note: {
        ar: "الفصول الأولى من الدروس الرسمية: المتغيرات والأنواع الأولية والشروط والمسافة البادئة — المرجع الذي تُبنى عليه أمثلة الدرس بصياغة قياسية",
        en: "The official tutorial's opening chapters: variables, primitive types, conditionals and indentation — the reference this lesson's examples follow in standard syntax",
      },
    },
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "إطار ACM/IEEE يدرج «المعرفة التفصيلية بالأنواع الأولية» ضمن كفايات البرمجة الأولى — الغطاء المعياري لموضوع المتغيرات والأنواع الأربعة في هذا الدرس",
        en: "The ACM/IEEE framework lists 'detailed knowledge of primitive data types' among the first programming competencies — the standards cover for this lesson's variables and four types",
      },
    },
  ],
  l134: [
    {
      sourceId: "python-docs",
      note: {
        ar: "فصل هياكل البيانات الرسمي: القوائم والصفوف والقواميس والدوال ونطاق المتغيرات — خريطة CILO 1 «الأنواع الأولية وهياكل البيانات الأساسية» في بايثون",
        en: "The official data structures chapter: lists, tuples, dictionaries, functions and scope — the map of CILO 1 'primitive types and basic data structures' in Python",
      },
    },
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "الكفايات العالمية تربط هياكل البيانات الأساسية بفن الحلول البرمجية — الغطاء المعياري لقوائم العناوين وقاموس الأجهزة ودوال التقرير في هذا الدرس",
        en: "The global competencies tie basic data structures to the craft of program solutions — the standards cover for this lesson's IP lists, device dictionary and report functions",
      },
    },
  ],
  l135: [
    {
      sourceId: "codd-1970",
      note: {
        ar: "الورقة المؤسِّسة نفسها: العلاقات والصفوف والأعمدة والمفاتيح بنموذجها الرياضي الذي تعرضه بطاقات هوية الدرس — أصل كل ما ستدرسه في Oracle",
        en: "The founding paper itself: relations, tuples, attributes and keys in their mathematical form — the origin of everything you will study in Oracle",
      },
    },
    {
      sourceId: "silberschatz-db",
      note: {
        ar: "المرجع القياسي يفرد فصوله الأولى لنمذجة ER والكيانات والعلاقات والتكامل — النمط الذي يحاكيه الدرس في مثال الطالب والمقرر",
        en: "The standard text devotes its opening chapters to ER modelling, entities, relationships and cardinality — the pattern this lesson mirrors in the student-course example",
      },
    },
  ],
  l136: [
    {
      sourceId: "oracle-sql",
      note: {
        ar: "مرجع Oracle الرسمي للغة SQL — قاعدة بيانات مادتك نفسها: صياغات SELECT وDML والتجميع والوصلات هنا Oracle-متوافقة جاهزة للمختبر",
        en: "Oracle's official SQL language reference — your very course database: the SELECT, DML, aggregation and join syntax here is Oracle-compatible and lab-ready",
      },
    },
    {
      sourceId: "silberschatz-db",
      note: {
        ar: "فصول SQL في المرجع القياسي تؤسس الاستعلام المنظم والمعاملات وROLLBACK — الإطار النظري وراء أوامر القراءة والكتابة في الدرس",
        en: "The standard text's SQL chapters ground structured queries, transactions and ROLLBACK — the theory behind this lesson's reading and writing statements",
      },
    },
  ],
  l137: [
    {
      sourceId: "codd-1970",
      note: {
        ar: "كود نفسه قدّم «الشكل الطبيعي» للعلاقات في الورقة ذاتها — البذرة الأصلية لسلم 1NF و2NF و3NF الذي يتسلّقه الدرس درجة درجة",
        en: "Codd himself introduced the 'normal form' for relations in that same paper — the original seed of the 1NF/2NF/3NF ladder this lesson climbs step by step",
      },
    },
    {
      sourceId: "silberschatz-db",
      note: {
        ar: "المرجع القياسي يشرح التطبيع حتى BCNF بالشذوذات الثلاثة (إدراج وتحديث وحذف) — نفس التصنيف الذي يبني عليه الدرس جدوله الختامي",
        en: "The standard text explains normalization through BCNF with the three anomalies (insert, update, delete) — the same classification behind this lesson's closing table",
      },
    },
  ],
  l138: [
    {
      sourceId: "w3c-html",
      note: {
        ar: "المواصفة المعيارية الحية لـ HTML: بنية المستند والعناصر الدلالية والنماذج والروابط — النص الناظم لكل وسم كتبه الدرس",
        en: "The living HTML standard: document structure, semantic elements, forms and links — the normative text behind every tag this lesson wrote",
      },
    },
    {
      sourceId: "mdn-web",
      note: {
        ar: "مسار تعلم HTML في MDN بأمثلة عاملة لصفحة أولى وموقع متعدد الصفحات — شريكك التطبيقي في مشروع IT6012",
        en: "MDN's HTML learning path with working first-page and multi-page examples — your practical companion for the IT6012 project",
      },
    },
    {
      sourceId: "rfc9110",
      note: {
        ar: "مراجعة كيفية وصول الصفحة: طلب GET ورمز 200 ومعاني HTTP التي يفتتح بها الدرس رحلة المتصفح والخادم",
        en: "The recap of how the page arrives: the GET request, code 200 and HTTP semantics opening the lesson's browser-to-server journey",
      },
    },
  ],
  l139: [
    {
      sourceId: "mdn-web",
      note: {
        ar: "مرجع CSS الأول مهنياً: الشلال والأولوية ونموذج الصندوق وflexbox واستعلامات الوسائط — مصدر أمثلة الدرس وأسلوب «ورقة واحدة للموقع»",
        en: "The professional first stop for CSS: the cascade, specificity, the box model, flexbox and media queries — the source of this lesson's examples and its one-sheet approach",
      },
    },
    {
      sourceId: "w3c-html",
      note: {
        ar: "المواصفة الحية تحدد بنية المستندات متعددة الصفحات التي تنسقها ورقة CSS واحدة — الجانب البنيوي لمطلب CILO 2 «تنسيق متسق قابل للصيانة»",
        en: "The living standard defines the multi-page document structure a single CSS sheet styles — the structural side of CILO 2's 'consistent, maintainable styling'",
      },
    },
  ],
  l140: [
    {
      sourceId: "kurose-ross",
      note: {
        ar: "فصل برمجة الشبكات في Kurose & Ross يشرح المقبس واستدعاءات TCP وUDP بأمثلة بايثون — الإطار الجامعي لزوج الخادم والعميل في الدرس",
        en: "Kurose & Ross's network-programming chapter explains sockets and the TCP/UDP call sequence with Python examples — the university frame for this lesson's server/client pair",
      },
    },
    {
      sourceId: "fielding-2000",
      note: {
        ar: "الفصل الذي عرّف REST من أطروحة فيلدنغ: الموارد وعناوين URL والأفعال الموحدة — الأساس النظري لمقطع الواجهات في خاتمة الدرس",
        en: "The chapter defining REST in Fielding's dissertation: resources, URLs and uniform verbs — the theory behind the closing API section",
      },
    },
    {
      sourceId: "rfc9110",
      note: {
        ar: "دلالات HTTP الحالية: GET وPOST وPUT وDELETE ورمز 200 — الأفعال التي يتحدث بها REST في مثال requests",
        en: "Current HTTP semantics: GET, POST, PUT, DELETE and code 200 — the verbs REST speaks in the requests example",
      },
    },
  ],
};
