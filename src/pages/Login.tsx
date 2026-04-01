import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, Home, UserCircle } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import type { UserRole } from "@/data/sampleData";
import logo from "@/assets/logo.png";

const roles: { value: UserRole; label: string; desc: string; icon: typeof Shield }[] = [
  { value: "admin", label: "Administrateur", desc: "Gestion globale de la plateforme", icon: Shield },
  { value: "owner", label: "Propriétaire", desc: "Gestion de mes logements", icon: Home },
  { value: "client", label: "Client", desc: "Recherche et réservation", icon: UserCircle },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const { login } = useRole();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(selectedRole);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="RentEasy" className="w-16 h-16 mx-auto mb-4 rounded-xl" />
          <h1 className="text-2xl font-bold text-foreground">Bienvenue sur RentEasy</h1>
          <p className="text-muted-foreground text-sm mt-1">Connectez-vous à votre compte</p>
        </div>
        <div className="glass-card p-8 space-y-5">
          {/* Role Selector */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Je me connecte en tant que</label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setSelectedRole(r.value)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-center transition-all ${
                    selectedRole === r.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-secondary text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <r.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{r.label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {roles.find((r) => r.value === selectedRole)?.desc}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
            <input type="email" placeholder="vous@exemple.com" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Mot de passe</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-2.5 pr-10 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" className="rounded border-border" /> Se souvenir de moi
            </label>
            <Link to="/forgot-password" className="text-sm text-primary hover:opacity-80">Mot de passe oublié ?</Link>
          </div>
          <button onClick={handleLogin} className="block w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity">
            Se connecter
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ? <Link to="/register" className="text-primary font-medium hover:opacity-80">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
