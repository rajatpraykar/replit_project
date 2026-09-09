"""
MoSJE Socio-Economic Impact Telemetry & Scheme Eligibility Route (Python FastAPI)
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/analytics")
def get_analytics():
    avg_hourly_wage = 112  # Inferred artisan hourly wage from fair-trade pricing
    state_min_hourly = 32   # Standard statutory minimum wage
    fair_wage_premium = round(((avg_hourly_wage - state_min_hourly) / state_min_hourly) * 100)

    return {
        "metrics": {
            "totalProducts": 2,
            "totalInventoryValue": 1840,
            "totalViews": 130,
            "totalInquiries": 10,
            "b2bPipelineValue": 52000,
            "averageFairWagePerHour": avg_hourly_wage,
            "statutoryMinimumWage": state_min_hourly,
            "fairWagePremiumPercent": fair_wage_premium,  # e.g. +250% above statutory minimum
            "ondcReadinessScore": 98,
            "digitalLiteracyAssistLevel": "Voice-First & Audio-Guided",
        },
        "governmentSchemeEligibility": [
            {
                "schemeCode": "PM-VISHWAKARMA",
                "schemeName": "PM Vishwakarma Scheme",
                "ministry": "Ministry of MSME / MoSJE",
                "status": "ELIGIBLE",
                "benefit": "₹15,000 modern toolkit incentive + collateral-free loan at 5% interest up to ₹3,00,000",
                "actionRequired": "Verify with Pehchan Artisan Card or CSC center",
            },
            {
                "schemeCode": "AHVY-CLUSTER",
                "schemeName": "Ambedkar Hastshilp Vikas Yojana (AHVY)",
                "ministry": "Ministry of Textiles / MoSJE",
                "status": "ELIGIBLE",
                "benefit": "100% sponsored stall space in Shilp Samagam, Dilli Haat, Surajkund International Fair",
                "actionRequired": "Auto-synced via MoSJE digital artisan portfolio",
            },
            {
                "schemeCode": "GEM-MSE-EXEMPT",
                "schemeName": "GeM Government e-Marketplace MSE Exemption",
                "ministry": "Ministry of Commerce & Industry",
                "status": "ACTIVE",
                "benefit": "Exemption from Earnest Money Deposit (EMD) and tender fees for public procurement",
                "actionRequired": "One-click export catalog to GeM portal",
            },
            {
                "schemeCode": "MUDRA-SHISHU",
                "schemeName": "Pradhan Mantri MUDRA Yojana",
                "ministry": "Ministry of Finance",
                "status": "RECOMMENDED",
                "benefit": "Instant working capital loan up to ₹50,000 based on verified digital order book",
                "actionRequired": "Apply directly using verified export receipts",
            },
        ],
        "socialImpactStatement": (
            "Empowering marginalized SC/ST/OBC and traditional craft communities with direct digital market access, "
            "eliminating predatory middlemen, and ensuring 100% fair-trade wage realization."
        ),
    }
