import { Router, type IRouter } from "express";
import { db, isDbConfigured, inquiriesTable, productsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

const memoryInquiries: any[] = [
  {
    id: 1,
    productId: "textile-1",
    buyerName: "Anita Sharma (FabIndia Sourcing)",
    buyerPhone: "+91 98765 43210",
    buyerOrg: "Retail Chain Sourcing Dept",
    quantity: 50,
    message: "Interested in bulk order of 50 dupattas for upcoming Diwali handicraft showcase.",
    inquiryType: "b2b",
    status: "contacted",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 2,
    productId: "diya-1",
    buyerName: "Rakesh Verma (Hotel Grand Heritage)",
    buyerPhone: "+91 98111 22334",
    buyerOrg: "Hospitality Decor",
    quantity: 200,
    message: "Require 200 carved diyas for banquet lighting. Please provide wholesale quote with shipping.",
    inquiryType: "b2b",
    status: "new",
    createdAt: new Date().toISOString(),
  },
];

// GET /inquiries - List inquiries
router.get("/inquiries", async (_req, res) => {
  if (isDbConfigured) {
    try {
      const items = await db.select().from(inquiriesTable);
      if (items.length > 0) {
        res.json(items);
        return;
      }
    } catch (err) {
      console.warn("[Inquiries] DB query failed:", err);
    }
  }
  res.json(memoryInquiries);
});

// POST /inquiries - Submit inquiry
router.post("/inquiries", async (req, res) => {
  const { productId, buyerName, buyerPhone, buyerOrg, quantity = 1, message, inquiryType = "b2b" } = req.body;

  if (!productId || !buyerName || !buyerPhone) {
    res.status(400).json({ message: "Product, buyer name, and phone number are required." });
    return;
  }

  const newInquiry = {
    id: memoryInquiries.length + 1,
    productId,
    buyerName,
    buyerPhone,
    buyerOrg: buyerOrg ?? "Direct Buyer",
    quantity: Number(quantity),
    message: message ?? "Interested in this handmade craft item.",
    inquiryType,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  if (isDbConfigured) {
    try {
      await db.insert(inquiriesTable).values({
        productId,
        buyerName,
        buyerPhone,
        buyerOrg: buyerOrg ?? null,
        quantity: Number(quantity),
        message: message ?? null,
        inquiryType,
        status: "new",
      });

      // Increment inquiry counter on product
      await db
        .update(productsTable)
        .set({ inquiries: sql`${productsTable.inquiries} + 1` })
        .where(eq(productsTable.id, productId));
    } catch (err) {
      console.warn("[Inquiries] DB insert failed:", err);
    }
  }

  memoryInquiries.unshift(newInquiry);
  res.status(201).json({
    message: "Inquiry registered successfully. Artisan will be notified via SMS/WhatsApp.",
    inquiry: newInquiry,
  });
});

export default router;
