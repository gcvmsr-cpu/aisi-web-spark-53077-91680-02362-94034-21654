
import { Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RecentProducts } from "@/components/RecentProducts";
import { useState } from "react";

const giftCards = [
  { id: 1, name: "Roblox", letter: "R", color: "from-red-500 to-red-600" },
  { id: 2, name: "LOL", letter: "L", color: "from-blue-500 to-blue-600" },
  { id: 3, name: "Minecoin", letter: "M", color: "from-green-500 to-green-600" },
  { id: 4, name: "Gamepass", letter: "G", color: "from-purple-500 to-purple-600" },
  { id: 5, name: "Walmart", letter: "W", color: "from-yellow-500 to-yellow-600" },
  { id: 6, name: "Steam", letter: "S", color: "from-indigo-500 to-indigo-600" },
  { id: 7, name: "PlayStation", letter: "P", color: "from-blue-600 to-blue-700" },
  { id: 8, name: "Xbox", letter: "X", color: "from-green-600 to-green-700" },
  { id: 9, name: "Netflix", letter: "N", color: "from-red-600 to-red-700" },
  { id: 10, name: "Amazon", letter: "A", color: "from-orange-500 to-orange-600" },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCards = giftCards.filter(card =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground w-full">
        <div className="flex w-full">
          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Mobile sidebar trigger */}
              <div className="lg:hidden mb-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/6658eac4-9d15-43da-bd1a-987db64cdf54.png" 
                  alt="gc4u Logo" 
                  className="w-8 h-8 rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer"
                />
                  <span className="text-xl font-bold">gc4u</span>
                </div>
                <SidebarTrigger className="text-foreground hover:bg-accent hover:scale-110 transition-all duration-300" />
              </div>

              {/* Desktop logo */}
              <div className="hidden lg:flex items-center gap-2 mb-8">
                <img 
                  src="/lovable-uploads/6658eac4-9d15-43da-bd1a-987db64cdf54.png" 
                  alt="gc4u Logo" 
                  className="w-10 h-10 rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer"
                />
                <span className="text-2xl font-bold">gc4u</span>
              </div>

              {/* Hero Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Buy Gift Cards Via Crypto
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Purchase your favorite gift cards using cryptocurrency. Fast, secure, and convenient.
                </p>
              </div>

              {/* Gift Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-16">
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="group cursor-pointer"
                  >
                    <div className="bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:scale-105">
                      <div className={`w-20 h-20 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-3xl font-bold text-white">
                          {card.letter}
                        </span>
                      </div>
                      <h3 className="text-center font-semibold text-lg text-card-foreground group-hover:text-foreground transition-colors">
                        {card.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCards.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No gift cards found matching your search.</p>
                </div>
              )}

              {/* Recent Products Section */}
              <RecentProducts />
            </div>
          </main>

          {/* Sidebar */}
          <AppSidebar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
