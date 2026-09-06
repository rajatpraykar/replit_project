import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { ImageSourcePropType } from 'react-native';

export type Product = {
  id: string;
  name: string;
  craft: string;
  price: number;
  status: 'Published' | 'Draft';
  description: string;
  hindiDescription: string;
  image: ImageSourcePropType;
  imageUri?: string;
  material: string;
  createdAt: string;
  shopifyVariantId?: string;
};

export type Receipt = {
  id: string;
  productName: string;
  amount: number;
  status: 'Payment started' | 'Paid';
  createdAt: string;
  checkoutUrl?: string;
};

type ArtisanContextValue = {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<Product>;
  getProduct: (id: string) => Product | undefined;
  receipts: Receipt[];
  addReceipt: (receipt: Omit<Receipt, 'id' | 'createdAt'>) => Promise<void>;
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => Promise<void>;
};

export type AppLanguage = 'en' | 'hi' | 'mr' | 'bn';

const textile = require('@/assets/images/indigo-textile.jpg') as ImageSourcePropType;
const diya = require('@/assets/images/terracotta-diya.jpg') as ImageSourcePropType;

const starterProducts: Product[] = [
  {
    id: 'textile-1',
    name: 'Indigo Handwoven Dupatta',
    craft: 'Handloom textile',
    price: 1480,
    status: 'Published',
    description: 'A soft, naturally dyed dupatta woven by hand in small batches. Each piece carries the gentle irregularity and story of the loom.',
    hindiDescription: 'छोटे बैच में हाथ से बुना हुआ नरम दुपट्टा। हर टुकड़े में करघे की खूबसूरत पहचान और कारीगर की कहानी है।',
    image: textile,
    material: 'Cotton · Natural indigo',
    createdAt: '2 days ago',
  },
  {
    id: 'diya-1',
    name: 'Carved Terracotta Diya',
    craft: 'Terracotta craft',
    price: 360,
    status: 'Published',
    description: 'A hand-shaped terracotta diya with delicate carved details, made for warm evenings and festive corners.',
    hindiDescription: 'नाज़ुक नक्काशी वाला हाथ से बनाया हुआ मिट्टी का दीया, त्योहार और रोज़मर्रा की रोशनी के लिए।',
    image: diya,
    material: 'Terracotta clay',
    createdAt: '6 days ago',
  },
];

const ArtisanContext = createContext<ArtisanContextValue | null>(null);

export function ArtisanProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>(starterProducts);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [language, setLanguageState] = useState<AppLanguage>('en');

  useEffect(() => {
    AsyncStorage.getItem('artisan-market-products').then((stored) => {
      if (!stored) return;
      try {
        const saved = JSON.parse(stored) as Product[];
        setProducts([...saved, ...starterProducts]);
      } catch {
        setProducts(starterProducts);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('artisan-market-receipts').then((stored) => {
      if (!stored) return;
      try {
        setReceipts(JSON.parse(stored) as Receipt[]);
      } catch {
        setReceipts([]);
      }
    });
  }, []);

  useEffect(() => {
    const baseUrl = process.env.EXPO_PUBLIC_DOMAIN ? `https://${process.env.EXPO_PUBLIC_DOMAIN}` : '';
    fetch(`${baseUrl}/api/shopify/products`)
      .then((response) => response.ok ? response.json() as Promise<Array<{ title: string; variants: { nodes: Array<{ id: string; availableForSale: boolean }> } }>> : [])
      .then((shopifyProducts) => {
        if (!shopifyProducts.length) return;
        setProducts((current) => current.map((product) => {
          const match = shopifyProducts.find((item) => item.title.toLowerCase() === product.name.toLowerCase() || item.title.toLowerCase().includes(product.name.toLowerCase()));
          return { ...product, shopifyVariantId: match?.variants.nodes.find((variant) => variant.availableForSale)?.id };
        }));
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('artisan-market-language').then((stored) => {
      if (stored === 'en' || stored === 'hi' || stored === 'mr' || stored === 'bn') {
        setLanguageState(stored);
      }
    });
  }, []);

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    const created: Product = {
      ...product,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: 'Just now',
    };
    const saved = [created, ...products.filter((item) => !item.id.includes('-'))];
    setProducts([created, ...products]);
    await AsyncStorage.setItem('artisan-market-products', JSON.stringify(saved));
    return created;
  };

  const setLanguage = async (nextLanguage: AppLanguage) => {
    setLanguageState(nextLanguage);
    await AsyncStorage.setItem('artisan-market-language', nextLanguage);
  };

  const addReceipt = async (receipt: Omit<Receipt, 'id' | 'createdAt'>) => {
    const created: Receipt = { ...receipt, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: 'Just now' };
    const next = [created, ...receipts];
    setReceipts(next);
    await AsyncStorage.setItem('artisan-market-receipts', JSON.stringify(next));
  };

  const value = useMemo(
    () => ({
      products,
      addProduct,
      getProduct: (id: string) => products.find((product) => product.id === id),
      receipts,
      addReceipt,
      language,
      setLanguage,
    }),
    [language, products, receipts],
  );

  return <ArtisanContext.Provider value={value}>{children}</ArtisanContext.Provider>;
}

export function useArtisan() {
  const context = useContext(ArtisanContext);
  if (!context) throw new Error('useArtisan must be used inside ArtisanProvider');
  return context;
}