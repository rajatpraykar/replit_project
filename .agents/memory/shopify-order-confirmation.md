---
name: Shopify order confirmation
description: Shopify hosted checkout returns a checkout URL, but the mobile app cannot verify payment completion from that response alone.
---

Shopify should remain the system of record for payment status and order identity. Creating a local receipt when a cart is created is only a checkout intent, not proof of payment; verified receipts need an order sync or authenticated confirmation boundary.

**Why:** The Storefront cart flow intentionally hands payment to Shopify-hosted checkout, and connector guidance does not provision app webhooks in v1.

**How to apply:** Keep local records visibly pending until Shopify confirms the order, and never present a checkout-start record as a paid receipt.