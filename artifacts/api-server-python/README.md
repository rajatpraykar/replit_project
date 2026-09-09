# 🐍 KalaSetu API Server — Converted Python Edition (FastAPI)

> **High-Performance Asynchronous Python Microservice for KalaSetu (कलासेतु)**  
> Smart India Hackathon Grand Finale • Problem Statement ID: 26090  
> Ministry of Social Justice & Empowerment (MoSJE)

---

## 📌 Overview

This directory contains the **full, 1:1 drop-in Python (FastAPI + Pydantic v2 + HTTPX) conversion** of the KalaSetu backend. It serves the exact same REST API endpoints, schemas, and payloads as the TypeScript/Node.js backend, allowing it to seamlessly communicate with the **Expo React Native mobile app** without requiring any frontend code changes.

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
cd "artifacts/api-server-python"
pip install -r requirements.txt
```

### 2. Run with Uvicorn
```bash
# Runs on Port 3000 (matching Expo mobile app's default API URL)
python main.py
```
Or directly using Uvicorn CLI:
```bash
uvicorn main:app --host 0.0.0.0 --port 3000 --reload
```

Interactive OpenAPI Swagger UI is available at: **`http://localhost:3000/docs`**  
ReDoc interactive documentation is available at: **`http://localhost:3000/redoc`**

---

## 📡 API Endpoints Master Matrix

| Endpoint | Method | Purpose | Key Libraries / Services |
|:---|:---:|:---|:---|
| `/api/catalog/generate` | `POST` | Bilingual cataloging & GI tag detection | OpenAI `gpt-4o-mini` Vision + Async HTTPX |
| `/api/pricing/suggest` | `POST` | Statutory minimum wage compliance | State wage matrix + Vision complexity scoring |
| `/api/enhance-image` | `POST` | Studio lighting & background isolation | Remove.bg API + DALL-E 2 edit synthesis |
| `/api/transcribe` | `POST` | Speech-to-text for Indian regional dialects | Bhashini ASR + OpenAI Whisper-1 |
| `/api/ondc/catalog` | `POST` | Open Network for Digital Commerce export | Beckn Retail Protocol 1.1.0 JSON generator |
| `/api/ondc/status` | `GET` | ONDC Network gateway health & registry | ONDC:RET10 Handicrafts status payload |
| `/api/gem-export` | `GET` | Government e-Marketplace CSV download | Python `csv` module (HSN 6304 / 6912) |
| `/api/analytics` | `GET` | MoSJE socio-economic telemetry | Wage premium calculation + 4 scheme matchers |
| `/api/products` | `GET/POST`| Product catalog listing & mobile sync | In-memory cache + cloud persistence model |
| `/api/inquiries` | `GET/POST`| B2B wholesale purchase inquiries | FabIndia/Retail chain lead management |
| `/api/auth/send-otp` | `POST` | Mobile OTP dispatch | Demo OTP `123456` generator |
| `/api/auth/verify-otp`| `POST` | OTP verification & JWT issuance | Mobile token & Pehchan ID profile |
| `/api/healthz` | `GET` | Liveness & health probe | Kubernetes / Cloud readiness check |

---

## ⚖️ Architecture Comparison: Node.js vs Python FastAPI

| Evaluation Factor | Node.js (TypeScript + Express/Fastify) | Python (FastAPI + Uvicorn) | Recommendation |
|:---|:---|:---|:---|
| **Primary Workload Profile** | Network I/O (Async fetch to OpenAI, Bhashini, Remove.bg, Postgres) | Network I/O (Async HTTPX) or CPU/ML (PyTorch/Transformers) | **Both Excel at I/O**. Node event loop has lower raw memory overhead. |
| **Mobile App Type Sharing** | Direct monorepo import of Zod types & Drizzle schemas into React Native | Requires OpenAPI client generation or manual synchronization | **Node.js advantage** for full-stack developer velocity. |
| **Local ML / Embeddings** | Requires ONNX runtime or spawning Python child process | Native Python ecosystem (`transformers`, `scikit-learn`, `spacy`) | **Python advantage** if running self-hosted models on-premise. |
| **Cold Start / Container Size** | ~70MB Alpine image, <100ms startup | ~150MB Slim image, ~300ms startup | **Node.js advantage** for serverless / edge containers. |
| **Swagger / OpenAPI Auto-docs** | Requires manual tsoa or swagger-jsdoc annotations | Native automatic generation via Pydantic (`/docs`) | **Python FastAPI advantage** for instant interactive documentation. |

---

## 🏛️ Best-of-Both-Worlds: Hybrid Mesh Option

In enterprise architectures, teams often use **Node.js as the High-Concurrency Edge Gateway & Mobile BFF (Backend-for-Frontend)**, and **Python FastAPI as a Dedicated AI/ML Microservice Sidecar**:

```
[ Expo Mobile App ]
        │
        ▼ (HTTPS / JSON)
[ Node.js Express Gateway (Port 3000) ] ──▶ Auth, Drizzle PostgreSQL, ONDC Beckn, GeM CSV
        │
        ▼ (Internal gRPC / HTTP)
[ Python FastAPI AI Sidecar (Port 8000) ] ──▶ Custom PyTorch Models, Indian Dialect Phonetics, Vector Search
```
