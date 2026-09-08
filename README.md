# Artisan Market

> A cross-platform AI business manager for independent artisans.

Artisan Market helps makers turn photos, voice notes, and simple product details into polished bilingual catalog listings. It combines a native Expo mobile app with an Express API that keeps AI credentials server-side and uses Shopify for physical-goods checkout.

## What it does

- Capture product photos with the camera or gallery.
- Beautify a real product photo with OpenAI image editing.
- Record Hindi, English, Marathi, or Bengali voice notes.
- Transcribe voice notes into listing descriptions.
- Create English and Hindi product copy.
- Suggest pricing and maintain a local artisan catalog.
- Match catalog products to Shopify variants for hosted checkout.
- Store checkout records and generate shareable PDF receipt files.
- Switch the primary app experience between English and Hindi.

## Repository layout

```text
.
├── artifacts/
│   ├── artisan-market/       # Expo mobile app
│   │   ├── app/              # Expo Router screens
│   │   ├── context/          # Catalog, language, and receipt state
│   │   ├── constants/        # Brand and theme tokens
│   │   └── assets/           # App imagery and icons
│   ├── api-server/           # Express API and AI/Shopify boundaries
│   │   └── src/
│   │       ├── routes/       # health, transcription, image, Shopify routes
│   │       └── lib/          # server-only integrations
│   └── mockup-sandbox/       # Design preview artifact
├── lib/                      # Shared workspace libraries
├── scripts/                  # Workspace tooling
├── docs/
│   ├── ARCHITECTURE.md
│   └── API.md
├── .env.example
├── CONTRIBUTING.md
└── package.json
```

## Requirements

- Node.js 24+
- pnpm 10+
- An OpenAI API key for transcription and image enhancement
- A connected Shopify Store integration for physical-product checkout

## Setup

```bash
pnpm install
```

### Environment

Copy the example file for local reference:

```bash
cp .env.example .env
```

Never commit real credentials. In Replit, add `OPENAI_API_KEY` through the Secrets UI. Shopify is connected through the Replit Shopify integration; do not paste Shopify tokens into environment files.

The Expo workflow injects `EXPO_PUBLIC_DOMAIN` automatically. When running outside Replit, set it to the public origin that serves the API:

```bash
EXPO_PUBLIC_DOMAIN=your-api-host.example.com
```

## Run the project

Use the managed workflows in Replit, or run the services separately:

```bash
# API server
pnpm --filter @workspace/api-server run dev

# Expo mobile app
pnpm --filter @workspace/artisan-market run dev
```

The API listens on the injected `PORT` value. The Expo project can run in Expo Go, web preview, or a development build.

## Common commands

```bash
pnpm run typecheck       # Typecheck libraries and artifacts
pnpm run build           # Typecheck and build all packages that expose a build script
pnpm --filter @workspace/artisan-market run typecheck
pnpm --filter @workspace/api-server run typecheck
```

## AI flow

The mobile app never sends an OpenAI key directly to the client:

```text
Expo app
  ├── POST /api/transcribe
  │     └── OpenAI audio transcription API
  └── POST /api/enhance-image
        └── OpenAI image edits API
```

The image beautifier keeps the original product recognizable, improves lighting and sharpness, and creates a cleaner studio-style presentation. It requires a user-selected image from Camera or Gallery.

## Shopify flow

Shopify is the system of record for physical products, variants, inventory, checkout, and payment. The API server:

1. Reads the connected Storefront settings through the Replit connector boundary.
2. Matches local catalog products to active Shopify variants.
3. Creates a Storefront cart.
4. Returns Shopify's hosted checkout URL.
5. Opens checkout from the mobile app.

The app does not collect card details or implement custom payment processing.

## Current limitations

- A Shopify checkout URL confirms checkout creation, not payment completion. Local receipt records remain visibly pending until an order-sync boundary is added.
- Local products need a matching Shopify variant before the Buy button can create checkout.
- The primary English/Hindi language switch is implemented across the main home, catalog, tabs, and voice surfaces; some secondary screens still contain English copy.
- OpenAI usage is billed to the configured OpenAI account.

## Security notes

- Do not commit `.env`, API keys, Shopify tokens, audio recordings, or private customer data.
- Keep OpenAI and Shopify calls inside the API server.
- Revoke any credential that is pasted into chat, issues, pull requests, or logs.
- Use Shopify-hosted checkout instead of handling payment information in this repository.

## License

MIT. See [LICENSE](./LICENSE).