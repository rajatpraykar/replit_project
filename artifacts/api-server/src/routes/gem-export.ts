import { Router, type IRouter } from "express";

const router: IRouter = Router();

/**
 * Government e-Marketplace (GeM) Product Catalogue Export
 * Format compliant with GeM Seller Portal bulk upload specification.
 */
router.get("/gem-export", (_req, res) => {
  const mockProducts = [
    {
      sku: "GEM-MOSJE-001",
      name: "Handwoven Natural Indigo Dupatta",
      category: "Handloom Textiles",
      hsn: "63049200",
      material: "Pure Cotton, Organic Indigo",
      price: 1480,
      b2bPrice: 960,
      makeInIndia: "YES",
      msePreference: "SC/ST/Women Entrepreneur",
      originState: "Rajasthan",
      leadTimeDays: 7,
      minOrderQty: 5,
    },
    {
      sku: "GEM-MOSJE-002",
      name: "Carved Terracotta Festive Diya (Pack of 4)",
      category: "Handcrafted Pottery",
      hsn: "69120090",
      material: "Natural River Clay",
      price: 360,
      b2bPrice: 220,
      makeInIndia: "YES",
      msePreference: "SC/ST/Women Entrepreneur",
      originState: "Uttar Pradesh",
      leadTimeDays: 4,
      minOrderQty: 20,
    },
    {
      sku: "GEM-MOSJE-003",
      name: "Kashmiri Hand-Embroidered Woolen Stole",
      category: "Heritage Embroidery",
      hsn: "62142010",
      material: "Fine Wool, Aari Embroidery",
      price: 3200,
      b2bPrice: 2100,
      makeInIndia: "YES",
      msePreference: "SC/ST/Women Entrepreneur",
      originState: "Jammu and Kashmir",
      leadTimeDays: 10,
      minOrderQty: 3,
    },
  ];

  const headers = [
    "Product SKU",
    "Product Title",
    "Category",
    "HSN Code",
    "Material & Craft",
    "Unit Price (INR)",
    "Government Bulk Price (INR)",
    "Make In India Eligible",
    "MSE Reserved Preference",
    "State of Manufacture",
    "Delivery Lead Time (Days)",
    "Minimum Order Quantity",
  ];

  const rows = mockProducts.map((p) => [
    `"${p.sku}"`,
    `"${p.name}"`,
    `"${p.category}"`,
    `"${p.hsn}"`,
    `"${p.material}"`,
    p.price,
    p.b2bPrice,
    `"${p.makeInIndia}"`,
    `"${p.msePreference}"`,
    `"${p.originState}"`,
    p.leadTimeDays,
    p.minOrderQty,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="GeM_Artisan_Catalogue_MoSJE.csv"');
  res.send(csvContent);
});

export default router;
