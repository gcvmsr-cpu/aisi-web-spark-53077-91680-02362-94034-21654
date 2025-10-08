import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TransactionHistory } from "@/components/TransactionHistory";
import { useState } from "react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

              {/* Desktop Header */}
              <div className="hidden lg:flex items-center gap-2 mb-8">
                <img 
                  src="/lovable-uploads/6658eac4-9d15-43da-bd1a-987db64cdf54.png" 
                  alt="gc4u Logo" 
                  className="w-10 h-10 rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer"
                />
                <span className="text-2xl font-bold">gc4u</span>
              </div>

              {/* Transaction History Section */}
              <TransactionHistory />
            </div>
          </main>

          {/* Sidebar */}
          <AppSidebar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
