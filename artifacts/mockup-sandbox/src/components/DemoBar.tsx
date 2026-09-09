import React from "react";

type Page = "home" | "studio" | "marketplace" | "dashboard" | "analytics";

interface DemoBarProps {
  onNavigate: (page: Page) => void;
  onOpenPehchan: () => void;
  currentPage: Page;
}

export default function DemoBar({ onNavigate, onOpenPehchan, currentPage }: DemoBarProps) {
  return (
    <div
      style={{
        position: "sticky",
        top: "var(--navbar-height)",
        zIndex: 900,
        background: "rgba(18, 24, 38, 0.96)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(245, 166, 35, 0.2)",
        padding: "8px clamp(12px, 3vw, 24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Left Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
        <span className="badge badge-warning" style={{ fontSize: "11px", fontWeight: 700, padding: "4px 8px" }}>
          ⚡ SIH JURY DEMOS
        </span>
      </div>

      {/* Demo Action Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
        <button
          onClick={() => onNavigate("studio")}
          className={currentPage === "studio" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ fontSize: "11.5px", padding: "6px 12px", whiteSpace: "nowrap" }}
        >
          🎙️ Demo 1: Voice ASR
        </button>

        <button
          onClick={() => onNavigate("studio")}
          className={currentPage === "studio" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ fontSize: "11.5px", padding: "6px 12px", whiteSpace: "nowrap" }}
        >
          📸 Demo 2: Enhancer
        </button>

        <button
          onClick={() => onNavigate("studio")}
          className={currentPage === "studio" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ fontSize: "11.5px", padding: "6px 12px", whiteSpace: "nowrap" }}
        >
          💰 Demo 3: Fair Wage
        </button>

        <button
          onClick={() => onNavigate("marketplace")}
          className={currentPage === "marketplace" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ fontSize: "11.5px", padding: "6px 12px", whiteSpace: "nowrap" }}
        >
          🛒 Demo 4: ONDC
        </button>

        <button
          onClick={onOpenPehchan}
          className="btn btn-ghost btn-sm"
          style={{
            fontSize: "11.5px",
            padding: "6px 12px",
            border: "1px solid rgba(245, 166, 35, 0.3)",
            color: "var(--saffron)",
            whiteSpace: "nowrap",
          }}
        >
          🆔 Pehchan ID
        </button>
      </div>
    </div>
  );
}
