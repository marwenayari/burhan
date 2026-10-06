import { DoubtItem, SkepticPersona } from '../types';
import { KNOWLEDGE_DOUBTS } from './knowledge';

export const SKEPTIC_PERSONAS: SkepticPersona[] = [
  {
    id: 'stubborn',
    nameAr: 'المشكك العنيد',
    nameEn: 'The Stubborn Skeptic',
    roleAr: 'المتعنت المتشكك في كل دليل',
    roleEn: 'Relentless Inquirer Demanding Infinite Proofs',
    avatar: '🛡️',
    badgeAr: 'صعوبة عالية',
    badgeEn: 'High Difficulty',
    descriptionAr:
      'شخصية حوارية متطلبة جداً؛ لا تكتفي بالأدلة الأولية، وتشكك في موثوقية النقل وصحة الدلالة العقلية، وتكرر السؤال بصيغ مختلفة لاختبار ثباتك وسعة اطلاعك.',
    descriptionEn:
      'Demanding interlocutor who challenges premise after premise, scrutinizes sources relentlessly, and tests your depth of proof and intellectual stamina.',
    traitsAr: ['التشكيك في البديهيات', 'طلب أدلة تفصيلية مفرطة', 'مقارعة الحجة العقلية بالسفسطة'],
    traitsEn: ['Questions axiomatic premises', 'Demands recursive proof', 'Tests patience and rigor'],
    promptInstruction:
      'أنت تجسد "المشكك العنيد" في حوار حول الشبهات الإسلامية. أسلوبك نقدي متشكك، تطلب أدلة أكثر بعد كل جواب، وتفند استدلال الطرف الآخر بهدوء وسؤال استفساري محرج، لكن دون إسفاف لفظي. هدفك تدريب المحاور على الاستدلال المتين.',
  },
  {
    id: 'evasive',
    nameAr: 'المشكك المتهرب',
    nameEn: 'The Evasive Skeptic',
    roleAr: 'المراوغ سريع الانتقال بين المواضيع',
    roleEn: 'Shifting Interlocutor Changing Topics',
    avatar: '⚡',
    badgeAr: 'صعوبة متوسطة',
    badgeEn: 'Moderate Difficulty',
    descriptionAr:
      'كلما أجبته إجابة قاطعة مدعمة بالدليل، تجاهل النقطة وانتقل فوراً إلى شبهة جديدة وغير متوقعة، متظاهراً بأن القضية لم تُحسم بعد.',
    descriptionEn:
      'Evades direct conclusions; once answered satisfactorily on one issue, leaps immediately to an entirely different objection without conceding.',
    traitsAr: ['الانتقال المفاجئ للشبهات', 'تجاهل الاعتراف بقوة الدليل', 'تشتيت محاور النقاش'],
    traitsEn: ['Jumps between topics', 'Reluctant to concede points', 'Distracts core arguments'],
    promptInstruction:
      'أنت تجسد "المشكك المتهرب". عندما يقدم المحاور دليلاً قوياً، لا تعترف بصحته مباشرة، بل اقفز إلى شبهة أخرى مغايرة (مثلاً: إن أثبت له حفظ القرآن قفز إلى مسألة ميراث المرأة، وهكذا).',
  },
  {
    id: 'seeker',
    nameAr: 'المشكك طالب المعرفة',
    nameEn: 'The Sincere Seeker',
    roleAr: 'الباحث الصادق عن الطمأنينة والحقيقة',
    roleEn: 'Honest Truth-Seeker Asking Deep Questions',
    avatar: '💡',
    badgeAr: 'تفاعلي وبنّاء',
    badgeEn: 'Constructive Dialogue',
    descriptionAr:
      'شخص متجرد ذكي يبحث عن الحقيقة، لديه إشكالات فكرية حقيقية ويرغب في فهم الحكمة والمنطق الإلهي، يقبل الدليل المنطقي المتين ويتفاعل معه بإيجابية.',
    descriptionEn:
      'Intellectually honest, thoughtful inquirer seeking tranquility and authentic understanding. Appreciates nuanced, compassionate, and rationally coherent explanations.',
    traitsAr: ['احترام الأدلة العقلية', 'طرح أسئلة جوهرية عميقة', 'الانفتاح على الحقيقة'],
    traitsEn: ['Respects valid proof', 'Asks probing philosophical questions', 'Open to reason'],
    promptInstruction:
      'أنت تجسد "المشكك طالب المعرفة". لديك تساؤلات صادقة ومحترمة عن الإسلام. تسأل عن الحكمة من الابتلاء أو موثوقية الروايات بحرص وعقلانية وتثمن الإجابات الشافية.',
  },
];

// Hand-written doubts with Quran/Hadith evidence and scholar quotes
const CURATED_DOUBTS: DoubtItem[] = [
  {
    id: 'doubt-evil-suffering',
    slug: 'problem-of-evil-and-suffering',
    titleAr: 'شبهة وجود الشر والألم في العالم وعلاقته بالحكمة الإلهية',
    titleEn: 'The Problem of Pain and Evil vs. Divine Wisdom',
    category: 'creed',
    categoryNameAr: 'العقيدة والغيبيات',
    categoryNameEn: 'Theology & Unseen',
    difficulty: 'intermediate',
    difficultyAr: 'متوسط',
    difficultyEn: 'Intermediate',
    confidenceScore: 99,
    readTimeMin: 7,
    viewsCount: 14200,
    summaryAr:
      'دعوى أن وجود الزلازل والأمراض والظلم يتعارض مع وجود إله رحيم حكيم وقادر، وتفنيدها ببيان حقيقة الدنيا كدار ابتلاء وتكامل صفات الجلال والجمال.',
    summaryEn:
      'Refutation of the claim that physical suffering and moral evil negate Divine benevolence and omnipotence, through the paradigm of worldly trial and transcendent wisdom.',
    originAr:
      'من أقدم الإشكالات الفلسفية المعاصرة المنبثقة من النظرة المادية الدنيوية القاصرة التي تفترض أن الغاية من الحياة هي المتعة الحسية والخلود الأرضي.',
    originEn:
      'Derived from materialist philosophy which presupposes the world was designed as a paradise of uninterrupted hedonism rather than a realm of purposeful testing.',
    quranicEvidence: [
      {
        surah: 'الملك',
        ayahNumber: 2,
        textAr: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا وَهُوَ الْعَزِيزُ الْغَفُورُ',
        translationEn: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving.',
        explanationAr: 'دلالة صريحة على أن دار الدنيا ليست دار جزاء ولا استقرار نهائي، بل هي دار اختبار وامتحان مخصص لإظهار كوامن النفس.',
        explanationEn: 'Explicitly establishes the world as an intentional proving ground, not a final sphere of restitution.',
      },
      {
        surah: 'الأنبياء',
        ayahNumber: 35,
        textAr: 'وَنَبْلُوكُم بِالشَّرِّ وَالْخَيْرِ فِتْنَةً وَإِلَيْنَا تُرْجَعُونَ',
        translationEn: 'And We test you with evil and with good as trial; and to Us you will be returned.',
        explanationAr: 'بيان أن السراء والضراء كلاهما أدوات فتنة وتمحيص، وأن المعاد والعدالة التامة مرجعها إلى الآخرة.',
        explanationEn: 'Clarifies that both hardship and prosperity are trials, with ultimate justice realized in the Hereafter.',
      },
    ],
    hadithEvidence: [
      {
        narrator: 'صهيب الرومي (رضي الله عنه)',
        source: 'صحيح مسلم (2999)',
        grade: 'صحيح',
        textAr: 'عَجَبًا لأَمْرِ الْمُؤْمِنِ، إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ، وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ؛ إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ.',
        translationEn: 'How wonderful is the affair of the believer, for his affairs are all good, and this is for no one except the believer: if something good happens to him, he gives thanks and that is good for him, and if something bad happens to him, he bears it with patience and that is good for him.',
        explanationAr: 'يؤسس الحديث لمنظور إيماني يحول المعاناة إلى ارتقاء روحي وتكفير للسيئات وبناء للصلابة النفسية.',
        explanationEn: 'Reframes suffering into spiritual elevation, moral growth, and perseverance.',
      },
    ],
    rationalEvidenceAr: [
      'الشر في الوجود نسبي وليس كلياً مطلقاً؛ فالنار تحرق لكن بها يُطهى الطعام وتدار المصانع، والبكتيريا قد تسبب مرضاً لكن دونها لا تستمر الحياة النباتية والحيوانية.',
      'لا يمكن تعريف "الشر" موضوعياً أصلاً في الرؤية المادية الإلحادية؛ فالإلحاد يعتبر الكون صدفة عمياء، وبناء عليه لا وجود لقيمة أخلاقية موضوعية تسمى شراً دون مرجعية إلهية.',
      'وجود الخير الجزيل لا يجوز إلغاؤه لأجل شر نسبي نادر؛ كأن نمنع ولادة الأطفال مخافة تعرضهم لأمراض.',
    ],
    rationalEvidenceEn: [
      'Suffering in existence is relative rather than absolute; physical laws allow both warmth and combustion, functioning ecosystems and biology.',
      'The problem of evil is self-defeating for materialism: in an accidental universe without transcendent teleology, "evil" is merely a subjective preference, not an objective standard.',
      'Divine wisdom integrates justice across the total expanse of existence, culminating in complete recompense in the afterlife.',
    ],
    scholarsQuotesAr: [
      {
        scholar: 'ابن القيم (رحمه الله)',
        book: 'شفاء العليل في مسائل القضاء والقدر والحكمة والتعليل',
        quote: 'إن الشرور الواقعة في الوجود هي من باب الوسائل المفضية إلى غايات محمودة، وحكمة الرب تعالى لا تقضي بعدم وقوع أسبابها لما يترتب عليها من المصالح العظيمة التي لا تحصل إلا بها.',
      },
    ],
    scholarsQuotesEn: [
      {
        scholar: 'Ibn al-Qayyim',
        book: 'Shifa al-Alil',
        quote: 'Adversities occurring in existence are instrumental pathways toward praiseworthy ends, and divine wisdom entails their emergence for the supreme wisdoms they actualize.',
      },
    ],
    fullRebuttalAr: `يقوم الطرح الإلحادي لشبهة الشر على فرضية مغلوطة مفادها أن الغاية من خلق الإنسان هي تنعيمه الدنيوي المحض دون أي تكليف أو امتحان. ولكن في النموذج المعرفي الإسلامي:
1. الدنيا دار ممر وامتحان لا دار مقر وجزاء: قال تعالى: (وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ).
2. حكمة الألم في تكميل النفس البشرية: الألم هو الذي يولد الشجاعة، والصبر، والرحمة، والتضامن، والتواضع. لولا المرض لما عُرفت قيمة الصحة، ولولا الظلم لما سعى البشر نحو العدل.
3. محدودية العقل البشري: قياس الإنسان لحكمة الله بحكمته الناقصة كقياس الطفل الذي يبكي لمنع والده إياه من تناول السم أو لإعطائه إبرة الدواء؛ فالطفل يرى ألماً آنياً بينما الأب يرى شفاءً مستقبلياً.
4. مأزق الملحد الأخلاقي: إن الملحد الذي يحتج بوجود الشر يثبت من حيث لا يدري وجود معيار أخلاقي مطلق ومفارق للمادة، وهذا المعيار لا يمكن تفسيره إلا بوجود الخالق الحكيم.`,
    fullRebuttalEn: `The materialist framing of the problem of evil presumes that earthly life was designed as an absolute hedonistic sanctuary without purpose or accountability. Islam radically contextualizes suffering:
1. The World is an Arena of Trial: Earth is not heaven; pain is a test to elevate souls and distinguish patience from despair.
2. Suffering Generates Virtue: Empathy, sacrifice, courage, and scientific medicine exist precisely because vulnerability exists.
3. Human Epistemic Limitation: Our finite perspective cannot judge the infinite ledger of cosmic wisdom, like a child complaining of a bitter life-saving medicine.
4. Materialism has no Objective Evil: Without God, suffering is mere colliding atoms without moral grievance.`,
    references: ['شفاء العليل - ابن القيم', 'تهافت الفلاسفة - الغزالي', 'براهين وجود الله ومسألة الشر - د. سامي عامري'],
  },
  {
    id: 'doubt-hadith-preservation',
    slug: 'preservation-of-prophetic-sunnah',
    titleAr: 'شبهة تدوين السنة النبوية وتأخر كتابتها عن العصر النبوي',
    titleEn: 'The Doubts Regarding Preservation and Early Inscription of Hadith',
    category: 'sunnah',
    categoryNameAr: 'السنة النبوية',
    categoryNameEn: 'Prophetic Tradition',
    difficulty: 'advanced',
    difficultyAr: 'متقدم',
    difficultyEn: 'Advanced',
    confidenceScore: 98,
    readTimeMin: 9,
    viewsCount: 18500,
    summaryAr:
      'دعوى المستشرقين وحداثيين بأن السنة لم تدون إلا بعد مئتي عام مع البخاري فدخلها الوضع، وتفنيدها بإثبات الصحف المبكرة ودقة علم الرجال والجرح والتعديل غير المسبوق في تاريخ التوثيق البشري.',
    summaryEn:
      'Rebuttal of the orientalist claim that Hadith remained unwritten for two centuries, demonstrating early manuscripts (Suhuf) and the unparalleled rigor of Isnad and Ilm al-Rijal methodology.',
    originAr:
      'نشأت على يد مستشرقين كأجناتس غولدتسيهر وجوزيف شاخت، ثم رددها بعض الحداثيين دون دراية بالمخطوطات المبكرة ومناهج النقد التاريخي.',
    originEn:
      'Promoted by 19th-century orientalists (Goldziher, Schacht) and repeated uncritically without knowledge of early pre-classical Sahifahs and biographical verification.',
    quranicEvidence: [
      {
        surah: 'الحشر',
        ayahNumber: 7,
        textAr: 'وَمَا آتَاكُمُ الرَّسُولُ فَخُذُوهُ وَمَا نَهَاكُمْ عَنْهُ فَانتَهُوا ۚ وَاتَّقُوا اللَّهَ',
        translationEn: 'And whatever the Messenger has given you - take; and what he has forbidden you - refrain from.',
        explanationAr: 'حجية أمر النبي صلى الله عليه وسلم كتشريع ملزم مقترن بحفظ الوحي.',
        explanationEn: 'Establishes the normative authority of the Messenger as divine guidance protected by Providence.',
      },
      {
        surah: 'الحجر',
        ayahNumber: 9,
        textAr: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
        translationEn: 'Indeed, it is We who sent down the Quran and indeed, We will be its guardian.',
        explanationAr: 'الذكر يشمل القرآن وبيانه (السنة الشارحة له)؛ إذ يستحيل حفظ المجمل دون حفظ بيانه العملي.',
        explanationEn: 'The "Dhikr" encompasses revelation and its necessary prophetic clarification.',
      },
    ],
    hadithEvidence: [
      {
        narrator: 'عبد الله بن عمرو بن العاص (رضي الله عنه)',
        source: 'سنن أبي داود (3646) - مسند أحمد',
        grade: 'صحيح',
        textAr: 'كُنْتُ أَكْتُبُ كُلَّ شَيْءٍ أَسْمَعُهُ مِنْ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أُرِيدُ حِفْظَهُ، فَنَهَتْنِي قُرَيْشٌ... فَقَالَ رَسُولُ اللَّهِ: "اكْتُبْ؛ فَوَالَّذِي نَفْسِي بِيَدِهِ مَا يَخْرُجُ مِنْهُ إِلَّا حَقٌّ".',
        translationEn: 'I used to write down everything I heard from the Messenger of Allah wanting to memorize it... The Prophet pointed to his mouth and said: "Write, for by Him in whose hand is my soul, nothing comes out of it except truth."',
        explanationAr: 'دليل قطعي على وجود الكتابة الرسمية في العهد النبوي وتدوين "الصحيفة الصادقة".',
        explanationEn: 'Decisive empirical evidence for contemporary recording of hadith during the lifetime of the Prophet.',
      },
    ],
    rationalEvidenceAr: [
      'التوثيق التاريخي للسنة النبوية يمثل أعلى معايير النقد التاريخي في الحضارة البشرية من خلال اشتراط اتصال السند، وعدالة الرواة، وضبطهم التام، والسلامة من الشذوذ والعلة القادحة.',
      'وجود المخطوطات المكتوبة المبكرة مثل "صحيفة همام بن منبه" عن أبي هريرة رضي الله عنه (المتوفى 58 هـ)، التي طابق نصها ما رواه الإمام أحمد والبخاري بعد أكثر من قرن ونصف كلمة بكلمة.',
      'العرب أمة اشتهرت بالحفظ العجيب للأنساب والقصائد الطويلة، واقترن هذا الحفظ بالكتابة التقييدية.',
    ],
    rationalEvidenceEn: [
      'Isnad critique checks not merely the author, but every single link in the chain for memory precision, piety, absence of ideological bias, and verified chronological meeting.',
      'Discovery of early manuscripts like Sahifah of Hammam ibn Munabbih (student of Abu Hurairah) matching classical collections word-for-word proves transmission fidelity.',
      'The oral culture was systematically coupled with written registers from the first generation.',
    ],
    scholarsQuotesAr: [
      {
        scholar: 'المستشرق آرثر آربري (Arthur Arberry)',
        book: 'مقدمات في الدراسات الشرقية',
        quote: 'لا يوجد في تاريخ الثقافات القديمة ما يضاهي الإسناد الإسلامي في دقة تتبع أصول النصوص ورواة الأخبار.',
      },
    ],
    scholarsQuotesEn: [
      {
        scholar: 'Arthur J. Arberry',
        book: 'Introductions to Islamic Studies',
        quote: 'No religion has ever preserved the words and deeds of its founder with the astonishing exactitude and biographical apparatus of the Islamic Isnad.',
      },
    ],
    fullRebuttalAr: `يقوم الادعاء بأن السنة لم تُكتب إلا في عهد البخاري على جهل مركب بتاريخ التدوين:
1. الكتابة في العهد النبوي: كان للنبي صلى الله عليه وسلم كتاب كثر، وكانت هناك صحف مشهورة كصحيفة عبد الله بن عمرو (الصحيفة الصادقة)، وصحيفة علي بن أبي طالب، وكتاب الصدقات والديات.
2. صحيفة همام بن منبه (المتوفى 101 هـ): عثر عليها محققة في دمشق وبرلين وتطابق تماماً ما أورده الإمام أحمد في مسنده والبخاري في صحيحه.
3. علم الإسناد والجرح والتعديل: لم يكتفِ علماء الحديث بالنقل، بل فحصوا أحوال أكثر من 150,000 راوٍ فحصاً شاملاً لسيرهم، وأمانتهم، وقوة ذاكرتهم، وتواريخ ولادتهم ووفاتهم.
4. التواتر العملي: الصلاة وأركانها، والحج، والزكاة نُقلت بالتطبيق الجماعي المتواتر جيلًا عن جيل، وهو نقل يستحيل عقلاً التواطؤ على تحريفه.`,
    fullRebuttalEn: `The claim of late Hadith recording collapses under historiographical evidence:
1. Written Records Under the Prophet: Explicit permission and encouragement to write (e.g., Al-Sahifah al-Sadiqah, treaties, legal charters).
2. Hammam ibn Munabbih's Pre-Classical Manuscript: Discovered in Damascus and Berlin archives, matching Musnad Ahmad and Sahih Bukhari verbatim.
3. The Science of Men (Ilm al-Rijal): Systematic biographical verification of over 150,000 transmitters across time.
4. Living Mass Transmission (Tawatur): Practices like prayer, pilgrimage, and fasting were transmitted simultaneously by entire populations across continents.`,
    references: ['السنة ومكانتها في التشريع الإسلامي - مصطفى السباعي', 'دراسات في الحديث النبوي وتاريخ تدوينه - د. محمد مصطفى الأعظمي'],
  },
  {
    id: 'doubt-quran-preservation',
    slug: 'authenticity-and-preservation-of-quran',
    titleAr: 'شبهة سلامة النص القرآني من التحريف والزيادة والنقصان',
    titleEn: 'Textual Integrity and Incorruptibility of the Noble Quran',
    category: 'quran',
    categoryNameAr: 'القرآن وعلومه',
    categoryNameEn: 'Quran & Sciences',
    difficulty: 'intermediate',
    difficultyAr: 'متوسط',
    difficultyEn: 'Intermediate',
    confidenceScore: 99,
    readTimeMin: 8,
    viewsCount: 22100,
    summaryAr:
      'إثبات التواتر الصوتي والكتابي للقرآن الكريم منذ عهد النبوة وإجماع الصحابة على المصحف العثماني وشهادة مخطوطات برمنغهام وصنعاء وطوب قابي.',
    summaryEn:
      'Demonstrating the unassailable preservation of the Quranic text through mass oral transmission, the Uthmanic codex, and early manuscript radiocarbon tests (e.g., Birmingham folios).',
    originAr:
      'محاولات بعض المستشرقين إسقاط تاريخ تحريف الكتب السابقة على القرآن الكريم، والتشويش بمسألة الأحرف السبعة والقراءات المتواترة.',
    originEn:
      'Attempts by orientalists to apply biblical textual variance paradigms to the Quran, conflating variant dialectical readings with corruption.',
    quranicEvidence: [
      {
        surah: 'فصلت',
        ayahNumber: 42,
        textAr: 'لَّا يَأْتِيهِ الْبَاطِلُ مِن بَيْنِ يَدَيْهِ وَلَا مِنْ خَلْفِهِ ۖ تَنزِيلٌ مِّنْ حَكِيمٍ حَمِيدٍ',
        translationEn: 'Falsehood cannot approach it from before it or from behind it; [it is] a revelation from a [Lord who is] Wise and Praiseworthy.',
        explanationAr: 'تأكيد الحفظ الشامل من النقص والزيادة والتبديل.',
        explanationEn: 'Categorical affirmation of immunity from interpolation and omission.',
      },
    ],
    hadithEvidence: [
      {
        narrator: 'زيد بن ثابت (رضي الله عنه)',
        source: 'صحيح البخاري (4986)',
        grade: 'صحيح',
        textAr: 'بَعَثَ إِلَيَّ أَبُو بَكْرٍ مَقْتَلَ أَهْلِ الْيَمَامَةِ، فَإِذَا عُمَرُ بْنُ الْخَطَّابِ عِنْدَهُ... فَقَالَ أَبُو بَكْرٍ: إِنَّكَ رَجُلٌ شَابٌّ عَاقِلٌ لَا نَتَّهِمُكَ، وَقَدْ كُنْتَ تَكْتُبُ الْوَحْيَ لِرَسُولِ اللَّهِ، فَتَتَبَّعِ الْقُرْآنَ فَاجْمَعْهُ.',
        translationEn: 'Abu Bakr sent for me after the slaughter at Yamama... and said: "You are a wise young man whom we do not suspect, and you used to write the revelation for Allah\'s Messenger; therefore track the Quran and compile it."',
        explanationAr: 'بيان المعايير الدقيقة الصارمة في جمع القرآن باشتراط الحفظ المتقن والشاهدين المكتوبين بين يدي رسول الله.',
        explanationEn: 'Demonstrates the peer-reviewed collation methodology requiring both verified memorization and contemporary written witnesses.',
      },
    ],
    rationalEvidenceAr: [
      'التواتر الصوتي الجمعي: حفظ آلاف الصحابة للقرآن كاملاً في صدورهم، وتلاوته جهراً خمس مرات يومياً في الصلوات، مما يجعل أي تغيير في حرف أو حركة مستحيلاً عقلاً.',
      'مخطوطة برمنغهام: الفحص بالكربون المشع أثبت أنها تعود لزمن النبوة أو بعده بسنوات يسيرة (بين 568 و645م) وتتطابق مع مصحف اليوم حرفاً بحرف.',
      'اختلاف القراءات هو تنوع إعجازي لهجي مقصود لتسهيل القراءة وتوسيع الدلالات البيانية، وكلها مروية بأسانيد متواترة قطعية إلى النبي صلى الله عليه وسلم.',
    ],
    rationalEvidenceEn: [
      'Mass oral transmission: Recited aloud by millions multiple times daily across continuous generational lines.',
      'Radiocarbon dating of early codices (Birmingham parchment 568-645 CE) confirms identity with today\'s text.',
      'Variant canonical Qira\'at represent authorized prophetic dialectical richness, not scribal errors.',
    ],
    scholarsQuotesAr: [
      {
        scholar: 'المستشرق وليام موير (Sir William Muir)',
        book: 'حياة محمد (Life of Mahomet)',
        quote: 'لا يوجد في العالم كتاب ظل نقياً ودقيقاً في نصه عبر اثني عشر قرناً من الزمان مثل القرآن.',
      },
    ],
    scholarsQuotesEn: [
      {
        scholar: 'Sir William Muir',
        book: 'Life of Mahomet',
        quote: 'There is probably in the world no other book which has remained twelve centuries with so pure a text.',
      },
    ],
    fullRebuttalAr: `إن حفظ القرآن الكريم معجزة تاريخية وتوثيقية فريدة:
1. الحفظ في الصدور قبل السطور: تميز القرآن بأنه نص مقروء ومحفوظ في قلوب مئات الآلاف، فلا يتوقف حفظه على رقوق قد تحرق أو تباد.
2. جمع أبي باكين وإجماع عثمان: لم يكن جمع عثمان رضي الله عنه كتابة لنص جديد، بل كان توحيداً للأمة على رسم الحرف المجمع عليه لمنع النزاع بين الأمصار.
3. التوافق المخطوطي الكامل: المخطوطات المبكرة في قبة الخزنة بدمشق ومسجد عمرو بمصر ومعهد المخطوطات بصنعاء تشهد بالنص الواحد الذي بين أيدينا اليوم دون أدنى تفاوت في المعنى.`,
    fullRebuttalEn: `The preservation of the Quran stands unique in human history:
1. Oral Primacy Coupled with Inscription: The Quran was memorized completely by hundreds of companions during the Prophet's lifetime and rehearsed annually.
2. The Uthmanic Standardization: Collation under Caliph Uthman unified the global community on the verified canonical recension.
3. Manuscript Consensus: Across disparate geographic collections, no alternative text or contradictory recension has ever existed.`,
    references: ['مباحث في علوم القرآن - مناع القطان', 'البرهان في علوم القرآن - الزركشي', 'The History of the Quranic Text - M. M. Al-Azami'],
  },
  {
    id: 'doubt-women-inheritance',
    slug: 'wisdom-of-islamic-inheritance-and-gender-rights',
    titleAr: 'شبهة نظام الميراث وقضايا المرأة في التشريع الإسلامي',
    titleEn: 'Wisdom of Islamic Inheritance and Gender Equity Principles',
    category: 'women',
    categoryNameAr: 'قضايا المرأة',
    categoryNameEn: 'Women in Islam',
    difficulty: 'beginner',
    difficultyAr: 'مبتدئ',
    difficultyEn: 'Beginner',
    confidenceScore: 98,
    readTimeMin: 6,
    viewsCount: 16900,
    summaryAr:
      'بيان حقيقة قاعدة "للذكر مثل حظ الأنثيين" وأنها تنطبق في 4 حالات فقط بينما ترث المرأة مثل الرجل أو أكثر منه أو ترث هي ويحجب هو في أكثر من 30 حالة ميراث.',
    summaryEn:
      'Refutation of the simplistic allegation of unequal inheritance, proving that the 2:1 rule applies in only 4 situations, while women inherit equally or more than men in over 30 legal scenarios.',
    originAr:
      'الاجتزاء الانتقائي للآيات دون استقراء الفقه التوزيعي التكاملي للتركات والواجبات المالية للرجل في الإنفاق العائلي.',
    originEn:
      'Selective quotation ignoring the comprehensive systemic economic model where men bear obligatory financial maintenance for wives, mothers, and daughters.',
    quranicEvidence: [
      {
        surah: 'النساء',
        ayahNumber: 7,
        textAr: 'لِّلرِّجَالِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ وَلِلنِّسَاءِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ مِمَّا قَلَّ مِنْهُ أَوْ كَثُرَ ۚ نَصِيبًا مَّفْرُوضًا',
        translationEn: 'For men is a share of what the parents and close relatives leave, and for women is a share of what the parents and close relatives leave, be it little or much - an obligatory share.',
        explanationAr: 'تأسيس استقلالية الذمة المالية للمرأة في عصر كانت فيه المرأة تُورث كسلعة.',
        explanationEn: 'Instituted independent financial rights and ownership for women at a time when women were treated as property.',
      },
      {
        surah: 'النساء',
        ayahNumber: 34,
        textAr: 'الرِّجَالُ قَوَّامُونَ عَلَى النِّسَاءِ بِمَا فَضَّلَ اللَّهُ بَعْضَهُمْ عَلَىٰ بَعْضٍ وَبِمَا أَنفَقُوا مِنْ أَمْوَالِهِمْ',
        translationEn: 'Men are the protectors and maintainers of women because Allah has made one of them to excel the other, and because they spend from their property.',
        explanationAr: 'ربط زيادة النصيب في حالات محددة بالعبء المالي الإلزامي الواقع على عاتق الرجل.',
        explanationEn: 'Explicitly correlates differential shares with obligatory financial liabilities imposed upon men.',
      },
    ],
    hadithEvidence: [
      {
        narrator: 'أبو هريرة (رضي الله عنه)',
        source: 'صحيح البخاري ومسلم',
        grade: 'صحيح',
        textAr: 'جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ صلى الله عليه وسلم فَقَالَ: يَا رَسُولَ اللَّهِ مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ قَالَ: "أُمُّكَ" قَالَ: ثُمَّ مَنْ؟ قَالَ: "ثُمَّ أُمُّكَ" قَالَ: ثُمَّ مَنْ؟ قَالَ: "ثُمَّ أُمُّكَ" قَالَ: ثُمَّ مَنْ؟ قَالَ: "ثُمَّ أَبُوكَ".',
        translationEn: 'A man asked: "O Messenger of Allah, who among people is most deserving of my finest companionship?" He replied: "Your mother." The man asked: "Then who?" He said: "Your mother." The man asked: "Then who?" He said: "Your mother." He asked: "Then who?" He said: "Then your father."',
        explanationAr: 'تقديم حق الأم ورعايتها وتكريمها ثلاث مرات على الأب.',
        explanationEn: 'Elevates maternal honor and care threefold above paternal precedence.',
      },
    ],
    rationalEvidenceAr: [
      'التفاضل في الميراث في الإسلام لا يستند إلى "الجنس" (ذكر أو أنثى)، بل يستند إلى ثلاثة معايير: درجة القرابة، والجيل الوارث (الأجيال الشابة ترث أكثر من المتقدمة في السن)، والعبء المالي المفروض شرعاً.',
      'المرأة في الشريعة الإسلامية ذمتها المالية مستقلة تماماً؛ فمالها لها وحدها ولا يلزمها الإنفاق على زوج أو بيت أو حتى على نفسها إن كان لها زوج أو أب أو أخ موسر.',
      'بينما الرجل ملزم شرعاً بالصداق (المهر)، والمسكن، والملبس، والإنفاق على زوجته وأولاده وأمه وأخواته المعوزات، فما يأخذه يخرج منه نفقات ملزمة، بينما مال المرأة ينمو خالصاً لها.',
    ],
    rationalEvidenceEn: [
      'Inheritance disparity in Islam is not based on gender, but on three criteria: degree of kinship, generational stage (descendants inherit more than ascendants), and financial obligations.',
      'A Muslim woman enjoys 100% financial independence; she is legally prohibited from being compelled to spend on household, husband, or living expenses.',
      'The brother who receives two shares is legally bound to support his family and dependent sisters, rendering the woman\'s net disposable wealth equal to or greater than his.',
    ],
    scholarsQuotesAr: [
      {
        scholar: 'د. صلاح الدين سلطان',
        book: 'امتياز المرأة في الميراث في الشريعة الإسلامية',
        quote: 'أثبت الاستقراء الشامل لحالات الميراث أن هناك 4 حالات فقط تأخذ فيها المرأة نصف الرجل، وهناك أضعاف ذلك تأخذ فيه مثله أو أكثر منه أو تحجبه تماماً.',
      },
    ],
    scholarsQuotesEn: [
      {
        scholar: 'Prof. Salah al-Din Sultan',
        book: 'Privilege of Women in Islamic Inheritance',
        quote: 'Comprehensive inductive analysis of inheritance cases reveals that women receive half of men in only 4 specific cases, while receiving equal, greater, or blocking men entirely in over 30 scenarios.',
      },
    ],
    fullRebuttalAr: `شبهة "ظلم المرأة في الميراث" مبنية على مغالطة شائعة بتعميم حالة الأخ مع أخته على جميع حالات المواريث:
1. استقراء الحالات الفقهية:
   - حالات ترث فيها المرأة مثل الرجل تماماً: كإرث الأب والأم عند وجود الولد (لكل واحد السدس)، وإخوة الأم.
   - حالات ترث فيها المرأة أكثر من الرجل: كأن تموت امرأة وتترك زوجاً وبنتاً، فللزوج الربع وللبنت النصف (ضعف نصيب الزوج).
   - حالات ترث فيها المرأة ولا يرث الرجل المناظر: كأن تموت وتترك بنتاً وأخاً شقيقاً وعماً، فترث البنت ويُحجب العم.
   - حالات ترث فيها المرأة نصف الرجل: في 4 حالات فقط حين يتساوى الوارثان في درجة القرابة ويتحمل الرجل عبء النفقة.
2. المنظومة المالية المتكاملة:
   حين تأخذ البنت نصف نصيب أخيها، يدخل مالها إلى رصيدها الصافي دون أي التزام إنفاق، بينما يدفع الأخ مهراً ويؤثث بيتاً وينفق على زوجته، فيكون صافي ما وفرته الأخت عملياً أكبر مما بقي مع أخيها.`,
    fullRebuttalEn: `The allegation of systemic inequality is refuted by juristic taxonomy:
1. Rigorous Case-by-Case Breakdown:
   - Equal Shares: Mother and father when children exist each receive 1/6th.
   - Woman Inherits More: A daughter inherits 1/2 while the deceased's husband inherits 1/4 (daughter gets double the man).
   - Woman Inherits While Equivalent Male is Blocked: Numerous complex estate distributions block male agnates while allocating fixed shares to females.
   - Man Receives Double: Occurs in only 4 situations (e.g., direct siblings) where the brother bears universal legal maintenance for his household and unmarried sisters.
2. Net Wealth Economics:
   A woman retains her inheritance as absolute private wealth, while the male must exhaust his capital on dowry, housing, education, and elder care.`,
    references: ['امتياز المرأة في الميراث - د. صلاح الدين سلطان', 'شبهات حول الإسلام - محمد قطب'],
  },
  {
    id: 'doubt-miracles-and-science',
    slug: 'science-reason-and-divine-creation',
    titleAr: 'شبهة التعارض بين العلم التجريبي والإيمان بوجود الخالق',
    titleEn: 'Science, Reason, and the Evidences of Cosmic Design',
    category: 'science',
    categoryNameAr: 'العلم والإسلام',
    categoryNameEn: 'Science & Islam',
    difficulty: 'intermediate',
    difficultyAr: 'متوسط',
    difficultyEn: 'Intermediate',
    confidenceScore: 99,
    readTimeMin: 7,
    viewsCount: 19800,
    summaryAr:
      'تفكيك دعوى الصراع الحتمي بين العلم والدين، وبيان أن الضبط الدقيق للكون وقوانين الفيزياء ونشأة الحياة تستلزم عقلاً وجود مبدع عليم، وأن العلم يجيب عن "كيف" بينما الدين يجيب عن "لماذا".',
    summaryEn:
      'Refutation of the scientism myth that empirical science contradicts theism, proving how cosmic fine-tuning, informational DNA complexity, and physical laws point to an Omniscient Creator.',
    originAr:
      'إفرازات العصر الوضعي الغربي والفلسفة الطبيعانية (Naturalism) التي تخلط بين المنهج التجريبي والرؤية الإلحادية الفلسفية.',
    originEn:
      'Emerging from philosophical naturalism and 19th-century scientism which conflates empirical methodology with ontological materialism.',
    quranicEvidence: [
      {
        surah: 'فصلت',
        ayahNumber: 53,
        textAr: 'سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنفُسِهِمْ حَتَّىٰ يَتَبَيَّنَ لَهُمْ أَنَّهُ الْحَقُّ ۗ أَوَلَمْ يَكْفِ بِرَبِّكَ أَنَّهُ عَلَىٰ كُلِّ شَيْءٍ شَهِيدٌ',
        translationEn: 'We will show them Our signs in the horizons and within themselves until it becomes clear to them that it is the truth. But is it not sufficient concerning your Lord that He is, over all things, a Witness?',
        explanationAr: 'دعوة مستمرة للنظر في نواميس الكون وبديع الصنعة في الآفاق والأنفس.',
        explanationEn: 'Direct invitation to explore cosmic laws and biological intricacies as pointers to ultimate truth.',
      },
      {
        surah: 'الطور',
        ayahNumber: 35,
        textAr: 'أَمْ خُلِقُوا مِنْ غَيْرِ شَيْءٍ أَمْ هُمُ الْخَالِقُونَ',
        translationEn: 'Or were they created by nothing, or were they the creators [of themselves]?',
        explanationAr: 'الحجة العقلية الحاصرة في مبدأ السببية وامتناع الصدفة والترجيح بلا مرجح.',
        explanationEn: 'The unassailable rational dilemma of causality: beings cannot emerge from absolute nothingness nor self-create.',
      },
    ],
    hadithEvidence: [
      {
        narrator: 'أبو هريرة (رضي الله عنه)',
        source: 'صحيح البخاري ومسلم',
        grade: 'صحيح',
        textAr: 'قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم: "يَأْتِي الشَّيْطَانُ أَحَدَكُمْ فَيَقُولُ: مَنْ خَلَقَ كَذَا؟ مَنْ خَلَقَ كَذَا؟ حَتَّى يَقُولَ: مَنْ خَلَقَ رَبَّكَ؟ فَإِذَا بَلَغَهُ فَلْيَسْتَعِذْ بِاللَّهِ وَلْيَنْتَهِ".',
        translationEn: 'The Messenger of Allah said: "Satan comes to one of you and says: Who created this? Who created that? Until he says: Who created your Lord? When it reaches that, let him seek refuge with Allah and cease."',
        explanationAr: 'التنبيه على مغالطة التسلسل اللانهائي في الفاعلين؛ إذ لا بد عقلاً من واجب وجود أول غني عن غيره.',
        explanationEn: 'Refutes the fallacy of infinite regress; reason demands an uncaused Necessary First Cause.',
      },
    ],
    rationalEvidenceAr: [
      'الضبط الدقيق للكون (Fine-Tuning): ثوابت الفيزياء الكونية (مثل قوة الجاذبية، ثابت بلانك، الكثافة الأولية) مضبوطة بدقة يستحيل معها الاحتمال العشوائي، فأي انحراف بمقدار جزء من تريليون لامتنع وجود النجوم والماء والحياة.',
      'معضلة المعلومات في الحمض النووي (DNA): الشيفرة الجينية لغة برمجية مخزنة، والعلم التجريبي يقر بأن "المعلومات" لا تنتج إلا عن عقل ذكي ومصدر واعٍ، والصدفة المادية لا تنتج كتباً وبرمجيات.',
      'مبدأ السببية ركيزة العلم نفسه: لو جاز أن يخرج شيء من العدم المحض دون سبب لسقط العلم التجريبي بأسره.',
    ],
    rationalEvidenceEn: [
      'Cosmic Fine-Tuning: Physical constants (gravitational constant, cosmological constant, cosmological density) are calibrated to unimaginable decimal precision.',
      'DNA Information Content: Genetic code contains semantic information; nature never generates informational codes without conscious intelligence.',
      'Causality is the bedrock of scientific inquiry: denying the necessity of a cause invalidates empirical induction itself.',
    ],
    scholarsQuotesAr: [
      {
        scholar: 'أنتوني فلو (Antony Flew - أشهر فيلسوف ملحد تحول للإيمان)',
        book: 'هناك إله: كيف غير أشرس ملحد رأيه (There is a God)',
        quote: 'لقد قادتني الأدلة العلمية الحديثة في علم الأحياء الدقيقة وضبط الكون إلى الإقرار بوجود عقل فائق صمم هذا الوجود.',
      },
    ],
    scholarsQuotesEn: [
      {
        scholar: 'Prof. Antony Flew',
        book: 'There is a God',
        quote: 'I must say that the DNA materials have shown, by the almost unbelievable complexity of the arrangements needed to produce life, that intelligence must have been involved.',
      },
    ],
    fullRebuttalAr: `المفهوم الإسلامي يرى في العلم التجريبي سبيلاً لتعظيم الخالق لا وسيلة لنفيه:
1. تاريخ الحضارة الإسلامية: رواد الطب والفلك والرياضيات كابن الهيثم، والخوارزمي، وابن النفيس كانوا علماء شريعة وباحثين تجريبيين انطلقوا من دافع قرآني للتدبر في ملكوت السماوات والأرض.
2. مغالطة إله الفجوات المعكوسة: الملحد يزعم أن اكتشاف القوانين الطبيعية يغني عن الخالق! ومثل هذا كمثل من يدعي أن فهم آلية عمل محرك السيارة يلغي الحاجة للمهندس الذي صممه وصنعه. القوانين هي وصف لسنة الله في كونه وليست فاعلاً مستقلاً بذاته.
3. نشأة الحياة من العدم: لم يستطع العلم إنتاج خلية حية واحدة من مواد غير حية بالصدفة، مما يؤكد أن الحياة هبة ربانية خاصة.`,
    fullRebuttalEn: `Islam regards true science as the contemplation of divine design:
1. Golden Age Legacy: Islamic polymaths like Ibn al-Haytham and Al-Biruni founded empirical optics and experimental methodology out of Quranic imperatives to reflect.
2. The Mechanism vs. Designer Fallacy: Knowing how an engine operates mechanically does not eliminate Henry Ford. Physical laws are descriptive patterns of creation, not autonomous creators.
3. Origin of Life: Random non-living matter has never assembled into self-replicating information-bearing biological organisms without intelligent direction.`,
    references: ['العلم وأصله الإلهي - د. عمرو شريف', 'There is a God - Antony Flew', 'براهين وجود الله - د. سامي عامري'],
  },
  {
    id: 'doubt-conquests-and-tolerance',
    slug: 'islamic-conquests-and-religious-freedom',
    titleAr: 'شبهة انتشار الإسلام بالسيف وحرية المعتقد',
    titleEn: 'Did Islam Spread by the Sword? Historical Realities of Religious Freedom',
    category: 'history',
    categoryNameAr: 'التاريخ والحضارة',
    categoryNameEn: 'History & Civilization',
    difficulty: 'beginner',
    difficultyAr: 'مبتدئ',
    difficultyEn: 'Beginner',
    confidenceScore: 98,
    readTimeMin: 7,
    viewsCount: 15400,
    summaryAr:
      'تفنيد أسطورة فرض العقيدة بالقوة، وبيان مقصد الفتوحات في كسر شوكة الطغاة وإتاحة حرية الدعوة، وبقاء الأقليات المسيحية واليهودية في قلب العالم الإسلامي 14 قرناً، وإسلام أكبر دولة (إندونيسيا) عبر التجارة والأخلاق.',
    summaryEn:
      'Refutation of the myth of forced conversions, illustrating the constitutional protection of minorities (Dhimmah), the voluntary Islamization of Indonesia and Malaysia, and historical testimony of non-Muslim historians.',
    originAr:
      'دعايات العصور الوسطى الصليبية وحملات الاستعمار لتبرير الهيمنة الغربية بتشويه الفتوحات الإسلامية التحريرية.',
    originEn:
      'Medieval polemical propaganda repurposed by colonial powers to cast Islamic liberation as aggression.',
    quranicEvidence: [
      {
        surah: 'البقرة',
        ayahNumber: 256,
        textAr: 'لَا إِكْرَاهَ فِي الدِّينِ ۖ قَد تَّبَيَّنَ الرُّشْدُ مِنَ الْغَيِّ',
        translationEn: 'There is no compulsion in religion. The right course has become clear from the wrong.',
        explanationAr: 'قاعدة دستورية شرعية قاطعة تمنع إجبار أي إنسان على اعتناق الإسلام.',
        explanationEn: 'An absolute constitutional principle prohibiting coercion in matters of faith.',
      },
      {
        surah: 'يونس',
        ayahNumber: 99,
        textAr: 'وَلَوْ شَاءَ رَبُّكَ لَآمَنَ مَن فِي الْأَرْضِ كُلُّهُمْ جَمِيعًا ۚ أَفَأَنتَ تُكْرِهُ النَّاسَ حَتَّىٰ يَكُونُوا مُؤْمِنِينَ',
        translationEn: 'And had your Lord willed, those on earth would have believed - all of them entirely. Then, [O Muhammad], would you compel the people in order that they become believers?',
        explanationAr: 'تأكيد على أن الإيمان ثمرة الاقتناع القلبي والاختيار الحر.',
        explanationEn: 'Emphasizes that genuine belief stems from autonomous conviction, not duress.',
      },
    ],
    hadithEvidence: [
      {
        narrator: 'صفوان بن سليم عن عدة من أبناء أصحاب رسول الله',
        source: 'سنن أبي داود (3052)',
        grade: 'صحيح',
        textAr: 'أَلَا مَنْ ظَلَمَ مُعَاهَدًا، أَوِ انْتَقَصَهُ، أَوْ كَلَّفَهُ فَوْقَ طَاقَتِهِ، أَوْ أَخَذَ مِنْهُ شَيْئًا بِغَيْرِ طِيبِ نَفْسٍ، فَأَنَا حَجِيجُهُ يَوْمَ الْقِيَامَةِ.',
        translationEn: 'Beware, whoever wrongs a non-Muslim protected citizen (Mu\'ahid), diminishes his rights, burdens him beyond his capacity, or takes anything from him without his consent, I will be his adversary on the Day of Resurrection.',
        explanationAr: 'أقوى وعيد نبوي لحماية حقوق غير المسلمين في المجتمع الإسلامي.',
        explanationEn: 'The sternest prophetic warning safeguarding the civil rights and dignities of non-Muslim citizens.',
      },
    ],
    rationalEvidenceAr: [
      'إندونيسيا وماليزيا وبلدان غرب إفريقيا (أكبر التجمعات السكانية للمسلمين اليوم) لم تطأها قدم جندي فاتح قط، وإنما أسلموا بتعامل التجار المسلمين وأمانتهم وأخلاقهم.',
      'بقاء الكنائس التاريخية والأديرة والملايين من نصارى الشرق في مصر وسوريا والعراق وفلسطين طيلة 1400 عام تحت الحكم الإسلامي ينسف زعم الإبادة أو الإكراه، بينما أُبيد المسلمون في الأندلس بمحاكم التفتيش.',
      'شروط القتال الإسلامي الصارمة: نهي النبي صلى الله عليه وسلم عن قتل النساء والأطفال والرهبان والعمال والمدنيين وقطع الأشجار.',
    ],
    rationalEvidenceEn: [
      'Indonesia, Malaysia, and West Africa (the most populous Muslim regions) never saw a single Muslim army; Islam was adopted through ethical merchants and scholars.',
      'Survival of Christian and Jewish communities, patriarchates, and monasteries across Cairo, Damascus, and Jerusalem for 14 centuries disproves the sword myth.',
      'Prophetic rules of engagement strictly forbid targeting women, children, hermits, non-combatants, livestock, and infrastructure.',
    ],
    scholarsQuotesAr: [
      {
        scholar: 'المستشرق توماس أرنولد (Thomas Arnold)',
        book: 'الدعوة إلى الإسلام (The Preaching of Islam)',
        quote: 'لم نسمع عن أية محاولة مدبرة لإرغام غير المسلمين على قبول الإسلام أو استئصال المسيحية، ولو اختار الخلفاء إبادة النصارى لفعلوا ذلك بسهولة.',
      },
    ],
    scholarsQuotesEn: [
      {
        scholar: 'Sir Thomas W. Arnold',
        book: 'The Preaching of Islam',
        quote: 'Of any organized attempt to force the acceptance of Islam on the non-Muslim population, or of any systematic persecution intended to stamp out Christianity, we hear nothing.',
      },
    ],
    fullRebuttalAr: `الخلط بين الفتوحات السياسية لكسر طغيان الإمبراطوريتين الفارسية والرومانية وبين حرية الاعتقاد:
1. هدف الفتوحات: لم يكن لإكراه الناس على الدخول في الدين، بل لإزالة الحواجز السياسية والعسكرية الاستبدادية التي كانت تمنع الشعوب من سماع الدعوة بحرية وتقتل كل من يفكر في ترك دين الإمبراطورية.
2. ترحيب الشعوب بالمسلمين: استقبل نصارى الشام ومصر الفاتحين المسلمين كمنقذين من الاضطهاد المذهبي البيزنطي؛ وكتب أهل حمص لأبي عبيدة رضي الله عنه: "لولايتكم وعدلكم أحب إلينا مما كنا فيه من الظلم والغشم".
3. العهدة العمرية: نموذج تاريخي للمواطنة وحرية العبادة وصيانة الكنائس والممتلكات دون مساس.`,
    fullRebuttalEn: `Historical clarity distinguishes defensive political campaigns against Byzantine and Sasanian imperial regimes from religious conversion:
1. Objective of Expeditions: Dismantling totalitarian empires that executed citizens for inquiring into foreign faiths, thereby establishing open air for free speech and conscience.
2. Welcomed by Local Populations: Syrian and Coptic Christians welcomed Muslim liberators to escape brutal Byzantine theological persecution.
3. The Covenant of Umar: A landmark treaty guaranteeing inviolability of churches, sacred property, and autonomous civic law.`,
    references: ['الدعوة إلى الإسلام - توماس أرنولد', 'حضارة العرب - غوستاف لوبون', 'حقوق غير المسلمين في بلاد الإسلام - وهبة الزحيلي'],
  },
];

// Curated doubts first (the home page features DOUBTS_DATA[0]), then the knowledge base
export const DOUBTS_DATA: DoubtItem[] = [...CURATED_DOUBTS, ...KNOWLEDGE_DOUBTS];

/** All searchable text of a doubt, in both languages. */
export const getDoubtSearchText = (d: DoubtItem) =>
  [
    d.titleAr,
    d.titleEn,
    d.summaryAr,
    d.summaryEn,
    d.fullRebuttalAr,
    d.fullRebuttalEn,
    d.categoryNameAr,
    d.categoryNameEn,
    ...(d.knowledge?.questionVariantsAr ?? []),
    ...(d.knowledge?.questionVariantsEn ?? []),
  ]
    .join('\n')
    .toLowerCase();
