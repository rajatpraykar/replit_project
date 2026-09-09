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
  testMode?: boolean;
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
  hsnCode?: string;
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
    wageUpliftPercent: number;
    stateMinWage: number;
  };
}

// State-level statutory minimum wage hourly rates (₹/hr)
const STATE_HOURLY_WAGE: Record<string, number> = {
  UP: 32, // ₹256/day / 8hrs — Uttar Pradesh
  MP: 31, // Madhya Pradesh
  RJ: 30, // Rajasthan
  WB: 32, // West Bengal
  GJ: 35, // Gujarat
  MH: 35, // Maharashtra
  TN: 34, // Tamil Nadu
  KA: 33, // Karnataka
  AP: 31, // Andhra Pradesh
  OR: 29, // Odisha
  JH: 30, // Jharkhand
  BR: 28, // Bihar
  default: 32,
};

/**
 * Comprehensive Indian Craft Knowledge Base
 * Covers 8 major GI-tagged / heritage craft categories with:
 *   - Bilingual titles (English + Hindi)
 *   - Regional language titles (Marathi, Bengali, Tamil, etc.)
 *   - Authentic descriptions referencing real craft clusters
 *   - HSN codes for GeM export compliance
 *   - GI Tag identification
 *   - Care instructions
 */
interface CraftTemplate {
  englishTitle: string;
  hindiTitle: string;
  englishDesc: string;
  hindiDesc: string;
  category: string;
  giTag: string;
  hsnCode: string;
  careInstructions: string;
  materials: string[];
  tags: string[];
}

const CRAFT_TEMPLATES: Record<string, CraftTemplate> = {
  textile: {
    englishTitle: "Handwoven Heritage Textile",
    hindiTitle: "हस्तनिर्मित विरासत वस्त्र",
    englishDesc: "A breathable handloom creation woven in small artisan clusters using traditional pit looms. Dyed with eco-friendly natural colors, carrying the gentle rhythm and story of generations of master weavers. Each thread reflects the cultural identity of India's textile heartland.",
    hindiDesc: "पारंपरिक करघे पर छोटे बैच में बुना गया नरम एवं आरामदायक वस्त्र। प्राकृतिक रंगों से तैयार, हर धागे में भारतीय बुनकरों का हुनर और विरासत झलकती है।",
    category: "Handloom & Heritage Textiles",
    giTag: "Varanasi Silk / Pochampally Ikat Cluster",
    hsnCode: "5007.20.10",
    careInstructions: "Hand wash gently in cold water with mild detergent. Dry flat in shade. Do not wring or bleach.",
    materials: ["Pure Silk", "Natural Dyes", "Gold-Plated Zari Thread"],
    tags: ["#Handloom", "#VaranasiBrocade", "#VocalForLocal", "#HandmadeInIndia", "#FairTrade", "#GITagged"],
  },
  pottery: {
    englishTitle: "Hand-Moulded Terracotta Craft",
    hindiTitle: "हस्तनिर्मित मिट्टी की कलाकृति",
    englishDesc: "Individually sculpted from refined river clay and kiln-fired using age-old pottery methods passed down through Prajapati artisan families. Each piece carries the warmth of earth and fire, perfect for festive celebrations, spiritual ceremonies, and authentic home décor.",
    hindiDesc: "नदी की शुद्ध चिकनी मिट्टी से गढ़ा गया और पारंपरिक भट्टी में पकाया गया। त्योहारों और घर की सजावट के लिए आदर्श, हर कृति में मिट्टी की खुशबू और कारीगर का प्यार बसा है।",
    category: "Terracotta & Clay Craft",
    giTag: "Gorakhpur Terracotta / Molela Terracotta",
    hsnCode: "6912.00.10",
    careInstructions: "Wipe gently with a dry soft cloth. Protect from hard impacts and excessive moisture.",
    materials: ["River Clay", "Natural Pigments", "Kiln-Fired Glaze"],
    tags: ["#Terracotta", "#ClayCraft", "#FestiveDecor", "#EcoFriendly", "#MoSJEArtisan", "#HandmadeInIndia"],
  },
  painting: {
    englishTitle: "Traditional Folk Painting",
    hindiTitle: "पारंपरिक लोक चित्रकला",
    englishDesc: "A stunning hand-painted artwork created using natural mineral pigments and bamboo nibs on handmade Lokta paper. This traditional art form depicts mythological narratives, cosmic geometry, and the sacred connection between nature and humanity — a living tradition spanning over 2,500 years.",
    hindiDesc: "प्राकृतिक खनिज रंगों और बांस की कलम से हस्तनिर्मित कागज़ पर बनाई गई उत्कृष्ट लोक चित्रकला। पौराणिक कथाओं और प्रकृति के सौंदर्य को दर्शाती 2,500 वर्ष पुरानी जीवित परंपरा।",
    category: "Madhubani & Traditional Painting",
    giTag: "Madhubani / Warli / Pattachitra Art",
    hsnCode: "9701.10.00",
    careInstructions: "Frame under UV-protective glass. Avoid direct sunlight and high humidity. Handle with clean dry hands.",
    materials: ["Handmade Paper", "Natural Mineral Pigments", "Bamboo Nib", "Herbal Fixative"],
    tags: ["#MadhubaniArt", "#FolkArt", "#IndianHeritage", "#TribalArt", "#HandPainted", "#LivingTradition"],
  },
  woodcraft: {
    englishTitle: "Intricately Carved Wooden Craft",
    hindiTitle: "बारीक नक्काशीदार लकड़ी का शिल्प",
    englishDesc: "Masterfully hand-carved from sustainably sourced Sheesham rosewood by artisan families of the renowned Saharanpur woodcarving cluster. Features traditional Mughal-inspired jali lattice patterns with brass inlay accents, showcasing centuries of inherited craftsmanship excellence.",
    hindiDesc: "सहारनपुर के प्रसिद्ध लकड़ी नक्काशी परिवारों द्वारा शीशम की लकड़ी पर बारीक हाथ की नक्काशी। मुगल शैली की जाली पैटर्न और पीतल की जड़ाई — सदियों पुरानी कारीगरी की उत्कृष्ट मिसाल।",
    category: "Wood Carving & Lacquerware",
    giTag: "Saharanpur Wood Carving / Channapatna Toys",
    hsnCode: "4420.10.00",
    careInstructions: "Dust with soft dry cloth. Apply furniture wax annually. Keep away from direct heat and moisture.",
    materials: ["Sheesham Rosewood", "Brass Inlay", "Natural Lacquer Polish"],
    tags: ["#WoodCraft", "#Saharanpur", "#JaliArt", "#IndianDecor", "#SustainableWood", "#HandCarved"],
  },
  brass: {
    englishTitle: "Hand-Forged Brass Artware",
    hindiTitle: "हाथ से ढली पीतल की कलाकृति",
    englishDesc: "Skillfully hand-forged using the ancient lost-wax (cire perdue) casting technique by Thathera artisan communities. Each brass vessel is individually hammered, polished, and engraved with traditional geometric motifs — certified food-safe and ideal for Ayurvedic wellness use.",
    hindiDesc: "प्राचीन मोम-गलाई (सिर पर्ड्यू) तकनीक से ठठेरा कारीगरों द्वारा हाथ से ढला गया। हर बर्तन को व्यक्तिगत रूप से पीटा, पॉलिश किया और पारंपरिक ज्यामितीय नक्काशी से सजाया गया है।",
    category: "Brassware & Metal Craft",
    giTag: "Moradabad Brass / Jandiala Guru Thathera",
    hsnCode: "7418.20.00",
    careInstructions: "Clean with lemon and salt paste for natural shine. Rinse with warm water. Dry immediately.",
    materials: ["Pure Brass Alloy", "Copper Base", "Natural Patina Finish"],
    tags: ["#Brassware", "#Thathera", "#MetalCraft", "#AyurvedicVessel", "#IndianHeritage", "#FoodSafe"],
  },
  bluePottery: {
    englishTitle: "Jaipur Blue Pottery",
    hindiTitle: "जयपुर ब्लू पॉटरी",
    englishDesc: "An exquisite piece of Jaipur's iconic blue pottery — crafted without a potter's wheel using a unique Mughal-era technique combining quartz stone dust, powdered glass, and gum. Each piece is hand-painted with cobalt oxide floral motifs and fired to achieve the signature azure blue glaze.",
    hindiDesc: "जयपुर की प्रसिद्ध ब्लू पॉटरी — क्वार्ट्ज पत्थर, कांच पाउडर और गोंद से बिना चाक के बनाई गई। कोबाल्ट ऑक्साइड से हाथ से पेंट की गई फूलों की डिज़ाइन और नीली चमक।",
    category: "Blue Pottery & Ceramic Art",
    giTag: "Jaipur Blue Pottery GI",
    hsnCode: "6913.90.00",
    careInstructions: "Hand wash only. Do not microwave. Avoid thermal shock. Display on cushioned surface.",
    materials: ["Quartz Stone Dust", "Powdered Glass", "Multani Mitti", "Cobalt Oxide"],
    tags: ["#BluePottery", "#Jaipur", "#MughalArt", "#CeramicArt", "#GITagged", "#HomeDecor"],
  },
  jute: {
    englishTitle: "Handcrafted Natural Jute Product",
    hindiTitle: "हस्तनिर्मित जूट उत्पाद",
    englishDesc: "An eco-friendly handcrafted product made from golden jute fiber by skilled artisans of Bengal and Odisha. Woven on traditional handlooms with natural vegetable dyes, this sustainable creation combines rural livelihood empowerment with modern ecological consciousness.",
    hindiDesc: "बंगाल और ओडिशा के कुशल कारीगरों द्वारा सुनहरे पटसन रेशे से बना पर्यावरण अनुकूल उत्पाद। प्राकृतिक वनस्पति रंगों से रंगा और पारंपरिक हथकरघे पर बुना गया।",
    category: "Jute & Eco Craft",
    giTag: "Bengal Jute / Coir Craft",
    hsnCode: "4602.11.00",
    careInstructions: "Spot clean with damp cloth. Air dry in shade. Avoid prolonged water exposure.",
    materials: ["Golden Jute Fiber", "Natural Vegetable Dyes", "Cotton Blend"],
    tags: ["#JuteCraft", "#EcoFriendly", "#Sustainable", "#BengalCraft", "#GreenFashion", "#ZeroWaste"],
  },
  toys: {
    englishTitle: "Traditional Handcrafted Wooden Toy",
    hindiTitle: "पारंपरिक हस्तनिर्मित लकड़ी का खिलौना",
    englishDesc: "A charming handmade wooden toy lathe-turned from sustainably harvested Hale wood and painted with child-safe vegetable lacquer dyes. Created by the legendary Channapatna toy-making artisans of Karnataka — holders of the coveted GI tag and UNESCO recognition.",
    hindiDesc: "कर्नाटक के प्रसिद्ध चन्नापटना खिलौना कारीगरों द्वारा हेल की लकड़ी से बनाया गया सुंदर खिलौना। बच्चों के लिए सुरक्षित वनस्पति लाख के रंगों से पेंट किया गया। GI टैग और यूनेस्को मान्यता प्राप्त।",
    category: "Traditional Toys & Dolls",
    giTag: "Channapatna Toys GI",
    hsnCode: "9503.00.90",
    careInstructions: "Wipe with dry cloth. Non-toxic and child safe. Keep away from water.",
    materials: ["Hale Wood", "Vegetable Lacquer", "Natural Pigments"],
    tags: ["#ChannapatnaToys", "#WoodenToys", "#GITagged", "#ChildSafe", "#IndianToys", "#UNESCO"],
  },
};

/**
 * Detects craft category from input text using keyword matching across
 * product name, craft type, materials, and voice transcript.
 */
function detectCraftCategory(input: string): string {
  const text = input.toLowerCase();
  const checks: [string, RegExp][] = [
    ["textile", /cloth|fabric|dupatta|saree|shawl|cotton|silk|weave|loom|khadi|chikan|bandhani|ikat|patola/],
    ["pottery", /clay|pot|diya|terracotta|ceramic|mud|matka|surahi|kulhad/],
    ["painting", /paint|madhubani|warli|pattachitra|kalamkari|canvas|pigment|miniature|phad/],
    ["woodcraft", /wood|carv|lacquer|furniture|rosewood|sheesham|sandal|teak|jharokha/],
    ["brass", /brass|copper|metal|bell|thathera|bronze|kansa|lota|vessel/],
    ["bluePottery", /blue.?pottery|jaipur.?blue|ceramic.?blue|tile|cobalt|quartz/],
    ["jute", /jute|coir|hemp|basket|bag|eco.?craft|patsun|golden.?fiber/],
    ["toys", /toy|doll|channapatna|lacquer.?toy|puppet|kondapalli|wooden.?toy/],
  ];

  for (const [key, regex] of checks) {
    if (regex.test(text)) return key;
  }
  return "textile"; // Default to handloom textiles
}

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
  const stateMinWage = STATE_HOURLY_WAGE[artisanState] ?? STATE_HOURLY_WAGE.default;
  const hourlyWage = Math.round(stateMinWage * 3.5); // Skilled craft wage multiplier
  const laborCost = Math.round(makingHours * hourlyWage);
  const packaging = Math.max(35, Math.round(materialCost * 0.08));
  const baseCost = materialCost + laborCost + packaging;
  const retail = Math.round(baseCost * 2.2);
  const wholesale = Math.round(retail * 0.65);
  const exportPrice = Math.round(retail * 1.35);
  const wageUpliftPercent = Math.round(((hourlyWage - stateMinWage) / stateMinWage) * 100);

  const pricing = { retail, wholesale, export: exportPrice };
  const fairTradeBreakdown = {
    materialCost,
    laborHours: makingHours,
    hourlyWage,
    packaging,
    wageUpliftPercent,
    stateMinWage,
  };

  // 1. If OpenAI API key is present, use GPT-4o-mini Vision for culturally accurate bilingual catalog
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
- hsnCode (4-8 digit HSN code for the craft)
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

  // 2. High-quality contextual offline fallback using the full 8-category craft knowledge base
  const inputText = `${productName} ${craftType} ${materials} ${voiceTranscript}`;
  const detectedCategory = detectCraftCategory(inputText);
  const template = CRAFT_TEMPLATES[detectedCategory] ?? CRAFT_TEMPLATES.textile;

  // Customize the title with the product name if it's specific enough
  const hasSpecificName = productName.length > 10 && productName !== "Handcrafted Artisan Product";
  const englishTitle = hasSpecificName
    ? `${productName} — ${template.category}`
    : template.englishTitle;
  const hindiTitle = hasSpecificName
    ? `${productName} — ${template.hindiTitle}`
    : template.hindiTitle;

  // Append voice transcript to description if available
  const voiceNote = voiceTranscript
    ? ` Artisan's personal note: "${voiceTranscript}"`
    : "";

  const catalogResult: CatalogGenerateResponse = {
    englishTitle,
    hindiTitle,
    englishDescription: template.englishDesc + voiceNote,
    hindiDescription: template.hindiDesc,
    craftCategory: template.category,
    materialsDetected: materials ? materials.split(/[,·;]/).map((m) => m.trim()).filter(Boolean) : template.materials,
    careInstructions: template.careInstructions,
    tags: template.tags,
    geoIndication: template.giTag,
    hsnCode: template.hsnCode,
    pricing,
    fairTradeBreakdown,
  };

  res.json(catalogResult);
});

export default router;
