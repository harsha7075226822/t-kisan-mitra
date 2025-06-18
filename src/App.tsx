
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Weather from "./pages/Weather";
import Analytics from "./pages/Analytics";
import Voice from "./pages/Voice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <>
                <Navbar />
                <Dashboard />
              </>
            } />
            <Route path="/weather" element={
              <>
                <Navbar />
                <Weather />
              </>
            } />
            <Route path="/analytics" element={
              <>
                <Navbar />
                <Analytics />
              </>
            } />
            <Route path="/voice" element={
              <>
                <Navbar />
                <Voice />
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
