import { useState } from "react";

type Page = "home" | "studio" | "marketplace" | "dashboard" | "analytics";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  language: "en" | "hi";
  onLanguageToggle: () => void;
}

const NAV_ITEMS: { key: Page; labelEn: string; labelHi: string; icon: string }[] = [
  { key: "home", labelEn: "Home", labelHi: "होम", icon: "🪔" },
  { key: "studio", labelEn: "AI Studio", labelHi: "AI स्टूडियो", icon: "📸" },
  { key: "marketplace", labelEn: "Marketplace", labelHi: "बाज़ार", icon: "🏪" },
  { key: "dashboard", labelEn: "Dashboard", labelHi: "डैशबोर्ड", icon: "📊" },
  { key: "analytics", labelEn: "Impact", labelHi: "प्रभाव", icon: "🎯" },
];

export default function Navbar({ currentPage, onNavigate, language, onLanguageToggle }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "var(--navbar-height)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      background: "rgba(11, 15, 25, 0.92)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)",
    }}>
      {/* Logo */}
      <div
        onClick={() => onNavigate("home")}
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
      >
        <span style={{ fontSize: "28px" }}>🪔</span>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--saffron)", lineHeight: 1.1 }}>
            KalaSetu
          </div>
          <div style={{ fontSize: "10px", color: "var(--text-tertiary)", fontFamily: "var(--font-hindi)" }}>
            कलासेतु • MoSJE
          </div>
        </div>
      </div>

      {/* Desktop Nav Links */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
        className="desktop-nav"
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "var(--radius-md)",
              border: "none",
              background: currentPage === item.key ? "rgba(245, 166, 35, 0.12)" : "transparent",
              color: currentPage === item.key ? "var(--saffron)" : "var(--text-secondary)",
              fontWeight: currentPage === item.key ? 600 : 400,
              fontSize: "13px",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span>{item.icon}</span>
            {language === "en" ? item.labelEn : item.labelHi}
          </button>
        ))}
      </div>

      {/* Right side actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Language Toggle */}
        <button
          onClick={onLanguageToggle}
          className="btn btn-ghost btn-sm"
          style={{ fontSize: "12px", fontFamily: language === "hi" ? "var(--font-hindi)" : "var(--font-sans)" }}
        >
          {language === "en" ? "🇮🇳 हिन्दी" : "🇬🇧 English"}
        </button>

        {/* Demo badge */}
        <span className="badge badge-success" style={{ display: "none" }}>
          ● LIVE
        </span>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            fontSize: "24px",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: "absolute",
          top: "var(--navbar-height)",
          left: 0,
          right: 0,
          background: "rgba(11, 15, 25, 0.98)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          padding: "8px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          zIndex: 999,
        }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onNavigate(item.key);
                setMobileMenuOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 16px",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: currentPage === item.key ? "rgba(245, 166, 35, 0.1)" : "transparent",
                color: currentPage === item.key ? "var(--saffron)" : "var(--text-primary)",
                fontWeight: currentPage === item.key ? 600 : 400,
                fontSize: "15px",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                fontFamily: "var(--font-sans)",
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              {language === "en" ? item.labelEn : item.labelHi}
            </button>
          ))}
        </div>
      )}

      {/* Media queries via style tag */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
