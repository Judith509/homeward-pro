import { useNavigate } from "react-router-dom";
import { Home, CalendarDays, Star, Search, History, ArrowRight } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { reservations, properties, reviews } from "@/data/sampleData";
import { Button } from "@/components/ui/button";

const myBookings = reservations.filter((r) => r.guestId === "client1");
const activeBookings = myBookings.filter((r) => r.status === "confirmed" || r.status === "pending");

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { setRole, userName } = useRole();

  const handleBecomeHost = () => {
    setRole("owner");
    navigate("/dashboard");
  };

  const myReviews = reviews.filter((r) => r.clientId === "client1");

  return (
    <div className="space-y-6">
      {/* Header with Devenir hôte */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mon Espace</h1>
          <p className="text-muted-foreground text-sm mt-1">Bienvenue, {userName} 👋</p>
        </div>
        <Button onClick={handleBecomeHost} className="gap-2">
          <Home className="w-4 h-4" />
          Devenir hôte
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{activeBookings.length}</p>
            <p className="text-sm text-muted-foreground">Réservation(s) active(s)</p>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <History className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{myBookings.length}</p>
            <p className="text-sm text-muted-foreground">Réservation(s) totale(s)</p>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{myReviews.length}</p>
            <p className="text-sm text-muted-foreground">Avis laissé(s)</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Accès rapide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Explorer les logements", icon: Search, path: "/browse" },
            { label: "Mes réservations", icon: CalendarDays, path: "/my-bookings" },
            { label: "Historique", icon: History, path: "/history" },
            { label: "Mes avis", icon: Star, path: "/my-reviews" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="glass-card p-4 flex items-center gap-3 hover:bg-accent/50 transition-colors text-left"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active bookings preview */}
      {activeBookings.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Réservations en cours</h2>
          <div className="space-y-3">
            {activeBookings.map((r) => (
              <div key={r.id} className="glass-card p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{r.propertyName}</p>
                  <p className="text-sm text-muted-foreground">{r.checkIn} → {r.checkOut}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  r.status === "confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                }`}>
                  {r.status === "confirmed" ? "Confirmée" : "En attente"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
