
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ManualCodeEntryProps {
  productName: string;
  onBack: () => void;
  onClose: () => void;
  onSaveCode: (code: string, description: string) => void;
  existingCodes: string[];
}

const ManualCodeEntry = ({ productName, onBack, onClose, onSaveCode, existingCodes }: ManualCodeEntryProps) => {
  const [productCode, setProductCode] = useState("");
  const [description, setDescription] = useState("");
  const [addedCount, setAddedCount] = useState(0);
  const { toast } = useToast();

  const handleSave = () => {
    if (!productCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a product code",
        variant: "destructive",
      });
      return;
    }

    // Check if code already exists
    if (existingCodes.includes(productCode.trim())) {
      toast({
        title: "Error",
        description: "This code already exists",
        variant: "destructive",
      });
      return;
    }

    // Save the code
    onSaveCode(productCode.trim(), description.trim());
    
    const finalCount = addedCount + 1;
    
    // Show success notification
    toast({
      title: "Success",
      description: `Your ${finalCount} product${finalCount > 1 ? 's are' : ' is'} successfully added`,
    });

    // Reset form and close dialog
    setProductCode("");
    setDescription("");
    setAddedCount(0);
    onClose();
  };

  const handleSaveAndAddAnother = () => {
    if (!productCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a product code",
        variant: "destructive",
      });
      return;
    }

    // Check if code already exists
    if (existingCodes.includes(productCode.trim())) {
      toast({
        title: "Error",
        description: "This code already exists",
        variant: "destructive",
      });
      return;
    }

    // Save the code
    onSaveCode(productCode.trim(), description.trim());

    // Increment the counter
    setAddedCount(prev => prev + 1);
    
    // Clear the form for next entry
    setProductCode("");
    setDescription("");
    
    console.log(`Added code for ${productName}. Total added: ${addedCount + 1}`);
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <div>
          <Button
            variant="outline"
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg px-6 py-3 h-12"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Manual Entry Section */}
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <Image className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Write down manually</h3>
            <p className="text-muted-foreground">
              Enter Manual (one code at a time)
              {addedCount > 0 && (
                <span className="ml-2 text-orange-500 font-semibold">
                  {addedCount}+
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto space-y-4">
          <Input
            placeholder="Product code"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            className="w-full"
          />
          
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[120px] resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg"
          >
            Save
          </Button>
          <Button
            onClick={handleSaveAndAddAnother}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg"
          >
            Save & add another one
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManualCodeEntry;
