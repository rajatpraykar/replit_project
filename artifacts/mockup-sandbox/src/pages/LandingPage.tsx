import { useState } from "react";
import type { Page } from "../components/Navbar";

interface LandingPageProps {
  lang: "en" | "hi";
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ lang, onNavigate }: LandingPageProps) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [imageSliderPos, setImageSliderPos] = useState(50);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-surface">
      {/* ═══ 1. HERO SECTION ═══ */}
      <section className="relative w-full bg-surface py-12 lg:py-20 overflow-hidden">
        {/* Ambient Background Lighting & Cultural Aura */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-container/15 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-secondary-container/10 blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Value Proposition & Onboarding CTAs (Col 7) */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5">
              {/* Hackathon Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-highest/80 shadow-sm border border-outline-variant/30">
                <span
                  className="material-symbols-outlined text-[18px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  emoji_events
                </span>
                <span className="font-label-sm text-xs font-bold text-inverse-surface tracking-wide uppercase">
                  Smart India Hackathon 2024 Grand Finalist • PS-26090
                </span>
              </div>

              {/* Headline */}
              <div className="flex flex-col gap-1">
                <h1 className="font-headline-2xl text-3xl sm:text-4xl lg:text-[52px] lg:leading-[62px] text-inverse-surface font-extrabold tracking-tight">
                  From Village Craft to{" "}
                  <span className="relative inline-block text-primary">
                    Digital Market
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-primary-container"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 240 12"
                    >
                      <path
                        d="M3 9C58.5 2.5 174 2.5 237 9"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="4"
                      ></path>
                    </svg>
                  </span>
                </h1>
                <p className="font-['Noto_Sans_Devanagari'] font-bold text-xl sm:text-2xl text-secondary pt-2">
                  गाँव की कला, डिजिटल बाज़ार का सशक्त सेतु
                </p>
              </div>

              {/* Subtitle / Body */}
              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Empowering rural master artisans with multimodal AI in under 30 seconds: automatic studio photo enhancement, regional voice-to-catalog, fair-wage pricing calculation, and direct one-click broadcast across ONDC Network and GeM.
              </p>

              {/* Action Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate("studio")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-label-md text-sm sm:text-base text-white font-bold bg-gradient-to-r from-primary-container to-secondary shadow-[0_0_24px_rgba(245,166,35,0.45)] hover:shadow-[0_0_32px_rgba(245,166,35,0.65)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                  <span>📸 Create Your First Listing Free</span>
                </button>

                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-label-md text-sm sm:text-base text-inverse-surface bg-surface-container-lowest shadow-sm hover:bg-surface-container-high transition-all border border-outline-variant/30 cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined text-secondary text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_circle
                  </span>
                  <span>Watch 45s Workflow</span>
                </button>
              </div>

              {/* Trust Validation Strip */}
              <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-3 text-on-surface-variant font-label-sm text-xs sm:text-sm">
                <span className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    verified
                  </span>{" "}
                  ONDC Protocol Certified
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    verified
                  </span>{" "}
                  GeM MSE Ready
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    verified
                  </span>{" "}
                  MoSJE Endorsed
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    verified
                  </span>{" "}
                  Bhashini AI 22 Langs
                </span>
              </div>
            </div>

            {/* Right Column: 3D Mockup & Live Dynamic Telemetry Cards (Col 5) */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-8">
              {/* Background Mandala SVG Accent */}
              <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
                <svg
                  className="w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] text-primary-container animate-[spin_120s_linear_infinite]"
                  fill="currentColor"
                  viewBox="0 0 200 200"
                >
                  <path
                    d="M100 0 C105 50, 150 95, 200 100 C150 105, 105 150, 100 200 C95 150, 50 105, 0 100 C50 95, 95 50, 100 0 Z"
                    fillOpacity="0.12"
                  ></path>
                  <circle
                    cx="100"
                    cy="100"
                    fill="none"
                    r="75"
                    stroke="currentColor"
                    strokeDasharray="4 6"
                    strokeWidth="1.5"
                  ></circle>
                  <circle
                    cx="100"
                    cy="100"
                    fill="none"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  ></circle>
                  <circle
                    cx="100"
                    cy="100"
                    fill="currentColor"
                    fillOpacity="0.15"
                    r="20"
                  ></circle>
                </svg>
              </div>

              {/* Mobile Screen Shell Container */}
              <div className="relative z-10 w-[290px] sm:w-[320px] rounded-[44px] bg-inverse-surface p-3 shadow-[0_24px_64px_rgba(43,46,72,0.28)] transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Notch */}
                <div className="w-full h-6 bg-inverse-surface rounded-t-[36px] flex items-center justify-center relative">
                  <div className="w-24 h-4 bg-on-surface/80 rounded-full"></div>
                </div>

                {/* Internal Phone Screen */}
                <div className="w-full bg-surface-container-lowest rounded-[32px] overflow-hidden p-3 flex flex-col gap-2.5">
                  {/* App Bar */}
                  <div className="flex items-center justify-between px-1 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                      <span className="font-code-sm text-xs text-inverse-surface font-bold">
                        KalaSetu Studio
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] font-bold">
                      LIVE SYNC
                    </span>
                  </div>

                  {/* Product Image Showcase Mock */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover"
                      alt="Terracotta Indian pottery"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCI9Pl7adiZ4-DnWEGjx7qAdVd4N_vRqQruZJ5DF2mrekZdmXhLJGIrw2_KFp8ckCipY9_CWaseW6VECGkqnXaAB6kaWvIaoWFyTmKz87o1Bcy0_sP6f9VJlUanQy2sP5xNeanzhZ7rZRTCsAemsM9tNfXyBK8N-k99OqwpX-yOw-IxWju6eHz1ywMmPjykIv7zARXWVxSxwmUB8hP7UE6z2B2tVtOQPD2dleIfcmPCLKSrg_uE3UyuQ"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm flex items-center gap-1 text-[11px] font-bold text-inverse-surface">
                      <span className="material-symbols-outlined text-[14px] text-primary">
                        auto_fix_high
                      </span>
                      <span>AI Relit &amp; Isolated</span>
                    </div>
                  </div>

                  {/* Artisan Voice Transcription Preview */}
                  <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-secondary">
                          mic
                        </span>{" "}
                        Bhashini Audio
                      </span>
                      <span className="text-tertiary font-bold">Awadhi → EN</span>
                    </div>
                    <p className="font-['Noto_Sans_Devanagari'] text-[12px] text-on-surface leading-tight line-clamp-2">
                      "मिट्टी के बर्तन पर प्राकृतिक रंगों से 6 घंटे हाथ से नक्काशी की गई..."
                    </p>
                  </div>

                  {/* Live Fair Trade Price Tag */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-high/60">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant font-label-sm">
                        Fair Wage Base
                      </span>
                      <span className="font-headline-sm text-base text-inverse-surface font-bold">
                        ₹1,850
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">
                      <span>ONDC Ready</span>
                      <span className="material-symbols-outlined text-[12px]">done_all</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badges / Satellites */}
              {/* Top Right Chip */}
              <div className="absolute -top-2 -right-2 sm:right-2 z-20 bg-surface-container-lowest px-3.5 py-2.5 rounded-2xl shadow-[0_12px_28px_rgba(43,46,72,0.12)] border border-outline-variant/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">magic_button</span>
                </div>
                <div>
                  <p className="font-label-sm text-xs text-inverse-surface font-bold">
                    AI Studio Polish
                  </p>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    Zero shadows, 4K render
                  </p>
                </div>
              </div>

              {/* Bottom Left Chip */}
              <div className="absolute -bottom-4 -left-4 sm:left-0 z-20 bg-surface-container-lowest px-3.5 py-2.5 rounded-2xl shadow-[0_12px_28px_rgba(43,46,72,0.12)] border border-outline-variant/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-xl">currency_rupee</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-sm text-xs text-inverse-surface font-bold">
                      ₹240/day → ₹850/item
                    </span>
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    +254% fair wage floor guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. STATS TICKER STRIP ═══ */}
      <section className="w-full bg-gradient-to-r from-inverse-surface via-[#343752] to-inverse-surface text-inverse-on-surface py-4 shadow-inner overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-around gap-y-4 gap-x-6 text-center">
            <div className="flex items-center gap-2">
              <span className="text-primary-container text-xl">🪔</span>
              <div className="text-left">
                <p className="font-headline-sm text-lg text-surface-container-lowest font-bold">
                  12,400+
                </p>
                <p className="font-label-sm text-xs text-surface-dim">Artisans Registered</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-container text-xl">🪔</span>
              <div className="text-left">
                <p className="font-headline-sm text-lg text-surface-container-lowest font-bold">
                  ₹2.4 Cr+
                </p>
                <p className="font-label-sm text-xs text-surface-dim">Net Artisan Revenue</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-container text-xl">🪔</span>
              <div className="text-left">
                <p className="font-headline-sm text-lg text-surface-container-lowest font-bold">
                  +250%
                </p>
                <p className="font-label-sm text-xs text-surface-dim">Wage Value Multiplier</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-container text-xl">🪔</span>
              <div className="text-left">
                <p className="font-headline-sm text-lg text-surface-container-lowest font-bold">
                  8 States
                </p>
                <p className="font-label-sm text-xs text-surface-dim">Pan-India Craft Clusters</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-container text-xl">🪔</span>
              <div className="text-left">
                <p className="font-headline-sm text-lg text-surface-container-lowest font-bold">
                  22 Languages
                </p>
                <p className="font-label-sm text-xs text-surface-dim">Bhashini Multimodal AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. HOW IT WORKS SECTION (3-STEP TACTILE CARDS) ═══ */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-2 mb-12">
            <span className="px-3.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs tracking-wider uppercase font-bold">
              Frictionless 30-Second Workflow
            </span>
            <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-inverse-surface font-extrabold">
              How KalaSetu Works —{" "}
              <span className="font-['Noto_Sans_Devanagari'] text-secondary font-bold">
                कैसे काम करता है
              </span>
            </h2>
            <p className="font-body-lg text-base text-on-surface-variant">
              No typing required. Designed specifically for vernacular artisans to broadcast globally with three intuitive voice and camera actions.
            </p>
          </div>

          {/* 3 Steps Mosaic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            {/* Step 1 */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_20px_rgba(61,64,91,0.06)] flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(61,64,91,0.12)] transition-all border border-surface-container">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center font-headline-sm text-xl font-bold">
                    01
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold">
                    AI Computer Vision
                  </span>
                </div>
                <div className="w-full h-44 rounded-2xl bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Traditional handloom weaver in Varanasi taking phone picture of saree"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT-uf_HvCxy-Entwdx0qOlVVJDSD5BbfnyEPpaFItTIPBVX1AtvxOSDtqEWNDJwKVcFcs-moj4oEFLBasnD-E9VDBMnVb7i2_4g2hPloJKcWHs5d-yiBltgZwpFAs0F2tKdgTL2oNkAyMOt1jMqZGTAZm-JKGBYMngWbvN08lQVz7LPzvI4Qakjh3YTuf20_3aVkqRznxrwX_rfHFoZTQnJMJ8BFBPzJlAi6fISNBjSn_6IRbZmSVhgQ"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-sm text-lg text-inverse-surface font-bold">
                    Snap Your Craft
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    Take a quick handheld photo in your workshop. KalaSetu isolates your product, fixes poor village lighting, removes clutter, and creates studio-standard white background commercial photos.
                  </p>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-2 font-label-sm text-xs font-semibold text-primary">
                <span className="material-symbols-outlined text-[18px]">camera</span>
                <span>Zero staging equipment needed</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_20px_rgba(61,64,91,0.06)] flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(61,64,91,0.12)] transition-all border border-surface-container">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-secondary-container/30 text-secondary flex items-center justify-center font-headline-sm text-xl font-bold">
                    02
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold">
                    Bhashini ASR &amp; LLM
                  </span>
                </div>
                <div className="w-full h-44 rounded-2xl bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Elderly craftsman speaking into smartphone microphone"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkEac9UHVMyzjqNPbnm2oyJFCUHQFtD50-8bVvWtmZ6pfQV8oRx-l7uoviDqFVn3RAhvcEoxdGGL5oNHKIfiwu2BAJyIv8xtdi0R2_Pae0RJFrMQjNSzPGskVtY0IxclCd5fKJ7dzfoXNGyOwIfdBE_89PPr1lS1pk887iB6rjVkHkfqidP9q91OKgoJkQr2yo8_UewOo1tuKzdBtIvy3wfKNdl0jyhhZVRCxOGMAnmCXUKins0luMvw"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-sm text-lg text-inverse-surface font-bold">
                    Speak in Your Tongue
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    Narrate your craft in your native mother dialect—Hindi, Gujarati, Tamil, Bengali, or Marathi. Our Bhashini pipeline transcribes, summarizes, and produces verified bilingual technical specifications.
                  </p>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-2 font-label-sm text-xs font-semibold text-secondary">
                <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
                <span>22 Official Indian Languages</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_20px_rgba(61,64,91,0.06)] flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(61,64,91,0.12)] transition-all border border-surface-container">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-tertiary-container/40 text-tertiary flex items-center justify-center font-headline-sm text-xl font-bold">
                    03
                  </span>
                  <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-bold">
                    ONDC + GeM Protocols
                  </span>
                </div>
                <div className="w-full h-44 rounded-2xl bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Courier executive picking up craft box marked with KalaSetu GI tag seal"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdIMwHxXqw4usArh81JCXtNDWxfw0SbOSlwNb6aa_WbT98OI6fx6nl578d6tMrB-UEuRJ0stlMjSMBHRl6lnfGpPkYI6i9PZPq7Au7TYPdZRE0WtbgJ7EUAyYVimOZjnomEgDMVc24fAV8avltAHx-eLnXGOwsXoT2gLJfH7UFsdao4ytgyPBaq5g6TWh5Uxt1oMOhZHnkdcwNsPOnMtyzgdb16WyvvEVvdalILqgSQVfwwkJVUJV6rQ"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-sm text-lg text-inverse-surface font-bold">
                    Publish &amp; Earn Fairly
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    Our algorithm automatically calculates fair pricing based on state wage minimums, material costs, and hours worked. Then, one tap syncs products to ONDC apps, GeM, and export portals.
                  </p>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-2 font-label-sm text-xs font-semibold text-tertiary">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
                <span>Direct bank transfer via UPI / Aadhaar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. DEEP-DIVE ARCHITECTURAL FEATURES (ALTERNATING SHOWCASE) ═══ */}
      <section className="w-full bg-surface py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-16 lg:gap-24">
          {/* Feature A: Fair Trade Pricing Engine */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text details (Col 6) */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed w-fit font-label-sm text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">calculate</span>
                <span>Ethical Algorithmic Commerce</span>
              </div>
              <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-inverse-surface font-bold">
                AI-Powered Fair-Trade Pricing Engine
              </h2>
              <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
                Artisans are systematically exploited by middle agents taking up to 70% margins. KalaSetu’s state-anchored formula computes a non-negotiable living wage base price before listing.
              </p>

              {/* Interactive Formula Strip */}
              <div className="p-4 rounded-2xl bg-surface-container flex flex-col gap-2">
                <span className="font-code-sm text-xs text-inverse-surface font-bold">
                  Dynamic Wage Baseline Formula:
                </span>
                <div className="font-code-sm text-xs text-on-surface-variant bg-surface-container-lowest p-3 rounded-xl overflow-x-auto shadow-sm">
                  <code>
                    P_base = (Hours × Wage_State × Skill_Multiplier) + Raw_Materials + 20% Sustainable Reserve
                  </code>
                </div>
                <p className="font-label-sm text-xs text-tertiary flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Validated against Ministry of Labour &amp; Employment Gazette Data</span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-surface-container-low text-center">
                  <span className="font-label-sm text-xs text-on-surface-variant">
                    Avg Middleman Cut
                  </span>
                  <p className="font-headline-sm text-xl text-error font-bold">-65%</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low text-center">
                  <span className="font-label-sm text-xs text-on-surface-variant">
                    KalaSetu Retained
                  </span>
                  <p className="font-headline-sm text-xl text-tertiary font-bold">96.5%</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low text-center">
                  <span className="font-label-sm text-xs text-on-surface-variant">
                    Settlement Cycle
                  </span>
                  <p className="font-headline-sm text-xl text-primary font-bold">T+1 Day</p>
                </div>
              </div>
            </div>

            {/* Calculator Visualization (Col 6) */}
            <div className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-3xl shadow-[0_8px_32px_rgba(61,64,91,0.08)] border border-surface-container">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container-low">
                <div>
                  <h4 className="font-headline-sm text-lg text-inverse-surface font-bold">
                    Sample Valuation Breakdown
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Madhubani Hand-Painted Canvas (18x24")
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-bold">
                  Bihar Cluster
                </span>
              </div>

              {/* Price Slices */}
              <div className="flex flex-col gap-2.5 pt-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                  <div className="flex items-center gap-2 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                    <span>Artisan Labor (14.5 Hours @ ₹92/hr)</span>
                  </div>
                  <span className="font-code-sm text-sm font-bold text-inverse-surface">
                    ₹1,334.00
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                  <div className="flex items-center gap-2 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-lg">palette</span>
                    <span>Organic Mineral Pigments &amp; Canvas</span>
                  </div>
                  <span className="font-code-sm text-sm font-bold text-inverse-surface">
                    ₹280.00
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                  <div className="flex items-center gap-2 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-tertiary text-lg">
                      energy_savings_leaf
                    </span>
                    <span>Artisan Welfare &amp; Health Reserve (10%)</span>
                  </div>
                  <span className="font-code-sm text-sm font-bold text-inverse-surface">
                    ₹161.40
                  </span>
                </div>

                {/* Final Result Multi-tiers */}
                <div className="mt-2 pt-2 grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-primary-fixed/50 border border-primary-container/30">
                    <p className="font-label-sm text-xs text-on-primary-fixed font-semibold">
                      B2C Retail
                    </p>
                    <p className="font-headline-sm text-lg text-inverse-surface font-bold">
                      ₹1,850
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container">
                    <p className="font-label-sm text-xs text-on-surface-variant font-semibold">
                      B2B Wholesale
                    </p>
                    <p className="font-headline-sm text-lg text-inverse-surface font-bold">
                      ₹1,420
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container">
                    <p className="font-label-sm text-xs text-on-surface-variant font-semibold">
                      Global Export
                    </p>
                    <p className="font-headline-sm text-lg text-inverse-surface font-bold">
                      ₹2,490
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature B: Studio Grade Image Enhancement (Before/After) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Comparison Card (Col 6) */}
            <div className="lg:col-span-6 bg-surface-container-lowest p-5 sm:p-6 rounded-3xl shadow-[0_8px_32px_rgba(61,64,91,0.08)] border border-surface-container">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Before Card */}
                <div className="flex flex-col gap-1.5">
                  <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover"
                      alt="Raw unedited phone capture of blue pottery vase"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMSTaQFW_pD_NlMk-Oa6NeN5gViHxTi4QuhkfSrB5J0zQuhodmm4Rjmr6YGGMB93Tzv_gKlhmtbB2soN2PRPzXGVnkdfR6q4dgPRPIADocmPeUBOkIWE07vRTqwnyOPm5Gy9tRVTzRFoRiDa3WYXBMTw7XmKbl3bDSpbV4NGVdex3L_pNHELG2uSKLp4-5TBHulvRfNjZMKZoL3PTJ1-mL7sBP6oHGnJzERNX6DwbsO6FgIwQs_vBvKw"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-inverse-surface/80 text-inverse-on-surface text-[11px] font-bold">
                      RAW CAPTURE
                    </span>
                  </div>
                  <p className="font-label-sm text-xs text-on-surface-variant text-center">
                    Mud floor, shadows, uneven angles
                  </p>
                </div>

                {/* After Card */}
                <div className="flex flex-col gap-1.5">
                  <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden bg-surface-container shadow-[0_0_20px_rgba(245,166,35,0.25)]">
                    <img
                      className="w-full h-full object-cover"
                      alt="High resolution studio photo of Jaipur blue pottery vase"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4-yesCbbvmw3BwbyXyILloXoclItOdGbVjh01ryrMA0wYrc8BJ-bUoILoUKMOtufjINgl3A6Kh3duSQ6Idn3_BRGIPFie7Cofxk_f1R-YMb2iDzOfQxrbuaTW9W2oNuAyXDopAiRWJzrzbqY7Yk4NxStxgWFTamkLw9_Mouwo1H2wJX_I7LUDd-8pFF6gdU0VNJYGMYh71BShfng0Hdj-2MpczkRlXAaJ4i56yE2Q34LaRZQ_YJNg3Q"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container text-[11px] font-bold">
                      ✨ AI ENHANCED
                    </span>
                  </div>
                  <p className="font-label-sm text-xs text-primary text-center font-bold">
                    E-commerce ready in 4.2 seconds
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-surface-container-high/40 flex items-center justify-between text-xs text-on-surface-variant font-code-sm">
                <span>Model: SegmentAnything-Craft v2.4</span>
                <span className="text-tertiary font-bold">Resolution: 3840×2160 UltraHD</span>
              </div>
            </div>

            {/* Text details (Col 6) */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit font-label-sm text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">photo_camera_front</span>
                <span>Zero Production Costs</span>
              </div>
              <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-inverse-surface font-bold">
                Studio-Grade Imagery from Dusty Workshop Floors
              </h2>
              <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
                Artisans often fail e-commerce quality thresholds because major buyer platforms reject dimly lit mobile photos. KalaSetu applies contextual segmenting tailored for metallic, fabric, and pottery textures.
              </p>
              <ul className="flex flex-col gap-2.5 font-body-md text-sm sm:text-base text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">
                    check_circle
                  </span>
                  <span>Automated background detachment without blurring delicate fabric edges</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">
                    check_circle
                  </span>
                  <span>Synthetic brass, terracotta &amp; silk diffuse lighting reconstruction</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">
                    check_circle
                  </span>
                  <span>Amazon, ONDC, Flipkart, and GeM export-spec compliant format outputs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature C: Direct ONDC & GeM Network Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text details (Col 6) */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed w-fit font-label-sm text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">hub</span>
                <span>Open Commerce Beckn Protocol</span>
              </div>
              <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-inverse-surface font-bold">
                Direct ONDC &amp; GeM Network Distribution
              </h2>
              <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
                One single catalog entry immediately distributes to Paytm, Pincode by PhonePe, Mystore, and the Government e-Marketplace (GeM) public procurement catalog without multiple seller account fees.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1.5 rounded-full bg-surface-container font-label-sm text-xs font-semibold text-inverse-surface">
                  Paytm ONDC ✓
                </span>
                <span className="px-3 py-1.5 rounded-full bg-surface-container font-label-sm text-xs font-semibold text-inverse-surface">
                  PhonePe Pincode ✓
                </span>
                <span className="px-3 py-1.5 rounded-full bg-surface-container font-label-sm text-xs font-semibold text-inverse-surface">
                  Mystore ✓
                </span>
                <span className="px-3 py-1.5 rounded-full bg-surface-container font-label-sm text-xs font-semibold text-inverse-surface">
                  GeM Portal ✓
                </span>
                <span className="px-3 py-1.5 rounded-full bg-surface-container font-label-sm text-xs font-semibold text-inverse-surface">
                  Crafts Council Int'l ✓
                </span>
              </div>
            </div>

            {/* Beckn Protocol Terminal Card (Col 6) */}
            <div className="lg:col-span-6 bg-inverse-surface text-inverse-on-surface p-6 rounded-3xl shadow-xl overflow-hidden border border-outline/20">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error"></span>
                  <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                  <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                  <span className="font-code-sm text-xs text-surface-dim pl-2">
                    ondc_bpp_publish.json
                  </span>
                </div>
                <span className="text-tertiary-fixed-dim font-code-sm text-xs font-bold">
                  200 OK
                </span>
              </div>
              <pre className="font-code-sm text-xs leading-relaxed text-surface-dim overflow-x-auto p-4 bg-surface-container-high/10 rounded-xl mt-3">
                <code>{`{
  "context": {
    "domain": "nic2004:52110",
    "action": "on_search",
    "bpp_id": "api.kalasetu.in/ondc"
  },
  "message": {
    "catalog": {
      "bpp/descriptor": { "name": "KalaSetu Artisan Guild" },
      "bpp/providers": [{
        "id": "ARTISAN_VNS_982",
        "gi_tag": "GI-IN-0028 Banaras Brocade",
        "price": { "currency": "INR", "value": "4850.00" },
        "wage_transparency_score": "0.98"
      }]
    }
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. REAL ARTISAN IMPACT & GOVERNMENT SCHEMES BANNER ═══ */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2 mb-12">
            <span className="px-3.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs tracking-wider uppercase font-bold">
              Ground Reality
            </span>
            <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-inverse-surface font-extrabold">
              Real Artisans. Real Independence.
            </h2>
            <p className="font-body-lg text-base text-on-surface-variant">
              Hear how weavers, potters, and sculptors across India expanded their monthly livelihoods.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Artisan 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-4 border border-surface-container">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-primary-container">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="font-['Noto_Sans_Devanagari'] text-sm sm:text-base text-on-surface italic leading-relaxed">
                  "पहले बिचौलिए हमारी 2 हफ्ते की मेहनत के सिर्फ ₹600 देते थे। कलासेतु पर सीधे दिल्ली और बेंगलुरु के ग्राहक मिले, अब एक साड़ी का ₹4,500 मिलता है।"
                </p>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  "Earlier, middlemen paid just ₹600 for 2 weeks of weaving. On KalaSetu, buyers pay ₹4,500 direct to my bank."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-surface-container-low">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Sunita Devi portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC2rkhuuIbzfIPTj2MtqeuyfzLAAXZIh1DkvouqhDLxeFH9QHEChBgYuhVPMbV1bZFvknWmcVYq2UZhNbcH_dpllHWvWMjKJsabDtl0slvrkWGFP6AroeUwTUgKPUb7dkeafoD2NaKOORvbHWw4do7OWjYgJThp62oMei0rHKEg0_mrt9an9vNqeBdUBvQjhjrZ7GfGhNxcKLY4829FZFwJg_4sM9O_9Zkdx8UTVCHwaD1xn9_s2l5hA"
                  />
                </div>
                <div>
                  <p className="font-headline-sm text-sm text-inverse-surface font-bold">
                    Sunita Devi
                  </p>
                  <p className="font-label-sm text-xs text-on-surface-variant">
                    Varanasi Handloom Guild, UP
                  </p>
                </div>
              </div>
            </div>

            {/* Artisan 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-4 border border-surface-container">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-primary-container">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="font-['Noto_Sans_Devanagari'] text-sm sm:text-base text-on-surface italic leading-relaxed">
                  "मुझे अंग्रेज़ी नहीं आती। बस मोबाइल में बोलकर पूरा कैटलॉग बन गया। सरकारी GeM पोर्टल पर हमारी पीतल की घंटियों के 500 पीस का आर्डर आया।"
                </p>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  "I don't know English. I just spoke in Hindi, and the catalog was generated. We received an order of 500 brass items on GeM."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-surface-container-low">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Rameshwar Prasad portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4UXd7ph_40Vl8DjNqD46jNJcZ-eDWuuXnFloDkvD7UMLFGGvRZBPe3DfNEbzx3gTJanWDv3zG8MIhQWbYNwVM_OWd7frNAVoRZrsfOUFkeZ9j2V-5WHA1t3YKfMpPA3zCOoELv4bp8ZnUa7w3neK1RCemkzLw8HUAegXwvgGHWiZteBsU4rCSzECBI_IvblWIayd3BrnCWOUe8xamkHAvGLniosReV0LyU2C7ebnNLBzpZ7B69xFz0Q"
                  />
                </div>
                <div>
                  <p className="font-headline-sm text-sm text-inverse-surface font-bold">
                    Rameshwar Prasad
                  </p>
                  <p className="font-label-sm text-xs text-on-surface-variant">
                    Moradabad Metalcraft, UP
                  </p>
                </div>
              </div>
            </div>

            {/* Artisan 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-4 border border-surface-container">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-primary-container">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="font-['Noto_Sans_Devanagari'] text-sm sm:text-base text-on-surface italic leading-relaxed">
                  "ब्लू पॉटरी के फोटो खुद स्टूडियो जैसे बन गए। किसी फोटोग्राफर को ₹5000 देने की ज़रूरत नहीं पड़ी। सब कुछ फोन से 1 मिनट में हो गया।"
                </p>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  "The Blue Pottery product pictures turned out like high-end commercial studio photos instantly without paying photographers."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-surface-container-low">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Meera Rathore portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmTTYxnK-XevpgR2f7gLNdCQ1eWFXAP6JxRp6NAZMSQRlyef-YJzS3WyikgiyF45vm10qbbm6NL44HxvfwWucWkdLDfR3sK8TQC-xpWJPRAeNQyg2C39LH1IhTuVBvmTkANcgEYNtMMsQO5NxHivN4DsxVdOBLwHv6ZjYxZ-k9uSr-b8Pxd7WANLSH_BoCqbxtCw0vGQC8t9LdkPBlUz5TomtBa0URnSxf-_G2kTnPDZBKpY_E2z32Dg"
                  />
                </div>
                <div>
                  <p className="font-headline-sm text-sm text-inverse-surface font-bold">
                    Meera Rathore
                  </p>
                  <p className="font-label-sm text-xs text-on-surface-variant">
                    Jaipur Ceramic Craft, Rajasthan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Government Scheme Banner Strip */}
          <div className="w-full rounded-3xl bg-gradient-to-r from-tertiary via-[#2a5944] to-tertiary p-6 text-on-tertiary shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-lowest/15 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl text-white">account_balance</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-base sm:text-lg text-white font-bold">
                  Direct Government Scheme Linkages
                </h4>
                <p className="font-body-sm text-xs sm:text-sm text-surface-dim">
                  KalaSetu automatically links verified artisan profiles with national welfare schemes:
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-surface-container-lowest/20 font-label-sm text-xs font-semibold text-white">
                PM Vishwakarma (₹15,000 Toolkit)
              </span>
              <span className="px-3 py-1.5 rounded-full bg-surface-container-lowest/20 font-label-sm text-xs font-semibold text-white">
                MUDRA Shishu Loan
              </span>
              <span className="px-3 py-1.5 rounded-full bg-surface-container-lowest/20 font-label-sm text-xs font-semibold text-white">
                AHVY Scheme
              </span>
              <span className="px-3 py-1.5 rounded-full bg-surface-container-lowest/20 font-label-sm text-xs font-semibold text-white">
                GeM MSE Exemption
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. FULL-WIDTH PRE-FOOTER CTA ═══ */}
      <section className="w-full bg-gradient-to-r from-primary-container via-[#ea8d40] to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-surface-container-lowest/10 blur-2xl pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 text-center flex flex-col items-center gap-6 relative z-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h2 className="font-headline-2xl text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold leading-tight">
              Ready to Take Your Craft to the World?
            </h2>
            <p className="font-['Noto_Sans_Devanagari'] text-lg sm:text-xl text-white/95 font-semibold">
              अपनी कला को देश-विदेश के बाज़ारों तक पहुँचाएँ — पूर्णतः निःशुल्क
            </p>
            <p className="font-body-lg text-sm sm:text-base text-white/85 pt-1">
              Zero setup fees for rural artisans. Join 12,400+ craftsmen earning dignified, automated, fair livelihood via the open digital economy.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate("studio")}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full font-label-md text-sm sm:text-base font-bold text-inverse-surface bg-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary text-[22px]">add_a_photo</span>
              <span>Create Free Artisan Account</span>
            </button>
            <button
              onClick={() => onNavigate("marketplace")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-label-md text-sm sm:text-base font-semibold text-white bg-inverse-surface/30 backdrop-blur-md shadow hover:bg-inverse-surface/50 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              <span>I'm a B2B Bulk / Corporate Buyer</span>
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2 text-white/80 font-label-sm text-xs">
            <span>✓ Instant Aadhaar / Pehchan Verification</span>
            <span>•</span>
            <span>✓ Zero Commission on GeM Government Orders</span>
          </div>
        </div>
      </section>

      {/* ═══ INTERACTIVE WORKFLOW MODAL ═══ */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 relative animate-fadeIn border border-surface-container">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">play_circle</span>
              <h3 className="font-headline-sm text-lg text-inverse-surface font-bold">
                KalaSetu 30-Sec Live Flow
              </h3>
            </div>

            <p className="font-body-md text-sm text-on-surface-variant">
              Watch how non-literate master artisans convert vernacular spoken audio into verified bilingual e-commerce listings with zero intermediary commission.
            </p>

            <div className="w-full h-48 rounded-2xl bg-surface-container flex items-center justify-center relative overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Artisan hands shaping terracotta clay on potter wheel"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdgoY__xEzfC8nbRjzy3JAWEwvcKQt_WRFoN_-VAaVO6P5qAaWcKpTJpHiPwEc5f0G2CoZAUP3l39wic2nRvr8sIyEaDAQMyQzMqfJ7Q1vPBUKg6UOcBRZpZiphtR4B69ESbElhFNhabeXA3OpmyNYXP1r0ukCgOzaJypsIyYOZGMgESLrNvww1iO2RDzdJTl1nL659wmG0jTWcksSCNjoZFATDMBWmQmOf8QLRDmp3CmFAYMTJkhBdw"
              />
              <div className="absolute inset-0 bg-inverse-surface/40 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-3xl">play_arrow</span>
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="px-5 py-2 rounded-full font-label-md text-sm bg-surface-container text-inverse-surface hover:bg-surface-container-high transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  onNavigate("studio");
                }}
                className="px-5 py-2 rounded-full font-label-md text-sm text-white font-semibold bg-primary hover:bg-on-primary-container transition-all"
              >
                Explore App
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
