import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Trash2, Shield, Mail, MessageCircle, Key, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Settings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [telegramNotifications, setTelegramNotifications] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [blockedUsers] = useState([
    { id: 1, name: "user123", email: "user123@example.com" },
    { id: 2, name: "spammer456", email: "spam@example.com" },
    { id: 3, name: "baduser789", email: "bad@example.com" }
  ]);
  
  const { toast } = useToast();

  const handlePasswordChange = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleUnblockUser = (userId: number, userName: string) => {
    toast({
      title: "User Unblocked",
      description: `${userName} has been unblocked successfully.`,
    });
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been disabled." 
        : "Two-factor authentication has been enabled.",
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  
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
                {/* Password Change Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      Change Password
                    </CardTitle>
                    <CardDescription>Update your account password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button onClick={handlePasswordChange} className="w-full">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Configure how you want to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div className="space-y-1">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                        <div className="space-y-1">
                          <Label>Telegram Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via Telegram
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={telegramNotifications}
                        onCheckedChange={setTelegramNotifications}
                      />
                    </div>
                    
                    {telegramNotifications && (
                      <div className="ml-8 space-y-2">
                        <Label htmlFor="telegram-token">Telegram Bot Token</Label>
                        <Input
                          id="telegram-token"
                          placeholder="Enter your Telegram bot token"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Two-Factor Authentication */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Two-Factor Authentication (2FA)
                    </CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Google Authenticator</Label>
                        <p className="text-sm text-muted-foreground">
                          Use Google Authenticator app for 2FA
                        </p>
                      </div>
                      <Switch
                        checked={twoFactorEnabled}
                        onCheckedChange={handleEnable2FA}
                      />
                    </div>
                    
                    {twoFactorEnabled && (
                      <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                        <p className="text-sm text-muted-foreground">
                          Scan this QR code with your Google Authenticator app:
                        </p>
                        <div className="w-32 h-32 bg-white border-2 border-dashed border-muted-foreground/50 rounded-lg flex items-center justify-center">
                          <p className="text-xs text-muted-foreground">QR Code</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Backup Code</Label>
                          <Input
                            value="ABCD-EFGH-IJKL-MNOP"
                            readOnly
                            className="font-mono text-sm"
                          />
                          <p className="text-xs text-muted-foreground">
                            Save this backup code in a safe place
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Block List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Blocked Users</CardTitle>
                    <CardDescription>Manage your blocked users list</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {blockedUsers.length > 0 ? (
                      <div className="space-y-3">
                        {blockedUsers.map((user) => (
                          <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-sm font-medium">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="destructive">Blocked</Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUnblockUser(user.id, user.name)}
                              >
                                Unblock
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Trash2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No blocked users</p>
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

export default Settings;