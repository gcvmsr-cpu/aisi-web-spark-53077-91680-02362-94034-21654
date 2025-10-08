
import { Eye, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Code {
  id: number;
  code: string;
  status: string;
  dateAdded: string;
  soldDate: string | null;
  description?: string;
}

interface ViewCodesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  codes: Code[];
}

const ViewCodesDialog = ({ open, onOpenChange, productName, codes }: ViewCodesDialogProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const copyAllCodes = async () => {
    try {
      const allCodes = codes.map(c => c.code).join('\n');
      await navigator.clipboard.writeText(allCodes);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy all codes:', err);
    }
  };

  const totalCount = codes.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            View All Codes - {productName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Total codes: {totalCount}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={copyAllCodes}
            >
              {copiedAll ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied All
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </>
              )}
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map((codeItem) => (
                  <TableRow key={codeItem.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono">{codeItem.code}</TableCell>
                    <TableCell>{codeItem.description || '-'}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(codeItem.code)}
                      >
                        {copiedCode === codeItem.code ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCodesDialog;
