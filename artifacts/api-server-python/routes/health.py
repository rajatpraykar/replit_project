"""
Healthcheck & Liveness Probe Route (Python FastAPI)
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/healthz")
def healthz():
    return {
        "status": "ok",
        "runtime": "python-fastapi",
        "service": "KalaSetu API Engine"
    }
