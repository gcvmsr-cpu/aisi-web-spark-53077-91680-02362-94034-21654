import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddBalanceDialog = ({ open, onOpenChange }: AddBalanceDialogProps) => {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const usdtAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(usdtAddress);
    toast({
      title: "Address Copied",
      description: "USDT address copied to clipboard.",
    });
  };

  const handleConfirmPayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to add.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Initiated",
      description: `Please send $${amount} USDT to the address provided. Your balance will be updated once the payment is confirmed.`,
    });

    // Reset form and close dialog
    setAmount("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Balance</DialogTitle>
          <DialogDescription>
            Enter the amount and send USDT to our address
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="add-amount">Amount (USD)</Label>
            <Input
              id="add-amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="p-4 border rounded-lg bg-muted/30 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">USDT (BEP20)</p>
                <Badge variant="secondary">Recommended</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Send USDT to this address:</p>
                <div className="flex gap-2">
                  <Input
                    value={usdtAddress}
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleCopyAddress}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Network: BEP20 (Binance Smart Chain)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmPayment}>
            Confirm Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
