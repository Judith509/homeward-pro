import { useState, useEffect } from "react";
import { Search, Send, Home, ArrowLeft } from "lucide-react";
import { reservations, properties, owners } from "@/data/sampleData";
import { useSearchParams, useNavigate } from "react-router-dom";

interface ChatMessage {
  id: string;
  from: "client" | "owner";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  propertyCity: string;
  checkIn?: string;
  checkOut?: string;
  status: "interested" | "booked";
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: ChatMessage[];
}

// Build mock conversations from reservations + a "interested" one
const buildConversations = (): Conversation[] => {
  const clientReservations = reservations.filter((r) => r.guestId === "client1");
  const convs: Conversation[] = clientReservations
    .filter((r) => r.status === "confirmed" || r.status === "completed")
    .map((r) => {
      const prop = properties.find((p) => p.id === r.propertyId);
      const owner = owners.find((o) => o.propertyIds.includes(r.propertyId));
      return {
        id: `conv-${r.id}`,
        ownerId: owner?.id || "",
        ownerName: owner ? `${owner.firstName} ${owner.lastName}` : "Propriétaire",
        ownerEmail: owner?.email || "",
        propertyId: r.propertyId,
        propertyName: r.propertyName,
        propertyAddress: prop?.address || "",
        propertyCity: prop?.city || "",
        checkIn: r.checkIn,
        checkOut: r.checkOut,
        status: "booked" as const,
        lastMessage: "Bienvenue ! N'hésitez pas si vous avez des questions.",
        lastMessageTime: "30 mars, 14:00",
        unread: r.id === "r3" ? 2 : 0,
        messages: [
          { id: "1", from: "owner", text: "Bonjour ! Votre logement sera prêt dès 15h. Le code d'entrée est 4589B.", time: "15 mars, 10:30" },
          { id: "2", from: "client", text: "Merci beaucoup ! Nous arriverons vers 16h.", time: "15 mars, 11:00" },
          { id: "3", from: "owner", text: "Bienvenue ! N'hésitez pas si vous avez des questions.", time: "30 mars, 14:00" },
        ],
      };
    });

  return convs;
};

export default function ClientMessages() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const propertyParam = searchParams.get("property");

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const convs = buildConversations();
    // If coming from a property detail with ?property=id, add a new "interested" conversation
    if (propertyParam && !convs.some((c) => c.propertyId === propertyParam && c.status === "interested")) {
      const prop = properties.find((p) => p.id === propertyParam);
      const owner = owners.find((o) => o.propertyIds.includes(propertyParam));
      if (prop && owner) {
        convs.unshift({
          id: `conv-new-${propertyParam}`,
          ownerId: owner.id,
          ownerName: `${owner.firstName} ${owner.lastName}`,
          ownerEmail: owner.email,
          propertyId: prop.id,
          propertyName: prop.name,
          propertyAddress: prop.address,
          propertyCity: prop.city,
          status: "interested",
          lastMessage: "Nouvelle conversation",
          lastMessageTime: "Maintenant",
          unread: 0,
          messages: [],
        });
      }
    }
    return convs;
  });

  const [selectedId, setSelectedId] = useState<string>(() => {
    if (propertyParam) {
      const match = conversations.find((c) => c.propertyId === propertyParam);
      return match?.id || conversations[0]?.id || "";
    }
    return conversations[0]?.id || "";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(!!propertyParam);

  const filtered = conversations.filter(
    (c) =>
      c.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConv = conversations.find((c) => c.id === selectedId);

  const handleSend = () => {
    if (!messageText.trim() || !activeConv) return;
    const now = new Date();
    const timeStr = `${now.getDate()} mars, ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      from: "client",
      text: messageText.trim(),
      time: timeStr,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, lastMessageTime: timeStr }
          : c
      )
    );
    setMessageText("");
  };

  const selectConversation = (id: string) => {
    setSelectedId(id);
    setShowMobileChat(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messagerie</h1>
        <p className="text-muted-foreground text-sm mt-1">Vos conversations avec les propriétaires</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0 glass-card overflow-hidden" style={{ minHeight: "520px" }}>
        {/* Left: Conversation list */}
        <div className={`border-r border-border flex flex-col ${showMobileChat ? "hidden lg:flex" : "flex"}`}>
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher propriétaire ou logement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">Aucune conversation</p>
            )}
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => selectConversation(c.id)}
                className={`w-full text-left p-4 border-b border-border transition-colors ${
                  selectedId === c.id ? "bg-primary/5" : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                    {c.ownerName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground truncate">{c.ownerName}</p>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{c.lastMessageTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Home className="w-3 h-3 text-primary flex-shrink-0" />
                      <p className="text-xs text-primary font-medium truncate">{c.propertyName}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                      {c.unread > 0 && (
                        <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Chat area */}
        <div className={`lg:col-span-2 flex flex-col ${!showMobileChat ? "hidden lg:flex" : "flex"}`}>
          {activeConv ? (
            <>
              {/* Header */}
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="lg:hidden p-1 rounded hover:bg-muted"
                  >
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                    {activeConv.ownerName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{activeConv.ownerName}</p>
                    <p className="text-xs text-muted-foreground">{activeConv.ownerEmail}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Home className="w-3.5 h-3.5 text-primary" />
                      <p className="text-sm font-medium text-primary">{activeConv.propertyName}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{activeConv.propertyAddress}, {activeConv.propertyCity}</p>
                    {activeConv.status === "booked" && activeConv.checkIn ? (
                      <p className="text-xs text-muted-foreground">{activeConv.checkIn} → {activeConv.checkOut}</p>
                    ) : (
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-xs font-medium bg-accent text-accent-foreground">Intéressé</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 px-6 py-6 overflow-y-auto space-y-3" style={{ minHeight: "300px" }}>
                {activeConv.messages.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-sm text-muted-foreground">Envoyez votre premier message au propriétaire !</p>
                  </div>
                )}
                {activeConv.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm ${
                        msg.from === "client"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.from === "client" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="px-6 py-4 border-t border-border flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Écrire un message..."
                  className="flex-1 px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Sélectionnez une conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
