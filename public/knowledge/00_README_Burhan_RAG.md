---
project: "Burhan"
package: "Hackathon starter RAG corpus"
language: "ar"
created: "2026-10-06"
format_version: "1.0"
---
# Burhan - حزمة المعرفة الأولية

هذه الحزمة مهيأة للرفع إلى قاعدة معرفة Burhan / ElevenLabs. الوحدة الأساسية هي **شبهة مستقلة** لا صفحة كتاب. كل وحدة تحتوي على صيغ مختلفة للسؤال، تصوير الشبهة، جوابًا مختصرًا ومفصلًا، مسار الاستدلال، صياغة صوتية، ومصدرًا.

## المصادر
1. **حقائق الإسلام في مواجهة شبهات المشككين** - إشراف محمود حمدي زقزوق.
2. **مدخل إلى القرآن الكريم: عرض تاريخي وتحليل مقارن** - محمد عبد الله دراز.
3. **النبأ العظيم: نظرات جديدة في القرآن** - محمد عبد الله دراز.
4. **شبهات حول الإسلام** - محمد قطب.
5. **دفاع عن السنة ورد شبه المستشرقين والكتاب المعاصرين** - محمد محمد أبو شهبة.
6. **المرأة بين الفقه والقانون** - مصطفى السباعي.

## الملفات
- `01_quran_preservation_collection_readings.md`
- `02_quran_source_revelation_authorship.md`
- `03_quran_language_ijaz_coherence.md`
- `04_jihad_spread_of_islam.md`
- `05_agent_retrieval_instructions.md`
- `06_general_islam_objections_muhammad_qutb.md` (17 وحدة، BH-GEN)
- `07_sunnah_hadith_objections_abu_shahba.md` (28 وحدة، BH-SUN)
- `08_women_family_objections_al_sibai.md` (25 وحدة، BH-WOM)
- `09_agent_index_and_routing.md` (تعليمات الاسترجاع للدفعة الثانية)
- `10_all_batch2_combined.md` (نسخة مجمعة من 06–08؛ **مكررة** - ارفع إما الملفات المنفصلة أو هذا الملف وليس كليهما)

## النسخ الإنجليزية
- الملفات 01–04 و06–08 مترجمة في `en/` بنفس الأسماء، وتدخل في بناء `lib/data/knowledge.generated.json` (`npm run knowledge`).
- `en/batch2/` يحوي ترجمة الملفين 09 و10 فقط (لا يقرؤهما سكربت البناء)، وهي للرفع إلى ElevenLabs.
- الملفات 06–08 بنفس صيغة 01–04 (تصوير الشبهة، الجواب المفصل، جواب حواري للصوت ...) وفئاتها: العقيدة (06)، السنة (07)، المرأة (08).
