import { useState } from "react";
import { CalendarDays, Users as UsersIcon, MessageCircle, Send, X } from "lucide-react";
import { reservations } from "@/data/sampleData";

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  cancelled: "bg-destructive/10 text-destructive",
  completed: "bg-muted text-muted-foreground",
};

const statusLabels: Record<string, string> = {
  confirmed: "Confirmée",
  pending: "En attente",
  cancelled: "Annulée",
  completed: "Terminée",
};

const myBookings = reservations.filter((r) => r.guestId === "client1");

// Mock conversation data
const mockConversations: Record<string, { from: "guest" | "owner"; text: string; time: string }[]> = {
  r1: [
    { from: "owner", text: "Bonjour ! Votre logement sera prêt dès 15h. Le code d'entrée est 4589B.", time: "15 mars, 10:30" },
    { from: "guest", text: "Merci beaucoup ! Nous arriverons vers 16h.", time: "15 mars, 11:00" },
  ],
  r3: [
    { from: "owner", text: "Bienvenue ! N'hésitez pas si vous avez des questions.", time: "22 mars, 09:00" },
  ],
};

export default function MyBookings() {
  const [openChat, setOpenChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mes réservations</h1>
        <p className="text-muted-foreground text-sm mt-1">{myBookings.length} réservation(s)</p>
      </div>

      <div className="space-y-3">
        {myBookings.map((r) => {
          const isOpen = openChat === r.id;
          const messages = mockConversations[r.id] || [];
          const canChat = r.status === "confirmed";

          return (
            <div key={r.id} className="glass-card overflow-hidden">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{r.propertyName}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <CalendarDays className="w-4 h-4" />
                    {r.checkIn} → {r.checkOut}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UsersIcon className="w-4 h-4" /> {r.guests} voyageur(s)
                </div>
                <span className={`status-badge ${statusColors[r.status]}`}>{statusLabels[r.status]}</span>
                <p className="text-lg font-bold text-foreground min-w-[80px] text-right">€{r.totalPrice}</p>
                {canChat && (
                  <button
                    onClick={() => setOpenChat(isOpen ? null : r.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isOpen ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Messagerie
                  </button>
                )}
              </div>

              {/* Inline chat panel */}
              {isOpen && canChat && (
                <div className="border-t border-border bg-muted/30">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">Conversation — {r.propertyName}</p>
                    <button onClick={() => setOpenChat(null)} className="p-1 rounded hover:bg-muted">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="px-5 py-4 space-y-3 max-h-60 overflow-y-auto">
                    {messages.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">Aucun message. Envoyez le premier !</p>
                    )}
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.from === "guest" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm ${
                            msg.from === "guest"
                              ? "bg-primary text-primary-foreground rounded-br-sm"
                              : "bg-secondary text-foreground rounded-bl-sm"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.from === "guest" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 py-3 border-t border-border flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Écrire un message..."
                      className="flex-1 px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                    />
                    <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
