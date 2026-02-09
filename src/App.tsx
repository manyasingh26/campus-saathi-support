import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Breathing from "./pages/Breathing";
import Insights from "./pages/Insights";
import Journal from "./pages/Journal";
import Tools from "./pages/Tools";
import Profile from "./pages/Profile";
import Emergency from "./pages/Emergency";
import AchievementJar from "./pages/AchievementJar";
import PeerWisdom from "./pages/PeerWisdom";
import AttendanceCalc from "./pages/AttendanceCalc";
import BuddyCheckIn from "./pages/BuddyCheckIn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/achievements" element={<AchievementJar />} />
          <Route path="/peer-wisdom" element={<PeerWisdom />} />
          <Route path="/attendance" element={<AttendanceCalc />} />
          <Route path="/buddy" element={<BuddyCheckIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
