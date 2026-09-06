import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/transcribe", async (req, res) => {
  const apiKey = process.env["OPENAI_API_KEY"];
  const { audioBase64, mimeType = "audio/m4a", language = "hi" } = req.body as {
    audioBase64?: string;
    mimeType?: string;
    language?: string;
  };

  if (!apiKey) {
    res.status(503).json({ message: "Voice transcription is not configured." });
    return;
  }

  if (!audioBase64) {
    res.status(400).json({ message: "An audio recording is required." });
    return;
  }

  try {
    const audio = Buffer.from(audioBase64, "base64");
    const form = new FormData();
    form.append("file", new Blob([audio], { type: mimeType }), `voice.${mimeType.split("/")[1] ?? "m4a"}`);
    form.append("model", "gpt-4o-mini-transcribe");
    if (language === "hi" || language === "en" || language === "mr" || language === "bn") {
      form.append("language", language);
    }

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });
    const data = (await response.json()) as { text?: string; error?: { message?: string } };

    if (!response.ok || !data.text) {
      res.status(502).json({ message: data.error?.message ?? "Transcription failed." });
      return;
    }

    res.json({ text: data.text });
  } catch (error) {
    req.log.error({ err: error }, "Voice transcription failed");
    res.status(502).json({ message: "Voice transcription failed. Please try again." });
  }
});

export default router;