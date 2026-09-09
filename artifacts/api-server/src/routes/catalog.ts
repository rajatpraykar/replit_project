import { Router, type IRouter } from "express";

const router: IRouter = Router();

export interface CatalogGenerateRequest {
  productName?: string;
  craftType?: string;
  materials?: string;
  voiceTranscript?: string;
  imageBase64?: string;
  language?: string;
  materialCost?: number;
  makingHours?: number;
  artisanState?: string;
}

export interface CatalogGenerateResponse {
  englishTitle: string;
  hindiTitle: string;
  englishDescription: string;
  hindiDescription: string;
  regionalTitle?: string;
  regionalDescription?: string;
  craftCategory: string;
  materialsDetected: string[];
  careInstructions: string;
  tags: string[];
  geoIndication?: string;
  pricing: {
    retail: number;
    wholesale: number;
    export: number;
  };
  fairTradeBreakdown: {
    materialCost: number;
    laborHours: number;
    hourlyWage: number;
    packaging: number;
  };
}

const STATE_HOURLY_WAGE: Record<string, number> = {
  UP: 32, // ₹256/day / 8hrs
  MP: 31,
  RJ: 30,
  WB: 32,
  GJ: 35,
  MH: 35,
  default: 32,
};

router.post("/catalog/generate", async (req, res) => {
  const apiKey = process.env["OPENAI_API_KEY"];
  const {
    productName = "Handcrafted Artisan Product",
    craftType = "Traditional Handicraft",
    materials = "Natural organic materials",
    voiceTranscript = "",
    imageBase64,
    language = "hi",
    materialCost = 350,
    makingHours = 5,
    artisanState = "default",
  } = req.body as CatalogGenerateRequest;

  // Calculate fair-trade pricing
  const hourlyWage = STATE_HOURLY_WAGE[artisanState] ?? STATE_HOURLY_WAGE.default;
  const laborCost = Math.round(makingHours * hourlyWage * 3.5); // Skilled craft wage multiplier
  const packaging = Math.max(35, Math.round(materialCost * 0.08));
  const baseCost = materialCost + laborCost + packaging;
  const retail = Math.round(baseCost * 2.2);
  const wholesale = Math.round(retail * 0.65);
  const exportPrice = Math.round(retail * 1.35);

  const pricing = { retail, wholesale, export: exportPrice };
  const fairTradeBreakdown = {
    materialCost,
    laborHours: makingHours,
    hourlyWage: Math.round(hourlyWage * 3.5),
    packaging,
  };

  // 1. If OpenAI API key is present, use GPT-4o-mini Vision to generate culturally accurate bilingual catalog
  if (apiKey) {
    try {
      const messages: any[] = [
        {
          role: "system",
          content: `You are an expert Indian handicraft curator for the Ministry of Social Justice & Empowerment (MoSJE) and Ministry of Textiles.
Your mission is to help traditional rural artisans sell online.
Create a JSON response with these exact keys:
- englishTitle (compelling, SEO-friendly, 5-8 words)
- hindiTitle (accurate Hindi translation with culturally authentic artisan terms)
- englishDescription (2-3 engaging sentences emphasizing handmade heritage, ethical craft, and texture)
- hindiDescription (authentic Hindi description)
- craftCategory (e.g. Handloom Textiles, Terracotta Pottery, Wood Carving, Brassware, Jute Craft)
- materialsDetected (array of strings)
- careInstructions (concise care tip in English)
- tags (array of 5-8 relevant tags like #VocalForLocal, #HandmadeInIndia)
- geoIndication (if recognizable, e.g. "Jaipur Blue Pottery", "Varanasi Silk", "Gorakhpur Terracotta", "Channapatna Craft", or null)
Format as valid JSON only.`,
        },
        {
          role: "user",
          content: [
            ...(imageBase64
              ? [
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:image/jpeg;base64,${imageBase64}`,
                      detail: "low",
                    },
                  },
                ]
              : []),
            {
              type: "text",
              text: `Artisan product: ${productName}
Craft tradition: ${craftType}
Materials used: ${materials}
Artisan voice note description: "${voiceTranscript}"
Language: ${language}
Generate the complete bilingual catalog listing.`,
            },
          ],
        },
      ];

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          response_format: { type: "json_object" },
          temperature: 0.5,
          max_tokens: 900,
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as any;
        const parsed = JSON.parse(data.choices[0].message.content);
        res.json({
          ...parsed,
          pricing,
          fairTradeBreakdown,
        });
        return;
      }
    } catch (aiErr) {
      req.log.warn({ err: aiErr }, "OpenAI catalog generation failed, using intelligent craft generator");
    }
  }

  // 2. High-quality contextual fallback (works seamlessly offline / during demo)
  const isTextile = /cloth|fabric|dupatta|saree|shawl|cotton|silk|weave|loom|khadi/i.test(
    `${productName} ${craftType} ${materials} ${voiceTranscript}`,
  );
  const isPottery = /clay|pot|diya|terracotta|ceramic|mud/i.test(
    `${productName} ${craftType} ${materials} ${voiceTranscript}`,
  );

  let englishTitle = productName;
  let hindiTitle = productName;
  let englishDesc = "Handcrafted with traditional techniques handed down through generations. Each piece reflects authentic Indian artisan heritage.";
  let hindiDesc = "पारंपरिक हस्तशिल्प तकनीक से निर्मित, हर कृति में भारतीय कारीगरी और सांस्कृतिक विरासत की अनूठी झलक है।";
  let craftCat = craftType;
  let giTag = undefined;

  if (isTextile) {
    englishTitle = productName.includes("Dupatta") ? productName : `Handwoven ${productName} with Natural Dyes`;
    hindiTitle = "हाथ से बुना हुआ पारंपरिक दुपट्टा";
    englishDesc = `A soft, breathable handloom creation woven in small artisan clusters. Dyed with eco-friendly natural colors, carrying the gentle rhythm and story of traditional pit looms. ${voiceTranscript ? `Artisan's note: "${voiceTranscript}"` : ""}`;
    hindiDesc = "पारंपरिक करघे पर छोटे बैच में बुना गया नरम एवं आरामदायक वस्त्र। प्राकृतिक रंगों से तैयार, हर धागे में भारतीय बुनकरों का हुनर झलकता है।";
    craftCat = "Handloom & Heritage Textiles";
    giTag = "Varanasi / Pochampally Handloom Cluster";
  } else if (isPottery) {
    englishTitle = `Hand-moulded Terracotta ${productName}`;
    hindiTitle = "हस्तनिर्मित नक्काशीदार मिट्टी की कलाकृति";
    englishDesc = `Individually sculpted from refined river clay and kiln-fired using age-old pottery methods. Perfect for festive celebrations and home decor. ${voiceTranscript ? `Artisan note: "${voiceTranscript}"` : ""}`;
    hindiDesc = "नदी की शुद्ध चिकनी मिट्टी से गढ़ा गया और पारंपरिक भट्टी में पकाया गया सुंदर दीया। त्योहारों और घर की सजावट के लिए आदर्श।";
    craftCat = "Terracotta & Clay Craft";
    giTag = "Gorakhpur Terracotta Craft";
  }

  const catalogResult: CatalogGenerateResponse = {
    englishTitle,
    hindiTitle,
    englishDescription: englishDesc,
    hindiDescription: hindiDesc,
    craftCategory: craftCat,
    materialsDetected: materials ? materials.split(/[,·]/).map((m) => m.trim()) : ["Natural Craft Material"],
    careInstructions: isTextile
      ? "Hand wash gently in cold water with mild detergent. Dry in shade."
      : "Wipe gently with a dry soft cloth. Protect from hard impacts.",
    tags: [
      "#VocalForLocal",
      "#HandmadeInIndia",
      "#MoSJEArtisan",
      "#HeritageCraft",
      "#FairTrade",
      "#AtmanirbharBharat",
    ],
    geoIndication: giTag,
    pricing,
    fairTradeBreakdown,
  };

  res.json(catalogResult);
});

export default router;
