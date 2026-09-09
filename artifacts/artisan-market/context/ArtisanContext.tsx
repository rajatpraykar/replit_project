import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { getApiBaseUrl } from '@/constants/api';

export type Product = {
  id: string;
  name: string;
  nameHindi?: string;
  craft: string;
  price: number;
  b2bPrice?: number;
  exportPrice?: number;
  status: 'Published' | 'Draft';
  description: string;
  hindiDescription: string;
  image: ImageSourcePropType;
  imageUri?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  material: string;
  tags?: string[];
  geoIndication?: string;
  views?: number;
  inquiries?: number;
  pendingSync?: boolean;
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
  refreshProducts: () => Promise<void>;
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
    nameHindi: 'हाथ से बुना हुआ पारंपरिक नील दुपट्टा',
    craft: 'Handloom textile',
    price: 1480,
    b2bPrice: 960,
    exportPrice: 1920,
    status: 'Published',
    description: 'A soft, naturally dyed dupatta woven by hand in small batches. Each piece carries the gentle irregularity and story of the loom.',
    hindiDescription: 'छोटे बैच में हाथ से बुना हुआ नरम दुपट्टा। हर टुकड़े में करघे की खूबसूरत पहचान और कारीगर की कहानी है।',
    image: textile,
    material: 'Cotton · Natural indigo',
    tags: ['#Handloom', '#NaturalIndigo', '#MoSJEArtisan'],
    geoIndication: 'Rajasthan Handloom Cluster',
    views: 48,
    inquiries: 3,
    createdAt: '2 days ago',
  },
  {
    id: 'diya-1',
    name: 'Carved Terracotta Diya',
    nameHindi: 'नक्काशीदार मिट्टी का पारंपरिक दीया',
    craft: 'Terracotta craft',
    price: 360,
    b2bPrice: 220,
    exportPrice: 480,
    status: 'Published',
    description: 'A hand-shaped terracotta diya with delicate carved details, made for warm evenings and festive corners.',
    hindiDescription: 'नाज़ुक नक्काशी वाला हाथ से बनाया हुआ मिट्टी का दीया, त्योहार और रोज़मर्रा की रोशनी के लिए।',
    image: diya,
    material: 'Terracotta clay',
    tags: ['#Terracotta', '#ClayCraft', '#FestiveLight'],
    geoIndication: 'Gorakhpur Terracotta',
    views: 82,
    inquiries: 7,
    createdAt: '6 days ago',
  },
];

const ArtisanContext = createContext<ArtisanContextValue | null>(null);

export function ArtisanProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>(starterProducts);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [language, setLanguageState] = useState<AppLanguage>('en');

  // Load from local storage without duplicates
  useEffect(() => {
    AsyncStorage.getItem('artisan-market-products').then((stored) => {
      if (!stored) return;
      try {
        const saved = JSON.parse(stored) as Product[];
        const deduplicated = saved.filter((p) => !starterProducts.some((s) => s.id === p.id));
        setProducts([...deduplicated, ...starterProducts]);
      } catch {
        setProducts(starterProducts);
      }
    });
  }, []);

  // Load receipts
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

  // Cloud Sync: Fetch live products from backend /api/products
  const refreshProducts = async () => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/api/products`);
      if (res.ok) {
        const cloudProducts = (await res.json()) as any[];
        if (Array.isArray(cloudProducts) && cloudProducts.length > 0) {
          setProducts((current) => {
            const cloudFormatted: Product[] = cloudProducts.map((cp) => ({
              id: cp.id,
              name: cp.name,
              nameHindi: cp.nameHindi,
              craft: cp.craftCategory ?? 'Heritage Handicraft',
              price: cp.price,
              b2bPrice: cp.b2bPrice,
              exportPrice: cp.exportPrice,
              status: cp.status ?? 'Published',
              description: cp.description,
              hindiDescription: cp.descriptionHindi ?? cp.description,
              image: cp.imageUrl ? { uri: cp.imageUrl } : textile,
              imageUri: cp.imageUrl,
              material: cp.material ?? 'Handmade',
              tags: cp.tags ?? [],
              geoIndication: cp.geoIndication,
              views: cp.views ?? 0,
              inquiries: cp.inquiries ?? 0,
              createdAt: cp.createdAt ? 'Recently' : 'Just now',
            }));

            // Merge avoiding duplicates
            const currentFiltered = current.filter((p) => !cloudFormatted.some((c) => c.id === p.id));
            return [...cloudFormatted, ...currentFiltered];
          });
        }
      }
    } catch {
      // Offline fallback: continue using local state
    }
  };

  useEffect(() => {
    void refreshProducts();
  }, []);

  // Language setting
  useEffect(() => {
    AsyncStorage.getItem('artisan-market-language').then((stored) => {
      if (stored === 'en' || stored === 'hi' || stored === 'mr' || stored === 'bn') {
        setLanguageState(stored);
      }
    });
  }, []);

  // Add Product with Cloud Sync & Offline-First local persistence
  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newId = `prod_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const created: Product = {
      ...product,
      id: newId,
      createdAt: 'Just now',
      pendingSync: true,
    };

    // 1. Instant local optimistic update
    setProducts((current) => [created, ...current]);
    const storedList = [created, ...products.filter((item) => !item.id.startsWith('textile-') && !item.id.startsWith('diya-'))];
    await AsyncStorage.setItem('artisan-market-products', JSON.stringify(storedList));

    // 2. Background Cloud Sync to /api/products
    try {
      const baseUrl = getApiBaseUrl();
      const syncPayload = {
        name: product.name,
        nameHindi: product.nameHindi ?? product.name,
        craftCategory: product.craft,
        material: product.material,
        price: product.price,
        b2bPrice: product.b2bPrice ?? Math.round(product.price * 0.65),
        exportPrice: product.exportPrice ?? Math.round(product.price * 1.35),
        description: product.description,
        descriptionHindi: product.hindiDescription,
        tags: product.tags ?? [],
        geoIndication: product.geoIndication,
      };

      const response = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(syncPayload),
      });

      if (response.ok) {
        created.pendingSync = false;
      }
    } catch {
      // Stays pendingSync: true, will sync when reconnected
    }

    return created;
  };

  const setLanguage = async (nextLanguage: AppLanguage) => {
    setLanguageState(nextLanguage);
    await AsyncStorage.setItem('artisan-market-language', nextLanguage);
  };

  const addReceipt = async (receipt: Omit<Receipt, 'id' | 'createdAt'>) => {
    const created: Receipt = {
      ...receipt,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: 'Just now',
    };
    const next = [created, ...receipts];
    setReceipts(next);
    await AsyncStorage.setItem('artisan-market-receipts', JSON.stringify(next));
  };

  const value = useMemo(
    () => ({
      products,
      addProduct,
      getProduct: (id: string) => products.find((product) => product.id === id),
      refreshProducts,
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