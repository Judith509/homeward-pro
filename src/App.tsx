import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index.tsx";
import Properties from "./pages/Properties.tsx";
import Reservations from "./pages/Reservations.tsx";
import CalendarPage from "./pages/CalendarPage.tsx";
import CleaningTasks from "./pages/CleaningTasks.tsx";
import Messages from "./pages/Messages.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const LayoutPage = ({ children }: { children: React.ReactNode }) => (
  <AppLayout>{children}</AppLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<LayoutPage><Properties /></LayoutPage>} />
          <Route path="/reservations" element={<LayoutPage><Reservations /></LayoutPage>} />
          <Route path="/calendar" element={<LayoutPage><CalendarPage /></LayoutPage>} />
          <Route path="/cleaning" element={<LayoutPage><CleaningTasks /></LayoutPage>} />
          <Route path="/messages" element={<LayoutPage><Messages /></LayoutPage>} />
          <Route path="/users" element={<LayoutPage><UsersPage /></LayoutPage>} />
          <Route path="/settings" element={<LayoutPage><SettingsPage /></LayoutPage>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
