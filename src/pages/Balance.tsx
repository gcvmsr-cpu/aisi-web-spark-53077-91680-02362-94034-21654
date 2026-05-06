import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Badge } from "@/components/ui/badge";
import { WithdrawDialog } from "@/components/WithdrawDialog";
import { AddBalanceDialog } from "@/components/AddBalanceDialog";

const Balance = () => {
  const [balance] = useState(150.00);
  const [transactions] = useState([
    { id: 1, type: "deposit", amount: 100, date: "2024-01-15T14:30:00", status: "completed" },
    { id: 2, type: "deposit", amount: 50, date: "2024-01-10T09:15:00", status: "completed" },
    { id: 3, type: "withdraw", amount: 25, date: "2024-01-05T16:45:00", status: "pending" },
    { id: 4, type: "deposit", amount: 200, date: "2024-01-01T11:20:00", status: "completed" },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [addBalanceDialogOpen, setAddBalanceDialogOpen] = useState(false);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return `${time} ${formattedDate}`;
  };


  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground w-full">
        <div className="flex w-full">
          {/* Main Content */}
          <main className="flex-1 min-w-0 p-6 lg:p-8">
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

              <div className="space-y-6">
                {/* Current Balance Card */}
                <Card>
                  <CardContent className="pt-6">
                    {/* Current Balance Display */}
                    <div className="p-6 border rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                      <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
                      <p className="text-4xl font-bold mb-4">${balance.toFixed(2)}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setWithdrawDialogOpen(true)}>
                          Withdraw
                        </Button>
                        <Button size="sm" onClick={() => setAddBalanceDialogOpen(true)}>
                          Add Balance
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>View all your balance transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {transactions.length > 0 ? (
                      <div className="space-y-2">
                        {transactions.map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              {transaction.type === 'deposit' ? (
                                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                              ) : (
                                <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20">
                                  <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium capitalize">{transaction.type}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{formatDateTime(transaction.date)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <p className={`text-lg font-semibold ${transaction.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                              </p>
                              <Badge variant={transaction.status === 'completed' ? 'secondary' : 'outline'}>
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No transactions yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <AppSidebar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
      </div>

      {/* Dialogs */}
      <WithdrawDialog 
        open={withdrawDialogOpen} 
        onOpenChange={setWithdrawDialogOpen}
        currentBalance={balance}
      />
      <AddBalanceDialog 
        open={addBalanceDialogOpen} 
        onOpenChange={setAddBalanceDialogOpen}
      />
    </SidebarProvider>
  );
};

export default Balance;
