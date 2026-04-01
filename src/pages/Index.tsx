import { Navigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useRole } from "@/contexts/RoleContext";
import Dashboard from "./Dashboard";
import OwnerDashboard from "./OwnerDashboard";
import BrowseProperties from "./BrowseProperties";

export default function Index() {
  const { role, isLoggedIn } = useRole();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      {role === "admin" && <Dashboard />}
      {role === "owner" && <OwnerDashboard />}
      {role === "client" && <BrowseProperties />}
    </AppLayout>
  );
}
