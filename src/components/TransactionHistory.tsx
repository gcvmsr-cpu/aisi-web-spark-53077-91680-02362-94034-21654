import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardViewCodesDialog from "@/components/DashboardViewCodesDialog";
import { useState } from "react";

interface Transaction {
  id: string;
  activity: "Buy" | "Sell";
  amount: string;
  user: string;
  dateTime: string;
  productName: string;
  productPrice: string;
  quantity: number;
  paymentProvider: string;
  status: "Success" | "Hold";
  codes?: string[];
  fundsAvailable?: string;
}

const sampleTransactions: Transaction[] = [
  {
    id: "45400836",
    activity: "Buy",
    amount: "-5.37",
    user: "GCV",
    dateTime: "2025-10-07T16:23:00",
    productName: "Roblox Gift Card - 400 Robux GLOBAL",
    productPrice: "5.30",
    quantity: 1,
    paymentProvider: "Buysellvouchers USDT (BEP20)",
    status: "Success",
    codes: ["#1"],
  },
  {
    id: "45400785",
    activity: "Sell",
    amount: "+165.00",
    user: "darkprince",
    dateTime: "2025-10-07T16:14:00",
    productName: "Roblox Digital Card - 400 Robux Global",
    productPrice: "5.50",
    quantity: 30,
    paymentProvider: "Buysellvouchers USDT (TRC20)",
    status: "Hold",
    codes: ["#1", "#2", "#3"],
    fundsAvailable: "Hold 36h 0m",
  },
];

export function TransactionHistory() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const time = date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return `${time}, ${formattedDate}`;
  };

  const generateCodesForTransaction = (transaction: Transaction) => {
    if (!transaction.codes) return [];
    
    return transaction.codes.map((code, idx) => ({
      id: parseInt(`${transaction.id}${idx}`),
      code: `CODE-${transaction.id}-${idx + 1}`,
      status: transaction.status === "Success" ? "Available" : "Sold",
      dateAdded: transaction.dateTime,
      soldDate: transaction.status === "Success" ? null : transaction.dateTime,
    }));
  };

  return (
    <section className="mb-16">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold text-muted-foreground">ID</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Activity</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Sum</TableHead>
              <TableHead className="font-semibold text-muted-foreground">User</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Date/Time</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Details</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{transaction.id}</TableCell>
                
                <TableCell>
                  <span className={transaction.activity === "Buy" ? "text-blue-500 font-medium" : "text-blue-500 font-medium"}>
                    {transaction.activity}
                  </span>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className={`font-semibold ${transaction.activity === "Buy" ? "text-foreground" : "text-green-500"}`}>
                      {transaction.amount} USD
                    </span>
                    {transaction.activity === "Sell" && (
                      <Button variant="destructive" size="sm" className="w-fit text-xs">
                        Refund
                      </Button>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  <span className="underline font-medium">{transaction.user}</span>
                </TableCell>
                
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {formatDateTime(transaction.dateTime)}
                </TableCell>
                
                <TableCell>
                  <div className="space-y-2 max-w-md">
                    <p className="font-semibold underline text-foreground">{transaction.productName}</p>
                    <p className="text-sm text-muted-foreground">Product price: <span className="font-medium">{transaction.productPrice} USD</span></p>
                    {transaction.codes && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTransaction(transaction)}
                        className="mt-1"
                      >
                        View codes ({transaction.codes.length})
                      </Button>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  {transaction.status === "Success" ? (
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                      Success
                    </Badge>
                  ) : (
                    <span className="text-blue-500 font-medium">{transaction.fundsAvailable}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedTransaction && (
        <DashboardViewCodesDialog
          open={!!selectedTransaction}
          onOpenChange={(open) => !open && setSelectedTransaction(null)}
          productName={selectedTransaction.productName}
          codes={generateCodesForTransaction(selectedTransaction)}
        />
      )}
    </section>
  );
}
