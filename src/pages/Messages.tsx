import { useState } from "react";
import { Send, Home, Search } from "lucide-react";
import { reservations, properties } from "@/data/sampleData";


// Build conversations grouped by property for the owner
const confirmedReservations = reservations.filter((r) => r.status === "confirmed" || r.status === "completed");
const conversations = confirmedReservations.map((r) => {
  const property = properties.find((p) => p.id === r.propertyId);
  return {
    ...r,
    propertyCity: property?.city || "",
    propertyAddress: property?.address || "",
  };
});

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]?.id || "");
  const [messageText, setMessageText] = useState("");
  const [searchGuest, setSearchGuest] = useState("");

  const filteredConversations = conversations.filter(
    (c) =>
      c.guestName.toLowerCase().includes(searchGuest.toLowerCase()) ||
      c.propertyName.toLowerCase().includes(searchGuest.toLowerCase())
  );

  const activeConv = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">Communication avec les clients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation List */}
          <div className="glass-card p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un client ou logement..."
                value={searchGuest}
                onChange={(e) => setSearchGuest(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-1">
              {filteredConversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedConversation(c.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedConversation === c.id
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted border border-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                      {c.guestName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground truncate">{c.guestName}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Home className="w-3 h-3 text-primary flex-shrink-0" />
                        <p className="text-xs text-primary font-medium truncate">{c.propertyName}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.propertyCity} · {c.checkIn} → {c.checkOut}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 glass-card flex flex-col">
            {activeConv ? (
              <>
                {/* Header with property info */}
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{activeConv.guestName}</p>
                      <p className="text-xs text-muted-foreground">{activeConv.guestEmail}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Home className="w-3.5 h-3.5 text-primary" />
                        <p className="text-sm font-medium text-primary">{activeConv.propertyName}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activeConv.propertyAddress}, {activeConv.propertyCity}</p>
                      <p className="text-xs text-muted-foreground">{activeConv.checkIn} → {activeConv.checkOut}</p>
                    </div>
                  </div>
                </div>

                {/* Messages placeholder */}
                <div className="flex-1 px-6 py-6 min-h-[250px] flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Les messages apparaîtront ici.</p>
                </div>


                {/* Input */}
                <div className="px-6 py-4 border-t border-border flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Écrire un message..."
                    className="flex-1 px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                  />
                  <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6">
                <p className="text-muted-foreground text-sm">Sélectionnez une conversation</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
