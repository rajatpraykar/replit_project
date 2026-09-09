"""
Product Catalog Cloud Sync & CRUD Route (Python FastAPI)
Serves synced products with memory cache and local demo fallbacks.
"""
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Memory products cache
MEMORY_PRODUCTS: List[Dict[str, Any]] = [
    {
        "id": "textile-1",
        "name": "Indigo Handwoven Dupatta",
        "nameHindi": "हाथ से बुना हुआ पारंपरिक नील दुपट्टा",
        "craftCategory": "Handloom textile",
        "material": "Cotton · Natural indigo",
        "price": 1480,
        "b2bPrice": 960,
        "exportPrice": 1920,
        "status": "Published",
        "description": "A soft, naturally dyed dupatta woven by hand in small batches. Each piece carries the gentle irregularity and story of the loom.",
        "descriptionHindi": "छोटे बैच में हाथ से बुना हुआ नरम दुपट्टा। हर टुकड़े में करघे की खूबसूरत पहचान और कारीगर की कहानी है।",
        "imageUrl": "/assets/images/indigo-textile.jpg",
        "thumbnailUrl": "/assets/images/indigo-textile.jpg",
        "tags": ["#Handloom", "#NaturalIndigo", "#VocalForLocal"],
        "views": 48,
        "inquiries": 3,
        "geoIndication": "Rajasthan Handloom",
        "ondcListed": True,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    },
    {
        "id": "diya-1",
        "name": "Carved Terracotta Diya",
        "nameHindi": "नक्काशीदार मिट्टी का पारंपरिक दीया",
        "craftCategory": "Terracotta craft",
        "material": "Terracotta clay",
        "price": 360,
        "b2bPrice": 220,
        "exportPrice": 480,
        "status": "Published",
        "description": "A hand-shaped terracotta diya with delicate carved details, made for warm evenings and festive corners.",
        "descriptionHindi": "नाज़ुक नक्काशी वाला हाथ से बनाया हुआ मिट्टी का दीया, त्योहार और रोज़मर्रा की रोशनी के लिए।",
        "imageUrl": "/assets/images/terracotta-diya.jpg",
        "thumbnailUrl": "/assets/images/terracotta-diya.jpg",
        "tags": ["#Terracotta", "#FestiveDecor", "#ClayCraft"],
        "views": 82,
        "inquiries": 7,
        "geoIndication": "Gorakhpur Terracotta",
        "ondcListed": True,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    },
]

class CreateProductRequest(BaseModel):
    id: Optional[str] = None
    name: str
    nameHindi: Optional[str] = None
    craftCategory: Optional[str] = "Handicraft"
    material: Optional[str] = "Natural materials"
    price: int
    b2bPrice: Optional[int] = None
    exportPrice: Optional[int] = None
    description: str
    descriptionHindi: Optional[str] = None
    imageUrl: Optional[str] = None
    thumbnailUrl: Optional[str] = None
    tags: Optional[List[str]] = []
    geoIndication: Optional[str] = None
    ondcListed: Optional[bool] = True

@router.get("/products")
def list_products():
    return MEMORY_PRODUCTS

@router.get("/products/{product_id}")
def get_product(product_id: str):
    for p in MEMORY_PRODUCTS:
        if p["id"] == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")

@router.post("/products", status_code=201)
def create_product(payload: CreateProductRequest):
    new_id = payload.id or f"prod-{len(MEMORY_PRODUCTS) + 1}-{int(datetime.now(timezone.utc).timestamp())}"
    retail_price = payload.price
    b2b = payload.b2bPrice or round(retail_price * 0.65)
    export_p = payload.exportPrice or round(retail_price * 1.35)

    prod = {
        "id": new_id,
        "name": payload.name,
        "nameHindi": payload.nameHindi or payload.name,
        "craftCategory": payload.craftCategory or "Handicraft",
        "material": payload.material or "Natural materials",
        "price": retail_price,
        "b2bPrice": b2b,
        "exportPrice": export_p,
        "status": "Published",
        "description": payload.description,
        "descriptionHindi": payload.descriptionHindi or payload.description,
        "imageUrl": payload.imageUrl or "/assets/images/indigo-textile.jpg",
        "thumbnailUrl": payload.thumbnailUrl or payload.imageUrl or "/assets/images/indigo-textile.jpg",
        "tags": payload.tags or ["#VocalForLocal"],
        "views": 1,
        "inquiries": 0,
        "geoIndication": payload.geoIndication,
        "ondcListed": payload.ondcListed if payload.ondcListed is not None else True,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    MEMORY_PRODUCTS.insert(0, prod)
    return prod
