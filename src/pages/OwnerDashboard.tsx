import { Building2, CalendarDays, Star, TrendingUp, ArrowUpRight, Euro } from "lucide-react";
import { properties, reservations, reviews } from "@/data/sampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { name: "Jan", revenue: 1850 },
  { name: "Fév", revenue: 2400 },
  { name: "Mar", revenue: 3100 },
  { name: "Avr", revenue: 2800 },
];

const activeProps = properties.filter(p => p.status === "active").length;
const upcomingRes = reservations.filter(r => r.status === "confirmed" || r.status === "pending").length;
const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
const totalRevenue = reservations.filter(r => r.status !== "cancelled").reduce((sum, r) => sum + r.totalPrice, 0);

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mon Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Bienvenue, Pierre. Voici l'état de vos logements.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Logements actifs", value: activeProps, icon: Building2, color: "bg-primary/10 text-primary" },
          { label: "Réservations à venir", value: upcomingRes, icon: CalendarDays, color: "bg-info/10 text-info" },
          { label: "Note moyenne", value: avgRating + "/5", icon: Star, color: "bg-warning/10 text-warning" },
          { label: "Revenus totaux", value: `€${totalRevenue.toLocaleString()}`, icon: Euro, color: "bg-success/10 text-success" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className={`p-2.5 rounded-lg ${s.color} inline-flex`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground mt-3">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Revenus mensuels</h2>
              <p className="text-sm text-muted-foreground">Évolution des revenus</p>
            </div>
            <div className="flex items-center gap-2 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" /> +18%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
              <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(214 20% 90%)", borderRadius: "0.75rem", fontSize: 13 }} formatter={(value: number) => [`€${value}`, "Revenus"]} />
              <Bar dataKey="revenue" fill="hsl(210 52% 25%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Derniers avis</h2>
          <div className="space-y-4">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="pb-3 border-b border-border last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "text-warning fill-warning" : "text-muted"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{rev.clientName}</span>
                </div>
                <p className="text-sm text-foreground line-clamp-2">{rev.comment}</p>
                <p className="text-xs text-muted-foreground mt-1">{rev.propertyName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
