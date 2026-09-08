# API reference

All routes are mounted under `/api`.

## Health

```http
GET /api/healthz
```

Returns:

```json
{ "status": "ok" }
```

## Transcription

```http
POST /api/transcribe
Content-Type: application/json
```

Request:

```json
{
  "audioBase64": "<base64 audio>",
  "mimeType": "audio/m4a",
  "language": "hi"
}
```

Response:

```json
{ "text": "हाथ से बुना हुआ नीला दुपट्टा..." }
```

## Image enhancement

```http
POST /api/enhance-image
Content-Type: application/json
```

Request:

```json
{
  "imageBase64": "<base64 image>",
  "mimeType": "image/jpeg"
}
```

Response:

```json
{
  "imageBase64": "<base64 png>",
  "mimeType": "image/png"
}
```

## Shopify products

```http
GET /api/shopify/products
```

Returns Shopify product titles and available variant IDs used to match local catalog items.

## Shopify checkout

```http
POST /api/shopify/checkout
Content-Type: application/json
```

Request:

```json
{
  "variantId": "gid://shopify/ProductVariant/...",
  "quantity": 1
}
```

Response:

```json
{
  "cartId": "gid://shopify/Cart/...",
  "checkoutUrl": "https://..."
}
```