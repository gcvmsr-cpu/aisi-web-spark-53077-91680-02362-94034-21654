
import { useState } from "react";
import { FileText, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ManualCodeEntry from "./ManualCodeEntry";
import BatchFileUpload from "./BatchFileUpload";

interface AddCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  onSaveCode: (code: string, description: string) => void;
  onSaveCodes: (codes: string[], description: string) => void;
  existingCodes: string[];
}

const AddCodeDialog = ({ open, onOpenChange, productName, onSaveCode, onSaveCodes, existingCodes }: AddCodeDialogProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    console.log(`Selected method: ${method} for product: ${productName}`);
  };

  const handleBackToOptions = () => {
    setSelectedMethod(null);
  };

  const handleClose = () => {
    setSelectedMethod(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Add Pin, Serial or other Code
          </DialogTitle>
        </DialogHeader>
        
        {selectedMethod === 'enter-manually' ? (
          <ManualCodeEntry
            productName={productName}
            onBack={handleBackToOptions}
            onClose={handleClose}
            onSaveCode={onSaveCode}
            existingCodes={existingCodes}
          />
        ) : selectedMethod === 'upload-batch' ? (
          <BatchFileUpload
            productName={productName}
            onBack={handleBackToOptions}
            onClose={handleClose}
            onSaveCodes={onSaveCodes}
            existingCodes={existingCodes}
          />
        ) : (
          <div className="space-y-8">
            {/* Automatic Delivery Section */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Automatic delivery</h3>
              <p className="text-muted-foreground mb-6">(instant delivery for buyers)</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Upload Batch File */}
                <div className="flex flex-col items-center space-y-4">
                  <Button
                    variant="outline"
                    className="w-full h-16 border-2 border-orange-500 hover:bg-orange-50 rounded-lg px-8"
                    onClick={() => handleMethodSelect('upload-batch')}
                  >
                    <FileText className="h-5 w-5 mr-3" />
                    Upload Batch File
                    <span className="absolute -top-1 -right-1 text-red-500 text-lg">*</span>
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    You can upload batch file, if you have more than 1 code for this product.
                  </p>
                </div>

                {/* Enter Manually */}
                <div className="flex flex-col items-center space-y-4">
                  <Button
                    variant="outline"
                    className="w-full h-16 border-2 border-orange-500 hover:bg-orange-50 rounded-lg px-8"
                    onClick={() => handleMethodSelect('enter-manually')}
                  >
                    <Edit className="h-5 w-5 mr-3" />
                    Enter Manually
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Enter Manual (one code at a time)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddCodeDialog;
