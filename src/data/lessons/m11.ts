import type { Lesson } from "@/lib/types";

// M11 · Computer Systems Fundamentals (BPT IT6001 aligned) — lessons l101..l110
export const m11_LESSONS: Lesson[] = [
  {
    id: "l101",
    moduleId: "m11",
    order: 1,
    level: "beginner",
    title: {
      ar: "ما هو نظام الحاسوب؟ من آلة تورنغ إلى فون نويمان",
      en: "What is a Computer System? From Turing's Machine to von Neumann",
    },
    summary: {
      ar: "الجذور النظرية والبنية العملية للحاسوب: كيف عرّف تورنغ الحساب رياضياً قبل أي سيليكون، وكيف رسم فون نويمان المخطط الذي تتبعه كل الأجهزة حتى اليوم.",
      en: "The theoretical roots and practical structure of computers: how Turing defined computation mathematically before any silicon, and how von Neumann drew the blueprint every device still follows.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "قبل السيليكون: آلة تورنغ", en: "Before Silicon: the Turing Machine" },
        body: {
          ar: "قبل أن يُصنع أول حاسوب إلكتروني بعشرين عاماً، جلس عالم رياضيات شاب اسمه آلان تورنغ عام 1936 يسأل سؤالاً فيلسوفياً جريئاً: ما الذي يمكن حسابه أصلاً؟\n\nأجاب بآلة تجريدية بسيطة إلى حد مذهل: شريط لا نهائي من الخانات، رأس قراءة وكتابة يتحرك يميناً ويساراً، وحالة داخلية محدودة مع قواعد تحدد ما تفعله الآلة في كل خطوة: اقرأ الرمز، اكتب رمزاً جديداً، تحرك، وبدّل حالتك.\n\n- بساطتها هي قوتها: أي عملية ينفذها جهازك اليوم يمكن لآلة تورنغ تنفيذها نظرياً — لكن ببطء يفوق الخيال\n- أثبت تورنغ أيضاً حدود الحساب: مسائل لا تستطيع أي آلة حلها مهما بلغت قوتها\n- لهذا تعد ورقة 1936 حجر الأساس النظري لعلوم الحاسوب بأكملها\n\nحين تشتري حاسوباً بمعالج فيه مليارات الترانزستورات، فأنت تشتري نسخة سريعة جداً من فكرة عمرها تسعة عقود.",
          en: "Twenty years before the first electronic computer was built, a young mathematician named Alan Turing sat down in 1936 to ask a bold philosophical question: what can be computed at all?\n\nHe answered with an abstract machine of astonishing simplicity: an infinite tape of cells, a read/write head moving left and right, a finite internal state, and rules deciding each step: read the symbol, write a new one, move, and change state.\n\n- Its simplicity is its power: anything your laptop computes today, a Turing machine could theoretically compute — just unimaginably slowly\n- Turing also proved the limits of computation: problems no machine can ever solve, however powerful\n- That is why the 1936 paper remains the theoretical bedrock of all computer science\n\nWhen you buy a computer whose processor packs billions of transistors, you are buying a very fast copy of a ninety-year-old idea.",
        },
        tip: {
          ar: "سؤال مقابلات العمل الذكي: هل حاسوبك اليوم «أقوى» من آلة تورنغ؟ الجواب الدقيق: لا — أسرع بكثير فقط، والقوة الحسابية النظرية نفسها.",
          en: "A smart interview question: is your computer 'more powerful' than a Turing machine? The precise answer: no — merely much faster; the computational power is the same.",
        },
      },
      {
        heading: { ar: "معمارية فون نويمان: المخطط الأم", en: "The von Neumann Architecture: the Master Blueprint" },
        table: {
          caption: { ar: "مكونات معمارية فون نويمان ومهامها", en: "The von Neumann components and their roles" },
          headers: [
            { ar: "المكوّن", en: "Component" },
            { ar: "وظيفته", en: "Role" },
            { ar: "مثال ملموس", en: "Concrete example" },
          ],
          rows: [
            [
              { ar: "المعالج CPU: وحدة الحساب ALU + وحدة التحكم", en: "CPU: ALU + Control Unit" },
              { ar: "ينفذ الحساب والمنطق ويوجّه سير البرنامج", en: "Performs arithmetic and logic, and directs program flow" },
              { ar: "معالج Core i7 أو Ryzen", en: "A Core i7 or Ryzen chip" },
            ],
            [
              { ar: "الذاكرة الرئيسة", en: "Main memory" },
              { ar: "تخزن التعليمات والبيانات معاً في عناوين مرقمة", en: "Stores instructions and data together in numbered addresses" },
              { ar: "ذاكرة RAM بسعة 16GB", en: "16 GB of RAM" },
            ],
            [
              { ar: "وحدات الإدخال", en: "Input units" },
              { ar: "تُدخل البيانات والأوامر إلى النظام", en: "Feed data and commands into the system" },
              { ar: "لوحة مفاتيح، فأرة، بطاقة شبكة", en: "Keyboard, mouse, network card" },
            ],
            [
              { ar: "وحدات الإخراج", en: "Output units" },
              { ar: "تُخرج النتائج إلى المستخدم أو الشبكة", en: "Deliver results to the user or the network" },
              { ar: "شاشة، طابعة، بطاقة شبكة", en: "Monitor, printer, network card" },
            ],
            [
              { ar: "النواقل Buses", en: "Buses" },
              { ar: "مسارات نقل البيانات والعناوين وإشارات التحكم", en: "Paths carrying data, addresses and control signals" },
              { ar: "ناقل الذاكرة، ناقل PCIe", en: "The memory bus, the PCIe bus" },
            ],
          ],
        },
        body: {
          ar: "عام 1945 كتب جون فون نويمان مسودة تقرير عن حاسوب EDVAC، وفيها الفكرة التي غيّرت كل شيء: البرنامج نفسه يُخزَّن في الذاكرة كبيانات، بدلاً من توصيله بأسلاك ثابتة كما في الحواسيب الأولى.\n\nمنذ ذلك اليوم، وكل حاسوب — من ساعة ذكية إلى خادم في مركز بيانات — يتبع المخطط نفسه تقريباً: المعالج المركزي يتألف من وحدة الحساب والمنطق (ALU) التي تنفذ العمليات، ووحدة التحكم (Control Unit) التي تنسّق سير العمل. الذاكرة تخزن التعليمات والبيانات معاً. وحدات الإدخال والإخراج تربط الجهاز بالعالم الخارجي. والنواقل تنقل كل شيء بينها.\n\nلاحظ نقطة جوهرية: لأن التعليمات والبيانات تسكن الذاكرة نفسها، يستطيع الحاسوب تعديل برامجه كما يعدل بياناته — وهذا هو سر مرونة البرمجيات الحديثة كلها.",
          en: "In 1945 John von Neumann wrote the First Draft of a Report on the EDVAC, containing the idea that changed everything: the program itself is stored in memory as data, instead of being hard-wired as in earlier machines.\n\nSince that day, nearly every computer — from a smartwatch to a datacenter server — follows the same blueprint: the CPU contains the Arithmetic Logic Unit (ALU) that performs operations and the Control Unit that orchestrates execution. Memory holds instructions and data together. Input and output units connect the machine to the outside world. And buses move everything between them.\n\nNotice the crucial point: because instructions and data live in the same memory, a computer can modify its own programs as easily as its data — and that is the entire secret of modern software flexibility.",
        },
      },
      {
        heading: { ar: "نظرة الطبقات: كيف نرى الحاسوب؟", en: "The Layers View: How We See a Computer" },
        diagram: {
          kind: "layers",
          title: { ar: "طبقات الحاسوب من المستخدم إلى الكهرباء", en: "Computer layers from the user down to electricity" },
          items: [
            { ar: "المستخدم: أنت وأهدافك", en: "User: you and your goals" },
            { ar: "التطبيقات: المتصفح والمحرر والألعاب", en: "Applications: browser, editor, games" },
            { ar: "نظام التشغيل: مدير الموارد والوسيط", en: "Operating system: resource manager and mediator" },
            { ar: "العتاد: معالج وذاكرة وقرص وبطاقة شبكة", en: "Hardware: CPU, RAM, disk, network card" },
            { ar: "الكهرباء: مليارات الترانزستورات بين 0 و1", en: "Electricity: billions of transistors switching 0 and 1" },
          ],
        },
        body: {
          ar: "أقوى أداة ذهنية في علوم الحاسوب هي التجريد (Abstraction): كل طبقة تخفي عن الطبقة التي فوقها تعقيد التي تحتها.\n\n- أنت تضغط زر الإرسال في المتصفح ولا تعرف شيئاً عن الكهرباء — وهذا مقصود تماماً\n- المتصفح يطلب من نظام التشغيل خدمة عبر استدعاء نظام (System Call)، والنظام يوجّه العتاد\n- العتاد بدوره لا يعرف شيئاً عن المتصفح؛ إنه ينفذ تعليمات عمياء بسرعة مذهلة\n\nبصفتك مهندس شبكات، ستعبر هذه الطبقات كلها في يوم واحد: تطبيقاتك في الأعلى، وأوامر النظام في الوسط، وصولاً إلى منفذ الشبكة في العتاد. من يفهم الطبقات يفهم كل شيء، ومن يحفظها فقط يضيع عند أول عطل.",
          en: "The most powerful mental tool in computing is abstraction: each layer hides the complexity of the layer beneath it from the one above.\n\n- You click Send in a browser and know nothing about electricity — by design\n- The browser asks the OS for a service through a system call, and the OS commands the hardware\n- The hardware knows nothing about browsers; it executes blind instructions at astonishing speed\n\nAs a network engineer you will cross all these layers in a single day: your apps on top, system commands in the middle, down to the network port in the hardware. Whoever understands the layers understands everything; whoever merely memorizes them gets lost at the first fault.",
        },
      },
      {
        heading: { ar: "الحد الفاصل بين العتاد والبرمجيات", en: "The Hardware/Software Boundary" },
        body: {
          ar: "أين ينتهي العتاد وتبدأ البرمجيات؟ الإجابة أدق من مجرد «جهاز مقابل برنامج»:\n\n- البرمجيات الثابتة (Firmware): برامج صغيرة تسكن رقاقة داخل الجهاز نفسه — مثل UEFI الذي يوقظ حاسوبك (درس 106)\n- المشغّلات (Drivers): برمجيات تعرّف نظام التشغيل على قطعة عتاد معينة، فتترجم «اطبع صفحة» إلى لغة الطابعة\n- النواة (Kernel): قلب نظام التشغيل الذي يدير المعالج والذاكرة والأجهزة مباشرة\n- الميكروكود (Microcode): طبقة أعمق داخل المعالج تحوّل التعليمات إلى نبضات كهربائية\n\nالحد ليس خطاً حاداً بل طيف متدرج: كل مستوى يستخدم الذي تحته بلغة أبسط. هذا التدرج هو ما يجعل إصلاح المشكلات مهارة حقيقية: هل المشكلة في الكابل، أم في المشغّل، أم في نظام التشغيل، أم في التطبيق؟ اجعل هذا التسلسل خريطة تشخيصك الدائمة.",
          en: "Where does hardware end and software begin? The answer is finer than just 'device versus program':\n\n- Firmware: small programs living on a chip inside the device itself — like the UEFI that wakes your computer (lesson 106)\n- Drivers: software that introduces a specific piece of hardware to the OS, translating 'print a page' into the printer's language\n- The kernel: the OS core that directly manages the CPU, memory and devices\n- Microcode: a deeper layer inside the processor turning instructions into electrical pulses\n\nThe boundary is not a sharp line but a gradual spectrum: each level uses the one below it in a simpler language. That spectrum is what makes troubleshooting a real skill: is the problem in the cable, the driver, the OS, or the application? Keep this sequence as your permanent diagnostic map.",
        },
      },
    ],
    keyPoints: [
      { ar: "آلة تورنغ 1936 هي التعريف الرياضي للحساب نفسه — الأساس النظري قبل أي سيليكون", en: "The 1936 Turing machine is the mathematical definition of computation itself — the theory before any silicon" },
      { ar: "معمارية فون نويمان: المعالج (ALU + وحدة تحكم) + الذاكرة + الإدخال/الإخراج + النواقل", en: "von Neumann architecture: CPU (ALU + control unit) + memory + I/O + buses" },
      { ar: "البرنامج المخزّن: التعليمات تسكن الذاكرة كالبيانات — سر مرونة كل برمجيات اليوم", en: "The stored program: instructions live in memory like data — the secret of all modern software" },
      { ar: "الحاسوب طبقات: المستخدم ثم التطبيقات ثم نظام التشغيل ثم العتاد ثم الكهرباء", en: "A computer is layers: user, applications, operating system, hardware, electricity" },
      { ar: "الحد بين العتاد والبرمجيات طيف: فيرموير ثم مشغّلات ثم نواة ثم ميكروكود", en: "The hardware/software boundary is a spectrum: firmware, drivers, kernel, microcode" },
    ],
    commands: [
      { cmd: "uname -a", desc: { ar: "عرض نواة نظامك ومعمارية معالجك — أي طبقة برمجيات أنت عليها الآن", en: "Show your OS kernel and CPU architecture — which software layer you are on right now" } },
      { cmd: "systeminfo", desc: { ar: "تقرير ويندوز الكامل: النظام والعته والذاكرة والشبكة", en: "The full Windows report: system, hardware, memory and network" } },
    ],
    quiz: [
      {
        q: { ar: "ما الفكرة الثورية في مسودة فون نويمان لعام 1945؟", en: "What was the revolutionary idea in von Neumann's 1945 draft?" },
        options: [
          { ar: "استخدام الترانزستورات بدلاً من الصمامات المفرغة", en: "Using transistors instead of vacuum tubes" },
          { ar: "تخزين البرنامج نفسه في الذاكرة كبيانات", en: "Storing the program itself in memory as data" },
          { ar: "ربط الحواسيب معاً في شبكة", en: "Connecting computers together into a network" },
          { ar: "اختراع الشاشات الملونة", en: "Inventing color displays" },
        ],
        correct: 1,
        explain: {
          ar: "البرنامج المخزّن هو جوهر معمارية فون نويمان: التعليمات والبيانات تسكن الذاكرة نفسها، وهذا ما يجعل الحواسيب قابلة للبرمجة بمرونة غير محدودة.",
          en: "The stored program is the heart of the von Neumann architecture: instructions and data share one memory, which is what makes computers unlimitedly programmable.",
        },
      },
      {
        q: { ar: "آلة تورنغ تتكون من:", en: "A Turing machine consists of:" },
        options: [
          { ar: "معالج وذاكرة وقرص صلب", en: "A CPU, memory and hard disk" },
          { ar: "جدول بيانات ومعادلات", en: "A spreadsheet and equations" },
          { ar: "شريط لا نهائي ورأس قراءة/كتابة وحالة داخلية", en: "An infinite tape, a read/write head, and an internal state" },
          { ar: "رقاقة سيليكون ونواقل", en: "A silicon chip and buses" },
        ],
        correct: 2,
        explain: {
          ar: "الآلة التجريدية ل تورنغ: شريط لا نهائي من الرموز، ورأس يقرأ ويكتب ويتحرك، وحالة محدودة مع قواعد انتقال. كل ما عداها تفاصيل تنفيذية لاحقة.",
          en: "Turing's abstract machine: an infinite tape of symbols, a head that reads, writes and moves, and a finite state with transition rules. Everything else is later implementation detail.",
        },
      },
      {
        q: { ar: "في معمارية فون نويمان، وحدة ALU مسؤولة عن:", en: "In the von Neumann architecture, the ALU is responsible for:" },
        options: [
          { ar: "تخزين البرنامج في الذاكرة", en: "Storing the program in memory" },
          { ar: "العمليات الحسابية والمنطقية", en: "Arithmetic and logic operations" },
          { ar: "عرض الصور على الشاشة", en: "Displaying images on the screen" },
          { ar: "الاتصال بالشبكة", en: "Connecting to the network" },
        ],
        correct: 1,
        explain: {
          ar: "وحدة الحساب والمنطق هي «العضلات» الحسابية للمعالج: الجمع والطرح والمقاربات والعمليات المنطقية مثل AND وOR.",
          en: "The Arithmetic Logic Unit is the processor's computational muscle: addition, subtraction, comparisons, and logical operations such as AND and OR.",
        },
      },
      {
        q: { ar: "لماذا يعتبر التجريد أهم مفهوم في نظرة الطبقات؟", en: "Why is abstraction the key concept in the layers view?" },
        options: [
          { ar: "لأنه يزيد سرعة المعالج مباشرة", en: "Because it directly increases CPU speed" },
          { ar: "لأنه يشفر البيانات لحمايتها", en: "Because it encrypts data for protection" },
          { ar: "لأن كل طبقة تخفي تعقيد التي تحتها وتقدم واجهة أبسط", en: "Because each layer hides the complexity below it and offers a simpler interface" },
          { ar: "لأنه يوفر استهلاك الطاقة", en: "Because it saves power consumption" },
        ],
        correct: 2,
        explain: {
          ar: "التجريد يسمح لكل طبقة بالعمل دون فهم تفاصيل التي تحتها: المبرمج لا يفهم الكهرباء، ومهندس العتاد لا يفهم المتصفح — والتعاون يحدث عبر الواجهات.",
          en: "Abstraction lets each layer work without understanding the details below: the programmer ignores electricity and the hardware engineer ignores the browser — cooperation happens through interfaces.",
        },
      },
    ],
  },
  {
    id: "l102",
    moduleId: "m11",
    order: 2,
    level: "beginner",
    title: { ar: "المعالج وذاكرة RAM واللوحة الأم", en: "CPU, RAM & the Motherboard" },
    summary: {
      ar: "رحلة داخل الصندوق: نوى المعالج وذاكراته المخبئية ودورة التعليمات، والذاكرة RAM وأجيالها وقنواتها، واللوحة الأم التي تجمع كل شيء.",
      en: "A journey inside the box: CPU cores and caches and the instruction cycle, RAM and its generations and channels, and the motherboard that unites everything.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "داخل المعالج: نوى وخيوط وغيغاهرتز", en: "Inside the CPU: Cores, Threads & Gigahertz" },
        body: {
          ar: "المعالج هو عامل المصنع: ينفذ مليارات التعليمات البسيطة في الثانية، وتقاس قوته بثلاثة أرقام يرددها السوق لكن قليلين يفهمونها فعلاً.\n\n- النواة (Core): معالج كامل داخل المعالج؛ 8 أنوية تعني 8 عمال يعملون بالتوازي\n- الخيط (Thread): تقنية SMT تسمح لكل نواة بمعالجة خيطين معاً، فتبدو 8 أنوية فعلية وكأنها 16 خيطاً منطقياً\n- الغيغاهرتز (GHz): مليار دورة ساعة في الثانية — نبضات تنظم إيقاع العمل\n\nانتبه لفخ التسويق: غيغاهرتز أعلى لا يعني أداء أعلى دائماً؛ معالج حديث بـ 3.5GHz يتفوق على قديم بـ 4GHz لأن كل دورة عنده تنجز أكثر. قارن جيل المعالج قبل أن تقارن تردده.",
          en: "The CPU is the factory worker: it executes billions of simple instructions per second, and its strength is quoted in three numbers the market repeats but few truly understand.\n\n- Core: a complete processor inside the processor; 8 cores means 8 workers in parallel\n- Thread: SMT technology letting each core juggle two streams at once, so 8 physical cores expose 16 logical threads\n- Gigahertz: a billion clock cycles per second — the pulse setting the rhythm of work\n\nBeware the marketing trap: higher GHz does not always mean higher performance; a modern 3.5 GHz CPU beats an older 4 GHz one because each of its cycles accomplishes more. Compare the CPU generation before comparing frequency.",
        },
      },
      {
        heading: { ar: "الذاكرات المخبئية L1 وL2 وL3", en: "The L1, L2 and L3 Caches" },
        table: {
          caption: { ar: "سلّم الكاش داخل المعالج وخارجه", en: "The cache ladder inside and outside the CPU" },
          headers: [
            { ar: "المستوى", en: "Level" },
            { ar: "الحجم النموذجي", en: "Typical size" },
            { ar: "زمن الوصول", en: "Access time" },
            { ar: "ملاحظة", en: "Note" },
          ],
          rows: [
            [
              { ar: "L1", en: "L1" },
              { ar: "32-64KB لكل نواة", en: "32-64 KB per core" },
              { ar: "نحو نانوثانية واحدة", en: "About one nanosecond" },
              { ar: "الأسرع والأصغر، خاص بكل نواة", en: "Fastest and smallest, private per core" },
            ],
            [
              { ar: "L2", en: "L2" },
              { ar: "256KB إلى 2MB لكل نواة", en: "256 KB to 2 MB per core" },
              { ar: "بضع نانوثوانٍ", en: "A few nanoseconds" },
              { ar: "الوسيط بين L1 والذاكرة الرئيسة", en: "The middleman between L1 and main memory" },
            ],
            [
              { ar: "L3", en: "L3" },
              { ar: "8-64MB مشتركة", en: "8-64 MB shared" },
              { ar: "10-30 نانوثانية", en: "10-30 nanoseconds" },
              { ar: "مشتركة بين كل النوى، أكبر وأبطأ", en: "Shared by all cores, larger and slower" },
            ],
            [
              { ar: "RAM", en: "RAM" },
              { ar: "8-64GB", en: "8-64 GB" },
              { ar: "50-100 نانوثانية", en: "50-100 nanoseconds" },
              { ar: "خارج المعالج، أبطأ من L1 بمئة مرة", en: "Outside the CPU, a hundred times slower than L1" },
            ],
          ],
        },
        body: {
          ar: "المعالج أسرع من أن ينتظر الذاكرة الرئيسة: لو جلب كل تعليمة من RAM مباشرة لقضى معظم وقته في الانتظار.\n\nالحل عبقرية هندسية اسمها الكاش (Cache): ذاكرات صغيرة سريعة ملاصقة للنوى تخزن البيانات والتعليمات الأكثر استخداماً. والسر في نجاحها ظاهرة «محلية المرجع» (Locality): البرامج تعيد استخدام ما استخدمته للتو، فتصيب الكاش في أغلب الطلبات.\n\n- L1 أصغر من إصبعك بمعايير البيانات لكنه أسرع من RAM بمئة مرة تقريباً\n- حين «تخطئ» الكاش ويجب الذهاب إلى RAM، يقف المعالج أكثر من مئة دورة عاطلاً عن العمل\n- لهذا تزن مقاييس الأداء حجم L3 وسرعة الذاكرة معاً، لا كل واحد منفرداً\n\nسؤال المقابلات الكلاسيكي: لماذا لا نصنع كل الذاكرة بالسرعة نفسها؟ الجواب: الكلفة والمساحة — الكاش السريع يكلف أضعاف الـRAM لكل بايت ويحتاج مساحة داخل الرقاقة نفسها.",
          en: "The CPU is too fast to wait for main memory: fetching every instruction straight from RAM would leave it idle most of the time.\n\nThe solution is an engineering gem called the cache: small, fast memories glued next to the cores holding the most-used data and instructions. Their success hinges on locality: programs re-use what they just touched, so caches hit on most requests.\n\n- L1 is tiny by data standards yet roughly a hundred times faster than RAM\n- On a cache miss the CPU stalls for over a hundred cycles waiting for RAM\n- That is why performance benchmarks weigh L3 size together with memory speed, never each alone\n\nThe classic interview question: why not build all memory at cache speed? The answer: cost and area — fast cache costs multiples of RAM per byte and must sit inside the chip itself.",
        },
      },
      {
        heading: { ar: "دورة التعليمات: اجلب، فكّ، نفّذ", en: "The Instruction Cycle: Fetch, Decode, Execute" },
        diagram: {
          kind: "flow",
          title: { ar: "دورة التعليمات داخل المعالج", en: "The instruction cycle inside the CPU" },
          items: [
            { ar: "اجلب Fetch: التعليمة تُقرأ من الذاكرة عبر النواقل", en: "Fetch: the instruction is read from memory over the buses" },
            { ar: "فكّ Decode: وحدة التحكم تفسر رمز العملية ومعاملاتها", en: "Decode: the control unit interprets the opcode and operands" },
            { ar: "نفّذ Execute: ALU يحسب والنتيجة تُخزَّن أو تُكتب للذاكرة", en: "Execute: the ALU computes and the result is stored or written back" },
          ],
        },
        body: {
          ar: "كل ما يفعله حاسوبك — من تحريك مؤشر الفأرة إلى تشغيل خادم — يُختزل في دورة واحدة تتكرر مليارات المرات في الثانية:\n\n1) الاجلب: تضع وحدة التحكم عنوان التعليمة على ناقل العناوين، فتعود التعليمة عبر ناقل البيانات.\n2) الفك: تُفسَّر بتّاتها لتحديد العملية والمعاملات (سجلات أو عناوين ذاكرة).\n3) التنفيذ: ينفذ ALU العملية، وتُكتب النتيجة في سجل أو تُعاد إلى الذاكرة.\n\nوالمعالجات الحديثة «تنابيب» الدورة (Pipelining): بينما تُنفَّذ تعليمة، تُفكُّ التعليمة التالية وتُجلب التي بعدها — كخط تجميع في مصنع لا يتوقف. وبهذا يعمل الموظف الواحد وكأنه ثلاثة.\n\nهذه الدورة هي الجسر المباشر بين عالم البرمجيات وعالم الكهرباء: كل سطر برمجي تكتبه يتحول يوماً إلى ملايين من هذه الدورات الصغيرة.",
          en: "Everything your computer does — from moving the mouse pointer to running a server — reduces to one cycle repeated billions of times per second:\n\n1) Fetch: the control unit places the instruction address on the address bus, and the instruction returns over the data bus.\n2) Decode: its bits are interpreted to identify the operation and the operands (registers or memory addresses).\n3) Execute: the ALU performs the operation, and the result lands in a register or back in memory.\n\nModern processors pipeline the cycle: while one instruction executes, the next decodes and the one after fetches — an assembly line that never stops, where one worker performs like three.\n\nThis cycle is the direct bridge between the world of software and the world of electricity: every line of code you write eventually becomes millions of these tiny cycles.",
        },
      },
      {
        heading: { ar: "ذاكرة RAM مقابل ROM", en: "RAM vs ROM" },
        table: {
          caption: { ar: "أجيال DDR للذاكرة الحية", en: "DDR generations of system memory" },
          headers: [
            { ar: "الجيل", en: "Generation" },
            { ar: "النقل النموذجي لكل عصا", en: "Typical transfer per stick" },
            { ar: "الجهد", en: "Voltage" },
            { ar: "وضعه اليوم", en: "Status today" },
          ],
          rows: [
            [
              { ar: "DDR3-1600", en: "DDR3-1600" },
              { ar: "نحو 12.8GB/s", en: "About 12.8 GB/s" },
              { ar: "1.5V", en: "1.5 V" },
              { ar: "أجهزة قديمة ومستعملة فقط", en: "Legacy and used machines only" },
            ],
            [
              { ar: "DDR4-3200", en: "DDR4-3200" },
              { ar: "نحو 25.6GB/s", en: "About 25.6 GB/s" },
              { ar: "1.2V", en: "1.2 V" },
              { ar: "المعيار السائد في السوق", en: "The prevailing market standard" },
            ],
            [
              { ar: "DDR5-4800", en: "DDR5-4800" },
              { ar: "38.4GB/s وأكثر", en: "38.4 GB/s and up" },
              { ar: "1.1V", en: "1.1 V" },
              { ar: "جيل اللوحات والمعالجات الحديثة", en: "The generation of modern boards and CPUs" },
            ],
          ],
        },
        body: {
          ar: "ذاكرة RAM هي طاولة عمل الحاسوب: كل ما يعمل «الآن» يسكنها — التطبيقات المفتوحة، والتبويبات، ونواة النظام نفسها.\n\n- متطايرة (Volatile): انقطع التيار فتتبخر محتوياتها كلياً — ولهذا يفقد عملك غير المحفوظ عند انقطاع الكهرباء\n- تقاس بالجيجابايت (8 و16 و32 و64GB)، واليوم 16GB حد أدنى مريح لطالب IT يشغل آلات افتراضية\n- الأجيال: كل جيل DDR يضاعف سرعة النقل تقريباً — DDR3 انتهى عهده، وDDR4 هو السائد، وDDR5 للوحات الحديثة\n- القنوات: عصا واحدة تعمل بقناة واحدة؛ وعصوان متطابقتان تفعّلان القناة المزدوجة فتتضاعف حصيلة عرض النطاق\n\nأما ROM (ذاكرة القراءة فقط) فذاكرة صغيرة غير متطايرة تحمل برمجيات الإقلاع الثابتة — لا تفقد شيئاً عند إطفاء الجهاز، وستقابلها بالتفصيل في درس BIOS وUEFI.",
          en: "RAM is the computer's workbench: everything running 'right now' lives there — open apps, browser tabs, and the kernel itself.\n\n- Volatile: cut the power and its contents evaporate completely — which is why unsaved work dies with a blackout\n- Measured in gigabytes (8, 16, 32, 64 GB); today 16 GB is a comfortable floor for an IT student running virtual machines\n- Generations: each DDR generation roughly doubles transfer speed — DDR3 is history, DDR4 is the norm, DDR5 rides modern boards\n- Channels: a single stick runs on one channel; two matched sticks enable dual channel, doubling effective bandwidth\n\nROM, by contrast, is small non-volatile memory holding the fixed boot firmware — it loses nothing at power-off, and you will meet it properly in the BIOS and UEFI lesson.",
        },
      },
      {
        heading: { ar: "اللوحة الأم: المدينة التي تجمع الكل", en: "The Motherboard: the City That Unites Them All" },
        body: {
          ar: "اللوحة الأم أكبر لوحة داخل الصندوق، وكل مكوّن إما يسكنها أو يتصل بها:\n\n- الشريحة (Chipset): «حكومة» اللوحة التي تدير تدفق البيانات بين المعالج والذاكرة والمنافذ\n- مقابس DIMM: تسكنها عصيّ RAM — انتبه لأزواج القنوات الملوّنة عند التركيب\n- منافذ التوسعة PCIe: لبطاقات الشبكة والرسوميات والصوت (درس 109)\n- موصلات SATA وM.2: للأقراص (درس 103)\n- رقاقة BIOS/UEFI: الفيرموير الذي يوقظ اللوحة (درس 106)\n\nعند شراء لوحة تحقق من ثلاثة توافقيات: مقبس المعالج من الجيل نفسه، ونوع الذاكرة (DDR4 مقابل DDR5)، وحداثة المنافذ والمسارات. الأجهزة لا تسامح الخطأ هنا.\n\nولماذا تهم RAM لمهندس الشبكات تحديداً؟ لأن كل آلة افتراضية تحجز نصيبها من الذاكرة مسبقاً: 16GB تعني مختبراً من ثلاث آلات صغيرة مريحة، و8GB تعني معاناة ستتذكرها في كل مختبر.",
          en: "The motherboard is the largest board in the box, and every component either lives on it or plugs into it:\n\n- The chipset: the board's 'government' managing data flow between CPU, memory and ports\n- DIMM slots: where the RAM sticks live — mind the colored channel pairs when installing\n- PCIe expansion slots: for network, graphics and sound cards (lesson 109)\n- SATA and M.2 connectors: for the drives (lesson 103)\n- The BIOS/UEFI chip: the firmware that wakes the board (lesson 106)\n\nWhen buying a board verify three compatibilities: the CPU socket of the same generation, the memory type (DDR4 versus DDR5), and how modern the ports and lanes are. Hardware shows no mercy for errors here.\n\nAnd why does RAM matter to a network engineer specifically? Because every virtual machine reserves its memory share up front: 16 GB means a comfortable three-VM lab, while 8 GB means suffering you will remember in every lab session.",
        },
        code: {
          lang: "bash",
          snippet: "free -h\n        total   used   free   available\nMem:     15Gi   9.4Gi   2.1Gi      5.3Gi\nSwap:   8.0Gi   1.2Gi   6.8Gi",
        },
        tip: {
          ar: "قبل ترقية الذاكرة: أكد النوع (DDR4 أو DDR5) والسرعة القصوى من صفحة مواصفات اللوحة، واشتر عصوين متطابقتين لتفعيل القناة المزدوجة — لا عصواً من ماركتين.",
          en: "Before a RAM upgrade: confirm the type (DDR4 or DDR5) and maximum speed from the board's spec page, and buy two matched sticks to enable dual channel — never sticks from two brands.",
        },
      },
    ],
    keyPoints: [
      { ar: "قوة المعالج = نوى x خيوط x غيغاهرتز — وقارن الجيل قبل التردد", en: "CPU power = cores x threads x gigahertz — and compare generation before frequency" },
      { ar: "الكاش L1/L2/L3: صغير وسريع بجوار النوى، يصطاد محلية المرجع", en: "The L1/L2/L3 caches: small and fast beside the cores, exploiting locality" },
      { ar: "دورة التعليمات: اجلب ثم فكّ ثم نفّذ — مُنمَّبة كخط تجميع مصنع", en: "The instruction cycle: fetch, decode, execute — pipelined like a factory line" },
      { ar: "RAM متطايرة وسريعة (طاولة العمل)؛ ROM دائمة وصغيرة (برمجيات الإقلاع)", en: "RAM is volatile and fast (the workbench); ROM is permanent and small (boot firmware)" },
      { ar: "عصوان متطابقتان = قناة مزدوجة تضاعف عرض نطاق الذاكرة", en: "Two matched sticks = dual channel doubling memory bandwidth" },
      { ar: "16GB حد مريح للآلات الافتراضية — كل VM تحجز ذاكرتها مقدماً", en: "16 GB is the comfortable VM floor — every VM reserves its memory up front" },
    ],
    commands: [
      { cmd: "lscpu", desc: { ar: "استكشاف معالجك على لينكس: النوى والخيوط والكاش والتردد والمعمارية", en: "Explore your CPU on Linux: cores, threads, cache, frequency and architecture" } },
      { cmd: "free -h", desc: { ar: "عرض الذاكرة الحية: المستخدم والمتاح وذاكرة الاستبدال بصيغة مقروءة", en: "Show live memory: used, available and swap in human-readable form" } },
      { cmd: "wmic cpu get name", desc: { ar: "اسم معالجك ورقمه الكامل على ويندوز", en: "Your CPU's full name and model on Windows" } },
    ],
    quiz: [
      {
        q: { ar: "لماذا تفقد RAM محتواها عند انقطاع الكهرباء؟", en: "Why does RAM lose its contents when power is cut?" },
        options: [
          { ar: "لأن نظام التشغيل يمسحها فوراً", en: "Because the OS wipes it immediately" },
          { ar: "لأنها تخزن البتات في خلايا تحتاج تغذية وتحديثاً مستمرين", en: "Because it stores bits in cells needing continuous power and refresh" },
          { ar: "لتوفير الطاقة في السحابة", en: "To save energy for the cloud" },
          { ar: "لأن القرص يسحبها إليه", en: "Because the disk pulls it in" },
        ],
        correct: 1,
        explain: {
          ar: "خلايا DRAM مكثفات صغيرة تفقد شحنتها دون تحديث كهربائي متواصل — انقطاع التيار يعني تبخر الشحنات وتبخر البيانات معها.",
          en: "DRAM cells are tiny capacitors that leak their charge without continuous electrical refresh — losing power means losing the charges and the data with them.",
        },
      },
      {
        q: { ar: "أي ذاكرة هي الأسرع؟", en: "Which memory is the fastest?" },
        options: [
          { ar: "RAM", en: "RAM" },
          { ar: "L3", en: "L3" },
          { ar: "L1", en: "L1" },
          { ar: "قرص SSD", en: "An SSD" },
        ],
        correct: 2,
        explain: {
          ar: "L1 الأصغر والأسرع: يبعد خطوات عن وحدة التنفيذ ويستجيب في نحو نانوثانية، بينما تحتاج RAM عشرات إلى مئة نانوثانية.",
          en: "L1 is the smallest and fastest: steps away from the execution unit and answers in about a nanosecond, while RAM takes tens to a hundred nanoseconds.",
        },
      },
      {
        q: { ar: "القناة المزدوجة Dual Channel تعني:", en: "Dual channel memory means:" },
        options: [
          { ar: "مضاعفة تردد المعالج", en: "Doubling the CPU frequency" },
          { ar: "مضاعفة سعة القرص", en: "Doubling disk capacity" },
          { ar: "عصوا RAM متطابقتان تعملان معاً فتتضاعف حصيلة عرض النطاق", en: "Two matched RAM sticks working together, doubling effective bandwidth" },
          { ar: "عدد النوى يصبح الضعف", en: "The core count doubling" },
        ],
        correct: 2,
        explain: {
          ar: "الذاكرة تعمل عبر قنوات بين المعالج والرقاقات: عصوان متطابقتان على قناتين تنقلان البيانات معاً، فيتضاعف عرض النطاق المتاح للمعالج.",
          en: "Memory talks to the CPU over channels: two matched sticks on two channels transfer data simultaneously, doubling the bandwidth available to the CPU.",
        },
      },
      {
        q: { ar: "ترتيب دورة التعليمات الصحيح هو:", en: "The correct instruction cycle order is:" },
        options: [
          { ar: "نفّذ، اجلب، فكّ", en: "Execute, fetch, decode" },
          { ar: "فكّ، نفّذ، اجلب", en: "Decode, execute, fetch" },
          { ar: "اجلب، فكّ، نفّذ", en: "Fetch, decode, execute" },
          { ar: "اجلب، نفّذ، فكّ", en: "Fetch, execute, decode" },
        ],
        correct: 2,
        explain: {
          ar: "التعليمة تُجلب من الذاكرة أولاً، ثم تفك وحدتها وتحدد عمليتها، ثم تنفذ في ALU وتُخزَّن النتيجة — ثم تبدأ الدورة التالية.",
          en: "The instruction is fetched from memory first, then decoded to identify its operation, then executed in the ALU with the result stored — then the next cycle begins.",
        },
      },
    ],
  },
  {
    id: "l103",
    moduleId: "m11",
    order: 3,
    level: "beginner",
    title: { ar: "التخزين: HDD و SSD و NVMe و RAID", en: "Storage: HDD, SSD, NVMe & RAID" },
    summary: {
      ar: "من الأطباق المغناطيسية الدوارة إلى فلاش NVMe فوق مسارات PCIe، مروراً بهرم التخزين الكامل، وانتهاءً بتجميعات RAID بين السرعة والأمان.",
      en: "From spinning magnetic platters to NVMe flash over PCIe lanes, through the complete storage pyramid, ending with RAID arrays balancing speed and safety.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "قرصان، عالمان: مغناطيسي مقابل فلاش", en: "Two Disks, Two Worlds: Magnetic vs Flash" },
        body: {
          ar: "القرص الصلب HDD كمحطة إذاعية قديمة: أطباق معدنية تدور بسرعة 5400 إلى 15000 دورة في الدقيقة، ورأس قراءة وكتابة يطارد البيانات كما تطارد إبرة الأسطوانة أغنيتها.\n\n- زمن الوصول = انتظار دوران الطبق + حركة الرأس: نحو 5 إلى 10 ميلي ثانية تبدو صغيرة لكنها مليون نانوثانية!\n- الأداء العشوائي: 100 إلى 200 عملية إدخال/إخراج في الثانية (IOPS) فقط — عقوبة الأجزاء المتحركة\n- الكثافة الرخيصة: تيرابايتات بأسعار لا يقاومها فلاش — لهذا يبقى HDD ملك الأرشيف والنسخ الاحتياطية\n\nأما قرص الحالة الصلبة SSD فلا أجزاء متحركة فيه إطلاقاً: خلايا NAND فلاشية تُقرأ إلكترونياً، ومتحكم ذكي يوزع الكتابات على الخلايا بالتساوي إطالةً لعمرها.\n\n- زمن الوصول: عشرات الميكروثانية — أسرع بمئة مرة تقريباً من HDD\n- الأداء العشوائي: عشرات آلاف إلى مئات آلاف IOPS\n- عيوبه التاريخية: سعر أعلى لكل جيجابايت وعمر كتابة محدود — وقد تحسن كثيراً مع أجيال TLC وQLC الحديثة",
          en: "The HDD is an old radio station: metal platters spinning at 5,400 to 15,000 RPM while a read/write head chases data like a vinyl needle chasing its song.\n\n- Access time = rotational wait + head travel: about 5-10 milliseconds, which sounds tiny but is a million nanoseconds!\n- Random performance: only 100-200 IOPS — the penalty of moving parts\n- Cheap density: terabytes at prices flash cannot match — which is why the HDD still rules archives and backups\n\nThe SSD, in contrast, has no moving parts at all: NAND flash cells read electronically, with a smart controller spreading writes evenly across cells to extend their life.\n\n- Access time: tens of microseconds — roughly a hundred times faster than an HDD\n- Random performance: tens of thousands to hundreds of thousands of IOPS\n- Historic drawbacks: higher cost per GB and limited write endurance — both much improved with modern TLC and QLC generations",
        },
      },
      {
        heading: { ar: "SATA مقابل NVMe: القناة تصنع الفرق", en: "SATA vs NVMe: the Channel Makes the Difference" },
        table: {
          caption: { ar: "مقارنة أقراص التخزين الشائعة", en: "Comparing the common storage drives" },
          headers: [
            { ar: "النوع", en: "Type" },
            { ar: "الواجهة", en: "Interface" },
            { ar: "سرعة متتالية نموذجية", en: "Typical sequential speed" },
            { ar: "IOPS عشوائية", en: "Random IOPS" },
            { ar: "الاستخدام الأمثل", en: "Best use" },
          ],
          rows: [
            [
              { ar: "HDD", en: "HDD" },
              { ar: "SATA", en: "SATA" },
              { ar: "100-200MB/s", en: "100-200 MB/s" },
              { ar: "100-200", en: "100-200" },
              { ar: "الأرشيف والنسخ الاحتياطية", en: "Archives and backups" },
            ],
            [
              { ar: "SSD SATA", en: "SATA SSD" },
              { ar: "SATA", en: "SATA" },
              { ar: "500-550MB/s", en: "500-550 MB/s" },
              { ar: "40k-90k", en: "40k-90k" },
              { ar: "ترقية رخيصة لأجهزة قديمة", en: "Cheap upgrade for older machines" },
            ],
            [
              { ar: "NVMe Gen3", en: "NVMe Gen3" },
              { ar: "PCIe 3.0 x4", en: "PCIe 3.0 x4" },
              { ar: "2.5-3.5GB/s", en: "2.5-3.5 GB/s" },
              { ar: "200k-600k", en: "200k-600k" },
              { ar: "قرص النظام المعياري اليوم", en: "The standard system drive today" },
            ],
            [
              { ar: "NVMe Gen4/Gen5", en: "NVMe Gen4/Gen5" },
              { ar: "PCIe 4/5 x4", en: "PCIe 4/5 x4" },
              { ar: "5-14GB/s", en: "5-14 GB/s" },
              { ar: "مليون وأكثر", en: "A million and up" },
              { ar: "محطات العمل وتحرير الفيديو", en: "Workstations and video editing" },
            ],
          ],
        },
        body: {
          ar: "تمييز مهم ينقذك من صفقات خاطئة: شكل القرص ليس بروتوكوله. M.2 مجرد شكل صغير مستقيم يحتمل SATA أو NVMe — فافحص المواصفات دائماً قبل الدفع.\n\n- SATA: بروتوكول واجهة قديم سقفه نحو 550MB/s مهما أسرع الفلاش الذي يقف خلفه\n- NVMe: بروتوكول حديث يتكلم مباشرة مع مسارات PCIe فيبلغ 3.5 إلى 7GB/s وأكثر، وطوابير أوامره أعمق بمئات الآلاف فتزدهر عليه الأعمال العشوائية الصغيرة\n- النتيجة العملية: إقلاع أسرع، وتحميل برامج أسرع، وأقراص الآلات الافتراضية أخف حركة — فرق تشعر به كل يوم\n\nقاعدة الشراء الذهبية: قرص نظام NVMe للسرعة، وقرص بيانات كبير SATA أو HDD للأرشفة — أفضل توازن لكل دينار.",
          en: "A distinction that saves you from bad deals: the drive's shape is not its protocol. M.2 is merely a small stick form factor that can carry SATA or NVMe — always check the spec sheet before paying.\n\n- SATA: a legacy interface protocol capping around 550 MB/s no matter how fast the flash behind it\n- NVMe: a modern protocol speaking directly over PCIe lanes, reaching 3.5 to 7 GB/s and beyond, with command queues hundreds of thousands deep — small random workloads flourish on it\n- The practical result: faster boots, faster app loads, and lighter-feeling VM disks — a difference you feel daily\n\nThe golden buying rule: an NVMe system drive for speed, plus a big SATA or HDD data disk for archives — the best balance for every dinar.",
        },
      },
      {
        heading: { ar: "هرم التخزين", en: "The Storage Pyramid" },
        diagram: {
          kind: "layers",
          title: { ar: "الهرم من الأسرع والأصغر إلى الأبطأ والأكبر", en: "The pyramid from fastest/smallest to slowest/largest" },
          items: [
            { ar: "سجلات المعالج: بايتات داخل النواة، أجزاء النانوثانية", en: "CPU registers: bytes inside the core, sub-nanosecond" },
            { ar: "الكاش L1/L2/L3: كيلوبايتات وميغابايتات، نانوثوانٍ", en: "L1/L2/L3 caches: KBs and MBs, nanoseconds" },
            { ar: "الذاكرة RAM: جيجابايتات، عشرات النانوثوانٍ — متطايرة!", en: "RAM: gigabytes, tens of nanoseconds — volatile!" },
            { ar: "قرص NVMe: مئات الجيجابايتات، ميكروثوانٍ", en: "NVMe SSD: hundreds of GBs, microseconds" },
            { ar: "قرص HDD: تيرابايتات، ميلي ثوانٍ", en: "HDD: terabytes, milliseconds" },
            { ar: "الشريط والأرشيف البارد: بيتابايتات، ثوانٍ إلى دقائق", en: "Tape and cold archive: petabytes, seconds to minutes" },
          ],
        },
        body: {
          ar: "كل بنية حاسوب ناجحة تقوم على الهرم نفسه: كلما نزلت، صار التخزين أبطأ وأكبر وأرخص لكل بايت — والمهندس الناجح لا ينزل إلا مضطراً.\n\n- المسافة بين طبقتين متجاورتين غالباً رتبة قدر كاملة (عشرة أضعاف) في السرعة والسعة والسعر\n- RAM متطايرة فلا يصلح وحدها لحفظ ملفاتك؛ والأقراص دائمة لكنها أبطأ — التعاون بين الطبقات هو النظام\n- الشريط والأرشيف البارد السحابي «المستودع الجليدي»: أرخص تخزين في الوجود مقابل انتظار دقائق عند الاسترجاع\n\nحين يتباطأ جهازك، فالسبب غالباً طبقة تعمل مكان أسرع منها: النظام يستبدل بالقرص (Swap) لأن RAM نفد، أو مشاريعك الثقيلة تسكن HDD بدل SSD. التشخيص يبدأ من الهرم.",
          en: "Every successful computer builds on the same pyramid: as you descend, storage becomes slower, larger, and cheaper per byte — and the successful engineer descends only when forced.\n\n- The gap between adjacent tiers is usually a full order of magnitude in speed, size and price\n- RAM is volatile so it cannot hold your files alone; disks are permanent but slower — cooperation between tiers is the system\n- Tape and cold cloud archive are the 'frozen warehouse': the cheapest storage in existence, at the price of minutes of retrieval wait\n\nWhen your machine slows down, the usual cause is a tier doing the job of a faster one: the system swapping to disk because RAM ran out, or your heavy projects sitting on an HDD instead of an SSD. Diagnosis starts at the pyramid.",
        },
      },
      {
        heading: { ar: "RAID: تجميع الأقراص", en: "RAID: Teaming Disks Together" },
        table: {
          caption: { ar: "مستويات RAID الشائعة", en: "The common RAID levels" },
          headers: [
            { ar: "المستوى", en: "Level" },
            { ar: "أقل عدد أقراص", en: "Minimum disks" },
            { ar: "السعة المستخدمة", en: "Usable capacity" },
            { ar: "الميزة", en: "Strength" },
            { ar: "العيب", en: "Weakness" },
          ],
          rows: [
            [
              { ar: "RAID 0", en: "RAID 0" },
              { ar: "2", en: "2" },
              { ar: "100%", en: "100%" },
              { ar: "أعلى سرعة بتوزيع الشريط", en: "Top speed via striping" },
              { ar: "عطل قرص واحد يهدم الجميع", en: "One disk failure destroys all" },
            ],
            [
              { ar: "RAID 1", en: "RAID 1" },
              { ar: "2", en: "2" },
              { ar: "50%", en: "50%" },
              { ar: "مرآة كاملة ونجاة من عطل قرص", en: "Full mirror, survives a disk loss" },
              { ar: "مضاعفة الكلفة بلا زيادة سعة", en: "Double the cost, no extra capacity" },
            ],
            [
              { ar: "RAID 5", en: "RAID 5" },
              { ar: "3", en: "3" },
              { ar: "(n-1) من n", en: "(n-1) of n" },
              { ar: "توازن السرعة والأمان بتكافؤ واحد", en: "Speed/safety balance with one parity" },
              { ar: "إعادة البناء بعد عطل بطيئة ومُجهدة", en: "Slow, stressful rebuild after a loss" },
            ],
            [
              { ar: "RAID 10", en: "RAID 10" },
              { ar: "4", en: "4" },
              { ar: "50%", en: "50%" },
              { ar: "مرايا فوق شرائط: سرعة وأمان معاً", en: "Mirrors over stripes: speed and safety" },
              { ar: "كلفة عالية وعدد زوجي من الأقراص", en: "High cost, even disk count required" },
            ],
          ],
        },
        body: {
          ar: "RAID (مصفوفة الأقراص المستقلة المتكررة) يجمع أقراصاً متعددة لتتصرف كقرص واحد، بأهداف ثلاثة: سرعة أعلى، أو أمان أكبر، أو الاثنان معاً.\n\n- RAID 0 (الشريط): يقسم البيانات على الأقراص فيتضاعف الأداء — لكن لا تكراراً؛ عطل واحد يضيع كل شيء\n- RAID 1 (المرآة): كل بايت يُكتب مرتين؛ يفقد قرص فتواصل على الثاني دون توقف\n- RAID 5 (التكافؤ): n أقراص بسعة n-1، يتحمل عطل قرص واحد بإعادة حساب البتات المفقودة من التكافؤ\n- RAID 10 (مرآة + شريط): طبقة RAID 0 فوق أزواج مرآة — خيار مراكز البيانات الجدية\n\nلماذا تقلع الخوادم من مجموعة SSD بمستوى RAID؟ لأن زمن إقلاع الخادم وفحص قاعدة بياناته ينكمش من دقائق إلى ثوانٍ، ولأن عطل قرص لا يوقف خدمة تخدم آلاف المستخدمين — فالجاهزية (Availability) سلعة تباع بالثانية.\n\nوتحذير محاسبي مقدس: RAID ليس نسخاً احتياطياً — فهو يحمي من عطل القرص، لا من الحذف الخطأ ولا من الفيروس ولا من الحريق. الخطة الصحيحة: RAID للجاهزية + نسخ احتياطية خارجية بقاعدة 3-2-1 (ثلاث نسخ، وسيطان مختلفان، واحدة خارج الموقع).",
          en: "RAID (Redundant Array of Independent Disks) joins multiple drives to act as one, chasing three goals: more speed, more safety, or both.\n\n- RAID 0 (striping): splits data across drives and roughly multiplies throughput — but there is no redundancy; one failure loses everything\n- RAID 1 (mirroring): every byte written twice; lose one disk and keep running on the other\n- RAID 5 (parity): n drives with n-1 usable capacity, surviving one disk loss by recomputing missing bits from parity\n- RAID 10 (mirror + stripe): RAID 0 layered over mirrored pairs — the serious datacenter choice\n\nWhy do servers boot from SSD RAID sets? Because server boot and database checks shrink from minutes to seconds, and a disk failure does not stop a service serving thousands of users — availability is a product sold by the second.\n\nAnd a sacred accounting warning: RAID is not backup — it protects against disk failure, not against accidental deletion, malware, or fire. The correct plan: RAID for availability plus external backups following 3-2-1 (three copies, two different media, one off-site).",
        },
        tip: {
          ar: "شغّل فحص SMART دورياً على خوادمك: سمات مثل القطاعات المعاد تخصيصها تتصاعد قبل الانهيار أسابيع — استبدل القرص قبل أن يستبدلك.",
          en: "Run SMART checks periodically on your servers: attributes like reallocated sectors climb weeks before collapse — replace the disk before it replaces you.",
        },
      },
    ],
    keyPoints: [
      { ar: "HDD مغناطيسي دوار رخيص الكثافة؛ SSD فلاش بلا أجزاء متحركة أسرع عشوائياً بمئة ضعف", en: "HDD: spinning magnetic with cheap density; SSD: flash with no moving parts, a hundred times faster randomly" },
      { ar: "M.2 شكل وليس بروتوكولاً: SATA سقفه 550MB/s وNVMe يركب PCIe بجيجابايتات", en: "M.2 is a shape, not a protocol: SATA caps at 550 MB/s while NVMe rides PCIe in gigabytes" },
      { ar: "هرم التخزين: كل نزول طبقة = أبطأ وأكبر وأرخص", en: "The storage pyramid: each tier down = slower, larger, cheaper" },
      { ar: "RAID 0 سرعة، و1 مرآة، و5 تكافؤ متوازن، و10 للمراكز الجدية", en: "RAID 0 speed, 1 mirroring, 5 balanced parity, 10 for serious datacenters" },
      { ar: "الخوادم تقلع من SSD RAID للجاهزية — الثانية سلعة", en: "Servers boot from SSD RAID for availability — the second is a commodity" },
      { ar: "RAID ليس نسخاً احتياطياً: طبق قاعدة 3-2-1 دائماً", en: "RAID is not backup: always follow 3-2-1" },
    ],
    commands: [
      { cmd: "lsblk", desc: { ar: "سرد الأقراص والأقسام المتصلة بجهاز لينكس بأشجارها", en: "List the disks and partitions attached to a Linux machine as a tree" } },
      { cmd: "df -h", desc: { ar: "المساحة المستخدمة والمتاحة لكل نظام ملفات بصيغة مقروءة", en: "Used and available space per filesystem, human-readable" } },
      { cmd: "sudo smartctl -a /dev/sda", desc: { ar: "تقرير صحة القرص الكامل عبر SMART: الساعات والأخطاء والحرارة", en: "The full SMART disk health report: hours, errors and temperature" } },
    ],
    quiz: [
      {
        q: { ar: "السقف التقريبي لسرعة أقراص SATA هو:", en: "The approximate speed ceiling of SATA drives is:" },
        options: [
          { ar: "40MB/s", en: "40 MB/s" },
          { ar: "550MB/s", en: "550 MB/s" },
          { ar: "3.5GB/s", en: "3.5 GB/s" },
          { ar: "14GB/s", en: "14 GB/s" },
        ],
        correct: 1,
        explain: {
          ar: "بروتوكول SATA يتوقف عند نحو 550MB/s نظرياً؛ من يتجاوز ذلك يحتاج NVMe فوق مسارات PCIe.",
          en: "The SATA protocol tops out around 550 MB/s in theory; whoever needs more must go NVMe over PCIe lanes.",
        },
      },
      {
        q: { ar: "مجموعة RAID 1 من قرصين سعتها القابلة للاستخدام:", en: "The usable capacity of a two-disk RAID 1 array is:" },
        options: [
          { ar: "100% من القرصين", en: "100% of both disks" },
          { ar: "75%", en: "75%" },
          { ar: "50%", en: "50%" },
          { ar: "25%", en: "25%" },
        ],
        correct: 2,
        explain: {
          ar: "RAID 1 مرآة: كل بايت مكتوب على القرصين معاً، فتخسر نصف السعة مقابل أمان النجاة من عطل قرص كامل.",
          en: "RAID 1 mirrors: every byte written to both disks, so you lose half the capacity in exchange for surviving a full disk loss.",
        },
      },
      {
        q: { ar: "لماذا يبقى HDD حاضراً في عصر SSD؟", en: "Why does the HDD survive in the SSD era?" },
        options: [
          { ar: "لأنه أسرع في العمليات العشوائية", en: "Because it is faster at random operations" },
          { ar: "لأن كثافته الرخيصة تجعل التيرابايتات مثالية للأرشفة", en: "Because its cheap density makes terabytes ideal for archiving" },
          { ar: "لأنه يستهلك طاقة أقل دائماً", en: "Because it always consumes less power" },
          { ar: "لأن الأنظمة القديمة لا تدعم SSD", en: "Because old systems do not support SSDs" },
        ],
        correct: 1,
        explain: {
          ar: "سعر الجيجابايت في HDD لا يزال الأرخص — فيتولى الأرشيف والنسخ الاحتياطية الباردة بينما تتولى SSD الأعمال الحية.",
          en: "The HDD's price per gigabyte remains the cheapest — so it handles archives and cold backups while SSDs handle live workloads.",
        },
      },
      {
        q: { ar: "عبارة «RAID بديل عن النسخ الاحتياطي» هي:", en: "The statement 'RAID replaces backup' is:" },
        options: [
          { ar: "صحيحة في RAID 5 وما فوق", en: "True for RAID 5 and above" },
          { ar: "صحيحة في RAID 10 فقط", en: "True only for RAID 10" },
          { ar: "خطأ فادح: RAID يحمي من عطل القرص لا من الحذف أو الفيروس", en: "A grave error: RAID protects against disk failure, not deletion or malware" },
          { ar: "صحيحة إذا كانت الأقراص SSD", en: "True if the drives are SSDs" },
        ],
        correct: 2,
        explain: {
          ar: "RAID يرفع الجاهزية فقط؛ الحذف الخطأ أو الفيروس أو الحريق يصيب النسختين معاً — والنجاة الوحيدة نسخ خارجية بقاعدة 3-2-1.",
          en: "RAID only raises availability; accidental deletion, malware, or fire hit both copies together — the only salvation is external copies under 3-2-1.",
        },
      },
    ],
  },
  {
    id: "l104",
    moduleId: "m11",
    order: 4,
    level: "beginner",
    title: { ar: "تمثيل البيانات: الثنائي والست عشري والترميز", en: "Data Representation: Binary, Hex & Encoding" },
    summary: {
      ar: "لغة الحاسوب الأصلية: البتات والبايتات والتحويل بين الثنائي والعشري والست عشري، ولماذا يعيش مهندس الشبكات في عالم Hex، ثم ASCII وUnicode وIEEE 754.",
      en: "The computer's native language: bits and bytes, converting between binary, decimal and hex, why network engineers live in hex, then ASCII, Unicode and IEEE 754.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "البت والبايت: أصغر حجر بناء", en: "Bits & Bytes: the Smallest Building Block" },
        body: {
          ar: "كل ما تراه على الشاشة — هذه الأسطر نفسها — يختزل في حالتين كهربائيتين: يوجد جهد أو لا يوجد. ولهذا تتكلم الأجهزة لغة الثنائي (Binary).\n\n- البت (Bit): خانة واحدة قيمتها 0 أو 1 — أصغر وحدة معلومات في الكون الرقمي\n- النبلة (Nibble): 4 بتات تعادل رقماً ست عشرياً واحداً بالضبط\n- البايت (Byte): 8 بتات تحمل 256 حالة ممكنة — الوحدة العملية لقياس الملفات والذاكرة\n- سلالم القياس: KB نحو ألف، وMB نحو مليون، وGB نحو مليار — وانتبه لخدعة الشركات: قرص «500GB» بمعاييرها يعني 500 ضرب 10 أس 9 بايت، أي نحو 465GiB بمعايير نظامك\n\nسؤال الفلسفة الممتع: لماذا 8 بتات في البايت تاريخياً؟ لأنها أصغر عدد يكفي لحرف إنجليزي واحد في ترميز ASCII — وقصة هذا الترميز في قسم قادم من هذا الدرس.",
          en: "Everything you see on screen — these very lines — reduces to two electrical states: voltage present or absent. That is why machines speak binary.\n\n- Bit: a single cell holding 0 or 1 — the smallest unit of information in the digital universe\n- Nibble: 4 bits equal to exactly one hexadecimal digit\n- Byte: 8 bits carrying 256 possible states — the practical unit for measuring files and memory\n- The ladder: KB about a thousand, MB about a million, GB about a billion — and mind the vendor trick: a '500 GB' disk means 500 times 10 to the 9th bytes, about 465 GiB to your operating system\n\nA fun philosophy question: why 8 bits per byte, historically? Because it is the smallest count that fits one English letter in ASCII — and that encoding's story comes later in this lesson.",
        },
      },
      {
        heading: { ar: "التحويل: ثنائي وعشري وست عشري", en: "Conversions: Binary, Decimal & Hex" },
        table: {
          caption: { ar: "جدول التحويل المرجعي من 0 إلى 15", en: "The reference conversion table, 0 to 15" },
          headers: [
            { ar: "عشري", en: "Decimal" },
            { ar: "ثنائي", en: "Binary" },
            { ar: "ست عشري", en: "Hex" },
          ],
          rows: [
            [{ ar: "0", en: "0" }, { ar: "0000", en: "0000" }, { ar: "0", en: "0" }],
            [{ ar: "1", en: "1" }, { ar: "0001", en: "0001" }, { ar: "1", en: "1" }],
            [{ ar: "2", en: "2" }, { ar: "0010", en: "0010" }, { ar: "2", en: "2" }],
            [{ ar: "3", en: "3" }, { ar: "0011", en: "0011" }, { ar: "3", en: "3" }],
            [{ ar: "4", en: "4" }, { ar: "0100", en: "0100" }, { ar: "4", en: "4" }],
            [{ ar: "5", en: "5" }, { ar: "0101", en: "0101" }, { ar: "5", en: "5" }],
            [{ ar: "6", en: "6" }, { ar: "0110", en: "0110" }, { ar: "6", en: "6" }],
            [{ ar: "7", en: "7" }, { ar: "0111", en: "0111" }, { ar: "7", en: "7" }],
            [{ ar: "8", en: "8" }, { ar: "1000", en: "1000" }, { ar: "8", en: "8" }],
            [{ ar: "9", en: "9" }, { ar: "1001", en: "1001" }, { ar: "9", en: "9" }],
            [{ ar: "10", en: "10" }, { ar: "1010", en: "1010" }, { ar: "A", en: "A" }],
            [{ ar: "11", en: "11" }, { ar: "1011", en: "1011" }, { ar: "B", en: "B" }],
            [{ ar: "12", en: "12" }, { ar: "1100", en: "1100" }, { ar: "C", en: "C" }],
            [{ ar: "13", en: "13" }, { ar: "1101", en: "1101" }, { ar: "D", en: "D" }],
            [{ ar: "14", en: "14" }, { ar: "1110", en: "1110" }, { ar: "E", en: "E" }],
            [{ ar: "15", en: "15" }, { ar: "1111", en: "1111" }, { ar: "F", en: "F" }],
          ],
        },
        body: {
          ar: "التحويل أسهل مما تتخيل — كل الأمر أوزان خانات. لتقرأ بايتاً ثنائياً، أعط كل بت وزناً من اليمين: 1 ثم 2 ثم 4 ثم 8 ثم 16 ثم 32 ثم 64 ثم 128، وبعدها اجمع أوزان البتات التي تحمل 1.\n\nمثال محسوب أمامك: 11001010 = 128 + 64 + 8 + 2 = 202\n\nوللتحويل العكسي: نازلاً من أكبر وزن، ضع 1 كلما «دخل» الوزن في الرقم واطرحه، و0 إن لم يدخل.\n\nأما الست عشري (Hexadecimal) فهو اختصار كتابي أنيق: كل 4 بتات تقابل رقماً واحداً منه. الخانة الواحدة تأخذ 16 قيمة: 0 إلى 9 ثم A=10 وB=11 وC=12 وD=13 وE=14 وF=15.\n\n- البايت 11001010 يُجمَّع من (1100 = 12 = C) و(1010 = 10 = A) فيكتب 0xCA — بايت كامل برمزين بدل ثمانية!\n- البادئة 0x مجرد علامة تقول: ما يلي مكتوب بالنظام الست عشري\n\nجرّب التدريب التفاعلي أسفل هذا القسم — عيناك ستعودان بالنمط خلال دقائق.",
          en: "Conversion is easier than you fear — it is all positional weights. To read a binary byte, give each bit a weight from the right: 1, 2, 4, 8, 16, 32, 64, 128, then sum the weights of the bits holding 1.\n\nA worked example: 11001010 = 128 + 64 + 8 + 2 = 202\n\nFor the reverse: descending from the largest weight, write 1 whenever the weight 'fits' into the number and subtract it, else 0.\n\nHexadecimal, in turn, is an elegant writing shortcut: every 4 bits map to exactly one hex digit. Each digit takes 16 values: 0 through 9, then A=10, B=11, C=12, D=13, E=14, F=15.\n\n- The byte 11001010 groups as (1100 = 12 = C) and (1010 = 10 = A), written 0xCA — a full byte in two symbols instead of eight!\n- The 0x prefix is merely a badge saying: what follows is hexadecimal\n\nTry the interactive drill below this section — your eyes will own the pattern within minutes.",
        },
      },
      {
        heading: { ar: "لماذا يعيش مهندس الشبكات في Hex؟", en: "Why Network Engineers Live in Hex" },
        body: {
          ar: "لو كانت الشبكات مهنة كتابية، لكتبت مهنتها بالست عشري:\n\n- عنوان MAC: 48 بتاً تُعرض 12 خانة hex مثل 3C:52:82:1F:9A:C4 — الست الأولى معرف الشركة المصنّعة والست التالية رقم البطاقة\n- عنوان IPv6: 128 بتاً = 32 خانة hex في 8 مجموعات مثل 2001:db8::8a2e:370:7334 — تخيل كتابتها 128 بتاً من الأصفار والآحاد!\n- أقنعة الشبكة وحقول الترويسة في محلل الحزم: كل بايت يُعرض hex وبجواره نظرة ASCII\n- حتى ألوان الويب: #14B8A6 معناها أحمر 0x14 وأخضر 0xB8 وأزرق 0xA6\n\nالعادة المهنية التي أبنها معك من اليوم: حين ترى عنواناً أو حقلاً ست عشرياً، فكّكه ذهنياً إلى بايتات وبتات — من يقرأ البتات يفهم البروتوكول، ومن يقرأ الرموز فقط يبقى غريباً عن الشبكة.",
          en: "If networking were a writing profession, it would write in hexadecimal:\n\n- MAC addresses: 48 bits shown as 12 hex digits like 3C:52:82:1F:9A:C4 — the first six identify the manufacturer, the last six the card\n- IPv6 addresses: 128 bits = 32 hex digits in 8 groups like 2001:db8::8a2e:370:7334 — imagine writing them as 128 bits of zeros and ones!\n- Network masks and header fields in packet analyzers: every byte shown in hex with an ASCII glance beside it\n- Even web colors: #14B8A6 means red 0x14, green 0xB8, blue 0xA6\n\nThe professional habit I am building with you from today: when you meet a hex address or field, mentally unpack it into bytes and bits — those who read bits understand the protocol; those who read only symbols remain strangers to the network.",
        },
      },
      {
        heading: { ar: "من ASCII إلى Unicode: حروف العالم كلها", en: "From ASCII to Unicode: All the World's Letters" },
        body: {
          ar: "عام 1963 قُنِّن ASCII بسبع بتات: 128 خانة تغطي الإنجليزية والأرقام وعلامات التحكم — وكانت كافية… لعالم ظن أن الإنجليزية لغة الجميع.\n\n- جاء Unicode ليمنح كل حرف في كل لغة رقمه الفريد (Code Point) — أكثر من 149 ألف حرف في 155 نظام كتابة\n- UTF-8 هو الترميز الأشهر عالمياً: الحرف الإنجليزي بايت واحد، والحرف العربي بايتان، والحرف الصيني ثلاثة\n- العربية تسكن النطاق U+0600 إلى U+06FF: الألف U+0627 والباء U+0628 — نعم، يحسب حاسوبك حروفك أرقاماً ويعرضها لك حروفاً مرة أخرى\n\nملاحظة عملية تخصك كل يوم: المتصفح والمحرر يكتشفان الترميز تلقائياً عادة، لكن حين ترى رموزاً مشوهة في ملف، فالسبب تقريباً دائماً أنه كُتب بترميز غير UTF-8. الحل المهني: اجعل UTF-8 خيارك الافتراضي في كل مشروع ومحرر وقاعدة بيانات — منذ 2009 وهو المعيار الغالب على الويب.",
          en: "In 1963, ASCII standardized seven bits: 128 slots covering English, digits and control codes — enough for a world that assumed English was everyone's language.\n\n- Unicode arrived to give every letter of every language its unique number (code point) — over 149,000 characters across 155 scripts\n- UTF-8 is the world's dominant encoding: an English letter takes one byte, an Arabic letter two, a Chinese character three\n- Arabic lives in the range U+0600 to U+06FF: alif is U+0627 and baa is U+0628 — yes, your computer counts your letters as numbers and renders them back to you\n\nA practical everyday note: browsers and editors auto-detect encoding most of the time, but when you see garbled symbols in a file, the cause is almost always that it was written in something other than UTF-8. The professional fix: make UTF-8 your default in every project, editor and database — it has been the web's dominant standard since 2009.",
        },
      },
      {
        heading: { ar: "الأعداد العشرية والفاصلة العائمة", en: "Decimals & Floating Point" },
        code: {
          lang: "python",
          snippet: ">>> 0.1 + 0.2\n0.30000000000000004\n>>> 0.1 + 0.2 == 0.3\nFalse\n>>> round(0.1 + 0.2, 10) == 0.3\nTrue",
        },
        body: {
          ar: "جرّب في بايثون: جمع 0.1 + 0.2 يعطيك 0.30000000000000004. ليس خطأ برمجياً — بل نتيجة حتمية لمعيار IEEE 754 الذي يخزن الأعداد «العشرية» ككسور ثنائية.\n\n- العدد 0.1 العشري لا يملك تمثيلاً ثنائياً منتهياً — تماماً كما لا تملك الثلث تمثيلاً عشرياً منتهياً (0.3333 إلى ما لا نهاية)\n- المعيار يخزن العدد بصيغة إشارة وأُس وكسر داخل 32 أو 64 بتاً، ثم يقرّب إلى أقرب قيمة قابلة للتمثيل\n- الخطأ دقيق لكنه تراكمي: جمع آلاف المبالغ المصرفية في أعداد فاصلة عائمة قد يزيغ فلساً هنا وهناك\n\nالقواعد المهنية الذهبية: المال يُحسب بأعداد صحيحة (بالفلس أو السنت)، والقياسات العلمية بـ float64، ولا تقارن أبداً عددين عشريين بالمساواة المطلقة — قارن بفارق صغير مسموح (Epsilon).",
          en: "Try it in Python: adding 0.1 + 0.2 gives 0.30000000000000004. It is not a programming bug — it is the inevitable result of IEEE 754, which stores 'decimal' numbers as binary fractions.\n\n- Decimal 0.1 has no finite binary representation — exactly as one third has no finite decimal one (0.3333 forever)\n- The standard stores numbers as sign, exponent and fraction within 32 or 64 bits, then rounds to the nearest representable value\n- The error is tiny but cumulative: summing thousands of monetary amounts in floating point can drift a cent here and there\n\nThe golden professional rules: compute money in integers (fils or cents), scientific measurements in float64, and never compare two decimals for exact equality — compare within a small allowed tolerance (epsilon).",
        },
        tip: {
          ar: "لماذا يُعرض IPv6 بالست عشري؟ لأن كل خانة hex تحمل 4 بتات بالضبط، فتقرأ العنوان كاملاً في 32 رمزاً دون فقدان أي بت — توافق رياضي مثالي بين العرض والمضمون.",
          en: "Why is IPv6 shown in hex? Each hex digit carries exactly 4 bits, so you read the whole address in 32 symbols without losing a single bit — a perfect mathematical fit between display and content.",
        },
      },
    ],
    keyPoints: [
      { ar: "البت أصغر وحدة معلومات؛ والبايت 8 بتات = 256 حالة", en: "The bit is the smallest unit of information; the byte is 8 bits = 256 states" },
      { ar: "أوزان الخانات 128-64-32-16-8-4-2-1 هي مفتاح كل تحويل", en: "The positional weights 128-64-32-16-8-4-2-1 unlock every conversion" },
      { ar: "كل 4 بتات = خانة hex واحدة — لغة MAC وIPv6 وحقول الحزم", en: "Every 4 bits = one hex digit — the language of MAC, IPv6 and packet fields" },
      { ar: "Unicode/UTF-8: رقم فريد لكل حرف، والعربية في U+0600 إلى U+06FF", en: "Unicode/UTF-8: a unique number per letter, Arabic in U+0600 to U+06FF" },
      { ar: "IEEE 754: الأعداد العشرية كسور ثنائية مقربة — والمال يُحسب بأعداد صحيحة", en: "IEEE 754: decimals are rounded binary fractions — and money is computed in integers" },
    ],
    commands: [
      { cmd: "printf '%d = 0x%X\\n' 202 202", desc: { ar: "طباعة رقم واحد بالعشري والست عشري في سطر (Bash)", en: "Print one number in decimal and hex in one line (Bash)" } },
      { cmd: "xxd -l 16 /bin/ls", desc: { ar: "رؤية أول 16 بايتاً من ملف كما يراها الحاسوب: hex مع نظرة ASCII", en: "See a file's first 16 bytes as the computer sees them: hex with an ASCII glance" } },
      { cmd: "python3 -c \"print(0.1 + 0.2)\"", desc: { ar: "شاهد مشكلة الفاصلة العائمة بعينيك في سطر واحد", en: "Watch the floating-point issue with your own eyes in one line" } },
    ],
    quiz: [
      {
        q: { ar: "كم حالة ممكنة يمثلها البايت الواحد؟", en: "How many states can one byte represent?" },
        options: [
          { ar: "8", en: "8" },
          { ar: "16", en: "16" },
          { ar: "128", en: "128" },
          { ar: "256", en: "256" },
        ],
        correct: 3,
        explain: {
          ar: "البايت 8 بتات، وكل بت حالتان، فالعدد الكلي 2 أس 8 = 256 حالة من 0 إلى 255.",
          en: "A byte is 8 bits, each with two states, giving 2 to the 8th = 256 states from 0 to 255.",
        },
      },
      {
        q: { ar: "البايت 11001010 بالنظام الست عشري يكتب:", en: "The byte 11001010 in hexadecimal is written:" },
        options: [
          { ar: "0xAC", en: "0xAC" },
          { ar: "0xCA", en: "0xCA" },
          { ar: "0x202", en: "0x202" },
          { ar: "0xB2", en: "0xB2" },
        ],
        correct: 1,
        explain: {
          ar: "نجمّع البتات من اليسار: 1100 = 12 = C، و1010 = 10 = A، فيصبح البايت 0xCA أي 202 عشرياً.",
          en: "Group the bits left to right: 1100 = 12 = C, and 1010 = 10 = A, making the byte 0xCA, which is 202 in decimal.",
        },
      },
      {
        q: { ar: "في ترميز UTF-8، الحرف العربي الواحد يأخذ عادة:", en: "In UTF-8, a single Arabic letter typically takes:" },
        options: [
          { ar: "بايتاً واحداً", en: "One byte" },
          { ar: "بايتين", en: "Two bytes" },
          { ar: "ثمانية بايتات دائماً", en: "Always eight bytes" },
          { ar: "لا يمكن تمثيله أصلاً", en: "It cannot be represented at all" },
        ],
        correct: 1,
        explain: {
          ar: "UTF-8 متغير الطول: الإنجليزي بايت، والعربي في النطاق U+0600-U+06FF يحتاج بايتين، والصيني ثلاثة، وبعض الرموز أربعة.",
          en: "UTF-8 is variable-length: English takes one byte, Arabic in the U+0600-U+06FF range takes two, Chinese three, and some symbols four.",
        },
      },
      {
        q: { ar: "لماذا لا تساوي 0.1 + 0.2 القيمة 0.3 بدقة تامة؟", en: "Why does 0.1 + 0.2 not equal 0.3 exactly?" },
        options: [
          { ar: "خطأ في تصنيع المعالج", en: "A CPU manufacturing fault" },
          { ar: "لأن 0.1 لا تملك تمثيلاً ثنائياً منتهياً فيقرّبها المعيار", en: "Because 0.1 has no finite binary form, so the standard rounds it" },
          { ar: "لأن لغة بايثون ضعيفة الحساب", en: "Because Python is weak at arithmetic" },
          { ar: "لأن البايت ثمانية بتات فقط", en: "Because a byte is only eight bits" },
        ],
        correct: 1,
        explain: {
          ar: "0.1 كسر ثنائي دوري لا ينتهي، فيقرّبه IEEE 754 لأقرب قيمة تمثيلية — والانحراف الصغير يظهر عند الطباعة والمقارنة الدقيقة.",
          en: "0.1 is a non-terminating binary fraction, so IEEE 754 rounds it to the nearest representable value — the tiny drift surfaces when printing or comparing exactly.",
        },
      },
    ],
  },
  {
    id: "l105",
    moduleId: "m11",
    order: 5,
    level: "beginner",
    title: { ar: "أنظمة التشغيل للمستخدم النهائي: التثبيت والإدارة", en: "End-User Operating Systems: Installing & Administering" },
    summary: {
      ar: "الوحدة العملية لمقرر أنظمة الحاسوب: إصدارات ويندوز وتراخيصها، وتثبيت لينكس والتقسيم والإقلاع المزدوج، وإدارة ما بعد التثبيت من تحديثات وحسابات وحماية.",
      en: "The hands-on unit of the Computer Systems course: Windows editions and licensing, installing Linux with partitioning and dual-boot, and post-install administration from updates to protection.",
    },
    durationMin: 22,
    sections: [
      {
        heading: { ar: "ماذا يفعل نظام التشغيل؟", en: "What Does the Operating System Do?" },
        body: {
          ar: "نظام التشغيل هو المدير العام للحاسوب: الوسيط الإلزامي بين التطبيقات والعتاد، والموزّع العادل للموارد.\n\n- يحمّل أوامر التطبيقات على المعالج عبر المجدول (Scheduler) ويقسم زمن المعالج بعدل بين المتنافسين\n- يعزل ذاكرة كل تطبيق عن الآخر — تطبيق منهار لا يهدم النظام كله\n- يدير الملفات والأقراص والطابعة والشبكة عبر النواة (Kernel) ومشغّلاتها\n- استدعاءات النظام (System Calls) هي البوابة الرسمية الوحيدة التي تعبرها التطبيقات نحو العتاد\n\nفي مقرر أنظمة الحاسوب (IT6001) بالفصل الأول، تتعلم عملياً تثبيت وإدارة أنظمة تشغيل المستخدم النهائي — هذه الوحدة تحديداً هي نواتها. وإتقانها شرط لكل ما بعدها: الخوادم، والشبكات، والسحابة.",
          en: "The OS is the computer's general manager: the mandatory middleman between applications and hardware, and the fair allocator of resources.\n\n- It loads application instructions onto the CPU through the scheduler, sharing processor time fairly among competitors\n- It isolates each app's memory from the others — a crashed app does not take the whole system down\n- It manages files, disks, printers and the network through the kernel and its drivers\n- System calls are the only official gateway applications cross to reach hardware\n\nIn the Year-1 Computer Systems course (IT6001), you practice installing and administering end-user operating systems — this very unit is its core. Mastering it is the precondition for everything after: servers, networks, and the cloud.",
        },
      },
      {
        heading: { ar: "خريطة الأنظمة الثلاثة", en: "The Map of the Three Systems" },
        table: {
          caption: { ar: "ويندوز 11 مقابل أوبونتو مقابل macOS", en: "Windows 11 vs Ubuntu vs macOS" },
          headers: [
            { ar: "البُعد", en: "Dimension" },
            { ar: "Windows 11", en: "Windows 11" },
            { ar: "Ubuntu 24.04 LTS", en: "Ubuntu 24.04 LTS" },
            { ar: "macOS", en: "macOS" },
          ],
          rows: [
            [
              { ar: "النواة", en: "Kernel" },
              { ar: "NT (مغلق المصدر)", en: "NT (closed source)" },
              { ar: "Linux (مفتوح GPL)", en: "Linux (GPL, open)" },
              { ar: "XNU/Darwin (نصف مفتوح)", en: "XNU/Darwin (partially open)" },
            ],
            [
              { ar: "الرخصة", en: "Licensing" },
              { ar: "تجارية بمفاتيح تنشيط", en: "Commercial with activation keys" },
              { ar: "حرة مجانية بالكامل", en: "Fully free" },
              { ar: "مدمجة مع أجهزة Apple فقط", en: "Bundled with Apple hardware only" },
            ],
            [
              { ar: "إدارة البرمجيات", en: "Software management" },
              { ar: "Microsoft Store وwinget", en: "Microsoft Store and winget" },
              { ar: "مستودعات apt وSnap", en: "apt repositories and Snap" },
              { ar: "App Store وHomebrew", en: "App Store and Homebrew" },
            ],
            [
              { ar: "الاستخدام الأمثل", en: "Best fit" },
              { ar: "المكاتب والألعاب والشركات", en: "Offices, gaming, enterprises" },
              { ar: "الخوادم والتطوير والمختبرات", en: "Servers, development, labs" },
              { ar: "التصميم والإنتاج الإبداعي", en: "Design and creative production" },
            ],
          ],
        },
        body: {
          ar: "قبل أي تثبيت، اعرف شخصية كل نظام — فأنت على وشك العيش مع أحدها أربع سنوات:\n\n- ويندوز: المسيطر عالمياً على المكاتب والألعاب؛ رخصته تجارية، ودعم الأجهزة والبرامج له الأوسع على الإطلاق\n- لينكس: عائلة توزيعات حرّة النواة؛ أوبونتو ألطفها بداية؛ وهو يحكم الخوادم والسحابة والهواتف (أندرويد يعمل بنواة لينكس!)\n- macOS: نظام يونيكس أنيق يأتي مع أجهزة Apple فقط — تجربة متكاملة بلا تجميع ولا توافقيات\n\nشخصيتك كطالب شبكات: ستعيش على الثلاثة معاً — ويندوز على مكتبك، ولينكس على كل خادم تلمسه، وmacOS بين زملائك المصممين. من يفهم الثلاثة يتحرك بلا حدود، ومن يتعصب لواحد يضيق عالمه.",
          en: "Before any install, know each system's personality — you are about to live with one of them for four years:\n\n- Windows: the world ruler of offices and gaming; commercial licensing, and by far the widest hardware and software support\n- Linux: a family of distributions around the free kernel; Ubuntu is the gentlest start; it rules servers, the cloud, and phones (Android runs a Linux kernel!)\n- macOS: an elegant Unix shipping only with Apple machines — an integrated experience with no assembly and no compatibility hunts\n\nYour profile as a networking student: you will live on all three — Windows on your desk, Linux on every server you touch, macOS among your designer classmates. Whoever understands all three moves without borders; whoever is loyal to only one narrows their world.",
        },
      },
      {
        heading: { ar: "قبل التثبيت: الإصدارات والتراخيص", en: "Before Installing: Editions & Licensing" },
        body: {
          ar: "نافذة واحدة تفصل بين قرار شراء صائب وآخر خاطئ:\n\n- إصدارات ويندوز: Home للألعاب والاستعمال المنزلي؛ وPro يضيف BitLocker للتشفير، والانضمام إلى نطاق الشركة، وسطح المكتب البعيد، وHyper-V للمحاكاة — طالب IT يحتاج Pro لا نقاش\n- OEM مقابل Retail: رخصة OEM أرخص لكنها «تتزوج» اللوحة الأم التي نُشِّطت عليها أول مرة؛ وRetail أغلى لكنها تنتقل بحرية إلى جهازك التالي\n- مفاتيح التنشيط: كود من 25 حرفاً يربط النظام بحسابك الرقمي، والتحقق يجري عبر الإنترنت\n- لينكس: لا رخص ولا مفاتيح — التوزيعة كلها حرة، والشراء الوحيد اختياري لدعم تجاري (Canonical أو Red Hat)\n\nسؤال الامتحان المفضل: لماذا يفشل تنشيط ويندوز بعد استبدال اللوحة الأم؟ لأن رخصة OEM مشدودة إلى العتاد الأول — والحل: رخصة Retail أو مراجعة الدعم لإعادة التنشيط.",
          en: "One window separates a right purchase from a wrong one:\n\n- Windows editions: Home for games and home use; Pro adds BitLocker encryption, company domain join, remote desktop, and Hyper-V virtualization — an IT student needs Pro, no debate\n- OEM vs Retail: an OEM license is cheaper but 'marries' the motherboard it first activated on; Retail costs more yet freely moves to your next machine\n- Activation keys: a 25-character code tying the system to your digital account, verified online\n- Linux: no licenses, no keys — the whole distribution is free, and the only purchase is optional commercial support (Canonical or Red Hat)\n\nA favorite exam question: why does Windows activation fail after a motherboard replacement? Because the OEM license is bound to the original hardware — the fix: a Retail license or a support request to re-activate.",
        },
      },
      {
        heading: { ar: "التثبيت خطوة بخطوة والتقسيم", en: "The Install, Step by Step, and Partitioning" },
        diagram: {
          kind: "flow",
          title: { ar: "خطوات تثبيت نظام تشغيل حديث", en: "The steps of a modern OS install" },
          items: [
            { ar: "جهّز وسط USB للإقلاع وغيّر ترتيب الأجهزة", en: "Prepare a bootable USB stick and change the boot order" },
            { ar: "اختر اللغة وتخطيط لوحة المفاتيح والمنطقة", en: "Choose language, keyboard layout and region" },
            { ar: "قسّم القرص: قسم EFI صغير + قسم النظام الكبير", en: "Partition the disk: a small EFI partition + the big system partition" },
            { ar: "انسخ الملفات وثبّت النواة والمشغّلات", en: "Copy files and install the kernel and drivers" },
            { ar: "أنشئ حسابك الأول وكلمة مروره", en: "Create your first account and its password" },
            { ar: "بعد الإقلاع: التحديثات والمشغّلات والنسخ الاحتياطي", en: "After first boot: updates, drivers, and backups" },
          ],
        },
        body: {
          ar: "التثبيت الحديث أسهل من تثبيت تطبيق على هاتفك — لكن التقسيم هو الجزء الذي يوقع فيه الطلاب في المشاكل:\n\n- قسم EFI (نحو 100-500MB): تسكنه برامج الإقلاع — لا تلمسه أبداً؛ حذفه يعني حاسوباً لا يقلع\n- قسم النظام: ويندوز يديره كله بنفسه بنظام ملفات NTFS؛ أما لينكس فتفصّله بيدك — 30GB فأكثر للنظام، وقسم swap بحجم ذاكرتك تقريباً للسبات\n- التثبيت المزدوج (Dual-Boot): ثبت ويندوز أولاً ثم لينكس؛ الأخير يثبّت محمل الإقلاع GRUB الذي يعرض قائمة اختيار النظام عند كل إقلاع — الترتيب العكسي يمحو مدخل ويندوز غالباً\n\nتحذير مقدس: التقسيم يمحو البيانات — انسخ ملفاتك احتياطياً قبل أول نقرة، وجهّز عصا USB بسعة 8GB فأكثر بكتابة ISO عبر أداة مثل Rufus على ويندوز أو Startup Disk Creator على أوبونتو.",
          en: "Modern installing is easier than installing a phone app — but partitioning is where students get hurt:\n\n- The EFI partition (about 100-500 MB): where bootloaders live — never touch it; deleting it means a computer that never boots\n- The system partition: Windows manages it entirely with NTFS; on Linux you slice it yourself — 30 GB or more for root, and a swap partition roughly the size of your RAM for hibernation\n- Dual-boot: install Windows first, then Linux; the latter installs the GRUB bootloader showing the system choice menu at every boot — the reverse order usually wipes the Windows entry\n\nA sacred warning: partitioning erases data — back up your files before the first click, and prepare a USB stick of 8 GB or more with the ISO written via a tool like Rufus on Windows or Startup Disk Creator on Ubuntu.",
        },
      },
      {
        heading: { ar: "ما بعد التثبيت: الإدارة اليومية", en: "After the Install: Daily Administration" },
        body: {
          ar: "التثبيت يوم واحد؛ أما الإدارة فكل يوم. قائمتك المهنية بعد أي تثبيت:\n\n- التحديثات: ويندوز عبر Windows Update — شغّله فوراً، فيوم الصفر أخطر أيام الأمان؛ ولينكس عبر apt update ثم apt upgrade\n- الحسابات: حساب قياسي لعملك اليومي، وحساب مدير (Administrator/sudo) للصيانة فقط — العمل الدائم بحساب المدير أول الخطايا الأمنية\n- المشغّلات: إدارة الأجهزة على ويندوز تُظهر الناقص بعلامة صفراء؛ ولينكس يعرف أغلب العتاد فوراً لكن تحقق من بطاقة الرسوميات واللاسلكي\n- الحماية: فعّل Windows Defender وجدار الحماية — بلا نقاش\n- نقطة استعادة ووسيط إنقاذ: أنشئهما قبل أي تجربة جسورة على النظام\n\nواختيار النظام حسب الغاية: خادم مختبرات؟ لينكس خفيف بلا واجهة رسومية. حاسوب لوالدتك؟ ويندوز بحساب قيادي وتحديثات تلقائية. جهاز تصميم؟ ماك. النظام أداة تُختار حسب المهمة، لا دين يُعتنق بحماس.",
          en: "Installing is one day; administering is every day. Your professional checklist after any install:\n\n- Updates: Windows Update on Windows — run it immediately, day zero is the most dangerous security day; on Linux, apt update then apt upgrade\n- Accounts: a standard account for daily work and an administrator/sudo one for maintenance only — living permanently as admin is the first of security sins\n- Drivers: Windows Device Manager shows the gaps with a yellow mark; Linux recognizes most hardware instantly, but verify graphics and Wi-Fi\n- Protection: enable Windows Defender and the firewall — no discussion\n- A restore point and a rescue stick: create both before any bold system experiment\n\nAnd choosing by purpose: a lab server? A lightweight Linux without a GUI. Your mother's computer? Windows with a standard account and automatic updates. A design machine? A Mac. The OS is a tool chosen by task, not a religion embraced with passion.",
        },
        tip: {
          ar: "قبل أي تجربة جسورة على القرص أو النظام: أنشئ نقطة استعادة أو لقطة للآلة الافتراضية — خمس دقائق تختصر خمس ساعات من الندم.",
          en: "Before any bold disk or system experiment: create a restore point or a VM snapshot — five minutes that shorten five hours of regret.",
        },
      },
    ],
    keyPoints: [
      { ar: "نظام التشغيل مدير موارد ووسيط إلزامي بين التطبيقات والعتاد", en: "The OS is a resource manager and mandatory middleman between apps and hardware" },
      { ar: "طالب IT يحتاج Windows Pro: Hyper-V وBitLocker والنطاق وسطح المكتب البعيد", en: "An IT student needs Windows Pro: Hyper-V, BitLocker, domain join, remote desktop" },
      { ar: "رخصة OEM مربوطة باللوحة الأم؛ وRetail تنتقل معك بين الأجهزة", en: "OEM licenses bind to the motherboard; Retail travels with you" },
      { ar: "ثبّت ويندوز أولاً في التثبيت المزدوج ليدير GRUB قائمة الاختيار", en: "Install Windows first in dual-boot so GRUB manages the choice menu" },
      { ar: "قسم EFI مقدس: لا تحذفه ولا تلمسه عند التقسيم", en: "The EFI partition is sacred: never delete or touch it while partitioning" },
      { ar: "الحساب القياسي للعمل اليومي والمدير للصيانة — والتحديثات يوم الصفر", en: "Standard account for daily work, admin for maintenance — and updates on day zero" },
    ],
    commands: [
      { cmd: "winget upgrade --all", desc: { ar: "ترقية كل برمجيات ويندوز المثبتة بسطر واحد (PowerShell)", en: "Upgrade all installed Windows software in one line (PowerShell)" } },
      { cmd: "sudo apt update && sudo apt upgrade -y", desc: { ar: "تحديث قوائم مستودعات أوبونتو ثم ترقية كل الحزم", en: "Refresh Ubuntu repository lists then upgrade every package" } },
      { cmd: "lsb_release -a", desc: { ar: "التعرف على توزيعة لينكس وإصدارها بدقة", en: "Identify your Linux distribution and its exact release" } },
    ],
    quiz: [
      {
        q: { ar: "طالب يحتاج تشغيل Hyper-V وBitLocker على حاسوبه؛ الإصدار المناسب:", en: "A student needs Hyper-V and BitLocker; the right Windows edition is:" },
        options: [
          { ar: "Windows 11 Home", en: "Windows 11 Home" },
          { ar: "Windows 11 Pro", en: "Windows 11 Pro" },
          { ar: "Windows 11 S Mode", en: "Windows 11 S Mode" },
          { ar: "أي إصدار — الميزتان افتراضيتان", en: "Any edition — both features are default" },
        ],
        correct: 1,
        explain: {
          ar: "Hyper-V وBitLocker والانضمام للنطاق وسطح المكتب البعيد مزايا Pro؛ وHome يفتقدها كلها — وفرق السعر أرخص من ثمن الندم.",
          en: "Hyper-V, BitLocker, domain join and remote desktop are Pro features; Home lacks them all — and the price gap is cheaper than regret.",
        },
      },
      {
        q: { ar: "رخصة Windows من نوع OEM:", en: "An OEM Windows license:" },
        options: [
          { ar: "تنتقل بحرية إلى أي جهاز جديد", en: "Moves freely to any new machine" },
          { ar: "مربوطة باللوحة الأم الأولى ولا تنتقل عادة", en: "Bound to the first motherboard and usually non-transferable" },
          { ar: "صالحة لمدة شهر واحد فقط", en: "Valid for one month only" },
          { ar: "مخصصة للخوادم حصراً", en: "Reserved exclusively for servers" },
        ],
        correct: 1,
        explain: {
          ar: "OEM تُباع مع الأجهزة الجديدة بسعر مخفض، وترتبط تنشيطها بالعتاد الأول — استبدال اللوحة الأم يفشل التنشيط غالباً.",
          en: "OEM licenses ship with new machines at a discount, and their activation binds to the first hardware — a motherboard swap usually breaks activation.",
        },
      },
      {
        q: { ar: "في التثبيت المزدوج لويندوز ولينكس، الترتيب الصحيح:", en: "When dual-booting Windows and Linux, the correct order is:" },
        options: [
          { ar: "لينكس أولاً ثم ويندوز", en: "Linux first, then Windows" },
          { ar: "ويندوز أولاً ثم لينكس", en: "Windows first, then Linux" },
          { ar: "لا فرق مطلقاً بين الترتيبين", en: "There is no difference at all" },
          { ar: "كلاهما في قرص واحد بلا أقسام", en: "Both on one unpartitioned disk" },
        ],
        correct: 1,
        explain: {
          ar: "ويندوز لا يعترف بغير محمله؛ تثبيته أولاً ثم لينكس يجعل GRUB يتولى قائمة اختيار النظامين معاً.",
          en: "Windows recognizes only its own bootloader; installing it first and Linux second lets GRUB manage a menu offering both systems.",
        },
      },
      {
        q: { ar: "قسم EFI في القرص:", en: "The EFI partition on a disk:" },
        options: [
          { ar: "يحمل ملفات المستخدمين والبرامج", en: "Holds user files and programs" },
          { ar: "هو قسم الذاكرة الافتراضية swap", en: "It is the swap virtual-memory partition" },
          { ar: "يحمل برامج الإقلاع وحذفه يمنع الجهاز من الإقلاع", en: "Holds bootloaders, and deleting it prevents the machine from booting" },
          { ar: "مخصص للألعاب الثقيلة فقط", en: "Reserved for heavy games only" },
        ],
        correct: 2,
        explain: {
          ar: "قسم EFI هو المسكن الرسمي لمحملات الإقلاع في أنظمة UEFI — مساحته صغيرة لكن حذفه يعني حاسوباً ميتاً حتى إصلاحه بوسيط إنقاذ.",
          en: "The EFI partition is the official home of UEFI bootloaders — tiny, but deleting it means a dead computer until repaired from a rescue stick.",
        },
      },
    ],
  },
  {
    id: "l106",
    moduleId: "m11",
    order: 6,
    level: "beginner",
    title: { ar: "كيف يقلع الحاسوب؟ BIOS و UEFI", en: "How a Computer Boots: BIOS & UEFI" },
    summary: {
      ar: "سلسلة الإقلاع كاملة من زر الطاقة إلى شاشة الدخول، والفرق الجوهري بين BIOS+MBR وUEFI+GPT، والتمهيد الآمن، ومزالق التثبيت المزدوج، وإقلاع الشبكة PXE.",
      en: "The complete boot chain from the power button to the login screen, the deep BIOS+MBR vs UEFI+GPT difference, Secure Boot, dual-boot gotchas, and PXE network boot.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "السلسلة الكاملة: من الزر إلى الدخول", en: "The Full Chain: from Button to Login" },
        diagram: {
          kind: "flow",
          title: { ar: "سلسلة الإقلاع من الطاقة إلى سطح المكتب", en: "The boot chain from power to desktop" },
          items: [
            { ar: "زر الطاقة: مزود الطاقة يستقر ويطلق إشارة Power Good", en: "Power button: the PSU stabilizes and raises the Power Good signal" },
            { ar: "فحص POST الذاتي: عدّ الذاكرة وفحص العتاد الأساسي", en: "The POST self-test: memory count and core hardware check" },
            { ar: "الفيرموير BIOS/UEFI يقرأ ترتيب أجهزة الإقلاع", en: "The BIOS/UEFI firmware reads the boot device order" },
            { ar: "محمل الإقلاع: GRUB أو Windows Boot Manager", en: "The bootloader: GRUB or the Windows Boot Manager" },
            { ar: "تحميل النواة وتشغيل المشغّلات والخدمات", en: "Kernel loading, then drivers and services" },
            { ar: "شاشة الدخول ثم سطح المكتب", en: "The login screen, then the desktop" },
          ],
        },
        body: {
          ar: "ما الذي يحدث فعلاً بين ضغطك الزر وظهور الشعار؟ أقل من عشر ثوانٍ تُختصر فيها مسيرة الحوسبة كلها:\n\n1) مزود الطاقة يستقر ويطلق إشارة Power Good، فتبدأ اللوحة الأم بالحياة.\n2) فحص POST (الفحص الذاتي عند التشغيل): عدّ سريع للذاكرة وفحص للعتاد الأساسي — ورموز البيب وأصواتها لغة الأعطال القديمة الموثقة في دفاتر اللوحات.\n3) الفيرموير (BIOS أو UEFI) يقرأ ترتيب أجهزة الإقلاع: القرص الدائم؟ عصا USB؟ الشبكة؟\n4) محمل الإقلاع الصغير (GRUB في لينكس أو Windows Boot Manager) يُحمَّل ويختار النظام.\n5) تُفكّ النواة في الذاكرة وتشغّل المشغّلات والخدمات واحداً بعد الآخر.\n6) يعرض مدير الدخول شاشة الحساب — وقد أقلع النظام فعلاً.\n\nولماذا يهمك هذا كشبكي؟ لأن نصف مشاكل «الجهاز لا يعمل» في الميدان تسكن هذه السلسلة، وتحديد الموضع الذي انقطعت عنده هو مهارتك التشخيصية الأولى.",
          en: "What really happens between pressing the button and seeing the logo? Under ten seconds compressing the whole history of computing:\n\n1) The power supply stabilizes and raises the Power Good signal, and the motherboard comes alive.\n2) POST (Power-On Self-Test): a quick memory count and core hardware check — beep codes are its old fault language, documented in every board manual.\n3) The firmware (BIOS or UEFI) reads the boot device order: the permanent disk? a USB stick? the network?\n4) The small bootloader (GRUB on Linux or the Windows Boot Manager) loads and picks the system.\n5) The kernel unpacks into memory and starts drivers and services one by one.\n6) The login manager shows the account screen — the system has truly booted.\n\nWhy does this matter to you as a networker? Because half of all 'it does not work' field problems live in this chain, and pinpointing where it broke is your first diagnostic skill.",
        },
      },
      {
        heading: { ar: "BIOS+MBR مقابل UEFI+GPT", en: "BIOS+MBR vs UEFI+GPT" },
        table: {
          caption: { ar: "الجيل القديم مقابل الجيل الحديث من الفيرموير", en: "The old firmware generation vs the modern one" },
          headers: [
            { ar: "البُعد", en: "Dimension" },
            { ar: "BIOS + MBR", en: "BIOS + MBR" },
            { ar: "UEFI + GPT", en: "UEFI + GPT" },
          ],
          rows: [
            [
              { ar: "الحقبة", en: "Era" },
              { ar: "منذ 1981", en: "Since 1981" },
              { ar: "أواخر العقد الأول من 2000 حتى اليوم", en: "Late 2000s until today" },
            ],
            [
              { ar: "الواجهة", en: "Interface" },
              { ar: "نص أزرق تُدار بالمفاتيح", en: "Blue text navigated by keys" },
              { ar: "رسومية بالفأرة وحتى باللمس", en: "Graphical, with mouse and even touch" },
            ],
            [
              { ar: "حد القرص والأقسام", en: "Disk and partition limits" },
              { ar: "2TB و4 أقسام أولية فقط", en: "2 TB and only 4 primary partitions" },
              { ar: "أقراص هائلة و128 قسماً في GPT", en: "Massive disks and 128 partitions in GPT" },
            ],
            [
              { ar: "الأمان", en: "Security" },
              { ar: "لا شيء مدمج", en: "Nothing built in" },
              { ar: "Secure Boot بسلسلة التواقيع", en: "Secure Boot with a signature chain" },
            ],
            [
              { ar: "الشبكة قبل النظام", en: "Network before the OS" },
              { ar: "دعم PXE بسيط", en: "Basic PXE support" },
              { ar: "درايفرات شبكة كاملة قبل الإقلاع", en: "Full network drivers before boot" },
            ],
          ],
        },
        body: {
          ar: "BIOS عادة متوارثة منذ 1981: برنامج صغير (16 بت) يقرأ أول قطاع من القرص — سجل MBR بحجم 512 بايت فقط — ثم ينفذه. كانت عبقرية زمانها، لكن حدودها خانقة اليوم:\n\n- سجل MBR يرى 2TB فقط من القرص، ويحفظ 4 أقسام أولية كحد أقصى\n- لا يفهم التواقيع الرقمية ولا الشبكات الحديثة ولا أنظمة الملفات الجديدة\n\nأما UEFI (الواجهة البرمجية الموحدة القابلة للتوسيع) فليس «برنامج إقلاع» بل نظام فرعي كامل: يقرأ أقسام GPT غير المحدودة عملياً، ويستطيع تشغيل مشغّلات شبكة ورسوميات قبل النظام نفسه، ويفهم أنظمة ملفات FAT مباشرة، ويقدم منصة قياس TPM وتوثيق الإقلاع.\n\nكل حاسوب اشتريته في العقد الأخير هو UEFI تقريباً — لكن النقاش الفني يبقى حياً لأن «وضع التوافق CSM» يتيح لـUEFI أن يتقمص شخصية BIOS للأنظمة العتيقة.",
          en: "BIOS is an inherited habit from 1981: a small 16-bit program reading the disk's first sector — the 512-byte MBR record — and executing it. Genius in its era, but its limits strangle today:\n\n- The MBR record sees only 2 TB of a disk and stores at most 4 primary partitions\n- It understands no digital signatures, no modern networks, no modern filesystems\n\nUEFI (Unified Extensible Firmware Interface), by contrast, is not a 'boot program' but a full subsystem: it reads practically unlimited GPT partitions, can run network and graphics drivers before the OS itself, understands FAT filesystems natively, and brings the TPM measurement platform and authenticated boot.\n\nAlmost every computer bought in the last decade is UEFI — yet the technical debate lives on because the CSM compatibility mode lets UEFI impersonate BIOS for antique systems.",
        },
      },
      {
        heading: { ar: "التمهيد الآمن وترتيب الأجهزة", en: "Secure Boot & Boot Order" },
        body: {
          ar: "التمهيد الآمن (Secure Boot) أبرز ما جاء به UEFI للشركات: سلسلة ثقة ترفض أي محمل إقلاع غير موقّع رقمياً بمفاتيح مثبتة في الفيرموير نفسه.\n\n- الهدف: منع «برمجيات الجذر» Rootkits التي تختطف الإقلاع قبل بدء النظام حيث لا يراها مضاد الفيروسات\n- ويندوز وماك موقّعان أصلاً من مطوّريهما؛ والتوزيعات الكبرى (أوبونتو وFedora وSUSE) توقّع محمل shim متسلسلاً مع مفاتيح مايكروسوفت\n- حين يرفض Secure Boot توزيعة غامضة، أمامك خياران: تعطيله من إعدادات الفيرموير، أو البحث عن نسخة موقّعة\n\nأما ترتيب أجهزة الإقلاع (Boot Order) فهو قائمة صغيرة في الفيرموير تحدد من يُقلع أولاً: القرص الدائم أم USB المثبّت أم الشبكة. أثناء التثبيت تجعل USB أولاً ثم تعيده لاحقاً. ومن لا يجد القائمة يضغط F12 أو F8 أو Esc حسب صانع اللوحة — فكل صانع تقريباً خصص زراً لقائمة الإقلاع المؤقتة، وحفظ أزرارها المختلفة عادة مهنية تختصر ساعة من التجربة أمام العميل.",
          en: "Secure Boot is UEFI's corporate crown jewel: a chain of trust rejecting any bootloader not digitally signed with keys planted in the firmware itself.\n\n- The goal: stopping rootkits that hijack the boot before the OS starts, where antivirus cannot see them\n- Windows and macOS are signed by their makers natively; the major distros (Ubuntu, Fedora, SUSE) sign a shim bootloader chained to Microsoft's keys\n- When Secure Boot rejects an obscure distro, you have two options: disable it in firmware settings, or hunt for a signed image\n\nBoot order, meanwhile, is a small firmware list deciding who boots first: the permanent disk, the installer USB, or the network. During installs you put USB first and revert later. Whoever cannot find the menu presses F12, F8 or Esc depending on the vendor — nearly every vendor reserves a key for the one-time boot menu, and memorizing their different keys is a professional habit that saves an hour of trial in front of a customer.",
        },
      },
      {
        heading: { ar: "مزالق الإقلاع المزدوج وإقلاع الشبكة PXE", en: "Dual-Boot Gotchas & PXE Network Boot" },
        code: {
          lang: "bash",
          snippet: "systemd-analyze\nStartup finished in 2.1s (firmware) + 4.3s (loader)\n+ 12.8s (kernel) + 3.4s (initrd) + 8.9s (userspace) = 31.5s\n\n# من يبطئ الإقلاع؟\nsystemd-analyze blame | head -5",
        },
        body: {
          ar: "أشهر مشاهد الدماء في المختبرات: طالب ثبّت لينكس بعد ويندوز ثم اختفت قائمة اختيار النظام. لماذا؟\n\n- ويندوز لا يعترف بغير نفسه: كل تحديث كبير له يعيد كتابة محمله فوق أي شيء آخر — والحل: إعادة تثبيت GRUB من وسيط إنقاذ\n- «بدء التشغيل السريع» Fast Startup في ويندوز ليس إطفاءً حقيقياً بل سبات خفيف يترك نظام الملفات «معلقاً»؛ ولينكس يرفض تحميله للكتابة حفاظاً على البيانات — عطّله قبل مشاركة أي قسم بين النظامين\n\nوالآن زاوية الشبكيين تحديداً: PXE (بيئة التنفيذ قبل الإقلاع) يجعل بطاقة الشبكة نفسها تجلب برنامج إقلاع مصغراً عبر DHCP ثم TFTP — فيقلع الحاسوب بلا قرص أصلاً!\n\n- مراكز البيانات تثبّت مئات الخوادم «بلمسة شبكة» دون لمس عصا USB واحدة\n- مختبرات الجامعات تعيد صور الأجهزة كل فصل دراسي عبر PXE مع خادم صور مركزي\n- تفاصيل DHCP وTFTP تنتظرك في وحدات الشبكات — يكفيك اليوم أن ترى أين يلتقي العتاد بشبكتك\n\nملاحظة ختامية تخص مختبرك: الإقلاع البطيء ليس «طبيعة الأجهزة» — أمر systemd-analyze يفكك زمن إقلاع لينكس طبقة بطبقة، وغالباً ما يكشف خدمة واحدة تستحق التعطيل.",
          en: "The lab's most famous blood scene: a student installs Linux after Windows and the choice menu vanishes. Why?\n\n- Windows recognizes nobody but itself: every major update rewrites its own bootloader on top of anything else — the fix: reinstalling GRUB from a rescue stick\n- Windows Fast Startup is not a real shutdown but a light hibernation leaving the filesystem 'suspended'; Linux refuses to mount it read-write to protect the data — disable it before sharing any partition between the two systems\n\nAnd now the networker's angle specifically: PXE (Preboot eXecution Environment) makes the network card itself fetch a tiny boot program over DHCP then TFTP — the computer boots with no disk at all!\n\n- Datacenters install hundreds of servers 'by a network touch' without touching a single USB stick\n- University labs re-image classrooms every term through PXE with a central image server\n- The details of DHCP and TFTP await you in the networking modules — today it is enough to see where hardware meets your network\n\nA closing lab note: slow booting is not 'the nature of machines' — systemd-analyze decomposes Linux boot time layer by layer, and usually exposes one service worth disabling.",
        },
        tip: {
          ar: "حاسوب لا يقلع؟ أنصت لرموز البيب وعدّها وراجع POST أولاً — العتاد الفاشل يعلن نفسه قبل أن تلمس البرمجيات بيدك.",
          en: "A computer that will not boot? Listen to the beep codes, count them, and check POST first — failing hardware announces itself before you ever touch software.",
        },
      },
    ],
    keyPoints: [
      { ar: "السلسلة: طاقة ثم POST ثم فيرموير ثم محمل إقلاع ثم نواة ثم دخول", en: "The chain: power, POST, firmware, bootloader, kernel, login" },
      { ar: "سجل MBR سقفه 2TB و4 أقسام؛ وGPT يحل القيدين معاً", en: "MBR caps at 2 TB and 4 partitions; GPT solves both limits" },
      { ar: "Secure Boot سلسلة تواقيع تحمي الإقلاع من الروتكيت", en: "Secure Boot is a signature chain protecting boot from rootkits" },
      { ar: "ثبّت ويندوز أولاً وعطّل Fast Startup قبل إضافة لينكس", en: "Install Windows first and disable Fast Startup before adding Linux" },
      { ar: "PXE يقلع الحاسوب من الشبكة: أداة مراكز البيانات ومختبرات الجامعات", en: "PXE boots the computer from the network: the datacenter and university-lab tool" },
    ],
    commands: [
      { cmd: "bcdedit", desc: { ar: "فحص مخزن إقلاع ويندوز وإدارة مداخله من سطر الأوامر", en: "Inspect and manage the Windows boot store from the command line" } },
      { cmd: "efibootmgr -v", desc: { ar: "عرض مداخل إقلاع UEFI وأرقامها وأولوياتها على لينكس", en: "List UEFI boot entries, their numbers and priorities on Linux" } },
      { cmd: "systemd-analyze blame", desc: { ar: "ترتيب خدمات لينكس حسب ما تستهلكه من زمن الإقلاع", en: "Rank Linux services by how much boot time they consume" } },
    ],
    quiz: [
      {
        q: { ar: "الحد الشهير لسجل MBR هو:", en: "The famous MBR record limit is:" },
        options: [
          { ar: "9.4 زيتابايت", en: "9.4 zettabytes" },
          { ar: "2TB و4 أقسام أولية", en: "2 TB and 4 primary partitions" },
          { ar: "128 قسماً", en: "128 partitions" },
          { ar: "بلا حد على الإطلاق", en: "No limit at all" },
        ],
        correct: 1,
        explain: {
          ar: "سجل MBR بحجم 512 بايت يستخدم عناوين 32 بت للأقطاع: 2TB للقرص و4 أقسام أولية — ولهذا وُلد GPT مع UEFI.",
          en: "The 512-byte MBR record uses 32-bit sector addresses: 2 TB per disk and 4 primary partitions — which is why GPT was born with UEFI.",
        },
      },
      {
        q: { ar: "وظيفة Secure Boot هي:", en: "The function of Secure Boot is:" },
        options: [
          { ar: "تسريع الإقلاع بذاكرة أسرع", en: "Speeding boot with faster memory" },
          { ar: "تشفير ملفات المستخدم على القرص", en: "Encrypting user files on the disk" },
          { ar: "رفض محملات الإقلاع غير الموقعة رقمياً", en: "Rejecting bootloaders not digitally signed" },
          { ar: "إدارة تحديثات نظام التشغيل", en: "Managing OS updates" },
        ],
        correct: 2,
        explain: {
          ar: "Secure Boot يبني سلسلة ثقة من الفيرموير: كل مرحلة إقلاع يجب أن تحمل توقيعاً مقبولاً — فتُحرم برمجيات الجذر من الاختطاف قبل بدء النظام.",
          en: "Secure Boot builds a chain of trust from the firmware: every boot stage must carry an accepted signature — denying rootkits their pre-OS hijack.",
        },
      },
      {
        q: { ar: "أول ما يجري بعد استقرار مزود الطاقة هو:", en: "The first thing after the PSU stabilizes is:" },
        options: [
          { ar: "تحميل النواة مباشرة", en: "Loading the kernel directly" },
          { ar: "شاشة الدخول", en: "The login screen" },
          { ar: "فحص POST الذاتي للعتاد", en: "The POST hardware self-test" },
          { ar: "تشغيل محمل الإقلاع GRUB", en: "Starting the GRUB bootloader" },
        ],
        correct: 2,
        explain: {
          ar: "إشارة Power Good توقظ اللوحة، وأول عمل لها فحص POST: عدّ الذاكرة والتأكد من العتاد الأساسي قبل أي حديث عن أنظمة تشغيل.",
          en: "The Power Good signal wakes the board, and its first act is POST: counting memory and verifying core hardware before any talk of operating systems.",
        },
      },
      {
        q: { ar: "إقلاع الشبكة PXE يجلب برنامج الإقلاع عبر:", en: "PXE network boot fetches its boot program via:" },
        options: [
          { ar: "البريد الإلكتروني", en: "Email" },
          { ar: "DHCP ثم TFTP", en: "DHCP then TFTP" },
          { ar: "قرص Blu-ray خارجي", en: "An external Blu-ray disk" },
          { ar: "البلوتوث فقط", en: "Bluetooth only" },
        ],
        correct: 1,
        explain: {
          ar: "بطاقة الشبكة تطلب عنواناً واسم ملف الإقلاع عبر DHCP، ثم تنزّله عبر TFTP — توليفة تمكّن تثبيت أساطيل الأجهزة بلمسة شبكة واحدة.",
          en: "The NIC requests an address and boot filename via DHCP, then downloads it over TFTP — the combination that installs fleets of machines with a single network touch.",
        },
      },
    ],
  },
  {
    id: "l107",
    moduleId: "m11",
    order: 7,
    level: "intermediate",
    title: { ar: "المحاكاة الافتراضية: Hypervisors والآلات الافتراضية", en: "Virtualization: Hypervisors & Virtual Machines" },
    summary: {
      ar: "جهاز كامل داخل جهاز: كيف يوزّع Hypervisor موارد المضيف، والفرق بين النوع الأول والثاني، واللقطات، ولماذا يعيش مهندس الشبكات على الآلات الافتراضية والحاويات.",
      en: "A whole machine inside a machine: how a hypervisor carves host resources, Type 1 vs Type 2, snapshots, and why network engineers live on virtual machines and containers.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "الفكرة: حاسوب كامل من ملفات", en: "The Idea: a Whole Computer Made of Files" },
        body: {
          ar: "الآلة الافتراضية (VM) حاسوب كامل — معالج وذاكرة وقرص وبطاقة شبكة — لكنه كله برنامج يسكن فوق حاسوب حقيقي نسميه المضيف (Host).\n\n- الـHypervisor (المشغّل الفوقي): البرنامج الذي يقسم موارد المضيف ويوزعها على الآلات الافتراضية بحصص تحددها أنت\n- قرص الآلة الافتراضية ملف واحد (VDI أو VMDK أو qcow2) تستطيع نسخه ونقله كأي ملف — وهذا هو سر المرونة كلها\n- الأجهزة داخلها افتراضية أيضاً: بطاقة شبكة افتراضية، وشاشة افتراضية، وحتى BIOS افتراضي خاص بها\n\nوالسحر التقني خلف الكواليس: معالجات اليوم تحمل تعليمات تسريع مخصصة (Intel VT-x وAMD-V) تتيح للنظام الضيف إدارة نواة حقيقية بسرعة قريبة من الأصلية. بدونها لتحوّل العمل كله إلى محاكاة بطيئة مؤلمة.",
          en: "A virtual machine is a complete computer — CPU, memory, disk, network card — but entirely software, living on a real computer we call the host.\n\n- The hypervisor: the software that carves the host's resources and allocates them to VMs in shares you define\n- A VM's disk is a single file (VDI, VMDK or qcow2) you can copy and move like any file — that is the entire secret of the flexibility\n- Its devices are virtual too: a virtual NIC, a virtual display, even its own virtual BIOS\n\nThe technical magic behind the curtain: today's CPUs carry dedicated acceleration instructions (Intel VT-x and AMD-V) letting the guest run a real kernel at near-native speed. Without them, everything would degrade into slow, painful emulation.",
        },
      },
      {
        heading: { ar: "النوع الثاني: محاكيات المكتب", en: "Type 2: Desktop Hypervisors" },
        body: {
          ar: "النوع الثاني (Type 2) برنامج يعمل كتطبيق عادي فوق نظام تشغيلك الحالي:\n\n- VirtualBox: مجاني مفتوح المصدر من Oracle — نقطة بداية كل طالب تقريباً\n- VMware Workstation Player وPro: أداء ممتاز وشبكات افتراضية متقدمة للمحترفين\n- والمكتب نفسه يصبح مزدوج الهوية: شغّل ويندوز مضيفاً وأوبونتو ضيفاً، أو العكس تماماً\n\nمزاياه القاتلة: السهولة واللقطات (Snapshots) — صورة فورية لحالة الآلة كاملة تُنشأ في ثوانٍ وتُستعاد في ثوانٍ. أفسدت التجربة؟ استعد اللقطة وواصل كأن شيئاً لم يكن. في التدريب المخبري وحدها، هذه الميزة تعادل سنة من الخبرة المؤلمة الطويلة.\n\nوعيوبه من نفس طبيعته: طبقة إضافية تأكل من الأداء، وارتباط كامل بنظام المضيف — إن سقط المضيف سقط المختبر كله معه.",
          en: "A Type 2 hypervisor is a program running like any ordinary app on top of your existing OS:\n\n- VirtualBox: Oracle's free, open-source offering — nearly every student's starting point\n- VMware Workstation Player and Pro: superb performance and advanced virtual networking for professionals\n- Your desktop becomes dual-identity: run Windows hosting an Ubuntu guest, or the exact reverse\n\nIts killer strengths: simplicity and snapshots — an instant image of the machine's full state, created in seconds and restored in seconds. Broke the experiment? Restore the snapshot and continue as if nothing happened. In lab training alone, that feature equals a year of long, painful experience.\n\nAnd its weaknesses share the same nature: an extra layer eating performance, and total dependence on the host — if the host falls, the whole lab falls with it.",
        },
      },
      {
        heading: { ar: "النوع الأول: خام المعدن", en: "Type 1: Bare Metal" },
        table: {
          caption: { ar: "النوع الأول مقابل النوع الثاني", en: "Type 1 vs Type 2" },
          headers: [
            { ar: "البُعد", en: "Dimension" },
            { ar: "النوع الثاني Type 2", en: "Type 2" },
            { ar: "النوع الأول Type 1", en: "Type 1" },
          ],
          rows: [
            [
              { ar: "أين يعمل", en: "Where it runs" },
              { ar: "تطبيق فوق نظام المضيف", en: "An app atop the host OS" },
              { ar: "هو نفسه ما يقلع على العتاد", en: "Itself what boots on the hardware" },
            ],
            [
              { ar: "أمثلة", en: "Examples" },
              { ar: "VirtualBox، VMware Workstation", en: "VirtualBox, VMware Workstation" },
              { ar: "ESXi، Hyper-V، KVM", en: "ESXi, Hyper-V, KVM" },
            ],
            [
              { ar: "الأداء", en: "Performance" },
              { ar: "جيد مع ضريبة الطبقة", en: "Good, with a layer tax" },
              { ar: "شبه أصيل — الحد الأقصى", en: "Near-native — the ceiling" },
            ],
            [
              { ar: "الوجهة", en: "Destination" },
              { ar: "الأجهزة المكتبية والتعلم", en: "Desktops and learning" },
              { ar: "مراكز البيانات والسحابة", en: "Datacenters and the cloud" },
            ],
            [
              { ar: "الإدارة المركزية", en: "Central management" },
              { ar: "غير موجودة", en: "Not present" },
              { ar: "vCenter وSCVMM وواجهات السحابة", en: "vCenter, SCVMM and cloud APIs" },
            ],
          ],
        },
        body: {
          ar: "النوع الأول (Type 1 / خام المعدن Bare-Metal) يخلع نظام التشغيل نهائياً: الـHypervisor نفسه هو الذي يقلع على العتاد ويدير الآلات مباشرة تحته.\n\n- ESXi من VMware: ملك بيئات الشركات العقيمة منذ عقدين كاملين\n- Hyper-V من مايكروسوفت: مجاني داخل Windows Server — وموجود في Pro أيضاً\n- KVM في لينكس: النواة نفسها صارت مشغّلاً افتراضياً — وهو الأساس الذي تقف عليه ملايين الآلات في AWS وGoogle Cloud وغيرهما\n\nوملاحظة تخصك مباشرة: خوادم مختبرات جامعتك — التي تتصل بها عبر SSH كل أسبوع على بنية AWS — تعمل فوق KVM هذا بالضبط. حين تكتب أوامرك، فأنت داخل آلة افتراضية من هذا النوع تماماً.\n\nوكل السحابة التي ستدرسها في الدرس التالي هي هذا النموذج: خوادم خام فوقها مشغّلات افتراضية، تؤجَّر لك الآلات بالساعة والدقيقة.",
          en: "A Type 1 (bare-metal) hypervisor removes the operating system entirely: the hypervisor itself boots on the hardware and manages the machines directly beneath it.\n\n- ESXi from VMware: king of sterile corporate environments for two full decades\n- Hyper-V from Microsoft: free inside Windows Server — and present in Pro as well\n- KVM in Linux: the kernel itself became a hypervisor — the foundation carrying millions of machines in AWS, Google Cloud and beyond\n\nAnd a note that concerns you directly: your university lab servers — the ones you SSH into every week on AWS — run on exactly this KVM. When you type your commands, you are inside a Type 1 virtual machine.\n\nAnd the entire cloud you will study in the next lesson is this same model: bare-metal servers carrying hypervisors, renting you machines by the hour and minute.",
        },
      },
      {
        heading: { ar: "لماذا يعيش مهندس الشبكات على VMs؟", en: "Why Network Engineers Live on VMs" },
        diagram: {
          kind: "topology",
          title: { ar: "مضيف واحد يحتضن ثلاث آلات افتراضية", en: "One host hugging three virtual machines" },
          nodes: ["Hypervisor|المشغّل الفوقي", "VM1: خادم لينكس", "VM2: خادم ويب", "VM3: موجه شبكي"],
          edges: [[0, 1], [0, 2], [0, 3]],
        },
        body: {
          ar: "لأن مهنتك تحتاج مختبراً كاملاً ومالك محدود. والحل الذي حكم العقد الأخير:\n\n- المحاكيات الشبكية GNS3 وEVE-NG تشغّل أنظمة موجّهات ومبدلات حقيقية كآلات افتراضية — فتبني شبكة من عشرة أجهزة على حاسوب واحد\n- كل قاعدة «اختبر التغيير على جهاز ثالث قبل الإنتاج» تتحقق طبيعياً على آلة افتراضية تُستنسخ وتُرمى\n- خوادم المختبرات في برامج التدريب: آلات افتراضية بالساعة — جرّب صباحاً وامحُ مساءً بلا كلفة دائمة\n\nوسر اللقطات للمهندس الميداني: التغيير الجسور على شبكة إنتاج له نسخة تطابق تماماً في VM؛ إن فشل فالاستعادة بضغطة زر، والدليل على عملك محفوظ في ملف.\n\nوالحاويات (Containers)؟ شقيق أخف للآلة الافتراضية: بدل نظام تشغيل كامل، تشارك الحاوية نواة المضيف وتحمل تطبيقها مع اعتماداته فقط — إقلاع بثوانٍ وحجم بالميجابايتات. دوكر أشهرها وستقابله في أتمتة الشبكات. القاعدة العملية: الآلة الافتراضية لعزل الأنظمة، والحاوية لسرعة التطبيقات.",
          en: "Because your craft needs a full lab on a limited budget. And the solution that ruled the last decade:\n\n- The network simulators GNS3 and EVE-NG run real router and switch OSes as VMs — a full ten-device network on one laptop\n- Every 'test the change on a third machine before production' rule happens naturally on a cloned-and-discarded VM\n- Lab servers in training programs: VMs by the hour — experiment in the morning, erase in the evening, no permanent cost\n\nAnd the field engineer's snapshot secret: a bold production change has an exact replica in a VM; if it fails, restore with one click, and the evidence of your work lives in a file.\n\nAnd containers? A lighter sibling of the VM: instead of a whole OS, a container shares the host kernel and carries only its app and dependencies — booting in seconds and sized in megabytes. Docker is the famous one, and you will meet it in network automation. The working rule: VMs for isolating systems, containers for speeding applications.",
        },
        tip: {
          ar: "قاعدة التخصيص الذهبية: مجموع ذاكرات الآلات الافتراضية لا يتجاوز 70 إلى 80 بالمئة من ذاكرة المضيف — اترك للنظام المضيف نصيبه وإلا خنقت مختبرك كله.",
          en: "The golden allocation rule: total VM memory must not exceed 70 to 80 percent of host memory — leave the host OS its share or you will choke your whole lab.",
        },
      },
    ],
    keyPoints: [
      { ar: "الآلة الافتراضية حاسوب كامل من برمجيات؛ قرصها ملف واحد قابل للنسخ والنقل", en: "A VM is a whole computer in software; its disk is one copyable, movable file" },
      { ar: "النوع الثاني فوق نظام المضيف للتعلم؛ والنوع الأول على العتاد للإنتاج والسحابة", en: "Type 2 sits on the host OS for learning; Type 1 sits on hardware for production and cloud" },
      { ar: "KVM داخل نواة لينكس هو أساس معظم السحابات العامة — ومنها مختبراتك الجامعية", en: "KVM inside the Linux kernel underlies most public clouds — including your university labs" },
      { ar: "اللقطات: صور فورية للحالة الكاملة — استعادة بثوانٍ وتجارب لا تُنسى", en: "Snapshots: instant full-state images — seconds to restore, experiments without fear" },
      { ar: "GNS3 وEVE-NG يحوّلان حاسوباً واحداً إلى مختبر شبكات كامل", en: "GNS3 and EVE-NG turn one laptop into a complete network lab" },
      { ar: "الحاوية تشارك النواة (أخف وأسرع)؛ والآلة الافتراضية تعزل نظاماً كاملاً", en: "Containers share the kernel (lighter, faster); VMs isolate a whole system" },
    ],
    commands: [
      { cmd: "VBoxManage list vms", desc: { ar: "سرد الآلات الافتراضية المسجلة في VirtualBox من الطرفية", en: "List the VMs registered in VirtualBox from the terminal" } },
      { cmd: "virsh list --all", desc: { ar: "عرض آلات KVM على الخادم وحالاتها تشغيلاً وإيقافاً", en: "Show a server's KVM machines and their running/stopped state" } },
      { cmd: "Get-VM", desc: { ar: "عرض آلات Hyper-V وحالاتها في PowerShell", en: "List Hyper-V machines and their states in PowerShell" } },
    ],
    quiz: [
      {
        q: { ar: "كل من VMware ESXi وKVM يصنفان:", en: "Both VMware ESXi and KVM classify as:" },
        options: [
          { ar: "من النوع الثاني Type 2", en: "Type 2 hypervisors" },
          { ar: "حاويات تطبيقات", en: "Application containers" },
          { ar: "من النوع الأول Type 1: خام المعدن", en: "Type 1: bare metal" },
          { ar: "أنظمة تشغيل مكتبية عادية", en: "Ordinary desktop operating systems" },
        ],
        correct: 2,
        explain: {
          ar: "ESXi يقلع مباشرة على العتاد بلا نظام تشغيل تحته، وKVM مدمج في نواة لينكس نفسها — كلاهما يدير الآلات مباشرة فوق المعدن.",
          en: "ESXi boots directly on hardware with no OS beneath it, and KVM is embedded in the Linux kernel itself — both manage machines directly above the metal.",
        },
      },
      {
        q: { ar: "قرص الآلة الافتراضية هو أساساً:", en: "A virtual machine's disk is fundamentally:" },
        options: [
          { ar: "قطعة عتاد منفصلة داخل الصندوق", en: "A separate piece of hardware in the case" },
          { ar: "قسم من ذاكرة RAM الدائمة", en: "A section of persistent RAM" },
          { ar: "ملف واحد على قرص المضيف قابل للنسخ والنقل", en: "One file on the host's disk, copyable and movable" },
          { ar: "شريط تخزين خارجي يوصل عند الحاجة", en: "An external tape connected when needed" },
        ],
        correct: 2,
        explain: {
          ar: "صيغ مثل VDI وVMDK وqcow2 تجعل «القرص الصلب» للآلة ملفاً واحداً — نسخه يعني استنساخ الحاسوب كاملاً، وهذا أساس المختبرات الحديثة.",
          en: "Formats like VDI, VMDK and qcow2 make the machine's 'hard disk' a single file — copying it clones the entire computer, the basis of modern labs.",
        },
      },
      {
        q: { ar: "اللقطة Snapshot في العالم الافتراضي هي:", en: "A snapshot in the virtual world is:" },
        options: [
          { ar: "نسخة احتياطية في السحابة العامة", en: "A backup copy in the public cloud" },
          { ar: "ترقية لذاكرة الآلة الافتراضية", en: "A memory upgrade for the VM" },
          { ar: "مستوى من مستويات RAID للأقراص", en: "A RAID level for disks" },
          { ar: "صورة فورية لحالة الآلة كاملة تُستعاد بثوانٍ", en: "An instant image of the machine's full state, restorable in seconds" },
        ],
        correct: 3,
        explain: {
          ar: "اللقطة تحفظ الحالة الكاملة — القرص والذاكرة والإعدادات — في لحظة زمنية، فتتيح التراجع الفوري عن أي تجربة فاشلة.",
          en: "A snapshot preserves the full state — disk, memory and settings — at a point in time, enabling instant rollback from any failed experiment.",
        },
      },
      {
        q: { ar: "الفرق الجوهري بين الحاوية والآلة الافتراضية:", en: "The essential difference between a container and a VM:" },
        options: [
          { ar: "الحاوية أبطأ دائماً من الآلة الافتراضية", en: "Containers are always slower than VMs" },
          { ar: "الحاوية تشارك نواة المضيف ولا تحمل نظام تشغيل كاملاً", en: "A container shares the host kernel and carries no full OS" },
          { ar: "الآلة الافتراضية تشارك نواة المضيف أيضاً", en: "VMs share the host kernel too" },
          { ar: "لا فرق بينهما عملياً", en: "There is no practical difference" },
        ],
        correct: 1,
        explain: {
          ar: "الحاوية تحتوي التطبيق واعتماداته فوق نواة مشتركة — ميغابايتات وثوانٍ؛ بينما تحمل VM نظام تشغيل كاملاً — جيجابايتات ودقائق، مقابل عزل أعمق.",
          en: "A container packages the app and its dependencies over a shared kernel — megabytes and seconds; a VM carries a full OS — gigabytes and minutes, in exchange for deeper isolation.",
        },
      },
    ],
  },
  {
    id: "l108",
    moduleId: "m11",
    order: 8,
    level: "beginner",
    title: { ar: "الحوسبة السحابية: IaaS و PaaS و SaaS", en: "Cloud Computing: IaaS, PaaS & SaaS" },
    summary: {
      ar: "التعريف الرسمي من NIST، والنماذج الثلاثة ومن يدير ماذا في كل منها، والمرونة والدفع بالمقدار، والنشر العام والخاص والهجين، ومهارات السحابة لمهندس الشبكات.",
      en: "The official NIST definition, the three service models and who manages what in each, elasticity and pay-as-you-go, public/private/hybrid deployment, and cloud skills for network engineers.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "التعريف الرسمي", en: "The Official Definition" },
        body: {
          ar: "حين يختلف اثنان على «ما هي السحابة؟» تحتكم الصناعة كلها إلى مرجع واحد: الوثيقة NIST SP 800-145 من المعهد الوطني الأمريكي للمعايير والتقنية (2011) — التعريف القصير الذي نظم صناعة بمليارات الدولارات:\n\n«نموذج يتيح وصولاً شبكياً سائداً ومريحاً عند الطلب إلى مجموعة مشتركة من موارد الحوسبة القابلة للتهيئة (شبكات وخوادم وتخزين وتطبيقات وخدمات) يمكن توفيرها وتحريرها سريعاً بأقل جهد إداري أو تفاعل مع مزوّد الخدمة».\n\nويحدد المعيار خمس سمات، إن غابت واحدة فليس ما تشاهده سحابة:\n- الخدمة الذاتية عند الطلب: تطلب خادماً من لوحة تحكم دون مكالمة واحدة\n- الوصول الشبكي الواسع عبر الإنترنت بمعايير مفتوحة\n- تجميع الموارد (Pooling) بين مستأجرين متعددين مع عزل بيانات كل واحد\n- المرونة السريعة (Elasticity): تتوسع عند الطلب وتتقلص عند هبوطه\n- الخدمة المقدَّرة (Measured Service): تدفع بالمقدار المستهلك — عدّاد كهرباء لا أكثر",
          en: "When two people argue about 'what is the cloud?', the whole industry appeals to one reference: NIST SP 800-145 from the US National Institute of Standards and Technology (2011) — the short definition that organized a multi-billion-dollar industry:\n\n'A model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (networks, servers, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction.'\n\nThe standard also fixes five characteristics — miss one and what you are looking at is not cloud:\n- On-demand self-service: you order a server from a dashboard without a single phone call\n- Broad network access over the Internet via open standards\n- Resource pooling across multiple tenants with each one's data isolated\n- Rapid elasticity: expand with demand, shrink when it falls\n- Measured service: pay only for what you consume — an electricity meter, nothing more",
        },
      },
      {
        heading: { ar: "النماذج الثلاثة", en: "The Three Service Models" },
        table: {
          caption: { ar: "IaaS وPaaS وSaaS — من يدير ماذا؟", en: "IaaS, PaaS and SaaS — who manages what?" },
          headers: [
            { ar: "البُعد", en: "Dimension" },
            { ar: "IaaS", en: "IaaS" },
            { ar: "PaaS", en: "PaaS" },
            { ar: "SaaS", en: "SaaS" },
          ],
          rows: [
            [
              { ar: "تديره أنت", en: "You manage" },
              { ar: "التطبيقات والبيانات ونظام التشغيل", en: "Apps, data, and the OS" },
              { ar: "تطبيقاتك وبياناتك", en: "Your apps and data" },
              { ar: "بياناتك وتهيئة المستخدمين", en: "Your data and user configuration" },
            ],
            [
              { ar: "يديره المزوّد", en: "Provider manages" },
              { ar: "الخوادم والمحاكاة والتخزين والشبكة", en: "Servers, virtualization, storage, network" },
              { ar: "كل ما تحت التطبيق: النظام والتشغيل والمحاكاة", en: "Everything below the app: OS, runtime, virtualization" },
              { ar: "كل شيء حتى التطبيق نفسه", en: "Everything, including the app itself" },
            ],
            [
              { ar: "أمثلة", en: "Examples" },
              { ar: "AWS EC2، DigitalOcean Droplet", en: "AWS EC2, DigitalOcean Droplet" },
              { ar: "Heroku، Google App Engine", en: "Heroku, Google App Engine" },
              { ar: "Gmail، Microsoft 365، Salesforce", en: "Gmail, Microsoft 365, Salesforce" },
            ],
            [
              { ar: "الوجهة النموذجية", en: "Typical fit" },
              { ar: "تحكم كامل بخادمك", en: "Full control of your server" },
              { ar: "نشر تطبيق بلا إدارة خوادم", en: "Ship an app without server admin" },
              { ar: "استعمال فوري للمستخدم النهائي", en: "Instant use for end users" },
            ],
          ],
        },
        body: {
          ar: "النماذج الثلاثة درجات على سلّم «من يدير من؟»:\n\n- IaaS (البنية التحتية كخدمة): تستأجر خام المعدن: آلة بصلاحيات الجذر كاملة وتثبّت ما تشاء — أنت مدير النظام هنا بكل معنى الكلمة\n- PaaS (المنصة كخدمة): تدفع كودك فقط؛ تبنيه المنصة وتشغّله وتتوسع به — لا تلمس نظام تشغيل أصلاً\n- SaaS (البرمجيات كخدمة): تطبيق جاهز في متصفحك — بريدك Gmail من هذا النوع أصلاً، منذ سنوات وأنت مستخدم سحابة دون أن تشعر\n\nوتشبيه البيتزا الشهير يلخص السلّم: On-Prem بيتزا من دقيقك في مطبخك؛ وIaaS عجين جاهز يُخبز بفرنك؛ وPaaS بيتزا تُسلَّم مطبوخة؛ وSaaS مطعم يتكفل بكل شيء حتى غسل الأطباق.\n\nوقارن المسؤولية بالأمان: كل طبقة يديرها المزوّد تخفف عن كاهلك الإدارة اليومية — لكن بياناتك تبقى مسؤوليتك الأولى في كل النماذج بلا استثناء.",
          en: "The three models are degrees on the 'who manages what?' ladder:\n\n- IaaS: you rent bare metal: a machine with full root control where you install anything — you are the sysadmin in every sense\n- PaaS: you deliver only code; the platform builds, runs and scales it — you never touch an operating system\n- SaaS: a finished app in your browser — your Gmail already belongs here; you have been a cloud user for years without noticing\n\nThe famous pizza analogy summarizes the ladder: on-prem is pizza from your own flour in your kitchen; IaaS is ready dough baked in your oven; PaaS is pizza delivered cooked; SaaS is a restaurant handling everything down to washing the dishes.\n\nWeigh responsibility against security: every layer the provider manages relieves your daily operations — but your data remains your first responsibility in every model without exception.",
        },
      },
      {
        heading: { ar: "انتقال المسؤولية عبر الطبقات", en: "The Responsibility Shift Across the Layers" },
        diagram: {
          kind: "layers",
          title: { ar: "تقلص مسؤوليتك من On-Prem إلى SaaS", en: "Your responsibility shrinking from on-prem to SaaS" },
          items: [
            { ar: "On-Prem: أنت تدير كل شيء حتى تبريد الخزانة", en: "On-prem: you manage everything down to rack cooling" },
            { ar: "IaaS: أنت تدير نظام التشغيل وما فوقه", en: "IaaS: you manage the OS and everything above" },
            { ar: "PaaS: أنت تدير تطبيقك وبياناته فقط", en: "PaaS: you manage only your app and its data" },
            { ar: "SaaS: أنت تدير مستخدميك وبياناتك وصلاحياتهم", en: "SaaS: you manage your users, data and their permissions" },
          ],
        },
        body: {
          ar: "من مركز بياناتك الخاص إلى بريدك الإلكتروني، تتقلص مسؤوليتك ويتوسع تفويضك:\n\n- On-Prem: الخوادم والتبريد والكهرباء وأنظمة التشغيل والترقيات — رأس مال ثقيل وطاقم دائم\n- IaaS: يختفي العتاد والبنية التحتية؛ وتبقى أنظمة التشغيل والترقيات وأمنها على عاتقك — مرونة كاملة مقابل مسؤولية نظام\n- PaaS: تختفي أنظمة التشغيل كلياً؛ وتتركز حياتك في كودك ومتغيراته وإصداراته\n- SaaS: تختار التطبيق وتدير مستخدميه وصلاحياتهم — ووقتك كله لعملك لا لتقنيتك\n\nولا يوجد نموذج «أفضل» من غيره — إنها أدوات لغايات: التحكم الكامل مقابل الراحة الكاملة. والمؤسسات الناضجة تمزج الثلاثة في منظومة واحدة: أنظمة خاصة للمسمّى، ومنصة للتطوير الداخلي، وبرمجيات جاهزة لكل ما هو سِلعي.",
          en: "From your own datacenter to your email inbox, your responsibility shrinks while your delegation grows:\n\n- On-prem: servers, cooling, power, operating systems, upgrades — heavy capital and permanent staff\n- IaaS: hardware and infrastructure vanish; operating systems, patching and their security stay on your shoulders — full flexibility in exchange for system responsibility\n- PaaS: operating systems disappear entirely; your life concentrates on your code, its variables and releases\n- SaaS: you pick the app and manage its users and permissions — all your time goes to your business, not your technology\n\nAnd no model is 'better' than another — they are tools for purposes: total control versus total convenience. Mature organizations mix all three into one system: private for the crown jewels, a platform for internal development, and off-the-shelf software for every commodity need.",
        },
      },
      {
        heading: { ar: "النشر: عامة وخاصة وهجينة، ومناطق العالم", en: "Deployment: Public, Private, Hybrid, and the Regions" },
        body: {
          ar: "أين تسكن السحابة نفسها؟ ثلاثة أنماط نشر معتمدة في معيار NIST نفسه:\n\n- عامة (Public): مزود واحد يملك كل شيء وتشاركه مع ملايين المستأجرين — AWS وAzure وGoogle Cloud؛ الأرخص استهلاكاً والأوسع نضجاً\n- خاصة (Private): سحابة داخل جدرانك بأدوات مثل OpenStack — للبنوك والجهات ذات المتطلبات التنظيمية الصارمة\n- هجينة (Hybrid): تمزج الاثنين — العبء المنتظم عندك والتقلبات الموسمية للعامة — وهذا أنضج ما يفعله الواقع المؤسسي\n\nوداخل السحابة العامة تتوزع البنية على مناطق (Regions): عناقيد مراكز بيانات جغرافية مستقلة الإدارة والأعطال، وفي كل منطقة مناطق توافر (AZ) متوارثة عن الكوارث لا تتشارك الكهرباء ولا الفيضان.\n\nوالخبر السار لجغرافيتك: أمازون تدير منطقة الشرق الأوسط من البحرين نفسها (me-south-1) — خوادمك الجامعية على بُعد أجزاء ميلي ثانية منك، وزمن الاستجابة الذي تقيسه في مختبراتك خير شاهد.\n\nوالزاوية المهنية الأمنية: تكرار الإنتاج عبر منطقتين أو منطقتي توافر ليس ترفاً — حريق منطقة واحدة لا يجوز أن يوقف خدمة عن العملاء أبداً.",
          en: "Where does the cloud itself live? Three deployment patterns, codified in the same NIST standard:\n\n- Public: one provider owns everything and you share it with millions of tenants — AWS, Azure, Google Cloud; the cheapest to consume and the most mature\n- Private: a cloud inside your own walls with tools like OpenStack — for banks and strictly regulated bodies\n- Hybrid: mixing both — steady workloads at home, seasonal bursts to the public side — the most mature thing enterprise reality does\n\nInside a public cloud, infrastructure spreads over regions: geographic datacenter clusters independent in management and failure, each holding availability zones (AZ) that share neither power nor flood.\n\nAnd good news for your geography: Amazon runs its Middle East region from Bahrain itself (me-south-1) — your university servers sit milliseconds away from you, and the latency you measure in labs is the best witness.\n\nAnd the professional security angle: duplicating production across two regions or AZs is not a luxury — one regional fire must never stop a customer-facing service.",
        },
      },
      {
        heading: { ar: "مهارات السحابة لمهندس الشبكات", en: "Cloud Skills for the Network Engineer" },
        body: {
          ar: "أخبرك سراً يريح بالك: السحابة ليست عالماً جديداً عليك — إنها عالمك القديم بواجهات جديدة:\n\n- السحابة الافتراضية الخاصة VPC = شبكتك المحلية المفاهيمية: شبكات فرعية وجداول توجيه وبوابات — كل مفرداتك القديمة تنتقل حرفياً\n- مجموعات الأمان (Security Groups) جدران نارية حالة لكل آلة؛ وقوائم التحكم NACL حماية للشبكة الفرعية — مفاهيم ستعرفها من دروس الأمن\n- مهارات سطر الأوامر والأتمتة التي تتعلمها هنا تصبح مباشرة أوامر aws وأعمال Terraform\n- مسار الشهادات العملي: AWS Cloud Practitioner ثم Solutions Architect Associate — أسرع طريق تعلّم منهجي معترف به\n\nولأن مختبرات جامعتك نفسها تسكن AWS — خوادم Amazon Linux 2 التي تلمسها كل أسبوع — فأنت تدرس السحابة عملياً منذ فصلك الأول. هذه الوحدة تكتفي بأن تسمي الأشياء بأسمائها الصحيحة.",
          en: "Let me tell you a comforting secret: the cloud is not a new world for you — it is your old world with new interfaces:\n\n- The Virtual Private Cloud (VPC) is your conceptual LAN: subnets, route tables, gateways — your entire vocabulary transfers literally\n- Security groups are per-machine stateful firewalls; NACLs protect the subnet — concepts you will recognize from the security modules\n- The command-line and automation skills you build here become aws commands and Terraform work directly\n- The practical certification path: AWS Cloud Practitioner then Solutions Architect Associate — the fastest recognized structured route\n\nAnd since your university's labs themselves live on AWS — the Amazon Linux 2 servers you touch every week — you have been studying the cloud hands-on since your first term. This unit merely gives proper names to what you already touch.",
        },
        tip: {
          ar: "الدفع بالمقدار سيف ذو حدين: آلة منسية تعمل شهراً كاملاً = فاتورة مفاجئة. اجعلها قاعدة حياة: أطفئ كل ما لست تعمل عليه الآن، وراجع لوحة الفواتير أسبوعياً.",
          en: "Pay-as-you-go is a double-edged sword: one forgotten machine running a full month = a surprise bill. Make it a life rule: shut down whatever you are not working on now, and review the billing dashboard weekly.",
        },
      },
    ],
    keyPoints: [
      { ar: "NIST SP 800-145 هو التعريف المرجعي: خمس سمات وعلى رأسها الدفع بالمقدار", en: "NIST SP 800-145 is the reference definition: five characteristics led by measured service" },
      { ar: "IaaS تدير نظامك؛ وPaaS تدير كودك؛ وSaaS تدير مستخدميك فقط", en: "IaaS leaves you the OS; PaaS your code; SaaS just your users" },
      { ar: "عامة للمشاركة، وخاصة للسيطرة التنظيمية، وهجينة للواقع الناضج", en: "Public for sharing, private for regulatory control, hybrid for mature reality" },
      { ar: "المناطق ومناطق التوافر: جغرافيا ال قوة والتكرار — ومنطقتنا تسكن البحرين", en: "Regions and AZs: the geography of power and redundancy — ours lives in Bahrain" },
      { ar: "VPC ومجموعات الأمان = مفرداتك الشبكية بأسماء سحابية جديدة", en: "VPCs and security groups = your networking vocabulary with new cloud names" },
      { ar: "أطفئ ما لا تستعمل وافحص الفواتير — عدّاد السحابة لا يرحم", en: "Shut down what you do not use and check the bills — the cloud meter is merciless" },
    ],
    commands: [
      { cmd: "aws sts get-caller-identity", desc: { ar: "من أنت في AWS؟ التحقق من هوية حسابك وصلاحياتك النشطة", en: "Who are you on AWS? Verify your account identity and active credentials" } },
      { cmd: "aws ec2 describe-regions", desc: { ar: "سرد مناطق AWS في العالم — بما فيها منطقة البحرين", en: "List AWS regions worldwide — including the Bahrain region" } },
      { cmd: "curl ifconfig.me", desc: { ar: "معرفة عنوان IP العام الذي تظهر به للإنترنت والسحابة", en: "Discover the public IP you present to the Internet and the cloud" } },
    ],
    quiz: [
      {
        q: { ar: "التعريف الرسمي المرجعي للحوسبة السحابية يستند إلى:", en: "The official reference definition of cloud computing rests on:" },
        options: [
          { ar: "RFC 791 الخاص بعناوين IP", en: "RFC 791 on IP addressing" },
          { ar: "قانون مور الاقتصادي", en: "Moore's economic law" },
          { ar: "NIST SP 800-145", en: "NIST SP 800-145" },
          { ar: "معايير ITU-T للاتصالات", en: "ITU-T telecom standards" },
        ],
        correct: 2,
        explain: {
          ar: "وثيقة NIST القصيرة عام 2011 هي المرجع الذي تقتبسه كل مقررات السحابة: تعريف ونماذج خدمة ثلاثة ونماذج نشر أربعة.",
          en: "NIST's short 2011 document is the reference every cloud course quotes: a definition, three service models and four deployment models.",
        },
      },
      {
        q: { ar: "في نموذج PaaS أنت مسؤول عن إدارة:", en: "In the PaaS model, you are responsible for managing:" },
        options: [
          { ar: "أنظمة التشغيل وترقياتها", en: "Operating systems and their patching" },
          { ar: "الخوادم الفيزيائية وتبريدها", en: "Physical servers and their cooling" },
          { ar: "تطبيقاتك وبياناتها فقط", en: "Only your applications and their data" },
          { ar: "لا شيء على الإطلاق", en: "Nothing at all" },
        ],
        correct: 2,
        explain: {
          ar: "المنصة تدير كل ما تحت التطبيق: النظام والتشغيل والمحاكاة — ويبقى كودك وبياناتك وإعداداتها على عاتقك وحدك.",
          en: "The platform manages everything below the app: OS, runtime, virtualization — your code, data and their settings remain on your shoulders alone.",
        },
      },
      {
        q: { ar: "«المرونة السريعة» Elasticity في تعريف NIST تعني:", en: "Rapid elasticity in the NIST definition means:" },
        options: [
          { ar: "تخزين أكبر بسعر أقل", en: "Bigger storage at a lower price" },
          { ar: "التوسع والتقلص آلياً وفق الطلب", en: "Scaling up and down automatically with demand" },
          { ar: "سرعة معالجة أعلى للآلات", en: "Higher processing speed for machines" },
          { ar: "مرونة الكابلات في مراكز البيانات", en: "Cable flexibility in datacenters" },
        ],
        correct: 1,
        explain: {
          ar: "المرونة جوهر السحابة: الموارد تُوفَّر وتُحرَّر بسرعة تناسب الحمل — نهار الذروة مئة خادم، وليل الهدوء خمسة، وبالعدّاد نفسه.",
          en: "Elasticity is the cloud's essence: resources provision and release at load speed — a hundred servers at peak day, five in the quiet night, on the same meter.",
        },
      },
      {
        q: { ar: "منطقة AWS في الشرق الأوسط يقع مقرها في:", en: "The AWS Middle East region is headquartered in:" },
        options: [
          { ar: "دبي", en: "Dubai" },
          { ar: "الرياض", en: "Riyadh" },
          { ar: "البحرين", en: "Bahrain" },
          { ar: "القاهرة", en: "Cairo" },
        ],
        correct: 2,
        explain: {
          ar: "منطقة me-south-1 تسكن البحرين منذ 2019 — أقرب نقطة سحابية عامة كبرى لطلاب الخليج، وزمن استجابة مختبراتهم شاهد عليها.",
          en: "The me-south-1 region has lived in Bahrain since 2019 — the nearest major public cloud point for Gulf students, and their lab latency proves it.",
        },
      },
    ],
  },
  {
    id: "l109",
    moduleId: "m11",
    order: 9,
    level: "beginner",
    title: { ar: "المنافذ والملحقات: USB و HDMI و PCIe", en: "Ports & Peripherals: USB, HDMI & PCIe" },
    summary: {
      ar: "جولة في منافذ جهازك: عائلة USB بأشكالها وأجيالها وقوة USB-C، وHDMI وDisplayPort، ومنفذ RJ45 ملك الشبكيين، ومسارات PCIe وبطاقات الشبكة.",
      en: "A tour of your machine's ports: the USB family with its shapes, generations and USB-C power, HDMI and DisplayPort, the networker's RJ45 kingdom, and PCIe lanes with network cards.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "منافذك اليومية", en: "Your Everyday Ports" },
        body: {
          ar: "خذ حاسوبك واقلبه — ستجد لغة المنافذ التي عليك أن تتقنها قراءةً من النظرة الأولى:\n\n- USB: ملك الاتصال العام للملحقات — لوحات مفاتيح وأقراص وشواحن ومرافئ توصيل؛ بأشكاله الثلاثة: A المسطح العريق، وB المربع للطابعات، وC الصغير القابل للعكس\n- HDMI: صوت وصورة رقميان في كابل واحد إلى الشاشات والتلفزيونات؛ وأخوه DisplayPort أسرع في محطات العمل — دقات أعلى ومعدلات تحديث جنونية\n- RJ45: منفذ الإيثرنت ذو الأسلاك الثمانية ودفعته القوية — منفذك أنت أيها الشبكي؛ مهنة كاملة تسكن هذا المقبس البلاستيكي\n- مقبس الصوت 3.5mm: الصوت التناظري الخالد للسماعات والميكروفونات\n\nاعرف المنافذ بأشكالها قبل أرقامها: الشكل يقرر ما يتصل، والجيل يقرر كم ينقل — والخيطان مختلفان تماماً عن بعضهما.",
          en: "Take your computer and flip it over — you will find the port language you must learn to read at first glance:\n\n- USB: the king of general peripheral connectivity — keyboards, drives, chargers and docks; in its three shapes: the classic flat A, the square B for printers, and the small reversible C\n- HDMI: digital audio and video in one cable to monitors and TVs; its sibling DisplayPort is faster on workstations — higher resolutions and wilder refresh rates\n- RJ45: the eight-wire Ethernet port with its sturdy click — your port, networker; an entire profession lives inside that plastic socket\n- The 3.5 mm audio jack: the immortal analog home of headphones and microphones\n\nKnow ports by shape before numbers: the shape decides what connects, the generation decides how much flows — and those are two completely different threads.",
        },
      },
      {
        heading: { ar: "عائلة USB: الأشكال والأجيال", en: "The USB Family: Shapes & Generations" },
        table: {
          caption: { ar: "أجيال USB وسرعاتها النظرية", en: "USB generations and their theoretical speeds" },
          headers: [
            { ar: "الجيل", en: "Generation" },
            { ar: "الاسم التجاري الشائع", en: "Common marketing name" },
            { ar: "السرعة النظرية", en: "Theoretical speed" },
            { ar: "ملاحظة", en: "Note" },
          ],
          rows: [
            [
              { ar: "USB 2.0", en: "USB 2.0" },
              { ar: "Hi-Speed", en: "Hi-Speed" },
              { ar: "480Mbps", en: "480 Mbps" },
              { ar: "اللوحات المفاتيح والأجهزة القديمة", en: "Keyboards and legacy devices" },
            ],
            [
              { ar: "USB 3.2 Gen 1", en: "USB 3.2 Gen 1" },
              { ar: "USB 3.0 / SuperSpeed", en: "USB 3.0 / SuperSpeed" },
              { ar: "5Gbps", en: "5 Gbps" },
              { ar: "المنفذ الأزرق وعلامة SS", en: "The blue port with the SS mark" },
            ],
            [
              { ar: "USB 3.2 Gen 2", en: "USB 3.2 Gen 2" },
              { ar: "USB 3.1", en: "USB 3.1" },
              { ar: "10Gbps", en: "10 Gbps" },
              { ar: "الغالبية الحديثة للأجهزة", en: "The modern majority" },
            ],
            [
              { ar: "USB 3.2 Gen 2x2", en: "USB 3.2 Gen 2x2" },
              { ar: "USB 3.2", en: "USB 3.2" },
              { ar: "20Gbps", en: "20 Gbps" },
              { ar: "قليل الانتشار، منافذ USB-C فقط", en: "Rare, USB-C ports only" },
            ],
            [
              { ar: "USB4", en: "USB4" },
              { ar: "USB4", en: "USB4" },
              { ar: "40Gbps", en: "40 Gbps" },
              { ar: "متوافق مع Thunderbolt 3", en: "Compatible with Thunderbolt 3" },
            ],
          ],
        },
        body: {
          ar: "الترقيم التجاري لـUSB أربك الجميع تقريباً — دعني أرتّبه لك نهائياً:\n\n- السرعة سمة «الجيل» لا «الشكل»: منفذ USB-A قديم قد يكون 480Mbps أو 5Gbps؛ ومنفذ USB-C عصري قد يحمل أي سرعة في القائمة!\n- USB4 ينقل PCIe وDisplayPort داخل النفق نفسه (Tunneling) — كابل واحد يغذي شاشتين وشبكة 10G وأقراصاً معاً\n- توصيل الطاقة PD: بالأمس 2.5 واط فقط؛ واليوم 100 واط تشغل حاسوباً محمولاً كاملاً؛ وأحدث المواصفة 240 واط للمحطات الشرهة\n- الإشارات على المنفذ: الأزرق يعني 5Gbps فأكثر؛ وSS أو SS10 بجانب الشعار تعني الجيل الثالث فأكثر؛ ورمز البطارية على USB-C يعني منفذ شحن\n\nعادة مهنية صغيرة تغنيك عن الحيرة: اقرأ ما يُطبع بجانب المنفذ على اللوحة نفسها — الأشكال تجامل، والطباعة تصدق.",
          en: "USB's commercial numbering confused nearly everyone — let me settle it for you once and for all:\n\n- Speed belongs to the 'generation', not the 'shape': an old USB-A port may carry 480 Mbps or 5 Gbps; a modern USB-C may carry any speed on that list!\n- USB4 tunnels PCIe and DisplayPort inside the same pipe — one cable feeding two monitors, a 10G network and drives together\n- Power Delivery: yesterday 2.5 watts only; today 100 W runs a full laptop; and the newest spec reaches 240 W for hungry stations\n- The marks beside the port: blue means 5 Gbps or more; SS or SS10 by the logo means Gen 3 and above; a battery symbol on USB-C means a charging port\n\nOne small professional habit ends the confusion: read what is printed beside the port on the board itself — shapes flatter, labels tell the truth.",
        },
      },
      {
        heading: { ar: "PCIe وبطاقات التوسعة — وعالم بطاقات الشبكة", en: "PCIe & Expansion Cards — and the World of NICs" },
        body: {
          ar: "خلف اللوحة الأم تمتد الطرق السريعة الحقيقية: PCIe (مسار PCI السريع) — سلسلة «خطوط» (Lanes) تنقل البيانات تسلسلياً بأزواج ذهاباً وإياباً:\n\n- العرض x1 للبطاقات الصغيرة، وx4 وx8 للشبكات والتخزين، وx16 لبطاقات الرسوميات الجائعة للنطاق\n- الأجيال: الجيل 3 نحو 1GB/s لكل خط، والجيل 4 نحو 2GB/s، والجيل 5 نحو 4GB/s — بطاقة x16 على جيل رابع تعني نحو 32GB/s ذهاباً وإياباً\n- والبطاقات التي تركب هنا: بطاقات الشبكة NIC (بطاقتك أنت!)، وبطاقات الرسوميات GPU، وبطاقات تخزين HBA، وبطاقات الصوت والالتقاط\n\nوقبل شراء بطاقة شبكة، افحص خمس نقاط — لا سادسة لها:\n- السرعة: 1G للعام، و10G للخوادم والمختبرات الجادة، و25/40/100G لمراكز البيانات\n- الواجهة: RJ45 نحاس للمدى القصير، أو SFP+ ألياف للمدى الأبعد\n- الناقل: x1 يكفي 1G بأريحية، بينما 10G يريدها x4 فأكثر — وإلا خنقتَ البطاقة عمداً\n- دعم المشغّل: أقبل Intel وBroadcom على لينكس بلا تفكير — توافقهما مضمون تاريخياً\n- مسرّعات الشبكة (Offloads) مثل TSO وRSS تخفف الحمل عن المعالج — فروق تظهر تحت الضغط العالي",
          en: "Behind the motherboard run the true highways: PCIe (PCI Express) — a series of serial 'lanes' carrying data in pairs, out and back:\n\n- Width x1 for small cards, x4 and x8 for network and storage, x16 for bandwidth-hungry graphics cards\n- Generations: Gen 3 about 1 GB/s per lane, Gen 4 about 2 GB/s, Gen 5 about 4 GB/s — a x16 card on Gen 4 means roughly 32 GB/s round trip\n- The cards riding here: network NICs (your card!), graphics GPUs, storage HBAs, and sound and capture cards\n\nAnd before buying a network card, check five points — there is no sixth:\n- Speed: 1G for general use, 10G for servers and serious labs, 25/40/100G for datacenters\n- The interface: RJ45 copper for short range, or SFP+ fiber for the longer reach\n- The bus: x1 handles 1G comfortably, while 10G wants x4 or more — otherwise you deliberately choked the card\n- Driver support: take Intel or Broadcom on Linux without blinking — their compatibility is historically guaranteed\n- Network offloads like TSO and RSS relieve the CPU — differences that surface under heavy load",
        },
      },
      {
        heading: { ar: "تصنيف الملحقات", en: "Classifying Peripherals" },
        body: {
          ar: "الملحقات (Peripherals) هي كل ما يحيط بالصندوق، وتصنف وظيفياً في ثلاث عائلات — ورابعة شبكية نضيفها نحن بحكم مهنتنا:\n\n- إدخال Input: لوحة المفاتيح والفأرة والماسح الضوئي والكاميرا والميكروفون — تغذي الحاسوب بالبيانات\n- إخراج Output: الشاشة والطابعة والسماعات — تسلّمك النتائج\n- تخزين Storage: الأقراص الخارجية وNAS ووسائط USB — تحفظ وتستعيد\n- شبكة Network (رأي مهني صريح): بطاقة الشبكة والمودم والراوتر — مدخلات ومخرجات نحو العالم الخارجي، وتستحق عائلة مستقلة في عصرنا\n\nولاحظ التداخل الحديث: الشاشة اللمسية إدخال وإخراج معاً؛ والسماعة بميكروفونها كذلك؛ والبطاقة الذكية تحفظ وتعالج. التصنيف أداة تفكير لا قفص حديدي — والحدود تخدم الفهم لا تعقّده.\n\nوعند تشخيص ملحق لا يعمل: جرّبه على منفذ آخر، ثم على جهاز آخر (هل العلة في الملحق أم المنفذ؟)، ثم تحقق من المشغّل في إدارة الأجهزة — ثلاث خطوات تحسم أغلب قضايا المكتب.",
          en: "Peripherals are everything surrounding the box, classified by function into three families — plus a networking one we add by the right of our profession:\n\n- Input: keyboard, mouse, scanner, camera, microphone — feeding the computer data\n- Output: monitor, printer, speakers — delivering the results to you\n- Storage: external drives, NAS, USB media — saving and retrieving\n- Network (an explicit professional opinion): the NIC, modem and router — inputs and outputs toward the outside world, deserving their own family in our era\n\nNote the modern overlap: a touchscreen is input and output together; a headset with its mic likewise; a smart card stores and computes. Classification is a thinking tool, not an iron cage — boundaries serve understanding, not complexity.\n\nAnd when a peripheral misbehaves: try it on another port, then on another computer (is the fault in the peripheral or the port?), then check the driver in Device Manager — three steps that settle most office cases.",
        },
        tip: {
          ar: "منفذ USB لا يعطي سرعة جيله إلا إن كان الطرفان والكابل من الجيل نفسه — كابل رخيص يخنق SSD عصرياً إلى 480Mbps وأنت تظلم القرص البريء.",
          en: "A USB port delivers its generation's speed only when both endpoints and the cable are of that generation — a cheap cable chokes a modern SSD to 480 Mbps while you blame the innocent drive.",
        },
      },
    ],
    keyPoints: [
      { ar: "الشكل يقرر ما يتصل؛ والجيل يقرر كم ينقل — لا تخلط بينهما أبداً", en: "The shape decides what connects; the generation decides how much flows — never confuse them" },
      { ar: "USB من 480Mbps حتى 80Gbps — وقوة PD تصل 240 واط", en: "USB spans 480 Mbps to 80 Gbps — and PD power reaches 240 W" },
      { ar: "USB-C شكل قابل للعكس وليس سرعة: اقرأ المواصفة المطبوعة", en: "USB-C is a reversible shape, not a speed: read the printed spec" },
      { ar: "PCIe خطوط x1/x4/x8/x16 وأجيال تتضاعف سرعة الخط الواحد", en: "PCIe lanes come x1/x4/x8/x16, with generations doubling per-lane speed" },
      { ar: "شراء بطاقة الشبكة: السرعة والواجهة وعرض الناقل والمشغّل والمسرّعات", en: "Buying a NIC: speed, interface, bus width, drivers, offloads" },
      { ar: "الملحقات إدخال وإخراج وتخزين — والشبكة عائلتنا الرابعة المهنية", en: "Peripherals are input, output, storage — and networking is our fourth professional family" },
    ],
    commands: [
      { cmd: "lsusb", desc: { ar: "سرد أجهزة USB المتصلة بجهاز لينكس حالياً", en: "List the USB devices currently attached to a Linux machine" } },
      { cmd: "lspci", desc: { ar: "استكشاف بطاقات PCIe المركبة — ابحث عن Ethernet لبطاقة الشبكة", en: "Discover installed PCIe cards — look for Ethernet for your NIC" } },
      { cmd: "Get-NetAdapter", desc: { ar: "عرض بطاقات الشبكة وحالاتها وسرعاتها في PowerShell", en: "List network adapters with their states and speeds in PowerShell" } },
    ],
    quiz: [
      {
        q: { ar: "السرعة النظرية لمنفذ USB 3.2 Gen 1 (المعروف بـ USB 3.0) هي:", en: "The theoretical speed of USB 3.2 Gen 1 (known as USB 3.0) is:" },
        options: [
          { ar: "480Mbps", en: "480 Mbps" },
          { ar: "5Gbps", en: "5 Gbps" },
          { ar: "10Gbps", en: "10 Gbps" },
          { ar: "40Gbps", en: "40 Gbps" },
        ],
        correct: 1,
        explain: {
          ar: "الجيل الثالث الأول ينقل 5 جيجابت في الثانية — وهو المنفذ الأزرق بعلامة SS؛ و10Gbps للجيل الثاني و40Gbps لـUSB4.",
          en: "The first Gen 3 tier transfers 5 gigabits per second — the blue port with the SS mark; 10 Gbps belongs to Gen 2 and 40 Gbps to USB4.",
        },
      },
      {
        q: { ar: "منفذ RJ45 في جهازك يوصل:", en: "The RJ45 port on your machine connects:" },
        options: [
          { ar: "صوتاً تناظرياً للسماعات", en: "Analog audio to speakers" },
          { ar: "صورة الشاشة الرئيسية", en: "The primary display" },
          { ar: "شبكة إيثرنت بثمانية أسلاك نحاسية", en: "An Ethernet network over eight copper wires" },
          { ar: "لوحة مفاتيح ميكانيكية", en: "A mechanical keyboard" },
        ],
        correct: 2,
        explain: {
          ar: "RJ45 هو منفذ الإيثرنت القياسي: ثمانية أسلاك مجدولة تصل جهازك بالمبدل — منفذ مهنة الشبكات بأكملها.",
          en: "RJ45 is the standard Ethernet port: eight twisted wires linking your machine to the switch — the port of the entire networking profession.",
        },
      },
      {
        q: { ar: "بطاقة شبكة 10G رُكّبت على منفذ PCIe x1 واحد؛ ماذا يحدث؟", en: "A 10G NIC installed on a single PCIe x1 slot; what happens?" },
        options: [
          { ar: "تعمل بكفاءة كاملة", en: "It works at full efficiency" },
          { ar: "تصير أسرع من التصميم", en: "It becomes faster than designed" },
          { ar: "يخنقها الناقل — 10G تريد x4 فأكثر", en: "The bus chokes it — 10G wants x4 or more" },
          { ar: "لن يقلع الجهاز أصلاً", en: "The machine will not boot at all" },
        ],
        correct: 2,
        explain: {
          ar: "خط PCIe x1 لا يحمل 10Gbps مستدامة؛ والقاعدة: 1G تكفيها x1 و10G تريدها x4 فأكثر — وإلا دفعت ثمن بطاقة خنقها منفذك.",
          en: "A single x1 lane cannot sustain 10 Gbps; the rule: 1G is happy on x1 while 10G wants x4 or more — otherwise you paid for a card your slot strangles.",
        },
      },
      {
        q: { ar: "الطابعة والسماعات يصنفان ضمن ملحقات:", en: "A printer and speakers classify as which peripherals?" },
        options: [
          { ar: "إدخال Input", en: "Input" },
          { ar: "إخراج Output", en: "Output" },
          { ar: "تخزين Storage", en: "Storage" },
          { ar: "شبكة Network", en: "Network" },
        ],
        correct: 1,
        explain: {
          ar: "كلاهما يخرج نتائج الحاسوب إليك: الطابعة على الورق والسماعات في الهواء — عائلة الإخراج بامتياز.",
          en: "Both deliver the computer's results to you: the printer on paper and the speakers through the air — the output family par excellence.",
        },
      },
    ],
  },
  {
    id: "l110",
    moduleId: "m11",
    order: 10,
    level: "beginner",
    title: { ar: "الأداء وقانون مور واقتناء الأجهزة بذكاء", en: "Performance, Moore's Law & Smart Buying" },
    summary: {
      ar: "قانون مور ونصف قرن من النمو الأسّي، ولماذا توقف سباق التردد وولد عصر النوى، وتشخيص عنق الزجاجة، ومواصفات حاسوب طالب IT، ونظرة إلى المستقبل.",
      en: "Moore's law and half a century of exponential growth, why the frequency race died and the multicore era was born, bottleneck diagnosis, an IT student's buying specs, and a look ahead.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "قانون مور: نبوءة صنعت العالم", en: "Moore's Law: the Prophecy That Built the World" },
        body: {
          ar: "عام 1965 — قبل ثمانٍ وأربعين سنة من أول هاتف ذكي — كتب غوردون مور، المؤسس المستقبلي لشركة Intel، مقالة في مجلة Electronics لاحظ فيها أن كثافة المكونات على الرقاقة تتضاعف نحوياً كل عام، ثم عدّلها عام 1975 إلى كل عامين.\n\n- لم يكن قانوناً فيزيائياً بل ملاحظة اقتصادية: مضاعفة «التعقيد عند الحد الأدنى للتكلفة» — عدد المكونات الذي يجعل الرقاقة أرخص لكل وظيفة\n- الصناعة اتخذتها نبوءة ذاتية التحقق: خارطة استثمار بمليارات الدولارات لتلبية الإيقاع كل جيل\n- والنتيجة المرئية: هاتف جيبك اليوم أقوى من حواسيب برنامج أبولو 11 مجتمعة بملايين المرات\n\nلكن كل أسّ ينتهي. كثافة الرقاقات تقارب حدود الذرة الفعلية — مسافات بضعة نانومترات بين الترانزستورات — وكل خطوة أصغر تكلف أضعاف سابقتها. لهذا تشتري اليوم ترقيات أصغر إحساساً مما اعتاده والدك، ولهذا تحوّل السباق من «المزيد في الرقاقة» إلى «الأذكى في الرقاقة».",
          en: "In 1965 — forty-eight years before the first smartphone — Gordon Moore, Intel's future co-founder, wrote an article in Electronics magazine observing that component density on chips was doubling roughly every year, later revised in 1975 to every two years.\n\n- It was never a law of physics but an economic observation: doubling 'the complexity for minimum component costs' — the component count that makes a chip cheapest per function\n- The industry adopted it as a self-fulfilling prophecy: a multi-billion-dollar investment roadmap meeting the rhythm every generation\n- The visible result: the phone in your pocket today outperforms all of Apollo 11's computers combined, millions of times over\n\nBut every exponential ends. Chip density nears the physical atomic limits — a few nanometers between transistors — and each smaller step costs multiples of the last. That is why today's upgrades feel smaller than your father's did, and why the race shifted from 'more on the chip' to 'smarter on the chip'.",
        },
      },
      {
        heading: { ar: "جدار الطاقة وعصر النوى المتعددة", en: "The Power Wall & the Multicore Era" },
        body: {
          ar: "سؤال يميّز الفاهم من الحافظ: لماذا توقف سباق الغيغاهرتز عند نحو 4 إلى 5GHz منذ منتصف العقد الأول من الألفية؟\n\nالجواب قطعة فيزياء جميلة: استهلاك المعالج للطاقة يتناسب مع التردد مضروباً في مربع الجهد. لعقود رفع المهندسون التردد وخفضوا الجهد معاً (تقليص Dennard) فبقيت الحرارة تحت السيطرة. ثم اصطدم التصغير بأرضية الجهد الأدنى — انهار التقليص ووقفت المعادلة عارية: ارفع التردد فتتلظى الرقاقة.\n\n- الحل الصناعي: بدل معالج أسرع واحد، ضع عشرة معالجات (نوى) في الرقاقة نفسها بطاقة مجموعها نفسها\n- الثمن البرمجي: الاستفادة تتطلب برمجيات متوازية — برامج اليوم تحتاج «خيوطاً» لا «خطوة أسرع»\n- وقاعدة أمدال تبقيك متواضعاً: الجزء المتسلسل من برنامجك يسقف التسريع مهما كثرت النوى\n\nولهذا ترى اليوم: 16 نواة في حاسوب مكتبي عادي، و64 إلى 96 نواة في خادم، وآلاف الأنوية في مسرّعات GPU — التوازي اسم اللعبة منذ عقدين كاملين.",
          en: "A question separating understanding from memorization: why did the gigahertz race stall around 4 to 5 GHz since the mid-2000s?\n\nThe answer is a beautiful piece of physics: a CPU's power scales with frequency multiplied by voltage squared. For decades engineers raised frequency while lowering voltage (Dennard scaling), keeping heat in check. Then miniaturization hit the floor of minimum voltage — the scaling collapsed and the naked equation stood: raise the frequency and the chip burns.\n\n- The industry's answer: instead of one faster processor, put ten processors (cores) in the same chip at the same total power\n- The software price: benefiting requires parallel programs — today's software needs threads, not a faster single step\n- And Amdahl's law keeps you humble: the serial part of your program caps the speedup no matter how many cores pile on\n\nHence today's landscape: 16 cores in an ordinary desktop, 64 to 96 in a server, thousands in GPU accelerators — parallelism has been the name of the game for two full decades.",
        },
      },
      {
        heading: { ar: "أين عنق الزجاجة؟", en: "Where Is the Bottleneck?" },
        body: {
          ar: "«الجهاز بطيء» تشخيصٌ لا شكوى. افحص بالترتيب — فالغالبية الساحقة لبطء اليوم قرصٌ أو ذاكرة، والمعالج آخر المتهمين:\n\n- القرص: إقلاع يستغرق دقائق، وتجمّد عند فتح الملفات، ومؤشر نشاط القرص 100% دائماً — قرص HDD قديم يستبدل بـSSD فيعود الجهاز كأنه وُلد من جديد\n- الذاكرة: تبويبات المتصفح تقتل الجهاز، والنظام «يستبدل بالقرص» Swap والقرص يئنّ بجنون — ذاكرة ناقصة؛ وإن كنت تشغل VMs فهي أول المتهمين\n- المعالج: التصدير والترميز والألعاب تشبع كل الأنوية 100% — هنا فقط فكّر بمعالج أقوى\n- الشبكة: كل شيء محلي سريع لكن الويب يزحف — جهازك بريء أصلاً؛ راجع وحدة الشبكات!\n\nأدواتك المهنية: Task Manager على ويندوز بتبويب Performance، وhtop على لينكس — راقب قبل أن تحكم. وللقياس المعياري الموثق: Geekbench للمعالجات وCrystalDiskMark للأقراص — أرقام قابلة للمقارنة لا انطباعات.\n\nوالقاعدة الذهبية للترقية بالترتيب: SSD أولاً ثم RAM ثم المعالج أخيراً — أعظم دفعة أداء لكل دينار تدفعه.",
          en: "'The machine is slow' is a diagnosis, not a complaint. Check in order — the overwhelming majority of today's slowness is disk or memory, with the CPU the last suspect:\n\n- The disk: booting takes minutes, freezes on file opens, and disk activity pinned at 100% — an old HDD replaced by an SSD returns the machine as if reborn\n- Memory: browser tabs murder the device, the system swaps to disk with the drive grinding madly — short RAM; and if you run VMs, it is the prime suspect\n- The CPU: rendering, compiling, gaming saturating every core at 100% — only here consider a stronger processor\n- The network: everything local is fast yet the web crawls — your device is innocent; revisit the networking module!\n\nYour professional tools: Task Manager's Performance tab on Windows and htop on Linux — observe before judging. For documented benchmarking: Geekbench for CPUs and CrystalDiskMark for drives — comparable numbers, not impressions.\n\nAnd the golden upgrade order: SSD first, then RAM, CPU last — the greatest performance boost per dinar you spend.",
        },
      },
      {
        heading: { ar: "حاسوب طالب IT: مواصفات الشراء الذكي", en: "The IT Student's Machine: Smart Buying Specs" },
        table: {
          caption: { ar: "الحد الأدنى والموصى به لطالب شبكات", en: "The floor and the recommended specs for a networking student" },
          headers: [
            { ar: "المكوّن", en: "Component" },
            { ar: "الحد الأدنى", en: "Minimum" },
            { ar: "الموصى به", en: "Recommended" },
            { ar: "لماذا", en: "Why" },
          ],
          rows: [
            [
              { ar: "الذاكرة RAM", en: "RAM" },
              { ar: "16GB", en: "16 GB" },
              { ar: "32GB", en: "32 GB" },
              { ar: "الآلات الافتراضية تعيش على الذاكرة", en: "VMs live on memory" },
            ],
            [
              { ar: "القرص", en: "Storage" },
              { ar: "SSD NVMe بسعة 512GB", en: "512 GB NVMe SSD" },
              { ar: "1TB NVMe Gen4", en: "1 TB NVMe Gen4" },
              { ar: "أقراص VMs ومختبرات GNS3 تلتهم المساحة", en: "VM disks and GNS3 labs devour space" },
            ],
            [
              { ar: "المعالج", en: "CPU" },
              { ar: "6 أنوية حديثة", en: "6 modern cores" },
              { ar: "8 أنوية فأكثر", en: "8+ cores" },
              { ar: "كل آلة افتراضية تأكل أنويتها", en: "Every VM eats its cores" },
            ],
            [
              { ar: "الشبكة", en: "Networking" },
              { ar: "إيثرنت RJ45 مع Wi-Fi 6", en: "RJ45 Ethernet plus Wi-Fi 6" },
              { ar: "إضافة محول USB 3.0 بسرعة 1G", en: "Plus a USB 3.0 1G adapter" },
              { ar: "واجهات مختبرات وأجهزة الشبكات", en: "Lab interfaces and network gear" },
            ],
            [
              { ar: "البطارية", en: "Battery" },
              { ar: "6 ساعات عمل", en: "6 working hours" },
              { ar: "8 ساعات فأكثر", en: "8+ hours" },
              { ar: "يوم دراسي كامل بلا مقبس", en: "A full study day without a socket" },
            ],
          ],
        },
        body: {
          ar: "اشترِ لمنهجك لا للألعاب — حاسوبك مختبر كامل، ومواصفاته تقرر رحلة أربع سنوات:\n\n- الذاكرة أولاً: 16GB حد الوجود المحترم مع الآلات الافتراضية — وعصا واحدة 8GB ستجعلك تكره VirtualBox قبل نصف الفصل\n- القرص NVMe: ملفات الأقراص الافتراضية عمالقة، وسرعته المتتالية تُحَس فعلاً عند تشغيل المختبر\n- المعالج: الجيل أهم من العدد؛ ست أنوية من جيل حديث تتفوق على عشر من جيل قديم\n- وصفقة العمر للطلاب: أجهزة الشركات المسترجعة Refurbished من الدرجة الأولى بضمان سنة — أفضل قيمة مقابل دينار تعرفها السوق\n\nوإن كنت تشتري لخادم فالميزان يختلف جذرياً: الموثوقية تُقاس «بالتسعات» — 99.9% تعني 8.8 ساعة توقف في السنة، و99.99% تعني 53 دقيقة فقط. ذاكرة ECC المصححة ذاتياً، ومجموعات RAID، ومزودات طاقة مزدوجة — كلها قبل أي رفاهية أداء.",
          en: "Buy for your curriculum, not for gaming — your machine is a full lab, and its specs decide a four-year journey:\n\n- Memory first: 16 GB is the respectable existence with virtual machines — and a single 8 GB stick will make you hate VirtualBox before mid-term\n- The NVMe disk: virtual disk files are giants, and its sequential speed is truly felt when spinning up labs\n- The CPU: generation beats count; six modern cores beat ten old ones\n- And the student deal of a lifetime: Tier-1 refurbished business laptops with a year of warranty — the best value per dinar the market knows\n\nAnd if you are buying for a server, the scale changes radically: reliability is measured 'in nines' — 99.9% means 8.8 hours of downtime a year, and 99.99% just 53 minutes. Self-correcting ECC memory, RAID arrays, redundant power supplies — all before any performance luxury.",
        },
      },
      {
        heading: { ar: "المستقبل: الكم وNeuromorphic — والأساس يبقى", en: "The Future: Quantum & Neuromorphic — and the Bedrock Remains" },
        body: {
          ar: "الحاسوب الكمي لا «يسرّع» حاسوبك — بل يجيب أسئلة من نوع مختلف: بتات كمومية (Qubits) تتموضع في تراكب فتستكشف مسارات هائلة دفعة واحدة، وتتفوق في فك الشفرات ومحاكاة الجزيئات ومسائل التحسين — لا في تشغيل المتصفح وتحرير الفيديو.\n\n- التبريد والاستقرار تحدٍّ فيزيائي هائل: التراكب هش، وانهيار التماسك يهدم الحساب كله\n- والشرائح العصبية Neuromorphic تحاكي شبكات الدماغ باستهلاك ميلي واط — هدفها أجهزة حافة ذكية لا مراكز بيانات\n\nوالرأي المهني الهادئ الذي أوصيك به: قبل الانبهار بكل جديد، اعلم أن أساس مهنتك لا يزول — معمارية فون نويمان وآلة تورنغ ونموذج OSI وبروتوكول TCP/IP: تتغير سرعة الأدوات وتبقى مبادئها عقوداً. الاستثمار في الفهم العميق يظل أعلى العوائد، والشهادات تتجدد أما المفاهيم فتبقى — وسوف تحتاجها كل مرة تتجدد فيها التكنولوجيا أمام عينيك.",
          en: "The quantum computer does not 'speed up' your laptop — it answers a different class of questions: quantum bits (qubits) sit in superposition, exploring enormous paths at once, excelling at code breaking, molecule simulation and optimization — not at running browsers or editing video.\n\n- Cooling and stability remain brutal physics: superposition is fragile, and decoherence destroys the whole computation\n- And neuromorphic chips mimic the brain's networks at milliwatt consumption — their target is smart edge devices, not datacenters\n\nAnd the calm professional advice I owe you: before marveling at every novelty, know that your profession's bedrock does not vanish — the von Neumann architecture, the Turing machine, the OSI model and TCP/IP: tool speeds change while principles persist for decades. Deep understanding remains the highest-return investment; certifications renew but concepts stay — and you will need them every time technology reinvents itself before your eyes.",
        },
        tip: {
          ar: "قبل شراء أي جهاز مستعمل: اطلب تقرير البطارية (powercfg /batteryreport) وفحص صحة القرص (smartctl) — تقريران صغيران ينجيانك من صفقة غالية الندم.",
          en: "Before buying any used machine: request the battery report (powercfg /batteryreport) and the disk health check (smartctl) — two small reports that save an expensive regret.",
        },
      },
    ],
    keyPoints: [
      { ar: "قانون مور: ملاحظة اقتصادية عام 1965 صارت نبوءة صناعية لنصف قرن", en: "Moore's law: a 1965 economic observation that became industry prophecy for half a century" },
      { ar: "جدار الطاقة أنهى سباق التردد وولّد عصر النوى والتوازي", en: "The power wall ended the frequency race and birthed the multicore, parallel era" },
      { ar: "بطء اليوم قرص ثم ذاكرة — والمعالج آخر المتهمين في التشخيص", en: "Today's slowness is disk then memory — the CPU is the last suspect in diagnosis" },
      { ar: "ترتيب الترقية الذهبي: SSD ثم RAM ثم المعالج", en: "The golden upgrade order: SSD, then RAM, then CPU" },
      { ar: "طالب IT: 16GB وSSD NVMe وست أنوية فأكثر — وRefurbished صفقة العمر", en: "The IT student: 16 GB, NVMe SSD, six-plus cores — and refurbished is the deal of a lifetime" },
      { ar: "الخوادم تُقاس بالتسعات: 99.9% ثم 99.99% فما فوق — الجاهزية قبل الأداء", en: "Servers are measured in nines: 99.9%, then 99.99% and beyond — availability before performance" },
    ],
    commands: [
      { cmd: "htop", desc: { ar: "مراقبة حية للمعالج والذاكرة والعمليات على لينكس بضغطة واحدة", en: "Live monitoring of CPU, memory and processes on Linux in one keypress" } },
      { cmd: "nproc", desc: { ar: "عدد أنوية المعالج المتاحة لنظامك فوراً", en: "The count of CPU cores available to your system, instantly" } },
      { cmd: "tasklist /v", desc: { ar: "قائمة عمليات ويندوز مع حالتها واستهلاك الذاكرة", en: "The Windows process list with status and memory usage" } },
    ],
    quiz: [
      {
        q: { ar: "قانون مور بصياغته المعتمدة بعد تعديل 1975 يقول:", en: "Moore's law, in its post-1975 revision, states:" },
        options: [
          { ar: "تتضاعف سرعة المعالجات كل ستة أشهر", en: "Processor speeds double every six months" },
          { ar: "تتضاعف كثافة المكونات على الرقاقة نحوياً كل عامين", en: "Component density on chips doubles roughly every two years" },
          { ar: "تنخفض أسعار الحواسيب النصف كل خمس سنوات", en: "Computer prices halve every five years" },
          { ar: "تتضاعف سعة الأقراص كل عشر سنوات", en: "Disk capacity doubles every ten years" },
        ],
        correct: 1,
        explain: {
          ar: "لاحظ مور مضاعفة كثافة المكونات كل عام عام 1965، ثم عدّلها 1975 إلى كل عامين — ملاحظة اقتصادية عن أرخص كثافة لكل وظيفة لا قانوناً فيزيائياً.",
          en: "Moore observed component density doubling every year in 1965, revising it in 1975 to every two years — an economic observation about the cheapest density per function, not a physical law.",
        },
      },
      {
        q: { ar: "السبب الجوهري لتوقف سباق التردد (GHz) هو:", en: "The root cause of the gigahertz race stopping is:" },
        options: [
          { ar: "ملل المستخدمين من السرعة", en: "Users growing bored of speed" },
          { ar: "ندرة رقائق السيليكون في العالم", en: "A global silicon shortage" },
          { ar: "جدار الطاقة: القدرة تتناسب مع التردد ومربع الجهد ولم يعد الجهد ينخفض", en: "The power wall: power scales with frequency and voltage squared, and voltage stopped dropping" },
          { ar: "قانون جديد أصدرته شركات التأمين", en: "A new law issued by insurance companies" },
        ],
        correct: 2,
        explain: {
          ar: "انهيار تقليص Dennard جمد الجهد عند أرضيته، فأصبح رفع التردد يرفع الحرارة تربيعياً — فتحولت الصناعة إلى نوى متعددة بالطاقة نفسها.",
          en: "Dennard scaling's collapse froze voltage at its floor, so raising frequency raised heat quadratically — and the industry pivoted to multiple cores at the same power.",
        },
      },
      {
        q: { ar: "جهاز بطيء الإقلاع والقرص مشبع 100% دوماً؛ أول ترقية تفكر بها:", en: "A machine boots slowly with the disk pinned at 100%; your first upgrade thought:" },
        options: [
          { ar: "معالج أقوى فوراً", en: "A stronger CPU immediately" },
          { ar: "استبدال HDD بقرص SSD", en: "Replacing the HDD with an SSD" },
          { ar: "شاشة أكبر", en: "A bigger monitor" },
          { ar: "راوتر لاسلكي جديد", en: "A new wireless router" },
        ],
        correct: 1,
        explain: {
          ar: "الأعراض كلها تقول «عنق الزجاجة هو القرص»: أداء HDD العشوائي بطيء بمئة ضعف — وقرار استبداله بـSSD أعظم دفعة أداء لكل دينار.",
          en: "Every symptom says 'disk bottleneck': HDD random performance is a hundred times slower — and swapping in an SSD is the greatest performance boost per dinar.",
        },
      },
      {
        q: { ar: "الحاسوب الكمي يتفوق أساساً في:", en: "The quantum computer primarily excels at:" },
        options: [
          { ar: "تشغيل المتصفح وألعاب الفيديو", en: "Running browsers and video games" },
          { ar: "تحرير الفيديو والصور", en: "Editing video and photos" },
          { ar: "مسائل محددة كفك الشفرات ومحاكاة الجزيئات والتحسين", en: "Specific problems like code breaking, molecule simulation and optimization" },
          { ar: "تصفح مواقع التواصل الاجتماعي", en: "Browsing social media sites" },
        ],
        correct: 2,
        explain: {
          ar: "التراكب الكمي يفتح مسارات حسابية هائلة دفعة واحدة لأنماط مسائل محددة — أما المهام اليومية فتبقى أرض الحواسيب التقليدية بلا منازع.",
          en: "Quantum superposition opens vast computational paths at once for specific problem classes — daily tasks remain the undisputed land of classical computers.",
        },
      },
    ],
  },
];
