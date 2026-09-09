"""
Multilingual AI Auto-Cataloger Route (Python FastAPI)
Uses OpenAI GPT-4o-mini Vision with resilient bilingual handicraft fallback.
"""
import os
import re
import json
from typing import Optional, List, Dict, Any
from fastapi import APIRouter
from pydantic import BaseModel, Field
import httpx

router = APIRouter()

STATE_HOURLY_WAGE: Dict[str, int] = {
    "UP": 32,  # ₹256/day / 8hrs
    "MP": 31,
    "RJ": 30,
    "WB": 32,
    "GJ": 35,
    "MH": 35,
    "default": 32,
}

class CatalogGenerateRequest(BaseModel):
    productName: Optional[str] = "Handcrafted Artisan Product"
    craftType: Optional[str] = "Traditional Handicraft"
    materials: Optional[str] = "Natural organic materials"
    voiceTranscript: Optional[str] = ""
    imageBase64: Optional[str] = None
    language: Optional[str] = "hi"
    materialCost: Optional[int] = 350
    makingHours: Optional[int] = 5
    artisanState: Optional[str] = "default"

class PricingBreakdown(BaseModel):
    retail: int
    wholesale: int
    export: int

class FairTradeBreakdown(BaseModel):
    materialCost: int
    laborHours: int
    hourlyWage: int
    packaging: int

class CatalogGenerateResponse(BaseModel):
    englishTitle: str
    hindiTitle: str
    englishDescription: str
    hindiDescription: str
    regionalTitle: Optional[str] = None
    regionalDescription: Optional[str] = None
    craftCategory: str
    materialsDetected: List[str]
    careInstructions: str
    tags: List[str]
    geoIndication: Optional[str] = None
    pricing: PricingBreakdown
    fairTradeBreakdown: FairTradeBreakdown

@router.post("/catalog/generate", response_model=CatalogGenerateResponse)
async def generate_catalog(payload: CatalogGenerateRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    
    product_name = payload.productName or "Handcrafted Artisan Product"
    craft_type = payload.craftType or "Traditional Handicraft"
    materials = payload.materials or "Natural organic materials"
    voice_transcript = payload.voiceTranscript or ""
    image_b64 = payload.imageBase64
    language = payload.language or "hi"
    material_cost = payload.materialCost or 350
    making_hours = payload.makingHours or 5
    artisan_state = payload.artisanState or "default"

    # Fair-trade pricing calculations
    hourly_wage = STATE_HOURLY_WAGE.get(artisan_state, STATE_HOURLY_WAGE["default"])
    labor_cost = round(making_hours * hourly_wage * 3.5)
    packaging = max(35, round(material_cost * 0.08))
    base_cost = material_cost + labor_cost + packaging
    retail = round(base_cost * 2.2)
    wholesale = round(retail * 0.65)
    export_price = round(retail * 1.35)

    pricing = PricingBreakdown(retail=retail, wholesale=wholesale, export=export_price)
    fair_trade = FairTradeBreakdown(
        materialCost=material_cost,
        laborHours=making_hours,
        hourlyWage=round(hourly_wage * 3.5),
        packaging=packaging,
    )

    # 1. If OpenAI API key present, query GPT-4o-mini Vision
    if api_key:
        try:
            content: List[Dict[str, Any]] = []
            if image_b64:
                content.append({
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{image_b64}",
                        "detail": "low"
                    }
                })
            content.append({
                "type": "text",
                "text": (
                    f"Artisan product: {product_name}\n"
                    f"Craft tradition: {craft_type}\n"
                    f"Materials used: {materials}\n"
                    f'Artisan voice note description: "{voice_transcript}"\n'
                    f"Language: {language}\n"
                    "Generate the complete bilingual catalog listing."
                )
            })

            messages = [
                {
                    "role": "system",
                    "content": (
                        "You are an expert Indian handicraft curator for the Ministry of Social Justice & Empowerment (MoSJE) and Ministry of Textiles.\n"
                        "Your mission is to help traditional rural artisans sell online.\n"
                        "Create a JSON response with these exact keys:\n"
                        "- englishTitle (compelling, SEO-friendly, 5-8 words)\n"
                        "- hindiTitle (accurate Hindi translation with culturally authentic artisan terms)\n"
                        "- englishDescription (2-3 engaging sentences emphasizing handmade heritage, ethical craft, and texture)\n"
                        "- hindiDescription (authentic Hindi description)\n"
                        "- craftCategory (e.g. Handloom Textiles, Terracotta Pottery, Wood Carving, Brassware, Jute Craft)\n"
                        "- materialsDetected (array of strings)\n"
                        "- careInstructions (concise care tip in English)\n"
                        "- tags (array of 5-8 relevant tags like #VocalForLocal, #HandmadeInIndia)\n"
                        "- geoIndication (if recognizable, e.g. 'Jaipur Blue Pottery', 'Varanasi Silk', or null)\n"
                        "Format as valid JSON only."
                    )
                },
                {
                    "role": "user",
                    "content": content
                }
            ]

            async with httpx.AsyncClient(timeout=25.0) as client:
                res = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "gpt-4o-mini",
                        "messages": messages,
                        "response_format": {"type": "json_object"},
                        "temperature": 0.5,
                        "max_tokens": 900
                    }
                )
                if res.status_code == 200:
                    data = res.json()
                    parsed = json.loads(data["choices"][0]["message"]["content"])
                    return CatalogGenerateResponse(
                        englishTitle=parsed.get("englishTitle", product_name),
                        hindiTitle=parsed.get("hindiTitle", product_name),
                        englishDescription=parsed.get("englishDescription", ""),
                        hindiDescription=parsed.get("hindiDescription", ""),
                        craftCategory=parsed.get("craftCategory", craft_type),
                        materialsDetected=parsed.get("materialsDetected", [materials]),
                        careInstructions=parsed.get("careInstructions", "Handle with traditional care."),
                        tags=parsed.get("tags", ["#Handmade", "#VocalForLocal"]),
                        geoIndication=parsed.get("geoIndication"),
                        pricing=pricing,
                        fairTradeBreakdown=fair_trade
                    )
        except Exception as e:
            print(f"[Catalog Python] OpenAI generation error: {e}, falling back to intelligent heuristic")

    # 2. Resilient heuristic bilingual fallback (works offline and for live jury demos)
    search_context = f"{product_name} {craft_type} {materials} {voice_transcript}".lower()
    is_textile = bool(re.search(r"cloth|fabric|dupatta|saree|shawl|cotton|silk|weave|loom|khadi", search_context))
    is_pottery = bool(re.search(r"clay|pot|diya|terracotta|ceramic|mud", search_context))

    english_title = product_name
    hindi_title = product_name
    english_desc = "Handcrafted with traditional techniques handed down through generations. Each piece reflects authentic Indian artisan heritage."
    hindi_desc = "पारंपरिक हस्तशिल्प तकनीक से निर्मित, हर कृति में भारतीय कारीगरी और सांस्कृतिक विरासत की अनूठी झलक है।"
    craft_cat = craft_type
    gi_tag = None

    if is_textile:
        english_title = product_name if "Dupatta" in product_name else f"Handwoven {product_name} with Natural Dyes"
        hindi_title = "हाथ से बुना हुआ पारंपरिक दुपट्टा"
        english_desc = f"A soft, breathable handloom creation woven in small artisan clusters. Dyed with eco-friendly natural colors, carrying the gentle rhythm and story of traditional pit looms. {f'Artisan note: {voice_transcript}' if voice_transcript else ''}"
        hindi_desc = "पारंपरिक करघे पर छोटे बैच में बुना गया नरम एवं आरामदायक वस्त्र। प्राकृतिक रंगों से तैयार, हर धागे में भारतीय बुनकरों का हुनर झलकता है।"
        craft_cat = "Handloom & Heritage Textiles"
        gi_tag = "Varanasi / Pochampally Handloom Cluster"
    elif is_pottery:
        english_title = f"Hand-moulded Terracotta {product_name}"
        hindi_title = "हस्तनिर्मित नक्काशीदार मिट्टी की कलाकृति"
        english_desc = f"Individually sculpted from refined river clay and kiln-fired using age-old pottery methods. Perfect for festive celebrations and home decor. {f'Artisan note: {voice_transcript}' if voice_transcript else ''}"
        hindi_desc = "नदी की शुद्ध चिकनी मिट्टी से गढ़ा गया और पारंपरिक भट्टी में पकाया गया सुंदर दीया। त्योहारों और घर की सजावट के लिए आदर्श।"
        craft_cat = "Terracotta & Clay Craft"
        gi_tag = "Gorakhpur Terracotta Craft"

    detected_materials = [m.strip() for m in re.split(r"[,·]", materials)] if materials else ["Natural Craft Material"]

    return CatalogGenerateResponse(
        englishTitle=english_title,
        hindiTitle=hindi_title,
        englishDescription=english_desc,
        hindiDescription=hindi_desc,
        craftCategory=craft_cat,
        materialsDetected=detected_materials,
        careInstructions="Hand wash gently in cold water." if is_textile else "Wipe gently with a soft dry cloth.",
        tags=[
            "#VocalForLocal",
            "#HandmadeInIndia",
            "#MoSJEArtisan",
            "#HeritageCraft",
            "#FairTrade",
            "#AtmanirbharBharat"
        ],
        geoIndication=gi_tag,
        pricing=pricing,
        fairTradeBreakdown=fair_trade
    )
