import { Building2, CalendarDays, Sparkles, MessageSquare, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { reservations, properties, cleaningTasks } from "@/data/sampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { name: "Mon", revenue: 420 },
  { name: "Tue", revenue: 680 },
  { name: "Wed", revenue: 520 },
  { name: "Thu", revenue: 890 },
  { name: "Fri", revenue: 1100 },
  { name: "Sat", revenue: 1350 },
  { name: "Sun", revenue: 980 },
];

const stats = [
  { label: "Properties", value: properties.length, icon: Building2, change: "+1", up: true, color: "bg-primary/10 text-primary" },
  { label: "Upcoming Reservations", value: reservations.filter(r => r.status === "confirmed" || r.status === "pending").length, icon: CalendarDays, change: "+2", up: true, color: "bg-info/10 text-info" },
  { label: "Pending Cleaning", value: cleaningTasks.filter(t => t.status === "todo").length, icon: Sparkles, change: "-1", up: false, color: "bg-warning/10 text-warning" },
  { label: "Unread Messages", value: 3, icon: MessageSquare, change: "+3", up: true, color: "bg-success/10 text-success" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  cancelled: "bg-destructive/10 text-destructive",
  completed: "bg-muted text-muted-foreground",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back, Jean. Here's your overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-lg ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${s.up ? "text-success" : "text-destructive"}`}>
                {s.change}
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-3">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Revenue</h2>
              <p className="text-sm text-muted-foreground">Weekly overview</p>
            </div>
            <div className="flex items-center gap-2 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" /> +12.5%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
              <Tooltip
                contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(214 20% 90%)", borderRadius: "0.75rem", fontSize: 13 }}
                formatter={(value: number) => [`€${value}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="hsl(210 52% 25%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Reservations */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Reservations</h2>
          <div className="space-y-3">
            {reservations.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.guestName}</p>
                  <p className="text-xs text-muted-foreground">{r.propertyName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.checkIn} → {r.checkOut}</p>
                </div>
                <div className="text-right">
                  <span className={`status-badge ${statusColors[r.status]}`}>{r.status}</span>
                  <p className="text-sm font-semibold text-foreground mt-1">€{r.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
