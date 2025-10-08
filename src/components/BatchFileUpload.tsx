import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Trash2, Upload, AlertCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BatchFileUploadProps {
  productName: string;
  onBack: () => void;
  onClose: () => void;
  onSaveCodes: (codes: string[], description: string) => void;
  existingCodes: string[];
}

interface ProcessedCode {
  code: string;
  status: 'new' | 'already' | 'duplicate';
  id: string;
  existingDate?: string;
}

const BatchFileUpload = ({ productName, onBack, onClose, onSaveCodes, existingCodes }: BatchFileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [processedCodes, setProcessedCodes] = useState<ProcessedCode[]>([]);
  const [showProcessed, setShowProcessed] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast({
          title: "Error",
          description: "File size must be less than 100MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      console.log(`Selected file: ${file.name}, size: ${(file.size / 1024).toFixed(2)}KB`);
    } else {
      toast({
        title: "Error",
        description: "Please select a valid .txt file",
        variant: "destructive",
      });
    }
  };

  const processTxtFile = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file first",
        variant: "destructive",
      });
      return;
    }

    try {
      const fileContent = await selectedFile.text();
      const codes = fileContent
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      if (codes.length === 0) {
        toast({
          title: "Error",
          description: "No valid codes found in the file",
          variant: "destructive",
        });
        return;
      }

      const processed: ProcessedCode[] = [];
      const seenInFile = new Set<string>();
      const currentDateTime = new Date().toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      codes.forEach(code => {
        let status: 'new' | 'already' | 'duplicate' = 'new';
        let existingDate: string | undefined;
        
        if (existingCodes.includes(code)) {
          status = 'already';
          existingDate = currentDateTime;
        } else if (seenInFile.has(code)) {
          status = 'duplicate';
        } else {
          seenInFile.add(code);
        }

        processed.push({
          code,
          status,
          id: Math.random().toString(36).substr(2, 9),
          existingDate
        });
      });

      setProcessedCodes(processed);
      setShowProcessed(true);
      console.log(`Processed ${processed.length} codes from file`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the file",
        variant: "destructive",
      });
      console.error("File processing error:", error);
    }
  };

  const handleDeleteCode = (id: string) => {
    setProcessedCodes(prev => prev.filter(code => code.id !== id));
  };

  const handleSave = () => {
    const validCodes = processedCodes
      .filter(item => item.status === 'new')
      .map(item => item.code);

    const invalidCodes = processedCodes.filter(item => item.status === 'already' || item.status === 'duplicate');

    if (invalidCodes.length > 0) {
      toast({
        title: "Cannot Save",
        description: `Please delete ${invalidCodes.length} duplicate/already existing codes first`,
        variant: "destructive",
      });
      return;
    }

    if (validCodes.length === 0) {
      toast({
        title: "Error",
        description: "No new codes to save",
        variant: "destructive",
      });
      return;
    }

    onSaveCodes(validCodes, description.trim());
    
    toast({
      title: "Success",
      description: `Successfully added ${validCodes.length} codes`,
    });

    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'already': return 'text-orange-600';
      case 'duplicate': return 'text-red-600';
      default: return 'text-green-600';
    }
  };

  if (showProcessed) {
    const invalidCodes = processedCodes.filter(item => item.status === 'already' || item.status === 'duplicate');
    const validCodes = processedCodes.filter(item => item.status === 'new');

    return (
      <div className="space-y-6 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div>
            <Button
              variant="outline"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg px-6 py-3 h-12"
              onClick={() => setShowProcessed(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Alert for invalid codes */}
        {invalidCodes.length > 0 && (
          <Alert variant="destructive" className="flex-shrink-0">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You have {invalidCodes.length} duplicate/already existing codes. Please delete them before saving.
            </AlertDescription>
          </Alert>
        )}

        {/* Title and Codes list */}
        <div className="space-y-4 flex-1 min-h-0">
          <h3 className="text-lg font-semibold text-center">Processed Codes</h3>
          
          <ScrollArea className="flex-1 h-[50vh] rounded-lg border">
            <div className="space-y-2 p-4">
              {processedCodes.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{item.code}</span>
                      <span className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    {item.status === 'already' && item.existingDate && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Added: {item.existingDate}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCode(item.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {/* Description at the bottom of scrollable area */}
              <div className="mt-8 pt-4 border-t">
                <div className="max-w-md mx-auto">
                  <Textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full min-h-[80px] resize-none"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Save Button - Fixed at bottom */}
        <div className="flex justify-center flex-shrink-0">
          <Button
            onClick={handleSave}
            disabled={invalidCodes.length > 0 || validCodes.length === 0}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Codes ({validCodes.length})
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Upload section */}
      <div className="text-center space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Upload text document</h3>
            <p className="text-muted-foreground">
              You can upload batch file, if you have more than 1 code for this product.
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div className="relative">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button
              variant="outline"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white border-blue-500 rounded-lg"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload file
            </Button>
          </div>

          {selectedFile && (
            <div className="text-sm text-center">
              <div className="font-medium">{selectedFile.name}</div>
              <div className="text-muted-foreground">
                Maximum file size 100 MB
              </div>
            </div>
          )}

          <Button
            onClick={processTxtFile}
            disabled={!selectedFile}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3"
          >
            Process TXT file
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BatchFileUpload;
