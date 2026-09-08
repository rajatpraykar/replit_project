# Architecture

## Overview

Artisan Market is a two-service mobile product:

- **Expo client**: native/web UI, camera and microphone permissions, local catalog persistence, navigation, and checkout handoff.
- **Express API**: server-only OpenAI and Shopify calls. It is the only layer allowed to read `OPENAI_API_KEY` or connector settings.

```text
┌─────────────────────┐       JSON        ┌─────────────────────┐
│ Expo / React Native  │ ───────────────▶ │ Express API         │
│ artisan-market       │                  │ api-server          │
└──────────┬──────────┘                  └──────┬──────────────┘
           │                                     │
           │ AsyncStorage                        ├── OpenAI
           │                                     │   ├── audio transcription
           │                                     │   └── image edits
           │                                     │
           │                                     └── Shopify Storefront API
           │                                         └── cart + hosted checkout
           ▼
     Local catalog,
     language, and
     receipt state
```

## Mobile state

`ArtisanContext` owns:

- Local product catalog
- Product-to-Shopify variant matching
- App language preference
- Checkout receipt intents

AsyncStorage is intentional for the first mobile build. It keeps the app usable offline for catalog drafting, while Shopify remains authoritative for ecommerce data.

## AI boundaries

The client sends base64-encoded media over the project API:

- `POST /api/transcribe`
- `POST /api/enhance-image`

The API converts the payload to multipart form data and forwards it to OpenAI. Keys are read only from server environment secrets.

## Checkout boundary

The client sends a Shopify ProductVariant ID to `POST /api/shopify/checkout`. The API creates a Shopify Storefront cart and returns `checkoutUrl`. Payment is completed on Shopify, not inside the app.

## Receipt boundary

The app currently stores a local checkout-start record so users can return to the receipt screen. This is not proof of payment. A future order-sync boundary should replace the pending record with a verified Shopify order before labeling a receipt as paid.