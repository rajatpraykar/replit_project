import { Router, type IRouter } from "express";
import { db, isDbConfigured, productsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

const router: IRouter = Router();

// In-memory cache for starter products when running in local/demo mode
const memoryProducts: any[] = [
  {
    id: "textile-1",
    name: "Indigo Handwoven Dupatta",
    nameHindi: "हाथ से बुना हुआ पारंपरिक नील दुपट्टा",
    craftCategory: "Handloom textile",
    material: "Cotton · Natural indigo",
    price: 1480,
    b2bPrice: 960,
    exportPrice: 1920,
    status: "Published",
    description: "A soft, naturally dyed dupatta woven by hand in small batches. Each piece carries the gentle irregularity and story of the loom.",
    descriptionHindi: "छोटे बैच में हाथ से बुना हुआ नरम दुपट्टा। हर टुकड़े में करघे की खूबसूरत पहचान और कारीगर की कहानी है।",
    imageUrl: "/assets/images/indigo-textile.jpg",
    thumbnailUrl: "/assets/images/indigo-textile.jpg",
    tags: ["#Handloom", "#NaturalIndigo", "#VocalForLocal"],
    views: 48,
    inquiries: 3,
    geoIndication: "Rajasthan Handloom",
    ondcListed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "diya-1",
    name: "Carved Terracotta Diya",
    nameHindi: "नक्काशीदार मिट्टी का पारंपरिक दीया",
    craftCategory: "Terracotta craft",
    material: "Terracotta clay",
    price: 360,
    b2bPrice: 220,
    exportPrice: 480,
    status: "Published",
    description: "A hand-shaped terracotta diya with delicate carved details, made for warm evenings and festive corners.",
    descriptionHindi: "नाज़ुक नक्काशी वाला हाथ से बनाया हुआ मिट्टी का दीया, त्योहार और रोज़मर्रा की रोशनी के लिए।",
    imageUrl: "/assets/images/terracotta-diya.jpg",
    thumbnailUrl: "/assets/images/terracotta-diya.jpg",
    tags: ["#Terracotta", "#FestiveDecor", "#ClayCraft"],
    views: 82,
    inquiries: 7,
    geoIndication: "Gorakhpur Terracotta",
    ondcListed: true,
    createdAt: new Date().toISOString(),
  },
];

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
      console.warn("[Products] DB query failed, falling back to memory:", err);
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

// POST /products - Create/Sync product from mobile app
router.post("/products", async (req, res) => {
  const {
    name,
    nameHindi,
    craftCategory = "Handicraft",
    material = "Natural materials",
    price,
    b2bPrice,
    exportPrice,
    description,
    descriptionHindi,
    imageUrl,
    thumbnailUrl,
    tags = [],
    geoIndication,
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
      console.warn("[Products] DB insert failed, caching in memory:", err);
    }
  }

  memoryProducts.unshift(productData);
  res.status(201).json(productData);
});

export default router;
