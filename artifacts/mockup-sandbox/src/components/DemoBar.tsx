import React from "react";
import type { Page } from "./Navbar";

interface DemoBarProps {
  onNavigate: (page: Page) => void;
  onOpenPehchan: () => void;
  currentPage: Page;
}

export default function DemoBar({ onNavigate, onOpenPehchan, currentPage }: DemoBarProps) {
  return (
    <div className="sticky top-[72px] z-40 bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-low px-4 md:px-8 py-2 flex items-center justify-between gap-3 overflow-x-auto shadow-sm">
      {/* Left Title Badge */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[11px] font-bold shadow-sm">
          <span className="material-symbols-outlined text-[14px]">bolt</span>
          <span>SIH JURY DEMOS</span>
        </span>
      </div>

      {/* Demo Action Buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onNavigate("studio")}
          className={`px-3 py-1 rounded-full font-label-sm text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            currentPage === "studio"
              ? "bg-primary-fixed text-on-primary-fixed font-bold shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface"
          }`}
        >
          🎙️ Demo 1: Voice ASR
        </button>

        <button
          onClick={() => onNavigate("studio")}
          className={`px-3 py-1 rounded-full font-label-sm text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            currentPage === "studio"
              ? "bg-primary-fixed text-on-primary-fixed font-bold shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface"
          }`}
        >
          📸 Demo 2: Enhancer
        </button>

        <button
          onClick={() => onNavigate("studio")}
          className={`px-3 py-1 rounded-full font-label-sm text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            currentPage === "studio"
              ? "bg-primary-fixed text-on-primary-fixed font-bold shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface"
          }`}
        >
          💰 Demo 3: Fair Wage
        </button>

        <button
          onClick={() => onNavigate("marketplace")}
          className={`px-3 py-1 rounded-full font-label-sm text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            currentPage === "marketplace"
              ? "bg-primary-fixed text-on-primary-fixed font-bold shadow-sm"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface"
          }`}
        >
          🛒 Demo 4: ONDC
        </button>

        <button
          onClick={onOpenPehchan}
          className="px-3 py-1 rounded-full font-label-sm text-xs font-bold whitespace-nowrap bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim transition-all cursor-pointer flex items-center gap-1 shadow-sm"
        >
          <span className="material-symbols-outlined text-[14px]">badge</span>
          <span>🆔 Pehchan ID</span>
        </button>
      </div>
    </div>
  );
}
