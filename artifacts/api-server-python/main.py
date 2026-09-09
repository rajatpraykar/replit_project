"""
KalaSetu (कलासेतु) • FastAPI Microservice & API Gateway (Python Backend)
Ministry of Social Justice & Empowerment (MoSJE) - SIH Grand Finale PS 26090
"""
import os
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from parent workspace .env if present
load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))
load_dotenv()

from routes.catalog import router as catalog_router
from routes.pricing import router as pricing_router
from routes.enhance_image import router as enhance_image_router
from routes.transcribe import router as transcribe_router
from routes.ondc import router as ondc_router
from routes.gem_export import router as gem_export_router
from routes.analytics import router as analytics_router
from routes.products import router as products_router
from routes.inquiries import router as inquiries_router
from routes.auth import router as auth_router
from routes.health import router as health_router

app = FastAPI(
    title="KalaSetu API Engine (Python Edition)",
    description="AI-Driven Market Linkage & Smart Cataloging Platform for Marginalized Artisans",
    version="1.1.0",
)

# CORS Middleware allowing Expo mobile app and local dev clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes with /api prefix
app.include_router(catalog_router, prefix="/api", tags=["AI Cataloging"])
app.include_router(pricing_router, prefix="/api", tags=["Fair-Trade Pricing"])
app.include_router(enhance_image_router, prefix="/api", tags=["AI Studio"])
app.include_router(transcribe_router, prefix="/api", tags=["Voice Transcription"])
app.include_router(ondc_router, prefix="/api", tags=["ONDC Beckn Protocol"])
app.include_router(gem_export_router, prefix="/api", tags=["Government e-Marketplace"])
app.include_router(analytics_router, prefix="/api", tags=["MoSJE Analytics"])
app.include_router(products_router, prefix="/api", tags=["Product Catalog"])
app.include_router(inquiries_router, prefix="/api", tags=["B2B Inquiries"])
app.include_router(auth_router, prefix="/api", tags=["Auth & Identity"])
app.include_router(health_router, prefix="/api", tags=["System Health"])

@app.get("/")
def root():
    return {
        "platform": "KalaSetu (कलासेतु)",
        "runtime": "Python 3.11+ / FastAPI",
        "docs": "/docs",
        "openapi": "/openapi.json",
        "health": "/api/healthz"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 3000))
    print(f"🚀 KalaSetu Python API Server starting on http://0.0.0.0:{port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
