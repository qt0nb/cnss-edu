import type { LessonSourceRef } from "@/lib/types";

// M15 lesson → source citations (sourceIds exist in src/data/sources.ts)
// Module aligned to BPT IT6010 Maths for Computing + IT7012 Entrepreneurship
// and Research Methods — the quantitative gamers survey mini-project track.
export const M15_LESSON_SOURCES: Record<string, LessonSourceRef[]> = {
  l141: [
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "إطار ACM/IEEE العالمي الذي يجعل الرياضيات أساس كفايات كل برامج الحوسبة المعتمدة — سياق هذا الدرس التمهيدي وسبب وجود IT6010 في خطتك",
        en: "The global ACM/IEEE framework placing mathematics at the root of every accredited computing competency — the context of this orientation lesson and the reason IT6010 sits in your study plan",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "المرجع الجامعي الأشهر للشبكات: الفصل الأول وحسابات الأداء في فصوله تظهر الرياضيات التي يرسمها الدرس في مواضعها الشبكية",
        en: "The most-adopted networking textbook: its opening chapters and performance calculations show the maths this lesson maps in its networking habitats",
      },
    },
    {
      sourceId: "stallings-computer",
      note: {
        ar: "مرجع تنظيم الحاسوب الذي يقيس كل قرار عتادي بالأرقام — من البت إلى الأداء، دعم لفكرة «الرياضيات نظام تشغيل IT»",
        en: "The computer-organization reference that measures every hardware decision in numbers — from the bit to performance, backing the «maths as IT's OS» idea",
      },
    },
  ],
  l142: [
    {
      sourceId: "stallings-computer",
      note: {
        ar: "الفصول التي تشرح بناء المعالج من البوابات المنطقية — الأساس الذي يربط جداول الصدق بعمل الحواسيب فعلياً",
        en: "The chapters explaining how a processor is built from logic gates — the foundation linking truth tables to what computers physically do",
      },
    },
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "المنطق المنفصل ضمن كفايات العلوم الرياضية للحوسبة في CC2020 — الإطار الأكاديمي لمخرَج IT6010 التعلّمي",
        en: "Discrete logic inside CC2020's computing-mathematics competencies — the academic frame for this IT6010 learning outcome",
      },
    },
  ],
  l143: [
    {
      sourceId: "ieee-754",
      note: {
        ar: "معيار IEEE للأعداد وحسابها: كيف تُخزَّن الأعداد فعلياً في الحاسوب — العمق التقني وراء التدوين الموضعي والثنائي",
        en: "The IEEE arithmetic standard: how numbers are actually stored in a computer — the technical depth behind positional notation and binary",
      },
    },
    {
      sourceId: "stallings-computer",
      note: {
        ar: "تمثيل البيانات في العتاد من مرجع تنظيم الحاسوب — الخلفية الهندسية للثمانيات والأنصاف ومعالجة العناوين",
        en: "Data representation in hardware from the computer-organization reference — the engineering background for octets, nibbles and address handling",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "فصول العنونة في المرجع الأشهر للشبكات: IPv4 بالنقاط العشرية وIPv6 بالست عشري كما ستديرها يومياً",
        en: "The addressing chapters of the most-adopted networking text: dotted-decimal IPv4 and hexadecimal IPv6 as you will manage them daily",
      },
    },
  ],
  l144: [
    {
      sourceId: "openintro-stats",
      note: {
        ar: "كتاب الإحصاء المفتوح المرجعي: فصول التنظيم والتلخيصات الرقمية — المصدر الذي تُبنى عليه أمثلة المتوسط والوسيط والمنوال",
        en: "The open reference statistics textbook: its data-organization and numerical-summary chapters — the basis the mean/median/mode examples are built on",
      },
    },
    {
      sourceId: "nist-sematech",
      note: {
        ar: "دليل NIST للطرق الإحصائية التطبيقية: التقنيات الوصفية ومتى تستخدم أي مقياس — الترجمة الهندسية لاختيار المقياس الصحيح",
        en: "NIST's applied-statistics handbook: descriptive techniques and when to use which measure — the engineering translation of choosing the right statistic",
      },
    },
  ],
  l145: [
    {
      sourceId: "tukey-1977",
      note: {
        ar: "كتاب توكي الذي وَلد منه مخطط الصندوق وقاعدة 1.5×IQR وفلسفة «انظر إلى بياناتك أولاً» — قلب هذا الدرس البصري",
        en: "Tukey's book that gave birth to the box plot, the 1.5×IQR rule and the look-at-your-data-first philosophy — the heart of this visualization lesson",
      },
    },
    {
      sourceId: "openintro-stats",
      note: {
        ar: "فصول التشتت والرسوم في الكتاب المرجعي المفتوح — خطوة بخطوة حساب التباين والانحراف المعياري",
        en: "The spread and graphics chapters of the open reference text — the step-by-step variance and standard-deviation computations",
      },
    },
    {
      sourceId: "nist-sematech",
      note: {
        ar: "دقة القياس ودراسة التباين من دليل NIST — الربط بين التشتت الإحصائي وقياسات أداء الشبكات الحقيقية",
        en: "Measurement precision and variation studies from the NIST handbook — connecting statistical spread to real network performance metrics",
      },
    },
  ],
  l146: [
    {
      sourceId: "openintro-stats",
      note: {
        ar: "فصول الاحتمالات في الكتاب المرجعي: القواعد الأساسية والمتممة والاستقلال — أساس الأمثلة المحلولة في الدرس",
        en: "The probability chapters of the reference text: basic rules, complements and independence — the basis of the lesson's worked examples",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "منهج الكتاب في قياس الفقد وزمن الاستجابة والموثوقية — حيث تتحول قواعد الاحتمال إلى أرقام شبكات قابلة للإدارة",
        en: "The textbook's treatment of loss, latency and reliability — where probability rules turn into manageable network numbers",
      },
    },
  ],
  l147: [
    {
      sourceId: "openintro-stats",
      note: {
        ar: "فصول تصميم الدراسات وأخذ العينات: المجتمع والعينة والانحياز — الأساس المنهجي لهيكل مشروعك الكمي",
        en: "The study-design and sampling chapters: population, sample and bias — the methodological basis of your quantitative project's skeleton",
      },
    },
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "كفايات البحث التطبيقي والقرار المبني على الأدلة ضمن CC2020 — الجسر الأكاديمي نحو مخرجات IT7012",
        en: "Applied-research and evidence-based decision competencies inside CC2020 — the academic bridge toward IT7012's outcomes",
      },
    },
  ],
  l148: [
    {
      sourceId: "likert-1932",
      note: {
        ar: "الورقة الأصلية نفسها: «تقنية لقياس الاتجاهات» حيث قدّم ليكيرت مقياس الدرجات المجمعة من خمس نقاط — النص المؤسس لكل ما في هذا الدرس",
        en: "The original paper itself: «A Technique for the Measurement of Attitudes», where Likert introduced the five-point summated rating — the founding text behind everything in this lesson",
      },
    },
    {
      sourceId: "openintro-stats",
      note: {
        ar: "مستويات القياس (الاسمي والترتيبي والفتري) في الكتاب المرجعي — الأساس الإحصائي لمعالجة بيانات ليكرت معاملةً ترتيبية",
        en: "Measurement levels (nominal, ordinal, interval) in the reference text — the statistical basis for treating Likert data as ordinal",
      },
    },
  ],
  l149: [
    {
      sourceId: "openintro-stats",
      note: {
        ar: "فصول التحليل الاستكشافي والارتباط في الكتاب المرجعي — الأساس لحساب r وقراءته وتحذير السببية",
        en: "The exploratory analysis and correlation chapters of the reference text — the basis for computing r, reading it, and the causation warning",
      },
    },
    {
      sourceId: "nist-sematech",
      note: {
        ar: "سير العمل التحليلي من دليل NIST: تنظيف البيانات أولاً ثم التلخيص ثم الرسم — بروتوكول الاحتراف في ورقة التحليل",
        en: "The NIST handbook's analysis workflow: clean first, then summarize, then plot — the professional protocol for your analysis sheet",
      },
    },
    {
      sourceId: "tukey-1977",
      note: {
        ar: "فلسفة EDA: انظر إلى البيانات قبل افتراض أي شيء عنها — روح الجداول المحورية والرسوم الاستكشافية في هذا الدرس",
        en: "The EDA philosophy: look at the data before assuming anything about it — the spirit of the pivot tables and exploratory charts in this lesson",
      },
    },
  ],
  l150: [
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "الاستعدادات المهنية والأخلاقية في إطار CC2020 — السياق المعياري لقسمي أخلاقيات البحث والكتابة العلمية",
        en: "Professional and ethical dispositions in the CC2020 framework — the standards context for the research-ethics and writing halves of this lesson",
      },
    },
    {
      sourceId: "likert-1932",
      note: {
        ar: "مثال التوثيق APA الحي في هذا الدرس يستشهد بورقة ليكيرت الأصلية — مرجعك النموذجي داخل النص وفي قائمة المراجع",
        en: "The live APA citation example in this lesson cites Likert's original paper — your model reference both in-text and in the reference list",
      },
    },
  ],
};
