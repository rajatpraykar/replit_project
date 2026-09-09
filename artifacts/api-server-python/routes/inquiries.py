"""
B2B Bulk Inquiries Route (Python FastAPI)
Captures B2B leads from institutional buyers and retail sourcing agents.
"""
from datetime import datetime, timezone, timedelta
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

MEMORY_INQUIRIES: List[Dict[str, Any]] = [
    {
        "id": 1,
        "productId": "textile-1",
        "buyerName": "Anita Sharma (FabIndia Sourcing)",
        "buyerPhone": "+91 98765 43210",
        "buyerOrg": "Retail Chain Sourcing Dept",
        "quantity": 50,
        "message": "Interested in bulk order of 50 dupattas for upcoming Diwali handicraft showcase.",
        "inquiryType": "b2b",
        "status": "contacted",
        "createdAt": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat(),
    },
    {
        "id": 2,
        "productId": "diya-1",
        "buyerName": "Rakesh Verma (Hotel Grand Heritage)",
        "buyerPhone": "+91 98111 22334",
        "buyerOrg": "Hospitality Decor",
        "quantity": 200,
        "message": "Require 200 carved diyas for banquet lighting. Please provide wholesale quote with shipping.",
        "inquiryType": "b2b",
        "status": "new",
        "createdAt": datetime.now(timezone.utc).isoformat(),
    },
]

class CreateInquiryRequest(BaseModel):
    productId: str
    buyerName: str
    buyerPhone: str
    buyerOrg: Optional[str] = "Direct Buyer"
    quantity: Optional[int] = 1
    message: Optional[str] = "Interested in this handmade craft item."
    inquiryType: Optional[str] = "b2b"

@router.get("/inquiries")
def list_inquiries():
    return MEMORY_INQUIRIES

@router.post("/inquiries", status_code=201)
def create_inquiry(payload: CreateInquiryRequest):
    if not payload.productId or not payload.buyerName or not payload.buyerPhone:
        raise HTTPException(status_code=400, detail="Product, buyer name, and phone number are required.")

    new_inquiry = {
        "id": len(MEMORY_INQUIRIES) + 1,
        "productId": payload.productId,
        "buyerName": payload.buyerName,
        "buyerPhone": payload.buyerPhone,
        "buyerOrg": payload.buyerOrg or "Direct Buyer",
        "quantity": payload.quantity or 1,
        "message": payload.message or "Interested in this handmade craft item.",
        "inquiryType": payload.inquiryType or "b2b",
        "status": "new",
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    MEMORY_INQUIRIES.insert(0, new_inquiry)
    return {
        "message": "Inquiry registered successfully. Artisan will be notified via SMS/WhatsApp.",
        "inquiry": new_inquiry,
    }
