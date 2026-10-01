import type { LessonInteractive } from "@/lib/types";

// M15 interactive widgets ("w:<lessonId>:<n>")
// Mix: fill ×3 · match ×3 · classify ×2 · order ×1 · binary ×1 — every
// sectionIndex verified < lesson.sections.length (l141:6, l142:5, l143:6,
// l144:5, l145:5, l146:5, l147:6, l148:5, l149:5, l150:5 sections).
export const M15_INTERACTIVES: Record<string, LessonInteractive[]> = {
  l141: [
    {
      kind: "fill",
      id: "w:l141:1",
      sectionIndex: 3,
      xp: 10,
      title: { ar: "أكمل حسابات قوى العدد 2", en: "Complete the powers-of-2 arithmetic" },
      instructions: {
        ar: "اختر من البنك القيمة المناسبة لكل فراغ",
        en: "Pick from the bank the value that fits each blank",
      },
      template: {
        ar: "كل بت إضافي يضاعف الاحتمالات: الثمانية الواحدة تسع ____ عنواناً، وشبكة /24 تمنح ____ عنواناً صالحاً للأجهزة بعد حجز عنواني الشبكة والبث، بينما يوفر عنونة IPv4 الكاملة (32 بتاً) نحو ____ مليار عنوان.",
        en: "Every extra bit doubles the possibilities: one octet holds ____ addresses, a /24 grants ____ usable host addresses after reserving the network and broadcast addresses, while the full 32-bit IPv4 space offers about ____ billion addresses.",
      },
      blanks: [
        { answer: { ar: "256", en: "256" }, hint: { ar: "2 مرفوعاً للقوة 8", en: "2 raised to the 8th power" } },
        { answer: { ar: "254", en: "254" }, hint: { ar: "اطرح العنوانين المحجوزين", en: "Subtract the two reserved addresses" } },
        { answer: { ar: "4.3", en: "4.3" }, hint: { ar: "قيمة 2³² بالمليارات", en: "2³² in billions" } },
      ],
      bank: [
        { ar: "256", en: "256" },
        { ar: "254", en: "254" },
        { ar: "4.3", en: "4.3" },
        { ar: "255", en: "255" },
        { ar: "65.5", en: "65.5" },
      ],
    },
  ],
  l142: [
    {
      kind: "match",
      id: "w:l142:1",
      sectionIndex: 2,
      xp: 10,
      title: { ar: "طابق المنطق بسلوكه", en: "Match each logic to its behavior" },
      instructions: {
        ar: "اضغط المفهوم من العمود الأول ثم وصفه الصحيح",
        en: "Tap a concept, then its correct description",
      },
      pairs: [
        {
          left: { ar: "AND", en: "AND" },
          right: { ar: "1 فقط عندما يكون المدخلان 1 معاً", en: "1 only when both inputs are 1" },
        },
        {
          left: { ar: "OR", en: "OR" },
          right: { ar: "1 عندما يكون أي مدخل 1 أو كلاهما", en: "1 when any input is 1, or both" },
        },
        {
          left: { ar: "NOT", en: "NOT" },
          right: { ar: "عكس قيمة المدخل الوحيد", en: "Inverts its single input" },
        },
        {
          left: { ar: "XOR", en: "XOR" },
          right: { ar: "1 فقط عندما يختلف المدخلان", en: "1 only when the inputs differ" },
        },
        {
          left: { ar: "قانون دي مورغان", en: "De Morgan's law" },
          right: { ar: "نفي AND يتحول إلى OR للنفيات", en: "Negating an AND becomes an OR of negations" },
        },
      ],
    },
  ],
  l143: [
    {
      kind: "binary",
      id: "w:l143:1",
      sectionIndex: 1,
      xp: 8,
      title: { ar: "تدريب تحويل الثمانيات الثنائية", en: "Binary octet conversion drill" },
      instructions: {
        ar: "بدّل البتات الثمانية حتى تساوي القيمة العشرية المطلوبة",
        en: "Toggle the 8 bits until they equal the target decimal value",
      },
      values: [12, 168, 200],
    },
  ],
  l144: [
    {
      kind: "classify",
      id: "w:l144:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "صنّف بيانات استبيانك", en: "Classify your survey data" },
      instructions: {
        ar: "اضغط المتغير ثم نوعه: فئوي أم عددي",
        en: "Tap a variable, then its type: categorical or numerical",
      },
      buckets: [
        { ar: "فئوي Categorical", en: "Categorical" },
        { ar: "عددي Numerical", en: "Numerical" },
      ],
      items: [
        { text: { ar: "نوع اللعبة المفضل", en: "Preferred game genre" }, bucket: 0 },
        { text: { ar: "ساعات النوم الليلة الماضية", en: "Last night's sleep hours" }, bucket: 1 },
        { text: { ar: "الجهاز الرئيسي المستخدم للعب", en: "Main device used for gaming" }, bucket: 0 },
        { text: { ar: "عدد المباريات هذا الأسبوع", en: "Matches played this week" }, bucket: 1 },
        { text: { ar: "زمن البينغ بالمللي ثانية", en: "Ping time in milliseconds" }, bucket: 1 },
        { text: { ar: "نوع اشتراك الإنترنت في المنزل", en: "Type of home internet subscription" }, bucket: 0 },
      ],
    },
  ],
  l145: [
    {
      kind: "match",
      id: "w:l145:1",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "طابق الرسم بنوع بياناته", en: "Match the chart to its data type" },
      instructions: {
        ar: "اضغط نوع الرسم ثم البيانات التي وُجد ليمثلها",
        en: "Tap a chart type, then the data it was made to represent",
      },
      pairs: [
        {
          left: { ar: "مخطط الأعمدة Bar", en: "Bar chart" },
          right: { ar: "فئات مستقلة مثل نوع اللعبة المفضل", en: "Independent categories like favorite genre" },
        },
        {
          left: { ar: "المدرج التكراري Histogram", en: "Histogram" },
          right: { ar: "بيانات مستمرة في فئات متجاورة مثل ساعات النوم", en: "Continuous data in touching bins like sleep hours" },
        },
        {
          left: { ar: "مخطط التشتت Scatter", en: "Scatter plot" },
          right: { ar: "متغيران عدديان: ساعات اللعب مقابل النوم", en: "Two numeric variables: gaming vs sleep hours" },
        },
        {
          left: { ar: "مخطط الصندوق Box plot", en: "Box plot" },
          right: { ar: "الأرقام الخمسة مع كشف القيم الشاذة", en: "The five-number summary with outlier detection" },
        },
        {
          left: { ar: "المخطط الدائري Pie", en: "Pie chart" },
          right: { ar: "حصص فئوية من كل واحد مثل توزيع الأجهزة", en: "Categorical shares of one whole like device mix" },
        },
      ],
    },
  ],
  l146: [
    {
      kind: "fill",
      id: "w:l146:1",
      sectionIndex: 4,
      xp: 10,
      title: { ar: "أكمل حسابات التسعات والفقد", en: "Complete the nines & loss arithmetic" },
      instructions: {
        ar: "اختر من البنك القيمة المناسبة لكل فراغ",
        en: "Pick from the bank the value that fits each blank",
      },
      template: {
        ar: "توافر 99% يسمح بنحو ____ ساعة توقف في الشهر، بينما 99.9% يسمح بـ ____ دقيقة فقط، ومسار من 10 قفزات توصل كل قفزة فيه 99% من الحزم يكمل بنحو ____% فقط.",
        en: "99% availability allows about ____ hours of downtime per month, while 99.9% allows only ____ minutes, and a 10-hop path delivering 99% per hop completes only about ____% of packets.",
      },
      blanks: [
        { answer: { ar: "7.3", en: "7.3" }, hint: { ar: "الفائض الشهري لتسعتين", en: "The monthly cost of two nines" } },
        { answer: { ar: "43.8", en: "43.8" }, hint: { ar: "الفائض الشهري لثلاث تسعات", en: "The monthly cost of three nines" } },
        { answer: { ar: "90", en: "90" }, hint: { ar: "0.99 مرفوعة للقوة 10", en: "0.99 raised to the 10th power" } },
      ],
      bank: [
        { ar: "7.3", en: "7.3" },
        { ar: "43.8", en: "43.8" },
        { ar: "90", en: "90" },
        { ar: "99", en: "99" },
        { ar: "8.76", en: "8.76" },
      ],
    },
  ],
  l147: [
    {
      kind: "order",
      id: "w:l147:1",
      sectionIndex: 4,
      xp: 12,
      title: { ar: "رتّب خط أنابيب البحث الكمي", en: "Order the quantitative research pipeline" },
      instructions: {
        ar: "اضغط المراحل بالترتيب الصحيح من الفكرة إلى التقرير",
        en: "Tap the stages in the correct order, from idea to report",
      },
      items: [
        { ar: "صياغة سؤال البحث والفرضيات", en: "Frame the research question & hypotheses" },
        { ar: "تصميم الاستبيان وتجربته استطلاعياً", en: "Design the questionnaire & pilot it" },
        { ar: "جمع البيانات وتنظيفها", en: "Collect the data & clean it" },
        { ar: "التحليل والرسوم", en: "Analyze & visualize" },
        { ar: "كتابة التقرير والتوثيق", en: "Write the report & cite honestly" },
      ],
    },
  ],
  l148: [
    {
      kind: "fill",
      id: "w:l148:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "أكمل حقائق مقياس ليكرت", en: "Complete the Likert scale facts" },
      instructions: {
        ar: "اختر من البنك الكلمة أو الرقم المناسب لكل فراغ",
        en: "Pick from the bank the word or number that fits each blank",
      },
      template: {
        ar: "المقياس الكلاسيكي الذي نشره ليكيرت عام 1932 يتكون من ____ نقاط تمتد من «أعارض بشدة» إلى «____»، وتُعامل بياناته بوصفها ____، فتفضَّل الوسيط والتكرارات على المتوسط.",
        en: "The classic scale Likert published in 1932 has ____ points running from «strongly disagree» to «____», and its data is treated as ____, so the median and counts are preferred over the mean.",
      },
      blanks: [
        { answer: { ar: "5", en: "5" }, hint: { ar: "عدد النقاط الأشهر عالمياً", en: "The world's most common point count" } },
        { answer: { ar: "أوافق بشدة", en: "Strongly agree" }, hint: { ar: "أعلى نقطة في المقياس", en: "The scale's top point" } },
        { answer: { ar: "ترتيبية", en: "Ordinal" }, hint: { ar: "مستوى القياس: الفروق بين النقاط غير مضمونة التساوي", en: "The measurement level: gaps between points are not guaranteed equal" } },
      ],
      bank: [
        { ar: "5", en: "5" },
        { ar: "أوافق بشدة", en: "Strongly agree" },
        { ar: "ترتيبية", en: "Ordinal" },
        { ar: "فئوية", en: "Nominal" },
        { ar: "4", en: "4" },
      ],
    },
  ],
  l149: [
    {
      kind: "match",
      id: "w:l149:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "طابق الدالة بوظيفتها", en: "Match the formula to its purpose" },
      instructions: {
        ar: "اضغط الدالة ثم وظيفتها في تحليل الاستبيان",
        en: "Tap a formula, then its role in survey analysis",
      },
      pairs: [
        {
          left: { ar: "=AVERAGE", en: "=AVERAGE" },
          right: { ar: "المتوسط الحسابي لعمود عددي", en: "The arithmetic mean of a numeric column" },
        },
        {
          left: { ar: "=MEDIAN", en: "=MEDIAN" },
          right: { ar: "القيمة الوسطى المقاومة للشواذ", en: "The outlier-resistant middle value" },
        },
        {
          left: { ar: "=MODE", en: "=MODE" },
          right: { ar: "القيمة الأكثر تكراراً في البيانات", en: "The most frequently repeated value" },
        },
        {
          left: { ar: "=COUNTIF", en: "=COUNTIF" },
          right: { ar: "عدّ الخلايا التي تحقق شرطاً محدداً", en: "Counting cells that meet a condition" },
        },
        {
          left: { ar: "=CORREL", en: "=CORREL" },
          right: { ar: "قوة العلاقة الخطية بين عمودين واتجاهها", en: "The strength and direction of a linear relationship between two columns" },
        },
      ],
    },
  ],
  l150: [
    {
      kind: "classify",
      id: "w:l150:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "صنّف أنواع السرقة العلمية", en: "Classify the plagiarism types" },
      instructions: {
        ar: "اضغط الحالة ثم نوع المخالفة الذي تنتمي إليه",
        en: "Tap a scenario, then the type of violation it belongs to",
      },
      buckets: [
        { ar: "نسخ مباشر", en: "Copy-paste" },
        { ar: "إعادة صياغة دون توثيق", en: "Uncited paraphrase" },
        { ar: "سرقة ذاتية", en: "Self-plagiarism" },
      ],
      items: [
        { text: { ar: "لصق فقرة من موقع ويكيبيديا كما هي بلا إشارة للمصدر", en: "Pasting a Wikipedia paragraph verbatim with no citation" }, bucket: 0 },
        { text: { ar: "استبدال كلمات المصدر بالمرادفات وتقديم الفكرة كأنها لك", en: "Swapping the source's words for synonyms and presenting the idea as yours" }, bucket: 1 },
        { text: { ar: "إعادة تسليم تقرير قدّمته في مقرر آخر دون إفصاح", en: "Resubmitting a report from a previous course without disclosure" }, bucket: 2 },
        { text: { ar: "ترجمة مقال أجنبي وتقديمه بلا إشارة إلى أصله", en: "Translating a foreign article and presenting it without citing its origin" }, bucket: 1 },
        { text: { ar: "نسخ فصل من عمل سابق لك إلى مشروع جديد بلا موافقة", en: "Copying a chapter of your earlier work into a new project without approval" }, bucket: 2 },
        { text: { ar: "تسليم مقال اشتراه من الإنترنت باسمه هو", en: "Submitting an essay purchased online under his own name" }, bucket: 0 },
      ],
    },
  ],
};
