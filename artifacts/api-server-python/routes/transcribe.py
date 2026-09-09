"""
Voice Transcription Route (Python FastAPI)
Integrates Bhashini ASR (Govt of India NLTM) + OpenAI Whisper-1 with realistic demo speech fallback.
"""
import os
import base64
from typing import Optional, Dict
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx

router = APIRouter()

DEMO_TRANSCRIPTS: Dict[str, str] = {
    "hi": "यह हाथ से बुना हुआ शुद्ध सूती दुपट्टा है जिसे प्राकृतिक नील के रंग से रंगा गया है। इसे बनाने में लगभग छह घंटे का समय लगता है।",
    "mr": "हा हातमागावर विणलेला अस्सल सुती दुपट्टा आहे, जो नैसर्गिक नीळ रंगाने रंगवला आहे. यास तयार करण्यास ६ तास लागले.",
    "bn": "এটি খাঁটি সুতির হাতে বোনা ওড়না, প্রাকৃতিক নীল রঙে রঞ্জিত। এটি তৈরি করতে প্রায় ৬ ঘণ্টা সময় লেগেছে।",
    "en": "This is a handwoven pure cotton scarf naturally dyed with indigo. It takes approximately six hours of traditional loom work to craft.",
}

class TranscribeRequest(BaseModel):
    audioBase64: Optional[str] = None
    mimeType: Optional[str] = "audio/m4a"
    language: Optional[str] = "hi"

@router.post("/transcribe")
async def transcribe_audio(payload: TranscribeRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    bhashini_user_id = os.getenv("BHASHINI_USER_ID")
    bhashini_api_key = os.getenv("BHASHINI_API_KEY")

    audio_b64 = payload.audioBase64
    mime_type = payload.mimeType or "audio/m4a"
    lang = payload.language or "hi"

    if not audio_b64:
        raise HTTPException(status_code=400, detail="An audio recording is required.")

    # 1. Bhashini ASR (National Language Translation Mission)
    if bhashini_user_id and bhashini_api_key:
        try:
            headers = {
                "userID": bhashini_user_id,
                "ulcaApiKey": bhashini_api_key,
                "Content-Type": "application/json",
            }
            body = {
                "pipelineTasks": [
                    {
                        "taskType": "asr",
                        "config": {
                            "language": {"sourceLanguage": lang},
                            "serviceId": "ai4bharat/conformer-hi-gpu",
                            "audioFormat": "wav" if "wav" in mime_type else "m4a",
                            "samplingRate": 16000,
                        },
                    }
                ],
                "inputData": {
                    "audio": [{"audioContent": audio_b64}]
                },
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post("https://dhruva-api.bhashini.gov.in/services/inference/pipeline", headers=headers, json=body)
                if res.status_code == 200:
                    resp_json = res.json()
                    recognized_text = (
                        resp_json.get("pipelineResponse", [{}])[0]
                        .get("output", [{}])[0]
                        .get("source")
                    )
                    if recognized_text:
                        return {"text": recognized_text, "provider": "bhashini"}
        except Exception as e:
            print(f"[Transcribe Python] Bhashini error: {e}")

    # 2. OpenAI Whisper-1
    if not api_key:
        fallback_text = DEMO_TRANSCRIPTS.get(lang, DEMO_TRANSCRIPTS["hi"])
        return {"text": fallback_text, "provider": "demo-fallback"}

    try:
        audio_bytes = base64.b64decode(audio_b64)
        ext = mime_type.split("/")[1] if "/" in mime_type else "m4a"
        files = {
            "file": (f"voice.{ext}", audio_bytes, mime_type)
        }
        data = {
            "model": "whisper-1",
        }
        supported = ["hi", "en", "mr", "bn", "gu", "ta", "te", "kn"]
        if lang in supported:
            data["language"] = lang

        async with httpx.AsyncClient(timeout=20.0) as client:
            res = await client.post(
                "https://api.openai.com/v1/audio/transcriptions",
                headers={"Authorization": f"Bearer {api_key}"},
                files=files,
                data=data
            )
            if res.status_code == 200:
                result = res.json().get("text")
                if result:
                    return {"text": result, "provider": "whisper"}
            raise HTTPException(status_code=502, detail=res.text)
    except Exception as e:
        print(f"[Transcribe Python] Whisper error: {e}")
        fallback_text = DEMO_TRANSCRIPTS.get(lang, DEMO_TRANSCRIPTS["hi"])
        return {"text": fallback_text, "provider": "demo-fallback"}
