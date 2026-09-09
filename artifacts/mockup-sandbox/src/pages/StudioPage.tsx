import { useState, useRef } from "react";
import type { Page } from "../components/Navbar";

interface StudioPageProps {
  lang: "en" | "hi";
  onNavigate?: (page: Page) => void;
}

const LANGUAGES = [
  { id: "hi", name: "🇮🇳 हिन्दी (Hindi)", audio: "यह शुद्ध बनारसी कतान रेशमी दुपट्टा है, जिसमें असली ज़री का काम है। 14 दिन की हाथ की बुनाई, पारंपरिक कधुआ तकनीक।" },
  { id: "mr", name: "मराठी", audio: "हा अस्सल पैठणी रेशमी शेला आहे, ज्यावर शुद्ध जरीचे नक्षीकाम केले आहे. 14 दिवसांची हस्तकला." },
  { id: "bn", name: "বাংলা", audio: "এটি খাঁটি জামদানি রেশম ওড়না, ঐতিহ্যবাহী সোনার জরির কাজ করা। ১৪ দিনের হস্তশিল্প।" },
  { id: "gu", name: "ગુજરાતી", audio: "આ શુદ્ધ પટોળા સિલ્ક દુપટ્ટો છે, જેમાં અસલી ઝરીનું કામ કરવામાં આવ્યું છે. 14 દિવસની મહેનત." },
  { id: "ta", name: "தமிழ்", audio: "இது தூய காஞ்சிபுரம் பட்டு துப்பட்டா, அசல் தங்க ஜரிகை வேலைப்பாடு கொண்டது. 14 நாட்கள் கைத்தறி." },
  { id: "te", name: "తెలుగు", audio: "ఇది స్వచ్ఛమైన చేనేత పట్టు దుపట్టా, అసలైన బంగారు జరీ నేతతో 14 రోజులు శ్రమించి తయారు చేయబడింది." },
  { id: "en", name: "English", audio: "Handwoven pure Banarasi Katan silk dupatta featuring authentic gold zari motif border. Handcrafted over 14 days." },
];

export default function StudioPage({ lang }: StudioPageProps) {
  const [selectedLang, setSelectedLang] = useState("hi");
  const [isRecording, setIsRecording] = useState(false);
  const [hours, setHours] = useState(42);
  const [materialCost, setMaterialCost] = useState(450);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastDone, setBroadcastDone] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic Fair Wage calculation based on formula
  const hourlyRate = 87.5;
  const laborCost = Math.round(hours * hourlyRate);
  const welfareReserve = Math.round((laborCost + materialCost) * 0.1);
  const b2cPrice = Math.round((laborCost + materialCost + welfareReserve) * 1.05);
  const b2bPrice = Math.round(b2cPrice * 0.65);
  const exportPrice = Math.round(b2cPrice * 1.35);

  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastDone(true);
    }, 1500);
  };

  const currentAudioText = LANGUAGES.find((l) => l.id === selectedLang)?.audio || LANGUAGES[0].audio;

  return (
    <div className="flex flex-col w-full bg-surface pb-16">
      {/* ═══ Sticky Sub-Header Bar ═══ */}
      <section className="w-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm border-b border-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumb and live engine status */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1 font-label-md text-xs sm:text-sm">
              <span className="text-on-surface-variant">Artisan Workspace</span>
              <span className="material-symbols-outlined text-surface-tint text-base">
                chevron_right
              </span>
              <span className="font-headline-sm text-sm sm:text-base text-on-surface font-bold">
                AI Craft Studio
              </span>
              <span className="font-['Noto_Sans_Devanagari'] font-semibold text-secondary text-xs sm:text-sm ml-1">
                (एआई क्राफ्ट स्टूडियो)
              </span>
            </div>
            <div className="h-4 w-px bg-outline-variant/60 hidden sm:block"></div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/60 text-on-primary-fixed font-label-sm text-xs shadow-sm font-semibold">
              <span
                className="material-symbols-outlined text-[16px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span>GPT-4o Vision + Bhashini ASR + Neural Studio</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed font-label-sm text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px] text-tertiary font-bold">
                verified_user
              </span>
              <span>Beckn ONDC Ready</span>
            </div>
          </div>

          {/* Quick Action Helpers */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-xs sm:text-sm transition-all shadow-sm group cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[14px]">mic</span>
              </span>
              <span>बोलकर निर्देश दें (Voice Guide)</span>
            </button>
            <button
              onClick={() => alert("KalaSetu Studio Tutorial: 1) Snap photo, 2) Speak craft story, 3) Auto-price & Broadcast to ONDC.")}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-transparent hover:bg-surface-container text-on-surface-variant font-label-sm text-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">help_outline</span>
              <span>Studio Tutorials</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ Main Dual-Panel Workspace ═══ */}
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ================= LEFT PANEL (INPUT & INGESTION) ================= */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Panel Stage Indicator */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-surface-container">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-bold">
                    Artisan Ingestion Flow
                  </span>
                  <h2 className="font-headline-md text-xl sm:text-2xl text-on-surface font-bold">
                    Craft Input &amp; Story Capture
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-code-sm text-xs font-semibold">
                  v4.2 • Audio-Visual Pipeline
                </span>
              </div>
              {/* Stepper Indicator */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="flex flex-col gap-1.5">
                  <div className="h-1.5 w-full rounded-full bg-primary-container"></div>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <span className="font-label-sm text-xs text-on-surface font-semibold truncate">
                      Photo Capture
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="h-1.5 w-full rounded-full bg-primary-container"></div>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <span className="font-label-sm text-xs text-on-surface font-semibold truncate">
                      Vernacular Voice
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="h-1.5 w-full rounded-full bg-primary-container"></div>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold flex items-center justify-center">
                      3
                    </span>
                    <span className="font-label-sm text-xs text-on-surface font-semibold truncate">
                      Fair Wage Engine
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 1: Upload & Multi-Angle Stage */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-surface-container relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed font-bold flex items-center justify-center font-label-md text-xs">
                    1
                  </span>
                  <h3 className="font-headline-sm text-base sm:text-lg text-on-surface font-bold">
                    Craft Photo Capture &amp; Scan
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-semibold">
                  High Res Ready
                </span>
              </div>

              {/* Upload Dropzone */}
              <div className="relative rounded-2xl p-4 bg-surface-container-low flex flex-col gap-4 border border-surface-container">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Raw Photo Preview Thumbnail */}
                  <div className="md:col-span-5 relative rounded-xl overflow-hidden shadow-sm aspect-square bg-surface-container">
                    <img
                      className="w-full h-full object-cover"
                      alt="Raw unedited photograph of Banarasi silk dupatta"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvrO1BLZnlvpL2Lsz2VP53q4iBLrsm8vs4DdV9zgLHtZtP1WMUwL4NTBVaQW67BCwzgmignRPzMqbWkOcagH0quU1Yo_FA3pF_xExogNgJFumLkdBDHq94_WBd7VD5-ByfCJGQBcU8CgD9waB2jCKNfiIecJ4bnSGG4_lxRUiY4qQWQQ7Ldy_ItaU0yrF71bhfsA4kfqNyx_-wJbIPLOJM1fiXwJTcdHH6iDv146pqnuc2VETotaOZzw"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-tertiary text-white font-label-sm text-[11px] flex items-center gap-1 shadow-sm font-semibold">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      <span>Photo Loaded (3.4 MB)</span>
                    </div>
                    <div className="absolute bottom-2 inset-x-2 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-inverse-surface/80 text-white font-code-sm text-[11px] backdrop-blur-sm">
                        2400 × 2400 px
                      </span>
                      <button
                        onClick={() => alert("Re-syncing neural texture camera pipeline...")}
                        className="w-7 h-7 rounded-full bg-surface-container-lowest/90 text-primary hover:bg-surface-container-lowest flex items-center justify-center transition-all shadow-sm"
                        title="Reload Camera"
                      >
                        <span className="material-symbols-outlined text-[16px]">sync</span>
                      </button>
                    </div>
                  </div>

                  {/* Upload instructions & Multi-angle stack */}
                  <div className="md:col-span-7 flex flex-col justify-between h-full gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-primary">
                        <span className="material-symbols-outlined text-lg">image_search</span>
                        <span className="font-label-md text-xs sm:text-sm font-bold">
                          Raw Handloom Capture Detected
                        </span>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        AI automatically crops imperfections, balances ambient lighting, and extracts fabric micro-textures for 3D zoom inspection.
                      </p>
                    </div>

                    {/* Multi-angle thumbnails */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      <span className="font-label-sm text-xs text-on-surface-variant font-semibold">
                        Multi-angle Capture Queue:
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          onClick={() => alert("Inspecting Zari Kadwa macro weave closeup...")}
                          className="w-12 h-12 rounded-lg bg-surface-container-highest overflow-hidden relative group cursor-pointer shadow-sm border border-surface-container"
                        >
                          <img
                            className="w-full h-full object-cover"
                            alt="Macro shot of Kadwa weave"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3LijmmnZCuuy9yaENzfp7eacRh_EYfccvqL0j2B2cTnO0gcNAiQkFmM7Biuc_YnVOhv-lFSbTsLGR7SpkWxRtIQ75L4HN75oiyKjMMt44xAzkG-xp25ZIgruMTX2lJgva_AU68kMhaVqnUT1QKPD6tZPwLX2neZ75dJatQUf-zWeljfMigBC1p4n5WgKuDN_0scfyLn8IbKSILKDUvMexEZhO-_STOZgBH8fw6VLp7QK0MY109Wor-A"
                          />
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xs">zoom_in</span>
                          </div>
                        </div>

                        <div
                          onClick={() => alert("Inspecting Pallu corner fringe detail...")}
                          className="w-12 h-12 rounded-lg bg-surface-container-highest overflow-hidden relative group cursor-pointer shadow-sm border border-surface-container"
                        >
                          <img
                            className="w-full h-full object-cover"
                            alt="Pallu corner fringe detail"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNngE1cgqEYkTmaedjFCrkekkojjvkST-4nMcWo_fwtxhUXOk0NlosjAC4H-9dq5f6K4iz06wnHHR2SQFohS9NPCNQXIwD-799r32j78TUwytxILybicrewrQcKmfeA1hl_i-KM1z4btL9YGnNP54Ap2HctbxsO_mZk0xooQpqhHEy2VWMRgvNnGCGT9LzBfQ-G3F-opByBntBqXP00KgxU96t9mb9qvA7c-7uB2ZzH45Vxvi_RaQmoQ"
                          />
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xs">zoom_in</span>
                          </div>
                        </div>

                        <button
                          onClick={() => alert("Adding new macro zoom angle to ONDC payload...")}
                          className="h-12 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container text-primary font-label-sm text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-primary-container/20"
                        >
                          <span className="material-symbols-outlined text-base">add_a_photo</span>
                          <span>+ Add Angle</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] pt-1">
                      <span>Supported: JPG, PNG, HEIF up to 25MB</span>
                      <span className="text-tertiary font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                        Ready for Inpainting
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: Vernacular Voice & Dialect Story (Bhashini AI) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-surface-container relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed font-bold flex items-center justify-center font-label-md text-xs">
                    2
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-headline-sm text-base sm:text-lg text-on-surface font-bold">
                      Vernacular Voice &amp; Story Ingestion
                    </h3>
                    <span className="font-body-sm text-xs text-on-surface-variant">
                      Powered by Bhashini AI Speech-to-Text &amp; Regional Dialect Normalizer
                    </span>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">graphic_eq</span>
                  <span>Live Engine</span>
                </div>
              </div>

              {/* Language Selector Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLang(l.id)}
                    className={`px-3 py-1 rounded-full font-label-sm text-xs shrink-0 transition-all cursor-pointer ${
                      selectedLang === l.id
                        ? "bg-primary-container text-on-primary-container font-bold shadow-sm"
                        : "bg-surface-container-high hover:bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>

              {/* Audio Record Visualizer Card */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3 border border-surface-container">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Animated Mic Button */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`relative group w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all cursor-pointer shrink-0 ${
                        isRecording
                          ? "bg-error animate-pulse"
                          : "bg-gradient-to-tr from-primary-container to-secondary"
                      }`}
                    >
                      <div
                        className={`absolute -inset-1.5 rounded-full bg-primary-container/40 opacity-75 ${
                          isRecording ? "animate-ping" : ""
                        }`}
                      ></div>
                      <span className="material-symbols-outlined text-3xl relative z-10">
                        {isRecording ? "stop" : "mic"}
                      </span>
                    </button>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-base sm:text-lg text-on-surface font-bold">
                        {isRecording ? "सुन रहा है... (Listening)" : "अपनी भाषा में बोलें"}
                      </span>
                      <span className="font-body-sm text-xs text-on-surface-variant">
                        {isRecording
                          ? "Bhashini ASR actively transcribing Awadhi/Hindi audio stream..."
                          : "Hold or click to narrate craft story in your mother tongue"}
                      </span>
                    </div>
                  </div>

                  {/* Equalizer Wave Simulation */}
                  <div className="flex items-end gap-1 h-10 px-3 py-1 rounded-lg bg-surface-container-lowest shadow-inner border border-surface-container">
                    {[12, 24, 32, 16, 28, 36, 20, 32, 16, 28, 36, 12, 24, 32, 16, 28, 20, 36, 24, 12].map(
                      (h, idx) => (
                        <div
                          key={idx}
                          className={`w-1 rounded-full ${
                            idx % 4 === 0
                              ? "bg-primary"
                              : idx % 4 === 1
                              ? "bg-secondary"
                              : idx % 4 === 2
                              ? "bg-primary-container"
                              : "bg-tertiary"
                          } ${isRecording ? "animate-pulse" : ""}`}
                          style={{
                            height: isRecording ? `${Math.min(36, h * 1.2)}px` : `${h * 0.7}px`,
                            transition: "height 0.2s ease",
                          }}
                        ></div>
                      )
                    )}
                  </div>
                </div>

                {/* Bilingual Transcribed Stream */}
                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-1 border border-surface-container">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-xs font-bold text-secondary flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        Transcribed Regional Audio ({selectedLang.toUpperCase()})
                      </span>
                      <span className="font-code-sm text-xs text-tertiary font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">done_all</span>
                        99.4% ASR Accuracy
                      </span>
                    </div>
                    <p className="font-['Noto_Sans_Devanagari'] text-sm sm:text-base text-on-surface leading-relaxed">
                      "{currentAudioText}"
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-high/60 shadow-sm flex flex-col gap-1 border border-surface-container">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-xs font-bold text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">translate</span>
                        Neural Synthesized Global English Pitch
                      </span>
                      <span className="font-code-sm text-xs text-on-surface-variant font-semibold">
                        GPT-4o Craft Spec
                      </span>
                    </div>
                    <p className="font-body-sm text-xs sm:text-sm text-on-surface leading-relaxed italic">
                      "Handwoven pure Banarasi Katan silk dupatta featuring authentic gold zari motif border. Handcrafted over 14 days using heritage Kadwa loom technique."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: Making Time & Raw Material Parameters */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-surface-container">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed font-bold flex items-center justify-center font-label-md text-xs">
                    3
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-headline-sm text-base sm:text-lg text-on-surface font-bold">
                      Labor Hours &amp; Material Inputs
                    </h3>
                    <span className="font-body-sm text-xs text-on-surface-variant">
                      Inputs feed fair-wage algorithmic calculation engine
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface font-label-sm text-xs font-semibold">
                  MoSJE Fair Metrics
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Making Hours */}
                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-xs font-semibold">
                    <span>Handloom Labor</span>
                    <span className="material-symbols-outlined text-base">schedule</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <input
                      className="w-16 bg-transparent font-headline-sm text-xl sm:text-2xl text-on-surface font-bold text-center focus:outline-none rounded border-b border-primary"
                      type="number"
                      min={1}
                      max={200}
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value) || 1)}
                    />
                    <span className="font-label-md text-xs text-on-surface-variant font-semibold">
                      Hours
                    </span>
                  </div>
                  <span className="font-body-sm text-xs text-tertiary font-medium">
                    ~{Math.round(hours / 3)} work shifts
                  </span>
                </div>

                {/* Raw Material Cost */}
                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-xs font-semibold">
                    <span>Raw Materials</span>
                    <span className="material-symbols-outlined text-base">layers</span>
                  </div>
                  <div className="flex items-baseline gap-0.5 mt-1">
                    <span className="font-headline-sm text-xl sm:text-2xl text-on-surface font-bold">
                      ₹
                    </span>
                    <input
                      className="w-20 bg-transparent font-headline-sm text-xl sm:text-2xl text-on-surface font-bold focus:outline-none rounded border-b border-primary"
                      type="number"
                      min={50}
                      max={20000}
                      value={materialCost}
                      onChange={(e) => setMaterialCost(Number(e.target.value) || 0)}
                    />
                  </div>
                  <span className="font-body-sm text-xs text-on-surface-variant truncate font-medium">
                    Zari &amp; Silk yarn
                  </span>
                </div>

                {/* Artisan Skill Tier */}
                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-xs font-semibold">
                    <span>Pehchan Tier</span>
                    <span className="material-symbols-outlined text-base text-primary">
                      military_tech
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="font-label-md text-sm text-on-surface font-bold block">
                      Master Artisan
                    </span>
                    <span className="font-label-sm text-xs text-secondary font-semibold">
                      Class A (Kadwa)
                    </span>
                  </div>
                  <span className="font-body-sm text-xs text-tertiary font-bold">
                    ₹{hourlyRate.toFixed(2)} / hr base
                  </span>
                </div>
              </div>
            </div>

            {/* Big Launch Trigger CTA */}
            <button
              onClick={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  setIsGenerating(false);
                  alert("AI Studio catalog generation complete! Multilingual payload synced with ONDC specifications.");
                }, 800);
              }}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-primary-container to-secondary text-white font-headline-sm text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
                auto_awesome
              </span>
              <span>
                {isGenerating
                  ? "Generating Multilingual Payload..."
                  : "Generate AI Studio Catalog & ONDC Payload"}
              </span>
              <span className="font-['Noto_Sans_Devanagari'] text-sm sm:text-base opacity-90 hidden md:inline">
                — एआई से लिस्टिंग बनाएं
              </span>
            </button>
          </div>

          {/* ================= RIGHT PANEL (AI ENHANCEMENTS & LIVE PREVIEW) ================= */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* 1. Studio Enhancement Before vs After Slider */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-surface-container">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
                    Visual Studio Engine
                  </span>
                  <h2 className="font-headline-md text-xl sm:text-2xl text-on-surface font-bold">
                    Photo Enhancement (Before vs After)
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-code-sm text-xs font-semibold">
                  SegmentAnything + Softbox Lighting
                </span>
              </div>

              {/* Interactive Before/After Visual Comparison Slider */}
              <div
                ref={containerRef}
                onPointerMove={handlePointerMove}
                className="relative rounded-2xl overflow-hidden bg-surface-container shadow-inner h-72 sm:h-80 select-none cursor-ew-resize border border-surface-container"
              >
                {/* AFTER IMAGE (Underneath, full width) */}
                <div className="absolute inset-0 w-full h-full bg-surface-container-lowest overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="After studio enhanced Banarasi silk"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCs5Hy657myZZWE38Dsz74tkshFa1yOL81olTJfUqMHEExSWgMoz2T3rJFCwYrVeflzWZrlGb1_5gCqomxa6x3w_Nac1iTaHUiYTV90kiqyiLxZ0RuLaFtZf4ROB5I3Sqy3h-_jsZ-gbcAQdtIKC6sPH8tizY95EkMfaykFDIc3BxnRXlqCjmLa8i5Rt8rXr8N1THCoUtzRNdxaavJ39miDB0d_vZYuXA_MhFLoD7riS01T8JG_IgmOg"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-tertiary text-white font-label-sm text-xs flex items-center gap-1 shadow-md font-semibold">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>AI Studio Polish</span>
                  </div>
                  <div className="absolute bottom-3 right-3 text-on-surface text-[11px] bg-surface-container-lowest/90 backdrop-blur-sm p-1.5 rounded shadow-sm flex items-center gap-2">
                    <span>✓ 4K Balance • Background Extracted</span>
                    <span className="text-tertiary font-bold">100% Marketplace Compliant</span>
                  </div>
                </div>

                {/* BEFORE IMAGE (Clipped on top) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden bg-surface-dim"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div style={{ width: containerRef.current?.clientWidth || 500, height: "100%" }}>
                    <img
                      className="w-full h-full object-cover"
                      alt="Raw shot of Banarasi silk on dim rustic floor"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKGMveQ6hp-PWvUfDfik2_mXgdIDMdmY4ezvnlztpEqy381cTha_2tGQKeUSb_9CTYdunLwD1sXBmzvh-60RLlsuNeErAjkzq82Jur0BKimK6mcmcMQV9npu5NsN7NBfhydByKCMCc0Q1CPkmZM97fjbzb_LnpAEi7XEHECrx3AWlJbPX0nBj_UmowtVpgjFCOeSLDi-u6DDTWqy0J23g30QAKT2DsrFBAzFdz8UaYQ1v41FpDHzyDXg"
                    />
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-inverse-surface/80 backdrop-blur-sm text-white font-label-sm text-xs font-semibold">
                    Raw Mobile Capture
                  </div>
                  <div className="absolute bottom-3 left-3 text-white text-[11px] bg-inverse-surface/70 backdrop-blur-sm p-1.5 rounded">
                    ⚠️ Dim lighting • Muddy wood backdrop • Shadows
                  </div>
                </div>

                {/* Divider Line with Drag Handle */}
                <div
                  className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] z-20"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary-container text-on-primary-container shadow-xl flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">compare_arrows</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between font-label-sm text-xs text-on-surface-variant">
                <span className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-base text-tertiary">wb_sunny</span>
                  Luster &amp; metallic reflection normalization active
                </span>
                <button
                  onClick={() => alert("Backdrop settings: Seamless pure white (#FFFFFF), shadow density 15%, 5500K softbox.")}
                  className="text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Refine Backdrop Settings</span>
                  <span className="material-symbols-outlined text-[14px]">tune</span>
                </button>
              </div>
            </div>

            {/* 2. AI-Generated Multilingual Catalog Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-surface-container">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-bold">
                    Catalog Auto-Publishing
                  </span>
                  <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-bold">
                    Multilingual ONDC Structured Payload
                  </h2>
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-bold">
                    Ready to Sync
                  </span>
                </div>
              </div>

              {/* English Section */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2.5 border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-xs text-on-surface-variant font-bold">
                    GLOBAL ENGLISH SPECIFICATION
                  </span>
                  <button
                    onClick={() => alert("Editing product title & story in English...")}
                    className="text-primary text-xs flex items-center gap-0.5 hover:underline font-semibold"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    <span>Edit</span>
                  </button>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Product Title
                  </label>
                  <h4 className="font-headline-sm text-base sm:text-lg text-on-surface font-bold mt-0.5">
                    Heritage Handwoven Banarasi Katan Silk Dupatta (Gold Zari Weave)
                  </h4>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Artisan Story &amp; Description
                  </label>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface leading-relaxed mt-0.5">
                    Exquisitely handcrafted by Varanasi master weavers using certified Mulberry silk and lustrous gold zari yarn. Features time-honored floral jaal motifs and featherweight drape.
                  </p>
                </div>

                {/* Tags & GI Certification */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <div className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>GI Certificate: GI-IN-0012 (Banarasi Brocade)</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-xs font-medium">
                    100% Pure Mulberry Silk
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-xs font-medium">
                    Kadwa Interlock Technique
                  </div>
                </div>
              </div>

              {/* Hindi Regional Translation */}
              <div className="p-4 rounded-xl bg-surface-container-high/40 flex flex-col gap-2 border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-xs text-secondary font-bold flex items-center gap-1">
                    <span>🇮🇳 हिन्दी विवरण (LOCAL CATALOG)</span>
                  </span>
                  <button
                    onClick={() => alert("हिन्दी विवरण संपादित करें")}
                    className="text-secondary text-xs flex items-center gap-0.5 hover:underline font-semibold"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    <span>संपादित करें</span>
                  </button>
                </div>
                <div>
                  <h5 className="font-['Noto_Sans_Devanagari'] font-bold text-sm sm:text-base text-on-surface">
                    हस्तनिर्मित बनारसी कतान रेशमी दुपट्टा (स्वर्ण ज़री)
                  </h5>
                  <p className="font-['Noto_Sans_Devanagari'] text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                    वाराणसी के पारंपरिक बुनकरों द्वारा निर्मित शुद्ध रेशमी दुपट्टा, कधुआ तकनीक द्वारा हाथ से बुना गया।
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Fair-Trade Algorithmic Pricing Breakdown */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-surface-container">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-xs uppercase tracking-wider text-tertiary font-bold">
                    Economic Justice Core
                  </span>
                  <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-bold">
                    Fair-Trade Algorithmic Pricing Breakdown
                  </h2>
                </div>
                <div className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">gavel</span>
                  <span>MoSJE Standard</span>
                </div>
              </div>

              {/* 3-Column Pricing Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* B2C Retail */}
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between gap-2 border border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs text-on-surface-variant font-bold uppercase">
                      B2C Retail
                    </span>
                    <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  </div>
                  <div>
                    <div className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold">
                      ₹{b2cPrice.toLocaleString("en-IN")}
                    </div>
                    <span className="text-xs text-on-surface-variant block mt-0.5">
                      Single patron order
                    </span>
                  </div>
                  <div className="p-1.5 rounded bg-surface-container-lowest text-[11px] text-tertiary font-bold">
                    Fair Living Wage: ₹{hourlyRate}/hr included
                  </div>
                </div>

                {/* B2B Wholesale */}
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between gap-2 border border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs text-on-surface-variant font-bold uppercase">
                      B2B Wholesale
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container-high font-bold">
                      50+ pcs
                    </span>
                  </div>
                  <div>
                    <div className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">
                      ₹{b2bPrice.toLocaleString("en-IN")}{" "}
                      <span className="text-xs font-normal">/pc</span>
                    </div>
                    <span className="text-xs text-on-surface-variant block mt-0.5">
                      Bulk boutique orders
                    </span>
                  </div>
                  <div className="p-1.5 rounded bg-surface-container-lowest text-[11px] text-on-surface font-semibold">
                    Artisan pool split guaranteed
                  </div>
                </div>

                {/* Export / Global */}
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between gap-2 border border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs text-on-surface-variant font-bold uppercase">
                      Export Global
                    </span>
                    <span className="material-symbols-outlined text-secondary text-sm">
                      flight_takeoff
                    </span>
                  </div>
                  <div>
                    <div className="font-headline-lg text-2xl sm:text-3xl text-secondary font-bold">
                      ₹{exportPrice.toLocaleString("en-IN")}{" "}
                      <span className="text-xs font-normal">($30)</span>
                    </div>
                    <span className="text-xs text-on-surface-variant block mt-0.5">
                      Cross-border direct
                    </span>
                  </div>
                  <div className="p-1.5 rounded bg-surface-container-lowest text-[11px] text-secondary font-bold">
                    Includes export GI insurance
                  </div>
                </div>
              </div>

              {/* Statutory Compliance Callout */}
              <div className="px-4 py-3 rounded-xl bg-tertiary-fixed/40 flex items-center justify-between border border-tertiary/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">
                    verified_user
                  </span>
                  <span className="font-label-sm text-xs text-on-tertiary-fixed-variant">
                    MoSJE Statutory Minimum Wage Compliant —{" "}
                    <strong>+250% wage premium</strong> over unregulated local intermediaries.
                  </span>
                </div>
                <span className="font-code-sm text-xs text-tertiary font-bold hidden sm:inline">
                  VERIFIED #KW-884
                </span>
              </div>
            </div>

            {/* 4. One-Click Network Distribution Row */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-lg flex flex-col gap-3 border border-surface-container">
              <div className="flex items-center justify-between text-xs text-on-surface-variant px-1">
                <span className="font-medium">Direct sync to buyer apps on Beckn protocol</span>
                <span className="flex items-center gap-1 text-tertiary font-bold">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                  Gateway Online (200 OK)
                </span>
              </div>

              {/* Big Broadcast CTA */}
              <button
                onClick={handleBroadcast}
                className={`w-full py-3.5 px-6 rounded-full text-white font-headline-sm text-base sm:text-lg font-bold shadow-md hover:shadow-xl hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer ${
                  broadcastDone
                    ? "bg-tertiary"
                    : "bg-gradient-to-r from-primary-container to-secondary"
                }`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {broadcastDone ? "done_all" : "rocket_launch"}
                </span>
                <span>
                  {isBroadcasting
                    ? "Transmitting to Beckn BPP Gateway..."
                    : broadcastDone
                    ? "Successfully Broadcasted Across ONDC Network! ✓"
                    : "One-Click Broadcast to ONDC & GeM Network"}
                </span>
              </button>

              {/* Connected Buyer App Nodes Pill List */}
              <div className="flex items-center justify-center gap-2.5 py-1 text-on-surface-variant font-label-sm text-xs flex-wrap">
                <span className="text-xs text-on-surface-variant">Live in minutes on:</span>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-xs font-semibold">
                  <span>Paytm ONDC</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-xs font-semibold">
                  <span>Mystore Buyer App</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-xs font-semibold">
                  <span>Pincode by PhonePe</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-xs font-semibold">
                  <span>GeM Artisans Portal</span>
                </div>
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => alert("Draft saved to local encrypted cache.")}
                  className="py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Save Draft</span>
                </button>
                <button
                  onClick={() => alert("Generating GeM XML/CSV catalog manifest...")}
                  className="py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  <span>GeM CSV (630492)</span>
                </button>
                <button
                  onClick={() => alert("WhatsApp catalog card link copied for sharing with craft cooperatives.")}
                  className="py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container text-tertiary font-label-sm text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  <span>WhatsApp Catalog</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
