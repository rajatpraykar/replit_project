import { Router, type IRouter } from "express";
import { db, isDbConfigured, productsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const router: IRouter = Router();

// ─────────────────────────────────────────────────────────────────────────────
// Persistent JSON Store — survives process restarts even without PostgreSQL
// ─────────────────────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = resolve(__dirname, "..", "..", "data");
const PRODUCTS_FILE = resolve(DATA_DIR, "products.json");

function ensureDataDir() {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  } catch { /* ignore */ }
}

function loadProductsFromDisk(): any[] {
  try {
    if (existsSync(PRODUCTS_FILE)) {
      const raw = readFileSync(PRODUCTS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch { /* ignore */ }
  return [];
}

function saveProductsToDisk(products: any[]) {
  try {
    ensureDataDir();
    writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
  } catch { /* ignore */ }
}

// ─────────────────────────────────────────────────────────────────────────────
// 8 Rich Demo Products — Showcasing all craft categories for SIH demo
// ─────────────────────────────────────────────────────────────────────────────
const SEED_PRODUCTS: any[] = [
  {
    id: "textile-1",
    name: "Indigo Handwoven Dupatta",
    nameHindi: "हाथ से बुना हुआ पारंपरिक नील दुपट्टा",
    craftCategory: "Handloom & Heritage Textiles",
    material: "Pure Cotton · Natural Indigo Dye",
    price: 1480,
    b2bPrice: 960,
    exportPrice: 1998,
    status: "Published",
    description: "A breathable handloom creation woven using traditional pit looms in small artisan clusters. Naturally dyed with organic indigo, each piece carries the gentle irregularity and story of generations of master weavers.",
    descriptionHindi: "पारंपरिक करघे पर छोटे बैच में बुना गया नरम दुपट्टा। प्राकृतिक नील से रंगा, हर टुकड़े में करघे की खूबसूरत पहचान और कारीगर की कहानी है।",
    imageUrl: "/assets/images/indigo-textile.jpg",
    thumbnailUrl: "/assets/images/indigo-textile-thumb.jpg",
    tags: ["#Handloom", "#NaturalIndigo", "#VocalForLocal", "#FairTrade"],
    views: 248,
    inquiries: 18,
    geoIndication: "Rajasthan Handloom",
    ondcListed: true,
    artisanName: "Rekha Devi",
    artisanState: "RJ",
    fairWagePerHour: 112,
    createdAt: new Date("2026-08-01").toISOString(),
  },
  {
    id: "pottery-1",
    name: "Carved Terracotta Diya Set (6 pcs)",
    nameHindi: "नक्काशीदार मिट्टी का दीया सेट (6 पीस)",
    craftCategory: "Terracotta & Clay Craft",
    material: "River Clay · Natural Pigments",
    price: 420,
    b2bPrice: 275,
    exportPrice: 567,
    status: "Published",
    description: "Hand-moulded terracotta diyas with delicate carved motifs, kiln-fired using age-old Prajapati artisan techniques. Perfect for Diwali celebrations, spiritual ceremonies, and authentic home décor.",
    descriptionHindi: "नाज़ुक नक्काशी वाला हाथ से बनाया हुआ मिट्टी का दीया सेट। त्योहारों, पूजा और घर की सजावट के लिए आदर्श।",
    imageUrl: "/assets/images/terracotta-diya.jpg",
    thumbnailUrl: "/assets/images/terracotta-diya-thumb.jpg",
    tags: ["#Terracotta", "#FestiveDecor", "#ClayCraft", "#Diwali"],
    views: 482,
    inquiries: 34,
    geoIndication: "Gorakhpur Terracotta",
    ondcListed: true,
    artisanName: "Ramu Prajapati",
    artisanState: "UP",
    fairWagePerHour: 105,
    createdAt: new Date("2026-08-05").toISOString(),
  },
  {
    id: "painting-1",
    name: "Madhubani Tree of Life Painting (A3)",
    nameHindi: "मधुबनी जीवन वृक्ष चित्रकला (A3 साइज़)",
    craftCategory: "Madhubani & Traditional Painting",
    material: "Handmade Paper · Natural Mineral Pigments · Bamboo Nib",
    price: 2800,
    b2bPrice: 1820,
    exportPrice: 3780,
    status: "Published",
    description: "A stunning hand-painted Madhubani artwork depicting the sacred Tree of Life with intricate fish and peacock motifs. Created using natural mineral pigments on handmade Lokta paper — a living tradition spanning over 2,500 years from Mithila, Bihar.",
    descriptionHindi: "प्राकृतिक खनिज रंगों से हस्तनिर्मित कागज़ पर बनाई गई उत्कृष्ट मधुबनी चित्रकला। 2,500 वर्ष पुरानी मिथिला कला परंपरा।",
    imageUrl: "/assets/images/madhubani-painting.jpg",
    thumbnailUrl: "/assets/images/madhubani-painting-thumb.jpg",
    tags: ["#MadhubaniArt", "#FolkArt", "#TreeOfLife", "#IndianHeritage"],
    views: 367,
    inquiries: 22,
    geoIndication: "Madhubani Painting GI",
    ondcListed: true,
    artisanName: "Sunita Devi",
    artisanState: "BR",
    fairWagePerHour: 98,
    createdAt: new Date("2026-08-10").toISOString(),
  },
  {
    id: "woodcraft-1",
    name: "Saharanpur Jali Carved Rosewood Box",
    nameHindi: "सहारनपुर जाली नक्काशी शीशम की डिब्बी",
    craftCategory: "Wood Carving & Lacquerware",
    material: "Sheesham Rosewood · Brass Inlay · Natural Lacquer",
    price: 1650,
    b2bPrice: 1073,
    exportPrice: 2228,
    status: "Published",
    description: "Masterfully hand-carved from sustainably sourced Sheesham rosewood by artisan families of the renowned Saharanpur woodcarving cluster. Features traditional Mughal-inspired jali lattice patterns with brass inlay accents.",
    descriptionHindi: "सहारनपुर के प्रसिद्ध लकड़ी नक्काशी परिवारों द्वारा शीशम पर बारीक जाली नक्काशी। मुगल शैली की डिज़ाइन और पीतल की जड़ाई।",
    imageUrl: "/assets/images/saharanpur-woodcraft.jpg",
    thumbnailUrl: "/assets/images/saharanpur-woodcraft-thumb.jpg",
    tags: ["#WoodCraft", "#Saharanpur", "#JaliArt", "#HandCarved"],
    views: 194,
    inquiries: 11,
    geoIndication: "Saharanpur Wood Carving",
    ondcListed: true,
    artisanName: "Mohammad Irfan",
    artisanState: "UP",
    fairWagePerHour: 118,
    createdAt: new Date("2026-08-15").toISOString(),
  },
  {
    id: "brass-1",
    name: "Hand-Forged Brass Lota (Water Vessel)",
    nameHindi: "हाथ से ढली पीतल की लोटा",
    craftCategory: "Brassware & Metal Craft",
    material: "Pure Brass Alloy · Copper Base",
    price: 980,
    b2bPrice: 637,
    exportPrice: 1323,
    status: "Published",
    description: "Skillfully hand-forged using the ancient lost-wax casting technique by Thathera artisan communities of Jandiala Guru, Punjab. Each vessel is individually hammered, polished, and engraved — food-safe and ideal for Ayurvedic wellness use.",
    descriptionHindi: "प्राचीन मोम-गलाई तकनीक से ठठेरा कारीगरों द्वारा हाथ से ढला गया। आयुर्वेदिक उपयोग और खाद्य-सुरक्षित।",
    imageUrl: "/assets/images/brass-lota.jpg",
    thumbnailUrl: "/assets/images/brass-lota-thumb.jpg",
    tags: ["#Brassware", "#Thathera", "#MetalCraft", "#Ayurvedic"],
    views: 156,
    inquiries: 9,
    geoIndication: "Jandiala Guru Thathera",
    ondcListed: true,
    artisanName: "Harpal Singh",
    artisanState: "default",
    fairWagePerHour: 125,
    createdAt: new Date("2026-08-18").toISOString(),
  },
  {
    id: "bluepottery-1",
    name: "Jaipur Blue Pottery Decorative Plate",
    nameHindi: "जयपुर ब्लू पॉटरी सजावटी प्लेट",
    craftCategory: "Blue Pottery & Ceramic Art",
    material: "Quartz Stone Dust · Powdered Glass · Cobalt Oxide",
    price: 1200,
    b2bPrice: 780,
    exportPrice: 1620,
    status: "Published",
    description: "An exquisite piece of Jaipur's iconic blue pottery — crafted without a potter's wheel using a unique Mughal-era technique. Hand-painted with cobalt oxide floral motifs and fired to achieve the signature azure blue glaze.",
    descriptionHindi: "जयपुर की प्रसिद्ध ब्लू पॉटरी — बिना चाक के बनाई गई। कोबाल्ट ऑक्साइड से हाथ से पेंट की गई फूलों की डिज़ाइन।",
    imageUrl: "/assets/images/blue-pottery.jpg",
    thumbnailUrl: "/assets/images/blue-pottery-thumb.jpg",
    tags: ["#BluePottery", "#Jaipur", "#MughalArt", "#GITagged"],
    views: 312,
    inquiries: 19,
    geoIndication: "Jaipur Blue Pottery GI",
    ondcListed: true,
    artisanName: "Gopal Saini",
    artisanState: "RJ",
    fairWagePerHour: 108,
    createdAt: new Date("2026-08-20").toISOString(),
  },
  {
    id: "jute-1",
    name: "Handcrafted Golden Jute Tote Bag",
    nameHindi: "हस्तनिर्मित सुनहला जूट टोट बैग",
    craftCategory: "Jute & Eco Craft",
    material: "Golden Jute Fiber · Natural Vegetable Dyes · Cotton Lining",
    price: 650,
    b2bPrice: 423,
    exportPrice: 878,
    status: "Published",
    description: "An eco-friendly handcrafted tote bag made from golden jute fiber by skilled artisans of West Bengal. Woven on traditional handlooms with natural vegetable dyes — combining rural livelihood empowerment with modern ecological consciousness.",
    descriptionHindi: "बंगाल के कुशल कारीगरों द्वारा सुनहरे पटसन रेशे से बना पर्यावरण अनुकूल बैग। प्राकृतिक रंगों से रंगा।",
    imageUrl: "/assets/images/jute-bag.jpg",
    thumbnailUrl: "/assets/images/jute-bag-thumb.jpg",
    tags: ["#JuteCraft", "#EcoFriendly", "#Sustainable", "#ZeroWaste"],
    views: 201,
    inquiries: 14,
    geoIndication: "Bengal Jute Craft",
    ondcListed: true,
    artisanName: "Anjali Mondal",
    artisanState: "WB",
    fairWagePerHour: 95,
    createdAt: new Date("2026-08-22").toISOString(),
  },
  {
    id: "toys-1",
    name: "Channapatna Lacquerware Nesting Dolls (5 pcs)",
    nameHindi: "चन्नापटना लाख खिलौना नेस्टिंग डॉल (5 पीस)",
    craftCategory: "Traditional Toys & Dolls",
    material: "Hale Wood · Vegetable Lacquer · Natural Pigments",
    price: 890,
    b2bPrice: 579,
    exportPrice: 1202,
    status: "Published",
    description: "Charming handmade wooden nesting dolls lathe-turned from Hale wood and painted with child-safe vegetable lacquer dyes. Created by the legendary Channapatna toy-making artisans of Karnataka — GI tagged and UNESCO recognized.",
    descriptionHindi: "कर्नाटक के प्रसिद्ध चन्नापटना कारीगरों द्वारा हेल की लकड़ी से बनी नेस्टिंग डॉल। बच्चों के लिए सुरक्षित वनस्पति लाख रंग।",
    imageUrl: "/assets/images/channapatna-toys.jpg",
    thumbnailUrl: "/assets/images/channapatna-toys-thumb.jpg",
    tags: ["#ChannapatnaToys", "#WoodenToys", "#GITagged", "#ChildSafe", "#UNESCO"],
    views: 276,
    inquiries: 21,
    geoIndication: "Channapatna Toys GI",
    ondcListed: true,
    artisanName: "Lakshmi Narasimha",
    artisanState: "KA",
    fairWagePerHour: 100,
    createdAt: new Date("2026-08-25").toISOString(),
  },
];

// Initialize: Load persisted products or fall back to seed data
let memoryProducts: any[] = [];
const diskProducts = loadProductsFromDisk();
if (diskProducts.length > 0) {
  memoryProducts = diskProducts;
} else {
  memoryProducts = [...SEED_PRODUCTS];
  saveProductsToDisk(memoryProducts);
}

// GET /products - List all products
router.get("/products", async (_req, res) => {
  if (isDbConfigured) {
    try {
      const items = await db.select().from(productsTable).orderBy(desc(productsTable.createdAt));
      if (items.length > 0) {
        res.json(items);
        return;
      }
    } catch (err) {
      console.warn("[Products] DB query failed, falling back to local store:", err);
    }
  }
  res.json(memoryProducts);
});

// GET /products/:id - Get single product
router.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  if (isDbConfigured) {
    try {
      const found = await db.select().from(productsTable).where(eq(productsTable.id, id)).limit(1);
      if (found.length > 0) {
        res.json(found[0]);
        return;
      }
    } catch (err) {
      console.warn("[Products] DB find failed:", err);
    }
  }

  const memoryFound = memoryProducts.find((p) => p.id === id);
  if (memoryFound) {
    res.json(memoryFound);
    return;
  }

  res.status(404).json({ message: "Product not found" });
});

// POST /products - Create product (from AI catalog or mobile app)
router.post("/products", async (req, res) => {
  const {
    name,
    nameHindi,
    craftCategory = "Heritage Handicraft",
    material = "Natural organic materials",
    price,
    b2bPrice,
    exportPrice,
    description,
    descriptionHindi,
    imageUrl,
    thumbnailUrl,
    tags = [],
    geoIndication,
    artisanName,
    artisanState,
  } = req.body;

  if (!name || !price) {
    res.status(400).json({ message: "Product name and price are required." });
    return;
  }

  const newId = `prod_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const productData = {
    id: newId,
    name,
    nameHindi: nameHindi ?? name,
    craftCategory,
    material,
    price: Number(price),
    b2bPrice: b2bPrice ? Number(b2bPrice) : Math.round(Number(price) * 0.65),
    exportPrice: exportPrice ? Number(exportPrice) : Math.round(Number(price) * 1.35),
    description: description ?? "",
    descriptionHindi: descriptionHindi ?? "",
    imageUrl: imageUrl ?? null,
    thumbnailUrl: thumbnailUrl ?? null,
    tags: Array.isArray(tags) ? tags : [],
    geoIndication: geoIndication ?? null,
    status: "Published",
    views: 1,
    inquiries: 0,
    ondcListed: true,
    artisanName: artisanName ?? "MoSJE Artisan",
    artisanState: artisanState ?? "default",
    fairWagePerHour: 112,
    createdAt: new Date().toISOString(),
  };

  if (isDbConfigured) {
    try {
      await db.insert(productsTable).values({
        id: productData.id,
        name: productData.name,
        nameHindi: productData.nameHindi,
        craftCategory: productData.craftCategory,
        material: productData.material,
        price: productData.price,
        b2bPrice: productData.b2bPrice,
        exportPrice: productData.exportPrice,
        description: productData.description,
        descriptionHindi: productData.descriptionHindi,
        tags: productData.tags,
        geoIndication: productData.geoIndication,
        imageUrl: productData.imageUrl,
        thumbnailUrl: productData.thumbnailUrl,
        status: productData.status,
        views: 0,
        inquiries: 0,
        ondcListed: true,
      });
    } catch (err) {
      console.warn("[Products] DB insert failed, caching locally:", err);
    }
  }

  memoryProducts.unshift(productData);
  saveProductsToDisk(memoryProducts);
  res.status(201).json(productData);
});

// DELETE /products/:id - Remove product
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const idx = memoryProducts.findIndex((p) => p.id === id);
  if (idx === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  memoryProducts.splice(idx, 1);
  saveProductsToDisk(memoryProducts);

  if (isDbConfigured) {
    try {
      await db.delete(productsTable).where(eq(productsTable.id, id));
    } catch { /* ignore */ }
  }

  res.json({ message: "Product deleted", id });
});

export default router;
