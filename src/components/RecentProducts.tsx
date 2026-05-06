
import { Badge } from "@/components/ui/badge";

const popularProducts = [
  {
    id: 4,
    title: "Roblox 10 AUD | Australia",
    originalPrice: "$6.59",
    price: "$6.39",
    bonus: "$0.01",
    sold: "8059",
    image: "/lovable-uploads/6658eac4-9d15-43da-bd1a-987db64cdf54.png",
    seller: "BSV.Official.Store",
    category: "Gaming",
    country: "Australia",
    countryFlag: "🇦🇺"
  },
  {
    id: 3,
    title: "Xbox Game Pass Ultimate / 1 Month LATAM",
    originalPrice: "$20.00",
    price: "$9.45",
    bonus: "$0.05",
    sold: "4537",
    image: "/lovable-uploads/6658eac4-9d15-43da-bd1a-987db64cdf54.png",
    seller: "liquid2606",
    category: "Gaming",
    country: "LATAM",
    countryFlag: "🌎"
  },
  {
    id: 2,
    title: "PSN gift card India 1000 INR",
    originalPrice: "$1,000.00",
    price: "$11.24",
    bonus: "$0.01",
    sold: "4148",
    image: "/lovable-uploads/6658eac4-9d15-43da-bd1a-987db64cdf54.png",
    seller: "shaman4ik20060",
    category: "Gaming",
    country: "India",
    countryFlag: "🇮🇳"
  },
  {
    id: 1,
    title: "PlayStation Network PSN 1000 INR (INDIA)",
    originalPrice: "$15.00",
    price: "$11.55",
    bonus: "$0.03",
    sold: "3107",
    image: "/lovable-uploads/6658eac4-9d15-43da-bd1a-987db64cdf54.png",
    seller: "liquid2606",
    category: "Gaming",
    country: "India",
    countryFlag: "🇮🇳"
  },
  {
    id: 5,
    title: "Steam wallet 250 PHP | Philippines (stock)",
    originalPrice: "",
    price: "$5.74",
    bonus: "$0.01",
    sold: "2445",
    image: "/lovable-uploads/6658eac4-9d15-43da-bd1a-987db64cdf54.png",
    seller: "BSV.Official.Store",
    category: "Gaming",
    country: "Philippines",
    countryFlag: "🇵🇭"
  }
];

export function RecentProducts() {
  // Level system color functions (same as sidebar)
  const getLevelRingColor = (level: number) => {
    if (level <= 2) return "bg-gradient-to-r from-gray-300 to-gray-400"; // Light gray for low levels
    if (level <= 4) return "bg-gradient-to-r from-blue-400 to-blue-500"; // Blue for medium levels
    if (level <= 6) return "bg-gradient-to-r from-yellow-400 to-yellow-500"; // Golden for good levels
    if (level <= 8) return "bg-gradient-to-r from-yellow-400 to-orange-500"; // Orange for high levels
    return "bg-gradient-to-r from-purple-500 to-pink-500"; // Purple-pink for max levels
  };

  // Generate random level for each seller (in real app, this would come from API)
  const getSellerLevel = (sellerId: number) => {
    return Math.floor(Math.random() * 10) + 1; // Random level 1-10
  };

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
          {popularProducts.map((product) => (
            <div key={product.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              {/* Product Info */}
              <div className="col-span-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 hover:scale-110 transition-transform duration-300">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-card-foreground line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-base leading-none">{product.countryFlag}</span>
                    <span className="text-xs text-muted-foreground">{product.country}</span>
                  </div>
                </div>
              </div>
              
              {/* Price */}
              <div className="col-span-2 flex flex-col items-center justify-center">
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-lg font-bold text-orange-500">
                  {product.price}
                </span>
              </div>
              
              {/* Sold */}
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-sm font-medium text-card-foreground">
                  {product.sold}
                </span>
              </div>
              
              {/* Seller */}
              <div className="col-span-2 flex items-center justify-center gap-2 group hover:scale-110 transition-transform duration-300 cursor-crosshair">
                {(() => {
                  const sellerLevel = getSellerLevel(product.id);
                  return (
                    <div className="relative w-6 h-6 flex-shrink-0">
                      {/* Level Ring */}
                      <div className={`absolute inset-0 rounded-full p-0.5 ${getLevelRingColor(sellerLevel)}`}>
                        <div className="w-full h-full bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">
                            {product.seller.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <span className="text-sm text-card-foreground truncate">
                  {product.seller}
                </span>
              </div>
              
              {/* Buy Button */}
              <div className="col-span-1 flex items-center justify-center">
                <button className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 hover:scale-105 transition-all duration-300 text-sm font-medium shadow-md">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
