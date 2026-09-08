# Artisan Market

Artisan Market is a cross-platform AI business manager that helps independent artisans create bilingual product listings, improve product photos, transcribe voice notes, and sell physical goods through Shopify.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server on the injected `PORT`
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/artisan-market run dev` — run the Expo mobile app
- Required secret: `OPENAI_API_KEY` — configure through Replit Secrets
- Required integration: Shopify Store — configure through Replit Integrations

## Stack

- pnpm workspaces, Node.js 24, TypeScript 6 in the mobile artifact
- API: Express 5
- Mobile: Expo 57, React Native, Expo Router
- State: AsyncStorage for local catalog and receipt intent state
- AI: OpenAI audio transcription and image editing through the API server
- Commerce: Shopify Storefront API and hosted checkout
- Build: esbuild for the API bundle, Metro for Expo

## Where things live

- `artifacts/artisan-market/app/` — Expo Router screens
- `artifacts/artisan-market/context/ArtisanContext.tsx` — catalog, language, Shopify mapping, and receipt state
- `artifacts/artisan-market/constants/colors.ts` — artisan visual theme
- `artifacts/api-server/src/routes/transcribe.ts` — voice transcription boundary
- `artifacts/api-server/src/routes/enhance-image.ts` — AI image beautification boundary
- `artifacts/api-server/src/routes/shopify.ts` — Shopify catalog and checkout boundary
- `README.md` — GitHub-style setup and product documentation
- `docs/API.md` — API request/response reference

## Architecture decisions

- OpenAI credentials are server-only; the Expo app calls project API routes instead of third-party APIs directly.
- Shopify owns physical-product checkout and payment; the app never collects card data.
- AsyncStorage is used for first-build local catalog persistence and offline drafting.
- A checkout URL is not payment confirmation, so local receipt records remain pending until order sync is added.

## Product

- AI-assisted product photo beautification
- Voice-to-text product descriptions
- English/Hindi catalog content with app language selection
- Suggested pricing and local catalog management
- Shopify hosted checkout for physical artisan goods
- PDF receipt generation and sharing

## User preferences

- Keep the experience accessible to marginalized artisans and friendly to low-technical-literacy users.
- Prefer English/Hindi clarity and preserve the warm artisan visual language.

## Gotchas

- Do not commit or paste API keys. Rotate any credential that appears in chat or source control.
- Do not treat a Shopify checkout-start record as a confirmed paid order.
- Use the managed artifact workflows; do not create duplicate Expo or API workflows.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
