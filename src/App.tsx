import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import PreparationSection from "./components/sections/PreparationSection";
import SetupGuideSection from "./components/sections/SetupGuideSection";
import DatabaseSection from "./components/sections/DatabaseSection";
import WebServerSection from "./components/sections/WebServerSection";
import DockerSection from "./components/sections/DockerSection";
import CICDSection from "./components/sections/CICDSection";
import ToolsSection from "./components/sections/ToolsSection";
import TroubleshootSection from "./components/sections/TroubleshootSection";
import FinalChecklistSection from "./components/sections/FinalChecklistSection";
import TerminalPage from "./pages/TerminalPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper components for sections
const PreparationPage = () => <div className="py-8"><PreparationSection /></div>;
const SetupPage = () => <div className="py-8"><SetupGuideSection /></div>;
const SecurityPage = () => <div className="py-8"><SetupGuideSection /></div>;
const DatabasePage = () => <div className="py-8"><DatabaseSection /></div>;
const WebServerPage = () => <div className="py-8"><WebServerSection /></div>;
const DockerPage = () => <div className="py-8"><DockerSection /></div>;
const CICDPage = () => <CICDSection />;
const ToolsPage = () => <div className="py-8"><ToolsSection /></div>;
const TroubleshootPage = () => <div className="py-8"><TroubleshootSection /></div>;
const ChecklistPage = () => <div className="py-8"><FinalChecklistSection /></div>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/preparation" element={<PreparationPage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/database" element={<DatabasePage />} />
            <Route path="/webserver" element={<WebServerPage />} />
            <Route path="/docker" element={<DockerPage />} />
            <Route path="/cicd" element={<CICDPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/terminal" element={<TerminalPage />} />
            <Route path="/troubleshoot" element={<TroubleshootPage />} />
            <Route path="/checklist" element={<ChecklistPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
