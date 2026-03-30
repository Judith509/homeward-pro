import { useState } from "react";
import { Send, Copy, Mail, LogIn, LogOut as LogOutIcon, MessageCircle } from "lucide-react";
import { messageTemplates } from "@/data/sampleData";

const typeIcons: Record<string, typeof Mail> = {
  "check-in": LogIn,
  welcome: MessageCircle,
  checkout: LogOutIcon,
  custom: Mail,
};

export default function Messages() {
  const [selectedTemplate, setSelectedTemplate] = useState(messageTemplates[0]);
  const [guestEmail, setGuestEmail] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">Message templates & guest communication</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates List */}
        <div className="glass-card p-4 space-y-2">
          <h2 className="font-semibold text-foreground mb-3">Templates</h2>
          {messageTemplates.map((m) => {
            const Icon = typeIcons[m.type] || Mail;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedTemplate(m)}
                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  selectedTemplate.id === m.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${selectedTemplate.id === m.id ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <p className={`text-sm font-medium ${selectedTemplate.id === m.id ? "text-primary" : "text-foreground"}`}>{m.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{m.type.replace("-", " ")}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Send Message */}
        <div className="lg:col-span-2 glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Send Message</h2>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Guest Email</label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="guest@email.com"
              className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">Message</label>
              <button className="flex items-center gap-1 text-xs text-primary hover:opacity-80">
                <Copy className="w-3 h-3" /> Copy template
              </button>
            </div>
            <textarea
              rows={6}
              defaultValue={selectedTemplate.body}
              key={selectedTemplate.id}
              className="w-full px-4 py-3 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 resize-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Send className="w-4 h-4" /> Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
