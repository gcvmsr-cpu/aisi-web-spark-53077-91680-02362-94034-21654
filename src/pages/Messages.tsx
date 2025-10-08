import { useState } from "react";
import { Send, MoreVertical, Smile, Flag, Ban, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data for conversations - extended list for pagination
const allConversations = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, is the Amazon card still available?",
    time: "2m ago",
    unread: 2,
    avatar: "JD",
    online: true,
    timestamp: Date.now() - 2 * 60 * 1000
  },
  {
    id: 2,
    name: "Sarah Smith",
    lastMessage: "Thanks for the quick delivery!",
    time: "1h ago",
    unread: 0,
    avatar: "SS",
    online: false,
    timestamp: Date.now() - 60 * 60 * 1000
  },
  {
    id: 3,
    name: "Mike Wilson",
    lastMessage: "Can you provide more details about the iTunes card?",
    time: "3h ago",
    unread: 1,
    avatar: "MW",
    online: true,
    timestamp: Date.now() - 3 * 60 * 60 * 1000
  },
  {
    id: 4,
    name: "Emma Johnson",
    lastMessage: "Perfect transaction, highly recommended!",
    time: "1d ago",
    unread: 0,
    avatar: "EJ",
    online: false,
    timestamp: Date.now() - 24 * 60 * 60 * 1000
  },
  {
    id: 5,
    name: "Alex Turner",
    lastMessage: "When will you have Google Play cards?",
    time: "2d ago",
    unread: 1,
    avatar: "AT",
    online: false,
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000
  },
  {
    id: 6,
    name: "Lisa Chen",
    lastMessage: "Great service, will buy again!",
    time: "3d ago",
    unread: 0,
    avatar: "LC",
    online: true,
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000
  },
  {
    id: 7,
    name: "David Brown",
    lastMessage: "Do you accept PayPal?",
    time: "4d ago",
    unread: 0,
    avatar: "DB",
    online: false,
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000
  },
  {
    id: 8,
    name: "Maria Garcia",
    lastMessage: "The Steam card worked perfectly!",
    time: "5d ago",
    unread: 0,
    avatar: "MG",
    online: false,
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000
  },
  {
    id: 9,
    name: "Tom Wilson",
    lastMessage: "What's your minimum order?",
    time: "6d ago",
    unread: 0,
    avatar: "TW",
    online: false,
    timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000
  },
  {
    id: 10,
    name: "Anna Lee",
    lastMessage: "Fast delivery, thank you!",
    time: "1w ago",
    unread: 0,
    avatar: "AL",
    online: false,
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000
  }
];

// Sort conversations by timestamp (latest first)
const sortedConversations = allConversations.sort((a, b) => b.timestamp - a.timestamp);

// Mock messages for selected conversation
const mockMessages = [
  {
    id: 1,
    sender: "other",
    message: "Hi! I'm interested in the Amazon gift card",
    time: "10:30 AM"
  },
  {
    id: 2,
    sender: "me",
    message: "Hello! Yes, it's available. Which denomination are you looking for?",
    time: "10:32 AM"
  },
  {
    id: 3,
    sender: "other",
    message: "I need a $50 Amazon card. What's your rate?",
    time: "10:35 AM"
  },
  {
    id: 4,
    sender: "me",
    message: "The rate is 0.85 BTC per dollar. So it would be 0.0425 BTC for $50",
    time: "10:37 AM"
  },
  {
    id: 5,
    sender: "other",
    message: "That sounds good. How do we proceed?",
    time: "10:40 AM"
  }
];

// Common emojis for the emoji picker
const commonEmojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
  "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "😣", "😖",
  "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯",
  "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔",
  "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦",
  "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴",
  "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿",
  "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖",
  "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾",
  "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞",
  "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍",
  "👎", "👊", "✊", "🤛", "🤜", "👏", "🙌", "👐", "🤝", "🙏",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
  "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️",
  "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐",
  "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(sortedConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const conversationsPerPage = 5;
  const totalPages = Math.ceil(sortedConversations.length / conversationsPerPage);
  
  const getCurrentPageConversations = () => {
    const startIndex = (currentPage - 1) * conversationsPerPage;
    const endIndex = startIndex + conversationsPerPage;
    return sortedConversations.slice(startIndex, endIndex);
  };
  
  const currentConversations = getCurrentPageConversations();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const handleReport = () => {
    console.log("Reporting user:", selectedConversation.name);
    // Add report logic here
  };

  const handleBlock = () => {
    console.log("Blocking user:", selectedConversation.name);
    // Add block logic here
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
                {/* Conversations List */}
                <div className="border rounded-lg bg-card flex flex-col">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Conversations</h2>
                  </div>
                  
                   <ScrollArea className="flex-1">
                    <div className="p-2">
                      {currentConversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          onClick={() => setSelectedConversation(conversation)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                            selectedConversation.id === conversation.id ? "bg-muted" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center">
                                <span className="text-sm font-medium">{conversation.avatar}</span>
                              </Avatar>
                              {conversation.online && (
                                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                                <span className="text-xs text-muted-foreground">{conversation.time}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                                {conversation.unread > 0 && (
                                  <Badge className="h-5 min-w-5 text-xs bg-red-500 text-white">
                                    {conversation.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Pagination */}
                  <div className="p-4 border-t">
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="h-8 w-8 p-0"
                        >
                          {page}
                        </Button>
                      ))}
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-2 border rounded-lg bg-card flex flex-col">
                  {/* Chat Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center">
                            <span className="text-sm font-medium">{selectedConversation.avatar}</span>
                          </Avatar>
                          {selectedConversation.online && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div>
                          <h2 className="font-semibold">{selectedConversation.name}</h2>
                          <p className="text-sm text-muted-foreground">
                            {selectedConversation.online ? "Online" : "Last seen 2h ago"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 p-2">
                            <div className="space-y-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="w-full justify-start text-orange-600"
                                onClick={handleReport}
                              >
                                <Flag className="h-4 w-4 mr-2" />
                                Report User
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="w-full justify-start text-destructive"
                                onClick={handleBlock}
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                Block User
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {mockMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-md px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                              message.sender === "me"
                                ? "bg-message-blue text-message-blue-foreground hover:bg-message-blue-hover"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === "me" ? "text-message-blue-foreground/70" : "text-muted-foreground/70"
                            }`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-end gap-2">
                      <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                            <Smile className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-2" side="top">
                          <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto">
                            {commonEmojis.map((emoji, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                className="h-8 w-8 p-0 text-lg hover:bg-muted"
                                onClick={() => addEmoji(emoji)}
                              >
                                {emoji}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      <div className="flex-1">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="min-h-[40px]"
                        />
                      </div>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="h-10 w-10 p-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <AppSidebar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
      </div>
    </SidebarProvider>
  );
}
