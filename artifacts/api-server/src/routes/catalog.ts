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

export interface RegionalTranslation {
  title: string;
  description: string;
  langName: string;
  langNative: string;
}

export interface CatalogGenerateResponse {
  englishTitle: string;
  hindiTitle: string;
  englishDescription: string;
  hindiDescription: string;
  regionalTitle?: string;
  regionalDescription?: string;
  regionalTranslations: Record<string, RegionalTranslation>;
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
  UP: 32,
  MP: 31,
  RJ: 30,
  WB: 32,
  GJ: 35,
  MH: 35,
  TN: 34,
  KA: 33,
  AP: 31,
  OR: 29,
  JH: 30,
  BR: 28,
  default: 32,
};

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
  translations: Record<string, RegionalTranslation>;
}

const CRAFT_TEMPLATES: Record<string, CraftTemplate> = {
  textile: {
    englishTitle: "Heritage Handwoven Banarasi Katan Silk Dupatta (Gold Zari Weave)",
    hindiTitle: "हस्तनिर्मित बनारसी कतान रेशमी दुपट्टा (स्वर्ण ज़री)",
    englishDesc: "A breathable handloom creation woven in small artisan clusters using traditional pit looms. Dyed with eco-friendly natural colors, carrying the gentle rhythm and story of generations of master weavers. Each thread reflects the cultural identity of India's textile heartland.",
    hindiDesc: "पारंपरिक करघे पर छोटे बैच में बुना गया नरम एवं आरामदायक वस्त्र। प्राकृतिक रंगों से तैयार, हर धागे में भारतीय बुनकरों का हुनर और विरासत झलकती है।",
    category: "Handloom & Heritage Textiles",
    giTag: "GI-IN-0012 (Banarasi Brocade) / Pochampally Ikat",
    hsnCode: "5007.20.10",
    careInstructions: "Hand wash gently in cold water with mild detergent. Dry flat in shade. Do not wring or bleach.",
    materials: ["Pure Silk", "Natural Dyes", "Gold-Plated Zari Thread"],
    tags: ["#Handloom", "#VaranasiBrocade", "#VocalForLocal", "#HandmadeInIndia", "#FairTrade", "#GITagged"],
    translations: {
      bn: {
        title: "ঐতিহ্যবাহী বেনারসি কাতান রেশম ওড়না (স্বর্ণ জরি)",
        description: "বারাণসীর মাস্টার তাঁতিদের হাতে ঐতিহ্যবাহী তাঁতে বোনা বিশুদ্ধ রেশম ওড়না। খাঁটি জরির চমৎকার নকশা সমৃদ্ধ।",
        langName: "Bengali",
        langNative: "বাংলা",
      },
      gu: {
        title: "હેરિટેજ હાથવણાટ બનારસી કાતાન સિલ્ક દુપટ્ટો (ગોલ્ડ ઝરી)",
        description: "વારાણસીના માસ્ટર કારીગરો દ્વારા પરંપરાગત કઢુઆ પદ્ધતિથી હાથથી વણાયેલો શુદ્ધ રેશમી દુપટ્ટો.",
        langName: "Gujarati",
        langNative: "ગુજરાતી",
      },
      mr: {
        title: "अस्सल हातमाग बनारसी कातान रेशमी शेला (सुवर्ण जरी)",
        description: "वाराणसीतील पारंपारिक विणकरांनी कढुआ तंत्राने हाताने विणलेला शुद्ध रेशमी शेला. अस्सल सोन्याच्या जरीचे नक्षीकाम.",
        langName: "Marathi",
        langNative: "मराठी",
      },
      ta: {
        title: "பாரம்பரிய கைத்தறி பனாரசி பட்டு துப்பட்டா (தங்க ஜரிகை)",
        description: "வாரணாசி பாரம்பரிய நெசவாளர்களால் தூய பட்டில் தங்க ஜரிகை வேலைப்பாட்டுடன் கையால் நெய்யப்பட்ட துப்பட்டா.",
        langName: "Tamil",
        langNative: "தமிழ்",
      },
      te: {
        title: "సంప్రదాయ చేనేత బనారసి పట్టు దుపట్టా (బంగారు జరీ)",
        description: "వారణాసి మాస్టర్ నేతకారుల చేత సహజమైన కధువా పద్ధతిలో చేనేతతో నేయబడిన స్వచ్ఛమైన పట్టు దుపట్టా.",
        langName: "Telugu",
        langNative: "తెలుగు",
      },
      hi: {
        title: "हस्तनिर्मित बनारसी कतान रेशमी दुपट्टा (स्वर्ण ज़री)",
        description: "वाराणसी के पारंपरिक बुनकरों द्वारा निर्मित शुद्ध रेशमी दुपट्टा, कधुआ तकनीक द्वारा हाथ से बुना गया।",
        langName: "Hindi",
        langNative: "हिन्दी",
      },
      en: {
        title: "Heritage Handwoven Banarasi Katan Silk Dupatta (Gold Zari Weave)",
        description: "Exquisitely handcrafted by Varanasi master weavers using certified Mulberry silk and lustrous gold zari yarn. Features time-honored floral jaal motifs.",
        langName: "English",
        langNative: "English",
      },
    },
  },
  pottery: {
    englishTitle: "Hand-Moulded Terracotta Planters (Set of 3)",
    hindiTitle: "प्राकृतिक टेराकोटा सजावटी गमले (3 का सेट)",
    englishDesc: "Individually sculpted from refined river clay and kiln-fired using age-old pottery methods passed down through Prajapati artisan families. Each piece carries the warmth of earth and fire, perfect for festive celebrations and authentic home décor.",
    hindiDesc: "नदी की शुद्ध चिकनी मिट्टी से गढ़ा गया और पारंपरिक भट्टी में पकाया गया। त्योहारों और घर की सजावट के लिए आदर्श, हर कृति में मिट्टी की खुशबू और कारीगर का प्यार बसा है।",
    category: "Terracotta & Clay Craft",
    giTag: "GI-IN-0045 Gorakhpur Terracotta Pottery",
    hsnCode: "6912.00.10",
    careInstructions: "Wipe gently with a dry soft cloth. Protect from hard impacts.",
    materials: ["River Clay", "Natural Pigments", "Kiln-Fired Glaze"],
    tags: ["#Terracotta", "#ClayCraft", "#FestiveDecor", "#EcoFriendly", "#MoSJEArtisan"],
    translations: {
      bn: {
        title: "হাতে গড়া টেরাকোটা মাটির প্ল্যান্টার (৩টির সেট)",
        description: "নদীর খাঁটি এঁটেল মাটি দিয়ে ঐতিহ্যবাহী ভাটায় পোড়ানো পোড়ামাটির কারুশিল্প। প্রকৃতির ছোঁয়ায় ঘর সাজানোর অনন্য সৃষ্টি।",
        langName: "Bengali",
        langNative: "বাংলা",
      },
      gu: {
        title: "હાથથી બનાવેલા ટેરાકોટા કુંડા (૩ નો સેટ)",
        description: "નદીની શુદ્ધ માટીમાંથી ગોરખપુરના કુંભારો દ્વારા પરંપરાગત ભઠ્ઠીમાં પકવેલા કલાત્મક કુંડા.",
        langName: "Gujarati",
        langNative: "ગુજરાતી",
      },
      mr: {
        title: "हातघडणीच्या टेराकोटा मातीच्या कुंड्या (३ चा संच)",
        description: "नदीकाठच्या शुद्ध मातीपासून पारंपारिक भट्टीत भाजलेल्या मातीच्या नक्षीदार कुंड्या. पर्यावरणपूरक हस्तकला.",
        langName: "Marathi",
        langNative: "मराठी",
      },
      ta: {
        title: "சுடுமண் அலங்கார பூந்தொட்டிகள் (3 தொகுப்பு)",
        description: "இயற்கை ஆற்று களிமண்ணால் கைவினைஞர்களால் வடிவமைக்கப்பட்டு சூளையில் சுடப்பட்ட பாரம்பரிய சுடுமண் பூந்தொட்டி.",
        langName: "Tamil",
        langNative: "தமிழ்",
      },
      te: {
        title: "చేతితో మలిచిన టెర్రకోటా కుండీలు (3 సెట్)",
        description: "నది ఒండ్రు మట్టితో సంప్రదాయ బట్టీలో కాల్చి తయారుచేసిన పర్యావరణ అనుకూలమైన అలంకార టెర్రకోటా కుండీలు.",
        langName: "Telugu",
        langNative: "తెలుగు",
      },
      hi: {
        title: "प्राकृतिक टेराकोटा सजावटी गमले (3 का सेट)",
        description: "नदी की शुद्ध चिकनी मिट्टी से गढ़ा गया और पारंपरिक भट्टी में पकाया गया। त्योहारों और घर की सजावट के लिए आदर्श।",
        langName: "Hindi",
        langNative: "हिन्दी",
      },
      en: {
        title: "Hand-Moulded Terracotta Planters (Set of 3)",
        description: "Individually sculpted from refined river clay and kiln-fired using age-old pottery methods. Eco-friendly organic craftsmanship.",
        langName: "English",
        langNative: "English",
      },
    },
  },
  painting: {
    englishTitle: "Mithila Tree of Life Handpainted Canvas",
    hindiTitle: "मिथिला ट्री ऑफ लाइफ लोक चित्रकला",
    englishDesc: "A stunning hand-painted artwork created using natural mineral pigments and bamboo nibs on handmade Lokta paper. Depicts mythological narratives, cosmic geometry, and the sacred connection between nature and humanity.",
    hindiDesc: "प्राकृतिक खनिज रंगों और बांस की कलम से हस्तनिर्मित कागज़ पर बनाई गई उत्कृष्ट लोक चित्रकला। पौराणिक कथाओं और प्रकृति के सौंदर्य को दर्शाती 2,500 वर्ष पुरानी जीवित परंपरा।",
    category: "Madhubani & Traditional Painting",
    giTag: "GI-IN-0021 Madhubani Mithila Painting",
    hsnCode: "9701.10.00",
    careInstructions: "Frame under UV-protective glass. Avoid direct sunlight.",
    materials: ["Handmade Paper", "Natural Mineral Pigments", "Bamboo Nib"],
    tags: ["#MadhubaniArt", "#FolkArt", "#IndianHeritage", "#HandPainted", "#LivingTradition"],
    translations: {
      bn: {
        title: "মিথিলা ট্রি অফ লাইফ হাতে আঁকা ক্যানভাস",
        description: "প্রাকৃতিক ভেষজ রঙ ও বাঁশের কলমে আঁকা ঐতিহ্যবাহী মধুবনী লোকচিত্রকলা। জীবনের বৃক্ষ ও প্রকৃতির রূপকল্প।",
        langName: "Bengali",
        langNative: "বাংলা",
      },
      gu: {
        title: "મિથિલા ટ્રી ઓફ લાઈફ હસ્તનિર્મિત લોક ચિત્રકળા",
        description: "કુદરતી ખનિજ રંગો અને વાંસની કલમથી હાથથી દોરેલી મિથિલા મધુબની કળા. ૨૫૦૦ વર્ષ જૂની અમર પરંપરા.",
        langName: "Gujarati",
        langNative: "ગુજરાતી",
      },
      mr: {
        title: "मिथिला ट्री ऑफ लाइफ हस्तलिखित लोक चित्रकला",
        description: "नैसर्गिक वनस्पती रंग आणि बांबूच्या लेखणीने हस्तनिर्मित कागदावर काढलेली अप्रतिम मधुबनी कलाकृती.",
        langName: "Marathi",
        langNative: "मराठी",
      },
      ta: {
        title: "மிதிலா வாழ்க்கை மரம் பாரம்பரிய ஓவியம்",
        description: "இயற்கை வண்ணங்கள் மற்றும் மூங்கில் குச்சியால் கையால் வரையப்பட்ட புகழ்பெற்ற மதுபானி நாட்டுப்புற ஓவியம்.",
        langName: "Tamil",
        langNative: "தமிழ்",
      },
      te: {
        title: "మిథిల ట్రీ ఆఫ్ లైఫ్ చేతితో గీసిన కాన్వాస్",
        description: "సహజ మూలికా రంగులతో వెదురు కలంతో చిత్రించిన పురాతన మధుబని జానపద చిత్రకళా ఖండం.",
        langName: "Telugu",
        langNative: "తెలుగు",
      },
      hi: {
        title: "मिथिला ट्री ऑफ लाइफ लोक चित्रकला",
        description: "प्राकृतिक खनिज रंगों और बांस की कलम से हस्तनिर्मित कागज़ पर बनाई गई उत्कृष्ट लोक चित्रकला।",
        langName: "Hindi",
        langNative: "हिन्दी",
      },
      en: {
        title: "Mithila Tree of Life Handpainted Canvas",
        description: "A stunning hand-painted artwork created using natural mineral pigments and bamboo nibs on handmade canvas.",
        langName: "English",
        langNative: "English",
      },
    },
  },
  woodcraft: {
    englishTitle: "Intricate Carved Sheesham Wood Box with Brass Inlay",
    hindiTitle: "सहारनपुर शीशम नक्काशीदार बॉक्स (पीतल जड़ाई)",
    englishDesc: "Masterfully hand-carved from sustainably sourced Sheesham rosewood by artisan families of the renowned Saharanpur woodcarving cluster. Features traditional Mughal-inspired jali lattice patterns with brass inlay accents.",
    hindiDesc: "सहारनपुर के प्रसिद्ध लकड़ी नक्काशी परिवारों द्वारा शीशम की लकड़ी पर बारीक हाथ की नक्काशी। मुगल शैली की जाली पैटर्न और पीतल की जड़ाई।",
    category: "Wood Carving & Lacquerware",
    giTag: "GI-IN-0089 Saharanpur Wood Carving",
    hsnCode: "4420.10.00",
    careInstructions: "Dust with soft dry cloth. Apply furniture wax annually.",
    materials: ["Sheesham Rosewood", "Brass Inlay", "Natural Lacquer Polish"],
    tags: ["#WoodCraft", "#Saharanpur", "#JaliArt", "#IndianDecor", "#SustainableWood"],
    translations: {
      bn: {
        title: "পিতল খোদাই করা সাহারানপুর শীশম কাঠের বাক্স",
        description: "সাহারানপুরের দক্ষ কারিগরদের হাতে খোদাই করা সূক্ষ্ম শীশম কাঠের বাক্স, সঙ্গে পিতলের ঐতিহ্যবাহী নকশা।",
        langName: "Bengali",
        langNative: "বাংলা",
      },
      gu: {
        title: "સહારનપુર શીશમ કોતરણીવાળું લાકડાનું બોક્સ",
        description: "સહારનપુરના કુશળ કારીગરો દ્વારા શીશમના લાકડા પર ઝીણવટભરી કોતરણી અને પિત્તળની જડતરવાળું બોક્સ.",
        langName: "Gujarati",
        langNative: "ગુજરાતી",
      },
      mr: {
        title: "सहारनपूर शिसम कोरीव लाकडी पेटी (पितळी जडण)",
        description: "सहारनपूरच्या कुशल काष्ठशिल्पकारांनी शिसम लाकडावर हाताने कोरलेली बारीक जाळीदार नक्षी आणि पितळी इनले.",
        langName: "Marathi",
        langNative: "मराठी",
      },
      ta: {
        title: "பித்தளை பதித்த நுணுக்கமான மரப்பெட்டி",
        description: "சஹாரன்பூர் மர கைவினைஞர்களால் ஈட்டி மரத்தில் பித்தளை வேலைப்பாட்டுடன் நுணுக்கமாக செதுக்கப்பட்ட பெட்டி.",
        langName: "Tamil",
        langNative: "தமிழ்",
      },
      te: {
        title: "ఇత్తడి పొదిగిన సహారన్‌పూర్ చెక్క పెట్టె",
        description: "సహారన్‌పూర్ కళాకారుల చేత రోజ్‌వుడ్‌పై ఇత్తడి తీగలతో సూక్ష్మంగా చెక్కబడిన రాజసపు పెట్టె.",
        langName: "Telugu",
        langNative: "తెలుగు",
      },
      hi: {
        title: "सहारनपुर शीशम नक्काशीदार बॉक्स (पीतल जड़ाई)",
        description: "सहारनपुर के प्रसिद्ध लकड़ी नक्काशी परिवारों द्वारा शीशम की लकड़ी पर बारीक हाथ की नक्काशी।",
        langName: "Hindi",
        langNative: "हिन्दी",
      },
      en: {
        title: "Intricate Carved Sheesham Wood Box with Brass Inlay",
        description: "Masterfully hand-carved from sustainably sourced Sheesham rosewood with authentic brass inlay.",
        langName: "English",
        langNative: "English",
      },
    },
  },
  brass: {
    englishTitle: "Artisan Hammered Brass Tea Kettle Set",
    hindiTitle: "मुरादाबाद दस्तकारी पीतल केतली एवं चाय सेट",
    englishDesc: "Skillfully hand-forged using the ancient lost-wax and hammering techniques by Thathera artisan communities. Individually hammered, polished, and engraved with ethnic motifs — food-safe lacquer coated.",
    hindiDesc: "प्राचीन तकनीक से ठठेरा कारीगरों द्वारा हाथ से ढला एवं हथौड़े से गढ़ा गया। हर बर्तन को व्यक्तिगत रूप से पीटा और पारंपरिक नक्काशी से सजाया गया है।",
    category: "Brassware & Metal Craft",
    giTag: "GI-IN-0062 Moradabad Metal Craft",
    hsnCode: "7418.20.00",
    careInstructions: "Clean with soft cloth. Rinse with warm water.",
    materials: ["Pure Brass Alloy", "Food Grade Lacquer", "Hammered Finish"],
    tags: ["#Brassware", "#Thathera", "#MetalCraft", "#Moradabad", "#FoodSafe"],
    translations: {
      bn: {
        title: "মুরাদাবাদ হাতে পিটানো পিতলের চা কেটলি সেট",
        description: "মুরাদাবাদের ধাতুশিল্পীদের হাতে গড়া ও হাতুড়ি দিয়ে নকশা করা উজ্জ্বল পিতলের চা সেট। টেকসই ও খাদ্য-সুরক্ষিত।",
        langName: "Bengali",
        langNative: "বাংলা",
      },
      gu: {
        title: "મુરાદાબાદ હસ્તકળા પિત્તળ કીટલી સેટ",
        description: "મુરાદાબાદના ઠઠેરા કારીગરો દ્વારા હાથથી ઘડેલો અને ટીપીને બનાવેલો આકર્ષક પિત્તળનો કીટલી સેટ.",
        langName: "Gujarati",
        langNative: "ગુજરાતી",
      },
      mr: {
        title: "मुरादाबाद दस्तकारी पितळी किटली संच",
        description: "मुरादाबादच्या कसबी धातूकारांनी हाताने घडवलेला आणि नक्षी कोरलेला अस्सल पितळी चहा संच.",
        langName: "Marathi",
        langNative: "मराठी",
      },
      ta: {
        title: "மொராதாபாத் கைவினை பித்தளை தேனீர் கெண்டி தொகுப்பு",
        description: "பாரம்பரிய முறையில் கையால் அடிக்கப்பட்டு வடிக்கப்பட்ட தூய பித்தளை தேநீர் கெண்டி மற்றும் கோப்பைகள்.",
        langName: "Tamil",
        langNative: "தமிழ்",
      },
      te: {
        title: "మొరాదాబాద్ చేతితో మలిచిన ఇత్తడి టీ సెట్",
        description: "మొరాదాబాద్ లోహ కళాకారుల చేత చేతితో సుత్తితో మలచబడిన ఆహార సురక్షిత ఇత్తడి టీ సెట్.",
        langName: "Telugu",
        langNative: "తెలుగు",
      },
      hi: {
        title: "मुरादाबाद दस्तकारी पीतल केतली एवं चाय सेट",
        description: "मुरादाबाद के कारीगरों द्वारा हाथ से ढला एवं हथौड़े से गढ़ा गया पारंपरिक पीतल टी सेट।",
        langName: "Hindi",
        langNative: "हिन्दी",
      },
      en: {
        title: "Artisan Hammered Brass Tea Kettle Set",
        description: "Skillfully hand-forged and hammered by Moradabad metal craftsmen with food-grade lacquer finish.",
        langName: "English",
        langNative: "English",
      },
    },
  },
};

function detectCraftCategory(input: string): string {
  const text = input.toLowerCase();
  const checks: [string, RegExp][] = [
    ["textile", /cloth|fabric|dupatta|saree|shawl|cotton|silk|weave|loom|khadi|chikan|bandhani|ikat|patola/],
    ["pottery", /clay|pot|diya|terracotta|ceramic|mud|matka|surahi|kulhad|planter/],
    ["painting", /paint|madhubani|warli|pattachitra|kalamkari|canvas|pigment|miniature|phad/],
    ["woodcraft", /wood|carv|lacquer|furniture|rosewood|sheesham|sandal|teak|jharokha|box/],
    ["brass", /brass|copper|metal|bell|thathera|bronze|kansa|lota|vessel|kettle/],
  ];

  for (const [cat, regex] of checks) {
    if (regex.test(text)) return cat;
  }
  return "textile";
}

router.post("/catalog/generate", async (req, res) => {
  const {
    productName = "Handcrafted Artisan Product",
    craftType = "Handloom & Textiles",
    materials = "Natural organic materials",
    voiceTranscript = "",
    materialCost: reqMaterialCost,
    makingHours: reqMakingHours,
    artisanState = "UP",
    language = "hi",
  } = req.body as CatalogGenerateRequest;

  // 1. Fair-Trade Wage Engine Computation
  const stateRate = STATE_HOURLY_WAGE[artisanState.toUpperCase()] ?? STATE_HOURLY_WAGE.default;
  const artisanHourlyWage = Math.round(stateRate * 3.5); // 3.5x multiplier for certified skilled master artisan
  const laborHours = reqMakingHours ?? 6;
  const materialCost = reqMaterialCost ?? 450;
  const packaging = 80;
  const rawLaborCost = laborHours * artisanHourlyWage;
  const welfareReserve = Math.round((rawLaborCost + materialCost) * 0.1);

  const basePrice = rawLaborCost + materialCost + packaging + welfareReserve;
  const retail = Math.round(basePrice * 1.15); // 15% fair margin
  const wholesale = Math.round(basePrice * 0.75); // B2B volume discount
  const exportVal = Math.round(basePrice * 1.45); // Cross-border rate

  const pricing = { retail, wholesale, export: exportVal };
  const fairTradeBreakdown = {
    materialCost,
    laborHours,
    hourlyWage: artisanHourlyWage,
    packaging,
    wageUpliftPercent: 250,
    stateMinWage: stateRate,
  };

  const inputText = `${productName} ${craftType} ${materials} ${voiceTranscript}`;
  const detectedCategory = detectCraftCategory(inputText);
  const template = CRAFT_TEMPLATES[detectedCategory] ?? CRAFT_TEMPLATES.textile;

  const hasSpecificName = productName.length > 8 && productName !== "Handcrafted Artisan Product";
  const englishTitle = hasSpecificName ? `${productName} — ${template.category}` : template.englishTitle;
  const hindiTitle = hasSpecificName ? `${productName} — ${template.hindiTitle}` : template.hindiTitle;

  const voiceNote = voiceTranscript ? ` Artisan Note: "${voiceTranscript}"` : "";

  const catalogResult: CatalogGenerateResponse = {
    englishTitle,
    hindiTitle,
    englishDescription: template.englishDesc + voiceNote,
    hindiDescription: template.hindiDesc,
    regionalTitle: template.translations[language]?.title || hindiTitle,
    regionalDescription: template.translations[language]?.description || template.hindiDesc,
    regionalTranslations: template.translations,
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
