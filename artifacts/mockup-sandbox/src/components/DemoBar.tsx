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
        background: "rgba(18, 24, 38, 0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(245, 166, 35, 0.2)",
        padding: "8px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        overflowX: "auto",
      }}
    >
      {/* Left Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <span className="badge badge-warning" style={{ fontSize: "11px", fontWeight: 700 }}>
          ⚡ SIH JURY DEMOS
        </span>
      </div>

      {/* Demo Action Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={() => onNavigate("studio")}
          className={currentPage === "studio" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ fontSize: "12px" }}
        >
          🎙️ Demo 1: Voice ASR
        </button>

        <button
          onClick={() => onNavigate("studio")}
          className={currentPage === "studio" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ fontSize: "12px" }}
        >
          📸 Demo 2: Studio Enhancer
        </button>

        <button
          onClick={() => onNavigate("studio")}
          className={currentPage === "studio" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ fontSize: "12px" }}
        >
          💰 Demo 3: Fair-Wage & Catalog
        </button>

        <button
          onClick={() => onNavigate("marketplace")}
          className={currentPage === "marketplace" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ fontSize: "12px" }}
        >
          🛒 Demo 4: ONDC & Wholesale
        </button>

        <button
          onClick={onOpenPehchan}
          className="btn btn-ghost btn-sm"
          style={{
            fontSize: "12px",
            border: "1px solid rgba(245, 166, 35, 0.3)",
            color: "var(--saffron)",
          }}
        >
          🆔 Pehchan Smart ID
        </button>
      </div>
    </div>
  );
}
