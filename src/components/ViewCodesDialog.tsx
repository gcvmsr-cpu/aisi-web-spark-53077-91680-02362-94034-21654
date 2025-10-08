
import { Eye, Copy, Check, Trash2 } from "lucide-react";
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
  onDeleteCode: (codeId: number) => void;
}

const ViewCodesDialog = ({ open, onOpenChange, productName, codes, onDeleteCode }: ViewCodesDialogProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Calculate actual counts from codes data
  const availableCount = codes.filter(c => c.status === 'Available').length;
  const soldCount = codes.filter(c => c.status === 'Sold').length;
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
              Total codes: {totalCount} | Available: {availableCount} | Sold: {soldCount}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Code</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Date Added</TableHead>
                  <TableHead className="text-center">Sold Date</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map((codeItem) => (
                  <TableRow key={codeItem.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono">{codeItem.code}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        codeItem.status === 'Available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {codeItem.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDateTime(codeItem.dateAdded)}
                    </TableCell>
                    <TableCell className="text-center">
                      {codeItem.soldDate ? formatDateTime(codeItem.soldDate) : '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(codeItem.code)}
                          disabled={codeItem.status === 'Sold'}
                        >
                          {copiedCode === codeItem.code ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteCode(codeItem.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
