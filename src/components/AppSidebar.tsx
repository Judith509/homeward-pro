import { Home, Building2, CalendarDays, Calendar, Sparkles, MessageSquare, Users, Settings, LogOut, Search, Star, History } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import type { UserRole } from "@/data/sampleData";
import logo from "@/assets/logo.png";

interface NavItem {
  title: string;
  url: string;
  icon: typeof Home;
}

const adminNav: NavItem[] = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Logements", url: "/properties", icon: Building2 },
  { title: "Réservations", url: "/reservations", icon: CalendarDays },
  { title: "Calendrier", url: "/calendar", icon: Calendar },
  { title: "Ménage", url: "/cleaning", icon: Sparkles },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Utilisateurs", url: "/users", icon: Users },
  { title: "Paramètres", url: "/settings", icon: Settings },
];

const ownerNav: NavItem[] = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Mes logements", url: "/properties", icon: Building2 },
  { title: "Réservations", url: "/reservations", icon: CalendarDays },
  { title: "Calendrier", url: "/calendar", icon: Calendar },
  { title: "Ménage", url: "/cleaning", icon: Sparkles },
  { title: "Avis reçus", url: "/reviews", icon: Star },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Paramètres", url: "/settings", icon: Settings },
];

const clientNav: NavItem[] = [
  { title: "Explorer", url: "/", icon: Search },
  { title: "Mes réservations", url: "/my-bookings", icon: CalendarDays },
  { title: "Historique", url: "/history", icon: History },
  { title: "Mes avis", url: "/my-reviews", icon: Star },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Paramètres", url: "/settings", icon: Settings },
];

const navByRole: Record<UserRole, NavItem[]> = {
  admin: adminNav,
  owner: ownerNav,
  client: clientNav,
};

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useRole();
  const navItems = navByRole[role];

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-[68px]" : "w-[260px]"}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <img src={logo} alt="RentEasy" className="w-8 h-8 rounded-lg" />
        {!collapsed && <span className="text-lg font-bold text-sidebar-primary tracking-tight">RentEasy</span>}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-sidebar-border">
          <span className="px-2 py-1 rounded text-xs font-medium bg-sidebar-accent text-sidebar-accent-foreground capitalize">
            {role === "admin" ? "Administrateur" : role === "owner" ? "Propriétaire" : "Client"}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url);
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/"}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`}
              activeClassName=""
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border space-y-1">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 w-full transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
        <button
          onClick={onToggle}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 w-full transition-colors"
        >
          <span className="w-5 h-5 flex-shrink-0 text-center">{collapsed ? "→" : "←"}</span>
          {!collapsed && <span>Réduire</span>}
        </button>
      </div>
    </aside>
  );
}
