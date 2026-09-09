import { useState } from "react";

export type Page = "home" | "studio" | "marketplace" | "dashboard" | "analytics";
export type Language = "en" | "hi" | "bn" | "gu" | "mr" | "ta" | "te";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", region: "Global / All India" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", region: "North & Central India" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳", region: "West Bengal & Tripura" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳", region: "Gujarat & Kutch" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳", region: "Maharashtra" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", region: "Tamil Nadu" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", region: "Andhra Pradesh & Telangana" },
];

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenPehchan?: () => void;
  onOpenAuth?: () => void;
  currentUser?: { name: string; pehchanId: string };
}

const NAV_ITEMS: { key: Page; labels: Record<Language, string> }[] = [
  {
    key: "home",
    labels: {
      en: "Home",
      hi: "होम",
      bn: "হোম",
      gu: "હોમ",
      mr: "मुख्यपृष्ठ",
      ta: "முகப்பு",
      te: "హోమ్",
    },
  },
  {
    key: "dashboard",
    labels: {
      en: "For Artisans",
      hi: "कारीगर डैशबोर्ड",
      bn: "কারিগর ড্যাশবোর্ড",
      gu: "કારીગર ડેશબોર્ડ",
      mr: "कारागीर डॅशबोर्ड",
      ta: "கைவினைஞர் பலகை",
      te: "చేతివృత్తుల డ్యాష్‌బోర్డ్",
    },
  },
  {
    key: "studio",
    labels: {
      en: "AI Studio",
      hi: "एआई स्टूडियो",
      bn: "এআই স্টুডিও",
      gu: "AI સ્ટુડિયો",
      mr: "एआय स्टुडिओ",
      ta: "AI ஸ்டுடியோ",
      te: "AI స్టూడియో",
    },
  },
  {
    key: "marketplace",
    labels: {
      en: "ONDC Market",
      hi: "थोक बाज़ार",
      bn: "পাইকারি বাজার",
      gu: "જથ્થાબંધ બજાર",
      mr: "घाऊक बाजार",
      ta: "மொத்த சந்தை",
      te: "హోల్‌సేల్ మార్కెట్",
    },
  },
  {
    key: "analytics",
    labels: {
      en: "Impact",
      hi: "सामाजिक प्रभाव",
      bn: "সামাজিক প্রভাব",
      gu: "સામાજિક પ્રભાવ",
      mr: "सामाजिक प्रभाव",
      ta: "சமூக தாக்கம்",
      te: "సామాజిక ప్రభావం",
    },
  },
];

const CTA_LABELS: Record<Language, string> = {
  en: "Start Free",
  hi: "निःशुल्क शुरू करें",
  bn: "বিনামূল্যে শুরু করুন",
  gu: "મફત શરૂ કરો",
  mr: "मोफत सुरू करा",
  ta: "இலவசமாக தொடங்கவும்",
  te: "ఉచితంగా ప్రారంభించండి",
};

export default function Navbar({
  currentPage,
  onNavigate,
  language,
  onLanguageChange,
  onOpenPehchan,
  onOpenAuth,
  currentUser,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

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
                {item.labels[language] || item.labels.en}
              </button>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* 7-Language Interactive Dropdown Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-xs font-semibold cursor-pointer hover:bg-surface-container-high transition-all shadow-sm border border-surface-container-high/60"
              title="Choose Craft Language / भाषा चुनें"
            >
              <span className="material-symbols-outlined text-[15px] text-[#F5A623]">
                translate
              </span>
              <span>{currentLangObj.flag} {currentLangObj.nativeName}</span>
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant transition-transform">
                {langDropdownOpen ? "expand_less" : "expand_more"}
              </span>
            </button>

            {/* Dropdown Floating Panel */}
            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_12px_40px_rgba(43,46,72,0.18)] border border-surface-container-low p-2 z-50">
                  <div className="px-3 py-2 border-b border-surface-container-low">
                    <p className="font-headline-sm text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#F5A623]">language</span>
                      Choose Language / भाषा चुनें
                    </p>
                    <p className="font-label-sm text-[10px] text-on-surface-variant mt-0.5">
                      7 Regional Indian Languages Supported
                    </p>
                  </div>

                  <div className="py-1 flex flex-col gap-0.5 max-h-72 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((l) => {
                      const isSelected = language === l.code;
                      return (
                        <button
                          key={l.code}
                          onClick={() => {
                            onLanguageChange(l.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-primary-container/25 text-primary font-bold border border-primary/30"
                              : "hover:bg-surface-container-low text-on-surface"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{l.flag}</span>
                            <div>
                              <div className="font-label-md text-xs font-semibold leading-tight">
                                {l.nativeName} <span className="text-on-surface-variant font-normal">({l.name})</span>
                              </div>
                              <div className="font-label-sm text-[10px] text-on-surface-variant/70">
                                {l.region}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              check_circle
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

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
            <span>{CTA_LABELS[language] || CTA_LABELS.en}</span>
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
                <span>{item.labels[language] || item.labels.en}</span>
                {isActive && (
                  <span className="material-symbols-outlined text-primary text-base">
                    check
                  </span>
                )}
              </button>
            );
          })}

          {/* Mobile 7-Language Grid Selector */}
          <div className="mt-3 pt-3 border-t border-surface-container-low">
            <p className="font-label-md text-xs font-bold text-on-surface-variant px-1 mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#F5A623]">translate</span>
              SELECT CRAFT LANGUAGE / भाषा ({SUPPORTED_LANGUAGES.length})
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    onLanguageChange(l.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-2 rounded-xl text-xs font-medium text-left flex items-center gap-2 transition-all ${
                    language === l.code
                      ? "bg-primary-container text-on-primary-container font-bold shadow-sm border border-primary/40"
                      : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <span className="text-sm">{l.flag}</span>
                  <span className="truncate">{l.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-surface-container flex items-center justify-between">
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
