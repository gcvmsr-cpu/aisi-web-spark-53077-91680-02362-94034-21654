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
import { useToast } from "@/hooks/use-toast";

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance: number;
}

export const WithdrawDialog = ({ open, onOpenChange, currentBalance }: WithdrawDialogProps) => {
  const [amount, setAmount] = useState("");
  const [usdtAddress, setUsdtAddress] = useState("");
  const { toast } = useToast();

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    
    if (!amount || withdrawAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive"
      });
      return;
    }

    if (withdrawAmount > currentBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance to withdraw this amount.",
        variant: "destructive"
      });
      return;
    }

    if (!usdtAddress || usdtAddress.trim() === "") {
      toast({
        title: "Invalid Address",
        description: "Please enter your USDT BEP20 address.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Withdrawal Initiated",
      description: `Withdrawing $${withdrawAmount} to your USDT address. Please wait for confirmation.`,
    });

    // Reset form and close dialog
    setAmount("");
    setUsdtAddress("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Enter the amount you want to withdraw and your USDT BEP20 address
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount (USD)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Available balance: ${currentBalance.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="usdt-address">USDT BEP20 Address</Label>
            <Input
              id="usdt-address"
              type="text"
              placeholder="Enter your USDT BEP20 address"
              value={usdtAddress}
              onChange={(e) => setUsdtAddress(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Network: BEP20 (Binance Smart Chain)
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleWithdraw}>
            Confirm Withdrawal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
