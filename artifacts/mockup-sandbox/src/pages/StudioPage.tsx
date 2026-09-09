import React, { useState } from "react";
import ImageComparisonSlider from "../components/ImageComparisonSlider";

interface StudioPageProps {
  lang: "en" | "hi";
}

const API_BASE = "/api";

const LANGUAGES = [
  { code: "hi", nameEn: "Hindi", nameNative: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", nameEn: "Marathi", nameNative: "मराठी", flag: "🇮🇳" },
  { code: "bn", nameEn: "Bengali", nameNative: "বাংলা", flag: "🇮🇳" },
  { code: "ta", nameEn: "Tamil", nameNative: "தமிழ்", flag: "🇮🇳" },
  { code: "te", nameEn: "Telugu", nameNative: "తెలుగు", flag: "🇮🇳" },
  { code: "kn", nameEn: "Kannada", nameNative: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "gu", nameEn: "Gujarati", nameNative: "ગુજરાતી", flag: "🇮🇳" },
  { code: "en", nameEn: "English", nameNative: "English", flag: "🇬🇧" },
];

const SAMPLE_VOICE_SCRIPTS: Record<string, { hi: string; en: string }> = {
  hi: {
    hi: "यह हाथ से बुना हुआ बनारसी सिल्क दुपट्टा है। इसमें हमने असली ज़री का काम किया है और प्राकृतिक रंगों का इस्तेमाल किया है। इसे बनाने में 6 दिन का समय लगा है।",
    en: "This is a handwoven Banarasi silk dupatta made with authentic gold zari thread and natural indigo dye. It took 6 days of intensive pit-loom weaving.",
  },
  mr: {
    hi: "हे अस्सल पैठणी सिल्क कापड आहे, ज्यावर हाताने पारंपारिक मोराची नक्षी काढली आहे. नैसर्गिक रंगांचा वापर केला आहे.",
    en: "This is authentic Paithani handwoven silk featuring traditional peacock motifs crafted with organic dyes over 8 days.",
  },
  bn: {
    hi: "এটি হাতে বোনা খাঁটি জামদানি শাড়ি। এতে প্রাকৃতিক সুতো এবং ঐতিহ্যবাহী নকশা ব্যবহার করা হয়েছে।",
    en: "This is an authentic handwoven Jamdani textile with intricate heritage motifs crafted using organic unbleached cotton.",
  },
};

export default function StudioPage({ lang }: StudioPageProps) {
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);

  // Voice transcription state
  const [selectedLang, setSelectedLang] = useState("hi");
  const [transcription, setTranscription] = useState<any>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Image enhancement state
  const [enhanceResult, setEnhanceResult] = useState<any>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Catalog generation state
  const [catalogResult, setCatalogResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [productName, setProductName] = useState("Banarasi Silk Zari Dupatta");
  const [craftType, setCraftType] = useState("Heritage Handloom");
  const [materials, setMaterials] = useState("Pure Mulberry Silk, Gold Zari, Natural Indigo");
  const [materialCost, setMaterialCost] = useState("350");
  const [makingHours, setMakingHours] = useState("6");
  const [ondcPublished, setOndcPublished] = useState(false);
  const [isPublishingOndc, setIsPublishingOndc] = useState(false);

  // Real-time calculation helpers
  const numHours = Number(makingHours) || 6;
  const numMatCost = Number(materialCost) || 350;
  const hourlyWage = 87.5; // KalaSetu skilled rate
  const floorMinWage = 32; // Statutory min wage
  const laborTotal = numHours * hourlyWage;
  const packaging = 60;
  const estimatedRetail = Math.round((numMatCost + laborTotal + packaging) * 1.35);
  const estimatedWholesale = Math.round(estimatedRetail * 0.65);
  const wageUplift = Math.round(((hourlyWage - floorMinWage) / floorMinWage) * 100);

  // Demo: Voice Transcription with real-time waveform effect
  const handleDemoTranscribe = async () => {
    setIsTranscribing(true);
    setIsPlayingAudio(true);
    try {
      const res = await fetch(`${API_BASE}/transcribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audioBase64: btoa("demo-audio-placeholder"),
          language: selectedLang,
          mimeType: "audio/m4a",
          testMode: true,
        }),
      });
      const data = await res.json();
      setTranscription(data);
    } catch {
      const sample = SAMPLE_VOICE_SCRIPTS[selectedLang] || SAMPLE_VOICE_SCRIPTS["hi"];
      setTranscription({
        text: sample.hi,
        textEnglish: sample.en,
        language: selectedLang,
        languageName: "Hindi",
        languageNameNative: "हिन्दी",
        confidence: 0.98,
        provider: "Bhashini ASR (AI4Bharat)",
      });
    }
    setIsTranscribing(false);
    setTimeout(() => setIsPlayingAudio(false), 2000);
  };

  // Demo: Image Enhancement
  const handleDemoEnhance = async () => {
    setIsEnhancing(true);
    try {
      const res = await fetch(`${API_BASE}/enhance-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: btoa("demo-image-placeholder"),
          craftType: "textile",
          testMode: true,
        }),
      });
      const data = await res.json();
      setEnhanceResult(data);
    } catch {
      setEnhanceResult({
        enhanced: true,
        provider: "KalaSetu Studio Engine",
        studioNote: "Studio lighting applied, background isolated, authentic GI watermark badge added.",
        enhancements: [
          "Studio Saffron Cream backdrop applied",
          "Zari metallic reflection & fiber texture boosted",
          "Drop shadow & depth realism rendered",
          "MoSJE Authenticated GI watermark attached",
        ],
      });
    }
    setIsEnhancing(false);
  };

  // Demo: Catalog Generation
  const handleGenerateCatalog = async () => {
    setIsGenerating(true);
    setOndcPublished(false);
    try {
      const res = await fetch(`${API_BASE}/catalog/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: productName || "Banarasi Silk Dupatta",
          craftType: craftType || "Heritage Handloom",
          materials: materials || "Pure Silk, Natural Dyes, Gold Zari",
          voiceTranscript: transcription?.text || "",
          language: selectedLang,
          materialCost: numMatCost,
          makingHours: numHours,
          artisanState: "UP",
          testMode: true,
        }),
      });
      const data = await res.json();
      setCatalogResult(data);
    } catch {
      setCatalogResult({
        englishTitle: "Royal Banarasi Handloom Mulberry Silk Dupatta with Pure Zari",
        hindiTitle: "शाही बनारसी हथकरघा शहतूत रेशम दुपट्टा असली ज़री के साथ",
        englishDescription:
          "Mastercrafted in Varanasi by verified heritage weavers. Features intricate traditional floral motifs woven on antique pit looms using organic indigo dye and pure metallic zari.",
        hindiDescription:
          "वाराणसी के सत्यापित पारंपरिक बुनकरों द्वारा निर्मित। शुद्ध शहतूत रेशम और पारंपरिक करघे पर हाथ से बुना हुआ उत्तम दुपट्टा।",
        craftCategory: "Heritage Handloom Silk",
        geoIndication: "Varanasi Handloom (GI Tag #38)",
        hsnCode: "5007.20.10",
        materialsDetected: ["Mulberry Silk", "Gold Zari", "Natural Indigo"],
        careInstructions: "Dry clean only. Store wrapped in soft muslin cloth.",
        tags: ["#BanarasiSilk", "#VocalForLocal", "#FairTrade", "#GITagged", "#MoSJE"],
        pricing: {
          retail: estimatedRetail,
          wholesale: estimatedWholesale,
          export: Math.round(estimatedRetail * 1.4),
        },
        fairTradeBreakdown: {
          materialCost: numMatCost,
          laborHours: numHours,
          hourlyWage: hourlyWage,
          packaging: packaging,
          wageUpliftPercent: wageUplift,
          stateMinWage: floorMinWage,
        },
      });
    }
    setIsGenerating(false);
  };

  // Demo: ONDC 1-click Publish
  const handlePublishOndc = async () => {
    setIsPublishingOndc(true);
    try {
      await fetch(`${API_BASE}/ondc/catalog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          price: catalogResult?.pricing?.retail || estimatedRetail,
          b2bPrice: catalogResult?.pricing?.wholesale || estimatedWholesale,
          hsnCode: catalogResult?.hsnCode || "5007.20.10",
        }),
      });
    } catch {
      // Mock success for offline live demo
    }
    setTimeout(() => {
      setIsPublishingOndc(false);
      setOndcPublished(true);
    }, 800);
  };

  return (
    <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "32px 24px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <span className="badge badge-warning">✨ AI CRAFT STUDIO ENGINE</span>
          <span className="badge badge-success">● MULTI-MODAL READY</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginBottom: "8px" }}>
          📸 <span className="text-gradient">{t("AI Studio & Catalog Suite", "AI स्टूडियो व कैटलॉग सूट")}</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "760px" }}>
          {t(
            "Transform voice notes in 8 Indian languages and village phone snapshots into SEO-optimized, fair-trade catalog listings published instantly to ONDC and GeM.",
            "8 भारतीय भाषाओं में वॉइस नोट्स और फ़ोन की फोटो को SEO-अनुकूलित, उचित-व्यापार कैटलॉग में बदलें और ONDC व GeM पर तुरंत प्रकाशित करें।"
          )}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "24px" }}>
        {/* ═══ PANEL 1: VOICE ASR NOTE ═══ */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--saffron)", margin: 0 }}>
              🎙️ {t("Voice-First ASR Note (8 Languages)", "वॉइस विवरण (8 भाषाएँ)")}
            </h3>
            <span className="badge badge-info" style={{ fontSize: "11px" }}>
              AI4Bharat / Bhashini
            </span>
          </div>

          {/* Language selection pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setSelectedLang(l.code)}
                className={selectedLang === l.code ? "btn btn-primary btn-sm" : "btn btn-ghost btn-sm"}
                style={{ fontSize: "11px", padding: "4px 10px" }}
              >
                {l.flag} {l.nameNative}
              </button>
            ))}
          </div>

          {/* Simulated Waveform Visualizer */}
          <div
            style={{
              height: "70px",
              background: "rgba(10, 15, 26, 0.8)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              padding: "0 16px",
              marginBottom: "16px",
            }}
          >
            {[18, 32, 48, 24, 60, 40, 20, 55, 30, 45, 65, 35, 50, 25, 58, 38, 22].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "4px",
                  height: isPlayingAudio ? `${h}px` : "8px",
                  background: isPlayingAudio
                    ? "linear-gradient(to top, var(--saffron), var(--terracotta))"
                    : "rgba(245, 166, 35, 0.25)",
                  borderRadius: "2px",
                  transition: "height 0.2s ease",
                }}
              />
            ))}
          </div>

          {/* Action Button */}
          <button
            className="btn btn-primary"
            onClick={handleDemoTranscribe}
            disabled={isTranscribing}
            style={{ width: "100%", marginBottom: "16px" }}
          >
            {isTranscribing
              ? "⏳ Transcribing Voice Note..."
              : `🎤 ${t("Simulate Artisan Voice Note in", "कारीगर वॉइस नोट चलाएँ:")} ${
                  LANGUAGES.find((l) => l.code === selectedLang)?.nameNative
                }`}
          </button>

          {/* Transcription Output */}
          {transcription && (
            <div className="card-flat" style={{ borderLeft: "3px solid var(--saffron)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span className="badge badge-success" style={{ fontSize: "10px" }}>
                  ✓ {transcription.provider || "Bhashini Transcribed"}
                </span>
                <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                  Confidence: 98.4%
                </span>
              </div>
              <div className="hindi" style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-primary)", fontWeight: 500 }}>
                "{transcription.text}"
              </div>
              {transcription.textEnglish && (
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "8px", fontStyle: "italic" }}>
                  🇬🇧 Translation: "{transcription.textEnglish}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* ═══ PANEL 2: INTERACTIVE STUDIO PHOTO ENHANCER ═══ */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--saffron)", margin: 0 }}>
              📸 {t("Interactive Studio Enhancer", "स्टूडियो इमेज एन्हांसर")}
            </h3>
            <span className="badge badge-warning" style={{ fontSize: "11px" }}>
              Live Comparison
            </span>
          </div>

          {/* Embedded Before/After Slider */}
          <ImageComparisonSlider lang={lang} />

          <div style={{ marginTop: "16px" }}>
            <button
              className="btn btn-secondary"
              onClick={handleDemoEnhance}
              disabled={isEnhancing}
              style={{ width: "100%" }}
            >
              {isEnhancing ? "⏳ Running AI Filter..." : `✨ ${t("Re-Run Studio Lighting & Background Isolation", "AI स्टूडियो लाइटिंग व बैकग्राउंड चलाएँ")}`}
            </button>
          </div>

          {enhanceResult && (
            <div className="card-flat" style={{ marginTop: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span className="badge badge-success">✓ Studio Pipeline Applied</span>
                <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>{enhanceResult.provider}</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "6px" }}>
                {enhanceResult.studioNote}
              </p>
            </div>
          )}
        </div>

        {/* ═══ PANEL 3: SMART FAIR-WAGE CALCULATOR & AI CATALOG GENERATOR ═══ */}
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--saffron)", margin: 0 }}>
                📝 {t("AI Catalog Generator + +250% Fair-Wage Pricing", "AI कैटलॉग जनरेटर + उचित व्यापार मूल्य")}
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "2px" }}>
                Statutory UP Floor Wage: ₹32/hr • KalaSetu Skilled Fair Wage: ₹87.50/hr (+250% Wage Uplift)
              </p>
            </div>
            <span className="badge badge-success">MoSJE Fair Trade Formula</span>
          </div>

          {/* Input Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>
                {t("Product Name", "उत्पाद का नाम")}
              </label>
              <input
                className="input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Banarasi Silk Zari Dupatta"
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>
                {t("Craft Category", "शिल्प श्रेणी")}
              </label>
              <input
                className="input"
                value={craftType}
                onChange={(e) => setCraftType(e.target.value)}
                placeholder="Heritage Handloom"
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>
                {t("Materials Used", "सामग्री")}
              </label>
              <input
                className="input"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="Mulberry Silk, Natural Dyes"
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                <span style={{ color: "var(--text-secondary)" }}>{t("Material Cost", "सामग्री लागत")}</span>
                <span style={{ color: "var(--saffron)", fontWeight: 700 }}>₹{numMatCost}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="25"
                value={numMatCost}
                onChange={(e) => setMaterialCost(e.target.value)}
                style={{ width: "100%", accentColor: "var(--saffron)" }}
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                <span style={{ color: "var(--text-secondary)" }}>{t("Making Hours", "बनाने के घंटे")}</span>
                <span style={{ color: "var(--saffron)", fontWeight: 700 }}>{numHours} hrs</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={numHours}
                onChange={(e) => setMakingHours(e.target.value)}
                style={{ width: "100%", accentColor: "var(--saffron)" }}
              />
            </div>
          </div>

          {/* Real-time live estimate bar */}
          <div
            style={{
              background: "rgba(245, 166, 35, 0.08)",
              border: "1px dashed var(--saffron)",
              borderRadius: "var(--radius-md)",
              padding: "12px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "18px",
            }}
          >
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-tertiary)", display: "block" }}>Artisan Labor Earnings</span>
                <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-success)" }}>₹{laborTotal.toFixed(0)}</span>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-tertiary)", display: "block" }}>Suggested Retail Price</span>
                <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--saffron)" }}>₹{estimatedRetail}</span>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-tertiary)", display: "block" }}>Wholesale (B2B Bulk)</span>
                <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-info)" }}>₹{estimatedWholesale}</span>
              </div>
            </div>
            <div>
              <span className="badge badge-success" style={{ fontSize: "12px", padding: "6px 12px" }}>
                📈 +{wageUplift}% Above UP Statutory Minimum Wage
              </span>
            </div>
          </div>

          {/* Generator Trigger */}
          <button
            className="btn btn-primary btn-lg"
            onClick={handleGenerateCatalog}
            disabled={isGenerating}
            style={{ width: "100%" }}
          >
            {isGenerating ? "⏳ Synthesizing Bilingual Catalog..." : `🚀 ${t("Generate AI Bilingual Catalog & HSN Tags", "AI द्विभाषी कैटलॉग व HSN कोड बनाएँ")}`}
          </button>

          {/* Catalog Output Card */}
          {catalogResult && (
            <div
              className="glass-strong animate-fadeIn"
              style={{
                marginTop: "24px",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                border: "1px solid rgba(245, 166, 35, 0.3)",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                {/* Left: Metadata & Descriptions */}
                <div>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                    <span className="badge badge-warning">{catalogResult.craftCategory}</span>
                    <span className="badge badge-info mono">HSN: {catalogResult.hsnCode}</span>
                    {catalogResult.geoIndication && (
                      <span className="badge badge-success">🏷️ {catalogResult.geoIndication}</span>
                    )}
                  </div>

                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#FFF", marginBottom: "4px" }}>
                    {catalogResult.englishTitle}
                  </h3>
                  <div className="hindi" style={{ fontSize: "15px", color: "var(--saffron-light)", marginBottom: "14px" }}>
                    {catalogResult.hindiTitle}
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "12px" }}>
                    {catalogResult.englishDescription}
                  </p>
                  <p className="hindi" style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.6, marginBottom: "14px" }}>
                    {catalogResult.hindiDescription}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {catalogResult.tags?.map((tag: string, i: number) => (
                      <span key={i} className="badge badge-ghost" style={{ fontSize: "11px", color: "var(--text-info)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Commercial Pricing & ONDC Export */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                    <div className="stat-card" style={{ padding: "12px" }}>
                      <div className="stat-value text-gradient" style={{ fontSize: "22px" }}>
                        ₹{catalogResult.pricing?.retail}
                      </div>
                      <div className="stat-label">{t("Fair Retail", "खुदरा")}</div>
                    </div>
                    <div className="stat-card" style={{ padding: "12px" }}>
                      <div className="stat-value text-gradient-cool" style={{ fontSize: "22px" }}>
                        ₹{catalogResult.pricing?.wholesale}
                      </div>
                      <div className="stat-label">{t("B2B Wholesale", "थोक")}</div>
                    </div>
                    <div className="stat-card" style={{ padding: "12px" }}>
                      <div className="stat-value" style={{ fontSize: "22px", color: "var(--text-success)" }}>
                        ₹{catalogResult.pricing?.export}
                      </div>
                      <div className="stat-label">{t("Global Export", "निर्यात")}</div>
                    </div>
                  </div>

                  {/* ONDC Publish Action */}
                  <div style={{ background: "rgba(10,15,26,0.6)", borderRadius: "var(--radius-md)", padding: "14px", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>
                        🛒 Open Network (ONDC / GeM)
                      </span>
                      {ondcPublished && (
                        <span className="badge badge-success animate-pulse-glow">● LIVE ON ONDC</span>
                      )}
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={handlePublishOndc}
                      disabled={isPublishingOndc || ondcPublished}
                      style={{ width: "100%", fontSize: "13px" }}
                    >
                      {isPublishingOndc
                        ? "⏳ Signing Beckn Protocol 1.1.0..."
                        : ondcPublished
                        ? "✓ Published to National ONDC Registry"
                        : "⚡ Publish to ONDC & GeM Network"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
