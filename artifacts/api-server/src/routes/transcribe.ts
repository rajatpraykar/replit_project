import { Router, type IRouter } from "express";
import { isBhashiniConfigured, bhashiniTranscribe } from "../lib/bhashini";

const router: IRouter = Router();

/**
 * POST /api/transcribe
 *
 * Voice-First Artisan Description Pipeline:
 *   1. Bhashini (Government of India NLT Mission) — Official Indian language ASR
 *   2. OpenAI Whisper-1 — Multilingual transcription
 *   3. Smart Demo Fallback — 8-language contextual demo transcriptions
 *
 * Supports: Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, Gujarati, English
 */

const DEMO_TRANSCRIPTS: Record<string, { text: string; langName: string; langNameNative: string }> = {
  hi: {
    text: "यह हाथ से बुना हुआ शुद्ध सूती दुपट्टा है जिसे प्राकृतिक नील के रंग से रंगा गया है। इसे बनाने में लगभग छह घंटे का समय लगता है। मेरी माँ ने मुझे यह कला सिखाई है और मैं इसे अगली पीढ़ी को भी सिखाऊंगी।",
    langName: "Hindi",
    langNameNative: "हिन्दी",
  },
  mr: {
    text: "हा हातमागावर विणलेला अस्सल सुती दुपट्टा आहे, जो नैसर्गिक नीळ रंगाने रंगवला आहे. यास तयार करण्यास ६ तास लागले. आमच्या गावातील प्रत्येक महिला ही कला जपते.",
    langName: "Marathi",
    langNameNative: "मराठी",
  },
  bn: {
    text: "এটি খাঁটি সুতির হাতে বোনা ওড়না, প্রাকৃতিক নীল রঙে রঞ্জিত। এটি তৈরি করতে প্রায় ৬ ঘণ্টা সময় লেগেছে। আমাদের পরিবার চার প্রজন্ম ধরে এই শিল্প তৈরি করে আসছে।",
    langName: "Bengali",
    langNameNative: "বাংলা",
  },
  ta: {
    text: "இது கைத்தறியில் நெய்யப்பட்ட தூய பருத்தி துப்பட்டா, இயற்கை அவுரி சாயத்தில் சாயமிடப்பட்டது. இதை உருவாக்க ஆறு மணி நேரம் ஆகும். எங்கள் கிராமத்தின் பாரம்பரிய கலை இது.",
    langName: "Tamil",
    langNameNative: "தமிழ்",
  },
  te: {
    text: "ఇది చేతితో నేసిన స్వచ్ఛమైన నూలు దుపట్టా, సహజ నీలం రంగులో అద్దబడినది. దీనిని తయారు చేయడానికి ఆరు గంటలు పడుతుంది. మా తాతగారి నుండి ఈ కళను నేర్చుకున్నాను.",
    langName: "Telugu",
    langNameNative: "తెలుగు",
  },
  kn: {
    text: "ಇದು ಕೈಮಗ್ಗದಲ್ಲಿ ನೇಯ್ದ ಶುದ್ಧ ಹತ್ತಿ ದುಪಟ್ಟಾ, ನೈಸರ್ಗಿಕ ನೀಲಿ ಬಣ್ಣದಿಂದ ಬಣ್ಣ ಹಾಕಲಾಗಿದೆ. ಇದನ್ನು ತಯಾರಿಸಲು ಆರು ಗಂಟೆಗಳ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.",
    langName: "Kannada",
    langNameNative: "ಕನ್ನಡ",
  },
  gu: {
    text: "આ હાથવણાટના શુદ્ધ સુતરાઉ ડુપટ્ટા છે, જે કુદરતી નીલ રંગથી રંગવામાં આવ્યો છે. આ બનાવવામાં લગભગ છ કલાકનો સમય લાગે છે. અમારા ગામની દરેક સ્ત્રી આ કળા જાણે છે.",
    langName: "Gujarati",
    langNameNative: "ગુજરાતી",
  },
  en: {
    text: "This is a handwoven pure cotton dupatta naturally dyed with organic indigo. It takes approximately six hours of traditional pit loom work to craft. My mother taught me this art, and I am preserving it for the next generation.",
    langName: "English",
    langNameNative: "English",
  },
};

router.post("/transcribe", async (req, res) => {
  const apiKey = process.env["OPENAI_API_KEY"];
  const { audioBase64, mimeType = "audio/m4a", language = "hi" } = req.body as {
    audioBase64?: string;
    mimeType?: string;
    language?: string;
  };

  if (!audioBase64) {
    res.status(400).json({ message: "An audio recording is required." });
    return;
  }

  // 1. Try Bhashini if configured (Indian Government Language Mission)
  if (isBhashiniConfigured()) {
    try {
      const bhashiniText = await bhashiniTranscribe(audioBase64, language);
      if (bhashiniText) {
        const langInfo = DEMO_TRANSCRIPTS[language] ?? DEMO_TRANSCRIPTS.hi;
        res.json({
          text: bhashiniText,
          provider: "bhashini",
          language,
          languageName: langInfo.langName,
          languageNameNative: langInfo.langNameNative,
        });
        return;
      }
    } catch (bhashiniErr) {
      req.log.warn({ err: bhashiniErr }, "Bhashini transcription failed, attempting OpenAI Whisper");
    }
  }

  // 2. Fallback to OpenAI Whisper-1
  if (apiKey) {
    try {
      const audio = Buffer.from(audioBase64, "base64");
      const form = new FormData();
      form.append("file", new Blob([audio], { type: mimeType }), `voice.${mimeType.split("/")[1] ?? "m4a"}`);
      form.append("model", "whisper-1");

      const SUPPORTED = ["hi", "en", "mr", "bn", "gu", "ta", "te", "kn"];
      if (SUPPORTED.includes(language)) {
        form.append("language", language);
      }

      const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
        body: form,
      });
      const data = (await response.json()) as { text?: string; error?: { message?: string } };

      if (response.ok && data.text) {
        const langInfo = DEMO_TRANSCRIPTS[language] ?? DEMO_TRANSCRIPTS.hi;
        res.json({
          text: data.text,
          provider: "whisper",
          language,
          languageName: langInfo.langName,
          languageNameNative: langInfo.langNameNative,
        });
        return;
      }
    } catch (whisperErr) {
      req.log.warn({ err: whisperErr }, "Whisper transcription failed, using demo fallback");
    }
  }

  // 3. Smart Demo Fallback — Provides realistic contextual transcriptions in 8 Indian languages
  const langInfo = DEMO_TRANSCRIPTS[language] ?? DEMO_TRANSCRIPTS.hi;
  res.json({
    text: langInfo.text,
    provider: "demo-fallback",
    language,
    languageName: langInfo.langName,
    languageNameNative: langInfo.langNameNative,
    supportedLanguages: Object.entries(DEMO_TRANSCRIPTS).map(([code, info]) => ({
      code,
      name: info.langName,
      nativeName: info.langNameNative,
    })),
  });
});

export default router;