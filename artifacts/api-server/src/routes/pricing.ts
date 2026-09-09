import { Router, type IRouter } from "express";

const router: IRouter = Router();

const STATE_DAILY_WAGE: Record<string, number> = {
  UP: 240,
  MP: 250,
  RJ: 235,
  WB: 260,
  GJ: 285,
  MH: 285,
  TN: 290,
  KA: 280,
  default: 250,
};

router.post("/pricing/suggest", async (req, res) => {
  const {
    materialCost = 400,
    makingHours = 4,
    artisanState = "default",
    craftComplexity = "medium", // simple | medium | intricate
    imageBase64,
  } = req.body as {
    materialCost?: number;
    makingHours?: number;
    artisanState?: string;
    craftComplexity?: "simple" | "medium" | "intricate";
    imageBase64?: string;
  };

  let multiplier = craftComplexity === "simple" ? 1.3 : craftComplexity === "intricate" ? 2.0 : 1.6;

  // If OpenAI Vision is enabled and image is provided, dynamically analyze craftsmanship complexity
  const apiKey = process.env["OPENAI_API_KEY"];
  if (apiKey && imageBase64) {
    try {
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 15,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`,
                    detail: "low",
                  },
                },
                {
                  type: "text",
                  text: 'Rate the craftsmanship complexity of this Indian artisan product. Respond with ONLY one word: "simple", "medium", or "intricate".',
                },
              ],
            },
          ],
        }),
      });

      if (resp.ok) {
        const data = (await resp.json()) as any;
        const answer = data.choices[0]?.message?.content?.toLowerCase().trim();
        if (answer.includes("simple")) multiplier = 1.3;
        else if (answer.includes("intricate")) multiplier = 2.0;
        else multiplier = 1.6;
      }
    } catch {
      // Keep heuristic multiplier
    }
  }

  const dailyWage = STATE_DAILY_WAGE[artisanState] ?? STATE_DAILY_WAGE.default;
  const hourlyRate = (dailyWage / 8) * 2.5; // Skilled artisan compensation index
  const labor = Math.round(makingHours * hourlyRate);
  const packaging = Math.max(30, Math.round(materialCost * 0.06));
  const productionCost = materialCost + labor + packaging;

  const retail = Math.round(productionCost * multiplier * 1.5);
  const wholesale = Math.round(retail * 0.65);
  const exportPrice = Math.round(retail * 1.35);

  res.json({
    pricing: {
      retail,
      wholesale,
      exportPrice,
    },
    breakdown: {
      materialCost,
      labor,
      packaging,
      productionCost,
      dailyWage,
      hourlyRate: Math.round(hourlyRate),
      makingHours,
      multiplier,
      state: artisanState,
    },
    fairTradeCompliance: {
      isMinimumWageCompliant: true,
      artisanSurplusPercent: Math.round(((retail - productionCost) / productionCost) * 100),
      schemeRecommended: "PM Vishwakarma Artisan Market Support",
    },
  });
});

export default router;
