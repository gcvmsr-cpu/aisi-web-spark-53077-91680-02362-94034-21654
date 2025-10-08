import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Ticket, Send, Clock, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SupportTicket {
  id: string;
  category: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "resolved";
  createdAt: string;
}

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TKT-001234",
      category: "Account",
      subject: "Unable to reset password",
      description: "I'm having trouble resetting my password...",
      status: "in-progress",
      createdAt: "2025-01-15"
    },
    {
      id: "TKT-001235",
      category: "Transaction",
      subject: "Payment not processed",
      description: "My payment was deducted but order not confirmed...",
      status: "open",
      createdAt: "2025-01-14"
    }
  ]);

  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    category: "",
    subject: "",
    description: ""
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTicket.category || !newTicket.subject || !newTicket.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const ticketId = `TKT-${Math.random().toString().substr(2, 6)}`;
    const ticket: SupportTicket = {
      id: ticketId,
      category: newTicket.category,
      subject: newTicket.subject,
      description: newTicket.description,
      status: "open",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTickets(prev => [ticket, ...prev]);
    setNewTicket({ category: "", subject: "", description: "" });
    setIsCreatingTicket(false);

    toast({
      title: "Ticket Created",
      description: `Your support ticket ${ticketId} has been created successfully.`
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "in-progress":
        return <Ticket className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground w-full">
        <div className="flex w-full">
          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8">
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
                {/* Header */}
                <div className="flex items-center justify-end">
                  <Button 
                    onClick={() => setIsCreatingTicket(!isCreatingTicket)}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    New Ticket
                  </Button>
                </div>

                {/* Create New Ticket Form */}
                {isCreatingTicket && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Support Ticket</CardTitle>
                      <CardDescription>
                        Please select a category and describe your issue in detail
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select 
                              value={newTicket.category} 
                              onValueChange={(value) => setNewTicket(prev => ({ ...prev, category: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="account">Account Related</SelectItem>
                                <SelectItem value="transaction">Transaction Issues</SelectItem>
                                <SelectItem value="technical">Technical Support</SelectItem>
                                <SelectItem value="billing">Billing & Payments</SelectItem>
                                <SelectItem value="feature">Feature Request</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject *</Label>
                            <Input
                              id="subject"
                              placeholder="Brief description of your issue"
                              value={newTicket.subject}
                              onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description *</Label>
                          <Textarea
                            id="description"
                            placeholder="Please provide detailed information about your issue..."
                            className="min-h-[120px]"
                            value={newTicket.description}
                            onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setIsCreatingTicket(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">
                            Create Ticket
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Support Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                          <Clock className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Open Tickets</p>
                          <p className="text-2xl font-bold">{tickets.filter(t => t.status === "open").length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <Ticket className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">In Progress</p>
                          <p className="text-2xl font-bold">{tickets.filter(t => t.status === "in-progress").length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Resolved</p>
                          <p className="text-2xl font-bold">{tickets.filter(t => t.status === "resolved").length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tickets List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Support Tickets</CardTitle>
                    <CardDescription>
                      Track the status of your support requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tickets.length === 0 ? (
                      <div className="text-center py-12">
                        <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No tickets yet</h3>
                        <p className="text-muted-foreground">
                          Create your first support ticket to get help with any issues
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {tickets.map((ticket, index) => (
                          <div key={ticket.id}>
                            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge variant="outline" className="font-mono">
                                    {ticket.id}
                                  </Badge>
                                  <Badge className={getStatusColor(ticket.status)}>
                                    <div className="flex items-center gap-1">
                                      {getStatusIcon(ticket.status)}
                                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('-', ' ')}
                                    </div>
                                  </Badge>
                                  <Badge variant="secondary">
                                    {ticket.category}
                                  </Badge>
                                </div>
                                <h4 className="font-semibold text-foreground mb-1">
                                  {ticket.subject}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                  {ticket.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Created on {new Date(ticket.createdAt).toLocaleDateString('en-GB')}
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                            {index < tickets.length - 1 && <Separator className="my-4" />}
                          </div>
                        ))}
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
    </SidebarProvider>
  );
};

export default Support;