import { CalendarDays, MapPin } from "lucide-react";
import { reservations, properties } from "@/data/sampleData";

const completedBookings = reservations.filter((r) => r.guestId === "client1" && r.status === "completed");

export default function BookingHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Historique de séjours</h1>
        <p className="text-muted-foreground text-sm mt-1">Logements dans lesquels vous avez séjourné</p>
      </div>

      {completedBookings.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">Aucun séjour terminé</p>
          <p className="text-sm mt-1">Vos séjours passés apparaîtront ici.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedBookings.map((booking) => {
            const prop = properties.find((p) => p.id === booking.propertyId);
            if (!prop) return null;
            return (
              <div key={booking.id} className="glass-card overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground">{prop.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {prop.city}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <CalendarDays className="w-4 h-4" />
                    {booking.checkIn} → {booking.checkOut}
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                    <span className="status-badge bg-muted text-muted-foreground">Terminé</span>
                    <span className="font-bold text-foreground">€{booking.totalPrice}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
