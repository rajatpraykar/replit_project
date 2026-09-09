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
        background: "rgba(5, 8, 15, 0.82)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        className="glass-strong animate-fadeIn"
        style={{
          maxWidth: "520px",
          width: "100%",
          borderRadius: "var(--radius-xl)",
          padding: "28px",
          position: "relative",
          boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 0 40px rgba(245, 166, 35, 0.15)",
          border: "1px solid rgba(245, 166, 35, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <span className="badge badge-warning" style={{ fontSize: "11px", marginBottom: "4px" }}>
              🇮🇳 GOVT OF INDIA • MoSJE RECOGNIZED
            </span>
            <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "#FFF" }}>
              Sovereign Pehchan Smart ID
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "var(--text-secondary)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
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
            padding: "20px",
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "32px" }}>🪔</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--saffron)", letterSpacing: "0.5px" }}>
                  KALASETU PEHCHAN
                </div>
                <div style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>
                  National Artisan Identity Registry • MSJE-2024
                </div>
              </div>
            </div>
            <div
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                color: "var(--text-success)",
                padding: "3px 8px",
                borderRadius: "var(--radius-full)",
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              ✓ CRYPTO VERIFIED
            </div>
          </div>

          {/* Card Body: Photo + Info */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            {/* Artisan Avatar Box */}
            <div
              style={{
                width: "90px",
                height: "105px",
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
              <span style={{ fontSize: "40px" }}>👩‍🎨</span>
              <span style={{ fontSize: "9px", fontWeight: 700, color: "#111", marginTop: "4px" }}>
                VERIFIED
              </span>
            </div>

            {/* Details */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "17px", fontWeight: 800, color: "#FFF" }}>
                {artisanData.name}
              </div>
              <div className="hindi" style={{ fontSize: "12px", color: "var(--saffron-light)", marginBottom: "6px" }}>
                {artisanData.nameHindi}
              </div>

              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "3px" }}>
                <strong style={{ color: "var(--text-primary)" }}>Craft:</strong> {artisanData.craftCategory}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "3px" }}>
                <strong style={{ color: "var(--text-primary)" }}>Cluster:</strong> {artisanData.cluster}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
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
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div>
              <div style={{ fontSize: "9px", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                Digital Pehchan Token
              </div>
              <div
                className="mono"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--saffron)",
                  letterSpacing: "0.5px",
                }}
              >
                {artisanData.pehchanId}
              </div>
              <div style={{ fontSize: "10px", color: "var(--text-tertiary)", marginTop: "2px" }}>
                Aadhaar: {artisanData.aadhaarMasked}
              </div>
            </div>

            {/* Simulated Verified QR Code Graphic */}
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#FFF",
                borderRadius: "4px",
                padding: "3px",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "2px",
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
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            className="btn btn-primary"
            style={{ flex: 1, fontSize: "13px" }}
            onClick={handleCopy}
          >
            {isCopied ? "✓ Pehchan ID Copied!" : "📋 Copy ID"}
          </button>
          <button
            className="btn btn-secondary"
            style={{ flex: 1, fontSize: "13px" }}
            onClick={handleVerify}
            disabled={isVerifying}
          >
            {isVerifying ? "⏳ Verifying..." : verified ? "🛡️ Cryptographically Verified" : "Verify Token"}
          </button>
        </div>
      </div>
    </div>
  );
}
