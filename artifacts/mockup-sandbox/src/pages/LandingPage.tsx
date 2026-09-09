type Page = "home" | "studio" | "marketplace" | "dashboard" | "analytics";

interface LandingPageProps {
  lang: "en" | "hi";
  onNavigate: (page: Page) => void;
}

const CRAFT_CATEGORIES = [
  { icon: "🧵", nameEn: "Handloom Textiles", nameHi: "हथकरघा वस्त्र", count: 340, color: "#F59E0B" },
  { icon: "🏺", nameEn: "Terracotta & Clay", nameHi: "मिट्टी शिल्प", count: 215, color: "#EF4444" },
  { icon: "🎨", nameEn: "Folk Painting", nameHi: "लोक चित्रकला", count: 180, color: "#8B5CF6" },
  { icon: "🪵", nameEn: "Wood Carving", nameHi: "लकड़ी नक्काशी", count: 156, color: "#10B981" },
  { icon: "🔔", nameEn: "Brassware", nameHi: "पीतल शिल्प", count: 128, color: "#F97316" },
  { icon: "🔵", nameEn: "Blue Pottery", nameHi: "ब्लू पॉटरी", count: 95, color: "#3B82F6" },
  { icon: "🧶", nameEn: "Jute & Eco Craft", nameHi: "जूट शिल्प", count: 110, color: "#14B8A6" },
  { icon: "🪆", nameEn: "Traditional Toys", nameHi: "पारंपरिक खिलौने", count: 87, color: "#EC4899" },
];

const FEATURES = [
  {
    icon: "🎙️",
    titleEn: "Voice-First Cataloging",
    titleHi: "वॉइस-फर्स्ट कैटलॉगिंग",
    descEn: "Speak in any Indian language. Our AI transcribes, translates, and generates SEO-ready product listings with fair-trade pricing — in seconds.",
    descHi: "किसी भी भारतीय भाषा में बोलें। हमारा AI ट्रांसक्राइब, अनुवाद और SEO-तैयार उत्पाद सूची तैयार करता है।",
  },
  {
    icon: "📸",
    titleEn: "AI Studio Enhancement",
    titleHi: "AI स्टूडियो एन्हांसमेंट",
    descEn: "Transform phone photos into professional e-commerce imagery. Background removal, studio lighting, and brand-consistent compositions — all automated.",
    descHi: "फ़ोन की फोटो को प्रोफेशनल ई-कॉमर्स इमेजरी में बदलें। बैकग्राउंड हटाना, स्टूडियो लाइटिंग — सब ऑटोमेटिक।",
  },
  {
    icon: "💰",
    titleEn: "Fair-Trade Wage Engine",
    titleHi: "उचित व्यापार मूल्य इंजन",
    descEn: "Transparent, state-wise fair pricing with 3.5x skilled artisan wage multiplier. Calculates material + labor + packaging + ethical margin automatically.",
    descHi: "पारदर्शी, राज्य-वार उचित मूल्य निर्धारण। सामग्री + श्रम + पैकेजिंग + नैतिक मार्जिन स्वचालित गणना।",
  },
  {
    icon: "🛒",
    titleEn: "ONDC + GeM Direct Export",
    titleHi: "ONDC + GeM निर्यात",
    descEn: "One-click export to ONDC Open Network and Government e-Marketplace (GeM). Beckn Protocol 1.1.0 compliant. Zero middlemen.",
    descHi: "एक क्लिक में ONDC और GeM पर निर्यात। बेकन प्रोटोकॉल 1.1.0 अनुरूप। शून्य बिचौलिये।",
  },
];

const STATS = [
  { value: "1,420+", labelEn: "Artisans Onboarded", labelHi: "कारीगर जुड़े", icon: "👨‍🎨" },
  { value: "₹52L+", labelEn: "B2B Pipeline", labelHi: "B2B पाइपलाइन", icon: "💼" },
  { value: "+250%", labelEn: "Above Min Wage", labelHi: "न्यूनतम वेतन से ऊपर", icon: "📈" },
  { value: "8", labelEn: "Indian Languages", labelHi: "भारतीय भाषाएँ", icon: "🗣️" },
];

export default function LandingPage({ lang, onNavigate }: LandingPageProps) {
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);

  return (
    <div>
      {/* ═══ HERO SECTION ═══ */}
      <section style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative gradient orbs */}
        <div style={{
          position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-30%", left: "-15%", width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1200px", width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}
             className="animate-fadeIn">
          {/* SIH Badge */}
          <div style={{ marginBottom: "24px" }}>
            <span className="badge badge-warning" style={{ fontSize: "13px", padding: "6px 16px" }}>
              🏆 Smart India Hackathon 2024 Grand Finale • PS 26090
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "16px",
            letterSpacing: "-1px",
          }}>
            <span className="text-gradient">
              {t("Empowering India's", "भारत के")}
            </span>
            <br />
            <span style={{ color: "var(--text-primary)" }}>
              {t("Artisan Communities", "कारीगर समुदायों को सशक्त")}
            </span>
          </h1>

          {/* Hindi subtitle */}
          <p className="hindi" style={{
            fontSize: "clamp(16px, 2.5vw, 22px)",
            color: "var(--text-secondary)",
            maxWidth: "700px",
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}>
            {t(
              "AI-powered digital marketplace connecting marginalized SC/ST/OBC artisans directly to global buyers — eliminating middlemen, ensuring 100% fair-trade wages.",
              "AI-संचालित डिजिटल बाज़ार जो हाशिये पर रहने वाले SC/ST/OBC कारीगरों को सीधे वैश्विक खरीदारों से जोड़ता है — बिचौलियों को हटाकर, 100% उचित व्यापार मजदूरी सुनिश्चित करता है।"
            )}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate("studio")}>
              📸 {t("Open AI Studio", "AI स्टूडियो खोलें")}
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate("marketplace")}>
              🏪 {t("Browse Marketplace", "बाज़ार देखें")}
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => onNavigate("analytics")}>
              📊 {t("View Impact", "प्रभाव देखें")}
            </button>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{
        padding: "40px 24px",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}>
          {STATS.map((stat, i) => (
            <div key={i} className={`stat-card animate-fadeIn stagger-${i + 1}`} style={{ opacity: 0 }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{stat.icon}</div>
              <div className="stat-value text-gradient">{stat.value}</div>
              <div className="stat-label">{t(stat.labelEn, stat.labelHi)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES GRID ═══ */}
      <section style={{
        padding: "60px 24px",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 700,
          marginBottom: "12px",
        }}>
          <span className="text-gradient">{t("How KalaSetu Works", "कलासेतु कैसे काम करता है")}</span>
        </h2>
        <p style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          maxWidth: "600px",
          margin: "0 auto 48px",
          fontSize: "15px",
        }}>
          {t(
            "Four pillars of digital empowerment for India's marginalized craft communities",
            "भारत के हाशिये पर रहने वाले शिल्प समुदायों के डिजिटल सशक्तिकरण के चार स्तंभ"
          )}
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {FEATURES.map((feature, i) => (
            <div key={i} className={`card animate-fadeIn stagger-${i + 1}`} style={{ opacity: 0 }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{feature.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px", color: "var(--saffron)" }}>
                {t(feature.titleEn, feature.titleHi)}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {t(feature.descEn, feature.descHi)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CRAFT CATEGORIES ═══ */}
      <section style={{
        padding: "60px 24px",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 700,
          marginBottom: "40px",
        }}>
          {t("8 Heritage Craft Categories", "8 विरासत शिल्प श्रेणियाँ")}
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
        }}>
          {CRAFT_CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="card-flat"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                transition: "all var(--transition-smooth)",
              }}
              onClick={() => onNavigate("marketplace")}
            >
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-md)",
                background: `${cat.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                flexShrink: 0,
              }}>
                {cat.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>
                  {t(cat.nameEn, cat.nameHi)}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                  {cat.count} {t("products", "उत्पाद")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ GOVT SCHEMES ═══ */}
      <section style={{
        padding: "60px 24px",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 700,
          marginBottom: "12px",
        }}>
          {t("Government Scheme Integration", "सरकारी योजना एकीकरण")}
        </h2>
        <p style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          maxWidth: "600px",
          margin: "0 auto 40px",
          fontSize: "14px",
        }}>
          {t(
            "Automatically matches artisans with eligible central and state government welfare schemes",
            "कारीगरों को स्वचालित रूप से पात्र केंद्र और राज्य सरकार की कल्याण योजनाओं से जोड़ता है"
          )}
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {[
            { code: "PM-VISHWAKARMA", name: t("PM Vishwakarma Scheme", "पीएम विश्वकर्मा योजना"), ministry: t("Ministry of MSME", "एमएसएमई मंत्रालय"), benefit: t("₹15,000 toolkit + ₹3L loan at 5%", "₹15,000 टूलकिट + ₹3L ऋण 5% पर"), color: "#F59E0B" },
            { code: "AHVY-CLUSTER", name: t("AHVY Craft Cluster", "AHVY शिल्प क्लस्टर"), ministry: t("Ministry of Textiles", "वस्त्र मंत्रालय"), benefit: t("100% sponsored stall at national fairs", "राष्ट्रीय मेलों में 100% प्रायोजित स्टॉल"), color: "#8B5CF6" },
            { code: "GEM-MSE", name: t("GeM MSE Exemption", "GeM MSE छूट"), ministry: t("Ministry of Commerce", "वाणिज्य मंत्रालय"), benefit: t("Exempt from EMD & tender fees", "EMD और टेंडर शुल्क से छूट"), color: "#10B981" },
            { code: "MUDRA-SHISHU", name: t("MUDRA Yojana", "मुद्रा योजना"), ministry: t("Ministry of Finance", "वित्त मंत्रालय"), benefit: t("₹50K working capital loan", "₹50K कार्यशील पूंजी ऋण"), color: "#3B82F6" },
          ].map((scheme, i) => (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${scheme.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span className="badge badge-success">✓ {t("ELIGIBLE", "पात्र")}</span>
                <span className="mono" style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>{scheme.code}</span>
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>{scheme.name}</h4>
              <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "8px" }}>{scheme.ministry}</p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{scheme.benefit}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
