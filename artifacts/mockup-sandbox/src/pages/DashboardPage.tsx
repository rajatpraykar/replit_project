import { useState } from "react";
import type { Page } from "../components/Navbar";

interface DashboardPageProps {
  lang: "en" | "hi";
  onNavigate?: (page: Page) => void;
  onOpenPehchan?: () => void;
}

export default function DashboardPage({ lang, onNavigate, onOpenPehchan }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<"6M" | "3M" | "1Y">("6M");
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiryAccepted, setInquiryAccepted] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-72px)] bg-[#FFFBF2]">
      {/* ═══ LEFT SIDEBAR ═══ */}
      <aside className="w-full lg:w-[260px] flex-shrink-0 bg-surface-container-lowest shadow-[4px_0_24px_rgba(61,64,91,0.04)] flex flex-col justify-between p-4 z-10 border-r border-surface-container-low">
        <div className="flex flex-col gap-5">
          {/* Artisan Mini Profile Card */}
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-container-low shadow-sm border border-surface-container">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-primary-container via-secondary to-primary shadow-[0_0_16px_rgba(245,166,35,0.4)]">
                <img
                  className="w-full h-full rounded-full object-cover"
                  alt="Radha Devi portrait"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAambBaoFH2pJzHXBhgnssluztDZbxfMvUb6j1jyX4WejpiUaiOlYGBr_qCMUcWAdG_sImqKCMU9pOwiqKoNt_uo8_mPWAKJ4oNhtibgEsxb16NLeVPzbPBDR7rYhk3G1RN_Ip5nKu8WAPFbnthALhrz7Oywzgiouxa8ch43VtQ3DyL2j3LNGQXnIEFjA9nQwQrmHCX9V9EisUQdR-IL5Q53H8qhmMWNvpaKOTnYHM3cCfxefXYB4M2Uw"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-sm">
                <span
                  className="material-symbols-outlined text-[12px] leading-none text-white"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </span>
            </div>
            <h2 className="font-headline-sm text-base text-on-surface font-bold">Radha Devi</h2>
            <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-xs mt-0.5">
              <span className="material-symbols-outlined text-[14px] text-secondary">location_on</span>
              <span>Varanasi, UP</span>
            </div>
            <button
              onClick={onOpenPehchan}
              className="mt-2.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-code-sm text-[11px] flex items-center gap-1 font-semibold hover:bg-tertiary-fixed-dim transition-colors cursor-pointer"
            >
              <span>Pehchan Verified ✓</span>
            </button>
            <div className="mt-1 font-code-sm text-[10px] text-on-surface-variant/70 tracking-wider">
              ID: KST-UP-2024-00142
            </div>
            <div className="mt-1 text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">
              SC Category • GI: Banarasi
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            <button className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-primary-fixed text-on-primary-fixed font-label-md text-sm shadow-sm font-semibold w-full text-left">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-[20px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  dashboard
                </span>
                <span>Dashboard</span>
              </div>
              <span className="w-1.5 h-4 rounded-full bg-primary-container"></span>
            </button>

            <button
              onClick={() => onNavigate?.("studio")}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all font-label-md text-sm w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary">
                auto_fix_high
              </span>
              <span>AI Craft Studio</span>
              <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-secondary-fixed text-on-secondary-fixed">
                Voice AI
              </span>
            </button>

            <button
              onClick={() => onNavigate?.("marketplace")}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all font-label-md text-sm w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              <span>My Products</span>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-semibold">
                12
              </span>
            </button>

            <button
              onClick={() => onNavigate?.("marketplace")}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all font-label-md text-sm w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-tertiary">hub</span>
              <span>ONDC Market</span>
              <span className="ml-auto w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            </button>

            <button
              onClick={() => alert("Payouts: All T+1 settlements processed via Aadhaar UPI Bridge.")}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all font-label-md text-sm w-full text-left"
            >
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              <span>Invoices &amp; Payouts</span>
            </button>

            <button
              onClick={() => onNavigate?.("analytics")}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all font-label-md text-sm w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">query_stats</span>
              <span>Impact Analytics</span>
            </button>

            <button
              onClick={() => alert("PM Vishwakarma & AHVY Grants active. Benefit amount: ₹15,000 toolkit sanction.")}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all font-label-md text-sm w-full text-left"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">account_balance</span>
              <span>Govt Schemes</span>
              <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-error-container text-error">
                New
              </span>
            </button>

            <button
              onClick={onOpenPehchan}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all font-label-md text-sm w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">badge</span>
              <span>Artisan Profile</span>
            </button>
          </nav>
        </div>

        {/* Footer action & Support */}
        <div className="flex flex-col gap-2 pt-4 border-t border-surface-container-low">
          <button
            onClick={() => alert("KalaSetu Vernacular Helpdesk (24/7 टोल-फ्री): 1800-11-2090")}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-surface-container text-on-surface font-label-sm text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">support_agent</span>
            <span>Helpdesk (हिन्दी)</span>
          </button>
          <div className="flex items-center justify-between text-on-surface-variant/60 font-code-sm text-[11px] px-2 pt-1">
            <span>KalaSetu Core</span>
            <span>v2.1.0</span>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN WORKSPACE ═══ */}
      <div className="flex-1 flex flex-col overflow-y-auto px-4 md:px-8 py-6 gap-6">
        {/* Top Workspace Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container">
          <div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-xs">
              <span>Marketplace Portal</span>
              <span>/</span>
              <span className="text-on-surface font-semibold">Artisan Dashboard</span>
              <span className="text-secondary font-['Noto_Sans_Devanagari'] font-medium">
                (कारीगर डैशबोर्ड)
              </span>
            </div>
            <p className="font-body-sm text-sm text-on-surface-variant mt-0.5">
              Welcome back, Radha ji. Your ONDC store has received 4 new catalog lookups today.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Voice Assisted Search */}
            <div className="relative flex-1 md:w-72">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-9 pr-9 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 rounded-full font-body-sm text-xs sm:text-sm outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary-container transition-all border border-surface-container"
                placeholder="Search crafts, orders, buyers..."
                type="text"
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-on-surface-variant">
                search
              </span>
              <button
                onClick={() => setSearchTerm("Banarasi Dupatta")}
                className="absolute right-2.5 top-2 text-primary hover:text-secondary transition-colors"
                title="Speak in Hindi/Bhojpuri via Bhashini AI"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => alert("3 Notifications: 1) FabIndia quotation view, 2) ONDC daily catalog health 100%, 3) PM Vishwakarma toolkit subsidy credited.")}
              className="relative w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-white font-label-sm text-[10px] flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Bhashini Language Switcher Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-xs font-semibold shadow-sm cursor-pointer hover:bg-surface-container-high transition-colors shrink-0">
              <span className="material-symbols-outlined text-[16px] text-secondary">translate</span>
              <span>हिन्दी / EN</span>
            </div>
          </div>
        </div>

        {/* ROW 1: 4 KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Monthly Earnings */}
          <div className="bg-surface-container-lowest p-5 rounded-[20px] shadow-[0_2px_4px_rgba(61,64,91,0.04),0_8px_24px_rgba(61,64,91,0.06)] relative overflow-hidden flex flex-col justify-between border border-surface-container">
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-primary-container/15 blur-xl"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-md text-sm text-on-surface-variant font-medium">
                  Monthly Earnings
                </span>
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">currency_rupee</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="font-headline-xl text-3xl text-on-surface font-bold">₹24,500</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-bold">
                <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> +18%
              </span>
              <span className="text-on-surface-variant font-body-sm text-xs">vs. last month</span>
            </div>
          </div>

          {/* Card 2: Total Products */}
          <div className="bg-surface-container-lowest p-5 rounded-[20px] shadow-[0_2px_4px_rgba(61,64,91,0.04),0_8px_24px_rgba(61,64,91,0.06)] relative overflow-hidden flex flex-col justify-between border border-surface-container">
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-surface-container-high/40 blur-xl"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-md text-sm text-on-surface-variant font-medium">
                  Catalogued Products
                </span>
                <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">styler</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="font-headline-xl text-3xl text-on-surface font-bold">12</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                8 ONDC Live
              </span>
              <span className="text-on-surface-variant font-body-sm text-xs">4 drafts pending</span>
            </div>
          </div>

          {/* Card 3: Wage Premium */}
          <div className="bg-surface-container-lowest p-5 rounded-[20px] shadow-[0_2px_4px_rgba(61,64,91,0.04),0_8px_24px_rgba(61,64,91,0.06)] relative overflow-hidden flex flex-col justify-between border border-surface-container">
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-tertiary-container/20 blur-xl"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-md text-sm text-on-surface-variant font-medium">
                  Fair Wage Premium
                </span>
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="font-headline-xl text-3xl text-tertiary font-bold">+250%</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              <span className="text-on-surface-variant font-body-sm text-xs">
                Above UP statutory min. wage
              </span>
            </div>
          </div>

          {/* Card 4: B2B Inquiries */}
          <div className="bg-surface-container-lowest p-5 rounded-[20px] shadow-[0_2px_4px_rgba(61,64,91,0.04),0_8px_24px_rgba(61,64,91,0.06)] relative overflow-hidden flex flex-col justify-between border border-surface-container">
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-secondary-container/20 blur-xl"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-md text-sm text-on-surface-variant font-medium">
                  B2B Bulk Inquiries
                </span>
                <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">handshake</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="font-headline-xl text-3xl text-secondary font-bold">7</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold">
                3 new this week
              </span>
              <span className="text-on-surface-variant font-body-sm text-xs">FabIndia, Jaypore...</span>
            </div>
          </div>
        </div>

        {/* ROW 2: CHART + QUICK ACTIONS (8 cols + 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Monthly Earnings Area Trend Chart (8 cols) */}
          <div className="lg:col-span-8 bg-surface-container-lowest p-5 sm:p-6 rounded-[20px] shadow-[0_2px_4px_rgba(61,64,91,0.04),0_8px_24px_rgba(61,64,91,0.06)] flex flex-col justify-between border border-surface-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-lg text-on-surface font-bold">
                    Monthly Earnings Trend
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-code-sm text-[11px] font-bold">
                    Fair Price AI
                  </span>
                </div>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                  Cumulative sales through ONDC Network &amp; Government e-Marketplace (GeM)
                </p>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-full self-start sm:self-auto border border-surface-container">
                <button
                  onClick={() => setActiveTab("3M")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                    activeTab === "3M"
                      ? "bg-primary-container text-on-primary-container shadow-sm font-bold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  3M
                </button>
                <button
                  onClick={() => setActiveTab("6M")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                    activeTab === "6M"
                      ? "bg-primary-container text-on-primary-container shadow-sm font-bold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  6M
                </button>
                <button
                  onClick={() => setActiveTab("1Y")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                    activeTab === "1Y"
                      ? "bg-primary-container text-on-primary-container shadow-sm font-bold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  1Y
                </button>
              </div>
            </div>

            {/* Inline SVG Area Chart with Marigold Glow */}
            <div className="w-full h-56 pt-2 relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 200">
                <defs>
                  <linearGradient id="marigoldGlow" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#F5A623" stopOpacity="0.45"></stop>
                    <stop offset="60%" stopColor="#E07A5F" stopOpacity="0.15"></stop>
                    <stop offset="100%" stopColor="#FFFBF2" stopOpacity="0.0"></stop>
                  </linearGradient>
                  <linearGradient id="strokeGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#F5A623"></stop>
                    <stop offset="60%" stopColor="#E07A5F"></stop>
                    <stop offset="100%" stopColor="#386753"></stop>
                  </linearGradient>
                  <filter id="glow" height="140%" width="140%" x="-20%" y="-20%">
                    <feDropShadow dx="0" dy="4" floodColor="#F5A623" floodOpacity="0.3" stdDeviation="4"></feDropShadow>
                  </filter>
                </defs>
                {/* Grid Horizontal Guide Lines */}
                <line stroke="#DFE0FF" strokeDasharray="4,4" strokeOpacity="0.6" x1="0" x2="700" y1="30" y2="30"></line>
                <line stroke="#DFE0FF" strokeDasharray="4,4" strokeOpacity="0.6" x1="0" x2="700" y1="80" y2="80"></line>
                <line stroke="#DFE0FF" strokeDasharray="4,4" strokeOpacity="0.6" x1="0" x2="700" y1="130" y2="130"></line>
                <line stroke="#DFE0FF" strokeOpacity="0.6" x1="0" x2="700" y1="180" y2="180"></line>
                {/* Area Fill */}
                <path d="M 20 160 Q 140 145, 230 110 T 420 85 T 570 45 T 680 25 L 680 180 L 20 180 Z" fill="url(#marigoldGlow)"></path>
                {/* Area Stroke Line */}
                <path
                  d="M 20 160 Q 140 145, 230 110 T 420 85 T 570 45 T 680 25"
                  fill="none"
                  filter="url(#glow)"
                  stroke="url(#strokeGradient)"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
                {/* Highlight Points */}
                <circle cx="20" cy="160" fill="#FFFFFF" r="4" stroke="#F5A623" strokeWidth="2.5"></circle>
                <circle cx="150" cy="140" fill="#FFFFFF" r="4" stroke="#F5A623" strokeWidth="2.5"></circle>
                <circle cx="290" cy="100" fill="#FFFFFF" r="4" stroke="#F5A623" strokeWidth="2.5"></circle>
                <circle cx="430" cy="80" fill="#FFFFFF" r="4" stroke="#E07A5F" strokeWidth="2.5"></circle>
                <circle cx="560" cy="45" fill="#FFFFFF" r="4" stroke="#E07A5F" strokeWidth="2.5"></circle>
                <circle cx="680" cy="25" fill="#F5A623" r="6" stroke="#FFFFFF" strokeWidth="3"></circle>
              </svg>
            </div>

            {/* Month Labels */}
            <div className="flex items-center justify-between text-on-surface-variant font-code-sm text-xs pt-3 px-2">
              <span>Jan (₹8.2k)</span>
              <span>Feb (₹11.5k)</span>
              <span>Mar (₹14.8k)</span>
              <span>Apr (₹18.0k)</span>
              <span>May (₹21.2k)</span>
              <span className="text-secondary font-bold">Jun (₹24.5k)</span>
            </div>
          </div>

          {/* Right: Quick Actions Card (4 cols) */}
          <div className="lg:col-span-4 bg-surface-container-lowest p-5 sm:p-6 rounded-[20px] shadow-[0_2px_4px_rgba(61,64,91,0.04),0_8px_24px_rgba(61,64,91,0.06)] flex flex-col justify-between border border-surface-container">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-headline-sm text-lg text-on-surface font-bold">Quick Actions</h3>
                <span className="material-symbols-outlined text-primary-container">bolt</span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Instant one-tap operations for your artisan store.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 my-4">
              {/* 1. Create New Listing */}
              <button
                onClick={() => onNavigate?.("studio")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E07A5F] text-white font-label-md text-sm font-bold shadow-[0_0_16px_rgba(245,166,35,0.35)] hover:shadow-[0_0_24px_rgba(245,166,35,0.55)] hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                  <span>📸 Create New Listing</span>
                </div>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              {/* 2. Export GeM CSV */}
              <button
                onClick={() => alert("Downloading GeM Government Procurement CSV export (NIC 52110 compliant)...")}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface-container-low text-tertiary font-label-md text-sm font-semibold hover:bg-tertiary-fixed hover:text-on-tertiary-fixed transition-all cursor-pointer border border-surface-container"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">file_download</span>
                  <span>📤 Export GeM CSV</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-tertiary-container/30 font-bold">
                  v3.4
                </span>
              </button>

              {/* 3. Sync to ONDC Network */}
              <button
                onClick={() => alert("ONDC Beckn Gateway: All 8 live products refreshed across Paytm, PhonePe Pincode, and Mystore.")}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-label-md text-sm font-semibold hover:bg-surface-container transition-all cursor-pointer border border-surface-container"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-primary">sync</span>
                  <span>🔄 Sync to ONDC Network</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              </button>

              {/* 4. Generate Invoice */}
              <button
                onClick={() => alert("E-Way Bill & B2B GST tax invoice generated for Order #KST-782.")}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant font-label-md text-sm hover:bg-surface-container-high hover:text-on-surface transition-all cursor-pointer border border-surface-container"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">receipt</span>
                  <span>📄 Generate GST/e-Way Bill</span>
                </div>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Voice Input Helper Prompt */}
            <div className="p-2.5 rounded-xl bg-primary-fixed/40 flex items-center gap-2 border border-primary-container/20">
              <span className="material-symbols-outlined text-primary text-[20px]">
                record_voice_over
              </span>
              <span className="font-body-sm text-xs text-on-primary-fixed-variant">
                बोले: “नया दुपट्टा ₹2000 में जोड़ो” for hands-free AI voice upload.
              </span>
            </div>
          </div>
        </div>

        {/* ROW 3: LIVE PRODUCTS TABLE + SCHEME ALERTS (8 cols + 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Live Products Catalog (8 cols) */}
          <div className="lg:col-span-8 bg-surface-container-lowest p-5 sm:p-6 rounded-[20px] shadow-[0_2px_4px_rgba(61,64,91,0.04),0_8px_24px_rgba(61,64,91,0.06)] flex flex-col justify-between border border-surface-container">
            <div>
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-lg text-on-surface font-bold">
                    Live Products &amp; Inventory
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-code-sm text-[11px] font-bold">
                    ONDC Connected
                  </span>
                </div>
                <button
                  onClick={() => onNavigate?.("marketplace")}
                  className="font-label-sm text-xs text-secondary hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View all 12 items</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left font-body-sm text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-xs font-semibold rounded-xl">
                      <th className="py-3 px-3 rounded-l-xl">Product</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Price</th>
                      <th className="py-3 px-3">ONDC Status</th>
                      <th className="py-3 px-3">Views</th>
                      <th className="py-3 px-3 rounded-r-xl text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low">
                    {/* Row 1: Silk Dupatta */}
                    <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0 shadow-sm">
                            <img
                              className="w-full h-full object-cover"
                              alt="Banarasi silk dupatta"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIEErkXhobRsM0-dm4CcBwjpQThen7oYltXe3mcsbmBW3XopFWAGG6wobu2l8rpk2uOI0mu5dzXFnG6O_A4I6mYq5vdN-LfBa3yVA6OABplwY5hTztZExOBAEaBhoKSJUlNoWsFQlFIRFtclKC0ZKPyfGKtJkY9hlYqhAVgfgbNuzeo05ic4pSyU4VCCdHJNljCQ_Z75cfdm3lkl5N-Fsiq49IKltwvCedqxT_2cWmaIPmDZRBobFSSQ"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold leading-tight">
                              Handwoven Banarasi Silk Dupatta
                            </span>
                            <span className="font-code-sm text-[11px] text-on-surface-variant">
                              GI-IN-0012 • 4 units left
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant text-xs">Handloom / Zari</td>
                      <td className="py-3 px-3 font-bold text-on-surface">₹1,850</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Active
                        </span>
                      </td>
                      <td className="py-3 px-3 font-code-sm text-xs text-on-surface-variant">
                        247 views
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onNavigate?.("studio")}
                            className="w-7 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
                            title="Edit Listing"
                          >
                            <span className="material-symbols-outlined text-[15px]">edit</span>
                          </button>
                          <button
                            onClick={() => alert("Artisan Product QR code copied to clipboard!")}
                            className="w-7 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-secondary"
                            title="Share QR Code"
                          >
                            <span className="material-symbols-outlined text-[15px]">qr_code_2</span>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2: Terracotta Planter */}
                    <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0 shadow-sm">
                            <img
                              className="w-full h-full object-cover"
                              alt="Terracotta planter"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAzMk72kGWd_DnYugW-X4-iPyfzOA_A8UUA7uKGd7iSMN7Uij8mnpAFKHMEOgJeco4SqTGLeU26XiRZ2mS87QGEnuFIj8unXPM9ArriFvHZvmDIUZCHCmvpRbiPGE7keFFjqkGSE_KrEq3C5gjigS83LPGYuxOvDbzlCNTKmxCA4QfD98MvaTVMH_Gc0L7qv0IMgugA72zavhaMJWm9nRS1CcsxVnakneqGFp5WLzydkwEqCAl9ySbzg"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold leading-tight">
                              Terracotta Clay Planter (Medium)
                            </span>
                            <span className="font-code-sm text-[11px] text-on-surface-variant">
                              Cluster: Gorakhpur • 15 units
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant text-xs">Pottery &amp; Clay</td>
                      <td className="py-3 px-3 font-bold text-on-surface">₹450</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Active
                        </span>
                      </td>
                      <td className="py-3 px-3 font-code-sm text-xs text-on-surface-variant">
                        189 views
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onNavigate?.("studio")}
                            className="w-7 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
                            title="Edit Listing"
                          >
                            <span className="material-symbols-outlined text-[15px]">edit</span>
                          </button>
                          <button
                            onClick={() => alert("Product QR code copied!")}
                            className="w-7 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-secondary"
                            title="Share QR Code"
                          >
                            <span className="material-symbols-outlined text-[15px]">qr_code_2</span>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 3: Brocade Stole */}
                    <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0 shadow-sm">
                            <img
                              className="w-full h-full object-cover"
                              alt="Varanasi brocade stole"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZgdkw0tKFs4sLkRAMqhZx8aU6abaolk7slU8r5vUK_-F7hDU8yfQmfcZrZz6XbBJ_plHM3sSYSaaZL2Xrq5AdlKbSoHSY1YQcMw8DK8j4e3NNfd37QOyV-ej6580fH9M0pHPf_YQUFxXjyF-_3xFQ-1mzNSxNJi55_4kNKbUZccMUJrY_ECVMu8riUCj-NqDEx9qXSOTCI-reVjw22P5kKUltYdOl4CzepVcDOLOA4IZ3PVrXaSUWmw"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold leading-tight">
                              Varanasi Brocade Evening Stole
                            </span>
                            <span className="font-code-sm text-[11px] text-on-surface-variant">
                              GI-IN-0012 • 8 units left
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant text-xs">Handloom / Stoles</td>
                      <td className="py-3 px-3 font-bold text-on-surface">₹1,200</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Syncing
                        </span>
                      </td>
                      <td className="py-3 px-3 font-code-sm text-xs text-on-surface-variant">
                        92 views
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onNavigate?.("studio")}
                            className="w-7 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
                            title="Edit Listing"
                          >
                            <span className="material-symbols-outlined text-[15px]">edit</span>
                          </button>
                          <button
                            onClick={() => alert("Product QR code copied!")}
                            className="w-7 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-secondary"
                            title="Share QR Code"
                          >
                            <span className="material-symbols-outlined text-[15px]">qr_code_2</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between font-label-sm text-xs text-on-surface-variant gap-2">
              <span>Showing 3 of 12 catalog products</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span>All items synced with ONDC Beckn Protocol v1.2</span>
              </div>
            </div>
          </div>

          {/* Scheme Alerts & Grants (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* PM Vishwakarma Spotlight Card */}
            <div className="bg-gradient-to-br from-[#FFF8ED] to-[#FFEEDB] p-5 sm:p-6 rounded-[20px] shadow-[0_2px_4px_rgba(61,64,91,0.04),0_8px_24px_rgba(61,64,91,0.06)] relative overflow-hidden flex flex-col justify-between border border-secondary-container/30">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold">
                  Govt Entitlement
                </span>
                <span className="material-symbols-outlined text-secondary text-[22px]">policy</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-base text-on-surface font-bold">
                  PM Vishwakarma Scheme
                </h4>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                  Eligible for <strong className="text-secondary font-semibold">₹15,000 toolkit grant</strong> and collateral-free credit at 5% interest rate.
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={onOpenPehchan}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-secondary text-white font-label-md text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  <span>Apply with Pehchan ID →</span>
                </button>
              </div>
            </div>

            {/* Secondary Schemes Mini Stack */}
            <div className="bg-surface-container-lowest p-4 rounded-[20px] shadow-[0_2px_4px_rgba(61,64,91,0.04),0_8px_24px_rgba(61,64,91,0.06)] flex flex-col gap-2.5 border border-surface-container">
              <div
                onClick={() => alert("AHVY Scheme: 100% subsidized stall pass active for Dilli Haat & Pragati Maidan exhibitions.")}
                className="flex items-start gap-3 p-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">storefront</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold">
                    AHVY Dilli Haat Stall Pass
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    100% subsidized stall at Pragati Maidan.
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant ml-auto self-center">
                  chevron_right
                </span>
              </div>

              <div
                onClick={() => alert("GeM Portal: SC/ST MSE artisans receive 0% seller commission and waiver on tender earnest money deposits.")}
                className="flex items-start gap-3 p-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">gavel</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold">
                    GeM 0% Seller Commission
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    Direct bidding on PSU procurement tenders.
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant ml-auto self-center">
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 4: RECENT B2B INQUIRIES TABLE */}
        <div className="w-full bg-surface-container-lowest p-5 sm:p-6 rounded-[20px] shadow-[0_2px_4px_rgba(61,64,91,0.04),0_8px_24px_rgba(61,64,91,0.06)] flex flex-col gap-4 border border-surface-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-lg text-on-surface font-bold">
                  Recent Wholesale &amp; B2B Inquiries
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-code-sm text-[11px] font-bold">
                  {inquiryAccepted ? "2 Pending Action" : "3 Pending Action"}
                </span>
              </div>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                Verified domestic and export buyers seeking bulk craft production contracts.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate?.("marketplace")}
                className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Browse Marketplace
              </button>
              <button
                onClick={() => alert("Quotations Manager: 3 active contracts under escrow protection.")}
                className="px-3 py-1.5 rounded-full bg-primary text-white font-label-sm text-xs font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Manage Quotations
              </button>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left font-body-sm text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-xs font-semibold rounded-xl">
                  <th className="py-3 px-4 rounded-l-xl">Buyer Organization</th>
                  <th className="py-3 px-4">Inquiry Product</th>
                  <th className="py-3 px-4">Bulk Units</th>
                  <th className="py-3 px-4">Offered Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Quick Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {/* Record 1 */}
                <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface font-code-sm text-xs">
                        RE
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold">
                          Ritu Exports
                        </span>
                        <span className="font-code-sm text-[11px] text-on-surface-variant">
                          Jaipur, Rajasthan • Verified Buyer ✓
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface font-medium">
                    Handwoven Banarasi Silk Dupatta
                  </td>
                  <td className="py-3.5 px-4 font-code-sm text-on-surface font-bold">150 pcs</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-secondary">₹1,650 / pc</span>
                    <div className="text-[10px] text-on-surface-variant font-code-sm">
                      Total: ₹2,47,500
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-[11px] font-bold ${
                        inquiryAccepted
                          ? "bg-tertiary-fixed text-on-tertiary-fixed"
                          : "bg-secondary-fixed text-on-secondary-fixed"
                      }`}
                    >
                      {inquiryAccepted ? "Offer Accepted ✓" : "New Inquiry"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-code-sm text-xs text-on-surface-variant">
                    14 Jul 2024
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setInquiryAccepted(true);
                          alert("Offer from Ritu Exports accepted! ₹74,250 (30% advance) locked in escrow for Varanasi cluster.");
                        }}
                        className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs font-bold hover:bg-primary-fixed-dim transition-colors cursor-pointer"
                      >
                        {inquiryAccepted ? "Accepted" : "Accept Offer"}
                      </button>
                      <button
                        onClick={() => alert("Counter proposal template opened: Set suggested rate and delivery timeframe.")}
                        className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-xs hover:bg-surface-container-high transition-colors cursor-pointer"
                      >
                        Counter
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Record 2 */}
                <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface font-code-sm text-xs">
                        FW
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold">
                          FabIndia Wholesale
                        </span>
                        <span className="font-code-sm text-[11px] text-on-surface-variant">
                          New Delhi • Enterprise Partner ✓
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface font-medium">
                    Varanasi Brocade Stoles
                  </td>
                  <td className="py-3.5 px-4 font-code-sm text-on-surface font-bold">300 pcs</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-tertiary">₹1,150 / pc</span>
                    <div className="text-[10px] text-on-surface-variant font-code-sm">
                      Total: ₹3,45,000
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-bold">
                      Quotation Sent
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-code-sm text-xs text-on-surface-variant">
                    28 Jul 2024
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert("Opening chat thread with FabIndia Merchandising Team...")}
                      className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-xs hover:bg-surface-container-high transition-colors cursor-pointer"
                    >
                      View Thread (2)
                    </button>
                  </td>
                </tr>

                {/* Record 3 */}
                <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface font-code-sm text-xs">
                        JC
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold">
                          Jaypore Curation
                        </span>
                        <span className="font-code-sm text-[11px] text-on-surface-variant">
                          Mumbai • Curated Catalog ✓
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface font-medium">
                    Exclusive Kadwa Silk Sarees
                  </td>
                  <td className="py-3.5 px-4 font-code-sm text-on-surface font-bold">25 pcs</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-on-surface">₹4,200 / pc</span>
                    <div className="text-[10px] text-on-surface-variant font-code-sm">
                      Total: ₹1,05,000
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold">
                      Contract Pending
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-code-sm text-xs text-on-surface-variant">
                    05 Aug 2024
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert("e-Contract signed with Aadhaar e-Sign! Jaypore advance escrow activated.")}
                      className="px-3 py-1.5 rounded-full bg-tertiary text-white font-label-sm text-xs font-bold hover:bg-tertiary/90 transition-colors cursor-pointer"
                    >
                      Sign e-Contract
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-body-sm text-xs gap-2 border border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
              <span>
                All buyer inquiries protected by KalaSetu Escrow Guarantee with 30% advance payout on order acceptance.
              </span>
            </div>
            <span className="font-code-sm text-on-surface font-bold">
              Ministry of Social Justice &amp; Empowerment Backed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
