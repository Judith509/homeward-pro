import { useState } from "react";
import { CheckCircle2, Clock, Circle, UserCircle, Calendar } from "lucide-react";
import { cleaningTasks } from "@/data/sampleData";
import type { CleaningTask } from "@/data/sampleData";

const statusConfig: Record<string, { icon: typeof Circle; label: string; color: string }> = {
  todo: { icon: Circle, label: "To Do", color: "bg-warning/10 text-warning" },
  in_progress: { icon: Clock, label: "In Progress", color: "bg-info/10 text-info" },
  done: { icon: CheckCircle2, label: "Done", color: "bg-success/10 text-success" },
};

export default function CleaningTasks() {
  const [tasks] = useState<CleaningTask[]>(cleaningTasks);

  const columns = [
    { key: "todo" as const, label: "To Do", tasks: tasks.filter(t => t.status === "todo") },
    { key: "in_progress" as const, label: "In Progress", tasks: tasks.filter(t => t.status === "in_progress") },
    { key: "done" as const, label: "Done", tasks: tasks.filter(t => t.status === "done") },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Cleaning Tasks</h1>
        <p className="text-muted-foreground text-sm mt-1">{tasks.length} tasks total</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const cfg = statusConfig[col.key];
          return (
            <div key={col.key} className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <cfg.icon className={`w-5 h-5 ${col.key === "todo" ? "text-warning" : col.key === "in_progress" ? "text-info" : "text-success"}`} />
                <h2 className="font-semibold text-foreground">{col.label}</h2>
                <span className="ml-auto text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{col.tasks.length}</span>
              </div>
              {col.tasks.map((t) => (
                <div key={t.id} className="glass-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`status-badge ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  <p className="font-medium text-foreground">{t.propertyName}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UserCircle className="w-4 h-4" /> {t.assignee}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" /> {t.scheduledDate}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
