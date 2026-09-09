import { useState } from "react";

export type Page = "home" | "studio" | "marketplace" | "dashboard" | "analytics";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  language: "en" | "hi";
  onLanguageToggle: () => void;
  onOpenPehchan?: () => void;
  onOpenAuth?: () => void;
  currentUser?: { name: string; pehchanId: string };
}

const NAV_ITEMS: { key: Page; labelEn: string; labelHi: string }[] = [
  { key: "home", labelEn: "Home", labelHi: "होम" },
  { key: "dashboard", labelEn: "For Artisans", labelHi: "कारीगर डैशबोर्ड" },
  { key: "studio", labelEn: "AI Studio", labelHi: "एआई स्टूडियो" },
  { key: "marketplace", labelEn: "ONDC Market", labelHi: "थोक बाज़ार" },
  { key: "analytics", labelEn: "Impact", labelHi: "सामाजिक प्रभाव" },
];

export default function Navbar({
  currentPage,
  onNavigate,
  language,
  onLanguageToggle,
  onOpenPehchan,
  onOpenAuth,
  currentUser,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_2px_12px_rgba(43,46,72,0.06)] border-b border-surface-container-low">
      <div className="h-[72px] max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => {
            onNavigate("home");
            setMobileMenuOpen(false);
          }}
        >
          <img
            alt="KalaSetu Diya Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWwCkV77uR64ZB0ej2T3OZQmp5ddK-mSt_siDBJhzgFWwdO7UscZq_4jtMPRMEi8yuoIx0HyQCOkUna58eOegFnNqUXLPNdrLy1aFnPHPZ9D17m11CUJWLomwnYvCscabWsosXtku6oIGM5x12i3oJG6C4-ntwaR3FKgr1KNxLfvB2Xoqm3E9mlwRtO6OvBz7qkUXeKHSc1ZsYWd9L6X7FkOYTGJ32EklB0rhWWfRKNzK7oLR3DuTR_Q"
          />
          <div className="flex flex-col leading-none">
            <span className="font-['Poppins'] font-bold text-[22px] tracking-tight text-[#3D405B]">
              KalaSetu
            </span>
            <span className="font-['Noto_Sans_Devanagari'] font-semibold text-[13px] text-[#E07A5F]">
              कलासेतु
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`transition-all py-1 font-label-md text-sm cursor-pointer relative ${
                  isActive
                    ? "text-[#161a32] font-bold after:absolute after:bottom-[-24px] after:left-0 after:right-0 after:h-[3px] after:bg-[#f5a623] after:rounded-full"
                    : "text-[#524534] hover:text-[#161a32]"
                }`}
              >
                {language === "en" ? item.labelEn : item.labelHi}
              </button>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={onLanguageToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-xs font-semibold cursor-pointer hover:bg-surface-container-high transition-colors shadow-sm"
            title="Switch Language / भाषा बदलें"
          >
            <span>{language === "en" ? "🇮🇳 हिन्दी" : "🇬🇧 English"}</span>
            <span className="material-symbols-outlined text-[15px] leading-none">
              translate
            </span>
          </button>

          {/* Account / Login Button */}
          <button
            onClick={onOpenAuth}
            className="hidden md:inline-flex items-center justify-center px-3.5 py-1.5 rounded-full font-label-sm text-xs font-semibold text-[#3D405B] bg-transparent hover:bg-surface-container transition-all cursor-pointer"
          >
            {currentUser?.name ? `👤 ${currentUser.name}` : "B2B Login"}
          </button>

          {/* Primary CTA button */}
          <button
            onClick={() => onNavigate("studio")}
            className="inline-flex items-center justify-center px-4 md:px-5 py-2 rounded-full font-label-md text-xs md:text-sm text-white font-semibold bg-gradient-to-r from-[#F5A623] to-[#E07A5F] shadow-[0_0_16px_rgba(245,166,35,0.35)] hover:shadow-[0_0_24px_rgba(245,166,35,0.55)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span>{language === "en" ? "Start Free — शुरू करें" : "निःशुल्क शुरू करें"}</span>
          </button>

          {/* Profile Avatar / Pehchan ID Card Trigger */}
          <div
            onClick={onOpenPehchan}
            className="relative flex items-center justify-center p-0.5 rounded-full bg-primary-container cursor-pointer hover:ring-2 hover:ring-[#F5A623] transition-all"
            title="View Sovereign Pehchan ID"
          >
            <img
              alt="Artisan Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7KqCKjKboszKz1OhBs2UhEUljL3ZtFPVpyrcAkt5UdUjzPnN1Rk6XOFIM7SCUq3lUqknTGZiniM8x7Xv_TMG3KpusSIn3DVfW-UTagRv88_I3pXxf1_74LMbqvPtWpdo3S65jLpR5LIGFcEjRxicHD3h0qBFqfrpF4xNqvknkcJPHAjKjdsxO_Yo9m0DwkrQ0raEOz02wpfz7LuEgz6wyy7_4YZ5MPLGYEQlHlKlx2JTVWTL9j7FliQ"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-tertiary rounded-full text-on-tertiary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[10px] leading-none font-bold text-white">
                verified
              </span>
            </span>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-surface-container-low px-4 py-4 flex flex-col gap-2 shadow-xl animate-fadeIn">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-3 rounded-xl font-label-md text-sm transition-all text-left ${
                  isActive
                    ? "bg-primary-fixed text-on-primary-fixed font-bold"
                    : "hover:bg-surface-container-low text-on-surface"
                }`}
              >
                <span>{language === "en" ? item.labelEn : item.labelHi}</span>
                {isActive && (
                  <span className="material-symbols-outlined text-primary text-base">
                    check
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-surface-container flex items-center justify-between">
            <button
              onClick={() => {
                onOpenAuth?.();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-surface-container text-xs font-semibold text-on-surface"
            >
              <span className="material-symbols-outlined text-base text-primary">
                account_circle
              </span>
              <span>{currentUser?.name || "Artisan Login"}</span>
            </button>
            <button
              onClick={() => {
                onOpenPehchan?.();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-surface-container text-xs font-semibold text-on-surface"
            >
              <span className="material-symbols-outlined text-base text-tertiary">
                badge
              </span>
              <span>Pehchan ID</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
