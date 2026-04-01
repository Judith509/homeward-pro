import { AppLayout } from "@/components/AppLayout";
import { useRole } from "@/contexts/RoleContext";
import Dashboard from "./Dashboard";
import OwnerDashboard from "./OwnerDashboard";
import BrowseProperties from "./BrowseProperties";
import LandingPage from "./LandingPage";

export default function Index() {
  const { role, isLoggedIn } = useRole();

  if (!isLoggedIn) {
    return <LandingPage />;
  }

  return (
    <AppLayout>
      {role === "admin" && <Dashboard />}
      {role === "owner" && <OwnerDashboard />}
      {role === "client" && <BrowseProperties />}
    </AppLayout>
  );
}
