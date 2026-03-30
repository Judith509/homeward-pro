import { useState } from "react";
import { Search, Filter, X, CalendarDays, Users as UsersIcon } from "lucide-react";
import { reservations } from "@/data/sampleData";
import type { Reservation } from "@/data/sampleData";

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  cancelled: "bg-destructive/10 text-destructive",
  completed: "bg-muted text-muted-foreground",
};

const statusFilters = ["all", "pending", "confirmed", "cancelled", "completed"] as const;

export default function Reservations() {
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Reservation | null>(null);

  const filtered = filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reservations</h1>
        <p className="text-muted-foreground text-sm mt-1">{reservations.length} total reservations</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search reservations..." className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                filter === s ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((r) => (
          <div
            key={r.id}
            onClick={() => setSelected(r)}
            className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:border-primary/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold flex-shrink-0">
                  {r.guestName.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{r.guestName}</p>
                  <p className="text-sm text-muted-foreground">{r.propertyName}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4" />
              {r.checkIn} → {r.checkOut}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="w-4 h-4" /> {r.guests}
            </div>
            <span className={`status-badge ${statusColors[r.status]}`}>{r.status}</span>
            <p className="text-lg font-bold text-foreground min-w-[80px] text-right">€{r.totalPrice}</p>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-xl shadow-xl w-full max-w-lg p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Reservation Details</h2>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-muted"><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between"><span className="text-muted-foreground">Guest</span><span className="font-medium text-foreground">{selected.guestName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium text-foreground">{selected.guestEmail}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Property</span><span className="font-medium text-foreground">{selected.propertyName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Check-in</span><span className="font-medium text-foreground">{selected.checkIn}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Check-out</span><span className="font-medium text-foreground">{selected.checkOut}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Guests</span><span className="font-medium text-foreground">{selected.guests}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`status-badge ${statusColors[selected.status]}`}>{selected.status}</span></div>
              <div className="flex justify-between pt-4 border-t border-border"><span className="text-lg font-semibold text-foreground">Total</span><span className="text-lg font-bold text-primary">€{selected.totalPrice}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
