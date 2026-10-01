import type { LessonSourceRef } from "@/lib/types";

// M11 lesson → source citations (sourceIds exist in src/data/sources.ts)
// Pool: von-neumann-1945, turing-1936, stallings-computer, hennessy-patterson,
// moore-1965, ieee-754, unicode-standard, uefi-forum, nist-sp800-145, acm-cc2020
export const M11_LESSON_SOURCES: Record<string, LessonSourceRef[]> = {
  l101: [
    {
      sourceId: "turing-1936",
      note: {
        ar: "ورقة تورنغ الأصلية التي يفتتح بها الدرس جذوره النظرية: آلة الشريط اللامتناهي كتعريف رياضي للحساب قبل أي سيليكون",
        en: "Turing's original paper opening the lesson's theoretical roots: the infinite-tape machine as the mathematical definition of computation before any silicon",
      },
    },
    {
      sourceId: "von-neumann-1945",
      note: {
        ar: "مسودة EDVAC التي يقوم عليها جوهر الدرس: البرنامج المخزّن والمعالج والذاكرة والإدخال/الإخراج — معمارية كل جهاز حديث",
        en: "The EDVAC draft behind the lesson's core: the stored program, processor, memory and I/O — the architecture of every modern machine",
      },
    },
    {
      sourceId: "stallings-computer",
      note: {
        ar: "المرجع الجامعي المعتمد الذي يرسم الحد بين العتاد والبرمجيات وطبقات النظام — الإطار الذي يتبعه قسم التجريد في الدرس",
        en: "The canonical university reference drawing the hardware/software boundary and system layers — the frame the lesson's abstraction section follows",
      },
    },
  ],
  l102: [
    {
      sourceId: "stallings-computer",
      note: {
        ar: "فصول بنية المعالج ودورة التعليمات وتسلسل الذاكرة في مرجع ستولنغز — الأساس الذي يشرح به الدرس النوى والكاش ودورة اجلب-فك-نفّذ",
        en: "Stallings' chapters on processor structure, the instruction cycle and the memory hierarchy — the basis for this lesson's cores, caches and fetch-decode-execute",
      },
    },
    {
      sourceId: "hennessy-patterson",
      note: {
        ar: "التحليل الكمي لتسلسل الذاكرة وأثر أخطاء الكاش على الأداء — العمق الذي يميز أسباب وجود L1/L2/L3 وأحجامها",
        en: "The quantitative memory-hierarchy analysis and cache-miss impact — the depth explaining why L1/L2/L3 exist at their sizes",
      },
    },
  ],
  l103: [
    {
      sourceId: "stallings-computer",
      note: {
        ar: "تسلسل الذاكرة ووحدات الإدخال/الإخراج في المرجع المعتمد — الإطار الأكاديمي لهرم التخزين الذي يرسمه الدرس من السجلات حتى الشريط",
        en: "The memory hierarchy and I/O units in the canonical text — the academic frame for the lesson's pyramid from registers down to tape",
      },
    },
    {
      sourceId: "hennessy-patterson",
      note: {
        ar: "قياس أداء أنظمة التخزين كمياً: زمن الوصول مقابل المُنجَز — المنهجية نفسها التي يقارن بها الدرس HDD وSSD وNVMe بأرقام IOPS",
        en: "Quantitative storage-performance measurement: latency versus throughput — the same methodology the lesson uses to compare HDD, SSD and NVMe by IOPS",
      },
    },
  ],
  l104: [
    {
      sourceId: "ieee-754",
      note: {
        ar: "معيار الفاصلة العائمة الذي يفسره القسم الأخير من الدرس: صيغة الإشارة/الأس/الكسر ولماذا لا تساوي 0.1+0.2 القيمة 0.3",
        en: "The floating-point standard explained in the lesson's final section: sign/exponent/fraction and why 0.1 + 0.2 does not equal 0.3",
      },
    },
    {
      sourceId: "unicode-standard",
      note: {
        ar: "المعيار الذي يقوم عليه قسم الترميز: رقم فريد لكل حرف في 155 نظام كتابة، ونطاق العربية U+0600 إلى U+06FF وطولها في UTF-8",
        en: "The standard behind the encoding section: a unique number per character across 155 scripts, Arabic's U+0600-U+06FF range and its UTF-8 length",
      },
    },
    {
      sourceId: "turing-1936",
      note: {
        ar: "آلة تورنغ تعمل على رموز ثنائية على شريط — الجذر النظري لفكرة أن كل معلومة قابلة للتمثيل ببتات",
        en: "The Turing machine works on symbols on a tape — the theoretical root of every representation reducing to bits",
      },
    },
  ],
  l105: [
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "إطار الكفايات العالمي الذي يجعل تثبيت وإدارة أنظمة تشغيل المستخدم النهائي كفاية أساسية في برامج ICT — وهو ما تطلبه IT6001 حرفياً في مخرجها الثاني",
        en: "The global competency framework making end-user OS installation and administration a core ICT competency — exactly what IT6001 demands in its second outcome",
      },
    },
    {
      sourceId: "stallings-computer",
      note: {
        ar: "منظور المرجع لواجهة العتاد ونظام التشغيل والمشغّلات — الأساس الذي يبني عليه الدرس جدول المقارنة بين ويندوز ولينكس وماك وخطوات التقسيم",
        en: "The reference's view of the hardware-OS-driver interface — the base under the lesson's Windows/Linux/mac comparison table and partitioning steps",
      },
    },
  ],
  l106: [
    {
      sourceId: "uefi-forum",
      note: {
        ar: "مواصفة UEFI 2.10 الرسمية — مرجع الفروق بين BIOS+MBR وUEFI+GPT والتمهيد الآمن وإقلاع الشبكة PXE في الدرس بأكمله",
        en: "The official UEFI 2.10 specification — the reference for the BIOS+MBR vs UEFI+GPT differences, Secure Boot and PXE network boot across the whole lesson",
      },
    },
    {
      sourceId: "stallings-computer",
      note: {
        ar: "دور الوظيفة الثابتة والفيرموير في دورة تشغيل الحاسوب كما يعرضها المرجع الجامعي — تسلسل سلسلة الإقلاع التي يرسمها الدرس خطوة خطوة",
        en: "The role of fixed function and firmware in the computer's operating cycle as the university text presents it — the sequence behind the lesson's step-by-step boot chain",
      },
    },
  ],
  l107: [
    {
      sourceId: "hennessy-patterson",
      note: {
        ar: "فصول المحاكاة الافتراضية في المرجع الكمي: بنية المشغّلات الفوقية وأثرها على الأداء — الأساس العلمي للفرق بين النوع الأول والثاني",
        en: "The quantitative text's virtualization chapters: hypervisor structure and performance impact — the scientific basis for the Type 1 vs Type 2 distinction",
      },
    },
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "المحاكاة الافتراضية كفاية محورية في برامج الشبكات والسحابة الحديثة — الإطار الذي يبرر قسم «لماذا يعيش مهندس الشبكات على VMs»",
        en: "Virtualization as a pivotal competency in modern networking and cloud programs — the frame justifying the 'why network engineers live on VMs' section",
      },
    },
  ],
  l108: [
    {
      sourceId: "nist-sp800-145",
      note: {
        ar: "التعريف الفدرالي الرسمي للسحابة الذي يفتتح به الدرس: الاقتباس الحرفي ونماذج الخدمة الثلاثة والنشر الأربع وسماته الخمس",
        en: "The official federal cloud definition opening the lesson: the verbatim quote, the three service models, four deployment models and five characteristics",
      },
    },
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "مهارات السحابة ضمن كفايات برامج ICT المعتمدة — الصلة بين مخرج IT6001 الخامس (تقييم نماذج السحابة) ومهنة الشبكات",
        en: "Cloud skills within accredited ICT competencies — the link between IT6001's fifth outcome (evaluating cloud models) and the networking profession",
      },
    },
    {
      sourceId: "hennessy-patterson",
      note: {
        ar: "منهجية الحواسيب على مستوى المستودعات: لماذا تبنى السحابة على مشغّلات فوقية فوق خام المعدن — الخلفية الهندسية لنموذج IaaS",
        en: "The warehouse-scale computers methodology: why the cloud is built on hypervisors over bare metal — the engineering background of the IaaS model",
      },
    },
  ],
  l109: [
    {
      sourceId: "stallings-computer",
      note: {
        ar: "فصول النواقل ووحدات الإدخال/الإخراج في المرجع المعتمد — الإطار الأكاديمي لمسارات PCIe وأجيال USB وتصنيف الملحقات",
        en: "The canonical text's chapters on buses and I/O — the academic frame for PCIe lanes, USB generations and the peripherals classification",
      },
    },
    {
      sourceId: "hennessy-patterson",
      note: {
        ar: "التحليل الكمي لترابطات الإدخال/الإخراج: عرض الخطوط والأجيال وأثرها على الأداء — المنهجية التي يقيس بها الدرس بطاقات الشبكة",
        en: "The quantitative analysis of I/O interconnects: lane width, generations and their performance effect — the methodology the lesson applies to network cards",
      },
    },
  ],
  l110: [
    {
      sourceId: "moore-1965",
      note: {
        ar: "مقالة مور الأصلية باقتباسها الحرفي: مضاعفة «تعقيد الحد الأدنى للتكلفة» — النص الذي يفتتح به الدرس نصف قرن من النمو الأسّي",
        en: "Moore's original article with its verbatim quote: doubling 'the complexity for minimum component costs' — the text opening the lesson's half-century of exponentials",
      },
    },
    {
      sourceId: "hennessy-patterson",
      note: {
        ar: "تحليل جدار الطاقة ونهاية تقليص Dennard وثورة النوى المتعددة — الأساس العلمي لقسم «لماذا توقف سباق الغيغاهرتز»",
        en: "The power-wall analysis, the end of Dennard scaling and the multicore revolution — the scientific basis of the 'why the gigahertz race stopped' section",
      },
    },
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "نمو الكفايات المهنية بعد التخرج: مفاهيم تبقى وشهادات تتجدد — الإطار الذي يختم به الدرس نصيحة الفهم العميق والشراء الذكي",
        en: "Professional competency growth beyond graduation: concepts that stay and certifications that renew — the frame closing the lesson's deep-understanding and smart-buying advice",
      },
    },
  ],
};
