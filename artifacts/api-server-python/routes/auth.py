"""
Artisan Identity & Mobile OTP Authentication Route (Python FastAPI)
"""
import time
from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

CURRENT_ARTISAN: Dict[str, Any] = {
    "id": "artisan_demo_01",
    "phone": "+91 98765 43210",
    "name": "Kavita Devi",
    "state": "Rajasthan",
    "district": "Jaipur",
    "craftCluster": "Sanganer Handblock & Natural Indigo",
    "socialCategory": "SC/ST Traditional Artisan",
    "udyamNumber": "UDYAM-RJ-14-0028911",
    "pehchanId": "PEHCHAN-TEX-2024-8842",
    "aadhaarVerified": True,
    "verifiedBy": "Ministry of Social Justice & Empowerment Cluster Cell",
}

class SendOTPRequest(BaseModel):
    phone: str

class VerifyOTPRequest(BaseModel):
    phone: str
    otp: str

@router.post("/auth/send-otp")
def send_otp(payload: SendOTPRequest):
    if not payload.phone:
        raise HTTPException(status_code=400, detail="Mobile number is required.")
    return {
        "message": "OTP sent successfully to registered mobile.",
        "phone": payload.phone,
        "demoOtp": "123456",
    }

@router.post("/auth/verify-otp")
def verify_otp(payload: VerifyOTPRequest):
    if payload.otp not in ["123456", "000000"]:
        raise HTTPException(status_code=401, detail="Invalid OTP. For demo use 123456.")
    
    artisan_copy = dict(CURRENT_ARTISAN)
    if payload.phone:
        artisan_copy["phone"] = payload.phone

    return {
        "token": f"jwt_token_demo_{int(time.time() * 1000)}",
        "artisan": artisan_copy,
    }

@router.get("/auth/profile")
def get_profile():
    return CURRENT_ARTISAN

@router.post("/auth/profile")
def update_profile(updates: Dict[str, Any]):
    global CURRENT_ARTISAN
    CURRENT_ARTISAN.update(updates)
    return {
        "message": "Profile updated successfully.",
        "artisan": CURRENT_ARTISAN,
    }
