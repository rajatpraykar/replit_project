import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/enhance-image", async (req, res) => {
  const apiKey = process.env["OPENAI_API_KEY"];
  const { imageBase64, mimeType = "image/jpeg", prompt } = req.body as {
    imageBase64?: string;
    mimeType?: string;
    prompt?: string;
  };

  if (!apiKey) {
    res.status(503).json({ message: "Image enhancement is not configured." });
    return;
  }

  if (!imageBase64) {
    res.status(400).json({ message: "A product image is required." });
    return;
  }

  try {
    const image = Buffer.from(imageBase64, "base64");
    const form = new FormData();
    form.append("image", new Blob([image], { type: mimeType }), `product.${mimeType.split("/")[1] ?? "jpg"}`);
    form.append(
      "prompt",
      prompt ??
        "Beautify this artisan product photo for a professional ecommerce listing. Keep the exact product, colors, proportions, materials, handmade details, and composition recognizable. Improve lighting, remove distracting background clutter, create a clean warm neutral studio background, sharpen the product, and make it look naturally photographed. Do not add text, logos, people, or new objects.",
    );
    form.append("model", "gpt-image-1");
    form.append("size", "1024x1024");
    form.append("quality", "medium");
    form.append("output_format", "png");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });
    const data = (await response.json()) as {
      data?: Array<{ b64_json?: string; url?: string }>;
      error?: { message?: string };
    };
    const result = data.data?.[0];

    if (!response.ok || !result?.b64_json) {
      res.status(502).json({ message: data.error?.message ?? "Image enhancement failed." });
      return;
    }

    res.json({ imageBase64: result.b64_json, mimeType: "image/png" });
  } catch (error) {
    req.log.error({ err: error }, "Image enhancement failed");
    res.status(502).json({ message: "Image enhancement failed. Please try again." });
  }
});

export default router;