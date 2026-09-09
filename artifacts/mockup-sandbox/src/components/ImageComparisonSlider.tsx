import React, { useState, useRef, useEffect, useCallback } from "react";

interface ImageComparisonSliderProps {
  lang?: "en" | "hi";
}

const PRESETS = [
  {
    id: "textile",
    nameEn: "Banarasi Silk Dupatta",
    nameHi: "बनारसी सिल्क दुपट्टा",
    tag: "GI Handloom • Varanasi",
    craftType: "Heritage Handloom",
    beforeDesc: "Raw phone snapshot on village workshop floor with uneven ambient shadow",
    afterDesc: "KalaSetu Studio AI: Clean background, warm khadi glow, authentic silk sheen",
    color: "#F5A623",
  },
  {
    id: "pottery",
    nameEn: "Gorakhpur Terracotta Diya",
    nameHi: "गोरखपुर मिट्टी दीया",
    tag: "GI Terracotta • Gorakhpur",
    craftType: "Clay Pottery",
    beforeDesc: "Dim indoor light with cluttered background and glare",
    afterDesc: "KalaSetu Studio AI: Floating studio pedestal, clay micro-texture enhanced, drop shadow",
    color: "#E07A5F",
  },
  {
    id: "painting",
    nameEn: "Madhubani Tree of Life",
    nameHi: "मधुबनी चित्रकला",
    tag: "Mithila Folk Art GI",
    craftType: "Natural Pigment Art",
    beforeDesc: "Angled phone photo with paper fold distortion and color fade",
    afterDesc: "KalaSetu Studio AI: Perspective straightened, natural dyes saturated, museum matting",
    color: "#81B29A",
  },
];

export default function ImageComparisonSlider({ lang = "en" }: ImageComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [activePreset, setActivePreset] = useState("textile");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const preset = PRESETS.find((p) => p.id === activePreset) || PRESETS[0];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  // Universal pointer event handling (Touch, Mouse, Pen for all devices & OS)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <div style={{ width: "100%", touchAction: "none" }}>
      {/* Preset Switcher */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActivePreset(p.id);
              setSliderPos(50);
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius-full)",
              border: activePreset === p.id ? "1px solid var(--saffron)" : "1px solid var(--border)",
              background: activePreset === p.id ? "rgba(245, 166, 35, 0.15)" : "rgba(22, 30, 46, 0.6)",
              color: activePreset === p.id ? "var(--saffron)" : "var(--text-secondary)",
              fontWeight: activePreset === p.id ? 600 : 400,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
          >
            {lang === "en" ? p.nameEn : p.nameHi}
          </button>
        ))}
      </div>

      {/* Comparison Canvas Box */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(260px, 40vw, 360px)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          cursor: "ew-resize",
          userSelect: "none",
          WebkitUserSelect: "none",
          boxShadow: "var(--shadow-card)",
          border: "1px solid var(--border-strong)",
          touchAction: "none",
        }}
      >
        {/* ─── AFTER LAYER (Enhanced Studio View) ─── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #2A1F17 0%, #171B26 50%, #111520 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Studio Radial Backdrop */}
          <div
            style={{
              position: "absolute",
              width: "clamp(180px, 30vw, 280px)",
              height: "clamp(180px, 30vw, 280px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245, 166, 35, 0.18) 0%, rgba(224, 122, 95, 0.05) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Enhanced Craft Graphic */}
          <div style={{ position: "relative", textAlign: "center", zIndex: 2 }}>
            <div
              style={{
                fontSize: "clamp(70px, 12vw, 110px)",
                filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 15px rgba(245, 166, 35, 0.35))",
                transform: "scale(1.05)",
                transition: "transform 0.3s ease",
              }}
            >
              {activePreset === "textile" ? "🧣" : activePreset === "pottery" ? "🪔" : "🖼️"}
            </div>

            {/* Studio Badge */}
            <div
              style={{
                marginTop: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "var(--radius-full)",
                background: "rgba(245, 166, 35, 0.95)",
                color: "#111",
                fontSize: "clamp(9px, 2vw, 11px)",
                fontWeight: 700,
                letterSpacing: "0.5px",
                boxShadow: "0 4px 15px rgba(245, 166, 35, 0.4)",
              }}
            >
              ✨ {preset.tag} • STUDIO ENHANCED
            </div>
          </div>

          {/* Top-Right After Label */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              padding: "4px 10px",
              background: "rgba(16, 185, 129, 0.9)",
              color: "#FFF",
              fontSize: "10px",
              fontWeight: 700,
              borderRadius: "var(--radius-sm)",
              zIndex: 3,
            }}
          >
            STUDIO AI
          </div>
        </div>

        {/* ─── BEFORE LAYER (Raw Photo View, Clipped by Slider) ─── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${sliderPos}%`,
            overflow: "hidden",
            background: "#2A231C",
            borderRight: "2px solid #FFF",
            zIndex: 4,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "repeating-linear-gradient(45deg, #241D18, #241D18 10px, #1C1713 10px, #1C1713 20px)",
            }}
          >
            <div style={{ position: "relative", textAlign: "center", opacity: 0.65, filter: "grayscale(30%) brightness(0.8)" }}>
              <div style={{ fontSize: "clamp(65px, 11vw, 100px)", transform: "rotate(-8deg)" }}>
                {activePreset === "textile" ? "🧣" : activePreset === "pottery" ? "🪔" : "🖼️"}
              </div>
              <div
                style={{
                  marginTop: "12px",
                  display: "inline-block",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(0,0,0,0.6)",
                  color: "#CCC",
                  fontSize: "9px",
                }}
              >
                Raw Camera Shot
              </div>
            </div>
          </div>

          {/* Top-Left Before Label */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              padding: "4px 10px",
              background: "rgba(0, 0, 0, 0.75)",
              color: "#E2E8F0",
              fontSize: "10px",
              fontWeight: 600,
              borderRadius: "var(--radius-sm)",
            }}
          >
            BEFORE (RAW)
          </div>
        </div>

        {/* ─── SLIDER HANDLE / DRAGGER ─── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sliderPos}%`,
            transform: "translateX(-50%)",
            width: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "var(--saffron)",
              boxShadow: "0 0 15px rgba(245, 166, 35, 0.8), 0 2px 8px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#111",
              fontSize: "13px",
              fontWeight: 800,
              border: "2px solid #FFF",
            }}
          >
            ↔
          </div>
        </div>
      </div>

      {/* Accessible native slider for assistive tech & keyboards */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        aria-label="Before and after enhancement comparison slider"
        style={{
          width: "100%",
          marginTop: "10px",
          accentColor: "var(--saffron)",
          cursor: "pointer",
        }}
      />

      {/* Dynamic Explanation Caption */}
      <div
        style={{
          marginTop: "8px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "11px",
          color: "var(--text-secondary)",
          padding: "0 4px",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        <span style={{ color: "var(--text-tertiary)" }}>👈 {preset.beforeDesc}</span>
        <span style={{ color: "var(--saffron)", fontWeight: 500 }}>{preset.afterDesc} 👉</span>
      </div>
    </div>
  );
}
