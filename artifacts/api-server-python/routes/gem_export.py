"""
Government e-Marketplace (GeM) Bulk CSV Export Route (Python FastAPI)
Compliant with GeM Seller Portal schema for SC/ST/Women/MSE procurement reservations.
"""
import io
import csv
from fastapi import APIRouter, Response

router = APIRouter()

MOCK_GEM_PRODUCTS = [
    {
        "sku": "GEM-MOSJE-001",
        "name": "Handwoven Natural Indigo Dupatta",
        "category": "Handloom Textiles",
        "hsn": "63049200",
        "material": "Pure Cotton, Organic Indigo",
        "price": 1480,
        "b2bPrice": 960,
        "makeInIndia": "YES",
        "msePreference": "SC/ST/Women Entrepreneur",
        "originState": "Rajasthan",
        "leadTimeDays": 7,
        "minOrderQty": 5,
    },
    {
        "sku": "GEM-MOSJE-002",
        "name": "Carved Terracotta Festive Diya (Pack of 4)",
        "category": "Handcrafted Pottery",
        "hsn": "69120090",
        "material": "Natural River Clay",
        "price": 360,
        "b2bPrice": 220,
        "makeInIndia": "YES",
        "msePreference": "SC/ST/Women Entrepreneur",
        "originState": "Uttar Pradesh",
        "leadTimeDays": 4,
        "minOrderQty": 20,
    },
    {
        "sku": "GEM-MOSJE-003",
        "name": "Kashmiri Hand-Embroidered Woolen Stole",
        "category": "Heritage Embroidery",
        "hsn": "62142010",
        "material": "Fine Wool, Aari Embroidery",
        "price": 3200,
        "b2bPrice": 2100,
        "makeInIndia": "YES",
        "msePreference": "SC/ST/Women Entrepreneur",
        "originState": "Jammu and Kashmir",
        "leadTimeDays": 10,
        "minOrderQty": 3,
    },
]

@router.get("/gem-export")
def export_gem_catalog():
    headers = [
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
    ]

    output = io.StringIO()
    writer = csv.writer(output, quoting=csv.QUOTE_ALL)
    writer.writerow(headers)

    for p in MOCK_GEM_PRODUCTS:
        writer.writerow([
            p["sku"],
            p["name"],
            p["category"],
            p["hsn"],
            p["material"],
            p["price"],
            p["b2bPrice"],
            p["makeInIndia"],
            p["msePreference"],
            p["originState"],
            p["leadTimeDays"],
            p["minOrderQty"],
        ])

    csv_data = output.getvalue()
    return Response(
        content=csv_data,
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": 'attachment; filename="GeM_Artisan_Catalogue_MoSJE.csv"'}
    )
