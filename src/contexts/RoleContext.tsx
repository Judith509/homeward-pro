import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserRole } from "@/data/sampleData";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  isLoggedIn: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const roleNames: Record<UserRole, string> = {
  admin: "Jean Dupont",
  owner: "Pierre Durand",
  client: "Sophie Martin",
};

const RoleContext = createContext<RoleContextType>({
  role: "admin",
  setRole: () => {},
  userName: "Jean Dupont",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("admin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (r: UserRole) => {
    setRole(r);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, userName: roleNames[role], isLoggedIn, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
