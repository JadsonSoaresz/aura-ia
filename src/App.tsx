import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import Landing from "./pages/Landing";
import Triagem from "./pages/Triagem";
import Aprender from "./pages/Aprender";
import Chat from "./pages/Chat";
import Progresso from "./pages/Progresso";
import VideoAulas from "./pages/VideoAulas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AccessibilityToolbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/triagem" element={<Triagem />} />
            <Route path="/aprender" element={<Aprender />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/progresso" element={<Progresso />} />
            <Route path="/videoaulas" element={<VideoAulas />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
