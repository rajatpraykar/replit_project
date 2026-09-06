import { Router, type IRouter } from 'express';
import { shopifyStorefrontRequest } from '../lib/shopifyStorefrontClient';

const router: IRouter = Router();

router.get('/shopify/products', async (_req, res) => {
  try {
    const data = await shopifyStorefrontRequest<{
      products: { nodes: Array<{ title: string; variants: { nodes: Array<{ id: string; availableForSale: boolean }> } }> };
    }>(`query Products { products(first: 50) { nodes { title variants(first: 5) { nodes { id availableForSale } } } } }`);
    res.json(data.products.nodes);
  } catch (error) {
    res.status(502).json({ message: error instanceof Error ? error.message : 'Shopify catalog unavailable' });
  }
});

router.post('/shopify/checkout', async (req, res) => {
  const { variantId, quantity = 1 } = req.body as { variantId?: string; quantity?: number };
  if (!variantId) {
    res.status(400).json({ message: 'A Shopify product variant is required.' });
    return;
  }
  try {
    const data = await shopifyStorefrontRequest<{
      cartCreate: { cart: { id: string; checkoutUrl: string } | null; userErrors: Array<{ message: string }> };
    }>(`mutation CartCreate($variantId: ID!, $quantity: Int!) { cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: $quantity }] }) { cart { id checkoutUrl } userErrors { message } } }`, { variantId, quantity });
    const error = data.cartCreate.userErrors[0];
    if (error || !data.cartCreate.cart?.checkoutUrl) {
      res.status(502).json({ message: error?.message ?? 'Shopify did not return a checkout URL.' });
      return;
    }
    res.json({ cartId: data.cartCreate.cart.id, checkoutUrl: data.cartCreate.cart.checkoutUrl });
  } catch (error) {
    res.status(502).json({ message: error instanceof Error ? error.message : 'Checkout unavailable' });
  }
});

export default router;