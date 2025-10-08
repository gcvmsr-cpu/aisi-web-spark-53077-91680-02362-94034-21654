import { Package, Search, Grid, List, MoreVertical, Eye, Edit, Trash2, Plus, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AddProductDialog from "@/components/AddProductDialog";
import DeleteProductDialog from "@/components/DeleteProductDialog";
import DisableProductDialog from "@/components/DisableProductDialog";
import EditProductDialog from "@/components/EditProductDialog";
import ViewCodesDialog from "@/components/ViewCodesDialog";
import AddCodeDialog from "@/components/AddCodeDialog";

const initialProducts = [
  { 
    id: 68405, 
    name: "Roblox Digital Card - 400 Robux Global", 
    category: "Roblox", 
    sold: 11605, 
    available: 145, 
    price: 6.40, 
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal"],
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=80&h=80&fit=crop&crop=center",
    productValue: 8.00,
    description: "Premium Roblox digital card with 400 Robux for global use. Instant delivery upon purchase.",
    region: "Global"
  },
  { 
    id: 109898, 
    name: "Roblox Digital Card - 800 Robux Global", 
    category: "Roblox", 
    sold: 6426, 
    available: 88, 
    price: 9.50, 
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=80&h=80&fit=crop&crop=center"
  },
  { 
    id: 2, 
    name: "League of Legends RP Card", 
    category: "Riot Games", 
    sold: 4537, 
    available: 120, 
    price: 25.00, 
    currency: "USD",
    paymentSystems: ["Google Pay", "Stripe"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop&crop=center"
  },
  { 
    id: 3, 
    name: "Minecraft Java Edition", 
    category: "Minecraft", 
    sold: 3148, 
    available: 95, 
    price: 26.95, 
    currency: "USD",
    paymentSystems: ["PayPal", "Stripe"],
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=80&h=80&fit=crop&crop=center"
  },
  { 
    id: 4, 
    name: "Xbox Game Pass Ultimate", 
    category: "Xbox", 
    sold: 2107, 
    available: 200, 
    price: 15.00, 
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal"],
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=80&h=80&fit=crop&crop=center"
  },
  { 
    id: 5, 
    name: "Overwatch Credits", 
    category: "Overwatch", 
    sold: 1850, 
    available: 75, 
    price: 19.99, 
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&h=80&fit=crop&crop=center"
  },
  { 
    id: 6, 
    name: "Walmart Gift Card", 
    category: "Walmart", 
    sold: 3420, 
    available: 300, 
    price: 50.00, 
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop&crop=center"
  },
  { 
    id: 7, 
    name: "Amazon Gift Card", 
    category: "Amazon", 
    sold: 5280, 
    available: 450, 
    price: 25.00, 
    currency: "USD",
    paymentSystems: ["Google Pay", "PayPal", "Stripe"],
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=80&h=80&fit=crop&crop=center"
  },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("list");
  const [addCodeDialog, setAddCodeDialog] = useState({ open: false, product: null as any });

  // Product codes state - storing codes for each product
  const [productCodes, setProductCodes] = useState<{ [productId: number]: any[] }>({
    68405: [
      { id: 1, code: "ROBLOX-ABC123", status: "Available", dateAdded: new Date().toISOString(), soldDate: null },
      { id: 2, code: "ROBLOX-DEF456", status: "Available", dateAdded: new Date().toISOString(), soldDate: null },
      { id: 3, code: "ROBLOX-GHI789", status: "Sold", dateAdded: new Date().toISOString(), soldDate: new Date().toISOString() },
    ]
  });

  // Dialog states
  const [deleteDialog, setDeleteDialog] = useState({ open: false, product: null as any });
  const [disableDialog, setDisableDialog] = useState({ open: false, product: null as any });
  const [editDialog, setEditDialog] = useState({ open: false, product: null as any });
  const [viewCodesDialog, setViewCodesDialog] = useState({ open: false, product: null as any });

  const categories = ["All", "Gaming", "Roblox", "Overwatch", "Riot Games", "Minecraft", "Xbox", "Walmart", "Amazon"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (newProduct: any) => {
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (updatedProduct: any) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = () => {
    setProducts(products.filter(p => p.id !== deleteDialog.product.id));
    setDeleteDialog({ open: false, product: null });
  };

  const handleDisableProduct = () => {
    setProducts(products.map(p => 
      p.id === disableDialog.product.id 
        ? { ...p, available: 0, disabled: true }
        : p
    ));
    setDisableDialog({ open: false, product: null });
  };

  const handleSaveCode = (productId: number, code: string, description: string) => {
    const newCode = {
      id: Date.now(), // Simple ID generation
      code: code,
      status: "Available",
      dateAdded: new Date().toISOString(), // Full ISO string with time
      soldDate: null,
      description: description
    };

    setProductCodes(prev => ({
      ...prev,
      [productId]: [newCode, ...(prev[productId] || [])] // Add new code at the beginning (latest first)
    }));
  };

  const handleSaveCodes = (productId: number, codes: string[], description: string) => {
    const newCodes = codes.map(code => ({
      id: Date.now() + Math.random(), // Simple ID generation with uniqueness
      code: code,
      status: "Available",
      dateAdded: new Date().toISOString(), // Full ISO string with time
      soldDate: null,
      description: description
    }));

    setProductCodes(prev => ({
      ...prev,
      [productId]: [...newCodes, ...(prev[productId] || [])] // Add new codes at the beginning (latest first)
    }));
  };

  const handleDeleteCode = (productId: number, codeId: number) => {
    setProductCodes(prev => ({
      ...prev,
      [productId]: (prev[productId] || []).filter(code => code.id !== codeId)
    }));
  };

  const ActionMenu = ({ product }: { product: typeof products[0] }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => setAddCodeDialog({ open: true, product })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Code
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => setViewCodesDialog({ open: true, product })}
          >
            <Eye className="h-4 w-4 mr-2" />
            View All Codes
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => setEditDialog({ open: true, product })}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-green-600"
          >
            <Package className="h-4 w-4 mr-2" />
            Advertise
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-orange-600"
            onClick={() => setDisableDialog({ open: true, product })}
          >
            <Ban className="h-4 w-4 mr-2" />
            Disable Product
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-destructive"
            onClick={() => setDeleteDialog({ open: true, product })}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Product
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="relative mb-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2">
              <ActionMenu product={product} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">{product.category}</div>
            <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Sold: {product.sold}</span>
              <span className="text-muted-foreground">Available: {product.available}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">{product.price.toFixed(2)} {product.currency}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-20">ID</TableHead>
            <TableHead>Product name</TableHead>
            <TableHead className="text-center w-24">Sold</TableHead>
            <TableHead className="text-center w-24">Available</TableHead>
            <TableHead className="text-center w-24">Price</TableHead>
            <TableHead className="text-center w-24">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id} className="hover:bg-muted/30">
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{product.category} &gt;</div>
                    <div className="font-medium">{product.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">{product.sold}</TableCell>
              <TableCell className="text-center">{product.available}</TableCell>
              <TableCell className="text-center font-medium">
                {product.price.toFixed(2)} {product.currency}
              </TableCell>
              <TableCell className="text-center">
                <ActionMenu product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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
                    className="w-8 h-8 rounded-lg"
                  />
                  <span className="text-xl font-bold">gc4u</span>
                </div>
                <SidebarTrigger className="text-foreground hover:bg-accent" />
              </div>

              {/* Desktop logo */}
              <div className="hidden lg:flex items-center gap-2 mb-8">
                <img 
                  src="/lovable-uploads/6658eac4-9d15-43da-bd1a-987db64cdf54.png" 
                  alt="gc4u Logo" 
                  className="w-10 h-10 rounded-lg"
                />
                <span className="text-2xl font-bold">gc4u</span>
              </div>

              {/* Action Buttons */}
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                <div></div>
                <div className="justify-self-center">
                  <AddProductDialog onAddProduct={handleAddProduct} />
                </div>
                <div className="justify-self-end">
                  <div className="flex border border-border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none border-r"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Category Filters */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Products Display */}
              {viewMode === "grid" ? <GridView /> : <ListView />}

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <AppSidebar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>

        {/* Dialogs */}
        <AddCodeDialog
          open={addCodeDialog.open}
          onOpenChange={(open) => setAddCodeDialog({ open, product: addCodeDialog.product })}
          productName={addCodeDialog.product?.name || ""}
          onSaveCode={(code, description) => handleSaveCode(addCodeDialog.product?.id, code, description)}
          onSaveCodes={(codes, description) => handleSaveCodes(addCodeDialog.product?.id, codes, description)}
          existingCodes={(productCodes[addCodeDialog.product?.id] || []).map(c => c.code)}
        />

        <DeleteProductDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ open, product: deleteDialog.product })}
          onConfirm={handleDeleteProduct}
          productName={deleteDialog.product?.name || ""}
        />

        <DisableProductDialog
          open={disableDialog.open}
          onOpenChange={(open) => setDisableDialog({ open, product: disableDialog.product })}
          onConfirm={handleDisableProduct}
          productName={disableDialog.product?.name || ""}
        />

        <EditProductDialog
          open={editDialog.open}
          onOpenChange={(open) => setEditDialog({ open, product: editDialog.product })}
          onEditProduct={handleEditProduct}
          product={editDialog.product}
        />

        <ViewCodesDialog
          open={viewCodesDialog.open}
          onOpenChange={(open) => setViewCodesDialog({ open, product: viewCodesDialog.product })}
          productName={viewCodesDialog.product?.name || ""}
          codes={productCodes[viewCodesDialog.product?.id] || []}
        />
      </div>
    </SidebarProvider>
  );
};

export default Products;
