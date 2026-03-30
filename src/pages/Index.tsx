import { AppLayout } from "@/components/AppLayout";
import { useRole } from "@/contexts/RoleContext";
import Dashboard from "./Dashboard";
import OwnerDashboard from "./OwnerDashboard";
import BrowseProperties from "./BrowseProperties";

export default function Index() {
  const { role } = useRole();

  return (
    <AppLayout>
      {role === "admin" && <Dashboard />}
      {role === "owner" && <OwnerDashboard />}
      {role === "client" && <BrowseProperties />}
    </AppLayout>
  );
}
