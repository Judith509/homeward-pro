import { useState } from "react";
import { CalendarDays, Users as UsersIcon, MessageCircle, Send, ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { reservations as initialReservations, properties, owners, type Reservation } from "@/data/sampleData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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

interface ChatMessage {
  id: string;
  from: "client" | "owner";
  text: string;
  time: string;
}

const mockMessages: Record<string, ChatMessage[]> = {
  r1: [
    { id: "1", from: "owner", text: "Bonjour ! Votre logement sera prêt dès 15h. Le code d'entrée est 4589B.", time: "15 mars, 10:30" },
    { id: "2", from: "client", text: "Merci beaucoup ! Nous arriverons vers 16h.", time: "15 mars, 11:00" },
    { id: "3", from: "owner", text: "Parfait, bon voyage !", time: "15 mars, 11:15" },
  ],
  r3: [
    { id: "1", from: "owner", text: "Bienvenue ! N'hésitez pas si vous avez des questions sur le logement.", time: "28 mars, 14:00" },
    { id: "2", from: "client", text: "Merci ! Où se trouve le parking ?", time: "28 mars, 14:30" },
    { id: "3", from: "owner", text: "Le parking est au sous-sol, place n°12. Le badge est sur le comptoir.", time: "28 mars, 14:45" },
  ],
};



export default function MyBookings() {
  const [bookings, setBookings] = useState<Reservation[]>(
    initialReservations.filter((r) => r.guestId === "client1")
  );
  const [openChat, setOpenChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(mockMessages);
  const [inputText, setInputText] = useState("");

  const toggleChat = (id: string) => {
    setOpenChat((prev) => (prev === id ? null : id));
    setInputText("");
  };

  const handleCancel = (reservationId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === reservationId ? { ...b, status: "cancelled" } : b))
    );
    toast.success("Réservation annulée");
  };

  const handleSend = (reservationId: string) => {
    if (!inputText.trim()) return;
    const now = new Date();
    const timeStr = `${now.getDate()} mars, ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    const newMsg: ChatMessage = { id: `msg-${Date.now()}`, from: "client", text: inputText.trim(), time: timeStr };
    setChatMessages((prev) => ({
      ...prev,
      [reservationId]: [...(prev[reservationId] || []), newMsg],
    }));
    setInputText("");
  };

  const getOwnerName = (propertyId: string) => {
    const owner = owners.find((o) => o.propertyIds.includes(propertyId));
    return owner ? `${owner.firstName} ${owner.lastName}` : "Propriétaire";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mes réservations</h1>
        <p className="text-muted-foreground text-sm mt-1">{bookings.length} réservation(s)</p>
      </div>

      <div className="space-y-3">
        {bookings.map((r) => {
          const isConfirmed = r.status === "confirmed";
          const isChatOpen = openChat === r.id;
          const messages = chatMessages[r.id] || [];
          const ownerName = getOwnerName(r.propertyId);

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
                {isConfirmed && (
                  <button
                    onClick={() => toggleChat(r.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Message</span>
                    {isChatOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              {/* Inline chat for confirmed reservations */}
              {isConfirmed && isChatOpen && (
                <div className="border-t border-border bg-muted/30">
                  <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      Conversation avec <span className="text-primary">{ownerName}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{r.propertyName}</p>
                  </div>

                  <div className="px-5 py-4 space-y-3 max-h-[300px] overflow-y-auto">
                    {messages.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Aucun message. Envoyez le premier !
                      </p>
                    )}
                    {messages.map((msg) => (
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

                  <div className="px-5 py-3 border-t border-border flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend(r.id)}
                      placeholder="Écrire un message..."
                      className="flex-1 px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                    />
                    <button
                      onClick={() => handleSend(r.id)}
                      className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
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
