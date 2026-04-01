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
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("admin");

  return (
    <RoleContext.Provider value={{ role, setRole, userName: roleNames[role] }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
