
import { useState } from "react";
import { Plus, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fileToDataUrl, type Product } from "@/lib/products-store";

interface AddProductDialogProps {
  onAddProduct: (product: any) => void;
}

const AddProductDialog = ({ onAddProduct }: AddProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    region: "",
    description: "",
    productValue: "",
    yourPrice: "",
    image: null as File | null,
  });

  const regions = [
    { code: "Global", name: "🌍 Global" },
    { code: "USA", name: "🇺🇸 United States" },
    { code: "Canada", name: "🇨🇦 Canada" },
    { code: "UK", name: "🇬🇧 United Kingdom" },
    { code: "Germany", name: "🇩🇪 Germany" },
    { code: "France", name: "🇫🇷 France" },
    { code: "Italy", name: "🇮🇹 Italy" },
    { code: "Spain", name: "🇪🇸 Spain" },
    { code: "Russia", name: "🇷🇺 Russia" },
    { code: "China", name: "🇨🇳 China" },
    { code: "Japan", name: "🇯🇵 Japan" },
    { code: "South Korea", name: "🇰🇷 South Korea" },
    { code: "India", name: "🇮🇳 India" },
    { code: "Australia", name: "🇦🇺 Australia" },
    { code: "Brazil", name: "🇧🇷 Brazil" },
    { code: "Mexico", name: "🇲🇽 Mexico" },
    { code: "Argentina", name: "🇦🇷 Argentina" },
    { code: "South Africa", name: "🇿🇦 South Africa" },
    { code: "UAE", name: "🇦🇪 United Arab Emirates" },
    { code: "Saudi Arabia", name: "🇸🇦 Saudi Arabia" },
    { code: "Turkey", name: "🇹🇷 Turkey" },
    { code: "Poland", name: "🇵🇱 Poland" },
    { code: "Netherlands", name: "🇳🇱 Netherlands" },
    { code: "Sweden", name: "🇸🇪 Sweden" },
    { code: "Norway", name: "🇳🇴 Norway" },
  ];

  const categories = [
    "Gaming",
    "Roblox", 
    "Riot Games",
    "Minecraft",
    "Xbox",
    "Overwatch",
    "Sea of Thieves",
    "Amazon",
    "Walmart",
    "Other"
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    fileInput?.click();
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.category !== "" &&
      formData.region !== "" &&
      formData.description.trim() !== "" &&
      formData.productValue.trim() !== "" &&
      formData.yourPrice.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Create new product object
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      region: formData.region,
      description: formData.description,
      price: parseFloat(formData.yourPrice),
      productValue: parseFloat(formData.productValue),
      currency: "USD",
      sold: 0,
      available: 100,
      paymentSystems: ["Google Pay", "PayPal"],
      image: formData.image ? await fileToDataUrl(formData.image) : "/placeholder.svg",
      seller: "You",
      uploadedImage: Boolean(formData.image)
    };

    onAddProduct(newProduct);
    
    // Reset form
    setFormData({
      name: "",
      category: "",
      region: "",
      description: "",
      productValue: "",
      yourPrice: "",
      image: null,
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="productName">
              Product name <span className="text-muted-foreground">(Example: Amazon Gift card USA 50 USD)</span>
            </Label>
            <Input
              id="productName"
              placeholder="Product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label htmlFor="region">Choose a region</Label>
              <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.code} value={region.code}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Upload Image and Product Description Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Upload Image */}
            <div className="space-y-2">
              <Label>Product Image</Label>
              {formData.image ? (
                <div className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border">
                    <img 
                      src={URL.createObjectURL(formData.image)} 
                      alt="Product preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={triggerFileInput}
                        className="text-xs bg-white text-black hover:bg-white/90"
                      >
                        Change Image
                      </Button>
                    </div>
                  </div>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors aspect-square"
                  onClick={triggerFileInput}
                >
                  <div className="flex flex-col items-center gap-1 h-full justify-center">
                    <div className="p-1 rounded-full bg-muted">
                      <Upload className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-xs">Upload image</p>
                      <p className="text-xs text-muted-foreground">up to 10 Mb</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Upload className="h-2 w-2 text-blue-500" />
                      <Label className="cursor-pointer text-primary hover:underline text-xs">
                        Click to upload
                      </Label>
                    </div>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">
                Product description <span className="text-red-500">is required</span>
              </Label>
              <Textarea
                id="description"
                placeholder="It's very important to create an original, high-quality product description. The recommended length is 150+ words."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-red-200 h-[200px] resize-none"
                required
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                <span>It's very important to create an original, high-quality product description.</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productValue">Product Value (USD)</Label>
              <Input
                id="productValue"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.productValue}
                onChange={(e) => setFormData({ ...formData, productValue: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yourPrice">Your Price (USD)</Label>
              <Input
                id="yourPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.yourPrice}
                onChange={(e) => setFormData({ ...formData, yourPrice: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className={`px-8 ${isFormValid() 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!isFormValid()}
            >
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
