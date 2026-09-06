type ShopifyConnectionSettings = {
  shop_domain?: string;
  storefront_access_token?: string;
};

type ShopifyStorefrontConfig = {
  shopDomain: string;
  storefrontAccessToken: string;
};

let cachedConfig: { value: ShopifyStorefrontConfig; expiresAt: number } | undefined;

async function getShopifyStorefrontConfig(forceRefresh = false): Promise<ShopifyStorefrontConfig> {
  if (cachedConfig && !forceRefresh && cachedConfig.expiresAt > Date.now()) return cachedConfig.value;
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const token = process.env.REPL_IDENTITY ? `repl ${process.env.REPL_IDENTITY}` : process.env.WEB_REPL_RENEWAL ? `depl ${process.env.WEB_REPL_RENEWAL}` : null;
  if (!hostname || !token) throw new Error('Missing Replit connector environment variables');
  const url = new URL(`${hostname.startsWith('localhost') ? 'http' : 'https'}://${hostname}/api/v2/connection`);
  url.searchParams.set('include_secrets', 'true');
  url.searchParams.set('connector_names', 'shopify-store');
  url.searchParams.set('refresh_policy', 'none');
  const response = await fetch(url, { headers: { Accept: 'application/json', X_REPLIT_TOKEN: token }, signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Failed to fetch Shopify connection: ${response.status}`);
  const data = (await response.json()) as { items?: Array<{ settings?: ShopifyConnectionSettings }> };
  const settings = data.items?.[0]?.settings;
  if (!settings?.shop_domain || !settings.storefront_access_token) throw new Error('Shopify Store integration is missing Storefront settings');
  cachedConfig = { value: { shopDomain: settings.shop_domain, storefrontAccessToken: settings.storefront_access_token }, expiresAt: Date.now() + 60_000 };
  return cachedConfig.value;
}

export async function shopifyStorefrontRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const request = async (forceRefresh = false) => {
    const config = await getShopifyStorefrontConfig(forceRefresh);
    const response = await fetch(`https://${config.shopDomain}/api/2026-04/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(10000),
    });
    const json = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };
    if ((response.status === 401 || response.status === 403) && !forceRefresh) return request(true);
    if (!response.ok || json.errors?.length) throw new Error(`Shopify Storefront API error: ${JSON.stringify(json.errors ?? json)}`);
    return json.data as T;
  };
  return request();
}