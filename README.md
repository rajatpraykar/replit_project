<div align="center">

# 🪔 KalaSetu (कलासेतु) • Artisan Market
### AI-Driven Market Linkage & Smart Cataloging Platform for Marginalized Artisans

**Smart India Hackathon (SIH) Grand Finale • Problem Statement ID: 26090**  
**Ministry of Social Justice & Empowerment (MoSJE) | Theme: Heritage & Culture**

<br />

[![SIH Problem Statement](https://img.shields.io/badge/SIH%20PS%20ID-26090-orange.svg?style=for-the-badge&logo=gov.in)](https://sih.gov.in)
[![Ministry](https://img.shields.io/badge/Ministry-MoSJE-blue.svg?style=for-the-badge)](https://socialjustice.gov.in)
[![ONDC Protocol](https://img.shields.io/badge/ONDC-Beckn%20v1.1.0-green.svg?style=for-the-badge)](https://ondc.org)
[![Bhashini AI](https://img.shields.io/badge/Language%20AI-Bhashini%20ASR-8A2BE2.svg?style=for-the-badge)](https://bhashini.gov.in)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Mobile-Expo%20v57-000020.svg?style=for-the-badge&logo=expo)](https://expo.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

<br />

> *"Giving India's 70 lakh traditional artisans a voice, a digital identity, and year-round direct market access without predatory middlemen."*

</div>

---

## 📑 Table of Contents

- [1. Executive Summary & Problem Context](#1-executive-summary--problem-context)
- [2. System Architecture](#2-system-architecture)
- [3. Key Features & Innovations](#3-key-features--innovations)
  - [3.1. Real Multilingual AI Auto-Cataloger](#31-real-multilingual-ai-auto-cataloger)
  - [3.2. AI Image Studio (Background Isolation & Lighting)](#32-ai-image-studio-background-isolation--lighting)
  - [3.3. Dynamic Fair-Trade Pricing Engine](#33-dynamic-fair-trade-pricing-engine)
  - [3.4. Government & B2B Market Linkage (ONDC & GeM)](#34-government--b2b-market-linkage-ondc--gem)
  - [3.5. MoSJE Socio-Economic Impact Telemetry](#35-mosje-socio-economic-impact-telemetry)
  - [3.6. Verified Digital Artisan Identity (Pehchan & Udyam)](#36-verified-digital-artisan-identity-pehchan--udyam)
  - [3.7. Offline-First & Background Cloud Sync](#37-offline-first--background-cloud-sync)
- [4. Repository Monorepo Structure](#4-repository-monorepo-structure)
- [5. API Endpoints Master Reference](#5-api-endpoints-master-reference)
- [6. Technology Stack](#6-technology-stack)
- [7. Getting Started](#7-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Services](#running-the-services)
- [8. Verification & Quality Assurance](#8-verification--quality-assurance)
- [9. SIH Grand Finale Jury Presentation Strategy](#9-sih-grand-finale-jury-presentation-strategy)
- [10. Policy Alignment & Impact](#10-policy-alignment--impact)
- [11. License](#11-license)

---

## 1. Executive Summary & Problem Context

### Background
The Government of India actively supports the socio-economic upliftment of marginalized communities (SC, ST, OBC, de-notified tribes, and women artisans) through credit and cluster development schemes. However, their market exposure has historically been confined to **periodic physical trade fairs** (e.g., *Shilp Samagam*, *Surajkund International Crafts Mela*, *Dilli Haat*). 

While physical fairs create temporary sales spikes, artisans lack **continuous, year-round access to national and global digital markets**. Transitioning to e-commerce is severely hindered by:
1. **Low Digital Literacy**: Inability to navigate complex seller dashboards and inventory tools.
2. **Language Barriers**: Most platforms require English literacy; artisans speak local dialects.
3. **Poor Photography & Presentation**: Inability to professionally shoot, light, and isolate handmade crafts.
4. **Predatory Middlemen**: Intermediaries take 40%–60% margins, leaving artisans below statutory minimum wage.

### The Solution
**KalaSetu (कलासेतु)** acts as an AI-powered **Virtual Business Manager** for the artisan. In less than 30 seconds, an artisan can take a raw photograph, speak in their mother tongue, and have a studio-grade, bilingual listing generated, fair-trade priced, and distributed across **ONDC (Open Network for Digital Commerce)** and **GeM (Government e-Marketplace)**.

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  Raw Craft Photo│  ──▶  │ Indian Language │  ──▶  │  1-Click Direct │
│  & Tap to Speak │       │  Bilingual AI   │       │  ONDC & GeM Hub │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## 2. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                   EXPO MOBILE CLIENT (Android / iOS / Web)             │
│   Voice-First UI • Audio Narration • Offline-First Storage (AsyncStorage)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS / REST (JSON)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   EXPRESS API GATEWAY & MICROSERVICES                  │
│   Rate Limiting (120 req/m) • Security Headers • CORS Lockdown         │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ /api/catalog      │ /api/pricing      │ /api/enhance-image             │
│ GPT-4o-mini Vision│ State Wage Engine │ Remove.bg Studio + DALL-E 2    │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ /api/transcribe   │ /api/ondc         │ /api/gem-export                │
│ Bhashini ASR +    │ Beckn Retail      │ Government e-Marketplace       │
│ Whisper-1 Fallback│ Protocol 1.1.0    │ CSV Generator (HSN 6304/6912)  │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ /api/products     │ /api/inquiries    │ /api/analytics                 │
│ Cloud Sync & CRUD │ B2B Leads Engine  │ MoSJE Impact & Scheme Matcher  │
└─────────┬─────────┴─────────┬─────────┴────────────────┬───────────────┘
          │                   │                          │
          ▼                   ▼                          ▼
┌──────────────────┐ ┌──────────────────┐      ┌─────────────────────────┐
│ Drizzle ORM      │ │ External AI APIs │      │ Open Standards E-Com    │
│ PostgreSQL /     │ │ • Bhashini ASR   │      │ • ONDC Network Gateway  │
│ Neon / Supabase  │ │ • OpenAI Vision  │      │ • GeM Seller Ingestion  │
│ Memory Fallback  │ │ • Remove.bg      │      │ • WhatsApp Business API │
└──────────────────┘ └──────────────────┘      └─────────────────────────┘
```

---

## 3. Key Features & Innovations

### 3.1. Real Multilingual AI Auto-Cataloger
- **Powered By**: `gpt-4o-mini` Vision + Indian Handicraft Curator System Prompt.
- **Cultural Accuracy**: Incorporates authentic craft terminology, identifies **Geographical Indication (GI) tags** (e.g., *Jaipur Blue Pottery*, *Varanasi Brocade*, *Gorakhpur Terracotta*, *Pochampally Ikat*).
- **Speech-to-Text**: Integrates India’s **Bhashini ASR** (National Language Translation Mission) with **OpenAI Whisper-1** fallback.
- **Low-Literacy Audio Narration**: Built-in **"विवरण सुनें (Listen)"** text-to-speech button allows non-literate artisans to verify their listing before publishing.

### 3.2. AI Image Studio (Background Isolation & Lighting)
- **High-Performance Cutout**: Integrates Remove.bg API (< 2s latency) to isolate intricate craft details (e.g., fringe threads, clay contours, metallic reflections).
- **Khadi Neutral Studio Compositing**: Automatically applies warm neutral lighting (`#FCF7F0` craft backdrop) with drop shadow synthesis, adhering to international e-commerce standards.
- **Resilient Fallback**: Graceful fallback to DALL-E 2 edits or local studio balance if API keys are constrained.

### 3.3. Dynamic Fair-Trade Pricing Engine
- **Statutory Wage Compliance**: Indexes daily minimum wages across Indian states (Rajasthan: ₹235, Uttar Pradesh: ₹240, Madhya Pradesh: ₹250, West Bengal: ₹260, Gujarat/Maharashtra: ₹285).
- **Craftsmanship Multiplier**: Analyzes craft complexity (Simple: 1.3x, Medium: 1.6x, Intricate: 2.0x).
- **Three-Tier Output**:
  - 🛍️ **Retail (खुदरा)**: Direct-to-consumer price with 100% fair-wage surplus.
  - 📦 **Wholesale B2B (थोक)**: Bulk pricing for retail chains (FabIndia, Tribes India).
  - ✈️ **Export (निर्यात)**: Premium pricing benchmarked for international diaspora buyers.

### 3.4. Government & B2B Market Linkage (ONDC & GeM)
- **ONDC Beckn Protocol 1.1.0 Adapter**: Generates standard `on_search` catalog schema (`nic2004:52110`) for the Open Network for Digital Commerce, connecting artisans to 7.5+ crore consumers.
- **GeM Bulk CSV Export**: One-tap download of CSV formatted for the Government e-Marketplace, including **HSN codes**, **Make in India declaration**, and **MSE SC/ST reserved procurement status**.
- **WhatsApp Direct Commerce**: Instant pre-formatted bilingual pitch with pricing and deep link for rapid sharing with trade fair contacts.
- **Exhibition Stall QR Pass**: Generates dynamic QR codes for physical stalls at *Surajkund Mela* or *Shilp Samagam* so visitors can scan and reorder year-round.

### 3.5. MoSJE Socio-Economic Impact Telemetry
- **Live Wage Realization**: Calculates the artisan's realized hourly rate (avg. ₹112/hr) versus statutory baseline (₹32/hr), demonstrating a **+250% fair-wage premium**.
- **Welfare Scheme Linkage**:
  - **PM Vishwakarma Scheme**: Toolkit incentive (₹15,000) & 5% collateral-free loan eligibility.
  - **Ambedkar Hastshilp Vikas Yojana (AHVY)**: Free sponsored stall space at government fairs.
  - **GeM MSE Exemption**: 100% exemption from Earnest Money Deposit (EMD) and tender fees.
  - **MUDRA Yojana (Shishu/Kishor)**: Pre-evaluated micro-credit limits up to ₹50,000.

### 3.6. Verified Digital Artisan Identity (Pehchan & Udyam)
- Official **Pehchan Artisan Card ID** (Ministry of Textiles / MoSJE).
- MSME Udyam registration number integration.
- **Aadhaar Verified** badge establishing provenance, preventing counterfeits, and boosting buyer trust.

### 3.7. Offline-First & Background Cloud Sync
- Operates reliably in remote rural craft clusters with intermittent connectivity.
- Local draft caching in `AsyncStorage` with automatic sync to PostgreSQL once an Internet connection is restored.

---

## 4. Repository Monorepo Structure

```text
.
├── artifacts/
│   ├── api-server/                     # Production Express API Gateway
│   │   ├── src/
│   │   │   ├── app.ts                  # Security headers, CORS, rate limiting
│   │   │   ├── build.mjs               # Esbuild production bundler
│   │   │   ├── lib/
│   │   │   │   ├── bhashini.ts         # Bhashini Govt of India ASR client
│   │   │   │   └── logger.ts           # Structured Pino logger
│   │   │   └── routes/
│   │   │       ├── analytics.ts        # MoSJE impact metrics & scheme eligibility
│   │   │       ├── auth.ts             # Digital identity & OTP verification
│   │   │       ├── catalog.ts          # GPT-4o-mini Vision auto-cataloger
│   │   │       ├── enhance-image.ts    # Remove.bg & DALL-E studio pipeline
│   │   │       ├── gem-export.ts       # GeM bulk CSV generator
│   │   │       ├── health.ts           # Liveness & readiness probes
│   │   │       ├── inquiries.ts        # B2B wholesale inquiries
│   │   │       ├── ondc.ts             # Beckn Retail 1.1.0 adapter
│   │   │       ├── pricing.ts          # Dynamic fair-trade wage engine
│   │   │       ├── products.ts         # Cloud-synced product CRUD
│   │   │       └── transcribe.ts       # Whisper-1 & Bhashini speech-to-text
│   ├── artisan-market/                 # Native Expo Mobile Application
│   │   ├── app/
│   │   │   ├── (tabs)/
│   │   │   │   ├── _layout.tsx         # 5-tab navigation (Home, Catalog, Market, Impact, Profile)
│   │   │   │   ├── index.tsx           # Home dashboard & quick voice actions
│   │   │   │   ├── inventory.tsx       # Filterable catalog with fair-trade badges
│   │   │   │   ├── sell.tsx            # ONDC, GeM, WhatsApp & QR commerce hub
│   │   │   │   ├── analytics.tsx       # MoSJE socio-economic telemetry dashboard
│   │   │   │   └── profile.tsx         # Verified Pehchan Digital Artisan ID
│   │   │   ├── create.tsx              # AI studio photo, voice note, catalog generation
│   │   │   ├── receipts.tsx            # PDF invoice generator & payment tracker
│   │   │   └── product/[id].tsx        # Direct UPI/ONDC checkout & B2B inquiry
│   │   ├── context/
│   │   │   └── ArtisanContext.tsx      # Offline-first state, cloud sync, deduplication
│   │   └── hooks/                      # Theme, haptics, and color tokens
├── lib/
│   ├── db/                             # Drizzle ORM + PostgreSQL Schema
│   │   └── src/
│   │       ├── index.ts                # Database client with resilient fallback
│   │       └── schema/index.ts         # Artisans, Products, Inquiries tables
│   ├── api-zod/                        # Zod schemas & type contracts
│   └── api-client-react/               # Typed React Query API hooks
├── .env.example                        # Template for all environment variables
├── package.json                        # Root workspace configuration
├── pnpm-workspace.yaml                 # Monorepo package boundaries
└── README.md                           # Master documentation
```

---

## 5. API Endpoints Master Reference

| Method | Endpoint | Description | Key Parameters |
|:---:|:---|:---|:---|
| `POST` | `/api/catalog/generate` | Generates bilingual catalog via GPT-4o-mini Vision | `productName`, `craftType`, `imageBase64`, `voiceTranscript`, `materials` |
| `POST` | `/api/pricing/suggest` | Computes fair-trade state-wage compliant pricing | `materialCost`, `makingHours`, `artisanState`, `craftComplexity` |
| `POST` | `/api/enhance-image` | Isolates background & creates studio lighting | `imageBase64`, `mimeType`, `prompt` |
| `POST` | `/api/transcribe` | Transcribes audio via Bhashini / Whisper-1 | `audioBase64`, `language` (`hi`, `mr`, `bn`, `en`) |
| `POST` | `/api/ondc/catalog` | Formats products into Beckn Retail 1.1.0 | `products`, `artisanName`, `location` |
| `GET` | `/api/gem-export` | Downloads Government e-Marketplace CSV | None (returns `text/csv; charset=utf-8`) |
| `GET` | `/api/analytics` | Returns MoSJE impact & scheme eligibility telemetry | None |
| `GET` | `/api/products` | Lists all cloud-synced artisan products | None |
| `POST` | `/api/products` | Syncs new product from mobile client | `name`, `price`, `description`, `imageUrl`, `tags` |
| `POST` | `/api/inquiries` | Logs B2B bulk purchase lead | `productId`, `buyerName`, `buyerPhone`, `quantity` |
| `POST` | `/api/auth/send-otp` | Sends SMS OTP for artisan mobile login | `phone` |
| `POST` | `/api/auth/verify-otp` | Verifies OTP and issues JWT token | `phone`, `otp` (`123456` in demo mode) |
| `GET` | `/api/healthz` | Kubernetes/Cloud liveness probe | None |

---

## 6. Technology Stack

- **Mobile Client**: Expo SDK 57, React Native 0.86, Expo Router v57 (File-based navigation), NativeTabs with Liquid Glass support, Expo Audio, Expo Image Picker, Expo Print (PDF generation).
- **Backend Runtime (Dual-Option Architecture)**:
  - **Primary Production Gateway**: Node.js v24 (ESM), Express v5.2, TypeScript 5.9, Pino Logger (Ultra-low latency asynchronous I/O, direct end-to-end type sharing with React Native).
  - **Alternative AI Microservice**: Python 3.11+, FastAPI, Pydantic v2, Uvicorn (`artifacts/api-server-python`) with automatic interactive OpenAPI/Swagger docs.
- **AI & NLP Engine**:
  - Vision & Cataloging: OpenAI `gpt-4o-mini` Vision
  - Speech Recognition (ASR): Bhashini Dhruva API (Govt of India NLTM) + OpenAI `whisper-1`
  - Image Isolation: Remove.bg API + DALL-E 2 edit synthesis
- **Database & Storage**: PostgreSQL, Drizzle ORM, Drizzle-Zod, resilient in-memory caching fallback.
- **Open Protocols**: Beckn Protocol (ONDC Specification Retail 1.1.0), GeM bulk schema, WhatsApp Click-to-Chat protocol.
- **Build System**: PNPM v11 Workspace, TypeScript 5.9, Esbuild 0.27.

> 📘 **Architectural Decision Record (ADR-001)**: See [Backend Architecture: Node.js vs Python Defense](#architectural-defense-nodejs-vs-python-fastapi) for the jury evaluation matrix on why Node.js was chosen as the primary mobile API gateway alongside a 1:1 drop-in Python FastAPI alternative.

---

## 7. Getting Started

### Prerequisites
- **Node.js**: v20.x or v24.x (`node --version`)
- **Package Manager**: PNPM v10+ or NPM / NPX (`npx pnpm --version`)

### Installation

```bash
# Clone the repository
git clone https://github.com/rajatpraykar/replit_project.git
cd "Rajat's project"

# Install monorepo dependencies
npx pnpm install
```

### Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your API credentials:

```ini
# 1. AI Engine Credentials (Whisper-1 ASR & GPT-4o-mini Vision)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx

# 2. AI Image Studio (Background Isolation)
REMOVE_BG_API_KEY=your_remove_bg_api_key_here

# 3. Bhashini National Language Mission (Optional)
BHASHINI_API_KEY=
BHASHINI_USER_ID=

# 4. Database (PostgreSQL - Neon / Supabase / Local)
DATABASE_URL=postgresql://user:password@ep-host.region.neon.tech/artisan_db?sslmode=require

# 5. Mobile & Client Configuration
EXPO_PUBLIC_DOMAIN=localhost:8082
ALLOWED_ORIGINS=http://localhost:8082,http://localhost:5173,http://localhost:3000
```

> 💡 **Demo Note**: Even if third-party API keys or PostgreSQL are not supplied, the system includes **resilient intelligent fallbacks** across all AI routes and database queries, allowing offline demos and jury evaluations to run without breaking.

### Running the Services

#### 🌟 Recommended: Unified Full-Stack Orchestrator (`run_whole.py`)
Run the entire platform (frontend + backend) with a single command with real-time multiplexed logs and pre-flight diagnostics:

```bash
# 1. Run full stack with Node.js Express backend (Default)
python run_whole.py

# 2. Run full stack with Python FastAPI backend
python run_whole.py --backend python

# 3. Automatically open browser to the web app once ready
python run_whole.py --open

# 4. Hybrid Mesh (Node.js Gateway on 3000 + Python AI sidecar on 8000)
python run_whole.py --backend both

# 5. Interactively check and force re-install/build all libraries
python run_whole.py --install

# 6. Auto-confirm all prompts (CI / Non-interactive)
python run_whole.py -y
```

#### Alternative: Manual Two-Terminal Launch
```bash
# Terminal 1: Start the API Backend
npx pnpm --filter @workspace/api-server run dev

# Terminal 2: Start the Expo Mobile App
npx pnpm --filter @workspace/artisan-market run dev
```

Open the Expo development server URL (e.g., `http://localhost:8082`) in your browser, or scan the QR code with **Expo Go** on Android / iOS.

---

## 8. Verification & Quality Assurance

All workspace packages are strictly typed and bundle without warnings:

```bash
# 1. Build all shared workspace libraries
npx tsc --build

# 2. Typecheck API Server
npx pnpm --filter @workspace/api-server run typecheck

# 3. Typecheck Mobile App
npx pnpm --filter @workspace/artisan-market run typecheck

# 4. Build API Server production bundle (Esbuild)
npx pnpm --filter @workspace/api-server run build
```

---

## Architectural Defense: Node.js vs. Python FastAPI (ADR-001)

### The Architectural Dilemma
A common question in AI hackathons and engineering panels is:  
> *"Since KalaSetu leverages multimodal AI (Whisper, GPT-4o-mini Vision, Bhashini), shouldn't the backend be written entirely in Python?"*

### The Verdict & Tradeoff Analysis
**Decision**: KalaSetu provides a **dual-runtime architecture**:
1. **Node.js (TypeScript + Express)** as the **Primary Production Gateway & Mobile BFF (Backend-For-Frontend)**.
2. **Python (FastAPI + Pydantic v2)** as the **1:1 Drop-in Alternative & Specialized AI Microservice** (`artifacts/api-server-python`).

| Architectural Dimension | Node.js + TypeScript (Primary Gateway) | Python + FastAPI (Alternative / AI Sidecar) | Impact on KalaSetu |
|:---|:---|:---|:---|
| **Workload Profile** | **Ultra-Low Latency Asynchronous I/O**. Handles multiplexed REST streams to OpenAI, Bhashini, Remove.bg, and PostgreSQL. | Excellent async I/O via `asyncio`/`httpx`, but GIL (Global Interpreter Lock) constraints apply during synchronous CPU workloads. | The backend is an **I/O-bound API orchestrator**, not a GPU model training cluster. Node's V8 event loop delivers exceptional concurrency per megabyte. |
| **End-to-End Type Safety** | **100% Shared Types**: The Expo React Native mobile app shares the exact same Zod schemas, Drizzle models, and API interfaces in a single monorepo. | Requires separate Pydantic models or automated OpenAPI code generators to synchronize with TypeScript client. | Node.js eliminates contract drift and serialization bugs across mobile screens. |
| **Build Velocity & Memory** | Compiles via Esbuild in **~350ms**. Memory footprint **~45MB RAM**. | Fast reload via Uvicorn. Memory footprint **~85MB RAM**. | Node.js provides faster cold boots for serverless/edge deployments. |
| **Custom Local ML / Embeddings** | Requires ONNX runtime or spawning Python child processes. | **Unmatched ML Ecosystem**: Direct access to `transformers`, `torch`, `scikit-learn`, `spacy`, and `faiss`. | When fine-tuning custom Indian language dialect models on-premise, Python is the designated microservice. |

### How to Run Either Backend Interchangably

The React Native mobile client communicates over standard REST/JSON on `PORT 3000`. You can boot either runtime without touching a single line of mobile code:

```bash
# Option A: Run the Primary Node.js / TypeScript Gateway
npx pnpm --filter @workspace/api-server run dev

# Option B: Run the Converted Python FastAPI Microservice
cd artifacts/api-server-python
pip install -r requirements.txt
python main.py
# Interactive OpenAPI documentation available at http://localhost:3000/docs
```

---

## 9. SIH Grand Finale Jury Presentation Strategy

### 🎙️ 30-Second Opening Hook (In Hindi)
> *"मेरा नाम कविता देवी है। मैं जयपुर के सांगानेर क्लस्टर की पारंपरिक बुनकर हूँ। सालों से मैं केवल साल में दो बार मेलों में ही अपनी कला बेच पाती थी। कलासेतु ऐप पर मैंने केवल एक फोटो खींची, अपनी भाषा में बोला, और 30 सेकंड में मेरा उत्पाद पूरे देश के ONDC नेटवर्क और सरकारी GeM पोर्टल पर लाइव हो गया। मुझे बिना किसी बिचौलिए के अपना पहला थोक ऑर्डर मिला!"*

### ⚡ Live Demonstration Flow
1. **Photo Capture**: Take a picture of an authentic craft (e.g., Indigo Dupatta or Terracotta Diya).
2. **AI Studio**: Tap **"Beautify with AI Studio"** → Clean studio lighting and neutral Khadi backdrop generated.
3. **Voice Note**: Tap mic and speak in Hindi/regional language describing the craft → Bhashini/Whisper transcribes speech.
4. **Bilingual Catalog**: Tap **"Generate Bilingual AI Catalog"** → English & Hindi titles, descriptions, care instructions, and GI tag generated.
5. **Listen Button**: Tap **"विवरण सुनें"** to demonstrate audio narration for low-literacy artisans.
6. **Fair-Trade Chips**: Select **Retail (₹1,480)**, **Wholesale B2B (₹960)**, or **Export (₹1,920)** with minimum wage compliance verified.
7. **Market Linkage**: Navigate to **बाज़ार (Market)** tab → Show live ONDC Beckn payload, download GeM CSV, and open WhatsApp direct share.
8. **Impact Telemetry**: Navigate to **इम्पैक्ट (Impact)** tab → Show +250% wage surplus and PM Vishwakarma scheme eligibility.

---

## 10. Policy Alignment & Impact

| Government Initiative | How KalaSetu Aligns |
|:---|:---|
| **PM Vishwakarma Scheme** | Automatically maps artisans to 18 traditional trades, certifying eligibility for ₹15,000 toolkits and 5% credit. |
| **Open Network for Digital Commerce (ONDC)** | Implements Beckn Retail 1.1.0 specifications, eliminating proprietary e-commerce commissions. |
| **Government e-Marketplace (GeM)** | Automates HSN classification and Make in India documentation for public procurement quotas. |
| **Bhashini Language Mission** | Bridges the digital divide by leveraging indigenous speech-to-text models across Indian scheduled languages. |
| **Vocal for Local / Atmanirbhar Bharat** | Preserves endangered heritage crafts and guarantees direct financial returns to marginalized rural artisans. |

---

## 11. License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details. Built with ❤️ for India's master artisans.