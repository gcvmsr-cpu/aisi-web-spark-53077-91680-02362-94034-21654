import { Package } from "lucide-react";
import { useProducts, regionLabel, type Product } from "@/lib/products-store";

const getLevelRingColor = (level: number) => {
  if (level <= 2) return "bg-gradient-to-r from-gray-300 to-gray-400";
  if (level <= 4) return "bg-gradient-to-r from-blue-400 to-blue-500";
  if (level <= 6) return "bg-gradient-to-r from-yellow-400 to-yellow-500";
  if (level <= 8) return "bg-gradient-to-r from-yellow-400 to-orange-500";
  return "bg-gradient-to-r from-purple-500 to-pink-500";
};

// Stable level per product so the ring does not jump around on every render.
const getSellerLevel = (productId: number) => (productId % 10) + 1;

const money = (value: number) => `$${value.toFixed(2)}`;

export function RecentProducts() {
  const { products } = useProducts();

  // Products a seller added with their own picture come first, then the
  // best sellers by number of sales.
  const withOwnImage = products.filter((p) => p.uploadedImage);
  const rest = products
    .filter((p) => !p.uploadedImage)
    .sort((a, b) => b.sold - a.sold);
  const popularProducts: Product[] = [...withOwnImage, ...rest].slice(0, 5);

  if (popularProducts.length === 0) {
    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Popular Products</h2>
          <p className="text-muted-foreground">Most popular gift cards by sales</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-10 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            No products yet. Add your first product to see it here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">Popular Products</h2>
        <p className="text-muted-foreground">Most popular gift cards by sales</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
          <div className="col-span-6">Product name</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-1 text-center">Sold</div>
          <div className="col-span-2 text-center">Seller</div>
          <div className="col-span-1"></div>
        </div>

        {/* Products */}
        <div className="divide-y divide-border">
          {popularProducts.map((product) => {
            const { country, flag } = regionLabel(product.region);
            const sellerLevel = getSellerLevel(product.id);

            return (
              <div
                key={product.id}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                {/* Product Info */}
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 hover:scale-110 transition-transform duration-300">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-card-foreground line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-base leading-none">{flag}</span>
                      <span className="text-xs text-muted-foreground">{country}</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 flex flex-col items-center justify-center">
                  {product.productValue !== undefined && product.productValue > product.price && (
                    <span className="text-xs text-muted-foreground line-through">
                      {money(product.productValue)}
                    </span>
                  )}
                  <span className="text-lg font-bold text-orange-500">
                    {money(product.price)}
                  </span>
                </div>

                {/* Sold */}
                <div className="col-span-1 flex items-center justify-center">
                  <span className="text-sm font-medium text-card-foreground">
                    {product.sold.toLocaleString()}
                  </span>
                </div>

                {/* Seller */}
                <div className="col-span-2 flex items-center justify-center gap-2 group hover:scale-110 transition-transform duration-300 cursor-crosshair">
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <div
                      className={`absolute inset-0 rounded-full p-0.5 ${getLevelRingColor(sellerLevel)}`}
                    >
                      <div className="w-full h-full bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">
                          {(product.seller || "?").charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-card-foreground truncate">
                    {product.seller || "—"}
                  </span>
                </div>

                {/* Buy Button */}
                <div className="col-span-1 flex items-center justify-center">
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 hover:scale-105 transition-all duration-300 text-sm font-medium shadow-md">
                    Buy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
