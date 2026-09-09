import { useState, useEffect, useCallback } from "react";
import Navbar, { type Language } from "./components/Navbar";
import DemoBar from "./components/DemoBar";
import Footer from "./components/Footer";
import PehchanModal from "./components/PehchanModal";
import AuthModal, { type ArtisanProfile } from "./components/AuthModal";
import LandingPage from "./pages/LandingPage";
import StudioPage from "./pages/StudioPage";
import MarketplacePage from "./pages/MarketplacePage";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";

export type Page = "home" | "studio" | "marketplace" | "dashboard" | "analytics";

const DEFAULT_USER: ArtisanProfile = {
  id: "artisan_demo_01",
  name: "Radha Devi",
  phone: "+91 98765 43210",
  state: "Uttar Pradesh",
  district: "Varanasi",
  craftCluster: "Varanasi Handloom & Banarasi Silk",
  socialCategory: "SC Category • Master Weaver",
  udyamNumber: "UDYAM-UP-14-0028911",
  pehchanId: "KST-UP-2024-00142",
  aadhaarVerified: true,
  verifiedBy: "Ministry of Social Justice & Empowerment Cluster Cell",
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("kalasetu_selected_language");
      if (saved && ["en", "hi", "bn", "gu", "mr", "ta", "te"].includes(saved)) {
        return saved as Language;
      }
    } catch {}
    return "en";
  });
  const [isPehchanOpen, setIsPehchanOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<ArtisanProfile>(() => {
    try {
      const saved = localStorage.getItem("kalasetu_current_user");
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_USER;
  });

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

  const handleUserChange = (newUser: ArtisanProfile) => {
    setCurrentUser(newUser);
    try {
      localStorage.setItem("kalasetu_current_user", JSON.stringify(newUser));
    } catch {}
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem("kalasetu_selected_language", newLang);
    } catch {}
  };

  const renderPage = () => {
    switch (currentPage) {
      case "studio":
        return <StudioPage lang={language} onNavigate={navigate} />;
      case "marketplace":
        return <MarketplacePage lang={language} onNavigate={navigate} />;
      case "dashboard":
        return (
          <DashboardPage
            lang={language}
            onNavigate={navigate}
            onOpenPehchan={() => setIsPehchanOpen(true)}
            currentUser={{
              name: currentUser.name,
              pehchanId: currentUser.pehchanId,
              cluster: `${currentUser.district}, ${currentUser.state}`,
              state: currentUser.state,
              category: currentUser.socialCategory,
            }}
          />
        );
      case "analytics":
        return <AnalyticsPage lang={language} />;
      default:
        return <LandingPage lang={language} onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF2] text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Top Fixed Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenPehchan={() => setIsPehchanOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={{
          name: currentUser.name,
          pehchanId: currentUser.pehchanId,
        }}
      />

      {/* Sticky Demo Bar */}
      <div className="pt-[72px]">
        <DemoBar
          onNavigate={navigate}
          onOpenPehchan={() => setIsPehchanOpen(true)}
          currentPage={currentPage}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full">{renderPage()}</main>

      {/* Stitch 4-Column Indigo Footer */}
      <Footer onNavigate={navigate} />

      {/* Sovereign Pehchan Smart ID Modal */}
      <PehchanModal isOpen={isPehchanOpen} onClose={() => setIsPehchanOpen(false)} />

      {/* Artisan Auth & Registration Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onUserChanged={handleUserChange}
      />
    </div>
  );
}

export default App;
