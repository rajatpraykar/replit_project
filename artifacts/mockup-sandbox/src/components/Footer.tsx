import React from "react";

interface FooterProps {
  onNavigate?: (page: any) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-[#3D405B] text-inverse-on-surface pt-14 pb-10 text-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Col 1: KalaSetu Brand & Vision */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-['Poppins'] font-bold text-[22px] tracking-tight text-white">
                KalaSetu
              </span>
              <span className="font-['Noto_Sans_Devanagari'] font-semibold text-[14px] text-[#ffddb4]">
                कलासेतु
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#d6d8f9] leading-relaxed">
              An AI-powered digital bridge connecting traditional Indian artisans directly to national and global buyers, backed by verifiable provenance and fair trade transparency.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#ondc"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-[#d6d8f9] hover:text-white"
                title="ONDC Network Protocol"
              >
                <span className="material-symbols-outlined text-lg">hub</span>
              </a>
              <a
                href="#gem"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-[#d6d8f9] hover:text-white"
                title="GeM Government Portal"
              >
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-[#d6d8f9] hover:text-white"
                title="Support Desk"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
              </a>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-headline-sm text-base text-white font-bold">
              Platform
            </h4>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-[#d6d8f9]">
              <li
                onClick={() => onNavigate?.("marketplace")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                ONDC Open Commerce
              </li>
              <li
                onClick={() => onNavigate?.("dashboard")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Artisan Pehchan ID
              </li>
              <li
                onClick={() => onNavigate?.("studio")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Bhashini Voice Multilingual
              </li>
              <li
                onClick={() => onNavigate?.("studio")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Fair Price AI Estimator
              </li>
              <li
                onClick={() => onNavigate?.("marketplace")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Provenance &amp; GI Tag Trace
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="font-headline-sm text-base text-white font-bold">
              Resources
            </h4>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-[#d6d8f9]">
              <li
                onClick={() => onNavigate?.("analytics")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Technical Architecture
              </li>
              <li
                onClick={() => onNavigate?.("studio")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                ONDC Beckn Protocol APIs
              </li>
              <li className="hover:text-white transition-colors">
                Smart India Hackathon PS-26090
              </li>
              <li
                onClick={() => onNavigate?.("dashboard")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Artisan Onboarding Guide
              </li>
              <li className="hover:text-white transition-colors">
                MoSJE Social Impact Whitepaper
              </li>
            </ul>
          </div>

          {/* Col 4: Government Linkages */}
          <div className="flex flex-col gap-3">
            <h4 className="font-headline-sm text-base text-white font-bold">
              Government Linkages
            </h4>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-[#d6d8f9]">
              <li className="hover:text-white transition-colors">
                Ministry of Social Justice &amp; Empowerment
              </li>
              <li className="hover:text-white transition-colors">
                Open Network for Digital Commerce (ONDC)
              </li>
              <li className="hover:text-white transition-colors">
                Government e-Marketplace (GeM Portal)
              </li>
              <li className="hover:text-white transition-colors">
                PM Vishwakarma Scheme
              </li>
              <li className="hover:text-white transition-colors">
                Bhashini National Language Mission
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#d6d8f9]/80">
          <p>
            © 2024 KalaSetu (कलासेतु). Ministry of Social Justice &amp; Empowerment | Smart India Hackathon Grand Finale PS-26090.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Fair Trade
            </span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              National Portal of India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
