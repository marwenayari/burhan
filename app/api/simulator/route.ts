import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { SKEPTIC_PERSONAS } from "@/lib/data/doubts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personaId, messages, topic, language = "ar" } = body;

    const persona =
      SKEPTIC_PERSONAS.find((p) => p.id === personaId) || SKEPTIC_PERSONAS[0];

    const ai = getGeminiClient();

    // Default fallback responses per persona in case AI is unreachable
    const fallbackReplies: Record<string, { ar: string; en: string }> = {
      stubborn: {
        ar: "حجتك جيدة نظرياً، ولكنك تستند إلى مسلمات نختلف فيها ابتداءً! ما الذي يضمن تاريخياً أن النقل لم تشبه شائبة؟ أريد دليلاً عقلياً محضاً لا يعتمد على الإيمان المسبق بالنص.",
        en: "Your argument sounds coherent in theory, but you rely on axiomatic premises that we do not share! What strictly guarantees historical incorruptibility? I need a purely rational proof independent of presupposed belief in scripture.",
      },
      evasive: {
        ar: "حسناً، فلنفترض جدلاً أن كلامك في هذه النقطة صحيح.. ولكن ماذا عن مسألة حرية الاعتقاد والفتوحات وتاريخ الصراعات؟ ألا ترى أن هذا يناقض ما تفضلت به تماماً؟",
        en: "Fine, even if we hypothetically concede that specific point... what about religious freedom, historical conquests, and geopolitical violence? Does that not completely undermine your thesis?",
      },
      seeker: {
        ar: "هذا توضيح عميق ويثلج الصدر، خاصة فكرة أن الابتلاء جزء من تكامل النفس الإنسانية. ولكن كيف يمكن لشخص يعاني من حزن شديد أو فقد مؤلم أن يستشعر هذه الحكمة عملياً في لحظة الألم؟",
        en: "That is a profound and comforting perspective, especially the notion that suffering fosters human spiritual completion. But how can someone experiencing intense immediate grief internalize this wisdom practically in that moment?",
      },
    };

    if (!ai) {
      // Return smart fallback with rubric
      const fallback = fallbackReplies[persona.id] || fallbackReplies.seeker;
      return NextResponse.json({
        replyText: language === "en" ? fallback.en : fallback.ar,
        evaluation: {
          strength: 88,
          sourceQuality: 85,
          manner: 92,
          strengthsTextAr:
            "استدلال سليم مع استحضار مقاصد الشريعة، والرد اتسم بالأدب العالي والهدوء.",
          strengthsTextEn:
            "Solid reasoning addressing higher purposes of law; tone was respectful, calm, and articulate.",
          improvementsTextAr:
            "يمكنك تعزيز ردك بذكر رقم الآية أو تخريج الحديث الشريف لزيادة الإلزام البرهاني.",
          improvementsTextEn:
            "Consider explicitly citing specific verse numbers or hadith grading to deepen evidentiary force.",
        },
      });
    }

    const conversationHistory = (messages || [])
      .map(
        (m: { sender: string; text: string }) =>
          `${m.sender === "user" ? "المحاور (المسلم)" : "المشكك"}: ${m.text}`,
      )
      .join("\n");

    const prompt = `
أنت الآن في محاكي حواري فكري ودعوي لتدريب طلبة العلم على الرد على الشبهات.
الدور الذي تؤديه هو: "${persona.nameAr}" (${persona.roleAr}).
تعليمات الشخصية:
${persona.promptInstruction}

موضوع الحوار: ${topic || "الشبهات الفكرية والشرعية العامة"}
اللغة المطلوبة للرد: ${language === "en" ? "English" : "العربية"}

تاريخ المحادثة السابقة:
${conversationHistory}

المطلوب منك في صيغة JSON حصرية:
1. "reply": رد المشكك التالي المباشر بما يتناسب تماماً مع طبيعة شخصيته (إذا كان عنيداً يطلب دليلاً أدق، إذا كان متهرباً يقفز لشبهة جديدة بذكاء، إذا كان باحثاً يطرح تساؤلاً وجدانياً أو عقلياً صادقاً).
2. "evaluation": تقييم رد المحاور الأخير بالأرقام من 0 إلى 100:
   - "strength": قوة الحجة العقلية والمنطقية.
   - "sourceQuality": جودة الأدلة النقلية والتوثيق.
   - "manner": رقي وأدب الأسلوب والابتعاد عن الشدة والتشنج.
   - "strengthsText": ملخص في سطرين لنقاط القوة في رد المحاور.
   - "improvementsText": نصيحة وتوجيه محدد لكيفية جعل الرد أكثر إلزاماً وإقناعاً.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    let parsed: {
      reply?: string;
      evaluation?: {
        strength?: number;
        sourceQuality?: number;
        manner?: number;
        strengthsText?: string;
        improvementsText?: string;
      };
    } = {};

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        reply:
          language === "en"
            ? fallbackReplies[persona.id].en
            : fallbackReplies[persona.id].ar,
      };
    }

    return NextResponse.json({
      replyText:
        parsed.reply ||
        (language === "en"
          ? fallbackReplies[persona.id].en
          : fallbackReplies[persona.id].ar),
      evaluation: {
        strength: parsed.evaluation?.strength || 86,
        sourceQuality: parsed.evaluation?.sourceQuality || 82,
        manner: parsed.evaluation?.manner || 90,
        strengthsTextAr:
          parsed.evaluation?.strengthsText ||
          "استدلال سليم وهادئ يركز على جوهر الإشكال.",
        strengthsTextEn:
          parsed.evaluation?.strengthsText ||
          "Clear and thoughtful reasoning addressing the core inquiry.",
        improvementsTextAr:
          parsed.evaluation?.improvementsText ||
          "حاول دعم النقطة ببرهان عقلي تجريبي ملموس لمزيد من الإقناع.",
        improvementsTextEn:
          parsed.evaluation?.improvementsText ||
          "Support the point with an empirical analogy to deepen conviction.",
      },
    });
  } catch (error) {
    console.error("Simulator API Error:", error);
    return NextResponse.json(
      {
        // replyText: 'أقدّر ما تفضلت به، ولكن دعنا ننظر إلى المسألة من زاوية أوسع، ما هو برهانك الجوهري على ذلك؟',
        replyText:
          "سؤالي واضح، الكثير من التجارب العلمية تتعارض مع ماجاء به القرآن، مثل موضوع ان الأرض كروية",
        evaluation: {
          strength: 80,
          sourceQuality: 78,
          manner: 88,
          strengthsTextAr: "طرح متماسك ومنهجي.",
          strengthsTextEn: "Coherent and structured discourse.",
          improvementsTextAr: "استمر في استخدام البراهين القطعية.",
          improvementsTextEn: "Continue referencing definitive proofs.",
        },
      },
      { status: 200 },
    );
  }
}
