
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Weather from "./pages/Weather";
import Analytics from "./pages/Analytics";
import Market from "./pages/Market";
import Education from "./pages/Education";
import Schemes from "./pages/Schemes";
import Mandi from "./pages/Mandi";
import Seeds from "./pages/Seeds";
import Pesticides from "./pages/Pesticides";
import LeafScanner from "./pages/LeafScanner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-gray-50 w-full">
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
                  <Route path="/market" element={
                    <>
                      <Navbar />
                      <Market />
                    </>
                  } />
                  <Route path="/education" element={
                    <>
                      <Navbar />
                      <Education />
                    </>
                  } />
                  <Route path="/schemes" element={
                    <>
                      <Navbar />
                      <Schemes />
                    </>
                  } />
                  <Route path="/mandi" element={
                    <>
                      <Navbar />
                      <Mandi />
                    </>
                  } />
                  <Route path="/seeds" element={
                    <>
                      <Navbar />
                      <Seeds />
                    </>
                  } />
                  <Route path="/pesticides" element={
                    <>
                      <Navbar />
                      <Pesticides />
                    </>
                  } />
                  <Route path="/leaf-scanner" element={
                    <>
                      <Navbar />
                      <LeafScanner />
                    </>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
