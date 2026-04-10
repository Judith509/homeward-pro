import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/contexts/RoleContext";
import { AppLayout } from "@/components/AppLayout";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import Reservations from "./pages/Reservations";
import CalendarPage from "./pages/CalendarPage";
import CleaningTasks from "./pages/CleaningTasks";
import Messages from "./pages/Messages";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import MyBookings from "./pages/MyBookings";
import BookingHistory from "./pages/BookingHistory";
import MyReviews from "./pages/MyReviews";
import OwnerReviews from "./pages/OwnerReviews";
import ClientMessages from "./pages/ClientMessages";
import BrowseProperties from "./pages/BrowseProperties";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const LayoutPage = ({ children }: { children: React.ReactNode }) => (
  <AppLayout>{children}</AppLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/properties" element={<LayoutPage><Properties /></LayoutPage>} />
            <Route path="/reservations" element={<LayoutPage><Reservations /></LayoutPage>} />
            <Route path="/calendar" element={<LayoutPage><CalendarPage /></LayoutPage>} />
            <Route path="/cleaning" element={<LayoutPage><CleaningTasks /></LayoutPage>} />
            <Route path="/messages" element={<LayoutPage><Messages /></LayoutPage>} />
            <Route path="/users" element={<LayoutPage><UsersPage /></LayoutPage>} />
            <Route path="/settings" element={<LayoutPage><SettingsPage /></LayoutPage>} />
            <Route path="/my-bookings" element={<LayoutPage><MyBookings /></LayoutPage>} />
            <Route path="/history" element={<LayoutPage><BookingHistory /></LayoutPage>} />
            <Route path="/my-reviews" element={<LayoutPage><MyReviews /></LayoutPage>} />
            <Route path="/reviews" element={<LayoutPage><OwnerReviews /></LayoutPage>} />
            <Route path="/client-messages" element={<LayoutPage><ClientMessages /></LayoutPage>} />
            <Route path="/browse" element={<LayoutPage><BrowseProperties /></LayoutPage>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
