import { User, Lock, Bell, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your profile and preferences</p>
      </div>

      {/* Profile */}
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Profile</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">First Name</label>
            <input defaultValue="Jean" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Last Name</label>
            <input defaultValue="Dupont" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
          <input defaultValue="jean@renteasy.com" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
        </div>
        <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          Save Changes
        </button>
      </div>

      {/* Password */}
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Change Password</h2>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Current Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Confirm Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
          </div>
        </div>
        <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          Update Password
        </button>
      </div>

      {/* Notifications */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        </div>
        {["New reservations", "Cleaning task updates", "Guest messages", "Payment confirmations"].map((item) => (
          <div key={item} className="flex items-center justify-between py-2">
            <span className="text-sm text-foreground">{item}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-card after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>
        ))}
      </div>

      {/* Language */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Language & Region</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Language</label>
            <select className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground">
              <option>Français</option>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Currency</label>
            <select className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground">
              <option>EUR (€)</option>
              <option>USD ($)</option>
              <option>GBP (£)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
