import React, { useState } from "react";

interface PehchanModalProps {
  isOpen: boolean;
  onClose: () => void;
  artisanData?: {
    name: string;
    nameHindi?: string;
    pehchanId: string;
    cluster: string;
    state: string;
    district: string;
    craftCategory: string;
    aadhaarMasked: string;
    issueDate: string;
    verifiedBy: string;
  };
}

const DEFAULT_ARTISAN = {
  name: "Radha Devi",
  nameHindi: "राधा देवी",
  pehchanId: "KST-UP-2024-00142",
  cluster: "Varanasi Silk Weaver Cluster",
  state: "Uttar Pradesh",
  district: "Varanasi",
  craftCategory: "Heritage Handloom Silk",
  aadhaarMasked: "XXXX-XXXX-8921",
  issueDate: "15-Aug-2024",
  verifiedBy: "Ministry of Social Justice & Empowerment (MoSJE)",
};

export default function PehchanModal({
  isOpen,
  onClose,
  artisanData = DEFAULT_ARTISAN,
}: PehchanModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(true);

  if (!isOpen) return null;

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(artisanData.pehchanId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        background: "rgba(5, 8, 15, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
      onClick={onClose}
    >
      <div
        className="glass-strong animate-fadeIn"
        style={{
          maxWidth: "min(520px, 100%)",
          width: "100%",
          borderRadius: "var(--radius-xl)",
          padding: "clamp(16px, 4vw, 28px)",
          position: "relative",
          boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 0 40px rgba(245, 166, 35, 0.15)",
          border: "1px solid rgba(245, 166, 35, 0.3)",
          margin: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <span className="badge badge-warning" style={{ fontSize: "10px", marginBottom: "4px" }}>
              🇮🇳 GOVT OF INDIA • MoSJE RECOGNIZED
            </span>
            <h2 style={{ fontSize: "clamp(17px, 3vw, 20px)", fontWeight: 700, margin: 0, color: "#FFF" }}>
              Sovereign Pehchan Smart ID
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "var(--text-secondary)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* ─── Holographic ID Card ─── */}
        <div
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #24180A 0%, #161D2B 50%, #0F131D 100%)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(14px, 3vw, 20px)",
            border: "2px solid rgba(245, 166, 35, 0.4)",
            boxShadow: "inset 0 0 30px rgba(245, 166, 35, 0.08), 0 10px 30px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          {/* Hologram Ribbon Gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              background: "linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
            }}
          />

          {/* Watermark Diya Seal */}
          <div
            style={{
              position: "absolute",
              right: "-20px",
              bottom: "-20px",
              fontSize: "140px",
              opacity: 0.06,
              pointerEvents: "none",
            }}
          >
            🪔
          </div>

          {/* Top Bar of Card */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "28px" }}>🪔</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--saffron)", letterSpacing: "0.5px" }}>
                  KALASETU PEHCHAN
                </div>
                <div style={{ fontSize: "9.5px", color: "var(--text-tertiary)" }}>
                  National Artisan Identity Registry • MSJE-2024
                </div>
              </div>
            </div>
            <div
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                color: "var(--text-success)",
                padding: "2px 8px",
                borderRadius: "var(--radius-full)",
                fontSize: "9.5px",
                fontWeight: 700,
              }}
            >
              ✓ CRYPTO VERIFIED
            </div>
          </div>

          {/* Card Body: Photo + Info */}
          <div style={{ display: "flex", gap: "14px", marginBottom: "14px", alignItems: "center" }}>
            {/* Artisan Avatar Box */}
            <div
              style={{
                width: "clamp(75px, 18vw, 90px)",
                height: "clamp(85px, 20vw, 105px)",
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, #F5A623 0%, #E07A5F 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,255,255,0.2)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "clamp(32px, 8vw, 40px)" }}>👩‍🎨</span>
              <span style={{ fontSize: "8.5px", fontWeight: 700, color: "#111", marginTop: "2px" }}>
                VERIFIED
              </span>
            </div>

            {/* Details */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "clamp(15px, 3vw, 17px)", fontWeight: 800, color: "#FFF" }}>
                {artisanData.name}
              </div>
              <div className="hindi" style={{ fontSize: "11px", color: "var(--saffron-light)", marginBottom: "4px" }}>
                {artisanData.nameHindi}
              </div>

              <div style={{ fontSize: "10.5px", color: "var(--text-secondary)", marginBottom: "2px" }}>
                <strong style={{ color: "var(--text-primary)" }}>Craft:</strong> {artisanData.craftCategory}
              </div>
              <div style={{ fontSize: "10.5px", color: "var(--text-secondary)", marginBottom: "2px" }}>
                <strong style={{ color: "var(--text-primary)" }}>Cluster:</strong> {artisanData.cluster}
              </div>
              <div style={{ fontSize: "10.5px", color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--text-primary)" }}>Location:</strong> {artisanData.district}, {artisanData.state}
              </div>
            </div>
          </div>

          {/* Bottom Card Row: QR Code & ID */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(0,0,0,0.35)",
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(255,255,255,0.06)",
              gap: "8px",
            }}
          >
            <div>
              <div style={{ fontSize: "8.5px", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                Digital Pehchan Token
              </div>
              <div
                className="mono"
                style={{
                  fontSize: "clamp(11px, 2.5vw, 13px)",
                  fontWeight: 700,
                  color: "var(--saffron)",
                  letterSpacing: "0.5px",
                  wordBreak: "break-all",
                }}
              >
                {artisanData.pehchanId}
              </div>
              <div style={{ fontSize: "9.5px", color: "var(--text-tertiary)", marginTop: "2px" }}>
                Aadhaar: {artisanData.aadhaarMasked}
              </div>
            </div>

            {/* Simulated Verified QR Code */}
            <div
              style={{
                width: "42px",
                height: "42px",
                background: "#FFF",
                borderRadius: "4px",
                padding: "3px",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "2px",
                flexShrink: 0,
              }}
            >
              {[1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1].map((v, i) => (
                <div
                  key={i}
                  style={{
                    background: v ? "#000" : "#FFF",
                    borderRadius: "1px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
          <button
            className="btn btn-primary"
            style={{ flex: 1, minWidth: "140px", fontSize: "12px", padding: "10px 16px" }}
            onClick={handleCopy}
          >
            {isCopied ? "✓ Pehchan ID Copied!" : "📋 Copy ID"}
          </button>
          <button
            className="btn btn-secondary"
            style={{ flex: 1, minWidth: "140px", fontSize: "12px", padding: "10px 16px" }}
            onClick={handleVerify}
            disabled={isVerifying}
          >
            {isVerifying ? "⏳ Verifying..." : verified ? "🛡️ Verified Token" : "Verify Token"}
          </button>
        </div>
      </div>
    </div>
  );
}
