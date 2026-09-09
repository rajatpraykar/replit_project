import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import DemoBar from "./components/DemoBar";
import PehchanModal from "./components/PehchanModal";
import LandingPage from "./pages/LandingPage";
import StudioPage from "./pages/StudioPage";
import MarketplacePage from "./pages/MarketplacePage";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";

type Page = "home" | "studio" | "marketplace" | "dashboard" | "analytics";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isPehchanOpen, setIsPehchanOpen] = useState(false);

  // Hash-based routing for cross-browser compatibility
  const navigate = useCallback((page: Page) => {
    window.location.hash = page === "home" ? "" : page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const validPages: Page[] = ["home", "studio", "marketplace", "dashboard", "analytics"];
      if (validPages.includes(hash as Page)) {
        setCurrentPage(hash as Page);
      } else {
        setCurrentPage("home");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "studio":
        return <StudioPage lang={language} />;
      case "marketplace":
        return <MarketplacePage lang={language} />;
      case "dashboard":
        return <DashboardPage lang={language} />;
      case "analytics":
        return <AnalyticsPage lang={language} />;
      default:
        return <LandingPage lang={language} onNavigate={navigate} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        language={language}
        onLanguageToggle={() => setLanguage((l) => (l === "en" ? "hi" : "en"))}
      />
      <DemoBar
        onNavigate={navigate}
        onOpenPehchan={() => setIsPehchanOpen(true)}
        currentPage={currentPage}
      />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "24px",
          color: "var(--text-tertiary)",
          fontSize: "12px",
          borderTop: "1px solid var(--border)",
          background: "rgba(10, 15, 25, 0.95)",
        }}
      >
        <p>
          🪔 KalaSetu (कलासेतु) • Smart India Hackathon 2024 Grand Finale • PS ID: 26090
        </p>
        <p style={{ marginTop: "4px" }}>
          Ministry of Social Justice & Empowerment (MoSJE) • Empowering Traditional Artisan Communities
        </p>
      </footer>

      {/* Sovereign Pehchan Smart ID Modal */}
      <PehchanModal
        isOpen={isPehchanOpen}
        onClose={() => setIsPehchanOpen(false)}
      />
    </div>
  );
}

export default App;
