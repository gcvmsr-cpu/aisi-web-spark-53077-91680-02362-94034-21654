import { Home, BarChart3, Wallet, Package, Settings, HelpCircle, User, Search, Moon, Sun, Globe, Calendar, ThumbsUp, ThumbsDown, CreditCard, Star, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sidebarItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BarChart3, label: "Dashboard", path: "/dashboard" },
  { icon: Wallet, label: "Balance", path: "/balance" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Support", path: "/support" },
];

interface AppSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function AppSidebar({ searchQuery, onSearchChange }: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [userLevel, setUserLevel] = useState(5); // Example level, can be dynamic
  
  // Unread counts for badges
  const [unreadMessages, setUnreadMessages] = useState(3); // Example count
  const [unreadSupport, setUnreadSupport] = useState(1); // Example count
  
  // User profile data (can be dynamic from API)
  const userProfile = {
    registeredDate: "2024-01-15",
    positiveFeedback: 156,
    negativeFeedback: 8,
    totalTransactions: 142,
    totalRatings: 100,
    sellerRating: 4.8
  };

  // Level system color functions
  const getLevelRingColor = (level: number) => {
    if (level <= 2) return "bg-gradient-to-r from-gray-300 to-gray-400"; // Light gray for low levels
    if (level <= 4) return "bg-gradient-to-r from-blue-400 to-blue-500"; // Blue for medium levels
    if (level <= 6) return "bg-gradient-to-r from-yellow-400 to-yellow-500"; // Golden for good levels
    if (level <= 8) return "bg-gradient-to-r from-yellow-400 to-orange-500"; // Orange for high levels
    return "bg-gradient-to-r from-purple-500 to-pink-500"; // Purple-pink for max levels
  };

  const getLevelBadgeColor = (level: number) => {
    if (level <= 2) return "bg-gray-500"; // Light gray for low levels
    if (level <= 4) return "bg-blue-500"; // Blue for medium levels
    if (level <= 6) return "bg-green-500"; // Green for good levels
    if (level <= 8) return "bg-orange-500"; // Orange for high levels
    return "bg-purple-600"; // Purple for max levels
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" }
  ];

  const handleNavigation = (path: string) => {
    // Clear unread count when navigating to messages or support
    if (path === "/messages") {
      setUnreadMessages(0);
    } else if (path === "/support") {
      setUnreadSupport(0);
    }
    navigate(path);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Function to get unread count for menu items
  const getUnreadCount = (label: string) => {
    if (label === "Messages") return unreadMessages;
    if (label === "Support") return unreadSupport;
    return 0;
  };

  return (
    <Sidebar side="right" className="border-l border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        <div className="p-4">
          <div className="flex gap-4 mb-6">
            {/* Profile Icon - Left Side */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 flex-shrink-0">
                {/* Level Ring */}
                <div className={`absolute inset-0 rounded-full p-1 ${getLevelRingColor(userLevel)}`}>
                  <div className="w-full h-full bg-primary rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-sidebar-foreground mt-2">Name</h3>
            </div>
            
            {/* Profile Stats - Right Side */}
            <div className="flex-1 space-y-1 text-sm">
              {/* Registered Date */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="font-semibold">Joined {new Date(userProfile.registeredDate).toLocaleDateString('en-GB')}</span>
              </div>
              
              {/* Feedback and Transactions in column */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-green-500">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="font-bold">{userProfile.positiveFeedback}</span>
                  </div>
                  <div className="flex items-center gap-1 text-red-500">
                    <ThumbsDown className="h-4 w-4" />
                    <span className="font-bold">{userProfile.negativeFeedback}</span>
                  </div>
                </div>
                
                {/* Ratings and Transactions Count */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4" />
                    <span className="font-bold">{userProfile.totalRatings}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-500">
                    <CreditCard className="h-4 w-4" />
                    <span className="font-bold">{userProfile.totalTransactions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={
                  location.pathname === "/products" ? "Search Products" :
                  location.pathname === "/messages" ? "Search Conversations" :
                  "Search"
                }
                className="pl-10 bg-input border-border text-sidebar-foreground placeholder-muted-foreground focus:border-primary"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  const unreadCount = getUnreadCount(item.label);
                  
                  // Define specific hover colors for each menu item
                  const getHoverColors = (label: string) => {
                    switch (label) {
                      case 'Support':
                        return 'hover:bg-red-100 hover:text-red-600 active:bg-red-200 active:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:active:bg-red-900/30';
                      case 'Messages':
                        return 'hover:bg-blue-100 hover:text-blue-600 active:bg-blue-200 active:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:active:bg-blue-900/30';
                      case 'Balance':
                        return 'hover:bg-green-100 hover:text-green-600 active:bg-green-200 active:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 dark:active:bg-green-900/30';
                      case 'Products':
                        return 'hover:bg-yellow-100 hover:text-yellow-700 active:bg-yellow-200 active:text-yellow-800 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-400 dark:active:bg-yellow-900/30';
                      case 'Dashboard':
                        return 'hover:bg-purple-100 hover:text-purple-600 active:bg-purple-200 active:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 dark:active:bg-purple-900/30';
                      case 'Settings':
                        return 'hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300 active:text-black dark:hover:bg-gray-700 dark:hover:text-white dark:active:bg-gray-600 dark:active:text-white';
                      default:
                        return 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground';
                    }
                  };

                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-lg transition-all duration-300 text-base cursor-crosshair hover:scale-105 ${
                          isActive
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                            : `text-sidebar-foreground ${getHoverColors(item.label)}`
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <item.icon className="h-6 w-6" />
                          <span className="text-base font-medium">{item.label}</span>
                        </div>
                        {unreadCount > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="h-5 min-w-5 text-xs flex items-center justify-center rounded-full bg-red-500 text-white font-bold"
                          >
                            {unreadCount}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Theme and Language Controls */}
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex gap-2">
              {/* Theme Toggle Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="flex-1 flex items-center gap-2 hover:scale-105 transition-all duration-300"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="text-sm">
                  {theme === "dark" ? "Light" : "Dark"}
                </span>
              </Button>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1 flex items-center gap-2 hover:scale-105 transition-all duration-300">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">{currentLanguage}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => setCurrentLanguage(language.name)}
                      className="cursor-pointer"
                    >
                      {language.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
