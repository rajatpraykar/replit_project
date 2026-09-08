# Contributing

Thanks for helping improve Artisan Market.

## Development setup

```bash
pnpm install
pnpm run typecheck
```

Run the API and Expo services through the managed workflows or with the commands in [README.md](./README.md).

## Before opening a pull request

```bash
pnpm run typecheck
pnpm --filter @workspace/artisan-market run typecheck
pnpm --filter @workspace/api-server run typecheck
```

For UI changes, verify the relevant mobile route in Expo preview. For API changes, exercise the changed route with a safe request that does not print credentials or user media.

## Contribution rules

- Keep OpenAI and Shopify credentials server-side.
- Do not commit `.env` files, tokens, customer data, or captured audio.
- Treat Shopify as the system of record for products, inventory, carts, and payment.
- Do not label a checkout-start record as a paid receipt.
- Preserve the artisan-first, bilingual, accessible UI direction.
- Prefer focused changes over broad rewrites.

## Commit style

Use short, imperative commit messages:

```text
feat: add voice transcription to listing creator
fix: keep pending checkout status visible
docs: explain Shopify checkout boundary
```