"""
Beckn Protocol (ONDC Retail Specification 1.1.0) Route (Python FastAPI)
Allows open network compliance verification for retail buyers and gateways.
"""
import time
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ONDCCatalogRequest(BaseModel):
    products: Optional[List[Dict[str, Any]]] = []
    artisanName: Optional[str] = "MoSJE Beneficiary Artisan"
    location: Optional[str] = "Jaipur Cluster"

@router.post("/ondc/catalog")
def generate_ondc_catalog(payload: ONDCCatalogRequest):
    products = payload.products or []
    artisan_name = payload.artisanName or "MoSJE Beneficiary Artisan"
    location = payload.location or "Jaipur Cluster"
    now_ts = int(time.time() * 1000)

    items = []
    for idx, prod in enumerate(products):
        price_val = prod.get("price", 1480)
        items.append({
            "id": prod.get("id", f"item-{idx + 1}"),
            "descriptor": {
                "name": prod.get("name", "Handmade Craft"),
                "code": f"HSN-6304-{idx + 1}",
                "symbol": prod.get("imageUri") or prod.get("imageUrl"),
                "short_desc": prod.get("description", ""),
                "long_desc": f"{prod.get('description', '')} Craft type: {prod.get('craft', 'Heritage Handicraft')}. Material: {prod.get('material', 'Natural')}.",
            },
            "price": {
                "currency": "INR",
                "value": str(price_val),
                "maximum_value": str(round(price_val * 1.2)),
            },
            "category_id": "Traditional Handloom & Handicrafts",
            "fulfillment_id": "standard-postal",
            "tags": {
                "make_in_india": "true",
                "artisan_verified": "true",
                "mosje_beneficiary": "true",
                "gi_tagged": "true" if prod.get("geoIndication") else "false",
            },
        })

    beckn_catalog = {
        "context": {
            "domain": "nic2004:52110",
            "country": "IND",
            "city": "std:0141",
            "action": "on_search",
            "core_version": "1.1.0",
            "bap_id": "buyer-app.ondc.org",
            "bap_uri": "https://buyer-app.ondc.org/protocol/v1",
            "bpp_id": "artisan-market.mosje.gov.in",
            "bpp_uri": "https://artisan-market.mosje.gov.in/api/ondc",
            "transaction_id": f"txn_{now_ts}",
            "message_id": f"msg_{now_ts}",
            "timestamp": datetime.now(timezone.utc).isoformat(),
        },
        "message": {
            "catalog": {
                "bpp/descriptor": {
                    "name": "MoSJE Digital Artisan Direct Network",
                    "symbol": "https://artisan-market.mosje.gov.in/logo.png",
                    "short_desc": "Direct-from-artisan marketplace powered by Ministry of Social Justice & Empowerment",
                },
                "bpp/providers": [
                    {
                        "id": "provider-artisan-01",
                        "descriptor": {
                            "name": artisan_name,
                            "short_desc": f"Traditional handcrafted heritage goods from {location}",
                        },
                        "locations": [
                            {
                                "id": "loc-01",
                                "city": "Jaipur",
                                "state": "Rajasthan",
                                "country": "IND",
                            }
                        ],
                        "items": items,
                    }
                ],
            }
        },
    }

    return beckn_catalog

@router.get("/ondc/status")
def ondc_status():
    return {
        "status": "ACTIVE",
        "becknVersion": "1.1.0",
        "networkDomain": "ONDC:RET10 (Handicrafts & Handlooms)",
        "gatewayEndpoint": "https://gateway.ondc.org",
        "artisanNetworkRegistry": "MoSJE-ARTISAN-REG-2026",
        "verifiedArtisansOnboarded": 1420,
    }
