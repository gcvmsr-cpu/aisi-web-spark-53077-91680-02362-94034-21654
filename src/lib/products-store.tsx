import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  category: string;
  region: string;
  description?: string;
  price: number;
  productValue?: number;
  sold: number;
  available: number;
  currency: string;
  paymentSystems: string[];
  image: string;
  seller?: string;
  disabled?: boolean;
  uploadedImage?: boolean;
}

const REGION_META: Record<string, { name: string; flag: string }> = {
  Global: { name: "Global", flag: "🌍" },
  USA: { name: "United States", flag: "🇺🇸" },
  Canada: { name: "Canada", flag: "🇨🇦" },
  UK: { name: "United Kingdom", flag: "🇬🇧" },
  Germany: { name: "Germany", flag: "🇩🇪" },
  France: { name: "France", flag: "🇫🇷" },
  Italy: { name: "Italy", flag: "🇮🇹" },
  Spain: { name: "Spain", flag: "🇪🇸" },
  Russia: { name: "Russia", flag: "🇷🇺" },
  China: { name: "China", flag: "🇨🇳" },
  Japan: { name: "Japan", flag: "🇯🇵" },
  "South Korea": { name: "South Korea", flag: "🇰🇷" },
  India: { name: "India", flag: "🇮🇳" },
  Australia: { name: "Australia", flag: "🇦🇺" },
  Brazil: { name: "Brazil", flag: "🇧🇷" },
  Mexico: { name: "Mexico", flag: "🇲🇽" },
  Argentina: { name: "Argentina", flag: "🇦🇷" },
  "South Africa": { name: "South Africa", flag: "🇿🇦" },
  UAE: { name: "United Arab Emirates", flag: "🇦🇪" },
  "Saudi Arabia": { name: "Saudi Arabia", flag: "🇸🇦" },
  Turkey: { name: "Turkey", flag: "🇹🇷" },
  Poland: { name: "Poland", flag: "🇵🇱" },
  Netherlands: { name: "Netherlands", flag: "🇳🇱" },
  Sweden: { name: "Sweden", flag: "🇸🇪" },
  Norway: { name: "Norway", flag: "🇳🇴" },
  LATAM: { name: "LATAM", flag: "🌎" },
  Philippines: { name: "Philippines", flag: "🇵🇭" },
};

export const regionLabel = (region: string) => {
  const meta = REGION_META[region] ?? REGION_META.Global;
  return { country: meta.name, flag: meta.flag };
};

/**
 * Reads an uploaded image file and returns a compressed data URL so the
 * seller's own picture can be stored and shown everywhere the product appears.
 */
export const fileToDataUrl = (file: File, max = 512): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const src = String(reader.result);
      const img = new Image();
      img.onerror = () => resolve(src);
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(src);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        try {
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        } catch {
          resolve(src);
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });

const seedProducts: Product[] = [
  {
    id: 68405,
    name: "Roblox Digital Card - 400 Robux Global",
    category: "Roblox",
    region: "Global",
    description: "Premium Roblox digital card with 400 Robux for global use. Instant delivery upon purchase.",
    price: 6.4,
    productValue: 8.0,
    sold: 11605,
    available: 145,
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal"],
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=80&h=80&fit=crop&crop=center",
    seller: "BSV.Official.Store",
  },
  {
    id: 109898,
    name: "Roblox Digital Card - 800 Robux Global",
    category: "Roblox",
    region: "Global",
    price: 9.5,
    productValue: 12.0,
    sold: 6426,
    available: 88,
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=80&h=80&fit=crop&crop=center",
    seller: "liquid2606",
  },
  {
    id: 2,
    name: "League of Legends RP Card",
    category: "Riot Games",
    region: "USA",
    price: 25.0,
    productValue: 30.0,
    sold: 4537,
    available: 120,
    currency: "USD",
    paymentSystems: ["Google Pay", "Stripe"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop&crop=center",
    seller: "shaman4ik20060",
  },
  {
    id: 3,
    name: "Minecraft Java Edition",
    category: "Minecraft",
    region: "Global",
    price: 26.95,
    productValue: 29.99,
    sold: 3148,
    available: 95,
    currency: "USD",
    paymentSystems: ["PayPal", "Stripe"],
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=80&h=80&fit=crop&crop=center",
    seller: "liquid2606",
  },
  {
    id: 4,
    name: "Xbox Game Pass Ultimate",
    category: "Xbox",
    region: "USA",
    price: 15.0,
    productValue: 20.0,
    sold: 2107,
    available: 200,
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal"],
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=80&h=80&fit=crop&crop=center",
    seller: "BSV.Official.Store",
  },
  {
    id: 5,
    name: "Overwatch Credits",
    category: "Overwatch",
    region: "USA",
    price: 19.99,
    productValue: 25.0,
    sold: 1850,
    available: 75,
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&h=80&fit=crop&crop=center",
    seller: "nexo.gifts",
  },
  {
    id: 6,
    name: "Walmart Gift Card",
    category: "Walmart",
    region: "USA",
    price: 50.0,
    productValue: 55.0,
    sold: 3420,
    available: 300,
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop&crop=center",
    seller: "topup.king",
  },
  {
    id: 7,
    name: "Amazon Gift Card",
    category: "Amazon",
    region: "USA",
    price: 25.0,
    productValue: 27.5,
    sold: 5280,
    available: 450,
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal", "Stripe"],
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=80&h=80&fit=crop&crop=center",
    seller: "giftwall",
  },
];

interface ProductsContextValue {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  disableProduct: (id: number) => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

const STORAGE_KEY = "gc4u-products-v1";

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed as Product[];
      }
    } catch {
      /* fall back to the demo list */
    }
    return seedProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      /* storage full — keep the in-memory list */
    }
  }, [products]);

  const value: ProductsContextValue = {
    products,
    addProduct: (product) => setProducts((prev) => [...prev, product]),
    updateProduct: (product) =>
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p))),
    deleteProduct: (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),
    disableProduct: (id) =>
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, available: 0, disabled: true } : p)),
      ),
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
};
