import { CalendarDays, Users as UsersIcon } from "lucide-react";
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

// Show bookings for client1 (Sophie Martin)
const myBookings = reservations.filter((r) => r.guestId === "client1");

export default function MyBookings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mes réservations</h1>
        <p className="text-muted-foreground text-sm mt-1">{myBookings.length} réservation(s)</p>
      </div>

      <div className="space-y-3">
        {myBookings.map((r) => (
          <div key={r.id} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
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
          </div>
        ))}
      </div>
    </div>
  );
}
