import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reservations } from "@/data/sampleData";

const propertyColors: Record<string, string> = {
  p1: "bg-primary/80 text-primary-foreground",
  p2: "bg-success/80 text-success-foreground",
  p3: "bg-warning/80 text-warning-foreground",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(3); // April

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const getReservationsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return reservations.filter((r) => dateStr >= r.checkIn && dateStr <= r.checkOut);
  };

  const prev = () => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        <p className="text-muted-foreground text-sm mt-1">View reservations by date</p>
      </div>

      <div className="glass-card p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prev} className="p-2 rounded-lg hover:bg-muted transition-colors"><ChevronLeft className="w-5 h-5 text-foreground" /></button>
          <h2 className="text-xl font-semibold text-foreground">{monthNames[month]} {year}</h2>
          <button onClick={next} className="p-2 rounded-lg hover:bg-muted transition-colors"><ChevronRight className="w-5 h-5 text-foreground" /></button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((d) => (
            <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayRes = getReservationsForDay(day);
            const isToday = year === 2026 && month === 2 && day === 30;
            return (
              <div
                key={day}
                className={`h-24 rounded-lg border p-1.5 transition-colors hover:bg-muted/50 ${isToday ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <span className={`text-xs font-medium ${isToday ? "text-primary" : "text-foreground"}`}>{day}</span>
                <div className="mt-1 space-y-0.5">
                  {dayRes.slice(0, 2).map((r) => (
                    <div key={r.id} className={`text-[10px] px-1.5 py-0.5 rounded truncate ${propertyColors[r.propertyId] || "bg-muted text-muted-foreground"}`}>
                      {r.guestName.split(" ")[0]}
                    </div>
                  ))}
                  {dayRes.length > 2 && <div className="text-[10px] text-muted-foreground">+{dayRes.length - 2} more</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">Properties:</span>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-primary/80" /><span className="text-xs text-muted-foreground">Appt. Paris</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-success/80" /><span className="text-xs text-muted-foreground">Villa Nice</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-warning/80" /><span className="text-xs text-muted-foreground">Studio Lyon</span></div>
        </div>
      </div>
    </div>
  );
}
