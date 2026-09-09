import { useState, useEffect } from "react";
import type { Language } from "../components/Navbar";

interface AnalyticsPageProps {
  lang: Language;
}

const API_BASE = "/api";

export default function AnalyticsPage({ lang }: AnalyticsPageProps) {
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${API_BASE}/analytics`);
      const data = await res.json();
      setAnalytics(data);
    } catch {
      // Demo fallback
      setAnalytics({
        metrics: {
          totalProducts: 8,
          totalInventoryValue: 9470,
          totalViews: 2342,
          totalInquiries: 147,
          b2bPipelineValue: 52000,
          averageFairWagePerHour: 112,
          statutoryMinimumWage: 32,
          fairWagePremiumPercent: 250,
          ondcReadinessScore: 98,
          digitalLiteracyAssistLevel: "Voice-First & Audio-Guided",
        },
        governmentSchemeEligibility: [
          { schemeCode: "PM-VISHWAKARMA", schemeName: "PM Vishwakarma Scheme", ministry: "Ministry of MSME", status: "ELIGIBLE", benefit: "₹15,000 toolkit + loan at 5%" },
          { schemeCode: "AHVY-CLUSTER", schemeName: "AHVY Craft Cluster", ministry: "Ministry of Textiles", status: "ELIGIBLE", benefit: "100% sponsored fair stalls" },
          { schemeCode: "GEM-MSE-EXEMPT", schemeName: "GeM MSE Exemption", ministry: "Ministry of Commerce", status: "ACTIVE", benefit: "EMD and tender fee exemption" },
          { schemeCode: "MUDRA-SHISHU", schemeName: "MUDRA Yojana", ministry: "Ministry of Finance", status: "RECOMMENDED", benefit: "₹50,000 working capital loan" },
        ],
        socialImpactStatement: "Empowering marginalized SC/ST/OBC and traditional craft communities with direct digital market access.",
      });
    }
  };

  const metrics = analytics?.metrics;

  return (
    <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginBottom: "8px" }}>
          🎯 <span className="text-gradient">{t("Impact Analytics", "प्रभाव विश्लेषण")}</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "700px" }}>
          {t(
            "MoSJE socio-economic upliftment telemetry — tracking real-time impact on marginalized artisan communities",
            "MoSJE सामाजिक-आर्थिक उत्थान टेलीमेट्री — हाशिये पर रहने वाले कारीगर समुदायों पर वास्तविक प्रभाव"
          )}
        </p>
      </div>

      {metrics ? (
        <>
          {/* ═══ Key Metrics Grid ═══ */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "40px",
          }}>
            {[
              { value: metrics.totalProducts, label: t("Products Listed", "सूचीबद्ध उत्पाद"), icon: "📦", gradient: true },
              { value: `₹${(metrics.totalInventoryValue / 1000).toFixed(1)}K`, label: t("Inventory Value", "इन्वेंट्री मूल्य"), icon: "💎", gradient: true },
              { value: metrics.totalViews?.toLocaleString(), label: t("Total Views", "कुल दृश्य"), icon: "👁️" },
              { value: metrics.totalInquiries, label: t("B2B Inquiries", "B2B पूछताछ"), icon: "💬" },
              { value: `₹${(metrics.b2bPipelineValue / 1000).toFixed(0)}K`, label: t("B2B Pipeline", "B2B पाइपलाइन"), icon: "💼", gradient: true },
              { value: `${metrics.ondcReadinessScore}%`, label: t("ONDC Score", "ONDC स्कोर"), icon: "🔗" },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{stat.icon}</div>
                <div className={`stat-value ${stat.gradient ? "text-gradient" : ""}`} style={!stat.gradient ? { color: "var(--text-info)" } : {}}>
                  {stat.value}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ═══ Fair Wage Impact Panel ═══ */}
          <div className="card" style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "20px", color: "var(--saffron)" }}>
              💰 {t("Fair-Trade Wage Impact", "उचित व्यापार मजदूरी प्रभाव")}
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              {/* Visual bar comparison */}
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px" }}>
                    <span style={{ color: "var(--text-tertiary)" }}>{t("Statutory Min Wage", "वैधानिक न्यूनतम वेतन")}</span>
                    <span style={{ color: "var(--text-danger)" }}>₹{metrics.statutoryMinimumWage}/hr</span>
                  </div>
                  <div style={{ height: "12px", borderRadius: "6px", background: "rgba(30,41,59,0.5)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${(metrics.statutoryMinimumWage / metrics.averageFairWagePerHour) * 100}%`,
                      background: "linear-gradient(90deg, #EF4444, #F87171)",
                      borderRadius: "6px",
                      transition: "width 1s ease-out",
                    }} />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px" }}>
                    <span style={{ color: "var(--text-tertiary)" }}>{t("KalaSetu Fair Wage", "कलासेतु उचित वेतन")}</span>
                    <span style={{ color: "var(--text-success)", fontWeight: 600 }}>₹{metrics.averageFairWagePerHour}/hr</span>
                  </div>
                  <div style={{ height: "12px", borderRadius: "6px", background: "rgba(30,41,59,0.5)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: "100%",
                      background: "linear-gradient(90deg, #10B981, #34D399)",
                      borderRadius: "6px",
                      transition: "width 1s ease-out",
                    }} />
                  </div>
                </div>
              </div>

              {/* Uplift stat */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="stat-card animate-pulse-glow" style={{ padding: "32px", minWidth: "200px" }}>
                  <div className="stat-value text-gradient" style={{ fontSize: "48px" }}>
                    +{metrics.fairWagePremiumPercent}%
                  </div>
                  <div className="stat-label" style={{ fontSize: "13px", marginTop: "8px" }}>
                    {t("Above Minimum Wage", "न्यूनतम वेतन से ऊपर")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ Digital Literacy ═══ */}
          <div className="card" style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "var(--saffron)" }}>
              🗣️ {t("Digital Literacy Assist", "डिजिटल साक्षरता सहायता")}
            </h3>
            <div className="card-flat" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(245,166,35,0.2), rgba(139,92,246,0.2))",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0,
              }}>
                🎙️
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "16px", marginBottom: "4px" }}>
                  {metrics.digitalLiteracyAssistLevel}
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {t(
                    "Artisans can describe products in their native language through voice. No typing, no forms — just speak and the AI handles everything.",
                    "कारीगर अपनी मातृभाषा में आवाज़ के ज़रिए उत्पाद का वर्णन कर सकते हैं। कोई टाइपिंग नहीं, कोई फॉर्म नहीं — बस बोलें और AI सब संभालता है।"
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* ═══ Govt Schemes Eligibility ═══ */}
          <div className="card" style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "var(--saffron)" }}>
              🏛️ {t("Government Scheme Eligibility", "सरकारी योजना पात्रता")}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
              {analytics.governmentSchemeEligibility?.map((scheme: any, i: number) => (
                <div key={i} className="card-flat">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span className="mono" style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>{scheme.schemeCode}</span>
                    <span className={`badge ${scheme.status === "ELIGIBLE" || scheme.status === "ACTIVE" ? "badge-success" : "badge-info"}`}>
                      {scheme.status}
                    </span>
                  </div>
                  <h4 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{scheme.schemeName}</h4>
                  <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "6px" }}>{scheme.ministry}</p>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{scheme.benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ Impact Statement ═══ */}
          <div className="card" style={{
            background: "linear-gradient(135deg, rgba(245,166,35,0.08), rgba(139,92,246,0.05))",
            borderColor: "var(--border-strong)",
            textAlign: "center",
            padding: "40px",
          }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>🇮🇳</div>
            <blockquote style={{
              fontSize: "16px",
              fontStyle: "italic",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "700px",
              margin: "0 auto",
            }}>
              "{analytics.socialImpactStatement}"
            </blockquote>
            <div style={{ marginTop: "16px", fontSize: "12px", color: "var(--text-tertiary)" }}>
              — KalaSetu • Ministry of Social Justice & Empowerment
            </div>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--text-tertiary)" }}>
          ⏳ {t("Loading analytics...", "विश्लेषण लोड हो रहा है...")}
        </div>
      )}
    </div>
  );
}
